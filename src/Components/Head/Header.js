import { StyleSheet, View, TouchableOpacity, TextInput, Alert, Pressable, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { SimpleLineIcons, Ionicons } from "@expo/vector-icons";
import { useState } from 'react';
import axios from 'axios';
import Modal from 'react-native-modal';

export default function Header() {
    const [userData, setUserData] = useState({});
    const [email, setEmail] = useState('');
    var [boolModal, setBoolModal] = useState(false);

    const findUserByEmail = async () => {

        const response = await axios.get(`http://localhost:4000/user/findUserByEmail/${email}`);
        const { data } = response;

        if (data.success) {
            Alert.alert(data.user);
            console.log(data.user);
            setUserData(data.user);
        } else {
            Alert.alert(data.message);
        }

    }
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => {
                findUserByEmail(),
                    setBoolModal(true)
            }}>
                <SimpleLineIcons name="magnifier" size={20} color="white" />
            </TouchableOpacity>

            <TextInput
                style={{ height: 40, borderColor: 'blue', borderWidth: '0', paddingHorizontal: 10, width: '65%', color: 'white', marginLeft: 20, fontSize: 18 }}
                placeholder="Tìm kiếm"
                onChangeText={(text) => setEmail(text)}
            />

            <Modal
                animationType="fade"
                transparent={true}
                visible={boolModal}
                onBackdropPress={() => setBoolModal(false)}
            >

                <View style={{ width: '100%', height: 80, backgroundColor: '#C4C4C4', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around', top: -200 }}>
                    <Image
                        source={userData.avatar ? { uri: userData.avatar } : require('../../../assets/AnexanderTom.jpg')}
                        style={styles.avatar}
                    />

                    <Text style={{ fontSize: 16 }}>{userData.name}</Text>
                    <Ionicons name="person-add" size={24} color="black" />
                </View>


            </Modal>
        </View>

    );
}

const styles = StyleSheet.create({
    header: {
        backgroundImage: 'linear-gradient(90deg, #006AF5 30%, #5ac8fa 100%)',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        height: '100%',
        width: '100%'
    },

    avatar: {
        width: 60,
        height: 60,
        borderRadius: 75
        
    },
});
