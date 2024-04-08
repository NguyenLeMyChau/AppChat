
import { AntDesign, MaterialCommunityIcons, MaterialIcons, Ionicons, SimpleLineIcons, Entypo } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useRef } from 'react';
import { useState } from 'react';
import { StyleSheet, View, Button, Text, TextInput } from 'react-native';
import axios from 'axios';

export default function Chat({ navigation }) {
    const [mess, setMess] = useState('')

    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: "row", alignItems: 'center', width: "100%", backgroundImage: 'linear-gradient(90deg, #006AF5 30%, #5ac8fa 100%)',
                paddingHorizontal: 16,
                paddingVertical: 8,
            }}>
                <MaterialIcons
                    onPress={() => navigation.goBack()}
                    name="keyboard-backspace"
                    size={20}
                    color="white"
                />

                <Text style={{ fontSize: 20, color: 'white', padding: 10, marginLeft: 10 }}>
                    Name
                </Text>

                <Ionicons
                    name="call-outline"
                    size={24}
                    color="white"
                    style={{ marginLeft: 130 }}
                />

                <AntDesign
                    name="videocamera"
                    size={24}
                    color="white"
                    style={{ marginLeft: 30 }}
                />

                <Ionicons
                    name="menu-outline"
                    size={30}
                    color="white"
                    style={{ marginLeft: 25 }}
                />
            </View>

            <View style={styles.chat}>

                <MaterialCommunityIcons
                    name="sticker-emoji"
                    size={30}
                    color="black" style={{ padding: 5 }}
                />

                {mess === '' ? (
                    <>
                        <TextInput
                            placeholder="Tin nhắn"
                            style={styles.txtSDT}
                            value={mess}
                            onChangeText={(text) => setMess(text)}
                            keyboardType="phone-pad"
                        />

                        <Entypo
                            name="dots-three-horizontal"
                            size={24}
                            color="black"
                            style={{ marginLeft: 5 }}
                        />

                        <SimpleLineIcons
                            name="microphone"
                            size={24}
                            color="black"
                            style={{ marginLeft: 20 }}
                        />

                        <AntDesign
                            name="picture"
                            size={30}
                            color="black"
                            style={{ marginLeft: 20 }}
                        />
                    </>
                ) : (
                    <>
                        <TextInput
                            placeholder="Tin nhắn"
                            style={styles.txtSDTFocus}
                            value={mess}
                            onChangeText={(text) => setMess(text)}
                            keyboardType="phone-pad"
                        />

                        <MaterialCommunityIcons
                            name="send"
                            size={30}
                            color="#006AF5" style={{ marginLeft: 20 }}
                        />

                    </>

                )}
            </View>

        </View>



    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E9EBED',
    },

    chat: {
        flexDirection: 'row',
        alignItems: 'center',
        width: "100%",
        padding: 10,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
    },

    txtSDT: {
        fontSize: 16,
        color: 'black',
        padding: 10,
    },

    txtSDTFocus: {
        fontSize: 16,
        color: 'black',
        padding: 10,
        width: 270
    },

    chatText: {
        backgroundColor: "yellow",
        flexDirection: 'row',
        alignItems: 'center'
    }

});
