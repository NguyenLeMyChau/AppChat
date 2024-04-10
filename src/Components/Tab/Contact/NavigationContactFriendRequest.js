import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { Octicons } from "@expo/vector-icons";

import Contact_SendFriendRequest from './Contact_SendFriendRequest';
import Contact_AcceptFriendRequest from './Contact_AcceptFriendRequest';

const Tab = createMaterialTopTabNavigator();

export default function NavigationContactFriendRequest() {
    return (
        <View style={styles.container}>
            <NavigationContainer independent={true}>
                <View style={styles.header}>
                    <TouchableOpacity>
                        <Octicons
                            name="arrow-left"
                            size={25}
                            color="white"
                        />
                    </TouchableOpacity>

                    <Text style={styles.name}>Lời mời kết bạn</Text>
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
                    <Tab.Screen name="Đã nhận" component={Contact_SendFriendRequest} />
                    <Tab.Screen name="Đã gửi" component={Contact_AcceptFriendRequest} />
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
        width: 100
    },
    tabBarLabel: {
        fontSize: 16,
    },
    header: {
        backgroundImage: "linear-gradient(90deg, #006AF5 30%, #5ac8fa 100%)",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 8,
        height: "8%",
        width: "100%",
    },
    name: {
        color: "white",
        marginLeft: 20,
        fontSize: 18,
        fontWeight: "400",
      },
})
