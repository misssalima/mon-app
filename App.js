import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeFilled, InfoCircleFilled, UserOutlined, HeartFilled, TeamOutlined, MessageFilled, CalendarFilled } from '@ant-design/icons';
import Accueil from './src/pages/Accueil';
import APropos from './src/pages/APropos';
import MonCompte from './src/pages/MonCompte';
import Services from './src/pages/Services';
import Communaute from './src/pages/Communaute';
import Connexion from './src/pages/Connexion';
import Inscription from './src/pages/Inscription';
import Messagerie from './src/pages/Messagerie';
import RendezVous from './src/pages/RendezVous';
import ArticleDetail from './src/pages/ArticleDetail';
import ServiceDetail from './src/pages/ServiceDetail';

import { Constant } from './src/utils/Constant'; 

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let IconComponent;
          
          if (route.name === 'Accueil') {
            IconComponent = HomeFilled;
          } else if (route.name === 'Services') {
            IconComponent = HeartFilled;
          } else if (route.name === 'Communauté') {
            IconComponent = TeamOutlined;
          } else if (route.name === 'Messagerie') {
            IconComponent = MessageFilled;
          } else if (route.name === 'Rendez-vous') {
            IconComponent = CalendarFilled;
          } else if (route.name === 'À Propos') {
            IconComponent = InfoCircleFilled;
          } else if (route.name === 'Mon Compte') {
            IconComponent = UserOutlined;
          }
          
          return <IconComponent size={size} color={color} />;
        },
        tabBarActiveTintColor: Constant.couleur.primaire,
        tabBarInactiveTintColor: 'gray',
        headerStyle: {
          backgroundColor: Constant.couleur.primaire,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen name="Accueil" component={Accueil} />
      <Tab.Screen name="Services" component={Services} />
      <Tab.Screen name="Rendez-vous" component={RendezVous} />
      <Tab.Screen name="Messagerie" component={Messagerie} />
      <Tab.Screen name="Communauté" component={Communaute} />
      <Tab.Screen name="À Propos" component={APropos} />
      <Tab.Screen name="Mon Compte" component={MonCompte} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <>
            <Stack.Screen 
              name="Main" 
              component={MainTabs} 
              options={{ headerShown: false }} 
            />
            <Stack.Screen 
              name="ArticleDetail" 
              component={ArticleDetail} 
              options={{ title: "Détails de l'article" }} 
            />
            <Stack.Screen 
              name="ServiceDetail" 
              component={ServiceDetail} 
              options={{ title: "Détails du service" }} 
            />
          </>
        ) : (
          <>
            <Stack.Screen 
              name="Connexion" 
              options={{ headerShown: false }}
            >
              {props => <Connexion {...props} setIsLoggedIn={setIsLoggedIn} />}
            </Stack.Screen>
            <Stack.Screen 
              name="Inscription" 
              component={Inscription} 
              options={{ title: 'Créer un compte' }} 
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
