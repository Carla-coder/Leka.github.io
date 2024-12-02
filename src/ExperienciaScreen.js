import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const gifSource = require('./assets/nivel.gif');

const ExperienciaScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { opcao } = route.params; 

  return (
    <View style={styles.container}>
      <Image 
        source={gifSource} 
        style={styles.gif} 
        resizeMode="contain" 
      />
      <Text style={styles.title}>Qual o seu nível de experiência?</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Interessante', { nivel: 'baixo', opcao })} 
      >
        <Text style={styles.buttonText}>Baixo</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Interessante', { nivel: 'medio', opcao })} 
      >
        <Text style={styles.buttonText}>Médio</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Interessante', { nivel: 'alto', opcao })} 
      >
        <Text style={styles.buttonText}>Alto</Text>
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

export default ExperienciaScreen;
