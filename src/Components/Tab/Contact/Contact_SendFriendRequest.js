import { useContext, useEffect, useState } from "react";
import { Alert, Image, TextInput, TouchableOpacity } from "react-native";
import { StyleSheet, View, Text } from "react-native";
import {
  MaterialCommunityIcons
} from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Contact_SendFriendRequest({ navigation }) {
  const [dataMain, setDataMain] = useState({})
  const [listUser, setListUser] = useState([]);
  const [refresh, setRefresh] = useState(false);

  async function getData() {
    const foundUser = await AsyncStorage.getItem('foundUser');
    const userData = JSON.parse(foundUser);
    setDataMain(userData);
    return userData;
  }

  useEffect(() => {
    async function fetchData() {
      const userData = await getData();
      await getFriendRequestsSentToUser(userData._id);
    }
    fetchData();

    // Sau đó gọi fetchData mỗi 2 giây
    const intervalId = setInterval(fetchData, 2000);

    // Hủy interval khi component unmount
    return () => clearInterval(intervalId);

  }, []);

  const getFriendRequestsSentToUser = async (userId) => {
    console.log(userId)

    const response = await axios.get(`http://localhost:4000/user/getFriendRequestsSentToUser/${userId}`);
    const { data } = response;

    console.log("Contact:" + data.friendRequestsSent)

    if (data.success) {
      Alert.alert(data.friendRequestsSent);
      setListUser(data.friendRequestsSent);
    } else {
      Alert.alert(data.message);
    }

  };


  const acceptFriendRequestAndSendMessage = async (friendId) => {
    console.log(dataMain._id)
    console.log(friendId)

    const response = await axios.post(`http://localhost:4000/user/acceptFriendRequestAndSendMessage`, { userId: dataMain._id, friendId: friendId });
    const { data } = response;

    if (data.success) {
      Alert.alert(data.message.text);
      console.log(data.message.text);
    } else {
      Alert.alert(data.message.text);
    }

    alert(data.message);

  }

  const rejectFriendRequest = async (friendId) => {
    console.log(dataMain._id)
    console.log(friendId)

    const response = await axios.post(`http://localhost:4000/user/rejectFriendRequest`, { userId: dataMain._id, friendId: friendId });
    const { data } = response;

    if (data.success) {
      Alert.alert(data.message.text);
      console.log(data.message.text);
    } else {
      Alert.alert(data.message.text);
    }

    alert(data.message);
  }


  return (
    <View style={styles.container}>
      {
         listUser && listUser.map((item) => {
          return (
            <View style={{ width: "80%", marginTop: 20, alignItems: "center", borderWidth: 1, borderColor: "#C4C4C4", paddingTop: 10 }} key={item._id}>
              <View style={{ width: "100%", alignItems: 'center', flexDirection: 'row', justifyContent: "space-around", }}>
                <Image
                  source={item.avatar ? { uri: item.avatar } : require('../../../../assets/AnexanderTom.jpg')}
                  style={styles.avatar}
                />
                <Text style={{ fontSize: 16 }}>{item.name}</Text>

                <MaterialCommunityIcons name="eyedropper-plus" size={24} color="black" />

              </View>


              <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: "center" }}>
                <TouchableOpacity style={styles.uploadStatus} onPress={() => acceptFriendRequestAndSendMessage(item._id)}>
                  <Text style={{ fontSize: 18, fontWeight: "600", color: "white" }}>
                    Đồng ý
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ ...styles.uploadStatus, backgroundColor: "red" }} onPress={() => rejectFriendRequest(item._id)}>
                  <Text style={{ fontSize: 18, fontWeight: "600", color: "white" }}>
                    Từ chối
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

          )
        })
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 75,
  },

  uploadStatus: {
    width: 85,
    height: 40,
    backgroundColor: '#006AF5',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 20
  },

});
