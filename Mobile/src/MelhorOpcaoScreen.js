import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const gifSource = require('./assets/opcao.gif');

const MelhorOpcaoScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image 
        source={gifSource} 
        style={styles.gif} 
        resizeMode="contain" 
      />
      <Text style={styles.title}>Qual das opções melhor se aplica a você?</Text>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Experiencia', { opcao: 'problemas' })} 
      >
        <Text style={styles.buttonText}>Eu gosto de resolver problemas</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Experiencia', { opcao: 'interfaces' })} 
      >
        <Text style={styles.buttonText}>Eu gosto de criar interfaces bonitas</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Experiencia', { opcao: 'ambos' })} 
      >
        <Text style={styles.buttonText}>Eu gosto de ambos</Text>
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
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 25,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
    top: -80,
  },
  gif: {
    width: 300, 
    height: 300, 
    position: 'relative', 
    top: -50,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#f7e1c9', 
    padding: 15,
    borderRadius: 25,
    marginVertical: 10,
    width: '80%', 
    alignItems: 'center',
    position: 'relative', 
    top: -80,
  },
  buttonText: {
    color: '#4d1948',
    fontSize: 18, 
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MelhorOpcaoScreen;
