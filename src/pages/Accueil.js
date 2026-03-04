import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity, Linking, Animated, Easing } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { LinearGradient } from 'expo-linear-gradient';
import { Constant } from '../utils/Constant';
import { HeartFilled, TeamOutlined, CalendarFilled, MessageFilled, RightOutlined } from '@ant-design/icons';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const PAGE_WIDTH = screenWidth;
const PAGE_HEIGHT = 220;

const healthItems = [
  {
    id: 1,
    title: 'Consultation en ligne',
    description: 'Parlez à un professionnel de santé depuis chez vous',
    image: { uri: 'https://i.pinimg.com/736x/78/f8/1f/78f81f4825eaede5ca2da624a65957a0.jpg' },
    color: '#FF7EB3',
  },
  {
    id: 2,
    title: 'Suivi de grossesse',
    description: 'Accompagnement personnalisé pendant votre grossesse',
    image: { uri: 'https://i.pinimg.com/736x/59/67/44/596744f107b7b7fe542f2dfa52d63232.jpg' },
    color: '#42C3A7',
  },
  {
    id: 3,
    title: 'Éducation à la santé',
    description: 'Ressources éducatives pour votre bien-être',
    image: { uri: 'https://i.pinimg.com/1200x/47/7d/73/477d73f710b71fbf334a5316d9d926ca.jpg' },
    color: '#5D7EF4',
  },
  {
    id: 4,
    title: 'Communauté de soutien',
    description: 'Échangez avec d\'autres femmes dans votre situation',
    image: { uri: 'https://i.pinimg.com/1200x/90/67/e3/9067e3d95a0f1b898b25ce6c8512e861.jpg' },
    color: '#9D6DFF',
  },
];

const articles = [
  {
    id: 1,
    title: 'L\'importance des soins prénataux',
    image: { uri: 'https://i.pinimg.com/736x/97/9c/45/979c45048ee5eec6200d85baf54a0ad8.jpg' },
    category: 'Santé maternelle',
    readTime: '5 min',
  },
  {
    id: 2,
    title: 'Nutrition pendant la grossesse',
    image: { uri: 'https://i.pinimg.com/564x/0c/2d/8c/0c2d8c73f8d1d8f3b6d8c9e8d7f3c5b5.jpg' },
    category: 'Nutrition',
    readTime: '7 min',
  },
  {
    id: 3,
    title: '5 signes que vous devriez consulter',
    image: { uri: 'https://i.pinimg.com/564x/8a/3d/8c/8a3d8c6d9b8d0b9e8d7f3c5b5e8d7f3c.jpg' },
    category: 'Prévention',
    readTime: '4 min',
  },
];

const features = [
  { id: 1, icon: HeartFilled, title: 'Services de santé', color: '#FF7EB3' },
  { id: 2, icon: CalendarFilled, title: 'Rendez-vous', color: '#42C3A7' },
  { id: 3, icon: MessageFilled, title: 'Messagerie', color: '#5D7EF4' },
  { id: 4, icon: TeamOutlined, title: 'Communauté', color: '#9D6DFF' },
];

const SlideItem = ({ item, navigation }) => {
  const scaleValue = new Animated.Value(1);
  
  const onPressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };
  
  const onPressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      <TouchableOpacity 
        style={[styles.slideWrapper, { backgroundColor: item.color }]}
        onPress={() => navigation.navigate('ServiceDetail', { service: item })}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        activeOpacity={0.9}
      >
        <Image source={item.image} style={styles.image} resizeMode="cover" />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.gradient}
        />
        <View style={styles.label}>
          <Text style={styles.labelText}>{item.title}</Text>
          <Text style={styles.labelDescription}>{item.description}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const ArticleCard = ({ item, navigation }) => {
  const scaleValue = new Animated.Value(1);
  
  const onPressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };
  
  const onPressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      <TouchableOpacity 
        style={styles.articleCard}
        onPress={() => navigation.navigate('ArticleDetail', { article: item })}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        activeOpacity={0.9}
      >
        <Image source={item.image} style={styles.articleImage} resizeMode="cover" />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.articleGradient}
        />
        <View style={styles.articleContent}>
          <View style={styles.articleCategoryBadge}>
            <Text style={styles.articleCategory}>{item.category}</Text>
          </View>
          <Text style={styles.articleTitle} numberOfLines={2}>{item.title}</Text>
          <View style={styles.articleMeta}>
            <Text style={styles.articleReadTime}>{item.readTime}</Text>
            <RightOutlined style={styles.articleIcon} />
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const FeatureIcon = ({ IconComponent, color }) => {
  return (
    <View style={[styles.featureIconContainer, { backgroundColor: color }]}>
      <IconComponent size={24} color="#fff" />
    </View>
  );
};

