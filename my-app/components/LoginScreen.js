import React from 'react';
import { View, TextInput, Button } from 'react-native';

const LoginScreen = () => {
  return (
    <View>
      <TextInput placeholder="Email" />
      <TextInput placeholder="Contraseña" secureTextEntry />
      <Button title="Iniciar Sesión" onPress={() => {  }} />
    <Button
    title="Ir a Página Principal"
    onPress={() => navigation.navigate('Main')}
  />
</View>
  );
};

export default LoginScreen;
