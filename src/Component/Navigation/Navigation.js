import React, { Component } from 'react';
import {AuthProvider } from '../Login/AuthProvider';
import Navbar from '../Navbar';
import BottomTab from '../Navigation/BottomTab';
import Body from '../Body';
import Signin from '../Signin';
import Register from '../Register/Register';
import ResendEmail from '../ResendEmail';
import Login from './LoginNavigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeChat from '../HomeChat'
import ChatScreen from '../Chat'
import SplashScreen from '../Login/SplashScreen';
import HomeLoginZalo from '../Login/HomeLoginZalo';



const Stack = createNativeStackNavigator();
 function Navigation () {
  
    return (
        <AuthProvider>
        <NavigationContainer>    
          <Stack.Navigator initialRouteName="SplashScreen" >
          <Stack.Screen name="Navbar" component={Navbar} />
          <Stack.Screen name="BottomTab" component={BottomTab} options={{ headerShown: false }} />
          <Stack.Screen name="Body" component={Body} options={{ headerShown: false }} />
          <Stack.Screen name="Signin" component={Signin}  options={{ headerShown: false}}/>
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="ResendEmail" component={ResendEmail} options={{ headerShown: false}}/>
          <Stack.Screen name="Login" component={Login} options={{ title:'Đăng nhập'}}/>
          <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ headerShown: false}}/>
          <Stack.Screen name="SplashScreen" component={SplashScreen}  options={{ headerShown: false}}/>
        <Stack.Screen name="HomeLoginZalo" component={HomeLoginZalo}  options={{ headerShown: false}}/>
        </Stack.Navigator>
        </NavigationContainer>
        </AuthProvider>
    );

}

export default Navigation;
