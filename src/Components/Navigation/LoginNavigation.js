import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../Login/SplashScreen';
import HomeLoginZalo from '../Login/HomeLoginZalo';
import Signin from '../Login/Signin';
import Option from '../Tab/User/Option';
import InformationUser from '../Tab/User/InformationUser';
import Information from '../Tab/User/Information';
import ChangeInformation from '../Tab/User/ChangeInformation';
import Register from '../Register/Register';
const Stack = createStackNavigator();

const LoginNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen" headerMode="none">
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="HomeLoginZalo" component={HomeLoginZalo} />
        <Stack.Screen name="Signin" component={Signin} />
        <Stack.Screen name="InformationUser" component={InformationUser} />
        <Stack.Screen name="Information" component={Information} />
        <Stack.Screen name="Option" component={Option} />
        <Stack.Screen name="ChangeInformation" component={ChangeInformation} />
        <Stack.Screen name="Register" component={Register} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default LoginNavigation;
