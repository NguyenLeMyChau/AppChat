
import { AntDesign, MaterialCommunityIcons, SimpleLineIcons, Entypo, Feather } from '@expo/vector-icons';
import { useEffect } from 'react';
import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import axios from 'axios';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import AsyncStorage from "@react-native-async-storage/async-storage";
import io, { Socket } from "socket.io-client";
import EmojiSelector from 'react-native-emoji-selector';


export default function Chat({ navigation, route }) {
    const { friend } = route.params;
    var userId;
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [userData, setUserData] = useState({});
    const [currentMessage, setCurrentMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const [img, setImg] = useState(null)
    var uploadedImage = null;


    async function getData() {
        try {
            const foundUser = await AsyncStorage.getItem('foundUser');
            if (foundUser !== null) {
                const user = JSON.parse(foundUser);
                setUserData(user);
                userId = user._id;
                fetchMessages(user); // Gọi hàm fetchConversations sau khi lấy dữ liệu thành công
            }
        } catch (error) {
            console.error('Error getting data from AsyncStorage:', error);
        }
    }


    useEffect(() => {
        getData();
        const newSocket = io('http://localhost:4000');
        newSocket.on('connect', () => {
            console.log('Connected to Socket.IO server');
        });
        newSocket.on('sendDataServer', (message) => {
            console.log(userId)
            if (message.data.user._id === userId || message.data.user._id === friend._id) {
                setMessages(previousMessages => GiftedChat.append(previousMessages, message.data));
            }
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

            if (img !== null) {
                uploadedImage = await handleUpImage(img); // Tải tệp lên máy chủ
                // Tạo tin nhắn chứa URL của tệp
                const newMessage = {
                    _id: generateRandomId(currentMessage),
                    text: uploadedImage, // URL của tệp
                    createdAt: new Date(),
                    user: {
                        _id: userData._id,
                        avatar: userData.avatar
                    },
                };
                socket.emit("sendDataClient", newMessage); // Gửi tin nhắn qua Socket.IO
                const response = await axios.post("http://localhost:4000/addmsg", {
                    from: userData._id,
                    to: friend._id,
                    message: uploadedImage,
                });
                console.log(response.data.message);
                setImg(null);
                uploadedImage = null;
                setCurrentMessage("");
            } else {
                // Kiểm tra socket đã sẵn sàng
                const newMessage = {
                    _id: generateRandomId(currentMessage),
                    text: currentMessage,
                    createdAt: new Date(),
                    user: {
                        _id: userData._id, // ID của người gửi tin nhắn
                        avatar: userData.avatar
                    },
                };
                socket.emit("sendDataClient", newMessage); // Gửi tin nhắn qua Socket.IO
                const response = await axios.post("http://localhost:4000/addmsg", {
                    from: userData._id,
                    to: friend._id,
                    message: currentMessage,
                });
                console.log(response.data.message);
                setCurrentMessage("");

            }



        }
    };

    const fetchMessages = async (userData) => {
        try {
            const response = await axios.post('http://localhost:4000/getmsg', {
                from: userData._id,
                to: friend._id,
            });
            const formattedMessages = response.data.map(msg => ({
                _id: msg.id, // ID của tin nhắn
                text: msg.message, // Nội dung tin nhắn
                createdAt: new Date(msg.createdAt), // Thời gian tạo tin nhắn (định dạng Date)
                user: {
                    _id: msg.fromSelf ? userData._id : friend._id, // ID của người gửi tin nhắn
                    name: msg.fromSelf ? 'You' : friend.name, // Tên của người gửi tin nhắn
                },
                isHidden: !msg.isHidden, // Trạng thái ẩn tin nhắn (nếu có)
            }));
            setMessages(formattedMessages);
            console.log(formattedMessages);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    async function selectFile() {
        const input = document.createElement('input');
        input.type = 'file';
        input.onchange = e => {
            const file = e.target.files[0];
            console.log(file);
            console.log(file.name);
            setImg(file);
            setCurrentMessage(file.name); // Lưu đối tượng chứa tên và tệp
        }
        input.click();
    };

    async function handleUpImage(file) {
        const formData = new FormData();
        formData.append('avatar', file);

        if (file !== null) {
            const responseAvatar = await axios.post(`http://localhost:4000/user/uploadAvatarS3/${userId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const image = responseAvatar.data.avatar;
            console.log(image);
            return image;
        }

    };


    const renderBubble = (props) => {

        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    left: {
                        backgroundColor: 'white',
                        maxWidth: "85%"
                    },
                    right: {
                        maxWidth: "85%"
                    },
                }}



            />
        );
    }


    async function deleteMessage(message) {
        const messageId = message._id; // Get the message ID from the message object
        console.log(messageId)
        const response = await axios.delete(`http://localhost:4000/deletemsg/${messageId}`);
        alert(response.data.message);

    }

    async function retrieveMessage(message) {
        const messageId = message._id; // Get the message ID from the message object
        const senderId = message.user._id; // Get the message ID from the message object

        console.log(messageId)
        console.log(message)
        console.log(message.user._id)

        const response = await axios.put(`http://localhost:4000/retrievemsg/${messageId}/${senderId}`);
        alert(response.data.message);

    }

    function onLongPress(context, message) {
        console.log(context, message);
        const options = ['Copy Message', 'Thu hồi tin nhắn', 'Xoá tin nhắn'];
        const cancelButtonIndex = options.length - 1;
        context.actionSheet().showActionSheetWithOptions({
            options,
            cancelButtonIndex
        }, (buttonIndex) => {
            switch (buttonIndex) {
                case 0:
                    copyMessage(message);
                    break;
                case 1:
                    retrieveMessage(message);
                    break;
                case 2:
                    deleteMessage(message);
                    break;
                default:
                    console.log('No action taken');
            }
        });
    }

    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: "row", alignItems: 'center', width: "100%", backgroundImage: 'linear-gradient(90deg, #006AF5 30%, #5ac8fa 100%)',
                paddingHorizontal: 16,
                paddingVertical: 8,
            }}>
                <TouchableOpacity style={{ width: '10%' }} onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={20} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={{ width: '55%' }}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>{friend.name}</Text>
                    <Text style={{ color: 'white', fontSize: 13 }}>Truy cập</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: '13%' }}>
                    <MaterialCommunityIcons name="phone" size={20} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={{ width: '13%' }}>
                    <Feather name="video" size={20} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={{ width: '13%' }}>
                    <SimpleLineIcons name="list" size={20} color="white" />
                </TouchableOpacity>
            </View>

            <View style={{ height: "85%" }}>
                <GiftedChat
                    messages={messages}
                    onSend={newMessages => onSend(newMessages)}
                    user={{
                        _id: userData._id,
                    }}
                    renderBubble={renderBubble}
                    listViewProps={{
                    }}
                    onPress={(context, message) => onLongPress(context, message)}
                    renderInputToolbar={() => null} // Thêm dòng này

                />

            </View>

            {showEmojiPicker && <EmojiSelector onEmojiSelected={emoji => setCurrentMessage(currentMessage + emoji)} />}



            <View style={styles.chat}>

                <MaterialCommunityIcons
                    name="emoticon"
                    size={24}
                    color="black"
                    onPress={() => setShowEmojiPicker(!showEmojiPicker)}
                />

                {currentMessage === '' ? (
                    <>
                        <TextInput
                            placeholder="Tin nhắn"
                            style={styles.txtSDT}
                            value={currentMessage}
                            onChangeText={(text) => setCurrentMessage(text)}
                            keyboardType="phone-pad"
                        />

                        <AntDesign name="addfile" size={24} color="black" style={{ marginLeft: 5 }} />

                        <SimpleLineIcons
                            name="microphone"
                            size={24}
                            color="black"
                            style={{ marginLeft: 20 }}
                            onPress={() => { handleUpImage(img) }}

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
                            color="#006AF5" style={{ marginLeft: 20 }}
                            onPress={() => onSend()}
                        />

                    </>

                )}
            </View>

        </View>



    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E9EBED',
    },

    chat: {
        flexDirection: 'row',
        alignItems: 'center',
        width: "100%",
        padding: 10,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0
    },

    txtSDT: {
        fontSize: 16,
        color: 'black',
        padding: 10,
    },

    txtSDTFocus: {
        fontSize: 16,
        color: 'black',
        padding: 10,
        width: 270
    },

    chatText: {
        backgroundColor: "yellow",
        flexDirection: 'row',
        alignItems: 'center'
    }

});
