import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GameScreen = ({ navigation }) => {
  const [lives, setLives] = useState(5);
  const [score, setScore] = useState(100);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const savedProgress = await AsyncStorage.getItem('userProgress');
        if (savedProgress !== null) {
          setProgress(parseInt(savedProgress, 10));
        }
      } catch (error) {
        console.error('Erro ao carregar o progresso:', error);
      }
    };
    loadProgress();
  }, []);

  useEffect(() => {
    const saveProgress = async () => {
      try {
        await AsyncStorage.setItem('userProgress', progress.toString());
      } catch (error) {
        console.error('Erro ao salvar o progresso:', error);
      }
    };
    saveProgress();
  }, [progress]);

  const goToGame = (phase) => {
    const screenMap = {
      0: 'Pergunta',
      1: 'Jogo1',
      2: 'Jogo2',
      3: 'Jogo3',
      4: 'Jogo4',
      5: 'Jogo5',
      6: 'Jogo6',
      7: 'Jogo7',
      8: 'Jogo8',
      9: 'Jogo9',
    };

    const targetScreen = screenMap[phase];
    if (targetScreen) {
      navigation.navigate(targetScreen);

      setTimeout(() => {
        if (phase < 9) {
          setLives(lives + 1);
          setScore(score + 100);
          setProgress(progress + 10);
        }
      }, 1000);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.lives}>
          <Text style={styles.headerText}>❤️ {lives}</Text>
        </View>
        <View style={styles.score}>
          <Text style={styles.headerText}>🎯 {score}</Text>
        </View>
      </View>

      <View style={styles.coursePath}>
        <Text style={styles.courseTitle}>🏆 Progresso {progress}%</Text>
        <ScrollView style={styles.phaseScroll} contentContainerStyle={styles.pathContainer}>
          <View style={styles.extraSpace} />
          {[...Array(10).keys()].map((phase) => (
            <View key={phase} style={styles.phaseWrapper}>
              {phase > 0 && (
                <View
                  style={[
                    styles.diagonalLine,
                    phase % 2 === 0 ? styles.leftLine : styles.rightLine,
                  ]}
                />
              )}
              <TouchableOpacity
                onPress={() => goToGame(phase)}
                style={[
                  styles.phaseCircle,
                  phase % 2 === 0 ? styles.leftPhase : styles.rightPhase,
                ]}
              >
                <Text style={styles.phaseText}>{phase + 1}</Text>
              </TouchableOpacity>
            </View>
          ))}
          <View style={styles.extraSpace} />
        </ScrollView>
      </View>

      <View style={styles.bottomMenu}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Jogo')}>
          <MaterialIcons name="games" size={30} color="#4d1948" />
          <Text style={styles.menuText}>Jogo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Resumo')}>
          <MaterialIcons name="description" size={30} color="#4d1948" />
          <Text style={styles.menuText}>Resumo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Amigos')}>
          <MaterialIcons name="group" size={30} color="#4d1948" />
          <Text style={styles.menuText}>Amigos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Perfil')}>
          <MaterialIcons name="person" size={30} color="#4d1948" />
          <Text style={styles.menuText}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 30,
  },
  lives: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7e1c9',
    padding: 10,
    width: 120,
    borderRadius: 15,
    marginTop: 20,
  },
  score: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7e1c9',
    padding: 10,
    width: 120,
    borderRadius: 15,
    marginTop: 20,
  },
  headerText: {
    color: '#4d1948',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 23,
  },
  coursePath: {
    alignItems: 'center',
    marginVertical: 20,
    flex: 1,
    top: -20,
  },
  courseTitle: {
    color: '#4d1948',
    fontSize: 24,
    backgroundColor: '#f7e1c9',
    width: 340,
    height: 50,
    textAlign: 'center',
    borderRadius: 15,
    fontWeight: 'bold',
    paddingTop: 8,
  },
  phaseScroll: {
    flex: 1,
    width: '100%',
  },
  pathContainer: {
    alignItems: 'center',
  },
  phaseWrapper: {
    justifyContent: 'center',
    marginVertical: 20,
    position: 'relative',
    alignItems: 'center',
    width: '90%',
  },
  leftPhase: {
    alignSelf: 'flex-start',
    marginLeft: 50,
  },
  rightPhase: {
    alignSelf: 'flex-end',
    marginRight: 50,
  },
  phaseCircle: {
    width: 90,
    height: 70,
    borderRadius: 25,
    backgroundColor: '#a469aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  phaseText: {
    color: '#fff',
    fontSize: 22,
  },
  diagonalLine: {
    position: 'absolute',
    width: 3,
    height: 118,
    backgroundColor: '#fff',
  },
  leftLine: {
    left: 185,
    transform: [{ rotate: '240deg' }],
    top: -80,
  },
  rightLine: {
    right: 180,
    transform: [{ rotate: '-235deg' }],
    top: -80,
  },
  extraSpace: {
    height: 20,
  },
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#f7e1c9',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  menuItem: {
    alignItems: 'center',
  },
  menuText: {
    color: '#4d1948',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default GameScreen;
