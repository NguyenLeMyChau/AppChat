import { AntDesign, FontAwesome, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable, SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';

export default function AddFriend ({navigation}){  
    const [phoneNumber, setPhoneNumber] = useState('');
    const [value, setValue] = useState("");
    const [valid, setValid] = useState(false);
    const [formattedValue, setFormattedValue] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const phoneInput = useRef(null);
   
  
    const onChangePhoneNumber = (number) => {
      setPhoneNumber(number);
    };
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <MaterialIcons
            onPress={() => navigation.goBack()}
            name="keyboard-backspace"
            size={20}
            color="black"
          />
          <Text style={{ fontSize: 14, fontWeight: "bold", padding: 10 }}>
            Thêm bạn
          </Text>
        </View>
        <View
          style={{ width: "100%", height: 230, backgroundColor: "gray" }}
        ></View>
         <View style={{height:120,borderBottomWidth:5,borderBottomColor:'gray',width:'100%'}}>
        <View
          style={{ height: 70, borderBottomWidth: 1, justifyContent: "space-around",flexDirection:'row' ,alignItems:'center',padding:10}}
        >          
          <PhoneInput
            ref={phoneInput}
            defaultValue={value}
            defaultCode="VN"
            layout="second"
            onChangeText={(text) => {
              setValue(text);
            }}
            onChangeFormattedText={(text) => {
              setFormattedValue(text);
            }}
            autoFocus
            containerStyle={{ borderWidth: 1, borderRadius: 5, height: 40 ,width:'80%',marginLeft:10,alignContent:" center"}}
            codeTextStyle={{ backgroundColor:"gray" ,width:50,height:'100%'}}
            placeholder="Nhập số điện thoại"
          />
          <View style={{width:'15%',alignItems:'center'}}>
          <TouchableOpacity
            style={{
              backgroundColor: "gray",
              borderRadius: "50%",
              width: 35,
              height: 35,
              alignItems: "center",
              justifyContent: "center",
            }}           
          >
            <AntDesign name="arrowright" size={20} color="black" />
          </TouchableOpacity>
          </View>
        </View>
        <View style={{padding:10,flexDirection:'row'}}>
            <MaterialCommunityIcons name='qrcode-scan'size={20} color="black"/>
            <Text style={{paddingLeft:10}}>Quét mã QR</Text>
        </View>
       </View>
       <View style={{height:100,width:'100%'}}>
       <View style={{padding:10,flexDirection:'row'}}>
        <FontAwesome name='address-book-o'size={20} color="black"/>
            <Text style={{marginLeft:10,width:'100%',borderBottomWidth:1,paddingBottom:15}}>Danh bạ máy</Text>
        </View>
        <View style={{padding:10,flexDirection:'row'}}>
        <FontAwesome name='id-badge'size={20} color="black"/>
            <Text style={{marginLeft:10,width:'100%'}}>Bạn bè có thể quen</Text>
        </View>
       </View>
       <View style={{width:'100%',backgroundColor:'gray',height:'auto'}}>
        <Text style={{padding:20,fontSize:11}}>Xem lời mời kết bạn đã gửi tại trang Danh Bạ Zalo</Text>
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
      header:{
        backgroundColor:'white',
          flexDirection: 'row',
          justifyContent:'flex-start',
          alignItems: 'center',
          paddingHorizontal: 8,
          height:50,
          width:'100%',
          borderBottomWidth:1,
          borderColor:'gray'
        },  
        header_item:{
            flexDirection: 'row',
            alignItems: 'center',
            width:30,
            justifyContent:'center',
            padding:10,
        }, 
  })
  