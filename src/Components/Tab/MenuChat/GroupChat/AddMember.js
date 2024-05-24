import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import axios from 'axios';
import { Octicons, AntDesign } from '@expo/vector-icons';
import { Image } from 'react-native';
import { io } from 'socket.io-client';
import { Checkbox } from "react-native-paper";
import { LinearGradient } from 'expo-linear-gradient';


const AddMembersScreen = ({ navigation, route }) => {
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
      const response = await axios.get(`https://backend-chatapp-rdj6.onrender.com/group/getNonGroupFriends/${user._id}/${group._id}`);
      setFriends(response.data.friendList);
      console.log('...............friends:', response.data.friendList)
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
          source={friend.avatar ? { uri: friend.avatar } : {uri: 'https://inkythuatso.com/uploads/thumbnails/800/2023/03/6-anh-dai-dien-trang-inkythuatso-03-15-26-36.jpg?gidzl=QL-ECEnPjmnbHeyrw4A_3s16W3Bo4xu5BHU2CwWUl0Wd6T4mhH2-N24LZs2h7RDU94-ADcEyCGaEvr-_3W'}}
          style={{ width: 50, height: 50, borderRadius: 50 }}
        />
        <Text style={{ fontSize: 16 }}>{friend.name}</Text>
        <Checkbox
          status={selectedMembers.includes(friend._id) ? 'checked' : 'unchecked'}
          onPress={() => toggleCheckbox(friend._id)}
        />
      </View>
    ));
  };

  const handleAddMembers = async () => {
    try {
      console.log('Selected members:', selectedMembers);
      const response = await axios.put(`https://backend-chatapp-rdj6.onrender.com/group/addMemberToGroup/${group._id}`, {
        memberIds: selectedMembers,
      });
      const data = response;
      alert(data.data.message);
      socket.emit('sendDataClient',response.data.message);
    } catch (error) {
      console.error('Error handleAddMembers:', error);
      alert("Error adding members to group");
    }

    navigation.goBack();

  };

  return (
    <View style={styles.container}>
     <LinearGradient
        colors={["#006AF5", "#5ac8fa"]}
        start={[0, 0.5]}
        end={[1, 0.5]}
        style={{
          backgroundColor: "blue",
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingVertical: 8,
          height: 50,
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
     </LinearGradient>
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
