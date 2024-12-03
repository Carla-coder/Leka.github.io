import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Alert, Modal, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const CommunityScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [createCommunityModalVisible, setCreateCommunityModalVisible] = useState(false);
  const [acceptedFriendsModalVisible, setAcceptedFriendsModalVisible] = useState(false);
  const [friendId, setFriendId] = useState('');
  const [friends, setFriends] = useState([]);
  const [invites, setInvites] = useState([]);
  const [acceptedFriends, setAcceptedFriends] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [communityName, setCommunityName] = useState('');
  const [communityDescription, setCommunityDescription] = useState('');
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [communities, setCommunities] = useState([]);
  useEffect(() => {
    const loadData = async () => {
      const currentUserString = await AsyncStorage.getItem('currentUser');
      const user = currentUserString ? JSON.parse(currentUserString) : null;
      setCurrentUser(user);

      if (user) {
        // Filtrar convites para o usuário atual (mostrar apenas convites recebidos)
        const invitesString = await AsyncStorage.getItem('invites');
        const storedInvites = invitesString ? JSON.parse(invitesString) : [];

        // Aqui, filtra convites para o usuário atual
        const receivedInvites = storedInvites.filter(invite => invite.inviteTo === user.id);
        setInvites(receivedInvites);  // Atualiza os convites somente para o usuário atual

        // Carregar amigos aceitos
        const acceptedFriendsString = await AsyncStorage.getItem('acceptedFriends');
        const storedAcceptedFriends = acceptedFriendsString ? JSON.parse(acceptedFriendsString) : [];
        setAcceptedFriends(storedAcceptedFriends.filter(friend =>
          friend.userId === user.id || friend.friendId === user.id
        ));

        // Carregar lista de amigos
        const usersString = await AsyncStorage.getItem('users');
        const users = usersString ? JSON.parse(usersString) : [];
        setFriends(users);

        // Carregar comunidades
        const communitiesString = await AsyncStorage.getItem('communities');
        const storedCommunities = communitiesString ? JSON.parse(communitiesString) : [];
        setCommunities(storedCommunities.filter(community =>
          community.createdBy === user.id || community.participants.includes(user.id)
        ));
      }
    };
    loadData();
  }, []);



  const addFriend = async () => {
    if (friendId.trim() !== '') {
      try {
        const usersString = await AsyncStorage.getItem('users');
        const users = usersString ? JSON.parse(usersString) : [];
        const friend = users.find((user) => user.id === friendId);

        if (friend) {
          sendInvite(friend);
        } else {
          Alert.alert('Erro', 'ID de amigo não encontrado.');
        }
      } catch (error) {
        Alert.alert('Erro', 'Ocorreu um erro ao buscar o amigo.');
      }
    } else {
      Alert.alert('Erro', 'Por favor, insira o ID do amigo.');
    }
  };

  const sendInvite = async (friend) => {
    if (currentUser) {
      try {
        // Criar um novo convite
        const newInvite = {
          id: Date.now().toString(),
          inviteFrom: currentUser.id, // Remetente
          inviteTo: friend.id, // Destinatário
          status: 'pendente',
          nome: friend.nome,
        };

        // Atualizar apenas os convites que são enviados para o amigo (não inclui o remetente)
        const updatedInvites = [...invites.filter(invite => invite.inviteTo !== currentUser.id), newInvite];
        setInvites(updatedInvites); // Atualizar estado
        await AsyncStorage.setItem('invites', JSON.stringify(updatedInvites)); // Atualizar no AsyncStorage

        Alert.alert('Convite Enviado', `Convite enviado para ${friend.nome}`);
      } catch (error) {
        Alert.alert('Erro', 'Ocorreu um erro ao enviar o convite.');
      }
    }
  };



  const acceptInvite = async (invite) => {
    try {
      const friendName = friends.find(friend => friend.id === invite.inviteFrom)?.nome || 'Amigo';

      const newAcceptedFriend = {
        id: Date.now().toString(),
        userId: currentUser.id,
        friendId: invite.inviteFrom,
        nome: friendName,
      };

      const newAcceptedForSender = {
        id: Date.now().toString(),
        userId: invite.inviteFrom,
        friendId: currentUser.id,
        nome: currentUser.nome,
      };

      const updatedAcceptedFriends = [
        ...acceptedFriends,
        newAcceptedFriend,
        newAcceptedForSender,
      ];

      const uniqueAcceptedFriends = updatedAcceptedFriends.filter((friend, index, self) =>
        index === self.findIndex((f) =>
          (f.userId === friend.userId && f.friendId === friend.friendId) ||
          (f.userId === friend.friendId && f.friendId === friend.userId)
        )
      );

      setAcceptedFriends(uniqueAcceptedFriends);

      const updatedInvites = invites.filter((item) => item.id !== invite.id); // Excluir convite do destinatário
      setInvites(updatedInvites);

      await AsyncStorage.setItem('acceptedFriends', JSON.stringify(uniqueAcceptedFriends));
      await AsyncStorage.setItem('invites', JSON.stringify(updatedInvites));

    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao aceitar o convite.');
    }
  };


  const createCommunity = async () => {
    if (communityName.trim() === '' || communityDescription.trim() === '') {
      Alert.alert('Erro', 'Por favor, preencha o nome e a descrição da comunidade.');
      return;
    }

    try {
      const newCommunity = {
        id: Date.now().toString(),
        name: communityName,
        description: communityDescription,
        createdBy: currentUser.id,
        participants: [currentUser.id, ...selectedParticipants],
      };

      const updatedCommunities = [...communities, newCommunity];
      setCommunities(updatedCommunities);
      await AsyncStorage.setItem('communities', JSON.stringify(updatedCommunities));

      Alert.alert('Comunidade Criada', `A comunidade "${communityName}" foi criada com sucesso!`);
      setCommunityName('');
      setCommunityDescription('');
      setSelectedParticipants([]);
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao criar a comunidade.');
    }
  };

  const deleteCommunity = async (communityId) => {
    const updatedCommunities = communities.filter(community => community.id !== communityId);
    setCommunities(updatedCommunities);
    await AsyncStorage.setItem('communities', JSON.stringify(updatedCommunities));
    Alert.alert('Comunidade Excluída', 'A comunidade foi excluída com sucesso!');
  };

  const toggleParticipantSelection = (friendId) => {
    setSelectedParticipants(prevSelected => {
      if (prevSelected.includes(friendId)) {
        return prevSelected.filter(id => id !== friendId);
      } else {
        return [...prevSelected, friendId];
      }
    });
  };

  const enterCommunity = (community) => {
    navigation.navigate('CommunityScreen', { community });
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={() => setCreateCommunityModalVisible(true)}>
          <Text style={styles.TextButton}>Criar Comunidade</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.TextButton}>Adicionar Amigos</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de Comunidades Criadas */}
      <View style={styles.communitiesContainer}>
        <FlatList
          data={communities}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.communityItem}>
              <TouchableOpacity onPress={() => enterCommunity(item)}>
                <Text style={styles.communityName}>{item.name}</Text>
                <Text style={styles.communityDescription}>{item.description}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => deleteCommunity(item.id)}>
                <MaterialIcons name="delete" size={24} color="#cb9fc6" />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      {/* Modal Adicionar Amigos */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.closeText}>×</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Adicionar Amigos</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="ID do amigo"
              placeholderTextColor="#999"
              value={friendId}
              onChangeText={setFriendId}
            />
            <TouchableOpacity style={styles.searchButton} onPress={addFriend}>
              <FontAwesome name="search" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <Text style={styles.subtitle}>Convites Pendentes</Text>
          <FlatList
            data={invites}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.inviteItem}>
                <Text style={styles.inviteText}>Convite para {item.nome}</Text>
                <TouchableOpacity onPress={() => acceptInvite(item)} style={styles.acceptButton}>
                  <Text style={styles.acceptButtonText}>Aceitar</Text>
                </TouchableOpacity>
              </View>
            )}
          />

        </View>
      </Modal>
      <TouchableOpacity
        style={styles.acceptedFriendsButton}
        onPress={() => setAcceptedFriendsModalVisible(true)}
      >
        <FontAwesome name="user" size={24} color="#4d1948" />
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={acceptedFriendsModalVisible}
        onRequestClose={() => setAcceptedFriendsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setAcceptedFriendsModalVisible(false)}>
            <Text style={styles.closeText}>×</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Amigos</Text>

          <FlatList
            data={acceptedFriends}
            keyExtractor={(item) => `${item.userId}-${item.friendId}`}
            renderItem={({ item }) => {
              const friendName = friends.find(friend => friend.id === (item.userId === currentUser.id ? item.friendId : item.userId))?.nome || 'Amigo';
              return (
                <View style={styles.listItem}>
                  <Image source={require('./assets/logo.png')} style={styles.profileImage} />
                  <Text style={styles.listItemText}>
                    {friendName}
                  </Text>
                </View>
              );
            }}
            style={styles.list}
          />
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={createCommunityModalVisible}
        onRequestClose={() => setCreateCommunityModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setCreateCommunityModalVisible(false)}>
            <Text style={styles.closeText}>×</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Criar Comunidade</Text>

          <View style={styles.inputContainerr}>
            {/* Nome da comunidade */}
            <Text style={styles.inputLabel}>Nome da comunidade:</Text>
            <TextInput
              style={styles.inputt}
              placeholder="Nome da comunidade"
              placeholderTextColor="#999"
              value={communityName}
              onChangeText={setCommunityName}
            />

            {/* Descrição da comunidade */}
            <Text style={styles.inputLabel}>Descrição da comunidade:</Text>
            <TextInput
              style={styles.inputt}
              placeholder="Descrição da comunidade"
              placeholderTextColor="#999"
              value={communityDescription}
              onChangeText={setCommunityDescription}
            />
          </View>

          <Text style={styles.inputLabel}>Selecionar Participantes</Text>
          <FlatList
            data={friends}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.listItem}
                onPress={() => toggleParticipantSelection(item.id)}
              >
                <Text style={styles.listItemText}>
                  {item.nome}
                  {selectedParticipants.includes(item.id) && ' (Selecionado)'}
                </Text>
              </TouchableOpacity>
            )}
          />

          <TouchableOpacity style={styles.createButton} onPress={createCommunity}>
            <Text style={styles.buttonText}>Criar</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Menu Inferior */}
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
    padding: 20,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 40,
  },
  addButton: {
    backgroundColor: '#f7e1c9',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  TextButton: {
    color: '#4d1948',
    fontSize: 16,
    fontWeight: 'bold',
  },
  communitiesContainer: {
    flex: 1,
  },
  acceptButton: {
    backgroundColor: '#4d1948', // roxa
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginTop: 8,
  },
  acceptButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f7e1c9',
    marginBottom: 5,
  },
  acceptedFriendsButton: {
    position: 'absolute',
    bottom: 90,
    right: 10,
    backgroundColor: '#f7e1c9',
    padding: 16,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 20,
    borderRadius: 12,
    width: '80%',
    alignSelf: 'center',
    marginTop: 100,
    height: '50%',
    borderWidth: 1,
    borderColor: '#f7e1c9',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'transparent',
  },
  closeText: {
    color: '#b03892',
    fontSize: 30,
  },
  title: {
    color: '#f7e1c9',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  createButton: {
    backgroundColor: '#8e44ad', // Cor roxa para o botão
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#f5f5dc', // Cor bege para o texto
    textAlign: 'center',
    fontWeight: 'bold',
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
  },
  inputContainerr: {
    width: '80%',
    marginBottom: 20,
  },
  inputt: {
    height: 40,
    borderColor: '#8e44ad', // Roxo para as bordas
    borderWidth: 2,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 15,
    color: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#8e44ad', // Roxo para as bordas
    borderWidth: 2,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 15,
    color: '#fff',
  },
  subtitlee: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#444',
    color: '#f7e1c9',
    padding: 10,
    borderRadius: 8,
    flex: 1,
  },
  searchButton: {
    backgroundColor: '#b03892',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 15,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  inviteItem: {
    padding: 12,
    backgroundColor: '#444',
    marginBottom: 10,
    borderRadius: 8,
  },
  inviteText: {
    color: '#f7e1c9',
  },
  acceptButton: {
    backgroundColor: '#4d1948',
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  acceptButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  list: {
    marginBottom: 20,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#444',
    marginBottom: 10,
    borderRadius: 8,
  },
  profileImage: {
    width: 25,
    height: 25,
    borderRadius: 12,
    marginRight: 10,
  },
  listItemText: {
    color: '#f7e1c9',
    fontSize: 16,
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
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  communityItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#444',
    marginBottom: 15,
    width: 390,
    height: 90,
    alignSelf: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 8,
    borderWidth: 2, // Adicionando borda
    borderColor: '#cb9fc6', // Cor da borda
  },
  communityName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f7e1c9',
    marginBottom: 5,
    marginLeft: 10,
    marginTop: 20,
  },
  communityDescription: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 15,
    marginLeft: 10,
  },
  deleteButton: {
    top: -65,
    right: -346,
  },

});

export default CommunityScreen;