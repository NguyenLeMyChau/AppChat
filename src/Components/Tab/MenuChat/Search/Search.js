import { AntDesign, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable } from 'react-native';
import { TouchableOpacity } from 'react-native';

export default function Search  ({navigation}){  
    const textInputRef = useRef(null);  
    useEffect(()=> {textInputRef.current.focus()},[]);
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.header_item}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="keyboard-backspace" size={20} color="white" />
          </TouchableOpacity>
          <TextInput
            style={{
              height: 40,
              borderColor: "blue",
              borderWidth: "0",
              paddingHorizontal: 10,
              width: "80%",
              color: "gray",
              backgroundColor: "white",
              marginRight: 10,
              borderRadius: 10,
            }}
            ref={textInputRef}
            placeholder="Tìm kiếm"
          />
          <TouchableOpacity style={styles.header_item}>
            <MaterialCommunityIcons
              name="qrcode-scan"
              size={20}
              color="white"
            />
          </TouchableOpacity>
        </View>
        <ScrollView style={{ backgroundColor: "white", width: "100%" }}>
          <View style={{ borderBottomWidth: 0.1, height: 120 }}>
            <Text style={{ fontSize: 14, fontWeight: "bold", padding: 10 }}>
              Truy cập nhanh
            </Text>
            <View style={{flexDirection:'row'}}>
              <Pressable
                style={{ justifyContent: "flex-start", alignItems: "center",paddingLeft:15 }}
              >
                <View
                  style={{
                    borderRadius: 50,
                    padding: 10,
                    backgroundColor: "#e9e9e9",
                  }}
                >
                  <AntDesign name="plus" size={20} color="blue" />
                </View>
                <Text style={{ marginTop: 5, fontSize: 14 }}>Thêm</Text>
              </Pressable>
            </View>          
          </View>
          <View>
            <TouchableOpacity onPress={()=>navigation.navigate("ChinhSuaLichSuTimKiem")}>
                <Text style={{color:'blue',fontSize:14,padding:10}}>Chỉnh sửa lịch sử tìm kiếm &#62;</Text>
            </TouchableOpacity>
          </View>
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
      header_item:{
        flexDirection: 'row',
        alignItems: 'center',
        width:30,
        justifyContent:'center',
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
  })
  