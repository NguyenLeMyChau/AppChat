import { AntDesign, Feather, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const ChatScreen = ({ navigation, route }) => {
  const { users } = route.params; // Retrieve the user ID from the navigation parameters

  const [messages, setMessages] = useState([users]);
  const [inputText, setInputText] = useState('');
  const [inputTextEnable, setButtonEnabled] = useState(false)
  const sendMessage = () => {
    const newMessage = {
      id: new Date().getTime(),
      messages: inputText,
      createdAt: new Date(),
      user: 'me',
    };
    setMessages([...messages, newMessage]);
    setInputText('');
    setButtonEnabled(false)
  };
  const handleInputChange = (text) => {
    setInputText(text)
    setButtonEnabled(text.trim() !== '')
  }
  const renderItem = ({ item }) => (
    <View style={[styles.messageContainer, item.user === 'me' && styles.messageContainerMe, item.user === 'you' && styles.messageContainerYou]}>
      <Text style={[styles.messageText,styles.messageTextMe]}>{item.messages}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
        <View  style={styles.header}>
        <TouchableOpacity style={{width:'15%'}}  onPress={()=>navigation.goBack()}>
            <AntDesign name="arrowleft" size={20} color="white" />
          </TouchableOpacity>   
          <TouchableOpacity style={{width:'50%'}}>
           
                <Text style={{color:'white',fontWeight:'bold',fontSize:18}}>{users.user}</Text>
                <Text style={{color:'gray'}}>Truy cập</Text>
           
          </TouchableOpacity> 
          
          <TouchableOpacity style={{width:'13%'}}>
            <MaterialCommunityIcons name="phone" size={20} color="white" />
          </TouchableOpacity>   
          <TouchableOpacity style={{width:'13%'}}>
            <Feather name="video" size={20} color="white" />
          </TouchableOpacity>   
          <TouchableOpacity style={{width:'13%'}}>
            <SimpleLineIcons name="list" size={20} color="white" />
          </TouchableOpacity>   
         
                
    </View>
    <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.messages}
        onLayout={() => scrollToEnd()}
    />
    
      <View style={styles.inputContainer}>
      
     <TouchableOpacity style={{width:'10%'}} onPress={sendMessage}>
        <MaterialCommunityIcons name="sticker-emoji" size={25} color="black" />
        </TouchableOpacity>
   
        <TextInput
          style={inputTextEnable===false? styles.input: styles.inputenable}
          value={inputText}
          onChangeText={handleInputChange}
          placeholder="Tin nhắn"
          

        />
        {inputTextEnable === false &&( <View style={{flexDirection:'row',width:'30%',justifyContent:'space-between'}}>
       <TouchableOpacity  onPress={sendMessage}>
        <SimpleLineIcons name="options" size={25} color="black" />
        </TouchableOpacity>
       <TouchableOpacity onPress={sendMessage}>
        <SimpleLineIcons name="microphone" size={25} color="black" />
        </TouchableOpacity>
        <TouchableOpacity  onPress={sendMessage}>
        <SimpleLineIcons name="picture" size={25} color="black" />
        </TouchableOpacity>
        </View>)}
        {inputTextEnable === true &&( <View style={{flexDirection:'row',width:'15%',justifyContent:'flex-end'}}>
        <TouchableOpacity onPress={sendMessage}>
        <MaterialIcons name="send" size={25} color="black" />
        </TouchableOpacity>
        </View>)}       
      </View>
    </View>
  );

  function scrollToEnd() {
    const flatList = React.createRef();
    if (flatList) {
      flatList.current.scrollToEnd();
    }
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messages: {
    flexGrow: 1,

  },
  messageContainer: {
    padding: 10,
    marginBottom: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    maxWidth:'80%',
  },
  header:{
    backgroundColor:'blue',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 8,
      height:'8%',
      width:'100%'
    },
  messageContainerMe: {
    alignSelf: 'flex-end',
  },
  messageContainerYou: {
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    textAlign: 'center',
  },
 
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height:'8%',
    width:'100%'
  },
  input: {
    width:'60%',
    height:'100%',
    borderWidth: 0,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  inputenable: {
    width:'75%',
    height:'100%',
    borderWidth: 0,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  sendButtonText: {
    color: 'black',
    fontSize: 16,
  },
});

export default ChatScreen;