import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CommunityChatScreen = ({ route, navigation }) => {
  const { community } = route.params; 
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const currentUserString = await AsyncStorage.getItem('currentUser');
      const user = currentUserString ? JSON.parse(currentUserString) : null;
      setCurrentUser(user);

      if (user) {
        const messagesString = await AsyncStorage.getItem('messages');
        const storedMessages = messagesString ? JSON.parse(messagesString) : [];
        setMessages(storedMessages.filter(msg => msg.communityId === community.id));
      }
    };
    loadData();
  }, [community]);

  const sendMessage = async () => {
    if (message.trim() === '') {
      Alert.alert('Erro', 'Por favor, digite uma mensagem.');
      return;
    }

    if (!currentUser) {
      Alert.alert('Erro', 'Você precisa estar logado para enviar mensagens.');
      return;
    }

    try {
      const newMessage = {
        id: Date.now().toString(),
        communityId: community.id,
        userId: currentUser.id,
        username: currentUser.nome,
        text: message,
        timestamp: new Date().toISOString(),
      };

      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      await AsyncStorage.setItem('messages', JSON.stringify(updatedMessages));

      setMessage('');
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao enviar a mensagem.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Comunidade {community.name}</Text>
      </View>

      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageItem,
              item.userId === currentUser?.id ? styles.userMessage : styles.otherMessage,
            ]}
          >
            <Text
              style={[
                styles.username,
                item.userId === currentUser?.id ? styles.userUsername : styles.otherUsername,
              ]}
            >
              {item.username}
            </Text>
            <Text
              style={[
                styles.messageText,
                item.userId === currentUser?.id ? styles.userMessageText : styles.otherMessageText,
              ]}
            >
              {item.text}
            </Text>
          </View>
        )}
        style={styles.messageList}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Digite uma mensagem"
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <FontAwesome name="paper-plane" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
    padding: 10,
    backgroundColor: '#b03892',
    borderRadius: 50,
    marginTop:15,
  },
  title: {
    fontSize: 24,
    color: '#f7e1c9',
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    marginTop:15,
  },
  messageList: {
    flex: 1,
    marginBottom: 20,
  },
  messageItem: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  userMessage: {
    backgroundColor: '#775287',
    alignSelf: 'flex-end',
    maxWidth: '90%',
  },
  otherMessage: {
    backgroundColor: '#a469aa', 
    alignSelf: 'flex-start', 
    maxWidth: '80%',
  },
  username: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  userUsername: {
    color: '#f7e1c9',
  },
  otherUsername: {
    color: '#f7e1c9',
  },
  messageText: {
    fontSize: 16,
    marginTop: 5,
  },
  userMessageText: {
    color: '#fff',
  },
  otherMessageText: {
    color: '#f7e1c9',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#444',
    borderRadius: 8,
    padding: 10,
  },
  input: {
    flex: 1,
    color: '#f7e1c9',
    backgroundColor: '#555',
    padding: 10,
    borderRadius: 8,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#b03892',
    padding: 12,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CommunityChatScreen;
