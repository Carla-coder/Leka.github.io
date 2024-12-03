import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SummaryScreen = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSummaryVisible, setIsSummaryVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [summary, setSummary] = useState('');
  const [summaries, setSummaries] = useState([]);

  useEffect(() => {
    const loadSummaries = async () => {
      try {
        const savedSummaries = await AsyncStorage.getItem('summaries');
        if (savedSummaries) {
          setSummaries(JSON.parse(savedSummaries));
        }
      } catch (error) {
        console.error("Erro ao carregar resumos:", error);
      }
    };
    loadSummaries();
  }, []);

  useEffect(() => {
    const saveSummaries = async () => {
      try {
        await AsyncStorage.setItem('summaries', JSON.stringify(summaries));
      } catch (error) {
        console.error("Erro ao salvar resumos:", error);
      }
    };
    saveSummaries();
  }, [summaries]);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setTitle('');
    setDescription('');
    setSummary('');
  };

  const saveSummary = () => {
    const newSummary = { title, description, summary };
    setSummaries([...summaries, newSummary]);
    closeModal();
  };

  const openSummary = (item) => {
    setTitle(item.title);
    setDescription(item.description);
    setSummary(item.summary);
    setIsSummaryVisible(true);
  };

  const closeSummary = () => {
    setIsSummaryVisible(false);
  };

  const deleteSummary = (index) => {
    const updatedSummaries = summaries.filter((_, idx) => idx !== index);
    setSummaries(updatedSummaries);
  };

  const editSummary = (index) => {
    const item = summaries[index];
    setTitle(item.title);
    setDescription(item.description);
    setSummary(item.summary);
    setIsModalVisible(true);
    deleteSummary(index);
  };

  const renderSummaryItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => openSummary(item)} style={styles.card}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDescription}>{item.description}</Text>

      <View style={styles.cardActions}>
        <TouchableOpacity onPress={() => editSummary(index)} style={styles.actionButton}>
          <MaterialIcons name="edit" size={24} color="#cb9fc6" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteSummary(index)} style={styles.actionButton}>
          <MaterialIcons name="delete" size={24} color="#cb9fc6" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumo</Text>
      <Text style={styles.content}>Aqui estão os seus resumos que você criou!</Text>

      <FlatList
        data={summaries}
        renderItem={renderSummaryItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.summaryList}
      />

      <TouchableOpacity style={styles.addButton} onPress={openModal}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Adicionar Resumo:</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Título"
              placeholderTextColor="#aaa"
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              style={styles.input}
              placeholder="Descrição"
              placeholderTextColor="#aaa"
              value={description}
              onChangeText={setDescription}
            />
            <TextInput
              style={styles.summaryInput}
              placeholder="Resumo"
              placeholderTextColor="#aaa"
              value={summary}
              onChangeText={setSummary}
              multiline
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={closeModal}>
                <Text style={styles.buttonText}>Descartar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={saveSummary}>
                <Text style={styles.buttonText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={isSummaryVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{title}</Text>
            <Text style={styles.cardSummary}>{summary}</Text>

            <TouchableOpacity style={styles.closeButton} onPress={closeSummary}>
              <Text style={styles.buttonText}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.bottomMenu}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Game')}>
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
  title: {
    color: '#f7e1c9',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 10,
    textAlign: 'center',
  },
  content: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: 100,
    right: 30,
    backgroundColor: '#f7e1c9',
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#4d1948',
    fontSize: 30,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    borderWidth: 2, 
    borderColor: '#cb9fc6',
  },
  modalTitle: {
    color: '#f7e1c9',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#f7e1c9',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#f7e1c9',
  },
  summaryInput: {
    height: 120,
    borderColor: '#f7e1c9',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#f7e1c9',
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: '#cb9fc6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: '#cb9fc6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  summaryList: {
    width: '95%',
    marginBottom: 80,
    marginLeft:11,
  },
  card: {
    backgroundColor: '#444',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    position: 'relative',
    borderWidth: 2, 
    borderColor: '#cb9fc6',
  },
  cardTitle: {
    color: '#f7e1c9',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardDescription: {
    color: '#fff',
    fontSize: 14,
  },
  cardSummary: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
  },
  cardActions: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 60,
  },
  actionButton: {
    marginRight: 5,
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
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#cb9fc6',
    borderRadius: 25,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SummaryScreen;
