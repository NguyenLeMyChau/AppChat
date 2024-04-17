import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Octicons, SimpleLineIcons } from '@expo/vector-icons';
import axios from 'axios';

const Profile_group = ({ navigation, route }) => {
  const user = route.params.user;
  const group = route.params.group;
  const [member, setMember] = useState({});
  console.log(group)
  console.log(user)

  useEffect(() => {
    fetchGroupMembers();
  }, []);

  const fetchGroupMembers = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/group/getGroupMembers/${group._id}`);
      const data = response.data.groupMembers.find(item => item._id === user._id)
      setMember(data)
      console.log(data);
    } catch (error) {
      console.error('Error fetching group members:', error);
    }
  };

  const cancelgroupship = async (userId, groupId) => {
    try {
      const response = await axios.post('http://localhost:4000/user/cancelgroupship', {
        userId: userId,
        groupId: groupId,
      });
      console.log(response.data.message); // Log message trả về từ backend sau khi xóa kết bạn thành công
      alert(response.data.message)
      navigation.navigate("BottomTab");
      // Xử lý các hành động khác sau khi xóa kết bạn thành công (nếu cần)
    } catch (error) {
      console.error('Error cancelling groupship:', error);
      // Xử lý lỗi nếu có
    }
  };
  const handleCancelgroupship = () => {
    const userId = user._id; // Thay thế bằng ID của người dùng hiện tại
    const groupId = group._id; // Thay thế bằng ID của bạn bè cần xóa kết bạn
    cancelgroupship(userId, groupId);
  };



  const disbandGroup = async () => {
    try {
      const response = await axios.delete(`http://localhost:4000/group/deleteGroup/${group._id}`);
      console.log(response.data.message); // Log message trả về từ backend sau khi giải tán nhóm thành công
      // Hiển thị cảnh báo cho người dùng
      alert(response.data.message);
      // Điều hướng đến màn hình khác hoặc làm điều gì đó sau khi giải tán nhóm thành công
      navigation.navigate("MenuChat"); // Thay "AnotherScreen" bằng tên màn hình mong muốn
    } catch (error) {
      console.error('Error disbanning group:', error);
      // Hiển thị cảnh báo cho người dùng nếu có lỗi xảy ra
      alert("An error occurred while disbanning the group.");
    }
  };

  const renderButton = (text, onPress) => (
    <TouchableOpacity style={styles.functionItem} onPress={onPress}>
      <Text style={styles.functionText}>{text}</Text>
    </TouchableOpacity>
  );
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
          Tùy chọn
        </Text>
      </View>

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
