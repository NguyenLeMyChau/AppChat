import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import search from '../assets/search.png';
import setting from '../assets/setting.png';
import avt from '../assets/AnexanderTom.jpg';
import change from '../assets/change.png';
import wallet from '../assets/wallet.png';
import music from '../assets/music.png';
import right from '../assets/right.png';
import cloud from '../assets/cloud.png';
import data from '../assets/data.png';
import security from '../assets/security.png';
import padlock from '../assets/padlock.png';

export default function App() {
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity>
          <Image style={styles.icon} source={search} />
        </TouchableOpacity>
        <TextInput style={styles.text} placeholder='Tìm kiếm' />
        <View style={styles.flexEndContainer}>
          <TouchableOpacity>
            <Image source={setting} style={styles.img} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.Body}>
        <Image style={styles.avt} source={avt}/>
        <View style={styles.columnText}>
          <Text style={styles.bold}>Tom Anexander</Text>
          <Text style={styles.nor}>Xem trang cá nhân</Text>
        </View>
        <View style={styles.flexEndContainer}>
          <TouchableOpacity>
            <Image source={change} style={styles.img} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.Body}>
        <Image source={wallet} style={styles.icon}/>
        <View style={styles.columnText}>
          <Text style={styles.bold}>Ví QR</Text>
          <Text style={styles.nor}>Lưu trữ và xuất trình các mã QR quan trọng</Text>
        </View>
        <View style={styles.flexEndContainer}>
          <TouchableOpacity>
            <Image source={right} style={styles.img} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.Body}>
        <Image source={music} style={styles.icon}/>
        <View style={styles.columnText}>
          <Text style={styles.bold}>Nhạc chờ Zalo</Text>
          <Text style={styles.nor}>Đăng ký nhạc chờ, thể hiện cá tính</Text>
        </View>
        <View style={styles.flexEndContainer}>
          <TouchableOpacity>
            <Image source={right} style={styles.img} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.Body}>
        <Image source={cloud} style={styles.icon}/>
        <View style={styles.columnText}>
          <Text style={styles.bold}>Cloud của tôi</Text>
          <Text style={styles.nor}>Lưu trữ các tin nhắn quan trọng</Text>
        </View>
        <View style={styles.flexEndContainer}>
          <TouchableOpacity>
            <Image source={right} style={styles.img} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.Body}>
        <Image source={data} style={styles.icon}/>
        <View style={styles.columnText}>
          <Text style={styles.bold}>Dung lượng và dữ liệu</Text>
          <Text style={styles.nor}>Quản lý dữ liệu Zalo của bạn</Text>
        </View>
        <View style={styles.flexEndContainer}>
          <TouchableOpacity>
            <Image source={right} style={styles.img} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.Body}>
        <Image source={security} style={styles.icon}/>
        <Text style={styles.bold}>Tài khoản và bảo mật</Text>
        <View style={styles.flexEndContainer}>
          <TouchableOpacity>
            <Image source={right} style={styles.img} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.Body}>
        <Image source={padlock} style={styles.icon}/>
        <Text style={styles.bold}>Quyền riêng tư</Text>
        <View style={styles.flexEndContainer}>
          <TouchableOpacity>
            <Image source={right} style={styles.img} />
          </TouchableOpacity>
        </View>
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
    alignItems: 'flex-end',
    marginRight: 10,
    justifyContent: 'center',
  },
  img: {
    width: 25,
    height: 25,
  },
  text: {
    fontSize: 16,
    margin: 10,
    color: 'white',
  },
  Body: {
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
  bold: {
    fontSize: 16,
    margin: 10,
    fontWeight: 'bold',
  },
  columnText: {
    flexDirection: 'column',
    flex: 1, // Đảm bảo text chiếm phần còn lại của row
  },
  nor: {
    fontSize: 14,
    margin: 10,
  },
});
