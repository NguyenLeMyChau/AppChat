import {
  AntDesign,
  MaterialCommunityIcons,
  SimpleLineIcons,
  Feather,
  Entypo
} from "@expo/vector-icons";
import { useEffect } from "react";
import { useState } from "react";
import React from 'react';
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
import { GiftedChat, Bubble, Avatar } from "react-native-gifted-chat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import io from "socket.io-client";
import Modal from "react-native-modal";
import { Video, Audio } from 'expo-av';
import { Checkbox } from "react-native-paper";
import EmojiPicker from "rn-emoji-keyboard";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from 'expo-image-picker';
import * as ScreenOrientation from 'expo-screen-orientation';
import * as DocumentPicker from 'expo-document-picker';

export default function ChatGroup({ navigation, route }) {
  const { group } = route.params;
  const [recording, setRecording] = useState();
  const [isRecording, setIsRecording] = useState(false); const [userData, setUserData] = useState({});
  const [currentMessage, setCurrentMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [listChat, setListChat] = useState([]);
  const [modalForward, setModalForward] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  React.useEffect(() => {
    ScreenOrientation.unlockAsync(); // Cho phép xoay màn hình

    return () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT); // Khóa màn hình theo chế độ mặc định khi component unmount
    };
  }, []);


  const [isSelected, setIsSelected] = useState(
    new Array(listChat.length).fill(false)
  );

  const setSelectionAt = (index, value) => {
    setIsSelected((prevState) => {

      if (prevState.includes(index)) {
        return prevState.filter((id) => id !== index);
      } else {
        const newState = [...prevState];
        newState[index] = value;
        return newState;
      }
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
      console.log("get data group");
      const foundUser = await AsyncStorage.getItem("foundUser");
      if (foundUser !== null) {
        const user = JSON.parse(foundUser);
        setUserData(user);
        userId = user._id;
        fetchMessages(user);
      }
    } catch (error) {
      console.error("Error getting data from AsyncStorage:", error);
    }
  }

  useEffect(() => {
    getData();
    const newSocket = io("https://backend-chatapp-rdj6.onrender.com");
    newSocket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });
    newSocket.on("sendDataServer", (message) => {
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
      const response = await axios.post(
        "https://backend-chatapp-rdj6.onrender.com/sendMessageToGroup",
        {
          from: userData._id,
          to: group._id,
          message: currentMessage,
          avatar: group.avatar,
        }
      );
      const data = response.data.data;
      const newMessage = {
        _id: data._id,
        text: data.message.text,
        createdAt: new Date(data.createdAt),
        user: {
          _id: userData._id, // ID của người gửi tin nhắn
          name: userData.name, // Tên của người gửi tin nhắn
          avatar: userData.avatar
            ? userData.avatar
            : require("../../../../../assets/AnexanderTom.jpg"),
        },
        isHidden: data.isHidden,
      };

      socket.emit("sendDataClient", newMessage); // Gửi tin nhắn qua Socket.IO

      console.log(newMessage);
      setCurrentMessage("");
    }
  };

  const fetchMessages = async (userData) => {
    try {
      const response = await axios.post(
        "https://backend-chatapp-rdj6.onrender.com/getGroupMessages",
        {
          groupId: group._id,
          from: userData._id,
        }
      );
      const data = response.data;
      const formattedMessages = response.data.map((msg) => ({
        _id: msg.id, // ID của tin nhắn
        text: msg.message, // Nội dung tin nhắn
        createdAt: new Date(msg.createdAt), // Thời gian tạo tin nhắn (định dạng Date)
        user: {
          _id: msg.fromSelf ? userData._id : msg.sender._id, // ID của người gửi tin nhắn
          name: msg.sender.name, // Tên của người gửi tin nhắn
          avatar: msg.fromSelf ? userData.avatar : msg.sender.avatar,
          // require("../../../../../assets/AnexanderTom.jpg")
          avatar: msg.sender.avatar,
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
      const response = await axios.get(
        `https://backend-chatapp-rdj6.onrender.com/group/getGroupList/${userData._id}`
      );
      const data = response.data; // Truy cập data từ response
      setListChat([...data.userData.friendList, ...data.userData.groupList]);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Error", "An error occurred while fetching data");
    }
  };


  // Chụp ảnh
  const takePicture = async () => {
    try {
      if (Platform.OS!== 'web') {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          alert('Quyền truy cập camera bị từ chối!');
          return;
        }
      }
      
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
      });
      
      if (!result.canceled) {
        console.log('..............fileType', result.assets[0].type);
        console.log('..............fileName', result.assets[0].fileName);
        const CameraImageUrl = await handleUpImage(result.assets[0].uri, result.assets[0].type, result.assets[0].fileName);
        console.log(CameraImageUrl);
        setCurrentMessage(CameraImageUrl);
      }
    } catch (error) {
      console.error('Error taking picture:', error);
    }
  };
  
  //Video

  const takeVideo = async () => {
    try {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          alert('Quyền truy cập camera bị từ chối!');
          return;
        }
      }
  
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
      });
  
      if (!result.canceled) {
        console.log('..............fileType', result.assets[0].type);
        console.log('..............fileName', result.assets[0].fileName);
        const CameraVideoUrl = await handleUpImage(result.assets[0].uri, result.assets[0].type, result.assets[0].fileName);
        console.log(CameraVideoUrl);
        setCurrentMessage(CameraVideoUrl);
      }
    } catch (error) {
      console.error('Error taking video:', error);
    }
  };
  

  // Ghi âm
  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log('Starting recording..');
      const recordingInstance = new Audio.Recording();
      await recordingInstance.prepareToRecordAsync({
        android: {
          extension: '.mp4',
          outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
          audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
        },
        ios: {
          extension: '.mp4',
          outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_MPEG4AAC,
          audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
          linearPCMBitDepth: 16,
          linearPCMIsBigEndian: false,
          linearPCMIsFloat: false,
        },
      });
      setRecording(recordingInstance);
      setIsRecording(true);
      console.log('Recording started');
      await recordingInstance.startAsync();
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setIsRecording(false);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    console.log('Recording stopped and stored at', uri);
    setRecording(undefined);

    // Assuming the recording is an audio file with .mp4 extension
    const audioFile = {
      uri: uri,
      type: 'audio/mp4',
      filename: 'recording.mp4',
    };

    const audioUrl = await handleUpImage(audioFile.uri, audioFile.type, audioFile.filename);
    console.log(audioUrl);
    setCurrentMessage(audioUrl);
  }


  async function selectFile() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log('..............fileType', result.assets[0].type);
      console.log('..............fileName', result.assets[0].fileName);
      const imageUrl = await handleUpImage(result.assets[0].uri, result.assets[0].type, result.assets[0].fileName);
      console.log(imageUrl);
      setCurrentMessage(imageUrl);
    }
  }

  async function handleUpImage(uri, type, filename) {

    const formData = new FormData();

    let file = {
      uri: uri,
      name: filename,
      type: ''
    };

    switch (type) {
      case 'image':
        file.type = 'image/jpeg';
        file.name = filename;
        break;
      case 'video':
        file.type = 'video/mp4';
        file.name = filename;
        break;
      case 'audio/mp4':
        file.type = 'video/mp4';
        file.name = filename;
        break;
      default:
        throw new Error('Invalid file type');
    }

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

  const pickFile = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync();

      console.log('..............res: ', JSON.stringify(res));

      const result = res.assets[0];

      console.log('..............File extension: ' + result.mimeType);
      console.log('..............uri: ' + result.uri);
      console.log('..............name: ' + result.name);

      // Call handleUpImage with the file's URI, type, and name
      const imageUrl = await handleUpFile(result.uri, result.mimeType, result.name);
      console.log(imageUrl);
      setCurrentMessage(imageUrl);

    } catch (err) {

      console.log('Error: ' + err);

    }
  };


  async function handleUpFile(uri, type, filename) {

    const formData = new FormData();

    let file = {
      uri: uri,
      name: filename,
      type: type
    };

    switch (type) {
      case 'image/jpeg':
      case 'image/png':
        file.name = filename;
        break;
      case 'video/mp4':
        file.name = filename;
        break;
      case 'application/json':
        file.name = filename;
        break;
      case 'text/csv':
        file.name = filename;
        break;
      case 'application/vnd.ms-excel':
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        file.name = filename;
        break;
      case 'application/msword':
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        file.name = filename;
        break;
      case 'application/pdf':
        file.name = filename;
        break;
      case 'text/plain':
        file.name = filename;
        break;
      default:
        throw new Error('Invalid file type');
    }


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
                style={{ width: 300, height: 300 }}
                resizeMode="contain"
              />
            )
            : isVideoMessage
              ? () => (
                <Video
                  source={{ uri: props.currentMessage.text }}
                  volume={1.0}
                  isMuted={false}
                  resizeMode="contain"
                  shouldPlay
                  style={{ width: 300, height: 300 }}
                  useNativeControls
                />
              )
              : isFileMessage
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
      const response = await axios.delete(
        `https://backend-chatapp-rdj6.onrender.com/deletemsg/${messageId}`
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

    const response = await axios.put(
      `https://backend-chatapp-rdj6.onrender.com/retrievemsg/${messageId}/${senderId}`
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
        `https://backend-chatapp-rdj6.onrender.com/forwardMessage`,
        { from: userData._id, to: receiver, message: message }
      );
      alert(response.data.msg);
      socket.emit("sendDataClient", response.data.msg);
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
      <LinearGradient
        colors={["#006AF5", "#5ac8fa"]}
        start={[0, 0.5]}
        end={[1, 0.5]}
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
            {group.name}
          </Text>
          <Text style={{ color: "white", fontSize: 13 }}>Truy cập</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: "10%" }}>
          <MaterialCommunityIcons name="phone" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={{ width: "10%" }}>
        <Entypo
              name="camera"
              size={20}
              onPress={takePicture}
              color="white"
            />
        </TouchableOpacity>
        <TouchableOpacity style={{ width: "10%" }}>
          <Feather name="video" size={20} color="white"  onPress={takeVideo}/>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: "10%" }}
          onPress={() =>
            navigation.navigate("Profile_Group", {
              user: userData,
              group: group,
            })
          }
        >
          <SimpleLineIcons name="list" size={20} color="white" />
        </TouchableOpacity>
      </LinearGradient>
      <View style={{ height: "85%" }}>
        <GiftedChat
          messages={messages}
          onSend={(newMessages) => onSend(newMessages)}
          user={{
            _id: userData._id,
            name: userData.name,
            avatar: userData.avatar
              ? userData.avatar
              : require("../../../../../assets/AnexanderTom.jpg"),
          }}
          showUserAvatar
          renderBubble={renderBubble}
          listViewProps={{}}
          onPress={(context, message) => onLongPress(context, message)}
          renderInputToolbar={() => null} // Thêm dòng này
          selectable={true}
          renderUsernameOnMessage={true}
          renderAvatar={(props) => (
            <Avatar {...props} avatarStyle={{ borderRadius: 16 }} />
          )}
        />
      </View>

      <View style={styles.chat}>
        <EmojiPicker
          emojisPerRow={5}
          pickerStyle={{ width: "90%", height: "40%" }}
          onEmojiSelected={(emoji) => {
            setCurrentMessage((prevSelected) => prevSelected + emoji.emoji);
          }}
          onClose={() => {
            setIsOpen(!isOpen);
          }}
          categoryPosition="bottom"
          allowMultipleSelections
          open={isOpen}
        />
        <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
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
            />

            <SimpleLineIcons
              name="microphone"
              size={24}
              color="black"
              style={{ marginLeft: 0 }}
              onPress={recording ? stopRecording : startRecording}
            />
            {isRecording && <Text>Recording...</Text>}


            <AntDesign
              name="addfile"
              size={24}
              color="black"
              style={{ marginLeft: 20 }}
              onPress={() => { pickFile() }}
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

                    <Checkbox
                      status={isSelected[index] ? 'checked' : 'unchecked'}
                      onPress={(value) => setSelectionAt(index, value)}

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
    paddingTop: 35
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
    width: "50%",
  },

  txtSDTFocus: {
    fontSize: 16,
    color: "black",
    padding: 10,
    width: "75%",
  },

  chatText: {
    backgroundColor: "yellow",
    flexDirection: "row",
    alignItems: "center",
  },
});
