import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, Image, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const SignupScreen = () => {
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [celular, setCelular] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleSignup = async () => {
    if (!validateEmail(email)) {
      Alert.alert('Erro', 'Por favor, insira um email válido.');
      return;
    }

    if (!validateCelular(celular)) {
      Alert.alert('Erro', 'Por favor, insira um celular válido.');
      return;
    }

    if (!validateSenha(senha)) {
      Alert.alert('Erro', 'A senha deve ter no mínimo 6 caracteres, incluindo 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caractere especial.');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'Senhas não coincidem.');
      return;
    }

    try {
      const userId = Math.random().toString(36).substring(2, 10); 
      const newUser = { id: userId, nome, email, celular, senha };
      const usersString = await AsyncStorage.getItem('users');
      const users = usersString ? JSON.parse(usersString) : [];
      users.push(newUser);
      await AsyncStorage.setItem('users', JSON.stringify(users));
      navigation.navigate('Motivo');
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao cadastrar o usuário.');
    }
  };

  const validateEmail = (email) => {
    return email.includes('@');
  };

  const validateCelular = (celular) => {
    return celular.length === 15; 
  };

  const validateSenha = (senha) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return regex.test(senha);
  };

  const handleCelularChange = (text) => {
    const cleaned = text.replace(/\D/g, '');
    const formatted = cleaned.length <= 10 
      ? `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`
      : `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
    setCelular(formatted);
  };

  return (
    <View style={styles.container}>
      <Image source={require('./assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Vamos criar sua conta</Text>
      <TextInput placeholder="Nome:" value={nome} onChangeText={setNome} style={styles.input} />
      <TextInput placeholder="Email:" value={email} onChangeText={setEmail} keyboardType="email-address" style={styles.input} />
      <TextInput 
        placeholder="Celular:" 
        value={celular} 
        onChangeText={handleCelularChange} 
        keyboardType="phone-pad" 
        style={styles.input} 
      />
      <TextInput 
        placeholder="Senha:" 
        value={senha} 
        onChangeText={setSenha} 
        secureTextEntry 
        style={styles.input} 
      />
      <TextInput 
        placeholder="Confirmar Senha:" 
        value={confirmarSenha} 
        onChangeText={setConfirmarSenha} 
        secureTextEntry 
        style={styles.input} 
      />
      <TouchableOpacity style={styles.startButton} onPress={handleSignup}>
        <Text style={styles.startButtonText}>VAMOS</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 130,
    height: 130,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    backgroundColor: '#f7e1c9',
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
    color: '#4d1948', 
  },
  startButton: {
    backgroundColor: '#a469aa',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 25,
    marginBottom: 2,
    marginTop:20,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center', 
  },
});

export default SignupScreen;
