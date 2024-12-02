import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const TrilhaScreen = () => {
  const route = useRoute(); 
  const { selectedOption } = route.params; 
  const [formationTime, setFormationTime] = useState("");
  const navigation = useNavigation();

  const calculateFormationTime = (option) => {
    let time = "";
    switch (option) {
      case "Casual":
        time = "Abril de 2025";
        break;
      case "Regular":
        time = "Dezembro de 2024";
        break;
      case "Sério":
        time = "Julho de 2024";
        break;
      default:
        time = "Desconhecido";
    }
    setFormationTime(time);
  };

  useEffect(() => {
    calculateFormationTime(selectedOption);
  }, [selectedOption]);

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.title}>Você estará profissional em pouco tempo!</Text>

      <View style={styles.progressContainer}>
        <View style={styles.diagonalLine} />
        <View style={[styles.dot, styles.dotLeft]} />
        <View style={[styles.dot, styles.dotMiddle]} />
        <View style={[styles.dot, styles.dotRight]} />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.levelTextLeft}>Básico</Text>
        <Text style={styles.timeTextLeft}>Agora</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.levelTextMiddle}>Média</Text>
        <Text style={styles.timeTextMiddle}>1 Semana</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.levelTextRight}>Profissional</Text>
        <Text style={styles.timeTextRight}>{formationTime}</Text>
      </View>

      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => navigation.navigate('Game')} 
      >
        <Text style={styles.continueButtonText}>CONTINUAR</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#282828",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 30,
    fontWeight: 'bold',
    top: -40,
    textAlign: 'center',
  },
  progressContainer: {
    position: 'relative',
    height: 300,
    width: 400, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  diagonalLine: {
    position: 'absolute',
    width: '100%',
    height: 2,
    backgroundColor: '#fff',
    transform: [{ rotate: '150deg' }], 
  },
  dot: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#cb9fc6',
  },
  dotLeft: {
    top: 240,
    left: 18,
  },
  dotMiddle: {
    top: '50%',
    left: '50%',
    marginLeft: -10,
    marginTop: -10, 
  },
  dotRight: {
    bottom: 240,
    right: 20, 
  },
  textContainer: {
    position: 'absolute',
    width: '100%',
    justifyContent: 'space-between',
  },
  levelTextLeft: {
    position: 'absolute',
    right: 338,
    top: 55, 
    color: '#ca8efb',
    fontSize: 16,
    fontWeight: 'bold',
  },
  levelTextMiddle: {
    position: 'absolute',
    left: '43%',
    top: -40, 
    color: '#ca8efb',
    fontSize: 16,
    fontWeight: 'bold',
  },
  levelTextRight: {
    position: 'absolute',
    right: -10, 
    bottom: 110, 
    color: '#ca8efb',
    fontSize: 16,
    fontWeight: 'bold',
  },
  timeTextLeft: {
    position: 'absolute',
    left: -5, 
    top: 120,
    color: '#ddd',
    fontWeight: 'bold',
    fontSize: 14,
  },
  timeTextMiddle: {
    position: 'absolute',
    left: '50%',
    marginLeft: -30,
    top: 30,
    color: '#ddd',
    fontWeight: 'bold',
    fontSize: 14,
  },
  timeTextRight: {
    position: 'absolute',
    right: -10,
    bottom: 30,
    fontWeight: 'bold',
    color: '#ddd',
    fontSize: 14,
  },
  continueButton: {
    backgroundColor: '#f7e1c9', 
    padding: 15,
    borderRadius: 25,
    marginVertical: 10,
    width: '80%', 
    alignItems: 'center',
    position: 'relative', 
  },
  continueButtonText: {
    color: '#4d1948',
    fontSize: 18, 
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default TrilhaScreen;
