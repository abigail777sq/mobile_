import React from 'react';
import { View, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Button
        title="Inicio de Sesión"
        onPress={() => navigation.navigate('Login')}
      />
      <Button
        title="Registro"
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
};

export default HomeScreen;
