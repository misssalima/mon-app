import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
  Alert
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Constant } from '../utils/Constant';

// Liste des pays africains
const africanCountries = [
  { code: 'ML', name: '🇲🇱 Mali' },
  { code: 'SN', name: '🇸🇳 Sénégal' },
  { code: 'CI', name: '🇨🇮 Côte d\'Ivoire' },
  { code: 'BF', name: '🇧🇫 Burkina Faso' },
  { code: 'GN', name: '🇬🇳 Guinée' },
  { code: 'NE', name: '🇳🇪 Niger' },
  { code: 'TG', name: '🇹🇬 Togo' },
  { code: 'BJ', name: '🇧🇯 Bénin' },
  { code: 'CM', name: '🇨🇲 Cameroun' },
  { code: 'CD', name: '🇨🇩 RD Congo' },
  { code: 'GA', name: '🇬🇦 Gabon' },
  { code: 'CG', name: '🇨🇬 Congo' },
  { code: 'MG', name: '🇲🇬 Madagascar' },
  { code: 'TN', name: '🇹🇳 Tunisie' },
  { code: 'DZ', name: '🇩🇿 Algérie' },
  { code: 'MA', name: '🇲🇦 Maroc' },
  { code: 'NG', name: '🇳🇬 Nigeria' },
  { code: 'GH', name: '🇬🇭 Ghana' },
  { code: 'KE', name: '🇰🇪 Kenya' },
  { code: 'ET', name: '🇪🇹 Éthiopie' },
  { code: 'ZA', name: '🇿🇦 Afrique du Sud' },
].sort((a, b) => a.name.localeCompare(b.name));

export default function Inscription({ navigation }) {
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    pays: '',
    password: '',
    confirmPassword: '',
    dateNaissance: '',
    acceptTerms: false
  });

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = () => {
    // Validation des champs
    if (!formData.prenom || !formData.nom || !formData.email || !formData.password || !formData.confirmPassword) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas');
      return;
    }

    if (formData.password.length < 6) {
      Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    if (!formData.acceptTerms) {
      Alert.alert('Erreur', 'Veuillez accepter les conditions d\'utilisation');
      return;
    }

    // Envoi des données d'inscription (simulation)
    Alert.alert(
      'Inscription réussie',
      'Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter.',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Connexion')
        }
      ]
    );
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image 
          source={require('../../assets/muso.JPEG.jpg')} 
          style={styles.logo}
        />
        
        <Text style={styles.title}>Créer un compte</Text>
        <Text style={styles.subtitle}>Rejoignez la communauté Muso Santé</Text>
        
        <View style={styles.form}>
          <View style={styles.nameContainer}>
            <View style={[styles.inputContainer, { flex: 1, marginRight: 10 }]}>
              <Text style={styles.label}>Prénom *</Text>
              <TextInput
                style={styles.input}
                placeholder="Votre prénom"
                value={formData.prenom}
                onChangeText={(text) => handleInputChange('prenom', text)}
              />
            </View>
            
            <View style={[styles.inputContainer, { flex: 1 }]}>
              <Text style={styles.label}>Nom *</Text>
              <TextInput
                style={styles.input}
                placeholder="Votre nom"
                value={formData.nom}
                onChangeText={(text) => handleInputChange('nom', text)}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email *</Text>
            <TextInput
              style={styles.input}
              placeholder="Votre adresse email"
              value={formData.email}
              onChangeText={(text) => handleInputChange('email', text)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Téléphone</Text>
            <TextInput
              style={styles.input}
              placeholder="Votre numéro de téléphone"
              value={formData.telephone}
              onChangeText={(text) => handleInputChange('telephone', text)}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Date de naissance</Text>
            <TextInput
              style={styles.input}
              placeholder="JJ/MM/AAAA"
              value={formData.dateNaissance}
              onChangeText={(text) => handleInputChange('dateNaissance', text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Pays</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={formData.pays}
                onValueChange={(value) => handleInputChange('pays', value)}
                style={styles.picker}
              >
                <Picker.Item label="🌍 Sélectionner votre pays" value="" />
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

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Mot de passe *</Text>
            <TextInput
              style={styles.input}
              placeholder="Créez un mot de passe"
              value={formData.password}
              onChangeText={(text) => handleInputChange('password', text)}
              secureTextEntry
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirmer le mot de passe *</Text>
            <TextInput
              style={styles.input}
              placeholder="Confirmez votre mot de passe"
              value={formData.confirmPassword}
              onChangeText={(text) => handleInputChange('confirmPassword', text)}
              secureTextEntry
            />
          </View>

          <View style={styles.termsContainer}>
            <TouchableOpacity 
              style={styles.checkbox}
              onPress={() => handleInputChange('acceptTerms', !formData.acceptTerms)}
            >
              <View style={[styles.checkboxInner, formData.acceptTerms && styles.checkboxChecked]}>
                {formData.acceptTerms && <Text style={styles.checkmark}>✓</Text>}
              </View>
            </TouchableOpacity>
            <Text style={styles.termsText}>
              J'accepte les <Text style={styles.termsLink}>conditions d'utilisation</Text> et la <Text style={styles.termsLink}>politique de confidentialité</Text>
            </Text>
          </View>

          <TouchableOpacity 
            style={styles.signupButton}
            onPress={handleSubmit}
          >
            <Text style={styles.signupButtonText}>Créer mon compte</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Vous avez déjà un compte ? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Connexion')}>
            <Text style={styles.loginLink}>Se connecter</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constant.couleur.blanc,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: Constant.espacement.grand,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: Constant.espacement.grand,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Constant.couleur.primaire,
    textAlign: 'center',
    marginBottom: Constant.espacement.petit,
  },
  subtitle: {
    fontSize: Constant.typographie.corps,
    color: Constant.couleur.texte,
    textAlign: 'center',
    marginBottom: Constant.espacement.grand,
  },
  form: {
    backgroundColor: Constant.couleur.gris,
    borderRadius: 15,
    padding: Constant.espacement.grand,
    marginBottom: Constant.espacement.grand,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    marginBottom: Constant.espacement.moyen,
  },
  label: {
    fontSize: Constant.typographie.corps,
    fontWeight: '600',
    color: Constant.couleur.texte,
    marginBottom: Constant.espacement.petit,
  },
  input: {
    backgroundColor: Constant.couleur.blanc,
    borderRadius: 10,
    padding: Constant.espacement.moyen,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  pickerWrapper: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
    backgroundColor: Constant.couleur.blanc,
  },
  picker: {
    height: 50,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Constant.espacement.moyen,
    marginBottom: Constant.espacement.grand,
  },
  checkbox: {
    marginRight: Constant.espacement.petit,
  },
  checkboxInner: {
    width: 24,
    height: 24,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: Constant.couleur.primaire,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: Constant.couleur.primaire,
  },
  checkmark: {
    color: Constant.couleur.blanc,
    fontWeight: 'bold',
  },
  termsText: {
    flex: 1,
    fontSize: Constant.typographie.legende,
    color: Constant.couleur.texte,
  },
  termsLink: {
    color: Constant.couleur.primaire,
    fontWeight: '600',
  },
  signupButton: {
    backgroundColor: Constant.couleur.primaire,
    borderRadius: 10,
    padding: Constant.espacement.moyen,
    alignItems: 'center',
  },
  signupButtonText: {
    color: Constant.couleur.blanc,
    fontSize: Constant.typographie.corps,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    color: Constant.couleur.texte,
    fontSize: Constant.typographie.legende,
  },
  loginLink: {
    color: Constant.couleur.primaire,
    fontSize: Constant.typographie.legende,
    fontWeight: 'bold',
  },
});