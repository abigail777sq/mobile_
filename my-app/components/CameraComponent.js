import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CameraComponent = () => {
  const [image, setImage] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);

  useEffect(() => {
    loadStoredImages();
  }, []);

  const loadStoredImages = async () => {
    try {
      const storedImages = await AsyncStorage.getItem('uploadedImages');
      if (storedImages) {
        setUploadedImages(JSON.parse(storedImages));
      }
    } catch (error) {
      console.error('Error loading images from storage:', error);
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Permission denied to access the camera');
      }
    })();
  }, []);

  const openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri) => {
    const formData = new FormData();
    formData.append('file', {
      uri: uri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });

    const cloudinaryCloudName = 'drrcalkzo';
    const cloudinaryUploadPreset = 'cbksihli';
    const cloudinaryApiKey = '548868884948828';

    const cloudinaryUploadUrl = `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload?upload_preset=${cloudinaryUploadPreset}&api_key=${cloudinaryApiKey}`;

    try {
      const response = await fetch(cloudinaryUploadUrl, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const responseData = await response.json();
      console.log('Image uploaded successfully to Cloudinary:', responseData);

      if (responseData.secure_url) {
        await storeImage(responseData.secure_url);
        setImage(responseData.secure_url); 
      }
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      Alert.alert('Upload failed', 'Failed to upload image');
    }
  };

  const storeImage = async (imgUri) => {
    try {
      const storedImages = await AsyncStorage.getItem('uploadedImages');
      const imagesArray = storedImages ? JSON.parse(storedImages) : [];
      imagesArray.push(imgUri);
      await AsyncStorage.setItem('uploadedImages', JSON.stringify(imagesArray));
    } catch (error) {
      console.error('Error storing image URL:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Button onPress={openCamera} title="Camara" color="green" />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      {}
      <View style={styles.thumbnailContainer}>
        {uploadedImages.map((imgUri, index) => (
          <Image key={index} source={{ uri: imgUri }} style={styles.thumbnail} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: 200,
      height: 200,
      margin: 20,
    },
    thumbnailContainer: {
      flexDirection: 'row',
      marginTop: 20,
    },
    thumbnail: {
      width: 50,
      height: 50,
      marginRight: 10,
    },
  });
  
  export default CameraComponent;