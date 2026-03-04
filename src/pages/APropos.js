import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  Dimensions,
  Animated,
  Easing
} from 'react-native';
import { Constant } from '../utils/Constant';
import { MailOutlined, PhoneOutlined, GlobalOutlined, TeamOutlined, HeartOutlined, TrophyOutlined } from '@ant-design/icons';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const teamMembers = [
  {
    id: 1,
    name: 'Dr. Aminata Traoré',
    role: 'Fondatrice & Gynécologue',
    image: 'https://i.pinimg.com/736x/97/9c/45/979c45048ee5eec6200d85baf54a0ad8.jpg',
  },
  {
    id: 2,
    name: 'Oumou Diarra',
    role: 'Directrice des Opérations',
    image: 'https://i.pinimg.com/736x/59/67/44/596744f107b7b7fe542f2dfa52d63232.jpg',
  },
  {
    id: 3,
    name: 'Fatoumata Keita',
    role: 'Responsable Technologie',
    image: 'https://i.pinimg.com/564x/8a/3d/8c/8a3d8c6d9b8d0b9e8d7f3c5b5e8d7f3c.jpg',
  },
];

const statsData = [
  { id: 1, value: '5000+', label: 'Femmes aidées' },
  { id: 2, value: '12', label: 'Régions couvertes' },
  { id: 3, value: '98%', label: 'Satisfaction' },
  { id: 4, value: '24/7', label: 'Support' },
];

