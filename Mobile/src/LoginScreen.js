import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, Image, TouchableOpacity, Alert, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [emailOrNome, setEmailOrNome] = useState('');
  const [senha, setSenha] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleLogin = async () => {
    if (!emailOrNome || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      const usersString = await AsyncStorage.getItem('users');
      const users = usersString ? JSON.parse(usersString) : [];

      const user = users.find(user => 
        (user.email === emailOrNome || user.nome === emailOrNome) && user.senha === senha
      );

      if (user) {
        await AsyncStorage.setItem('currentUser', JSON.stringify(user));
        navigation.navigate('Game'); 
      } else {
        Alert.alert('Erro', 'Email ou senha incorretos!');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao fazer login.');
    }
  };

  const handleForgotPassword = async () => {
    if (!resetEmail) {
      Alert.alert('Erro', 'Por favor, insira seu email.');
      return;
    }

    try {
      const usersString = await AsyncStorage.getItem('users');
      const users = usersString ? JSON.parse(usersString) : [];

      const userIndex = users.findIndex(user => user.email === resetEmail);
      if (userIndex !== -1) {
        users[userIndex].senha = newPassword; 
        await AsyncStorage.setItem('users', JSON.stringify(users));
        Alert.alert('Sucesso', 'Senha atualizada com sucesso!');
        setIsModalVisible(false); 
        setResetEmail('');
        setNewPassword('');
      } else {
        Alert.alert('Erro', 'Email não encontrado.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao redefinir a senha.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('./assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Bem-vindo de volta</Text>
      <TextInput 
        placeholder="Email ou Nome:" 
        value={emailOrNome} 
        onChangeText={setEmailOrNome} 
        style={styles.input} 
      />
      <TextInput 
        placeholder="Senha:" 
        value={senha} 
        onChangeText={setSenha} 
        secureTextEntry 
        style={styles.input} 
      />
      <TouchableOpacity style={styles.startButton} onPress={handleLogin}>
        <Text style={styles.startButtonText}>ENTRAR</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.signupLink}>Não tem uma conta? Cadastre-se</Text>
      </TouchableOpacity>

      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Redefinir Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu email"
              value={resetEmail}
              onChangeText={setResetEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Digite sua nova senha"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
            />
            <TouchableOpacity style={styles.startButton} onPress={handleForgotPassword}>
              <Text style={styles.startButtonText}>Atualizar senha</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeModalButton} onPress={() => setIsModalVisible(false)}>
              <Text style={styles.startButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    marginBottom: 10,
    borderRadius: 5,
    color: '#4d1948', 
  },
  startButton: {
    backgroundColor: '#a469aa',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 25,
    marginBottom: 20,
    marginTop: 20,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center', 
  },
  signupLink: {
    color: '#fff',
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#284767',
  },
  closeModalButton: {
    marginTop: 20,
  },
});

export default LoginScreen;
