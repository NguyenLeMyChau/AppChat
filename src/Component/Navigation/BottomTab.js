import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { Component } from 'react';
import MenuChat from '../Tab/MenuChat';
import Contacts_Friends from '../Tab/Contacts_Friends';
import Contacts_Groups from '../Tab/Contacts_Groups';
import KhamPha from '../Tab/KhamPha';
import Timeline from '../Tab/Timeline';
import User from '../User/User'
import { FontAwesome, FontAwesome5, Ionicons, SimpleLineIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
function BottomTab () {
    return (
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
        <Tab.Screen name="DanhBa" component={Contacts_Friends}  options={{
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
        <Tab.Screen name="NhatKy" component={Timeline}   options={{
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
    )
}

export default BottomTab;
