import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  TextInput, 
  Image, 
  Animated,
  Easing,
  Platform,
  StatusBar,
  KeyboardAvoidingView,
  SafeAreaView
} from 'react-native';
import { Constant } from '../utils/Constant';
import { SearchOutlined, MoreOutlined, CameraOutlined, UserOutlined, AudioOutlined, SendOutlined } from '@ant-design/icons';

// Données simulées pour les conversations
const conversations = [
  {
    id: '1',
    name: 'Dr. Aminata Traoré',
    specialty: 'Gynécologue',
    lastMessage: 'Bonjour, comment allez-vous aujourd\'hui?',
    time: '10:30',
    unread: 2,
    avatar: 'https://i.pinimg.com/736x/97/9c/45/979c45048ee5eec6200d85baf54a0ad8.jpg',
    online: true,
    messages: [
      { id: '1', text: 'Bonjour, comment allez-vous aujourd\'hui?', time: '10:30', sender: 'them' },
      { id: '2', text: 'Je me sens un peu fatiguée.', time: '10:32', sender: 'me' },
      { id: '3', text: 'C\'est normal à ce stade de votre grossesse. Avez-vous bien dormi?', time: '10:35', sender: 'them' },
    ]
  },
  {
    id: '2',
    name: 'Dr. Oumou Diarra',
    specialty: 'Sage-femme',
    lastMessage: 'N\'oubliez pas votre rendez-vous demain.',
    time: '09:15',
    unread: 0,
    avatar: 'https://i.pinimg.com/736x/59/67/44/596744f107b7b7fe542f2dfa52d63232.jpg',
    online: false,
    messages: [
      { id: '1', text: 'N\'oubliez pas votre rendez-vous demain.', time: '09:15', sender: 'them' },
      { id: '2', text: 'D\'accord, je serai présente à 10h. Merci docteur!', time: '09:18', sender: 'me' },
    ]
  },
  {
    id: '3',
    name: 'Service Client',
    specialty: 'Support',
    lastMessage: 'Votre question a été résolue.',
    time: 'Hier',
    unread: 0,
    avatar: 'https://i.pinimg.com/736x/78/f8/1f/78f81f4825eaede5ca2da624a65957a0.jpg',
    online: true,
    messages: [
      { id: '1', text: 'Bonjour, comment pouvons-nous vous aider?', time: 'Hier', sender: 'them' },
      { id: '2', text: 'J\'ai un problème avec mon compte.', time: 'Hier', sender: 'me' },
      { id: '3', text: 'Votre question a été résolue.', time: '11:45', sender: 'them' },
    ]
  },
];

