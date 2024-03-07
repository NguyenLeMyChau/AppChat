import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import search from '../assets/search.png';
import adduser from '../assets/adduser.png';
import loimoiketban from '../assets/loimoiketban.png';
import danhba from '../assets/danhba.png';
import lichsinhnhat from '../assets/lichsinhnhat.png';

export default function App() {
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity>
          <Image style={styles.icon} source={search} />
        </TouchableOpacity>
        <TextInput style={styles.textwhite} placeholder='Tìm kiếm'></TextInput>
        <View style={styles.flexEndContainer}>
          <TouchableOpacity>
            <Image source={adduser} style={styles.img25} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.body}>
        <TouchableOpacity>
          <View style={styles.group}>
            <Image source={loimoiketban} style={styles.img} />
            <Text style={styles.nobold}>Lời mời kết bạn </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <TouchableOpacity>
          <View style={styles.group}>
            <Image source={danhba} style={styles.img} />
            <View style={styles.column}>
              <Text style={styles.nobold}>Danh bạ máy </Text>
              <Text style={styles.text300}>Liên hệ có dùng Zalo</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <TouchableOpacity>
          <View style={styles.group}>
            <Image source={lichsinhnhat} style={styles.img} />
            <View style={styles.column}>
              <Text style={styles.nobold}>Lịch sinh nhật </Text>
              <Text style={styles.text300}>Theo dõi sinh nhật của bạn bè</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>




    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#15A0EE',
  },
  icon: {
    width: 25,
    height: 25,
    alignItems: 'left',
    justifyContent: 'left',
    margin: 10,
  },
  flexEndContainer: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginRight: 10,
  },
  img25: {
    width: 25,
    height: 25,
    margin: 10,
  },
  img: {
    width: 40,
    height: 40,
    margin: 10,
  },
  imgmini: {
    width: 25,
    height: 25,
    margin: 25,
  },
  menu: {
    width: 15,
    height: 15,
    alignItems: 'left',
    justifyContent: 'left',
    margin: 20,
  },
  text300:{
    fontSize: 20,
    margin: 10,
    fontWeight: '300',

  },
  textwhite: {
    fontSize: 16,
    margin: 10,
    color: 'white',
  },
  text: {
    fontSize: 16,
    marginLeft: 10,
  }, 
  text30010: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '300',
  }, 
  textblue: {
    fontSize: 16,
    margin: 10,
    color: '#15A0EE',
    fontWeight: 'bold',
  }, 
  body: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  avt: {
    width: 80,
    height: 80,
    borderRadius: 40,
    margin: 10,
  },
  textInput: {
    fontSize: 20,
    margin: 10,
  },
  nor: {
    fontSize: 14,
    margin: 10,
  },
  group: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  bold:{
    fontSize: 16,
    margin: 10,
    fontWeight: 'bold',
  },
  nobold:{
    fontSize: 20,
    margin: 10,
    fontWeight: '500',
  },
  column:{
    flexDirection:'column',
    flex: 1,
  }
});
