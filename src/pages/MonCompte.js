import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, Image, ScrollView, TouchableOpacity,
  Alert, TextInput, Dimensions, Modal, ActivityIndicator
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { Constant } from '../utils/Constant';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Liste des pays africains
const africanCountries = [
  { code: 'ML', name: '🇲🇱 Mali', fr: 'Mali' },
  { code: 'SN', name: '🇸🇳 Sénégal', fr: 'Sénégal' },
  { code: 'CI', name: '🇨🇮 Côte d\'Ivoire', fr: 'Côte d\'Ivoire' },
  // ... (le reste de votre liste de pays)
].sort((a, b) => a.fr.localeCompare(b.fr));

const screenHeight = Dimensions.get('window').height;

export default function MonCompte({ navigation, route }) {
  const [userData, setUserData] = useState({
    prenom: 'Zeinab Salima',
    nom: 'Kanoute',
    email: 'zeinabsalimakanoute@gmail.com',
    avatar: 'https://scontent.fbko4-1.fna.fbcdn.net/v/t1.6435-9/131432252_271882734686926_77417288855113451_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=108&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeEjhNXOkwv6IRzrXdUYcERc6oMjHX9eSXzqgyMdf15JfGKl51KOcqjnguJAmpElJK76ay7hlxHdRq_wp3vQE1i5&_nc_ohc=dLkkR1jhlsUQ7kNvwE1BwJ8&_nc_oc=Adkz8MoGvrlsc_NQ6e1j0Sh-IgB0e-4OFQ44krgolsK9WnKoZlwFiaVRWxV6kwY2vho&_nc_zt=23&_nc_ht=scontent.fbko4-1.fna&_nc_gid=p43zhh6qyIfPtsbhlQs9MQ&oh=00_AfKgySYe3gbRxGp-jxr839g676Vpaem7U7NLzwzxI8cRmg&oe=6857B77C',
    pays: 'ML',
    telephone: '+223 76 45 32 10',
    completedProfile: 65,
    memberSince: '2023',
  });

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [tempAvatar, setTempAvatar] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (route.params?.updatedUser) {
      setUserData(route.params.updatedUser);
    }
  }, [route.params?.updatedUser]);

  const handleSave = () => {
    setSaving(true);
    // Simulation de sauvegarde
    setTimeout(() => {
      setSaving(false);
      setEditing(false);
      Alert.alert('Succès', 'Vos modifications ont été enregistrées.');
    }, 1500);
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission requise', 'Nous avons besoin de votre permission pour accéder à vos photos.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setTempAvatar(result.assets[0].uri);
      setModalVisible(false);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission requise', 'Nous avons besoin de votre permission pour utiliser votre appareil photo.');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setTempAvatar(result.assets[0].uri);
      setModalVisible(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter?',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Se déconnecter', 
          onPress: () => {
            Alert.alert('Déconnexion', 'Vous avez été déconnecté avec succès.');
            // Ici, vous devriez réinitialiser l'état de connexion
            // navigation.reset({ index: 0, routes: [{ name: 'Connexion' }] });
          }
        }
      ]
    );
  };

  const ProgressBar = ({ progress }) => (
    <View style={styles.progressContainer}>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>
      <Text style={styles.progressText}>{progress}% complété</Text>
    </View>
  );

  const ProfileOption = ({ icon, label, onPress, isLast = false }) => (
    <TouchableOpacity 
      style={[styles.optionBox, isLast && { marginBottom: 0 }]} 
      onPress={onPress}
    >
      <View style={styles.optionContent}>
        <Icon name={icon} size={22} color={Constant.couleur.primaire} />
        <Text style={styles.optionText}>{label}</Text>
      </View>
      <Icon name="chevron-right" size={22} color="#ccc" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mon Profil</Text>
        {!editing ? (
          <TouchableOpacity onPress={() => setEditing(true)}>
            <Icon name="pencil-outline" size={24} color={Constant.couleur.blanc} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setEditing(false)}>
            <Icon name="close" size={24} color={Constant.couleur.blanc} />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView 
        style={[styles.scroll, { minHeight: screenHeight }]}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileHeader}>
          <TouchableOpacity 
            onPress={() => editing && setModalVisible(true)}
            disabled={!editing}
          >
            <View style={styles.avatarContainer}>
              <Image 
                source={{ uri: tempAvatar || userData.avatar }} 
                style={styles.avatar} 
              />
              {editing && (
                <View style={styles.cameraIcon}>
                  <Icon name="camera" size={20} color={Constant.couleur.blanc} />
                </View>
              )}
            </View>
          </TouchableOpacity>
          
          <View style={styles.userInfo}>
            <Text style={styles.nom}>{userData.prenom} {userData.nom}</Text>
            <Text style={styles.email}>{userData.email}</Text>
            <View style={styles.memberSince}>
              <Icon name="calendar" size={14} color="#666" />
              <Text style={styles.memberSinceText}>Membre depuis {userData.memberSince}</Text>
            </View>
          </View>
        </View>

        <ProgressBar progress={userData.completedProfile} />

        <View style={styles.form}>
          <Text style={styles.sectionTitle}>Informations personnelles</Text>
          
          <View style={styles.inputRow}>
            <View style={[styles.inputContainer, { flex: 1, marginRight: 10 }]}>
              <Text style={styles.label}>Prénom</Text>
              <TextInput
                style={styles.input}
                placeholder="Entrez votre prénom"
                value={userData.prenom}
                onChangeText={(text) => setUserData({...userData, prenom: text})}
                editable={editing}
              />
            </View>
            
            <View style={[styles.inputContainer, { flex: 1, marginLeft: 10 }]}>
              <Text style={styles.label}>Nom</Text>
              <TextInput
                style={styles.input}
                placeholder="Entrez votre nom"
                value={userData.nom}
                onChangeText={(text) => setUserData({...userData, nom: text})}
                editable={editing}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Entrez votre email"
              value={userData.email}
              onChangeText={(text) => setUserData({...userData, email: text})}
              editable={editing}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Téléphone</Text>
            <TextInput
              style={styles.input}
              placeholder="Entrez votre numéro"
              value={userData.telephone}
              onChangeText={(text) => setUserData({...userData, telephone: text})}
              editable={editing}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Pays</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={userData.pays}
                onValueChange={(value) => setUserData({...userData, pays: value})}
                style={styles.picker}
                enabled={editing}
              >
                <Picker.Item label="🌍 Sélectionner un pays" value="" />
                {africanCountries.map((country) => (
                  <Picker.Item
                    key={country.code}
                    label={country.name}
                    value={country.code}
                  />
                ))}
              </Picker>
            </View>
          </View>

          {editing && (
            <TouchableOpacity 
              style={styles.saveButton} 
              onPress={handleSave}
              disabled={saving}
            >
              {saving ? (
                <ActivityIndicator color={Constant.couleur.blanc} />
              ) : (
                <Text style={styles.saveButtonText}>Enregistrer les modifications</Text>
              )}
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Préférences et paramètres</Text>
          
          <ProfileOption 
            icon="lock-outline" 
            label="Modifier le mot de passe" 
            onPress={() => navigation.navigate('ChangePassword')} 
          />
          <ProfileOption 
            icon="bell-outline" 
            label="Notifications" 
            onPress={() => navigation.navigate('Notifications')} 
          />
          <ProfileOption 
            icon="translate" 
            label="Langue" 
            onPress={() => navigation.navigate('Language')} 
          />
          <ProfileOption 
            icon="shield-account" 
            label="Confidentialité" 
            onPress={() => navigation.navigate('Privacy')} 
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          
          <ProfileOption 
            icon="help-circle-outline" 
            label="Centre d'aide" 
            onPress={() => navigation.navigate('HelpCenter')} 
          />
          <ProfileOption 
            icon="email-outline" 
            label="Nous contacter" 
            onPress={() => navigation.navigate('ContactUs')} 
          />
          <ProfileOption 
            icon="information-outline" 
            label="À propos de l'application" 
            onPress={() => navigation.navigate('AboutApp')} 
            isLast={true}
          />
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="logout" size={20} color={Constant.couleur.blanc} />
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Changer la photo de profil</Text>
            
            <TouchableOpacity style={styles.modalOption} onPress={takePhoto}>
              <Icon name="camera" size={24} color={Constant.couleur.primaire} />
              <Text style={styles.modalOptionText}>Prendre une photo</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.modalOption} onPress={pickImage}>
              <Icon name="image" size={24} color={Constant.couleur.primaire} />
              <Text style={styles.modalOptionText}>Choisir depuis la galerie</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.modalCancel} 
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCancelText}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constant.couleur.gris,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: Constant.couleur.primaire,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Constant.couleur.blanc,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 20,
    paddingBottom: 40,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: Constant.couleur.primaire,
  },
  cameraIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: Constant.couleur.primaire,
    borderRadius: 12,
    padding: 5,
  },
  userInfo: {
    flex: 1,
  },
  nom: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Constant.couleur.secondaire,
    marginBottom: 4,
  },
  email: {
    fontSize: 15,
    color: '#666',
    marginBottom: 8,
  },
  memberSince: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberSinceText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 5,
  },
  progressContainer: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Constant.couleur.primaire,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  form: {
    backgroundColor: Constant.couleur.blanc,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Constant.couleur.secondaire,
    marginBottom: 15,
  },
  inputRow: {
    flexDirection: 'row',
    marginHorizontal: -10,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Constant.couleur.noir,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 15,
    color: Constant.couleur.noir,
    borderWidth: 1,
    borderColor: '#eee',
  },
  pickerWrapper: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
    overflow: 'hidden',
    backgroundColor: '#f8f8f8',
  },
  picker: {
    height: 50,
  },
  saveButton: {
    backgroundColor: Constant.couleur.primaire,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: Constant.couleur.blanc,
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    backgroundColor: Constant.couleur.blanc,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  optionBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: Constant.couleur.noir,
    marginLeft: 15,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff3b30',
    paddingVertical: 15,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 10,
  },
  logoutText: {
    color: Constant.couleur.blanc,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: Constant.couleur.blanc,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Constant.couleur.secondaire,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalOptionText: {
    fontSize: 16,
    color: Constant.couleur.noir,
    marginLeft: 15,
  },
  modalCancel: {
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  modalCancelText: {
    fontSize: 16,
    color: '#ff3b30',
    fontWeight: '600',
  },
});