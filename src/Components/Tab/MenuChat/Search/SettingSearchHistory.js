import { AntDesign, EvilIcons, Feather, MaterialIcons } from "@expo/vector-icons";
import React, { Component, useState } from "react";
import { Pressable, ScrollView, Switch } from "react-native";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function SettingSearchHistory() {
  const [isEnabledAccess, setIsEnabledAccess] = useState(false);
  const toggleSwitchAccess = () =>
    setIsEnabledAccess((previousState) => !previousState);

  const [isEnabledContract, setIsEnabledContract] = useState(false);
  const toggleSwitchSaveContract = () =>
    setIsEnabledContract((previousState) => !previousState);

  const [isEnabledSaveKey, setIsEnabledSaveKey] = useState(false);
  const toggleSwitchSaveSaveKey = () =>
    setIsEnabledSaveKey((previousState) => !previousState);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.header_item}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="keyboard-backspace" size={20} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 14, fontWeight: "500", padding: 10 }}>
          Chỉnh sửa lịch sử tìm kiếm
        </Text>
      </View>
      <View
        style={{
          borderBottomWidth: 7,
          borderColor: "gray",
          height: 40,
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 14, padding: 10 }}>Hiện truy cập nhanh</Text>
        <Switch
          style={{
            alignSelf: "center",
            justifyContent: "center",
            height: 20,
            marginRight: 10,
            width: 40,
          }}
          trackColor={{ false: "#767577", true: "blue" }}
          thumbColor={isEnabledAccess ? "white" : "white"}
          onValueChange={toggleSwitchAccess}
          value={isEnabledAccess}
        />
      </View>
      <View style={{ width: "100%" }}>
        <Text style={{ fontSize: 14, fontWeight: "bold", padding: 10 }}>
          Lịch sử tìm kiếm
        </Text>
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: "gray",
            height: 40,
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 14, padding: 10 }}>Lưu liên hệ đã tìm</Text>
          <Switch
            style={{
              alignSelf: "center",
              justifyContent: "center",
              height: 20,
              marginRight: 10,
              width: 40,
            }}
            trackColor={{ false: "#767577", true: "blue" }}
            thumbColor={isEnabledContract ? "white" : "white"}
            onValueChange={toggleSwitchSaveContract}
            value={isEnabledContract}
          />
        </View>
      </View>
      <view style={{ width: "100%" }}>
        <View
          style={{
            height: "auto ",
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 14, padding: 10 }}>
            Lưu từ khóa đã tìm kiếm
          </Text>
          <Switch
            style={{
              alignSelf: "center",
              justifyContent: "center",
              height: 20,
              marginRight: 10,
              width: 40,
            }}
            trackColor={{ false: "#767577", true: "blue" }}
            thumbColor={isEnabledSaveKey ? "white" : "white"}
            onValueChange={toggleSwitchSaveSaveKey}
            value={isEnabledSaveKey}
          />
        </View>
        <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
          <EvilIcons name="search" size={20} color="#9B9B9B" />          
          <Text style={{marginLeft:15}} numberOfLines={1} >Hoang</Text>
          <Feather  name='x' size={15} color="#9B9B9B"  style={{position:"absolute",right:10}}/>  
        </View>
        <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
          <EvilIcons name="search" size={20} color="#9B9B9B" />          
          <Text style={{marginLeft:15}} numberOfLines={1} >Hoang</Text>
          <Feather  name='x' size={15} color="#9B9B9B"  style={{position:"absolute",right:10}}/>  
        </View>
        <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
          <EvilIcons name="search" size={20} color="#9B9B9B" />          
          <Text style={{marginLeft:15}} numberOfLines={1} >Hoang</Text>
          <Feather  name='x' size={15} color="#9B9B9B"  style={{position:"absolute",right:10}}/>  
        </View>
      </view>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  header_item: {
    flexDirection: "row",
    alignItems: "center",
    width: 30,
    justifyContent: "center",
  },
  header: {
    backgroundColor: "#e9e9e9",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 8,
    height: 50,
    width: "100%",
  },
});
