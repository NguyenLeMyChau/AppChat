import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Octicons, SimpleLineIcons } from '@expo/vector-icons';
import axios from 'axios';
import { io } from 'socket.io-client';
import { LinearGradient } from 'expo-linear-gradient';

const Profile_group = ({ navigation, route }) => {
  const user = route.params.user;
  const group = route.params.group;
  const [member, setMember] = useState({});
  const [socket, setSocket] = useState(null);
  console.log(group)
  console.log(user)

  useEffect(() => {
    fetchGroupMembers();
    const newSocket = io('https://backend-chatapp-rdj6.onrender.com');
    newSocket.on('connect', () => {
        console.log('Connected to Socket.IO server');
    });
    newSocket.on('sendDataServer', (message) => {
      fetchGroupMembers();
    });
    setSocket(newSocket); // Lưu socket vào state
    return () => {
        newSocket.disconnect();
    };
  }, []);

  const fetchGroupMembers = async () => {
    try {
      const response = await axios.get(`https://backend-chatapp-rdj6.onrender.com/group/getGroupMembers/${group._id}`);
      const data = response.data.groupMembers.find(item => item._id === user._id)
      setMember(data)
      console.log(data);
    } catch (error) {
      console.error('Error fetching group members:', error);
    }
  };


  const disbandGroup = async () => {
    try {
      const response = await axios.delete(`https://backend-chatapp-rdj6.onrender.com/group/deleteGroup/${group._id}`);
      console.log(response.data.message); // Log message trả về từ backend sau khi giải tán nhóm thành công
      // Hiển thị cảnh báo cho người dùng
      alert(response.data.message);
      // Điều hướng đến màn hình khác hoặc làm điều gì đó sau khi giải tán nhóm thành công
      socket.emit('sendDataClient',response.data.message);
      navigation.navigate("BottomTab"); // Thay "AnotherScreen" bằng tên màn hình mong muốn
    } catch (error) {
      console.error('Error disbanning group:', error);
      // Hiển thị cảnh báo cho người dùng nếu có lỗi xảy ra
      alert("An error occurred while disbanning the group.");
    }
  };

  const leaveGroup = async () => {
    try {
      const response = await axios.put(`https://backend-chatapp-rdj6.onrender.com/group/leaveGroup/${group._id}/${user._id}`);
      console.log(response.data.message); // Log message trả về từ backend sau khi giải tán nhóm thành công
      // Hiển thị cảnh báo cho người dùng
      alert(response.data.message);
      socket.emit('sendDataClient',response.data.message);
      //Điều hướng đến màn hình khác hoặc làm điều gì đó sau khi giải tán nhóm thành công
      navigation.navigate("MenuChat"); // Thay "AnotherScreen" bằng tên màn hình mong muốn
    } catch (error) {
      console.error('Error leave group:', error);
      if (error.response) {
        alert(error.response.data.message);
        navigation.navigate("SetLeader", { user: user, group: group })
      } else {
        console.log(error.message);
      }
    }
  };


  const renderButton = (text, onPress) => (
    <TouchableOpacity style={styles.functionItem} onPress={onPress}>
      <Text style={styles.functionText}>{text}</Text>
    </TouchableOpacity>
  );
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
            group.avatar
              ? { uri: group.avatar }
              : require("../../../../../assets/AnexanderTom.jpg")
          }
          style={styles.avatar}
        />
        <Text style={styles.username}>{group.name}</Text>
      </View>
      <View style={styles.functionList}>
        {/* Danh sách chức năng */}
        {renderButton("Xem thành viên", () =>
          navigation.navigate("Member", { user: user, group: group })
        )}
        {renderButton("Thêm thành viên", () =>
          navigation.navigate("AddMember", { user: user, group: group })
        )}
        {renderButton("Rời nhóm", () =>
          leaveGroup()
        )}

        {member ? member.role === "leader" && (
          <>
            {renderButton("Xóa thành viên", () =>
              navigation.navigate("DeleteMember", { user: user, group: group })
            )}
            {renderButton("Gán nhóm phó", () =>
              navigation.navigate("SetCoLeader", { user: user, group: group })
            )}
            {renderButton("Nhường nhóm trưởng", () =>
              navigation.navigate("SetLeader", { user: user, group: group })
            )}
          </>
        ) : null}
        {member ? member.role === "coLeader" && (
          <>{renderButton("Xóa thành viên", () =>
            navigation.navigate("DeleteMember", { user: user, group: group })
          )}</>
        ) : null}

      </View>

      {/* Hiển thị nút giải tán nhóm cho nhóm trưởng */}
      {member ? member.role === "leader" && renderButton("Giải tán nhóm", disbandGroup) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
   
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 50,
    padding: 10
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  functionList: {
    padding: 10,
    justifyContent: 'flex-start'
  },
  functionItem: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray'
  },
  functionText: {
    marginLeft: 10,
    fontSize: 16
  },
});

export default Profile_group;
