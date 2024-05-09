import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import axios from 'axios';
import { Octicons, AntDesign } from '@expo/vector-icons';
import { RadioButton } from 'react-native-paper';
import { io } from 'socket.io-client';
import CheckBox from '@react-native-community/checkbox';

const SetCoLeader = ({ navigation, route }) => {
    const { user, group } = route.params;
    const [friends, setFriends] = useState([]);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        fetchFriends();
            const newSocket = io('https://backend-chatapp-rdj6.onrender.com');
            newSocket.on('connect', () => {
                console.log('Connected to Socket.IO server');
            });
            newSocket.on('sendDataServer', (message) => {
                fetchFriends();
    
            });
            setSocket(newSocket); // Lưu socket vào state
            return () => {
                newSocket.disconnect();
            };
    }, []);

    const fetchFriends = async () => {
        try {
            const response = await axios.get(`https://backend-chatapp-rdj6.onrender.com/group/getGroupMembers/${group._id}`);
            const groupMembers = response.data.groupMembers;
            const filteredMembers = groupMembers.filter(member => member.role !== 'leader' && member.role !== 'coLeader');
            setFriends(filteredMembers);
        } catch (error) {
            console.error('Error fetching friends:', error);
        }
    };

    const [selectedId, setSelectedId] = useState(null);

    const renderFriends = () => {
        return (
            <RadioButton.Group
                onValueChange={newValue => setSelectedId(newValue)}
                value={selectedId}
            >
                {friends.map((friend, index) => (
                    <View key={friend._id} style={styles.friendItem}>
                        <Image
                            source={friend.avatar ? { uri: friend.avatar } : require("../../../../../assets/AnexanderTom.jpg")}
                            style={{ width: 50, height: 50, borderRadius: 50 }}
                        />
                        <Text style={{ fontSize: 16 }}>{friend.name}</Text>
                        <RadioButton value={friend._id} />
                    </View>
                ))}
            </RadioButton.Group>
        );
    };

    async function setCoLeader(memberId) {
        try {
            const response = await axios.put(`https://backend-chatapp-rdj6.onrender.com/group/setCoLeader/${group._id}/${memberId}`);
            socket.emit('sendDataClient',response.data.message);
            alert(response.data.message);
        } catch (error) {
            console.error("Error deleting message:", error);
            if (error.response) {
                alert(error.response.data.message);
            } else {
                console.log(error.message);
            }
        }
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <View
                style={{
                    backgroundImage: "linear-gradient(90deg, #006AF5 30%, #5ac8fa 100%)",
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    height: "8%",
                    width: "100%",
                }}
            >
                <TouchableOpacity>
                    <Octicons
                        name="arrow-left"
                        size={25}
                        color="white"
                        onPress={() => navigation.goBack()}
                    />
                </TouchableOpacity>

                <Text
                    style={{
                        color: "white",
                        marginLeft: 20,
                        fontSize: 18,
                        fontWeight: "400",
                    }}
                >
                    Phân quyền nhóm phó
                </Text>
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
                {renderFriends()}
            </ScrollView>
            {selectedId ? <TouchableOpacity style={styles.addButton} onPress={() => {
                console.log(selectedId);
                setCoLeader(selectedId);
            }}>
                <AntDesign
                    name="caretright"
                    size={25}
                    color="white"
                />
            </TouchableOpacity> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    friendItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
        padding: 20
    },
    addButton: {
        backgroundColor: '#006AF5',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 50,
        marginTop: 20,
        width: 50,
        position: 'absolute',
        bottom: 40,
        right: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default SetCoLeader;
