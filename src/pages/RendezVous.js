import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Animated,
  Dimensions,
  Platform,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { LinearGradient } from "expo-linear-gradient";
import { Constant } from "../utils/Constant";
import { 
  ClockCircleOutlined, 
  UserOutlined, 
  MedicineBoxOutlined,
  MoreOutlined,
  PlusOutlined 
} from "@ant-design/icons";

const { width } = Dimensions.get('window');

const appointments = [
  {
    id: "1",
    date: "2023-12-15",
    time: "10:00",
    doctor: "Dr. Aminata Traoré",
    specialty: "Gynécologie",
    status: "confirmé",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
  },
  {
    id: "2",
    date: "2023-12-20",
    time: "14:30",
    doctor: "Dr. Oumou Diarra",
    specialty: "Consultation prénatale",
    status: "confirmé",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "3",
    date: "2023-12-22",
    time: "11:15",
    doctor: "Dr. Amadou Konaté",
    specialty: "Échographie",
    status: "en attente",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
];

export default function RendezVous({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [activeTab, setActiveTab] = useState("upcoming");
  
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [160, 100],
    extrapolate: 'clamp',
  });
  
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const filteredAppointments = appointments.filter(
    (app) => app.date === selectedDate
  );

  const upcomingAppointments = appointments.filter(
    (app) => new Date(app.date) >= new Date()
  );

  const pastAppointments = appointments.filter(
    (app) => new Date(app.date) < new Date()
  );

  const displayAppointments = activeTab === "upcoming" ? upcomingAppointments : pastAppointments;

  const renderAppointment = ({ item }) => {
    const scaleValue = new Animated.Value(1);
    
    const onPressIn = () => {
      Animated.spring(scaleValue, {
        toValue: 0.98,
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
          style={styles.card}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={item.status === "confirmé" ? 
              [Constant.couleur.primaire, '#6A5AE0'] : 
              ['#FF9E44', '#FF7EB3']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.cardGradient}
          />
          
          <View style={styles.timeContainer}>
            <ClockCircleOutlined style={styles.timeIcon} />
            <Text style={styles.time}>{item.time}</Text>
          </View>
          
          <View style={styles.details}>
            <View style={styles.doctorInfo}>
              <View style={styles.avatarContainer}>
                <LinearGradient
                  colors={['#FF9E44', '#FF7EB3']}
                  style={styles.avatarGradient}
                />
                <UserOutlined style={styles.avatarIcon} />
              </View>
              <View>
                <Text style={styles.doctor}>{item.doctor}</Text>
                <View style={styles.specialtyContainer}>
                  <MedicineBoxOutlined style={styles.specialtyIcon} />
                  <Text style={styles.specialty}>{item.specialty}</Text>
                </View>
              </View>
            </View>
            
            <View style={[
              styles.status,
              { backgroundColor: item.status === "confirmé" ? "rgba(76, 175, 80, 0.2)" : "rgba(255, 152, 0, 0.2)" },
            ]}>
              <Text style={[
                styles.statusText,
                { color: item.status === "confirmé" ? "#4CAF50" : "#FF9800" }
              ]}>
                {item.status}
              </Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.menu}>
            <MoreOutlined style={styles.menuIcon} />
          </TouchableOpacity>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { height: headerHeight }]}>
        <LinearGradient
          colors={[Constant.couleur.primaire, '#6A5AE0']}
          style={StyleSheet.absoluteFill}
        />
        <Animated.View style={[styles.headerContent, { opacity: headerOpacity }]}>
          <Text style={styles.headerTitle}>📅 Mes rendez-vous</Text>
          <Text style={styles.headerSubtitle}>Gérez vos consultations médicales</Text>
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
          {/* Calendrier stylé */}
          <View style={styles.calendarContainer}>
            <Calendar
              onDayPress={(day) => setSelectedDate(day.dateString)}
              markedDates={{
                [selectedDate]: {
                  selected: true,
                  selectedColor: Constant.couleur.primaire,
                  customStyles: {
                    container: {
                      borderRadius: 10,
                      elevation: 3,
                    },
                    text: {
                      color: 'white',
                      fontWeight: 'bold',
                    },
                  },
                },
                ...appointments.reduce((acc, app) => {
                  acc[app.date] = {
                    marked: true,
                    dotColor: Constant.couleur.secondaire,
                  };
                  return acc;
                }, {}),
              }}
              theme={{
                selectedDayBackgroundColor: Constant.couleur.primaire,
                todayTextColor: Constant.couleur.primaire,
                arrowColor: Constant.couleur.primaire,
                monthTextColor: Constant.couleur.secondaire,
                textMonthFontWeight: "bold",
                textDayFontSize: 14,
                textMonthFontSize: 16,
                'stylesheet.calendar.header': {
                  week: {
                    marginTop: 7,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    borderBottomWidth: 1,
                    borderBottomColor: '#f0f0f0',
                    paddingBottom: 10,
                  }
                }
              }}
              style={styles.calendar}
            />
          </View>

          {/* Tabs pour rendez-vous à venir/passés */}
          <View style={styles.tabsContainer}>
            <TouchableOpacity 
              style={[styles.tab, activeTab === "upcoming" && styles.activeTab]}
              onPress={() => setActiveTab("upcoming")}
            >
              <Text style={[styles.tabText, activeTab === "upcoming" && styles.activeTabText]}>
                À venir
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, activeTab === "past" && styles.activeTab]}
              onPress={() => setActiveTab("past")}
            >
              <Text style={[styles.tabText, activeTab === "past" && styles.activeTabText]}>
                Passés
              </Text>
            </TouchableOpacity>
          </View>

          {/* Liste des rendez-vous */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {activeTab === "upcoming" 
                ? `Rendez-vous du ${new Date(selectedDate).toLocaleDateString("fr-FR")}`
                : "Anciens rendez-vous"}
            </Text>

            {displayAppointments.length > 0 ? (
              <FlatList
                data={displayAppointments}
                renderItem={renderAppointment}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
              />
            ) : (
              <View style={styles.emptyBox}>
                <Text style={styles.emptyText}>
                  {activeTab === "upcoming" 
                    ? "Aucun rendez-vous prévu pour cette date ✨"
                    : "Aucun rendez-vous passé 📝"}
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Bouton nouveau rendez-vous flottant */}
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => navigation.navigate('Services')}
      >
        <LinearGradient
          colors={[Constant.couleur.primaire, '#6A5AE0']}
          style={styles.addButtonGradient}
        >
          <PlusOutlined style={styles.addButtonIcon} />
          <Text style={styles.addButtonText}>Nouveau</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constant.couleur.gris,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    overflow: 'hidden',
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
  },
  headerContent: {
    paddingHorizontal: Constant.espacement.grand,
    paddingBottom: Constant.espacement.moyen,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Constant.couleur.blanc,
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  scrollView: {
    flex: 1,
    marginTop: 160,
  },
  content: {
    paddingBottom: 100,
  },
  calendarContainer: {
    marginHorizontal: Constant.espacement.moyen,
    marginBottom: Constant.espacement.grand,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: Constant.couleur.blanc,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  calendar: {
    borderRadius: 16,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginHorizontal: Constant.espacement.moyen,
    marginBottom: Constant.espacement.grand,
    backgroundColor: Constant.couleur.blanc,
    borderRadius: 12,
    padding: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  tab: {
    flex: 1,
    paddingVertical: Constant.espacement.moyen,
    alignItems: 'center',
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: Constant.couleur.primaire,
  },
  tabText: {
    fontSize: Constant.typographie.corps,
    fontWeight: '600',
    color: Constant.couleur.texte,
  },
  activeTabText: {
    color: Constant.couleur.blanc,
  },
  section: {
    marginHorizontal: Constant.espacement.moyen,
  },
  sectionTitle: {
    fontSize: Constant.typographie.sousTitre,
    fontWeight: "600",
    marginBottom: Constant.espacement.moyen,
    color: Constant.couleur.secondaire,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: Constant.couleur.blanc,
    borderRadius: 16,
    padding: Constant.espacement.moyen,
    marginBottom: Constant.espacement.moyen,
    alignItems: 'center',
    overflow: 'hidden',
    minHeight: 100,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.1,
  },
  timeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Constant.espacement.moyen,
    minWidth: 65,
  },
  timeIcon: {
    fontSize: 16,
    color: Constant.couleur.primaire,
    marginBottom: 5,
  },
  time: {
    color: Constant.couleur.primaire,
    fontWeight: 'bold',
    fontSize: 16,
  },
  details: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: Constant.espacement.moyen,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  avatarIcon: {
    fontSize: 24,
    color: Constant.couleur.blanc,
  },
  doctor: {
    fontSize: Constant.typographie.corps,
    fontWeight: 'bold',
    color: Constant.couleur.texte,
    marginBottom: 4,
  },
  specialtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  specialtyIcon: {
    fontSize: 12,
    color: '#666',
    marginRight: 4,
  },
  specialty: {
    fontSize: Constant.typographie.legende,
    color: '#666',
  },
  status: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  menu: {
    padding: Constant.espacement.petit,
  },
  menuIcon: {
    fontSize: 20,
    color: Constant.couleur.texte,
  },
  emptyBox: {
    padding: Constant.espacement.grand,
    alignItems: 'center',
    backgroundColor: Constant.couleur.blanc,
    borderRadius: 16,
    marginTop: Constant.espacement.moyen,
  },
  emptyText: {
    fontSize: Constant.typographie.corps,
    fontStyle: 'italic',
    color: '#888',
    textAlign: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderRadius: 30,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  addButtonGradient: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonIcon: {
    color: Constant.couleur.blanc,
    fontSize: 20,
    marginRight: 8,
  },
  addButtonText: {
    color: Constant.couleur.blanc,
    fontSize: 16,
    fontWeight: 'bold',
  },
});