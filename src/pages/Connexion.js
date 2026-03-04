import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Constant } from '../utils/Constant';

export default function Connexion({ navigation, setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Exemple avec identifiants fixes
    if (email === "muso@gmail.com" && password === "muso123") {
      setIsLoggedIn(true); // ✅ Met à jour App.js
    } else {
      alert("Email ou mot de passe incorrect");
    }
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
        
        <Text style={styles.title}>Connexion</Text>
        <Text style={styles.subtitle}>Accédez à votre compte Muso Santé</Text>
        
        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Votre adresse email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <Text style={styles.label}>Mot de passe</Text>
          <TextInput
            style={styles.input}
            placeholder="Votre mot de passe"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          
          
           <TouchableOpacity 
      style={styles.loginButton}
      onPress={handleLogin}
    >
           <Text style={styles.loginButtonText}>Se connecter</Text>
    </TouchableOpacity>
          
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Mot de passe oublié ?</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Vous n'avez pas de compte ? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Inscription')}>
            <Text style={styles.signupLink}>S'inscrire</Text>
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
    justifyContent: 'center',
    padding: Constant.espacement.grand,
  },
  logo: {
    width: 120,
    height: 120,
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
    marginBottom: Constant.espacement.moyen,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  loginButton: {
    backgroundColor: Constant.couleur.primaire,
    borderRadius: 10,
    padding: Constant.espacement.moyen,
    alignItems: 'center',
    marginTop: Constant.espacement.moyen,
  },
  loginButtonText: {
    color: Constant.couleur.blanc,
    fontSize: Constant.typographie.corps,
    fontWeight: 'bold',
  },
  forgotPassword: {
    alignSelf: 'center',
    marginTop: Constant.espacement.moyen,
  },
  forgotPasswordText: {
    color: Constant.couleur.primaire,
    fontSize: Constant.typographie.legende,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Constant.espacement.moyen,
  },
  signupText: {
    color: Constant.couleur.texte,
    fontSize: Constant.typographie.legende,
  },
  signupLink: {
    color: Constant.couleur.primaire,
    fontSize: Constant.typographie.legende,
    fontWeight: 'bold',
  },
});