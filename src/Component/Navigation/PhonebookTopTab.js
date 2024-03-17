import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { AntDesign, MaterialCommunityIcons, SimpleLineIcons } from "@expo/vector-icons";

import Header from '../header/Header';
import PhonebookScreen01 from '../Tab/Phonebook_1';
import PhonebookScreen02 from '../Tab/Phonebook_2';
import PhonebookScreen03 from '../Tab/Phonebook_3';

const Tab = createMaterialTopTabNavigator();

export default function PhonebookTopTab() {
    return (
        <View style={styles.container}>
            <NavigationContainer>
                <View style={{
                    flexDirection: "row", alignItems: 'center', width: "100%"
                }}>
                    <Header />
                    <TouchableOpacity style={{ marginLeft: -45 }}>
                        <AntDesign name="adduser" size={25} color="white" />
                    </TouchableOpacity>
                </View>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarLabel: ({ focused }) => {
                            let label = route.name;
                            return (
                                <View style={styles.tabBarLabelContainer}>
                                    <Text style={[styles.tabBarLabel, { fontWeight: focused ? 'bold' : 'normal' }]}>
                                        {label}
                                    </Text>
                                </View>
                            )
                        }

                    })}

                >
                    <Tab.Screen name="Bạn bè " component={PhonebookScreen01} />
                    <Tab.Screen name="Nhóm" component={PhonebookScreen02} />
                    <Tab.Screen name="OA" component={PhonebookScreen03} />
                </Tab.Navigator>
            </NavigationContainer>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    tabBarLabelContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabBarLabel: {
        fontSize: 16,
    },
})
