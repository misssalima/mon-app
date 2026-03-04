import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  FlatList,
  TextInput,
  Animated,
  Easing,
  Dimensions,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { Constant } from '../utils/Constant';
import { HeartOutlined, HeartFilled, MessageOutlined, ShareAltOutlined, EllipsisOutlined, SearchOutlined, CameraOutlined, VideoCameraOutlined } from '@ant-design/icons';

const { width: screenWidth } = Dimensions.get('window');

// Données de démonstration pour les publications
const communityPosts = [
  {
    id: '1',
    user: 'Aïssata D.',
    location: 'Kati, Mali',
    content: 'Grâce à Muso Santé, j\'ai pu consulter un gynécologue sans faire 3 heures de route. Ma grossesse est maintenant suivie régulièrement.',
    likes: 24,
    comments: 5,
    shares: 3,
    time: '2h',
    avatar: 'https://i.pinimg.com/736x/97/9c/45/979c45048ee5eec6200d85baf54a0ad8.jpg',
    image: 'https://i.pinimg.com/736x/78/f8/1f/78f81f4825eaede5ca2da624a65957a0.jpg',
    liked: false
  },
  {
    id: '2',
    user: 'Fatoumata K.',
    location: 'Sikasso, Mali',
    content: 'Les ressources éducatives m\'ont beaucoup aidée à comprendre mon corps et à prendre de meilleures décisions pour ma santé.',
    likes: 18,
    comments: 3,
    shares: 2,
    time: '5h',
    avatar: 'https://i.pinimg.com/736x/59/67/44/596744f107b7b7fe542f2dfa52d63232.jpg',
    image: 'https://i.pinimg.com/564x/0c/2d/8c/0c2d8c73f8d1d8f3b6d8c9e8d7f3c5b5.jpg',
    liked: true
  },
  {
    id: '3',
    user: 'Mariam C.',
    location: 'Bamako, Mali',
    content: 'Rencontré d\'autres mamans dans ma région grâce à la communauté Muso Santé. Ensemble, nous nous soutenons mutuellement!',
    likes: 32,
    comments: 7,
    shares: 4,
    time: '1j',
    avatar: 'https://i.pinimg.com/564x/8a/3d/8c/8a3d8c6d9b8d0b9e8d7f3c5b5e8d7f3c.jpg',
    image: 'https://i.pinimg.com/1200x/90/67/e3/9067e3d95a0f1b898b25ce6c8512e861.jpg',
    liked: false
  },
];

const stories = [
  {
    id: '1',
    user: 'Aïssata',
    avatar: 'https://i.pinimg.com/736x/97/9c/45/979c45048ee5eec6200d85baf54a0ad8.jpg',
  },
  {
    id: '2',
    user: 'Fatou',
    avatar: 'https://i.pinimg.com/736x/59/67/44/596744f107b7b7fe542f2dfa52d63232.jpg',
  },
  {
    id: '3',
    user: 'Mariam',
    avatar: 'https://i.pinimg.com/564x/8a/3d/8c/8a3d8c6d9b8d0b9e8d7f3c5b5e8d7f3c.jpg',
  },
  {
    id: '4',
    user: 'Oumou',
    avatar: 'https://i.pinimg.com/1200x/47/7d/73/477d73f710b71fbf334a5316d9d926ca.jpg',
  },
];

