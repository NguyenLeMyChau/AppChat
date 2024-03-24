import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome, Entypo, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

export default function Contacts_Groups() {
    return (
        <View style={styles.container}>

            <View style={{ width: "100%", paddingLeft: 20, margin: 10 }}>

                <View style={styles.header}>
                    <FontAwesome name="circle" size={50} color="#dce7f5" />
                    <AntDesign name="addusergroup" size={20} color="#006AF5" style={{ left: -32 }} />
                    <Text style={{ fontSize: 17 }}>Tạo nhóm mới</Text>
                </View>
            </View>

            <View
                style={{
                    borderBottomColor: '#e3e3e3',
                    borderBottomWidth: 7, // Độ dày của đường gạch ngang
                    width: '100%', // Chiều rộng của gạch ngang
                }} />


            <View style={{ width: "100%", height: "auto", padding: 10}}>

                <Text style={{ ...styles.textFeature, fontWeight: 550, top: -8 }}>Tính năng nổi bật</Text>

                <View style={{ ...styles.header}}>
                    <View style={{ ...styles.header, marginTop: 10, flexDirection: "row", justifyContent:"space-around"}}>
                        <View>
                            <TouchableOpacity style={styles.buttonFeature}>
                                <Entypo name="calendar" size={35} color="#3679c7" style={{ left: 13 }} />
                            </TouchableOpacity>
                            <Text style={{ ...styles.textFeature, textAlign: "center" }}>Lịch</Text>
                        </View>

                        <View>
                            <TouchableOpacity style={styles.buttonFeature}>
                                <AntDesign name="clockcircle" size={35} color="#dc1f18" style={{ left: 13 }} />
                            </TouchableOpacity>
                            <Text style={{ ...styles.textFeature, textAlign: "center" }}>Nhắc hẹn</Text>
                        </View>

                        <View>
                            <TouchableOpacity style={styles.buttonFeature}>
                                <Entypo name="lifebuoy" size={35} color="#6a40bf" style={{ left: 13 }} />
                            </TouchableOpacity>
                            <Text style={{ ...styles.textFeature, textAlign: "center" }}>Nhóm offline</Text>
                        </View>

                        <View>
                            <TouchableOpacity style={styles.buttonFeature}>
                                <MaterialCommunityIcons name="image-move" size={35} color="#de640d" style={{ left: 13 }} />
                            </TouchableOpacity>
                            <Text style={{ ...styles.textFeature, textAlign: "center" }}>Chia sẻ ảnh</Text>
                        </View>
                    </View>
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
    },

    buttonFeature: {
        width: 60,
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "pink",
        borderRadius: 20,
        backgroundImage: "linear-gradient(0deg, #e6e3e3 0%, #ffffff 100%)",
        marginRight: 10,
        left: 5
    },

    textFeature: {
        fontSize: 15,
        marginTop: 5
    }
});
