import { useContext, useEffect, useState } from "react";
import { Button, FlatList, Image, CheckBox, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign, FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons } from "@expo/vector-icons";
import { AuthContext } from "../../Login/AuthProvider";
import axios from "axios";
import Modal from 'react-native-modal';
import Header from "../../Head/Header";
import { io } from "socket.io-client";


export default function MenuChat({ navigation }) {
  const [userData, setUserData] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [listChat, setListChat] = useState([]);
  const [listFriend, setListFriend] = useState([]);
  const [listUsers, setListUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [socket, setSocket] = useState(null);

  const [nameGroup, setNameGroup] = useState("");

  const [imageGroup, setImageGroup] = useState(null);

  const [modalForward, setModalForward] = useState(false);

  const [isSelected, setIsSelected] = useState([]);

  async function getData() {
    try {
      const foundUser = await AsyncStorage.getItem('foundUser');
      if (foundUser !== null) {
        const user = JSON.parse(foundUser);
        setUserData(user);
        fetchConversations(user); // Gọi hàm fetchConversations sau khi lấy dữ liệu thành công
        fetchFriend(user)
      }
    } catch (error) {
      console.error('Error getting data from AsyncStorage:', error);
    }
  }

  useEffect(() => {
    const newSocket = io('http://localhost:4000');
    newSocket.on('connect', () => {
        console.log('Connected to Socket.IO server');
    });
    newSocket.on('sendDataServer', (message) => {
        getData();

    });
    newSocket.on('addGroup', (message) => {
      getData();

  });
    newSocket.on('message_deleted', messageId => {
        getData()
    });
    setSocket(newSocket); // Lưu socket vào state
    return () => {
        newSocket.disconnect();
    };
}, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData();
    });

    return unsubscribe;
  }, [navigation]);

  const fetchConversations = async (userData) => {
    try {
      if (!userData || !userData._id) {
        console.log("userData is not loaded yet");
        return;
      }
      console.log(userData._id);
      const response = await axios.get(
        `http://localhost:4000/group/getGroupList/${userData._id}`
      );
      const data = response.data; // Truy cập data từ response
      setListChat([...data.userData.friendList, ...data.userData.groupList]);
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error', 'An error occurred while fetching data');
    }
  };
  const fetchFriend = async (userData) => {
    try {
      if (!userData || !userData._id) {
        console.log("userData is not loaded yet");
        return;
      }
      console.log(userData._id);
      const response = await axios.get(
        `http://localhost:4000/group/getGroupList/${userData._id}`
      );
      const data = response.data; // Truy cập data từ response
      setListFriend(data.userData.friendList);
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error', 'An error occurred while fetching data');
    }
  };

  const handleSearch = async () => {
    // try {
    //   const response = await axios.get(
    //     `http://localhost:4000/group/newGroups`,
    //   );
    //   const db = await response.json();
    //   setSearchResults(db);
    // } catch (error) {
    //   console.error('Error fetching data:', error);
    //   alert('Error', 'An error occurred while fetching data');
    // }
  };

  const handleCreateGroup = async () => {
    try {
      var selectedId;
      console.log(isSelected)
      console.log(userData._id)
      setIsSelected(prevSelected => {
        const updatedSelection = [...prevSelected, userData._id];
        console.log(updatedSelection); // Đảm bảo isSelected đã được cập nhật
        selectedId = updatedSelection;
        return updatedSelection;
      });
      console.log(selectedId)
      const response = await axios.post(
        `http://localhost:4000/group/newGroups`, {
        name: nameGroup, creatorId: userData._id, avatar: imageGroup, members: selectedId
      }
      );
      const db = await response.data;
      console.log(db);
      alert('Tạo nhóm thành công')
      setModalForward(false);
      getData();
      setIsSelected([]);
      socket.emit('addGroup',db)
    } catch (error) {
      console.error('Error fetching data:', error);
      if (error.response) {
        alert(error.response.data.message);
      } else {
        console.log(error.message);
      }
    }
  };


  const openModal = () => {
    setModalVisible(true);
  };

  async function selectFile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = async e => {

      const file = e.target.files[0];

      console.log(file);
      console.log(file.name);

      // Gọi hàm handleUpImage sau khi chọn tệp
      const imageUrl = await handleUpImage(file);
      console.log(imageUrl);
      setImageGroup(imageUrl);
    }

    input.click();
  };

  async function handleUpImage(file) {
    const formData = new FormData();
    formData.append('avatar', file);

    if (file !== null) {
      const responseAvatar = await axios.post(`http://localhost:4000/user/uploadAvatarS3/${userData._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      const image = responseAvatar.data.avatar;
      console.log(image);
      return image;
    }
  };
  const toggleCheckbox = (friendId) => {
    setIsSelected((prevSelected) => {
      if (prevSelected.includes(friendId)) {
        return prevSelected.filter((id) => id !== friendId);
      } else {
        return [...prevSelected, friendId];
      }
    });
  };
  useEffect(() => {
    // Code bạn muốn chạy khi imageGroup thay đổi
  }, [imageGroup]);


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />
        <TouchableOpacity style={{ marginLeft: -90 }} onPress={handleSearch}>
          <MaterialCommunityIcons
            name="qrcode-scan"
            size={20}
            color="white"
          />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginLeft: 20 }} onPress={openModal}>
          <AntDesign name="plus" size={20} color="white" />
        </TouchableOpacity>
        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => setModalVisible(false)}
          >
            <View
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                backgroundColor: "white",
                padding: 10,
                width: "60%",
                borderRadius: 10,
                borderWidth: 0.1,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  paddingTop: 10,
                  paddingBottom: 10,
                }}
              >
                <Octicons
                  style={{ width: "20%" }}
                  name="person-add"
                  size={20}
                  color="gray"
                />
                <TouchableOpacity
                  onPress={() => navigation.navigate("AddFriend")}
                >
                  <Text>Thêm bạn</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  paddingTop: 10,
                  paddingBottom: 10,
                }}
                onPress={() => setModalForward(true)}
              >
                <MaterialIcons
                  style={{ width: "20%" }}
                  name="group-add"
                  size={20}
                  color="gray"
                  onPress={() => setModalForward(true)}
                />
                <Text onPress={() => setModalForward(true)}>Tạo nhóm</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  paddingTop: 10,
                  paddingBottom: 10,
                }}
              >
                <MaterialIcons
                  style={{ width: "20%" }}
                  name="cloud-queue"
                  size={20}
                  color="gray"
                />
                <Text>Cloud của tôi</Text>
              </View>
              <TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    paddingTop: 10,
                    paddingBottom: 10,
                  }}
                >
                  <Ionicons
                    style={{ width: "20%" }}
                    name="calendar-outline"
                    size={20}
                    color="gray"
                  />
                  <Text>Lịch Zalo</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    paddingTop: 10,
                    paddingBottom: 10,
                  }}
                >
                  <AntDesign
                    style={{ width: "20%" }}
                    name="videocamera"
                    size={20}
                    color="gray"
                  />
                  <Text>Tạo cuộc gọi nhóm</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    paddingTop: 10,
                    paddingBottom: 10,
                  }}
                >
                  <FontAwesome
                    style={{ width: "20%" }}
                    name="television"
                    size={20}
                    color="gray"
                  />
                  <Text>Thiết bị đăng nhập</Text>
                </View>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
      <ScrollView style={{ backgroundColor: "while", width: "100%" }}>
        <FlatList
          style={styles.items}
          data={listChat}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => (item.members && item.members.length) ?
                navigation.navigate("ChatGroup", { group: item }) : navigation.navigate("ChatScreen", { friend: item })
              }
            >
              <Image
                style={styles.image}
                source={
                  item.avatar
                    ? { uri: item.avatar }
                    : require("../../../../assets/AnexanderTom.jpg")
                }
              />

              <View style={{ width: "70%" }}>
                <Text style={styles.name} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.name} numberOfLines={1}>
                  Text chat
                </Text>
              </View>
              <View>
                <Text style={styles.time}>Time</Text>
                <Text style={styles.noti}>?</Text>
              </View>
            </TouchableOpacity>
          )}
          numColumns={1}
        />
      </ScrollView>

      <View style={{ alignItems: "center", justifyContent: "center", width: "70%", padding: 10, marginTop: 100 }}>
        <Modal
          visible={modalForward}
          animationType="fade"
          transparent={true}
          onBackdropPress={() => setModalForward(false)}
        >
          <View style={{
            backgroundColor: "white", maxHeight: "70%", width: "100%", position: 'absolute'
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, width: "100%", height: 90, borderBottomWidth: 1 }}>
              <TouchableOpacity onPress={() => { selectFile() }}>
                <ImageBackground
                  source={imageGroup ? { uri: imageGroup } : require('../../../../assets/AnexanderTom.jpg')}
                  style={styles.avatar}
                  imageStyle={{ borderRadius: 75 }}
                />
              </TouchableOpacity>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TextInput
                  style={styles.option}
                  onChangeText={(text) => { setNameGroup(text) }}
                  placeholder="Group name"
                />
              </View>
            </View>
            <ScrollView>
              {listFriend.map((item, index) => {
                return (

                  <View key={index} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between", padding: 10 }}>
                    <Image
                      source={item.avatar ? { uri: item.avatar } : require("../../../../assets/AnexanderTom.jpg")}
                      style={{ width: 50, height: 50, borderRadius: 50 }}
                    />

                    <Text style={{ fontSize: 16, marginLeft: 10 }}>{item.name}</Text>

                    <CheckBox

                      value={isSelected.includes(item._id)}
                      onValueChange={() => toggleCheckbox(item._id)}
                    />
                  </View>
                )
              })}
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "center", padding: 10, backgroundColor: "#006AF5" }}
                onPress={() => {
                  handleCreateGroup()
                }}
              >
                <Text style={{ fontSize: 18, color: "white" }}>Tạo nhóm</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </Modal>

      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  tittle: {
    fontSize: 20,
    color: 'white',
  },

  items: {

    marginTop: 5,
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 0,
  },
  item: {
    height: 70,
    width: '100%',
    flexDirection: 'row',
    padding: 15,

  },
  header_item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    borderRadius: 50,
    borderWidth: 1,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 'column'
  },
  name: {
    marginLeft: 10,
    height: 50,
    color: 'black',
    width: 150,
  },
  header: {
    flexDirection: "row", alignItems: 'center', width: "100%"
  },
  time: {
    color: 'black',
    fontSize: 12,

  },
  noti: {
    textAlign: 'center',
    fontSize: 10,
    color: 'white',
    borderWidth: 1,
    backgroundColor: 'black',
    borderRadius: 10,
    marginTop: 5,
  },
  avatar: {
    width: 70,
    height: 70,
    marginLeft: 10
  },
  option: {
    fontSize: 17,
    fontWeight: "400",
    marginLeft: 35,
    padding: 13,
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#rgba(0, 0, 0, 0.1)",
    width: "100%"
  },
})
