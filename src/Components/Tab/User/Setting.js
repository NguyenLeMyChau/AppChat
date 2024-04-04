import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, ImageBackground, TextInput } from 'react-native';
import { Octicons, AntDesign, Entypo, SimpleLineIcons } from "@expo/vector-icons";
import Header from '../../Head/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Setting({ navigation }) {
    const [userData, setUserData] = useState({});

    const handleLogout = async () => {
        try {
            // Xóa tất cả dữ liệu đăng nhập đã lưu
            await AsyncStorage.clear();
            // Chuyển hướng người dùng đến màn hình đăng nhập hoặc màn hình chào mừng
            navigation.navigate('Signin'); 
        } catch (error) {
            console.log('Error while logging out:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity>
                    <Octicons name="arrow-left" size={25} color="white" onPress={() => navigation.goBack()}/>
                </TouchableOpacity>

                <Text style={styles.name}>Cài đặt</Text>
            </View>

            <View>
                <TouchableOpacity>
                    <Text style={styles.option}>
                        Thông tin và bảo mật
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={styles.option}>Quyền riêng tư</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={styles.option}>Dữ liệu trên máy</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={styles.option}>Sao lưu và khôi phục</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.option}>Thông báo</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.option}>Tin nhắn</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.option}>Cuộc gọi</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.option}>Nhật ký</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.option}>Danh bạ</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.option}>Giao diện và ngôn ngữ</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.option}>Thông tin về Zalo</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.option}>Liên hệ hỗ trợ</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.option}>Chuyển khoản</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{borderRadius:30,backgroundColor:'gray',justifyContent:'center',alignItems:'center',width:'90%',alignSelf:'center',flexDirection:'row'}} onPress={handleLogout}> 
                        <SimpleLineIcons name="logout" size={25} color="#F2F2F2"/>
                    <Text style={styles.option}>Đăng xuất</Text>
                </TouchableOpacity>
            </View>

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },

    header: {
        backgroundImage: 'linear-gradient(90deg, #006AF5 30%, #5ac8fa 100%)',
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
        
        padding: 13,
        borderBottomWidth: 1,
        borderBottomColor: "#rgba(0, 0, 0, 0.1)",
    }

});
