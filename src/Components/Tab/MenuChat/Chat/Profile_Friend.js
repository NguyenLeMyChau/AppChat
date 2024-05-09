import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Octicons, SimpleLineIcons } from '@expo/vector-icons';
import axios from 'axios';
import { io } from 'socket.io-client';
import { LinearGradient } from 'expo-linear-gradient';

const UserProfileScreen = ({ navigation, route }) => {
    const user = route.params.user;
    const friend = route.params.friend;
    const [socket, setSocket] = useState(null);
  console.log(friend)
  console.log(user)
  useEffect(() => {
    const newSocket = io('https://backend-chatapp-rdj6.onrender.com');
    newSocket.on('connect', () => {
        console.log('Connected to Socket.IO server');
    });
    newSocket.on('sendDataServer', (message) => {
        getData();
    });
    setSocket(newSocket); // Lưu socket vào state
    return () => {
        newSocket.disconnect();
    };
}, []);
  // Hàm xử lý chức năng tạo nhóm với user
  const createGroupWithUser = () => {
    // Viết logic xử lý khi tạo nhóm với user
  };

  // Hàm xử lý chức năng thêm user vào nhóm
  const addUserToGroup = () => {
    // Viết logic xử lý khi thêm user vào nhóm
  };

  // Hàm xử lý chức năng xóa bạn bè
  const cancelFriendship = async (userId, friendId) => {
    try {
        const response = await axios.post('https://backend-chatapp-rdj6.onrender.com/user/cancelFriendship', {
            userId:userId,
            friendId:friendId,
        });
      console.log(response.data.message); // Log message trả về từ backend sau khi xóa kết bạn thành công
      alert(response.data.message)
      socket.emit('sendDataClient',response.data.message)
      navigation.navigate("BottomTab");
      // Xử lý các hành động khác sau khi xóa kết bạn thành công (nếu cần)
    } catch (error) {
      console.error('Error cancelling friendship:', error);
      // Xử lý lỗi nếu có
    }
  };
  const handleCancelFriendship = () => {
    const userId = user._id; // Thay thế bằng ID của người dùng hiện tại
    const friendId = friend._id; // Thay thế bằng ID của bạn bè cần xóa kết bạn
  
    cancelFriendship(userId, friendId);
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
          Tùy chọn
        </Text>
      </LinearGradient>

      <View style={styles.userInfo}>
        <Image
          source={
            friend.avatar
              ? { uri: friend.avatar }
              : require("../../../../../assets/AnexanderTom.jpg")
          }
          style={styles.avatar}
        />
        <Text style={styles.username}>{friend.name}</Text>
      </View>

      {/* Danh sách chức năng */}
      <View style={styles.functionList}>
        {/* Tạo nhóm với user */}
        <TouchableOpacity
          style={styles.functionItem}
          onPress={createGroupWithUser}
        >
          <SimpleLineIcons name="people" size={20} color="black" />
          <Text style={styles.functionText}>Tạo nhóm với {friend.name}</Text>
        </TouchableOpacity>

        {/* Thêm user vào nhóm */}
        <TouchableOpacity style={styles.functionItem} onPress={addUserToGroup}>
          <SimpleLineIcons name="user-follow" size={20} color="black" />
          <Text style={styles.functionText}>Thêm {friend.name} vào nhóm</Text>
        </TouchableOpacity>

        {/* Xóa bạn bè */}
        <TouchableOpacity style={[styles.functionItem]} onPress={()=>handleCancelFriendship()}>
          <SimpleLineIcons name="user-unfollow" size={20} color="red" />
          <Text style={[styles.functionText, { color: "red" }]}>
            Xóa bạn bè
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 35
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 50,
    padding:10
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  functionList: {
    padding:10,
    justifyContent:'flex-start'
  },
  functionItem: {
    padding:10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth:1,
    borderBottomColor:'gray'
  },
  functionText: {
    marginLeft: 10,
    fontSize: 16
  },
});

export default UserProfileScreen;
