import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, FlatList, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState({ nome: '', email: '', celular: '', id: '' });
  const [profileImage, setProfileImage] = useState('https://i.pinimg.com/736x/3f/94/70/3f9470b34a8e3f526dbdb022f9f19cf7.jpg');
  const [isModalVisible, setModalVisible] = useState(false);
  const [isProgressModalVisible, setProgressModalVisible] = useState(false);
  const [userProgress, setUserProgress] = useState(0);
  const [isCertificateModalVisible, setCertificateModalVisible] = useState(false);
  const [isFriendsModalVisible, setFriendsModalVisible] = useState(false);
  const [acceptedFriends, setAcceptedFriends] = useState([]);

  const profileImages = [
    'https://img.freepik.com/vetores-premium/uma-ilustracao-de-desenho-animado-de-uma-menina-com-fones-de-ouvido-e-um-telefone-celular-na-mao_569725-49415.jpg?semt=ais_hybrid',
    'https://img.freepik.com/vetores-premium/jogador-de-desenhos-animados-feliz-segurando-um-joystick-com-um-grande-sorriso_657438-25584.jpg',
    'https://cdn-icons-png.flaticon.com/512/1752/1752713.png',
    'https://png.pngtree.com/png-vector/20230416/ourmid/pngtree-avatar-ninja-symbol-icon-vector-png-image_6709524.png',
    'https://cdn-icons-png.flaticon.com/512/1752/1752767.png',
  ];

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const currentUserString = await AsyncStorage.getItem('currentUser');
        if (currentUserString) {
          const userData = JSON.parse(currentUserString);
          setUser(userData);
          fetchUserProgress(userData.email);
          fetchUserFriends(userData.email);
        }
      } catch (error) {
        console.error('Erro ao buscar os dados do usuário logado:', error);
      }
    };

    const loadProfileImage = async () => {
      const savedImage = await AsyncStorage.getItem('profileImage');
      if (savedImage) {
        setProfileImage(savedImage);
      }
    };

    loadUserData();
    loadProfileImage();
  }, []);

  const handleImageSelect = async (imageUri) => {
    setProfileImage(imageUri);
    await AsyncStorage.setItem('profileImage', imageUri);
    setModalVisible(false);
  };

  const fetchUserProgress = async (email) => {
    try {
      const userData = await AsyncStorage.getItem(`userData_${email}`);
      if (userData) {
        const { progress } = JSON.parse(userData);
        setUserProgress(progress);
      }
    } catch (error) {
      console.error('Erro ao buscar o progresso do usuário:', error);
    }
  };

  const fetchUserFriends = async (email) => {
    try {
      const friendsData = await AsyncStorage.getItem(`friends_${email}`);
      if (friendsData) {
        const friends = JSON.parse(friendsData);
        setAcceptedFriends(friends.filter(friend => friend.status === 'accepted'));
      }
    } catch (error) {
      console.error('Erro ao buscar os amigos do usuário:', error);
    }
  };

  const getModuleStatus = (moduleNumber) => {
    const completedModules = Math.floor(userProgress / 10);
    if (moduleNumber < completedModules) {
      return 'Completo';
    } else if (moduleNumber === completedModules) {
      return 'Em andamento';
    } else {
      return 'Não iniciado';
    }
  };

  const generateCertificate = () => {
    const completionDate = new Date().toLocaleDateString();
    const courseCompletionRate = Math.min(userProgress / 100, 1);

    return (
      <View style={styles.certificateContainer}>
        <Text style={styles.certificateTitle}>Certificado de Conclusão</Text>
        <Text style={styles.certificateText}>Nome: {user.nome}</Text>
        <Text style={styles.certificateText}>
          Aproveitamento: {Math.round(courseCompletionRate * 100)}%
        </Text>
        <Text style={styles.certificateText}>Data de Conclusão: {completionDate}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileImageContainer}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        </TouchableOpacity>
      </View>
      <Text style={styles.name}>{user.nome}</Text>
      <Text style={styles.userId}>ID: {user.id}</Text>
      <Text style={styles.contactInfo}>{user.email} | {user.celular}</Text>

      <TouchableOpacity style={styles.button} onPress={() => setProgressModalVisible(true)}>
        <Text style={styles.buttonText}>Progresso: {userProgress}%</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => setCertificateModalVisible(true)}>
        <Text style={styles.buttonText}>Certificados</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.editButton}>
        <Text style={styles.editButtonText}>ALTERAR PERFIL</Text>
      </TouchableOpacity>

      {/* Modal para selecionar a imagem de perfil */}
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Escolha uma imagem</Text>
            <FlatList
              data={profileImages}
              horizontal
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.imageItem} onPress={() => handleImageSelect(item)}>
                  <Image source={{ uri: item }} style={styles.modalImage} />
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal de Progresso */}
      <Modal visible={isProgressModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Progresso</Text>
            <ScrollView>
              {[...Array(10).keys()].map((moduleIndex) => {
                const status = getModuleStatus(moduleIndex + 1);
                const circleColor = status === 'Completo' ? '#4CAF50' : status === 'Em andamento' ? '#FFEB3B' : '#BDBDBD';

                return (
                  <View key={moduleIndex} style={styles.moduleRow}>
                    <View style={[styles.statusCircle, { backgroundColor: circleColor }]} />
                    <Text style={styles.modalText}>Módulo {moduleIndex + 1}: {status}</Text>
                  </View>
                );
              })}
            </ScrollView>
            <TouchableOpacity onPress={() => setProgressModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal de Certificado */}
      <Modal visible={isCertificateModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Certificados</Text>
            {userProgress >= 100 ? generateCertificate() : (
              <Text style={styles.modalText}>Complete 10 módulos para obter um certificado.</Text>
            )}
            <TouchableOpacity onPress={() => setCertificateModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Bottom Menu */}
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 60,
  },
  imageListContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    paddingVertical: 10,
  },
  imageItem: {
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#4d1948',
    borderRadius: 10,
    padding: 2,
  },
  modalImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  userId: {
    fontSize: 16,
    color: '#f7e1c9',
    marginBottom: 5,
  },
  profileImageContainer: {
    width: 180,
    height: 180,
    borderRadius: 300,
    backgroundColor: '#7d5ba6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  certificateContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  certificateTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  certificateText: {
    fontSize: 16,
    marginBottom: 5,
  },
  profileImage: {
    width: 170,
    height: 170,
    borderRadius: 100,
  },
  name: {
    fontSize: 22,
    color: '#f7e1c9',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  contactInfo: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
  },
  button: {
    width: '80%',
    backgroundColor: '#f7e1c9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4d1948',
  },
  buttonText: {
    color: '#4d1948',
    fontWeight: 'bold',
    fontSize: 16,
  },
  editButton: {
    backgroundColor: '#a469aa',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 25,
    marginTop: 20,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#f7e1c9',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4d1948',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
    marginVertical: 5,
  },
  statusCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  moduleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  closeButton: {
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#a469aa',
    borderRadius: 10,
  },
  closeButtonText: {
    color: '#fff',
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
});

export default ProfileScreen;