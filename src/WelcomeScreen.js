import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const [currentPage, setCurrentPage] = useState(0);

  const pages = [
    {
      title: 'Aprendizado Interativo',
      subtitle: 'Descubra um novo jeito de aprender programação! No LeKa, você poderá dominar habilidades essenciais jogando e se divertindo',
    },
    {
      title: 'Aprenda Jogando',
      subtitle: 'Explore diversos jogos que tornam o aprendizado de programação divertido e interativo. Domine conceitos enquanto se diverte!',
    },
    {
      title: 'Ganhe Recompensas',
      subtitle: 'Complete desafios e ganhe recompensas que o ajudarão a avançar nas suas habilidades. Aumentando seu conhecimento!',
    },
  ];

  const handleScroll = (event) => {
    const page = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentPage(page);
  };

  return (
    <View style={styles.container}>
      <Image source={require('./assets/logo.png')} style={styles.logo} />
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {pages.map((page, index) => (
          <View key={index} style={styles.page}>
            <Text style={styles.title}>{page.title}</Text>
            <Text style={styles.subtitle}>{page.subtitle}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.dotsContainer}>
        {pages.map((_, index) => (
          <View key={index} style={[styles.dot, currentPage === index && styles.activeDot]} />
        ))}
      </View>
      <TouchableOpacity
        style={styles.startButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.startButtonText}>INICIAR</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Signup')}
      >
        <Text style={styles.signUpText}>CRIE JÁ SUA CONTA</Text>
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
    paddingHorizontal: 10,
  },
  logo: {
    width: 200,
    height: 200,
    marginTop: 170,
    marginBottom: 20,
  },
  page: {
    width: width - 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    color: '#fff',
    marginBottom: 10,
    position: 'relative', 
    top: -60
  },
  subtitle: {
    fontSize: 20,
    color: '#aaa',
    textAlign: 'center',
    marginBottom: 40,
    position: 'relative', 
    top: -50
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    position: 'relative', 
    top: -80
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#aaa',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#6C63FF',
  },
  startButton: {
    backgroundColor: '#a469aa',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 25,
    marginBottom: 20,
    position: 'relative', 
    top: -70
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  signUpText: {
    color: '#fff',
    fontSize: 16,
    position: 'relative', 
    top: -70
  },
});

export default WelcomeScreen;
