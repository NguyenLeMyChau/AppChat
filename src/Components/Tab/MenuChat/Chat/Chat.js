import {
  AntDesign,
  MaterialCommunityIcons,
  SimpleLineIcons,
  Entypo,
  Feather,
} from "@expo/vector-icons";
import { useEffect } from "react";
import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Clipboard,
} from "react-native";
import { Image, Linking } from "react-native";
import axios from "axios";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import io, { Socket } from "socket.io-client";
import Modal from "react-native-modal";
import ReactPlayer from "react-player";
import CheckBox from "@react-native-community/checkbox";
import EmojiPicker from 'rn-emoji-keyboard';

export default function Chat({ navigation, route }) {
  const { friend } = route.params;
  var userId;
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [userData, setUserData] = useState({});
  const [currentMessage, setCurrentMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [listChat, setListChat] = useState([]);
  const [modalForward, setModalForward] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const [isSelected, setIsSelected] = useState(
    new Array(listChat.length).fill(false)
  );

  const setSelectionAt = (index, value) => {
    setIsSelected((prevState) => {
      const newState = [...prevState];
      newState[index] = value;
      return newState;
    });
  };

  useEffect(() => {
    setIsSelected(new Array(listChat.length).fill(false));
  }, [listChat]);

  const getSelectedItems = () => {
    return listChat.filter((item, index) => isSelected[index]);
  };

  async function getData() {
    try {
      const foundUser = await AsyncStorage.getItem("foundUser");
      if (foundUser !== null) {
        const user = JSON.parse(foundUser);
        setUserData(user);
        userId = user._id;
        fetchMessages(user); // Gọi hàm fetchConversations sau khi lấy dữ liệu thành công
      }
    } catch (error) {
      console.error("Error getting data from AsyncStorage:", error);
    }
  }

  useEffect(() => {
    getData();
    const newSocket = io("http://192.168.0.116:4000");
    newSocket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });
    newSocket.on("sendDataServer", (message) => {
      // console.log(userId)
      // if (message.data.user._id === userId || message.data.user._id === friend._id) {
      //     setMessages(previousMessages => GiftedChat.append(previousMessages, message.data));
      // }
      getData();
    });
    newSocket.on("message_deleted", (messageId) => {
      // Xóa tin nhắn khỏi danh sách nếu tin nhắn được xóa từ một client khác
      getData();
    });
    setSocket(newSocket); // Lưu socket vào state
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const generateRandomId = (text) => {
    const timestamp = Date.now().toString(); // Thời gian hiện tại dưới dạng chuỗi số
    const randomText = Math.random().toString(36).substring(7); // Chuỗi ngẫu nhiên từ 7 ký tự
    return `${timestamp}-${text}-${randomText}`; // Kết hợp thời gian, văn bản và chuỗi ngẫu nhiên
  };

  const onSend = async (messages = []) => {
    if (currentMessage.length > 0 && socket) {
      const response = await axios.post("http://192.168.0.116:4000/addmsg", {
        from: userData._id,
        to: friend._id,
        message: currentMessage,
        avatar: userData.avatar,
      });
      console.log(response.data.data);
      const newMessage = {
        _id: response.data.data._id,
        text: response.data.data.message.text,
        createdAt: new Date(response.data.data.createdAt),
        user: {
          _id: userData._id, // ID của người gửi tin nhắn
          avatar: userData.avatar
            ? userData.avatar
            : require("../../../../../assets/AnexanderTom.jpg"),
        },
        isHidden: response.data.data.isHidden,
      };

      socket.emit("sendDataClient", newMessage); // Gửi tin nhắn qua Socket.IO

      console.log(response.data.msg);
      setCurrentMessage("");
    }
  };

  const fetchMessages = async (userData) => {
    console.log(friend);
    try {
      const response = await axios.post("http://192.168.0.116:4000/getmsg", {
        from: userData._id,
        to: friend._id,
      });
      const formattedMessages = response.data.map((msg) => ({
        _id: msg.id, // ID của tin nhắn
        text: msg.message, // Nội dung tin nhắn
        createdAt: new Date(msg.createdAt), // Thời gian tạo tin nhắn (định dạng Date)
        user: {
          _id: msg.fromSelf ? userData._id : friend._id, // ID của người gửi tin nhắn
          name: msg.fromSelf ? "You" : friend.name, // Tên của người gửi tin nhắn
          avatar: msg.fromSelf
            ? null
            : friend.avatar
            ? friend.avatar
            : require("../../../../../assets/AnexanderTom.jpg"),
        },
        isHidden: msg.isHidden, // Trạng thái ẩn tin nhắn (nếu có)
      }));

      const visibleMessages = formattedMessages.filter((msg) => {
        if (!msg.isHidden || (msg.isHidden && msg.user._id !== userData._id)) {
          return true;
        }
        return false;
      });
      setMessages(
        visibleMessages.sort(
          (b, a) => new Date(a.createdAt) - new Date(b.createdAt)
        )
      );

      console.log(formattedMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };
 
  const fetchConversations = async () => {
    try {
      console.log(userData._id);
      const response = await axios.get(
        `http://192.168.0.116:4000/group/getGroupList/${userData._id}`
      );
      const data = response.data; // Truy cập data từ response
      setListChat([...data.userData.friendList, ...data.userData.groupList]);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Error", "An error occurred while fetching data");
    }
  };

  async function selectFile() {
    const input = document.createElement("input");
    input.type = "file";
    input.onchange = async (e) => {
      const file = e.target.files[0];

      console.log(file);
      console.log(file.name);

      // Gọi hàm handleUpImage sau khi chọn tệp
      const imageUrl = await handleUpImage(file);
      console.log(imageUrl);
      setCurrentMessage(imageUrl);
    };
    input.click();
  }

  async function handleUpImage(file) {
    const formData = new FormData();
    formData.append("avatar", file);

    if (file !== null) {
      const responseAvatar = await axios.post(
        `http://192.168.0.116:4000/user/uploadAvatarS3/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const image = responseAvatar.data.avatar;
      console.log(image);
      return image;
    }
  }

  const openFileURL = (fileURL) => {
    // Sử dụng Linking.openURL để mở đường dẫn tệp trong trình duyệt hoặc ứng dụng tương ứng.
    Linking.openURL(fileURL);
  };

  const renderBubble = (props) => {
    const imageUrlRegex = /\.(jpeg|jpg|png|gif)$/i;
    const isImageMessage = imageUrlRegex.test(props.currentMessage.text);

    const fileUrlRegex = /\.(pdf|doc|txt|json|csv|xls|xlsx|docx)$/i;
    const isFileMessage = fileUrlRegex.test(props.currentMessage.text);

    const videoUrlRegex = /\.(mp4|mov|avi)$/i;
    const isVideoMessage = videoUrlRegex.test(props.currentMessage.text);

    console.log("prop" + props.currentMessage.text);
    console.log("isImageMessage" + isImageMessage);

    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: "white",
            maxWidth: "85%",
          },
          right: {
            maxWidth: "85%",
          },
        }}
        renderMessageText={
          isImageMessage
            ? () => (
                <Image
                  source={{ uri: props.currentMessage.text }}
                  style={{ width: 200, height: 200 }}
                />
              )
            : isVideoMessage
            ? () => (
                <ReactPlayer
                  url={props.currentMessage.text}
                  width={200}
                  height={200}
                  controls={true}
                />
              )
            : null
        }
        renderCustomView={
          isFileMessage
            ? () => (
                <TouchableOpacity
                  onPress={() => openFileURL(props.currentMessage.text)}
                >
                  {/* <Text style={{ color: 'blue' }}>File: {props.currentMessage.text}</Text> */}
                  <AntDesign
                    name="file1"
                    size={100}
                    style={{ alignSelf: "center" }}
                  />
                </TouchableOpacity>
              )
            : null
        }
      />
    );
  };

  async function deleteMessage(message) {
    try {
      const messageId = message._id; // Lấy ID của tin nhắn từ đối tượng tin nhắn
      console.log(messageId);
      const response = await axios.delete(
        `http://192.168.0.116:4000/deletemsg/${messageId}`
      );
      alert(response.data.message);
      socket.emit("sendDataClient", messageId);
    } catch (error) {
      console.error("Error deleting message:", error);
      alert("An error occurred while deleting the message.");
    }
  }

  async function retrieveMessage(message) {
    const messageId = message._id; // Get the message ID from the message object
    const senderId = message.user._id; // Get the message ID from the message object

    console.log(messageId);
    console.log(message);
    console.log(message.user._id);

    const response = await axios.put(
      `http://192.168.0.116:4000/retrievemsg/${messageId}/${senderId}`
    );
    alert(response.data.message);
    socket.emit("sendDataClient", messageId);
  }

  async function openForwardMessage(message) {
    await fetchConversations();
    setModalForward(true);
    setSelectedMessage(message);
  }

  async function forwardMessage(receiver, message) {
    try {
      const response = await axios.post(
        `http://192.168.0.116:4000/forwardMessage`,
        { from: userData._id, to: receiver, message: message }
      );
      socket.emit("sendDataClient", response.data.msg);
      alert(response.data.msg);
    } catch (error) {
      console.error("Error deleting message:", error);
      alert("An error occurred while deleting the message.");
    }
  }

  function onLongPress(context, message) {
    if (message.user._id == userData._id) {
      const options = [
        "Sao chép tin nhắn",
        "Gỡ tin nhắn phía tôi",
        "Xoá tin nhắn",
        "Chuyển tiếp tin nhắn",
        "Cancel",
      ];
      const cancelButtonIndex = options.length - 1;
      context.actionSheet().showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex,
        },
        (buttonIndex) => {
          switch (buttonIndex) {
            case 0:
              Clipboard.setString(message.text);
              alert("Copy to clipboard");
              break;
            case 1:
              retrieveMessage(message);
              break;
            case 2:
              deleteMessage(message);
              break;
            case 3:
              openForwardMessage(message);
              break;
            case 4:
              console.log("Cancel");
              break;
          }
        }
      );
    } else {
      const options = ["Sao chép tin nhắn", "Chuyển tiếp tin nhắn", "Cancel"];
      const cancelButtonIndex = options.length - 1;
      context.actionSheet().showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex,
        },
        (buttonIndex) => {
          switch (buttonIndex) {
            case 0:
              Clipboard.setString(message.text);
              alert("Copy to clipboard");
              break;
            case 1:
              openForwardMessage(message);
              break;
            case 2:
              console.log("Cancel");
              break;
          }
        }
      );
    }
  }



  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          backgroundImage: "linear-gradient(90deg, #006AF5 30%, #5ac8fa 100%)",
          paddingHorizontal: 16,
          paddingVertical: 8,
        }}
      >
        <TouchableOpacity
          style={{ width: "10%" }}
          onPress={() => navigation.navigate("BottomTab")}
        >
          <AntDesign name="arrowleft" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={{ width: "55%" }}>
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
            {friend.name}
          </Text>
          <Text style={{ color: "white", fontSize: 13 }}>Truy cập</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: "13%" }}>
          <MaterialCommunityIcons name="phone" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={{ width: "13%" }}>
          <Feather name="video" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: "13%" }}
          onPress={() =>
            navigation.navigate("Profile_Friend", {
              user: userData,
              friend: friend,
            })
          }
        >
          <SimpleLineIcons name="list" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <View style={{ height: "85%" }}>
        <GiftedChat
          messages={messages}
          onSend={(newMessages) => onSend(newMessages)}
          user={{
            _id: userData._id,
          }}
          renderBubble={renderBubble}
          listViewProps={{}}
          onPress={(context, message) => onLongPress(context, message)}
          renderInputToolbar={() => null} // Thêm dòng này
          selectable={true}
        />
      </View>

      <View style={styles.chat}>
        <EmojiPicker
        emojisPerRow={5}
        pickerStyle={{width: '90%',height:'40%'}}
          onEmojiSelected={emoji => {
            setCurrentMessage(prevSelected => prevSelected +emoji.emoji)
            }}
          onClose={()=>{setIsOpen(!isOpen)}}
          categoryPosition='bottom'
          allowMultipleSelections
        
          open={isOpen}
        />
        <TouchableOpacity  onPress={() => setIsOpen(!isOpen)}>
        <MaterialCommunityIcons
          name="sticker-emoji"
          size={30}
          color="black"
        />
        </TouchableOpacity>
        

        {currentMessage === "" ? (
          <>
            <TextInput
              placeholder="Tin nhắn"
              style={styles.txtSDT}
              value={currentMessage}
              onChangeText={(text) => setCurrentMessage(text)}
              keyboardType="phone-pad"
            />

            <AntDesign
              name="addfile"
              size={24}
              color="black"
              style={{ marginLeft: 5 }}
            />

            <SimpleLineIcons
              name="microphone"
              size={24}
              color="black"
              style={{ marginLeft: 20 }}
            />

            <AntDesign
              name="picture"
              size={30}
              color="black"
              style={{ marginLeft: 20 }}
              onPress={() => {
                selectFile();
              }}
            />
          </>
        ) : (
          <>
            <TextInput
              placeholder="Tin nhắn"
              style={styles.txtSDTFocus}
              value={currentMessage}
              onChangeText={(text) => setCurrentMessage(text)}
              keyboardType="phone-pad"
            />

            <MaterialCommunityIcons
              name="send"
              size={30}
              color="#006AF5"
              style={{ marginLeft: 20 }}
              onPress={() => onSend()}
            />
          </>
        )}
      </View>

      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: "70%",
          padding: 10,
        }}
      >
        <Modal
          visible={modalForward}
          animationType="fade"
          transparent={true}
          onBackdropPress={() => setModalForward(false)}
        >
          <View
            style={{
              backgroundColor: "white",
              maxHeight: "70%",
              width: "100%",
              position: "absolute",
            }}
          >
            <ScrollView>
              {listChat.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: 10,
                    }}
                  >
                    <Image
                      source={
                        item.avatar
                          ? { uri: item.avatar }
                          : require("../../../../../assets/AnexanderTom.jpg")
                      }
                      style={{ width: 50, height: 50, borderRadius: 50 }}
                    />

                    <Text style={{ fontSize: 16, marginLeft: 10 }}>
                      {item.name}
                    </Text>

                    <CheckBox
                      value={isSelected[index] || false}
                      onValueChange={(value) => setSelectionAt(index, value)}
                    />
                  </View>
                );
              })}
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 10,
                  backgroundColor: "#006AF5",
                }}
                onPress={() => {
                  const selectedItems = getSelectedItems();
                  const selectedIds = selectedItems.map((item) => item._id);
                  console.log(selectedItems);
                  console.log(selectedIds);
                  console.log(selectedMessage.text);
                  forwardMessage(selectedIds, selectedMessage.text);
                  setModalForward(false);
                }}
              >
                <Text style={{ fontSize: 18, color: "white" }}>
                  Chuyển tiếp
                </Text>
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
    backgroundColor: "#E9EBED",
  },

  chat: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 10,
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
  },

  txtSDT: {
    fontSize: 16,
    color: "black",
    padding: 10,
  },

  txtSDTFocus: {
    fontSize: 16,
    color: "black",
    padding: 10,
    width: 270,
  },

  chatText: {
    backgroundColor: "yellow",
    flexDirection: "row",
    alignItems: "center",
  },
});