export default function Accueil({ navigation }) {
  const scrollY = useRef(new Animated.Value(0)).current;
  
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  
  const heroScale = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [1, 0.9],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
        <Image 
          source={require('../../assets/muso.JPEG.jpg')}  
          style={styles.headerLogo}
        />
        <Text style={styles.headerTitle}>Muso Santé</Text>
      </Animated.View>
      
      <ScrollView 
        style={styles.scrollView}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <Animated.View style={[styles.heroSection, { transform: [{ scale: heroScale }] }]}>
          <LinearGradient
            colors={[Constant.couleur.primaire, '#FF7EB3']}
            style={styles.heroGradient}
          />
          <Image 
            source={require('../../assets/muso.JPEG.jpg')}  
            style={styles.logo}
          />
          <Text style={styles.heroTitle}>Muso Santé</Text>
          <Text style={styles.heroSubtitle}>Votre plateforme de santé dédiée aux femmes rurales</Text>
        </Animated.View>

        <View style={styles.featuresContainer}>
          {features.map((feature) => (
            <TouchableOpacity 
              key={feature.id} 
              style={styles.featureItem}
              onPress={() => navigation.navigate(feature.title)}
            >
              <FeatureIcon IconComponent={feature.icon} color={feature.color} />
              <Text style={styles.featureTitle}>{feature.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.carouselContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nos services</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Services')}>
              <Text style={styles.seeAllText}>Voir tout</Text>
            </TouchableOpacity>
          </View>
          <Carousel
            width={PAGE_WIDTH}
            height={PAGE_HEIGHT}
            data={healthItems}
            autoPlay
            autoPlayInterval={4000}
            scrollAnimationDuration={1000}
            loop
            pagingEnabled
            snapEnabled
            mode="parallax"
            modeConfig={{
              parallaxScrollingScale: 0.9,
              parallaxScrollingOffset: 50,
            }}
            renderItem={({ item }) => <SlideItem item={item} navigation={navigation} />}
          />
        </View>

        <View style={styles.statsContainer}>
          <LinearGradient
            colors={['#f8f9fa', '#e9ecef']}
            style={styles.statsGradient}
          />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>500+</Text>
            <Text style={styles.statLabel}>Consultations/mois</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>3000+</Text>
            <Text style={styles.statLabel}>Femmes inscrites</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>98%</Text>
            <Text style={styles.statLabel}>Satisfaction</Text>
          </View>
        </View>

        <View style={styles.articlesContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Articles récents</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Articles')}>
              <Text style={styles.seeAllText}>Voir tout</Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.articlesScrollView}
          >
            {articles.map((article) => (
              <ArticleCard key={article.id} item={article} navigation={navigation} />
            ))}
          </ScrollView>
        </View>

        <View style={styles.ctaContainer}>
          <Text style={styles.ctaTitle}>Besoin d'aide ?</Text>
          <Text style={styles.ctaDescription}>Notre équipe est à votre écoute pour répondre à toutes vos questions</Text>
          <TouchableOpacity 
            style={styles.ctaButton}
            onPress={() => Linking.openURL('mailto:contact@musosante.ml')}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={[Constant.couleur.primaire, '#FF7EB3']}
              style={styles.ctaGradient}
            />
            <Text style={styles.ctaText}>Nous contacter</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constant.couleur.gris,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: Constant.couleur.blanc,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Constant.espacement.moyen,
    zIndex: 100,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  headerLogo: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: Constant.espacement.petit,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Constant.couleur.primaire,
  },
  heroSection: {
    alignItems: 'center',
    padding: Constant.espacement.grand,
    paddingTop: Constant.espacement.grand * 2,
    backgroundColor: Constant.couleur.primaire,
    overflow: 'hidden',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  heroGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: Constant.espacement.moyen,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Constant.couleur.blanc,
    marginBottom: Constant.espacement.petit,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  heroSubtitle: {
    fontSize: Constant.typographie.corps,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: Constant.espacement.grand,
    paddingHorizontal: Constant.espacement.moyen,
  },
  featureItem: {
    alignItems: 'center',
    width: 70,
  },
  featureIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Constant.espacement.petit,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  featureTitle: {
    fontSize: 12,
    textAlign: 'center',
    color: Constant.couleur.texte,
    fontWeight: '500',
  },
  carouselContainer: {
    marginVertical: Constant.espacement.grand,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Constant.espacement.grand,
    marginBottom: Constant.espacement.moyen,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Constant.couleur.secondaire,
  },
  seeAllText: {
    fontSize: 14,
    color: Constant.couleur.primaire,
    fontWeight: '500',
  },
  slideWrapper: {
    width: PAGE_WIDTH - 40,
    height: PAGE_HEIGHT,
    borderRadius: 20,
    overflow: 'hidden',
    marginHorizontal: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '60%',
  },
  label: {
    position: 'absolute',
    bottom: 0,
    padding: Constant.espacement.moyen,
    width: '100%',
  },
  labelText: {
    color: Constant.couleur.blanc,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  labelDescription: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: Constant.espacement.grand,
    padding: Constant.espacement.moyen,
    borderRadius: 15,
    marginHorizontal: Constant.espacement.moyen,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statsGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  statItem: {
    alignItems: 'center',
    padding: 10,
  },
  statNumber: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Constant.couleur.primaire,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Constant.couleur.texte,
    textAlign: 'center',
    fontWeight: '500',
  },
  articlesContainer: {
    marginVertical: Constant.espacement.grand,
  },
  articlesScrollView: {
    paddingHorizontal: Constant.espacement.moyen,
  },
  articleCard: {
    width: 280,
    backgroundColor: Constant.couleur.blanc,
    borderRadius: 15,
    marginRight: Constant.espacement.moyen,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  articleImage: {
    width: '100%',
    height: 160,
  },
  articleGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '60%',
  },
  articleContent: {
    position: 'absolute',
    bottom: 0,
    padding: Constant.espacement.moyen,
    width: '100%',
  },
  articleCategoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  articleCategory: {
    fontSize: 12,
    color: Constant.couleur.primaire,
    fontWeight: '600',
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Constant.couleur.blanc,
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  articleMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  articleReadTime: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
  },
  articleIcon: {
    color: Constant.couleur.blanc,
    fontSize: 14,
  },
  ctaContainer: {
    backgroundColor: Constant.couleur.blanc,
    margin: Constant.espacement.grand,
    padding: Constant.espacement.grand,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  ctaTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Constant.couleur.secondaire,
    marginBottom: Constant.espacement.petit,
  },
  ctaDescription: {
    fontSize: 14,
    color: Constant.couleur.texte,
    textAlign: 'center',
    marginBottom: Constant.espacement.moyen,
  },
  ctaButton: {
    width: '100%',
    padding: Constant.espacement.moyen,
    borderRadius: 30,
    overflow: 'hidden',
    alignItems: 'center',
  },
  ctaGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  ctaText: {
    color: Constant.couleur.blanc,
    fontWeight: 'bold',
    fontSize: 16,
  },
});