// src/pages/ServiceDetail.js
import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  Dimensions,
  Animated,
  Share,
  Platform,
  SafeAreaView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Constant } from '../utils/Constant';
import { LeftOutlined, HeartOutlined, HeartFilled, ShareAltOutlined, ClockCircleOutlined, DollarOutlined, StarFilled, PhoneOutlined, CalendarOutlined } from '@ant-design/icons';
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');
const HEADER_HEIGHT = 280;
const HEADER_MIN_HEIGHT = 90;

export default function ServiceDetail({ route, navigation }) {
  const { service } = route.params || {};
  const [isFavorite, setIsFavorite] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  
  // Animation pour l'en-tête
  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp'
  });
  
  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT / 2, HEADER_HEIGHT],
    outputRange: [1, 0.5, 0],
    extrapolate: 'clamp'
  });
  
  const titleOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT / 2, HEADER_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [0, 0.5, 1],
    extrapolate: 'clamp'
  });

  // Données de démonstration si aucun service n'est passé en paramètre
  const defaultService = {
    id: 1,
    title: 'Consultation en ligne',
    image: { uri: 'https://i.pinimg.com/736x/78/f8/1f/78f81f4825eaede5ca2da624a65957a0.jpg' },
    description: 'Accédez à des consultations médicales à distance avec des professionnels de santé qualifiés, sans avoir à vous déplacer.',
    longDescription: 'Notre service de consultation en ligne vous permet de consulter un médecin ou un spécialiste où que vous soyez, grâce à une connexion internet. Idéal pour les régions rurales où l\'accès aux soins est limité.\n\nNos médecins sont disponibles pour des consultations vidéo, audio ou même par chat, selon vos préférences et votre connexion internet.',
    features: [
      'Consultations avec des médecins certifiés',
      'Disponible 7j/7 de 8h à 22h',
      'Prescriptions électroniques lorsque nécessaire',
      'Conseils médicaux personnalisés',
      'Suivi de santé régulier',
      'Confidentialité garantie',
      'Rapports médicaux détaillés'
    ],
    price: '5 000 FCFA',
    duration: '30 minutes',
    rating: 4.8,
    reviews: 142,
    doctor: {
      name: 'Dr. Aïssata Coulibaly',
      specialty: 'Gynécologue',
      experience: '12 ans d\'expérience',
      image: { uri: 'https://i.pinimg.com/564x/3a/6b/3d/3a6b3d3b9c7c8c8d8e8f8f8f8f8f8f8f.jpg' }
    },
    availability: [
      { day: 'Lun-Ven', hours: '8:00 - 18:00' },
      { day: 'Samedi', hours: '9:00 - 14:00' },
      { day: 'Dimanche', hours: 'Urgences seulement' }
    ]
  };

  const serviceData = service || defaultService;

  const handleBookAppointment = () => {
    navigation.navigate('Rendez-vous', { service: serviceData });
  };

  const handleEmergencyCall = () => {
    Linking.openURL('tel:+22300000000');
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Découvrez le service ${serviceData.title} sur Muso Santé: Une solution de santé innovante pour les femmes rurales.`,
        url: 'https://musosante.ml',
        title: serviceData.title
      }, {
        dialogTitle: `Partager ${serviceData.title}`
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<StarFilled key={i} style={styles.starIcon} />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<StarFilled key={i} style={[styles.starIcon, styles.halfStar]} />);
      } else {
        stars.push(<StarFilled key={i} style={[styles.starIcon, styles.emptyStar]} />);
      }
    }

    return stars;
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { height: headerHeight }]}>
        <Image source={serviceData.image} style={[styles.headerImage, { opacity: imageOpacity }]} resizeMode="cover" />
        
        <LinearGradient
          colors={['rgba(0,0,0,0.6)', 'transparent', 'rgba(0,0,0,0.8)']}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        />
        
        <SafeAreaView style={styles.headerButtons}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <LinearGradient
              colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.3)']}
              style={styles.iconButton}
            >
              <LeftOutlined style={styles.buttonIcon} />
            </LinearGradient>
          </TouchableOpacity>
          
          <View style={styles.rightButtons}>
            <TouchableOpacity style={styles.iconButtonWrapper} onPress={toggleFavorite}>
              <LinearGradient
                colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.3)']}
                style={styles.iconButton}
              >
                {isFavorite ? 
                  <HeartFilled style={[styles.buttonIcon, styles.favoriteIcon]} /> : 
                  <HeartOutlined style={styles.buttonIcon} />
                }
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.iconButtonWrapper} onPress={handleShare}>
              <LinearGradient
                colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.3)']}
                style={styles.iconButton}
              >
                <ShareAltOutlined style={styles.buttonIcon} />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        
        <Animated.View style={[styles.floatingTitle, { opacity: titleOpacity }]}>
          <Text style={styles.floatingTitleText} numberOfLines={1}>{serviceData.title}</Text>
        </Animated.View>
      </Animated.View>
      
      <ScrollView 
        style={styles.scrollView}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.content}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{serviceData.title}</Text>
            <View style={styles.ratingContainer}>
              {renderStars(serviceData.rating)}
              <Text style={styles.ratingText}>({serviceData.reviews})</Text>
            </View>
          </View>
          
          <Text style={styles.description}>{serviceData.description}</Text>
          
          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <View style={styles.detailIcon}>
                <ClockCircleOutlined style={styles.detailIconStyle} />
              </View>
              <View>
                <Text style={styles.detailLabel}>Durée</Text>
                <Text style={styles.detailValue}>{serviceData.duration}</Text>
              </View>
            </View>
            
            <View style={styles.detailItem}>
              <View style={styles.detailIcon}>
                <DollarOutlined style={styles.detailIconStyle} />
              </View>
              <View>
                <Text style={styles.detailLabel}>Tarif</Text>
                <Text style={styles.detailValue}>{serviceData.price}</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description détaillée</Text>
            <Text style={styles.longDescription}>{serviceData.longDescription}</Text>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ce qui est inclus</Text>
            <View style={styles.featuresContainer}>
              {serviceData.features && serviceData.features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <View style={styles.featureIcon}>
                    <Text style={styles.featureCheckmark}>✓</Text>
                  </View>
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Médecin spécialiste</Text>
            <View style={styles.doctorCard}>
              <Image source={serviceData.doctor.image} style={styles.doctorImage} />
              <View style={styles.doctorInfo}>
                <Text style={styles.doctorName}>{serviceData.doctor.name}</Text>
                <Text style={styles.doctorSpecialty}>{serviceData.doctor.specialty}</Text>
                <Text style={styles.doctorExperience}>{serviceData.doctor.experience}</Text>
                
                <View style={styles.availabilityContainer}>
                  <Text style={styles.availabilityTitle}>Disponibilités:</Text>
                  {serviceData.availability.map((slot, index) => (
                    <View key={index} style={styles.availabilityItem}>
                      <Text style={styles.availabilityDay}>{slot.day}</Text>
                      <Text style={styles.availabilityHours}>{slot.hours}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Témoignages</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.testimonialsContainer}>
              <View style={styles.testimonialCard}>
                <View style={styles.testimonialHeader}>
                  <Image 
                    source={{ uri: 'https://i.pinimg.com/564x/3b/3b/3b/3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b.jpg' }} 
                    style={styles.testimonialImage} 
                  />
                  <View>
                    <Text style={styles.testimonialName}>Mariam D.</Text>
                    <Text style={styles.testimonialDate}>Il y a 2 semaines</Text>
                  </View>
                </View>
                <Text style={styles.testimonialText}>Ce service m'a sauvé la vie lorsque j'étais enceinte et vivant dans un village éloigné. Merci Muso Santé!</Text>
                <View style={styles.testimonialRating}>
                  {renderStars(5)}
                </View>
              </View>
              
              <View style={styles.testimonialCard}>
                <View style={styles.testimonialHeader}>
                  <Image 
                    source={{ uri: 'https://i.pinimg.com/564x/4c/4c/4c/4c4c4c4c4c4c4c4c4c4c4c4c4c4c4c4c.jpg' }} 
                    style={styles.testimonialImage} 
                  />
                  <View>
                    <Text style={styles.testimonialName}>Fatouma K.</Text>
                    <Text style={styles.testimonialDate}>Il y a 1 mois</Text>
                  </View>
                </View>
                <Text style={styles.testimonialText}>Consultation rapide et professionnelle. Le médecin a été très à l'écoute et m'a donné des conseils précieux.</Text>
                <View style={styles.testimonialRating}>
                  {renderStars(4.5)}
                </View>
              </View>
            </ScrollView>
          </View>
          
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>💡 Bon à savoir</Text>
            <Text style={styles.infoText}>
              Toutes nos consultations sont confidentielles et conformes aux standards médicaux.
              Vos données de santé sont protégées et sécurisées.
            </Text>
          </View>
        </View>
      </ScrollView>
      
      <BlurView intensity={90} tint="light" style={styles.actionsContainer}>
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={handleEmergencyCall}
        >
          <PhoneOutlined style={styles.buttonActionIcon} />
          <Text style={styles.secondaryButtonText}>Urgence</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={handleBookAppointment}
        >
          <CalendarOutlined style={styles.buttonActionIcon} />
          <Text style={styles.primaryButtonText}>Prendre RDV</Text>
        </TouchableOpacity>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constant.couleur.blanc,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    overflow: 'hidden',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  headerButtons: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Constant.espacement.moyen,
    paddingTop: Platform.OS === 'ios' ? Constant.espacement.moyen : Constant.espacement.grand,
  },
  rightButtons: {
    flexDirection: 'row',
  },
  iconButtonWrapper: {
    marginLeft: Constant.espacement.petit,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonIcon: {
    color: Constant.couleur.blanc,
    fontSize: 20,
  },
  favoriteIcon: {
    color: '#FF3B30',
  },
  floatingTitle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Constant.espacement.moyen,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  floatingTitleText: {
    color: Constant.couleur.blanc,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
    marginTop: HEADER_HEIGHT,
  },
  content: {
    padding: Constant.espacement.grand,
    paddingBottom: 100,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Constant.espacement.moyen,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Constant.couleur.secondaire,
    flex: 1,
    marginRight: Constant.espacement.moyen,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    color: '#FFD700',
    fontSize: 16,
    marginRight: 2,
  },
  emptyStar: {
    color: '#E0E0E0',
  },
  halfStar: {
    // You might need a custom solution for half stars
  },
  ratingText: {
    fontSize: 14,
    color: Constant.couleur.texteSecondaire,
    marginLeft: 4,
  },
  description: {
    fontSize: 16,
    color: Constant.couleur.texte,
    marginBottom: Constant.espacement.grand,
    lineHeight: 24,
  },
  detailsContainer: {
    flexDirection: 'row',
    backgroundColor: Constant.couleur.gris,
    borderRadius: 16,
    padding: Constant.espacement.moyen,
    marginBottom: Constant.espacement.grand,
  },
  detailItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Constant.couleur.primaire + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Constant.espacement.moyen,
  },
  detailIconStyle: {
    color: Constant.couleur.primaire,
    fontSize: 18,
  },
  detailLabel: {
    fontSize: 12,
    color: Constant.couleur.texteSecondaire,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Constant.couleur.secondaire,
  },
  section: {
    marginBottom: Constant.espacement.grand,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Constant.couleur.secondaire,
    marginBottom: Constant.espacement.moyen,
  },
  longDescription: {
    fontSize: 16,
    color: Constant.couleur.texte,
    lineHeight: 24,
  },
  featuresContainer: {
    backgroundColor: Constant.couleur.blanc,
    borderRadius: 12,
    padding: Constant.espacement.moyen,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Constant.espacement.moyen,
  },
  featureIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Constant.couleur.primaire,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Constant.espacement.moyen,
  },
  featureCheckmark: {
    color: Constant.couleur.blanc,
    fontWeight: 'bold',
    fontSize: 14,
  },
  featureText: {
    fontSize: 16,
    color: Constant.couleur.texte,
    flex: 1,
  },
  doctorCard: {
    flexDirection: 'row',
    backgroundColor: Constant.couleur.blanc,
    borderRadius: 16,
    padding: Constant.espacement.moyen,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  doctorImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: Constant.espacement.moyen,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Constant.couleur.secondaire,
    marginBottom: 4,
  },
  doctorSpecialty: {
    fontSize: 14,
    color: Constant.couleur.primaire,
    marginBottom: 2,
  },
  doctorExperience: {
    fontSize: 14,
    color: Constant.couleur.texteSecondaire,
    marginBottom: Constant.espacement.moyen,
  },
  availabilityContainer: {
    marginTop: Constant.espacement.petit,
  },
  availabilityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Constant.couleur.secondaire,
    marginBottom: 6,
  },
  availabilityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  availabilityDay: {
    fontSize: 14,
    color: Constant.couleur.texte,
  },
  availabilityHours: {
    fontSize: 14,
    color: Constant.couleur.texte,
    fontWeight: '500',
  },
  testimonialsContainer: {
    marginHorizontal: -Constant.espacement.grand,
  },
  testimonialCard: {
    width: 280,
    backgroundColor: Constant.couleur.blanc,
    borderRadius: 16,
    padding: Constant.espacement.moyen,
    marginRight: Constant.espacement.moyen,
    marginLeft: Constant.espacement.grand,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  testimonialHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Constant.espacement.moyen,
  },
  testimonialImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: Constant.espacement.moyen,
  },
  testimonialName: {
    fontSize: 16,
    fontWeight: '600',
    color: Constant.couleur.secondaire,
  },
  testimonialDate: {
    fontSize: 12,
    color: Constant.couleur.texteSecondaire,
  },
  testimonialText: {
    fontSize: 14,
    color: Constant.couleur.texte,
    marginBottom: Constant.espacement.moyen,
    lineHeight: 20,
  },
  testimonialRating: {
    flexDirection: 'row',
  },
  infoBox: {
    backgroundColor: '#f0f9ff',
    borderRadius: 16,
    padding: Constant.espacement.moyen,
    borderLeftWidth: 4,
    borderLeftColor: Constant.couleur.primaire,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Constant.couleur.secondaire,
    marginBottom: Constant.espacement.petit,
  },
  infoText: {
    fontSize: 14,
    color: Constant.couleur.texte,
    lineHeight: 20,
  },
  actionsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: Constant.espacement.moyen,
    paddingBottom: Constant.espacement.moyen + (Platform.OS === 'ios' ? 20 : 0),
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  primaryButton: {
    flex: 1,
    backgroundColor: Constant.couleur.primaire,
    borderRadius: 12,
    padding: Constant.espacement.moyen,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: Constant.espacement.petit,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  secondaryButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: Constant.couleur.primaire,
    borderRadius: 12,
    padding: Constant.espacement.moyen,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: Constant.espacement.petit,
    backgroundColor: Constant.couleur.blanc,
  },
  buttonActionIcon: {
    color: Constant.couleur.blanc,
    fontSize: 18,
    marginRight: 8,
  },
  primaryButtonText: {
    color: Constant.couleur.blanc,
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: Constant.couleur.primaire,
    fontSize: 16,
    fontWeight: 'bold',
  },
});