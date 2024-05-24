import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { Octicons, AntDesign, Entypo } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import AnexanderTom from '../../../../assets/AnexanderTom.jpg'

export default function InformationUser({ navigation }) {

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
                    <ImageBackground
                        source={require('../../../../assets/coverimage.jpg')}
                        style={{ width: '100%', height: '100%' }}>
                            
                        <View style={styles.tab}>
                            <Octicons name="arrow-left" size={25} color="white" onPress={() => navigation.goBack()} />

                            <AntDesign name="eyeo" size={25} color="white" style={{ marginLeft: "70%" }} />

                            <Entypo name="dots-three-horizontal"
                                size={25} color="white"
                                style={{ marginLeft: 20 }}
                                onPress={() => navigation.navigate("Option")} />
                        </View>
                    </ImageBackground>
                </View>
                <Image
                    source={userData.avatar ? { uri: userData.avatar } : {uri:"https://inkythuatso.com/uploads/thumbnails/800/2023/03/6-anh-dai-dien-trang-inkythuatso-03-15-26-36.jpg?gidzl=QL-ECEnPjmnbHeyrw4A_3s16W3Bo4xu5BHU2CwWUl0Wd6T4mhH2-N24LZs2h7RDU94-ADcEyCGaEvr-_3W"}}
                    style={styles.avatar} />
            </View>

            <View style={{ marginTop: 70 }}>
                <Text style={styles.name}>{userData.name}</Text>

                <Text style={styles.introduceYourself}>
                    <Octicons name="pencil" size={18} color="#006AF5" style={{ marginRight: 5 }} />
                    Cập nhật giới thiệu bản thân
                </Text>
            </View>

            <View style={{ marginTop: 20, alignItems: "center" }}>
                <Image source={require('../../../../assets/jpeg.jpg')} style={styles.imgChat} />
                <Text style={{ ...styles.name, fontSize: 15, marginBottom: 10 }}>Hôm nay {userData.name} có gì vui?</Text>
                <Text style={{ ...styles.name, fontSize: 14, fontWeight: 200 }}>Đây là nhật ký của bạn - Hãy làm đầy Nhật ký với{'\n'} những dấu ấn cuộc đời đáng nhớ nhé!</Text>
                <TouchableOpacity style={styles.uploadStatus}>
                    <Text style={{ ...styles.name, color: "white", fontSize: 15 }}>Đăng lên nhật ký</Text>
                </TouchableOpacity>
            </View>


        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#rgba(0, 0, 0, 0.01)',
       
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
        paddingLeft: 20
    },
    coverImage: {
        width: '100%',
        height: 200,
    },
    avatar: {
        width: 140,
        height: 140,
        borderRadius: 75,
        borderWidth: 5,
        borderColor: 'white',
        left: '50%',
        marginLeft: -70,
        position: 'absolute',
        top: 130,
    },

    name: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '600',
    },

    introduceYourself: {
        textAlign: 'center',
        fontSize: 15,
        color: '#006AF5',
        marginTop: 10,
    },

    imgChat: {
        width: 150,
        height: 150,
    },
    uploadStatus: {
        width: 150,
        height: 40,
        backgroundColor: '#006AF5',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    }
});