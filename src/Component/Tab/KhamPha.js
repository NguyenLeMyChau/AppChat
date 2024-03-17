import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import Header from '../header/Header';
import { AntDesign, MaterialCommunityIcons, SimpleLineIcons } from "@expo/vector-icons";

// import search from '../assets/search.png';
// import QR from '../assets/QR.png';
// import menu from '../assets/Menu.png';
// import zalovideo from '../assets/zalovideo.png';
// import fiza from '../assets/fiza.png';
// import zalopay from '../assets/zalopay.png';
// import service from '../assets/service.png';
// import mp3 from '../assets/mp3.png';
// import work from '../assets/work.png';
// import phone from '../assets/phone.png';
// import xemthem from '../assets/XemThem.png';
// import AI from '../assets/AI.png';
// import TienLen from '../assets/TienLen.png';
// import tulokho from '../assets/tulokho.png';
// import poker from '../assets/poker.png';
// import right from '../assets/right.png';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={{
        flexDirection: "row", alignItems: 'center', width: "100%"
      }}>
        <Header />
          <TouchableOpacity style={{marginLeft: -45}}>
            <MaterialCommunityIcons name="qrcode-scan" size={25} color="white" />
          </TouchableOpacity>
      </View>

      {/* <View style={styles.header}>
        <TouchableOpacity>
          <Image style={styles.icon} source={search} />
        </TouchableOpacity>
        <TextInput style={styles.textwhite} placeholder='Tìm kiếm'></TextInput>
        <View style={styles.flexEndContainer}>
          <TouchableOpacity>
            <Image source={QR} style={styles.img25} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.body}>
        <TouchableOpacity>
          <Image style={styles.menu} source={menu} />
        </TouchableOpacity>
          <Text style={styles.nobold}>Mini Apps yêu thích</Text>

        <View style={styles.flexEndContainer}>
          <TouchableOpacity>
           <Text style={styles.textblue}>Chỉnh sửa</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.column}>
            <TouchableOpacity>
              <Image style={styles.img} source={zalovideo} />
              <Text style={styles.text}>Zalo Video</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.column}>
            <TouchableOpacity>
              <Image style={styles.img} source={fiza} />
              <Text style={styles.text}>Fiza</Text>
            </TouchableOpacity>
        </View>
        
        <View style={styles.column}>
            <TouchableOpacity>
              <Image style={styles.img} source={zalopay} />
              <Text style={styles.text}>ZaloPay</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.column}>
            <TouchableOpacity>
              <Image style={styles.img} source={service} />
              <Text style={styles.text}>Dịch vụ công</Text>
            </TouchableOpacity>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.column}>
            <TouchableOpacity>
              <Image style={styles.img} source={mp3} />
              <Text style={styles.text}>Mp3</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.column}>
            <TouchableOpacity>
              <Image style={styles.img} source={work} />
              <Text style={styles.text}>Tìm việc</Text>
            </TouchableOpacity>
        </View>
        
        <View style={styles.column}>
            <TouchableOpacity>
              <Image style={styles.img} source={phone} />
              <Text style={styles.text}>Nạp tiền điện thoại</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.column}>
            <TouchableOpacity>
              <Image style={styles.img} source={xemthem} />
              <Text style={styles.text}>Xem thêm</Text>
            </TouchableOpacity>
        </View>
      </View>

      <View style={styles.body}>
          <Text style={styles.text300}>Sử dụng gần đây</Text>
      </View>


      <View style={styles.body}>
        <View style={styles.column}>
            <TouchableOpacity>
              <Image style={styles.img} source={AI} />
              <Text style={styles.text}>AI Avatar</Text>
              <Text style={styles.text30010 }>Gợi ý</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.column}>
            <TouchableOpacity>
              <Image style={styles.img} source={TienLen} />
              <Text style={styles.text}>Tiến Lên</Text>
              <Text style={styles.text30010 }>Gợi ý</Text>
            </TouchableOpacity>
        </View>
        
        <View style={styles.column}>
            <TouchableOpacity>
              <Image style={styles.img} source={tulokho} />
              <Text style={styles.text}>Tú Lơ Khơ</Text>
              <Text style={styles.text30010 }>Gợi ý</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.column}>
            <TouchableOpacity>
              <Image style={styles.img} source={poker} />
              <Text style={styles.text}>Poker</Text>
              <Text style={styles.text30010 }>Gợi ý</Text>
            </TouchableOpacity>
        </View>
      </View>

      <View style={styles.body}>
        <Image style={styles.imgmini} source={zalovideo}></Image>
        <Text style={styles.nobold}>Zalo Video</Text>
        <Text style={styles.text30010}>Gợi ý cho bạn</Text>
        
        <View style={styles.flexEndContainer}>
          <TouchableOpacity>
            <Image source={right} style={styles.img25} />
          </TouchableOpacity>
        </View>
      </View> */}


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
  text300: {
    fontSize: 16,
    margin: 20,
    fontWeight: '200',

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
    borderRightWidth: 1,
    flex: 1,
  },
  bold: {
    fontSize: 16,
    margin: 10,
    fontWeight: 'bold',
  },
  nobold: {
    fontSize: 16,
    margin: 10,
    fontWeight: '500',
  },
  column: {
    flexDirection: 'column',
    flex: 1,
  }
});