export default function Messagerie({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeConversation, setActiveConversation] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [conversationsList, setConversationsList] = useState(conversations);
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, []);

  const filteredConversations = conversationsList.filter(conv => 
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openConversation = (conversation) => {
    setActiveConversation(conversation);
  };

  const closeConversation = () => {
    setActiveConversation(null);
    setMessageText('');
  };

  const sendMessage = () => {
    if (messageText.trim() === '') return;
    
    const newMessage = {
      id: Date.now().toString(),
      text: messageText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: 'me'
    };
    
    const updatedConversations = conversationsList.map(conv => {
      if (conv.id === activeConversation.id) {
        return {
          ...conv,
          lastMessage: messageText,
          time: 'Maintenant',
          messages: [...conv.messages, newMessage]
        };
      }
      return conv;
    });
    
    setConversationsList(updatedConversations);
    setActiveConversation(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage]
    }));
    setMessageText('');
  };

  const renderConversation = ({ item, index }) => {
    const translateY = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [50 * (index + 1), 0],
    });
    
    const opacity = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    return (
      <Animated.View style={{ transform: [{ translateY }], opacity }}>
        <TouchableOpacity 
          style={styles.conversationItem}
          onPress={() => openConversation(item)}
          activeOpacity={0.7}
        >
          <View style={styles.avatarContainer}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            {item.online && <View style={styles.onlineIndicator} />}
          </View>
          <View style={styles.conversationContent}>
            <View style={styles.conversationHeader}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
            <Text style={styles.specialty}>{item.specialty}</Text>
            <Text style={styles.lastMessage} numberOfLines={1}>{item.lastMessage}</Text>
          </View>
          {item.unread > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{item.unread}</Text>
            </View>
          )}
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderMessage = ({ item }) => (
    <View style={[
      styles.messageBubble, 
      item.sender === 'me' ? styles.myMessage : styles.theirMessage
    ]}>
      <Text style={[
        styles.messageText,
        item.sender === 'me' ? styles.myMessageText : styles.theirMessageText
      ]}>
        {item.text}
      </Text>
      <Text style={styles.messageTime}>{item.time}</Text>
    </View>
  );

  if (activeConversation) {
    return (
      <SafeAreaView style={styles.conversationContainer}>
        <StatusBar barStyle="dark-content" backgroundColor={Constant.couleur.blanc} />
        <View style={styles.conversationHeader}>
          <TouchableOpacity onPress={closeConversation} style={styles.backButton}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <View style={styles.conversationAvatarContainer}>
            <Image source={{ uri: activeConversation.avatar }} style={styles.conversationAvatar} />
            {activeConversation.online && <View style={styles.conversationOnlineIndicator} />}
          </View>
          <View style={styles.conversationInfo}>
            <Text style={styles.conversationName}>{activeConversation.name}</Text>
            <Text style={styles.conversationSpecialty}>{activeConversation.specialty}</Text>
          </View>
          <TouchableOpacity style={styles.moreButton}>
            <MoreOutlined size={24} color={Constant.couleur.texte} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={activeConversation.messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
        />

        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.inputContainer}
        >
          <View style={styles.inputWrapper}>
            <TouchableOpacity style={styles.inputIcon}>
              <CameraOutlined size={24} color={Constant.couleur.primaire} />
            </TouchableOpacity>
            <TextInput
              style={styles.messageInput}
              placeholder="Écrivez un message..."
              value={messageText}
              onChangeText={setMessageText}
              multiline
            />
            <TouchableOpacity style={styles.inputIcon}>
              <AudioOutlined size={24} color={Constant.couleur.primaire} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.sendButton, !messageText && styles.sendButtonDisabled]}
              onPress={sendMessage}
              disabled={!messageText}
            >
              <SendOutlined size={20} color={Constant.couleur.blanc} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Constant.couleur.blanc} />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        <TouchableOpacity>
          <MoreOutlined size={24} color={Constant.couleur.texte} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <SearchOutlined size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher une conversation..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <FlatList
        data={filteredConversations}
        renderItem={renderConversation}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
      
      <TouchableOpacity 
        style={styles.newMessageButton}
        onPress={() => navigation.navigate('NouvelleConversation')}
        activeOpacity={0.8}
      >
        <View style={styles.newMessageButtonInner}>
          <Text style={styles.newMessageText}>+</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constant.couleur.blanc,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Constant.espacement.moyen,
    paddingVertical: Constant.espacement.moyen,
    borderBottomWidth: 1,
    borderBottomColor: Constant.couleur.grisClair,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Constant.couleur.texte,
  },
  searchContainer: {
    padding: Constant.espacement.moyen,
    borderBottomWidth: 1,
    borderBottomColor: Constant.couleur.grisClair,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Constant.couleur.gris,
    borderRadius: 20,
    paddingHorizontal: Constant.espacement.moyen,
  },
  searchIcon: {
    marginRight: Constant.espacement.petit,
  },
  searchInput: {
    flex: 1,
    paddingVertical: Constant.espacement.moyen,
    fontSize: Constant.typographie.corps,
    color: Constant.couleur.texte,
  },
  listContent: {
    padding: Constant.espacement.moyen,
  },
  conversationItem: {
    flexDirection: 'row',
    backgroundColor: Constant.couleur.blanc,
    borderRadius: 15,
    padding: Constant.espacement.moyen,
    marginBottom: Constant.espacement.moyen,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: Constant.espacement.moyen,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: Constant.couleur.blanc,
  },
  conversationContent: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: Constant.typographie.corps,
    fontWeight: 'bold',
    color: Constant.couleur.texte,
  },
  time: {
    fontSize: Constant.typographie.legende,
    color: '#888',
  },
  specialty: {
    fontSize: Constant.typographie.legende,
    color: Constant.couleur.primaire,
    marginBottom: 4,
    fontWeight: '500',
  },
  lastMessage: {
    fontSize: Constant.typographie.legende,
    color: '#666',
  },
  unreadBadge: {
    backgroundColor: Constant.couleur.primaire,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Constant.espacement.moyen,
  },
  unreadText: {
    color: Constant.couleur.blanc,
    fontSize: 12,
    fontWeight: 'bold',
  },
  newMessageButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  newMessageButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Constant.couleur.primaire,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  newMessageText: {
    color: Constant.couleur.blanc,
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: -2,
  },
  // Styles pour l'écran de conversation
  conversationContainer: {
    flex: 1,
    backgroundColor: Constant.couleur.gris,
  },
  conversationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Constant.espacement.moyen,
    backgroundColor: Constant.couleur.blanc,
    borderBottomWidth: 1,
    borderBottomColor: Constant.couleur.grisClair,
  },
  backButton: {
    marginRight: Constant.espacement.moyen,
  },
  backButtonText: {
    fontSize: 24,
    color: Constant.couleur.texte,
  },
  conversationAvatarContainer: {
    position: 'relative',
    marginRight: Constant.espacement.moyen,
  },
  conversationAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  conversationOnlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: Constant.couleur.blanc,
  },
  conversationInfo: {
    flex: 1,
  },
  conversationName: {
    fontSize: Constant.typographie.corps,
    fontWeight: 'bold',
    color: Constant.couleur.texte,
  },
  conversationSpecialty: {
    fontSize: Constant.typographie.legende,
    color: '#888',
  },
  moreButton: {
    padding: 5,
  },
  messagesList: {
    padding: Constant.espacement.moyen,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 18,
    marginBottom: Constant.espacement.moyen,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: Constant.couleur.primaire,
    borderBottomRightRadius: 4,
  },
  theirMessage: {
    alignSelf: 'flex-start',
    backgroundColor: Constant.couleur.blanc,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: Constant.typographie.corps,
    marginBottom: 4,
  },
  myMessageText: {
    color: Constant.couleur.blanc,
  },
  theirMessageText: {
    color: Constant.couleur.texte,
  },
  messageTime: {
    fontSize: 10,
    opacity: 0.7,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    padding: Constant.espacement.moyen,
    backgroundColor: Constant.couleur.blanc,
    borderTopWidth: 1,
    borderTopColor: Constant.couleur.grisClair,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Constant.couleur.gris,
    borderRadius: 24,
    paddingHorizontal: Constant.espacement.moyen,
  },
  messageInput: {
    flex: 1,
    paddingVertical: Constant.espacement.moyen,
    fontSize: Constant.typographie.corps,
    color: Constant.couleur.texte,
    maxHeight: 100,
  },
  inputIcon: {
    padding: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Constant.couleur.primaire,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Constant.espacement.petit,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});