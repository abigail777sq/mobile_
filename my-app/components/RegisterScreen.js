import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';

const RegisterScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    const userData = {
      firstName,
      lastName,
      email,
      password,
      admin: true, 
    };

    try {
      const response = await fetch('https://proyectodbp-production.up.railway.app/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        console.log('Usuario registrado con éxito');
        Alert.alert('Éxito', 'Usuario registrado con éxito');
        navigation.navigate('Main'); 
      } else {
        console.error('Error al registrarse:', response.status);
        Alert.alert('Error', 'Error al registrarse');
      }
    } catch (error) {
      console.error('Error de red:', error);
      Alert.alert('Error', 'Error de red');
    }
  };

  return (
    <View>
      <TextInput placeholder="Firstname" value={firstName} onChangeText={setFirstName} />
      <TextInput placeholder="Lastname" value={lastName} onChangeText={setLastName} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Contraseña" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Registrarse" onPress={handleRegister} />
    </View>
  );
};

export default RegisterScreen;
