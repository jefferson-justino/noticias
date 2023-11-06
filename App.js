import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './screens/home';
import { Ionicons } from '@expo/vector-icons';
import Favorite from './screens/favorite';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function App() {
  const Tab = createBottomTabNavigator()
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Notícias" component={Home} options={{    
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="newspaper" color={color} size={size}/>
      ), 
    }}/>
        <Tab.Screen name="Favoritos" component={Favorite} options={{    
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="bookmark" color={color} size={size} />
      ), 
    }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}