export default function APropos() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      })
    ]).start();
  }, [fadeAnim, slideAnim]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <Animated.View 
        style={[
          styles.hero,
          { 
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }] 
          }
        ]}
      >
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400' }} 
          style={styles.heroImage}
          resizeMode="cover"
        />
        <View style={styles.heroOverlay} />
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>Notre Mission</Text>
          <Text style={styles.heroSubtitle}>
            Faciliter l'accès aux soins de santé pour les femmes, particulièrement en zones rurales.
          </Text>
        </View>
      </Animated.View>

      {/* Stats Section */}
      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Notre Impact</Text>
        <View style={styles.statsContainer}>
          {statsData.map((stat) => (
            <View key={stat.id} style={styles.statItem}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Vision Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <TrophyOutlined size={24} color={Constant.couleur.primaire} />
          <Text style={styles.sectionTitle}>Notre Vision</Text>
        </View>
        <Text style={styles.sectionText}>
          Nous croyons que chaque femme mérite un accès équitable aux services de santé, 
          quel que soit son lieu de résidence. Muso Santé utilise la technologie pour 
          rapprocher les femmes des professionnels de santé.
        </Text>
      </View>

      {/* Values Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <HeartOutlined size={24} color={Constant.couleur.primaire} />
          <Text style={styles.sectionTitle}>Nos Valeurs</Text>
        </View>
        <View style={styles.valuesContainer}>
          <View style={styles.valueItem}>
            <View style={styles.valueIcon}>
              <Text style={styles.valueIconText}>♿</Text>
            </View>
            <Text style={styles.valueTitle}>Accessibilité</Text>
            <Text style={styles.valueDescription}>Services accessibles à toutes les femmes</Text>
          </View>
          <View style={styles.valueItem}>
            <View style={styles.valueIcon}>
              <Text style={styles.valueIconText}>💡</Text>
            </View>
            <Text style={styles.valueTitle}>Innovation</Text>
            <Text style={styles.valueDescription}>Solutions technologiques adaptées</Text>
          </View>
          <View style={styles.valueItem}>
            <View style={styles.valueIcon}>
              <Text style={styles.valueIconText}>🔒</Text>
            </View>
            <Text style={styles.valueTitle}>Confidentialité</Text>
            <Text style={styles.valueDescription}>Respect de la vie privée des utilisatrices</Text>
          </View>
          <View style={styles.valueItem}>
            <View style={styles.valueIcon}>
              <Text style={styles.valueIconText}>👑</Text>
            </View>
            <Text style={styles.valueTitle}>Autonomisation</Text>
            <Text style={styles.valueDescription}>Renforcement du pouvoir des femmes</Text>
          </View>
        </View>
      </View>

      {/* Team Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <TeamOutlined size={24} color={Constant.couleur.primaire} />
          <Text style={styles.sectionTitle}>Notre Équipe</Text>
        </View>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.teamContainer}
        >
          {teamMembers.map((member) => (
            <View key={member.id} style={styles.teamMember}>
              <Image source={{ uri: member.image }} style={styles.teamMemberImage} />
              <Text style={styles.teamMemberName}>{member.name}</Text>
              <Text style={styles.teamMemberRole}>{member.role}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Contact Section */}
      <View style={styles.contactSection}>
        <Text style={styles.contactTitle}>Contactez-Nous</Text>
        <Text style={styles.contactSubtitle}>
          Nous sommes à votre écoute pour toute question ou suggestion
        </Text>
        
        <TouchableOpacity 
          style={styles.contactButton}
          onPress={() => Linking.openURL('mailto:contact@musosante.ml')}
        >
          <MailOutlined size={20} color={Constant.couleur.blanc} />
          <Text style={styles.contactButtonText}>contact@musosante.ml</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.contactButton}
          onPress={() => Linking.openURL('tel:+22300000000')}
        >
          <PhoneOutlined size={20} color={Constant.couleur.blanc} />
          <Text style={styles.contactButtonText}>+223 00 00 00 00</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.contactButton}
          onPress={() => Linking.openURL('https://musosante.ml')}
        >
          <GlobalOutlined size={20} color={Constant.couleur.blanc} />
          <Text style={styles.contactButtonText}>musosante.ml</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constant.couleur.blanc,
  },
  hero: {
    height: screenHeight * 0.4,
    justifyContent: 'flex-end',
    padding: Constant.espacement.grand,
  },
  heroImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  heroContent: {
    zIndex: 1,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Constant.couleur.blanc,
    marginBottom: Constant.espacement.moyen,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  heroSubtitle: {
    fontSize: 18,
    color: Constant.couleur.blanc,
    lineHeight: 24,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  statsSection: {
    padding: Constant.espacement.grand,
    backgroundColor: Constant.couleur.gris,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: Constant.espacement.moyen,
  },
  statItem: {
    width: '48%',
    backgroundColor: Constant.couleur.blanc,
    padding: Constant.espacement.moyen,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: Constant.espacement.moyen,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Constant.couleur.primaire,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: Constant.couleur.texte,
    textAlign: 'center',
  },
  section: {
    padding: Constant.espacement.grand,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Constant.espacement.moyen,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Constant.couleur.secondaire,
    marginLeft: Constant.espacement.petit,
  },
  sectionText: {
    fontSize: 16,
    color: Constant.couleur.texte,
    lineHeight: 24,
  },
  valuesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: Constant.espacement.moyen,
  },
  valueItem: {
    width: '48%',
    backgroundColor: Constant.couleur.blanc,
    padding: Constant.espacement.moyen,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: Constant.espacement.moyen,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  valueIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Constant.couleur.gris,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  valueIconText: {
    fontSize: 20,
  },
  valueTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Constant.couleur.texte,
    marginBottom: 4,
    textAlign: 'center',
  },
  valueDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  teamContainer: {
    paddingVertical: Constant.espacement.moyen,
  },
  teamMember: {
    width: 150,
    backgroundColor: Constant.couleur.blanc,
    borderRadius: 12,
    padding: Constant.espacement.moyen,
    alignItems: 'center',
    marginRight: Constant.espacement.moyen,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  teamMemberImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: Constant.espacement.moyen,
  },
  teamMemberName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Constant.couleur.texte,
    marginBottom: 4,
    textAlign: 'center',
  },
  teamMemberRole: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  contactSection: {
    padding: Constant.espacement.grand,
    backgroundColor: Constant.couleur.gris,
    alignItems: 'center',
  },
  contactTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Constant.couleur.secondaire,
    marginBottom: Constant.espacement.petit,
  },
  contactSubtitle: {
    fontSize: 16,
    color: Constant.couleur.texte,
    textAlign: 'center',
    marginBottom: Constant.espacement.moyen,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Constant.couleur.primaire,
    padding: Constant.espacement.moyen,
    borderRadius: 30,
    width: '100%',
    marginBottom: Constant.espacement.moyen,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  contactButtonText: {
    color: Constant.couleur.blanc,
    fontSize: 16,
    fontWeight: '500',
    marginLeft: Constant.espacement.petit,
  },
});