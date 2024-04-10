import { useContext, useState } from "react";
import { Alert, TextInput, TouchableOpacity } from "react-native";
import { StyleSheet, View, Text } from "react-native";
import {
  Octicons,
  AntDesign,
  Entypo,
  SimpleLineIcons,
} from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Contact_AcceptFriendRequest({ navigation }) {
  

  return (
    <View style={styles.container}>
      <Text>Đã gửi</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  
});
