import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, ImageBackground, TextInput, Animated, Alert } from 'react-native';
import { Octicons, AntDesign } from "@expo/vector-icons";
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Platform } from 'react-native';

export default function ChangeInformation({ navigation }) {
    const [userData, setUserData] = useState({});
    const [name, setName] = useState('');
    const [gender, setGender] = useState(true);
    const [avatar, setAvatar] = useState(null);
    const [change,setChange] = useState(false);

    async function getData() {
        const foundUser = await AsyncStorage.getItem('foundUser');
        setUserData(JSON.parse(foundUser));
    }

    useEffect(() => {
        getData();
    }, []);


    const selectFile = async () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.onchange = e => {
            const file = e.target.files[0];
            console.log(file);
            setAvatar(file);
        }
        input.click();
    }

    const handleChange = async (file) => {
        var avatarCurrent = userData.avatar;
        const formData = new FormData();
        formData.append('avatar', file);
        if(file!==null){
            const responseAvatar = await axios.post(`http://localhost:4000/user/uploadAvatarS3/${userData._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            avatarCurrent = responseAvatar.data.avatar;           
        }
        
        const response = await axios.put(`http://localhost:4000/user/updateUser/${userData._id}`, { name, gender, avatar: avatarCurrent });

        const { data } = response;

        if (data.success) {
            let updatedUser;
            if (name === '') {
                updatedUser = {
                    name: userData.name,
                    email: userData.email,
                    gender: gender,
                    avatar: avatarCurrent
                };
            } else {
                updatedUser = {
                    name: name,
                    email: userData.email,
                    gender: gender,
                    avatar: avatarCurrent
                };
            }

            alert("Cập nhật thông tin thành công");
            Alert.alert(data.message);
            console.log(updatedUser);
            await AsyncStorage.setItem('foundUser', JSON.stringify(updatedUser));
            setUserData(updatedUser);


        } else {
            Alert.alert(data.message);
           alert(data.message);
        }
    };

    useEffect(() => {
        setGender(userData.gender);
    }, [userData.gender]);

    const options = [
        { label: 'Nữ', value: true },
        { label: 'Nam', value: false },
    ];

    const scale = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(scale, {
                    toValue: 0.5,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(scale, {
                    toValue: 1.5,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ]),
        ).start();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity>
                    <Octicons name="arrow-left" size={25} color="white" onPress={() => navigation.goBack()} />
                </TouchableOpacity>

                <Text style={styles.name}>Chỉnh sửa thông tin</Text>
            </View>

            <View style={{ backgroundColor: "white" }}>
                <View style={{ flexDirection: "row", paddingTop: 20 }}>
                    <View style={styles.head}>
                        <TouchableOpacity onPress={() => {selectFile(),setChange(true)}}>
                            <ImageBackground
                                source={userData.avatar ? { uri: userData.avatar } : require('../../../../assets/AnexanderTom.jpg')}
                                style={styles.avatar}
                                imageStyle={{ borderRadius: 75 }}
                            >

                                <LinearGradient
                                    colors={['#fff', '#fff']}
                                    style={styles.avatarStory}>
                                    <Animated.View style={{ transform: [{ scale }] }}>
                                        <AntDesign name="camera" size={13} color="#C4C4C4" />
                                    </Animated.View>
                                </LinearGradient>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.infor}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <TextInput
                                style={styles.option}
                                onChangeText={(text) => {setName(text),setChange(true)}}
                                placeholder={userData.name} />
                            <Octicons name="pencil" size={18} color="black" style={{ right: 25 }} />
                        </View>

                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <TextInput
                                style={styles.option}
                                placeholder={userData.email}
                                editable={false} />
                            <Octicons name="pencil" size={18} color="black" style={{ right: 25 }} />
                        </View>


                        <RadioForm
                            formHorizontal={true} // Đảo ngang Radiobox
                            animation={true}
                            style={{ ...styles.radioFormContainer }}
                        >
                            {options.map((option, i) => (
                                <RadioButton labelHorizontal={true} key={i} style={styles.radioButton}>
                                    <RadioButtonInput
                                        obj={option}
                                        index={i}
                                        isSelected={gender === option.value}
                                        onPress={(value) => {
                                            setGender(value);
                                        }}

                                        borderWidth={1}
                                        buttonSize={15}

                                    />

                                    <RadioButtonLabel
                                        obj={option}
                                        index={i}
                                        labelHorizontal={true}
                                        onPress={(value) => {
                                            setGender(value);
                                        }}
                                        labelStyle={{ fontSize: 14 }}
                                    />
                                </RadioButton>
                            ))}
                        </RadioForm>
                    </View>
                </View>
                {change?
                <TouchableOpacity style={styles.uploadStatus} onPress={async () => {
                    await handleChange(avatar);
                }}>
                    <Text style={{ fontSize: 18, fontWeight: "600", color: "white" }}>
                        Lưu
                    </Text>
                </TouchableOpacity>
                :null}
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
        backgroundImage: 'linear-gradient(90deg, #006AF5 30%, #5ac8fa 100%)',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        height: '8%',
        width: '100%'
    },

    head: {
        width: "30%",
        height: "100%",
    },

    infor: {
        width: "70%",
        height: "100%"
    },

    name: {
        color: 'white',
        marginLeft: 20,
        fontSize: 18,
        fontWeight: "400"
    },

    option: {
        fontSize: 14,
        fontWeight: "400",
        marginLeft: 10,
        padding: 13,
        borderBottomWidth: 1,
        borderBottomColor: "#rgba(0, 0, 0, 0.1)",
        width: "100%"
    },

    avatar: {
        width: 100,
        height: 100,
        marginLeft: 10
    },

    radioFormContainer: {
        fontSize: 18,
        fontWeight: "400",
        padding: 13,
    },
    radioButton: {
        marginRight: 50
    },

    uploadStatus: {
        width: "90%",
        height: 40,
        backgroundColor: '#006AF5',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
        marginLeft: 20
    },

    avatarStory: {
        width: 40,
        height: 40,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: "#C4C4C4",
        top: 60,
        left: 60
    }

});