import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, ImageBackground, TextInput } from 'react-native';
import { Octicons, AntDesign, Entypo, SimpleLineIcons } from "@expo/vector-icons";
import Header from '../../Head/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

export default function Option({ navigation }) {
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
           <LinearGradient
        colors={["#006AF5", "#5ac8fa"]}
        start={[0, 0.5]}
        end={[1, 0.5]}
        style={styles.header}
      >
                <TouchableOpacity>
                    <Octicons name="arrow-left" size={25} color="white" onPress={() => navigation.goBack()}/>
                </TouchableOpacity>

                <Text style={styles.name}>{userData.name}</Text>
                </LinearGradient>

            <View>
                <TouchableOpacity>
                    <Text style={styles.option}
                        onPress={() => navigation.navigate("Information")}>
                        Thông tin
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={styles.option}>Đổi ảnh đại diện</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={styles.option}>Đổi ảnh bìa</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={styles.option}>Cập nhật giới thiệu bản thân</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>navigation.navigate('ChangePassword')}> 
                    <Text style={styles.option}>Đổi mật khẩu</Text>
                </TouchableOpacity>
            </View>

            <View
                style={{
                    borderBottomColor: '#e3e3e3',
                    borderBottomWidth: 10, // Độ dày của đường gạch ngang
                    width: '100%', // Chiều rộng của gạch ngang
                }} />

            <View>
                <Text style={{ ...styles.option, color: "#006AF5", fontWeight: 600, borderBottomWidth: 0 }}>Cài đặt</Text>

                <TouchableOpacity>
                    <Text style={styles.option}>Mã QR của tôi</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={styles.option}>Quyền riêng tư</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={styles.option}>Quản lý tài khoản</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={styles.option}>Cài đặt chung</Text>
                </TouchableOpacity>
            </View>


        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop:35,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        height: 50,
        width: '100%'
    },

    name: {
        color: 'white',
        marginLeft: 20,
        fontSize: 18,
        fontWeight: "400"
    },

    option: {
        fontSize: 18,
        fontWeight: "400",
        marginLeft: 20,
        padding: 13,
        borderBottomWidth: 1,
        borderBottomColor: "#rgba(0, 0, 0, 0.1)",
    }

});
