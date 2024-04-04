import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, ImageBackground, TextInput } from 'react-native';
import { Octicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Information({ navigation }) {
    const [userData, setUserData] = useState({});

    async function getData() {
        const foundUser = await AsyncStorage.getItem('foundUser');
        console.log(JSON.parse(foundUser));
        setUserData(JSON.parse(foundUser));
        //JSON.parse(foundUser) chuyển chuỗi JSON thành object
    }

    useEffect(() => {
        getData();
    }, []);


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.coverImage}>
                    <ImageBackground source={require('/assets/coverimage.jpg')} style={{ width: '100%', height: '100%', justifyContent: "space-between" }}>
                        <View style={styles.tab}>
                            <Octicons name="arrow-left" size={25} color="white" onPress={() => navigation.goBack()} />
                        </View>


                        <View style={styles.tabEnd}>
                            <Image
                                source={userData.avatar ? { uri: userData.avatar } : require('/assets/AnexanderTom.jpg')}
                                style={styles.avatar} />
                            <Text style={styles.name}>{userData.name}</Text>
                        </View>
                    </ImageBackground>
                </View>
            </View>

            <View style={{ backgroundColor: "white" }}>
                <Text style={{ ...styles.option, fontWeight: 600, margin: 10, marginLeft: 20, width: "75%" }}>Thông tin cá nhân</Text>

                <View>
                    <View style={styles.infor}>
                        <Text style={styles.option}>Giới tính</Text>
                        <Text style={{ ...styles.option, width: "75%" }}>{userData.gender ? "Nữ" : "Nam"}</Text>
                    </View>

                    <View style={styles.infor}>
                        <Text style={styles.option}>Email</Text>
                        <Text style={{ ...styles.option, width: "75%" }}>{userData.email}</Text>
                    </View>

                    <TouchableOpacity style={styles.uploadStatus} onPress={() => navigation.navigate("ChangeInformation")}>
                        <Text style={{ fontSize: 18, fontWeight: "600" }}>
                            <Octicons name="pencil" size={18} color="black" style={{ marginRight: 5 }} />
                            Chỉnh sửa
                        </Text>
                    </TouchableOpacity>


                </View>
            </View>
        </View>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#rgba(0, 0, 0, 0.05)'
    },
    header: {
        width: '100%',
        height: "auto",
    },
    tab: {
        width: "100%",
        height: 60,
        alignItems: "center",
        flexDirection: "row",
        paddingLeft: 20,
    },
    tabEnd: {
        flexDirection: "row",
        alignItems: "center",
        bottom: 15
    },
    coverImage: {
        width: '100%',
        height: 200,
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 75,
        borderWidth: 3,
        borderColor: '#C4C4C4',
        marginLeft: 10,
    },

    name: {
        fontSize: 18,
        fontWeight: '400',
        color: "white",
        marginLeft: 15
    },

    option: {
        fontSize: 16,
        fontWeight: 400,
        width: "25%"
    },

    infor: {
        borderBottomWidth: 1,
        borderBottomColor: "#rgba(0, 0, 0, 0.1)",
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        paddingLeft: 20
    },

    uploadStatus: {
        width: "90%",
        height: 40,
        backgroundColor: '#D6D9DC',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
        marginLeft: 20
    }


});