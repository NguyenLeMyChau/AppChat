import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, CheckBox, Alert, Image } from 'react-native';
import axios from 'axios';
import { Octicons, AntDesign } from '@expo/vector-icons';

const DeleteMemberScreen = ({ navigation, route }) => {
    const { user, group } = route.params;
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        fetchFriends();
    }, []);

    const fetchFriends = async () => {
        try {
            console.log(user)
            const response = await axios.get(`http://localhost:4000/group/getGroupMembers/${group._id}`);
            const groupMembers = response.data.groupMembers;
            
            //Lọc ra member có memberId trùng với userId của user hiện tại
            const userMember = groupMembers.find(member => user._id === member._id);

            let filteredMembers;
            if (userMember.role === 'leader') {
                filteredMembers = groupMembers.filter(member => member.role !== 'leader');
            } else if (userMember.role === 'coLeader') {
                filteredMembers = groupMembers.filter(member => member.role !== 'leader' && member.role !== 'coLeader');
            } else {
                filteredMembers = groupMembers;
            } setFriends(filteredMembers);
        } catch (error) {
            console.error('Error fetching friends:', error);
        }
    };

    const [isSelected, setIsSelected] = useState(new Array(friends.length).fill(false));

    const setSelectionAt = (index, value) => {
        setIsSelected(prevState => {
            const newState = [...prevState];
            newState[index] = value;
            return newState;
        });
    };

    useEffect(() => {
        setIsSelected(new Array(friends.length).fill(false));
    }, [friends]);

    const getSelectedItems = () => {
        return friends.filter((item, index) => isSelected[index]);
    };


    const renderFriends = () => {
        return friends.map((friend, index) => (
            <View key={friend._id} style={styles.friendItem}>
                <Image
                    source={friend.avatar ? { uri: friend.avatar } : require("../../../../../assets/AnexanderTom.jpg")}
                    style={{ width: 50, height: 50, borderRadius: 50 }}
                />
                <Text style={{ fontSize: 16 }}>{friend.name}</Text>
                <CheckBox
                    value={isSelected[index] || false}
                    onValueChange={(value) => setSelectionAt(index, value)}
                />
            </View>
        ));
    };

    async function removeMembersFromGroup(memberIds) {
        try {
            const response = await axios.put(`http://localhost:4000/group/removeMembersFromGroup/${group._id}`, { memberIds: memberIds });
            alert(response.data.message);
        } catch (error) {
            console.error("Error deleting message:", error);
            alert("An error occurred while deleting the message.");
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
                    Xoá thành viên
                </Text>
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
                {renderFriends()}
            </ScrollView>
            {isSelected.length ? <TouchableOpacity style={styles.addButton} onPress={() => {
                const selectedItems = getSelectedItems();
                const selectedIds = selectedItems.map(item => item._id);
                console.log(selectedItems);
                console.log(selectedIds);
                removeMembersFromGroup(selectedIds);
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

export default DeleteMemberScreen;
