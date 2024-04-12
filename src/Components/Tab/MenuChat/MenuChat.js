import { useContext, useEffect, useState } from "react";
import { Button, FlatList, Image, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign, FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons } from "@expo/vector-icons";
import { AuthContext } from "../../Login/AuthProvider";
import axios  from "axios";


export default function MenuChat({navigation}){
  const [userData, setUserData] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [listChat,setListChat] = useState([]);
  const [listUsers,setListUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });

  async function getData() {
    try {
        const foundUser = await AsyncStorage.getItem('foundUser');
        if (foundUser !== null) {
            const user = JSON.parse(foundUser);
            setUserData(user);
            fetchConversations(user); // Gọi hàm fetchConversations sau khi lấy dữ liệu thành công
        }
    } catch (error) {
        console.error('Error getting data from AsyncStorage:', error);
    }
}


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
          `http://localhost:4000/user/getFriendList/${userData._id}`
      );
      const data = response.data; // Truy cập data từ response
      setListChat(data.friendList);
      console.log(data);
  } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error', 'An error occurred while fetching data');
  }
};


  const handleSearch = async () => {
    try {
      const response = await fetch('https://65530f285449cfda0f2e0c90.mockapi.io/api/v1/users');
      const db = await response.json();
      setSearchResults(db);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error', 'An error occurred while fetching data');
    }
  };

  const openModal = () => {
    setModalVisible(true);   
  };
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.header_item}
            onPress={() =>
              navigation.navigate("NavigationContactFriendRequest")
            }
          >
            <SimpleLineIcons name="magnifier" size={20} color="white" />
          </TouchableOpacity>
          <TextInput
            style={{
              height: 40,
              borderColor: "blue",
              borderWidth: "0",
              paddingHorizontal: 10,
              width: "70%",
              color: "white",
            }}
            onChangeText={(query) => setSearchQuery(query)}
            value={searchQuery}
            placeholder="Tìm kiếm"
          />
          <TouchableOpacity style={styles.header_item} onPress={handleSearch}>
            <MaterialCommunityIcons
              name="qrcode-scan"
              size={20}
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.header_item} onPress={openModal}>
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
                >
                  <MaterialIcons
                    style={{ width: "20%" }}
                    name="group-add"
                    size={20}
                    color="gray"
                  />
                  <Text>Tạo nhóm</Text>
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
                onPress={() =>
                  navigation.navigate("ChatScreen", { friend: item })
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
    tittle:{
        fontSize:20,
        color:'white',
    },

    items:{
      
      marginTop:5,
      width:"100%",
      borderRadius:10,
      overflow:"hidden",
      borderWidth:0,
    }, 
    item:{
        height:70,
        width:'100%',
        flexDirection:'row',
        padding:15,
        
    },
    header_item:{
        flexDirection: 'row',
        alignItems: 'center',
        width:30,
        justifyContent:'center',
    },
    image:{
        borderRadius:50,
        borderWidth:1,
        width:50,
        height:50,
        justifyContent: 'center',
        alignItems: 'center',
        flex:'column'
    } ,
    name:{
        marginLeft:10,
        height:50,
        color:'black',
        width:150,
    },
    header:{
      backgroundColor:'blue',
        flexDirection: 'row',
        justifyContent:'flex-start',
        alignItems: 'center',
        paddingHorizontal: 8,
        height:50,
        width:'100%'
      },
      time:{
        color:'black',
        fontSize:12,

      },
      noti:{
        textAlign:'center',
        fontSize:10,
        color:'white',
        borderWidth:1,
        backgroundColor:'black',
        borderRadius:10,
        marginTop:5,
      },
})
