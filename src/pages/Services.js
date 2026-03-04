// src/pages/Services.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
  SafeAreaView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Constant } from '../utils/Constant';
import { HeartFilled, TeamOutlined, BookOutlined, MessageOutlined, VideoCameraOutlined, RightOutlined, SearchOutlined } from '@ant-design/icons';

const { width } = Dimensions.get('window');

const services = [
  {
    id: 1,
    title: 'Téléconsultation',
    description: 'Consultez des médecins spécialisés à distance',
    icon: VideoCameraOutlined,
    color: '#FF7EB3',
    image: { uri: 'https://i.pinimg.com/736x/78/f8/1f/78f81f4825eaede5ca2da624a65957a0.jpg' },
    features: ['Consultation vidéo', 'Audio ou chat', '7j/7 de 8h à 22h'],
    price: '5 000 FCFA'
  },
  {
    id: 2,
    title: 'Suivi de grossesse',
    description: 'Accompagnement personnalisé tout au long de votre grossesse',
    icon: HeartFilled,
    color: '#42C3A7',
    image: { uri: 'https://i.pinimg.com/736x/59/67/44/596744f107b7b7fe542f2dfa52d63232.jpg' },
    features: ['Suivi mensuel', 'Échographies', 'Conseils nutrition'],
    price: '15 000 FCFA/mois'
  },
  {
    id: 3,
    title: 'Éducation à la santé',
    description: 'Ressources éducatives sur la santé féminine',
    icon: BookOutlined,
    color: '#5D7EF4',
    image: { uri: 'https://i.pinimg.com/1200x/47/7d/73/477d73f710b71fbf334a5316d9d926ca.jpg' },
    features: ['Articles', 'Vidéos éducatives', 'FAQ interactive'],
    price: 'Gratuit'
  },
  {
    id: 4,
    title: 'Communauté de soutien',
    description: 'Échangez avec d\'autres femmes et professionnels',
    icon: TeamOutlined,
    color: '#9D6DFF',
    image: { uri: 'https://i.pinimg.com/1200x/90/67/e3/9067e3d95a0f1b898b25ce6c8512e861.jpg' },
    features: ['Groupes thématiques', 'Discussions privées', 'Partage d\'expériences'],
    price: 'Gratuit'
  },
  {
    id: 5,
    title: 'Messagerie médicale',
    description: 'Posez vos questions à des professionnels de santé',
    icon: MessageOutlined,
    color: '#FF9F40',
    image: { uri: 'https://i.pinimg.com/564x/8a/3d/8c/8a3d8c6d9b8d0b9e8d7f3c5b5e8d7f3c.jpg' },
    features: ['Réponse sous 24h', 'Questions illimitées', 'Médecins certifiés'],
    price: '3 000 FCFA/mois'
  },
];

