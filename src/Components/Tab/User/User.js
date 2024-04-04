import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { AntDesign, MaterialCommunityIcons, SimpleLineIcons, Entypo, Feather } from "@expo/vector-icons";
import avt from '/assets/AnexanderTom.jpg';
import Header from '../../Head/Header';

<<<<<<< HEAD
export default function User() {
=======
export default function User({navigation}) {
>>>>>>> Hoang
  return (
    <ScrollView style={styles.container}>

      <View style={{
        flexDirection: "row", alignItems: 'center', width: "100%"
      }}>
        <Header />
<<<<<<< HEAD
        <TouchableOpacity style={{ marginLeft: -45 }}>
=======
        <TouchableOpacity style={{ marginLeft: -45 }} onPress={()=> navigation.navigate('Setting')} >
>>>>>>> Hoang
          <AntDesign name='setting' size={25} color='white' ></AntDesign>
        </TouchableOpacity>

      </View>

      <View style={styles.user}>
<<<<<<< HEAD
        <TouchableOpacity>
=======
        <TouchableOpacity onPress={()=>navigation.navigate('InformationUser')}>
>>>>>>> Hoang
          <View style={styles.user}>
            <Image style={styles.avt} source={avt} />
            <View style={styles.columnText}>
              <Text style={styles.bold}>Tom Anexander</Text>
              <Text style={styles.nor}>Xem trang cá nhân</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={[styles.flexEndContainer, styles.iconRightContainer]}>
          <TouchableOpacity>
            <MaterialCommunityIcons name='account-sync-outline' size={30} style={styles.icon}></MaterialCommunityIcons>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          borderBottomColor: '#e3e3e3',
          borderBottomWidth: 7, // Độ dày của đường gạch ngang
          width: '100%', // Chiều rộng của gạch ngang
        }} />

      <TouchableOpacity>
        <View style={styles.Body}>
          <Feather name='music' style={styles.icon} size={30} />
          <View style={styles.columnText}>
            <Text style={styles.bold}>Nhạc chờ Zalo</Text>
            <Text style={styles.nor}>Đăng ký nhạc chờ, thể hiện cá tính</Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <View style={styles.Body}>
          <Entypo name='wallet' style={styles.icon} size={30}></Entypo>
          <View style={styles.columnText}>
            <Text style={styles.bold}>Ví QR</Text>
            <Text style={styles.nor}>Lưu trữ và xuất trình các mã QR quan trọng</Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <View style={{ ...styles.Body, borderBottomWidth: 0 }}>
          <Entypo name='icloud' style={styles.icon} size={30} />
          <View style={styles.columnText}>
            <Text style={styles.bold}>Cloud của tôi</Text>
            <Text style={styles.nor}>Lưu trữ các tin nhắn quan trọng</Text>
          </View>
          <View style={styles.flexEndContainer}>
            <AntDesign name='right' size={16} color='gray' />
          </View>
        </View>
      </TouchableOpacity>

      <View
        style={{
          borderBottomColor: '#e3e3e3',
          borderBottomWidth: 7, // Độ dày của đường gạch ngang
          width: '100%', // Chiều rộng của gạch ngang
        }} />

      <TouchableOpacity>
        <View style={{ ...styles.Body, borderBottomWidth: 0 }}>
          <Feather name='clock' style={styles.icon} size={30} />
          <View style={styles.columnText}>
            <Text style={styles.bold}>Dung lượng và dữ liệu</Text>
            <Text style={styles.nor}>Quản lý dữ liệu Zalo của bạn</Text>
          </View>
          <View style={styles.flexEndContainer}>
            <AntDesign name='right' size={16} color='gray' />
          </View>
        </View>
      </TouchableOpacity>

      <View
        style={{
          borderBottomColor: '#e3e3e3',
          borderBottomWidth: 7, // Độ dày của đường gạch ngang
          width: '100%', // Chiều rộng của gạch ngang
        }} />

      <TouchableOpacity>
        <View style={styles.Body}>
          <Entypo name='shield' style={styles.icon} size={30} />
          <View style={styles.columnText}>
            <Text style={styles.bold}>Tài khoản và bảo mật</Text>
            <View style={[styles.flexEndContainer, styles.iconRightContainer]}>
              <AntDesign name='right' size={16} color='gray' />
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
      <View style={{...styles.Body, borderBottomWidth: 0}}>
          <AntDesign name='lock' style={styles.icon} size={30} />
          <View style={styles.columnText}>
            <Text style={styles.bold}>Quyền riêng tư</Text>
            <View style={[styles.flexEndContainer, styles.iconRightContainer]}>
              <AntDesign name='right' size={16} color='gray' />
            </View>
          </View>
        </View>
      </TouchableOpacity>


    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header_icon: {
    color: 'white',
  },
  flexEndContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: 10
  },
  flexEnd: {
    alignItems: 'flex-end',
  },
  icon: {
    color: '#15A0EE',
  },
  textInputContainer: {
    flex: 1,
    backgroundColor: 'blue',
    borderRadius: 5,
    marginLeft: 10,
  },
  textInput: {
    fontSize: 18,
    color: 'white',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  Body: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    padding: 10,
    marginTop: 5
  },
  avt: {
    width: 60,
    height: 60,
    borderRadius: 30,
    margin: 10,
  },
  bold: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 10
  },
  columnText: {
    flexDirection: 'column',
    flex: 1,
  },
  nor: {
    fontSize: 14,
    paddingLeft: 10
  },
  iconRightContainer: {
    position: 'absolute',
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    marginRight: 10
  },
});
