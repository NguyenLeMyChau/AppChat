import { useContext, useEffect, useState } from "react";
import { Button, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign, FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons } from "@expo/vector-icons";
import axios from "axios";
import Modal from 'react-native-modal';
import Header from "../../Head/Header";
import { io } from "socket.io-client";
import { Checkbox } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
export default function MenuChat({ navigation }) {
  const [userData, setUserData] = useState({});
  const [listChat, setListChat] = useState([]);
  const [listFriend, setListFriend] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
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
    const newSocket = io('https://backend-chatapp-rdj6.onrender.com');
    newSocket.on('connect', () => {
        console.log('Connected to Socket.IO server');
    });
    newSocket.on('sendDataServer', () => {
        getData();

    });
    newSocket.on('addGroup', () => {
      getData();

  });
    newSocket.on('message_deleted', () => {
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
        `https://backend-chatapp-rdj6.onrender.com/group/getGroupList/${userData._id}`
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
        `https://backend-chatapp-rdj6.onrender.com/group/getGroupList/${userData._id}`
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
    //     `https://backend-chatapp-rdj6.onrender.com/group/newGroups`,
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
        `https://backend-chatapp-rdj6.onrender.com/group/newGroups`, {
        name: nameGroup, creatorId: userData._id, avatar: imageGroup, members: selectedId
      }
      );
      const db = await response.data;
      console.log(db);
      alert('Tạo nhóm thành công')
      setModalForward(false);
      getData();
      setIsSelected([]);
      setNameGroup("");
      socket.emit('addGroup',db)
    } catch (error) {
      console.error('Error fetching data:', error);
      if (error.response) {
        alert(error.response.data.message);
        setIsSelected([])
        setNameGroup("");
      } else {
        console.log(error.message);
      }
    }
  };


  const openModal = () => {
    setModalVisible(true);
  };

  async function selectFile() {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      // Gọi hàm handleUpImage sau khi chọn tệp
      const imageUrl = await handleUpImage(result.assets[0].uri);
      setImageGroup(imageUrl);
    }
  }

  async function handleUpImage(uri) {
    const formData = new FormData();
    let file = {
      uri: uri,
      name: 'image.jpg',
      type: 'image/jpeg'
    };
    formData.append("avatar", file);
    if (file !== null) {
      const responseAvatar = await axios.post(
        `https://backend-chatapp-rdj6.onrender.com/user/uploadAvatarS3/${userData._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const image = responseAvatar.data.avatar;
      return image;
    }
  }

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
                borderWidth: 1,
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
                onPress={() => {setIsSelected([]),setNameGroup(""),setModalForward(true)}}
              >
                <MaterialIcons
                  style={{ width: "20%" }}
                  name="group-add"
                  size={20}
                  color="gray"
                  onPress={() => {setIsSelected([]),setNameGroup(""),setModalForward(true)}}
                />
                <Text onPress={() => {setIsSelected([]),setNameGroup(""),setModalForward(true)}}>Tạo nhóm</Text>
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
      <FlatList
  style={styles.items} // Thêm style backgroundColor vào FlatList
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
            : {uri: "https://inkythuatso.com/uploads/thumbnails/800/2023/03/6-anh-dai-dien-trang-inkythuatso-03-15-26-36.jpg?gidzl=QL-ECEnPjmnbHeyrw4A_3s16W3Bo4xu5BHU2CwWUl0Wd6T4mhH2-N24LZs2h7RDU94-ADcEyCGaEvr-_3W"}
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
                  source={imageGroup ? { uri: imageGroup } : {uri : "https://inkythuatso.com/uploads/thumbnails/800/2023/03/6-anh-dai-dien-trang-inkythuatso-03-15-26-36.jpg?gidzl=QL-ECEnPjmnbHeyrw4A_3s16W3Bo4xu5BHU2CwWUl0Wd6T4mhH2-N24LZs2h7RDU94-ADcEyCGaEvr-_3W"}}
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
                    <Checkbox
                      status={isSelected.includes(item._id) ? 'checked' : 'unchecked'}
                      onPress={() => toggleCheckbox(item._id)}
                    />
                  </View>
                )
              })}
               </ScrollView>
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "center", padding: 10, backgroundColor: "#006AF5" }}
                onPress={() => {
                  handleCreateGroup()
                }}
              >
                <Text style={{ fontSize: 18, color: "white" }}>Tạo nhóm</Text>
              </TouchableOpacity>
           
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
    paddingTop:35
  },
  header: {
    flexDirection: "row",
    alignItems: 'center',
    width: "100%"
  },
  items: {
    backgroundColor: "white" ,
    width: "100%",
    overflow: "hidden",

  

  },
  item: {
    height: 70,
    width: '100%',
    flexDirection: 'row',
    padding: 15,
  },
  image: {
    borderRadius: 25,
    borderWidth: 1,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  name: {
    marginLeft: 10,
    color: 'black',
    width: 150,
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
  modalContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "70%",
    padding: 10,
    marginTop: 100
  },
  modalContent: {
    backgroundColor: "white",
    maxHeight: "70%",
    width: "100%",
    position: 'absolute'
  },
  headerModal: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    width: "100%",
    height: 90,
    borderBottomWidth: 1
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
    borderBottomColor: "#0000001A",
    width: "100%"
  },
  groupName: {
    flexDirection: "row",
    alignItems: "center"
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    padding: 10
  },
  friendImage: {
    width: 50,
    height: 50,
    borderRadius: 50
  },
  friendName: {
    fontSize: 16,
    marginLeft: 10
  },
  createGroupButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#006AF5"
  },
  createGroupText: {
    fontSize: 18,
    color: "white"
  }
});