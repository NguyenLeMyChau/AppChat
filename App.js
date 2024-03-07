import * as React from 'react';
import {} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Navbar from './src/Component/Navbar';
import Signin from './src/Component/Signin'
import ForgotPassword from './src/Component/ForgotPassword';
import Register from './src/Component/Register';
import ResendEmail from './src/Component/ResendEmail';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MenuChat from './src/Component/MenuChat';
import { FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import Body from './src/Component/Body'
import Login from './src/Component/Login'
import HomeChat from './src/Component/HomeChat';
import DanhBa from './src/Component/DanhBa';
import NhatKy from './src/Component/NhatKy';
import KhamPha from './src/Component/KhamPha';
import  User from './src/Component/User';
import ChatScreen from './src/Component/Chat';
import { AuthProvider } from './src/Login/AuthProvider';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const BottomTab = () => {
  return(
      <Tab.Navigator 
        initialRouteName="MenuChat"             
      >
        <Tab.Screen name="MenuChat" component={MenuChat}   options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbubble-ellipses" color={color} size={26} />
          ),
          tabBarStyle: { backgroundColor: 'white' },
        }}/>
        <Tab.Screen name="DanhBa" component={DanhBa}  options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="address-book-o" color={color} size={26} />
          ),
          tabBarStyle: { backgroundColor: 'white' },
        }}/>
        <Tab.Screen name="KhamPha" component={KhamPha}   options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <SimpleLineIcons name="grid" color={color} size={26} />
          ),
          tabBarStyle: { backgroundColor: 'white' },
        }}/>
        <Tab.Screen name="NhatKy" component={NhatKy}   options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <SimpleLineIcons name="clock" color={color} size={26} />
          ),
          tabBarStyle: { backgroundColor: 'white' },
        }}/>
        <Tab.Screen name='User' component={User}    options={{
          headerShown: false,
        headerTintColor: 'white', 
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-circle" color={color} size={26} />
          ),
          tabBarStyle: { backgroundColor: 'white' },
        }}/>
      </Tab.Navigator>
  );
}
function App() {
  return (
    <AuthProvider>
    <NavigationContainer>    
      <Stack.Navigator initialRouteName="HomeLogin" >
      <Stack.Screen name="Navbar" component={Navbar} />
      <Stack.Screen name="BottomTab" component={BottomTab} options={{ headerShown: false }} />
      <Stack.Screen name="Body" component={Body} options={{ headerShown: false }} />
      <Stack.Screen name="Signin" component={Signin}  options={{ headerShown: false}}/>
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false}} />
      <Stack.Screen name="ResendEmail" component={ResendEmail} options={{ headerShown: false}}/>
      <Stack.Screen name="Login" component={Login} options={{ title:'Đăng nhập'  }}/>
      <Stack.Screen name="HomeLogin" component={HomeChat} options={{ headerShown: false}}/>
      <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ headerShown: false}}/>
    </Stack.Navigator>
    </NavigationContainer>
    </AuthProvider>
  );
}

export default App;