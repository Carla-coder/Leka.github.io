import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const gifSource = require('./assets/interesse.gif'); 

const InteressanteScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { opcao, nivel } = route.params;  

  const calcularResultado = (escolha) => {
    let resultado = '';

    if (escolha === 'logica') {
      resultado = 'Backend Developer';
    } else if (escolha === 'design') {
      resultado = 'Frontend Developer';
    } else if (escolha === 'ambos') {
      resultado = 'Fullstack Developer';
    }

    return resultado;
  };

  return (
    <View style={styles.container}>
      <Image 
        source={gifSource} 
        style={styles.gif} 
        resizeMode="contain" 
      />
      <Text style={styles.title}>O que mais te interessa?</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Resultado', { resultado: calcularResultado('logica') })}
      >
        <Text style={styles.buttonText}>Eu gosto de lógica</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Resultado', { resultado: calcularResultado('design') })}
      >
        <Text style={styles.buttonText}>Eu gosto de design visual</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Resultado', { resultado: calcularResultado('ambos') })}
      >
        <Text style={styles.buttonText}>Eu gosto de ambos</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
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

export default InteressanteScreen;
