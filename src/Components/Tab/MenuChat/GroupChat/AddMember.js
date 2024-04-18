import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, CheckBox, Alert } from 'react-native';
import axios from 'axios';
import { Octicons, AntDesign } from '@expo/vector-icons';
import { Image } from 'react-native';

const AddMembersScreen = ({ navigation, route }) => {
  const { user, group } = route.params;
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    fetchFriends();
  }, []);

  const fetchFriends = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/group/getNonGroupFriends/${user._id}/${group._id}`);
      setFriends(response.data.friendList);
    } catch (error) {
      console.error('Error fetching friends:', error);
    }
  };

  const [selectedMembers, setSelectedMembers] = useState([]);

  const toggleCheckbox = (friendId) => {
    setSelectedMembers((prevSelected) => {
      if (prevSelected.includes(friendId)) {
        return prevSelected.filter((id) => id !== friendId);
      } else {
        return [...prevSelected, friendId];
      }
    });
  };

  const renderFriends = () => {
    return friends.map((friend) => (
      <View key={friend._id} style={styles.friendItem}>
        <Image
          source={friend.avatar ? { uri: friend.avatar } : require("../../../../../assets/AnexanderTom.jpg")}
          style={{ width: 50, height: 50, borderRadius: 50 }}
        />
        <Text style={{ fontSize: 16 }}>{friend.name}</Text>
        <CheckBox
          value={selectedMembers.includes(friend._id)}
          onValueChange={() => toggleCheckbox(friend._id)}
        />
      </View>
    ));
  };

  const handleAddMembers = async () => {
    try {
      console.log('Selected members:', selectedMembers);
      const response = await axios.put(`http://localhost:4000/group/addMemberToGroup/${group._id}`, {
        memberIds: selectedMembers,
      });
      const data = response;
      alert(data.data.message);
    } catch (error) {
      console.error('Error handleAddMembers:', error);
      alert("Error adding members to group");
    }

    navigation.goBack();

  };

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
          Thêm vào nhóm
        </Text>
      </View>
      <ScrollView>{renderFriends()}</ScrollView>
      {selectedMembers.length ? <TouchableOpacity style={styles.addButton} onPress={handleAddMembers}>
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
  },
  friendItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
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
    bottom: 20,
    right: 20
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default AddMembersScreen;
