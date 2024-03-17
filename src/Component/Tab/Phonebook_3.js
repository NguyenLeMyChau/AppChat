import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { AntDesign, MaterialCommunityIcons  } from "@expo/vector-icons";

export default function PhonebookScreen03() {
    return (
        <View style={styles.container}>

            <View style={{ width: "100%", paddingLeft: 30 }}>

                <View style={{ ...styles.header, marginTop: 10 }}>
                    <TouchableOpacity style={styles.buttonFeature}>
                        <MaterialCommunityIcons name="z-wave" size={30} color="white" style={{ left: 10 }} />
                    </TouchableOpacity>                    
                    <Text style={{ fontSize: 17 }}>Tìm thêm Official Account</Text>
                </View>


            </View>

            <View
                style={{
                    borderBottomColor: '#e3e3e3',
                    borderBottomWidth: 7, // Độ dày của đường gạch ngang
                    width: '100%', // Chiều rộng của gạch ngang
                }} />

        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    header: {
        flexDirection: "row",
        alignItems: 'center',
        width: "100%",
        marginBottom: 10
    },

    buttonFeature: {
        width: 50,
        height: 50,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "pink",
        borderRadius: 50,
        backgroundImage: "linear-gradient(45deg, #513091 0%, #b69de7 100%)",
        marginRight: 20,
        left: 5
    },

    textFeature: {
        fontSize: 15,
        textAlign: "center",
        color: "#5c5a5a"
    }
});
