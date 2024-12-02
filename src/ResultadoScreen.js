import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const gifSource = require('./assets/conclui.gif');

const ResultadoScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { resultado } = route.params;

  return (
    <View style={styles.container}>
      <Image 
        source={gifSource} 
        style={styles.gif} 
        resizeMode="contain" 
      />
      <Text style={styles.title}>A melhor opção para você é:</Text>
      <Text style={styles.resultado}>{resultado}</Text>

      <TouchableOpacity 
        onPress={() => navigation.navigate('Time')} 
        style={styles.button}
      >
        <Text style={styles.buttonText}>Seguir</Text>
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
  gif: {
    width: 300, 
    height: 300, 
    position: 'relative', 
    top: -50,
    marginBottom: 20,
  },
  title: {
    fontSize: 25,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
    top: -70,
  },
  resultado: {
    fontSize: 32,
    color: '#f7e1c9',
    fontWeight: 'bold',
    marginBottom: 20,
    top: -70,
  },
  button: {
    backgroundColor: '#a469aa',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 25,
    marginBottom: 20,
    position: 'relative', 
    top: -40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ResultadoScreen;
