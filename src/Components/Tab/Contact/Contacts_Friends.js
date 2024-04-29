import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome, Entypo, FontAwesome5 } from "@expo/vector-icons";

export default function Contacts_Friends({ navigation }) {

  return (
    <View style={styles.container}>

      <View style={{ width: "100%", paddingLeft: 30 }}>

        <TouchableOpacity style={{ ...styles.header, marginTop: 10 }} onPress={()=>{navigation.navigate('NavigationContactFriendRequest')}}>
          <FontAwesome name="square" size={50} color="#006AF5" />
          <Entypo name="users" size={20} color="white" style={{ left: -32 }} />
          <Text style={{ fontSize: 17 }}>Lời mời kết bạn</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <FontAwesome name="square" size={50} color="#006AF5" />
          <FontAwesome5 name="address-book" size={25} color="white" style={{ left: -32 }} />          
          <View>
            <Text style={{ fontSize: 17 }}>Danh bạ máy</Text>
            <Text style={{ fontSize: 13, color: "#8f8f8f" }}>Các liên hệ có dùng zalo</Text>
          </View>
        </View>

        <View style={styles.header}>
          <FontAwesome name="square" size={50} color="#006AF5" />
          <FontAwesome name="birthday-cake" size={20} color="white" style={{ left: -32 }} />
          <View>
            <Text style={{ fontSize: 17 }}>Lịch sinh nhật</Text>
            <Text style={{ fontSize: 13, color: "#8f8f8f" }}>Theo dõi sinh nhật của bạn bè</Text>
          </View>
        </View>
      </View>

      <View
        style={{
          borderBottomColor: '#e3e3e3',
          borderBottomWidth: 7, // Độ dày của đường gạch ngang
          width: '100%', // Chiều rộng của gạch ngang
        }} />


      <View style={{ width: "100%", height: "auto", borderBottomWidth: 1, borderBottomColor: "#e3e3e3" }}>
        <View style={{ ...styles.header, paddingLeft: 20, paddingTop: 15 }}>
          <TouchableOpacity style={styles.buttonContact}>
            <Text style={styles.textContact}>Tất cả</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonContact}>
            <Text style={styles.textContact}>Mới truy cập</Text>
          </TouchableOpacity>
        </View>
      </View>


    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  header: {
    flexDirection: "row",
    alignItems: 'center',
    width: "100%",
    marginBottom: 10
  },

  buttonContact: {
    width: "auto",
    height: 40,
    padding: 10,
    borderRadius: 20,
    marginRight: 20,
    borderWidth: 1,
    borderColor: "#C4C4C4"
  },

  textContact: {
    fontSize: 15,
    textAlign: "center",
    color: "#5c5a5a"
  }
});
