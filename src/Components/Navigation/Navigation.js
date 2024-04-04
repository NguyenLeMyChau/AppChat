import React from "react";
import { AuthProvider } from "../Login/AuthProvider";
import BottomTab from "../Navigation/BottomTab";
import Signin from "../Login/Signin";
import Register from "../Register/Register";
import Login from "./LoginNavigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import ChatScreen from "../Tab/MenuChat/Chat";
import SplashScreen from "../Login/SplashScreen";
import HomeLoginZalo from "../Login/HomeLoginZalo";
import ChangeInformation from "../Tab/User/ChangeInformation";
import Option from "../Tab/User/Option";
import Information from "../Tab/User/Information";
import InformationUser from "../Tab/User/InformationUser";
import User from "../Tab/User/User";
import ChangePassword from "../Tab/User/ChangePassword";
import Setting from "../Tab/User/Setting";

const Stack = createNativeStackNavigator();
function Navigation() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen" headerMode="none">
          <Stack.Screen name="BottomTab" component={BottomTab} options={{ headerShown: false }}/>
          <Stack.Screen name="Signin" component={Signin} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
          <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="HomeLoginZalo" component={HomeLoginZalo} options={{ headerShown: false }}/>
          <Stack.Screen name="InformationUser" component={InformationUser} options={{ headerShown: false }}/>
          <Stack.Screen name="Information" component={Information} options={{ headerShown: false }}/>
          <Stack.Screen name="Option" component={Option} options={{ headerShown: false }}/>
          <Stack.Screen name="User" component={User} options={{ headerShown: false }}/>
          <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false }}/>
          <Stack.Screen name="Setting" component={Setting} options={{ headerShown: false }}/>
          <Stack.Screen
            name="ChangeInformation"
            component={ChangeInformation}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

export default Navigation;