export default function Services({ navigation }) {
  const [activeCategory, setActiveCategory] = useState('Tous');
  const categories = ['Tous', 'Consultation', 'Grossesse', 'Éducation', 'Communauté'];

  const navigateToServiceDetail = (service) => {
    navigation.navigate('ServiceDetail', { service });
  };

  const ServiceIcon = ({ IconComponent, color }) => {
    return (
      <View style={[styles.serviceIconContainer, { backgroundColor: color }]}>
        <IconComponent size={24} color="#fff" />
      </View>
    );
  };

  const ServiceCard = ({ service }) => {
    return (
      <TouchableOpacity 
        style={styles.serviceCard}
        onPress={() => navigateToServiceDetail(service)}
        activeOpacity={0.9}
      >
        <Image source={service.image} style={styles.serviceImage} resizeMode="cover" />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.serviceGradient}
        />
        
        <View style={styles.serviceContent}>
          <View style={styles.serviceHeader}>
            <ServiceIcon IconComponent={service.icon} color={service.color} />
            <Text style={styles.servicePrice}>{service.price}</Text>
          </View>
          
          <Text style={styles.serviceTitle}>{service.title}</Text>
          <Text style={styles.serviceDescription}>{service.description}</Text>
          
          <View style={styles.serviceFeatures}>
            {service.features.map((feature, index) => (
              <View key={index} style={styles.featureTag}>
                <Text style={styles.featureTagText}>{feature}</Text>
              </View>
            ))}
          </View>
          
          <View style={styles.serviceFooter}>
            <Text style={styles.serviceActionText}>Découvrir</Text>
            <RightOutlined style={styles.serviceActionIcon} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Nos Services</Text>
        <Text style={styles.subtitle}>Des solutions complètes pour votre santé</Text>
        
        <View style={styles.searchContainer}>
          <SearchOutlined style={styles.searchIcon} />
          <Text style={styles.searchPlaceholder}>Rechercher un service...</Text>
        </View>
      </View>
      
      <View style={styles.categoriesContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScrollView}
        >
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.categoryButton,
                activeCategory === category && styles.categoryButtonActive
              ]}
              onPress={() => setActiveCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  activeCategory === category && styles.categoryTextActive
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      <ScrollView style={styles.servicesContainer}>
        <View style={styles.servicesGrid}>
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </View>
        
        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>Vous ne trouvez pas ce qu'il vous faut ?</Text>
          <Text style={styles.ctaDescription}>Contactez-nous pour une solution personnalisée</Text>
          
          <TouchableOpacity 
            style={styles.ctaButton}
            onPress={() => navigation.navigate('Contact')}
          >
            <LinearGradient
              colors={[Constant.couleur.primaire, '#FF7EB3']}
              style={styles.ctaGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.ctaButtonText}>Nous contacter</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constant.couleur.gris,
  },
  header: {
    padding: Constant.espacement.grand,
    backgroundColor: Constant.couleur.blanc,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Constant.couleur.secondaire,
    marginBottom: Constant.espacement.petit,
  },
  subtitle: {
    fontSize: 16,
    color: Constant.couleur.texteSecondaire,
    marginBottom: Constant.espacement.moyen,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Constant.couleur.gris,
    borderRadius: 12,
    padding: Constant.espacement.moyen,
  },
  searchIcon: {
    color: Constant.couleur.texteSecondaire,
    fontSize: 18,
    marginRight: Constant.espacement.petit,
  },
  searchPlaceholder: {
    color: Constant.couleur.texteSecondaire,
    fontSize: 16,
  },
  categoriesContainer: {
    paddingVertical: Constant.espacement.moyen,
    backgroundColor: Constant.couleur.blanc,
  },
  categoriesScrollView: {
    paddingHorizontal: Constant.espacement.moyen,
  },
  categoryButton: {
    paddingHorizontal: Constant.espacement.moyen,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Constant.couleur.gris,
    marginRight: Constant.espacement.petit,
  },
  categoryButtonActive: {
    backgroundColor: Constant.couleur.primaire,
  },
  categoryText: {
    color: Constant.couleur.texte,
    fontSize: 14,
    fontWeight: '500',
  },
  categoryTextActive: {
    color: Constant.couleur.blanc,
  },
  servicesContainer: {
    flex: 1,
    padding: Constant.espacement.moyen,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceCard: {
    width: (width - Constant.espacement.grand * 2) / 2 - 8,
    height: 240,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: Constant.espacement.moyen,
    backgroundColor: Constant.couleur.blanc,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  serviceImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  serviceGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '60%',
  },
  serviceContent: {
    flex: 1,
    padding: Constant.espacement.moyen,
    justifyContent: 'space-between',
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  serviceIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  servicePrice: {
    color: Constant.couleur.blanc,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  serviceTitle: {
    color: Constant.couleur.blanc,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
  serviceDescription: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 12,
    marginBottom: 12,
  },
  serviceFeatures: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  featureTag: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
  },
  featureTagText: {
    color: Constant.couleur.blanc,
    fontSize: 10,
    fontWeight: '500',
  },
  serviceFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  serviceActionText: {
    color: Constant.couleur.blanc,
    fontSize: 12,
    fontWeight: '500',
    marginRight: 4,
  },
  serviceActionIcon: {
    color: Constant.couleur.blanc,
    fontSize: 12,
  },
  ctaSection: {
    backgroundColor: Constant.couleur.blanc,
    borderRadius: 16,
    padding: Constant.espacement.grand,
    alignItems: 'center',
    marginTop: Constant.espacement.moyen,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  ctaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Constant.couleur.secondaire,
    marginBottom: 8,
    textAlign: 'center',
  },
  ctaDescription: {
    fontSize: 14,
    color: Constant.couleur.texte,
    marginBottom: Constant.espacement.moyen,
    textAlign: 'center',
  },
  ctaButton: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  ctaGradient: {
    padding: Constant.espacement.moyen,
    alignItems: 'center',
  },
  ctaButtonText: {
    color: Constant.couleur.blanc,
    fontSize: 16,
    fontWeight: 'bold',
  },
});