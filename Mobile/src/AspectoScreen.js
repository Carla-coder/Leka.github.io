import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AspectoScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Qual aspecto mais te interessa?</Text>
      <Button 
        title="Jogos"
        onPress={() => navigation.navigate('Fim')}
      />
      <Button 
        title="Sites"
        onPress={() => navigation.navigate('Fim')}
      />
      <Button 
        title="Não tenho certeza"
        onPress={() => navigation.navigate('Fim')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
  },
});

export default AspectoScreen;
