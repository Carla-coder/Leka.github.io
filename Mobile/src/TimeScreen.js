import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

const gifSource = require('./assets/tempo.gif');

const LearningTimeScreen = () => {
  const [selectedOption, setSelectedOption] = useState("Casual");
  const navigation = useNavigation(); 

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    navigation.navigate('Trilha', { selectedOption });
  };

  return (
    <View style={styles.screenContainer}>
      <Image 
        source={gifSource} 
        style={styles.gif}
        resizeMode="contain" 
      />
      <Text style={styles.title}>Quanto tempo você quer gastar aprendendo?</Text>
      
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[
            styles.option,
            selectedOption === "Casual" && styles.selectedOption
          ]}
          onPress={() => handleOptionChange("Casual")}
        >
          <Text style={styles.optionText}>Casual - 5 Minutos</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.option,
            selectedOption === "Regular" && styles.selectedOption
          ]}
          onPress={() => handleOptionChange("Regular")}
        >
          <Text style={styles.optionText}>Regular - 10 Minutos</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.option,
            selectedOption === "Sério" && styles.selectedOption
          ]}
          onPress={() => handleOptionChange("Sério")}
        >
          <Text style={styles.optionText}>Sério - 20 Minutos</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.continueButton} onPress={handleSubmit}>
        <Text style={styles.continueButtonText}>CONTINUAR</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    textAlign: "center",
    padding: 20,
    backgroundColor: "#282828",
    justifyContent: "center",
    alignItems: "center",
  },
  gif: {
    width: 300, 
    height: 300, 
    position: 'relative', 
    top: -50,
  },
  title: {
    fontSize: 25,
    color: '#fff',
    fontWeight: 'bold',
    top: -80,
    textAlign: 'center',
  },
  optionsContainer: {
    backgroundColor: "#cb9fc6",
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
    width: "80%",
    maxWidth: 300,
    top: -50,
  },
  option: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "transparent",
  },
  selectedOption: {
    backgroundColor: "#f7e1c9",
  },
  optionText: {
    color: "#4d1948",
    fontWeight: 'bold',
    fontSize: 16,
  },
  continueButton: {
    backgroundColor: '#f7e1c9', 
    padding: 15,
    borderRadius: 25,
    marginVertical: 10,
    width: '80%', 
    alignItems: 'center',
    position: 'relative', 
    top: -60,
  },
  continueButtonText: {
    color: '#4d1948',
    fontSize: 18, 
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LearningTimeScreen;
