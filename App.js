// import * as React from 'react';
// import { } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Navbar from './src/Component/Navbar';
// import Signin from './src/Component/Signin'
// import ForgotPassword from './src/Component/ForgotPassword';
// import Register from './src/Component/Register';
// import ResendEmail from './src/Component/ResendEmail';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import MenuChat from './src/Component/MenuChat';
// import { FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
// import Body from './src/Component/Body'
// import Login from './src/Component/Login'
// import HomeChat from './src/Component/HomeChat';
import NhatKy from './src/Component/Tab/NhatKy';
// import User from './src/Component/User';
// import ChatScreen from './src/Component/Chat';
// import { AuthProvider } from './src/Login/AuthProvider';

import { StyleSheet, Text, View } from 'react-native';
import MenuChat from './src/Component/Tab/MenuChat';
import KhamPha from './src/Component/Tab/KhamPha';
import PhonebookTopTab from './src/Component/Navigation/PhonebookTopTab';
import PhonebookScreen01 from './src/Component/Tab/Phonebook_1';
import PhonebookScreen02 from './src/Component/Tab/Phonebook_2';
import PhonebookScreen03 from './src/Component/Tab/Phonebook_3';

export default function App() {
  return (
    <PhonebookTopTab/>
  );

}