export default function Communaute({ navigation }) {
  const [posts, setPosts] = useState(communityPosts);
  const [activeTab, setActiveTab] = useState('tous');
  const [searchQuery, setSearchQuery] = useState('');
  const animatedValue = useRef(new Animated.Value(0)).current;

  const handleLike = (postId) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const renderPost = ({ item }) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <View style={styles.userInfo}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          <View>
            <Text style={styles.userName}>{item.user}</Text>
            <Text style={styles.userLocation}>{item.location} • {item.time}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <EllipsisOutlined size={20} color="#666" />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.postContent}>{item.content}</Text>
      
      {item.image && (
        <Image source={{ uri: item.image }} style={styles.postImage} />
      )}
      
      <View style={styles.postStats}>
        <Text style={styles.statsText}>{item.likes} j'aime • {item.comments} commentaires • {item.shares} partages</Text>
      </View>
      
      <View style={styles.postActions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleLike(item.id)}
        >
          {item.liked ? (
            <HeartFilled size={20} color={Constant.couleur.primaire} />
          ) : (
            <HeartOutlined size={20} color="#666" />
          )}
          <Text style={[styles.actionText, item.liked && { color: Constant.couleur.primaire }]}>
            J'aime
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <MessageOutlined size={20} color="#666" />
          <Text style={styles.actionText}>Commenter</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <ShareAltOutlined size={20} color="#666" />
          <Text style={styles.actionText}>Partager</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderStory = ({ item }) => (
    <TouchableOpacity style={styles.storyItem}>
      <View style={styles.storyAvatarContainer}>
        <Image source={{ uri: item.avatar }} style={styles.storyAvatar} />
      </View>
      <Text style={styles.storyUserName} numberOfLines={1}>{item.user}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Constant.couleur.blanc} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Communauté</Text>
        <TouchableOpacity>
          <SearchOutlined size={24} color={Constant.couleur.texte} />
        </TouchableOpacity>
      </View>
      
      {/* Barre de recherche */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <SearchOutlined size={18} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher dans la communauté..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>
      
      {/* Stories */}
      <View style={styles.storiesContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.storiesScrollView}
        >
          <TouchableOpacity style={styles.myStory}>
            <View style={styles.myStoryAvatarContainer}>
              <Image 
                source={{ uri: 'https://i.pinimg.com/736x/78/f8/1f/78f81f4825eaede5ca2da624a65957a0.jpg' }} 
                style={styles.myStoryAvatar} 
              />
              <View style={styles.addStoryButton}>
                <Text style={styles.addStoryText}>+</Text>
              </View>
            </View>
            <Text style={styles.storyUserName}>Votre story</Text>
          </TouchableOpacity>
          
          <FlatList
            data={stories}
            renderItem={renderStory}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </ScrollView>
      </View>
      
      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'tous' && styles.activeTab]}
          onPress={() => setActiveTab('tous')}
        >
          <Text style={[styles.tabText, activeTab === 'tous' && styles.activeTabText]}>Tous</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'populaires' && styles.activeTab]}
          onPress={() => setActiveTab('populaires')}
        >
          <Text style={[styles.tabText, activeTab === 'populaires' && styles.activeTabText]}>Populaires</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'suivis' && styles.activeTab]}
          onPress={() => setActiveTab('suivis')}
        >
          <Text style={[styles.tabText, activeTab === 'suivis' && styles.activeTabText]}>Suivis</Text>
        </TouchableOpacity>
      </View>
      
      {/* Posts */}
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.postsContainer}
        showsVerticalScrollIndicator={false}
      />
      
      {/* Bouton de nouvelle publication */}
      <TouchableOpacity 
        style={styles.newPostButton}
        onPress={() => navigation.navigate('NouvellePublication')}
      >
        <View style={styles.newPostButtonInner}>
          <Text style={styles.newPostButtonText}>+</Text>
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
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Constant.couleur.texte,
  },
  searchContainer: {
    paddingHorizontal: Constant.espacement.moyen,
    paddingBottom: Constant.espacement.moyen,
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
  storiesContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Constant.couleur.grisClair,
    paddingVertical: Constant.espacement.moyen,
  },
  storiesScrollView: {
    paddingHorizontal: Constant.espacement.moyen,
  },
  myStory: {
    alignItems: 'center',
    marginRight: Constant.espacement.moyen,
  },
  myStoryAvatarContainer: {
    position: 'relative',
    marginBottom: 6,
  },
  myStoryAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: Constant.couleur.primaire,
  },
  addStoryButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Constant.couleur.primaire,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Constant.couleur.blanc,
  },
  addStoryText: {
    color: Constant.couleur.blanc,
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  storyItem: {
    alignItems: 'center',
    marginRight: Constant.espacement.moyen,
  },
  storyAvatarContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: Constant.couleur.primaire,
    marginBottom: 6,
    padding: 2,
  },
  storyAvatar: {
    width: '100%',
    height: '100%',
    borderRadius: 32,
  },
  storyUserName: {
    fontSize: 12,
    color: Constant.couleur.texte,
    maxWidth: 70,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Constant.couleur.grisClair,
  },
  tab: {
    flex: 1,
    paddingVertical: Constant.espacement.moyen,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Constant.couleur.primaire,
  },
  tabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: Constant.couleur.primaire,
    fontWeight: 'bold',
  },
  postsContainer: {
    padding: Constant.espacement.moyen,
  },
  postCard: {
    backgroundColor: Constant.couleur.blanc,
    borderRadius: 15,
    padding: Constant.espacement.moyen,
    marginBottom: Constant.espacement.moyen,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Constant.espacement.moyen,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: Constant.espacement.moyen,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Constant.couleur.texte,
  },
  userLocation: {
    fontSize: 12,
    color: '#666',
  },
  postContent: {
    fontSize: 14,
    color: Constant.couleur.texte,
    lineHeight: 20,
    marginBottom: Constant.espacement.moyen,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: Constant.espacement.moyen,
  },
  postStats: {
    borderBottomWidth: 1,
    borderBottomColor: Constant.couleur.grisClair,
    paddingBottom: Constant.espacement.moyen,
    marginBottom: Constant.espacement.moyen,
  },
  statsText: {
    fontSize: 12,
    color: '#666',
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  actionText: {
    marginLeft: 6,
    fontSize: 12,
    color: '#666',
  },
  newPostButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  newPostButtonInner: {
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
  newPostButtonText: {
    color: Constant.couleur.blanc,
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: -2,
  },
});