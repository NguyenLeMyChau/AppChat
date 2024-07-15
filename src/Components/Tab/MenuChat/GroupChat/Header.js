import { StyleSheet, View, TouchableOpacity, TextInput, Alert, Pressable, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { SimpleLineIcons, Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-native-modal';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Header() {
    const [listFriend, setListFriend] = useState([]);
    const [listFriendRequest, setListFriendRequest] = useState([]);

    const [userData, setUserData] = useState({});
    const [userDataFind, setUserDataFind] = useState({});
    const [email, setEmail] = useState('');
    var [boolModal, setBoolModal] = useState(false);

    async function getData() {
        const foundUser = await AsyncStorage.getItem('foundUser');
        const userData = JSON.parse(foundUser);
        setUserData(userData);
        return userData;
    }

    useEffect(() => {
        async function fetchData() {
            const userData = await getData();
            await getFriendList(userData._id);
            await getFriendRequestsSentToUser(userData._id);
        }
        fetchData();

    }, []);


    const findUserByEmail = async () => {
        try {
            const response = await axios.get(`https://backend-chatapp-rdj6.onrender.com/user/findUserByEmail/${email}`);
            const { data } = response;

            Alert.alert(data.user);
            console.log(data.user);
            setUserDataFind(data.user);
            setBoolModal(true);

        } catch (error) {
            console.log(error);
            setBoolModal(false);
            if (error.response) {
                alert(error.response.data.message);
            } else {
                console.log(error.message);
            }
        }

    }

    const sendFriendRequest = async () => {
        try {
            const response = await axios.post(`https://backend-chatapp-rdj6.onrender.com/user/sendFriendRequest`, { senderId: userData._id, receiverId: userDataFind._id });
            const { data } = response;

            console.log(data.user);
            alert(data.message);
        }
        catch (error) {
            console.log(error);
            if (error.response) {
                alert(error.response.data.error);
            } else {
                console.log(error.message);
            }
        }

    }

    const getFriendList = async (userId) => {
        console.log(userId)

        const response = await axios.get(`https://backend-chatapp-rdj6.onrender.com/user/getFriendList/${userId}`);
        const { data } = response;

        if (data.success) {
            Alert.alert(data.friendList);
            console.log(data.friendList);
            setListFriend(data.friendList);
        } else {
            Alert.alert(data.message);
        }

    }

    const getFriendRequestsSentToUser = async (userId) => {
        console.log(userId)

        const response = await axios.get(`https://backend-chatapp-rdj6.onrender.com/user/getFriendRequestsSentToUser/${userId}`);
        const { data } = response;

        console.log("Contact:" + data.friendRequestsSent)

        if (data.success) {
            Alert.alert(data.friendRequestsSent);
            setListFriendRequest(data.friendRequestsSent);
        } else {
            Alert.alert(data.message);
        }

    };

    const isUserInFriendList = listFriend.some(friend => friend._id === userDataFind._id);
    const isUserInFriendRequest = listFriendRequest.some(friend => friend._id === userDataFind._id);


    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => {
                if (email == '') {
                    alert("Vui lòng nhập địa chỉ email cần tìm");
                } else if (email == userData.email) {
                    alert("Không tìm bản thân được");
                }
                else {
                    findUserByEmail()
                }

            }}>
                <SimpleLineIcons name="magnifier" size={20} color="white" />
            </TouchableOpacity>

            <TextInput
                style={{ height: 40, borderColor: 'blue', borderWidth: 0, paddingHorizontal: 10, width: '65%', color: 'white', marginLeft: 20, fontSize: 18 }}
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
                        source={userDataFind.avatar ? { uri: userDataFind.avatar } : require('../../../assets/AnexanderTom.jpg')}
                        style={styles.avatar}
                    />

                    <Text style={{ fontSize: 16 }}>{userDataFind.name}</Text>

                    {isUserInFriendList ? (
                        <Text style={{ fontSize: 14 }}>Đã kết bạn</Text>
                    ) : isUserInFriendRequest ? (
                        <Text style={{ fontSize: 14 }}>Đã có yêu cầu</Text>
                    ) : (
                        <Ionicons name="person-add" size={24} color="black"
                            onPress={async () => {
                                await sendFriendRequest();
                                setBoolModal(false);
                            }} />
                    )}
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