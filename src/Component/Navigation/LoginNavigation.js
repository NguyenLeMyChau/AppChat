import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../Login/SplashScreen';
import HomeLoginZalo from '../Login/HomeLoginZalo';

const Stack = createStackNavigator();

const LoginNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen" headerMode="none">
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="HomeLoginZalo" component={HomeLoginZalo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default LoginNavigation;
