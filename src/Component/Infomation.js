import React from 'react';
import { StyleSheet, View, ImageBackground, Text, Dimensions, TouchableOpacity, TextInput, Image } from 'react-native';
import { AntDesign, Entypo,EvilIcons  } from "@expo/vector-icons";
import { ScrollView } from 'react-native-web';
import Tombackground from './assets/Tombackground.jpg';
import avt from './assets/AnexanderTom.jpg';

export default function App() {
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity>
        <ImageBackground source={Tombackground} style={styles.background}>
          <View style={styles.header}>
            <TouchableOpacity>
              <AntDesign name='left' size={25} color='white' />
            </TouchableOpacity>
            <View style={styles.flexEndContainer}>
              <View style={styles.row}>
                <TouchableOpacity>
                  <Entypo name='clock' size={25} color='white' style={styles.clock} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Entypo name='dots-three-horizontal' size={25} color='white' />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity style={styles.avtContainer}>
        <Image source={avt} style={styles.avt} />
      </TouchableOpacity>
      <View style={styles.middle}>
        <Text style={styles.bold}>Tom Anexander</Text>
          <TouchableOpacity>
            <EvilIcons name='pencil' size={25} color='#1B80D4'>
                <Text style={styles.nor}>Cập nhật giới thiệu bản thân</Text>
            </EvilIcons>
          </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.bottomButton}>
        <Text style={styles.white}>Đăng lên Nhật ký</Text>
      </TouchableOpacity>
  
    </ScrollView>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width: windowWidth,
    height: 200,
    resizeMode: 'cover',
    zIndex: 1,
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flexEndContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: 10,
  },
  clock: {
    marginRight: 20,
  },
  middle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    top: 70
  },
  avtContainer: {
    position: 'absolute',
    top: 110,
    left: windowWidth / 2 - 80, // Trung tâm màn hình - nửa chiều rộng của ảnh
    zIndex: 2,
  },
  avt: {
    width: 160,
    height: 160,
    borderRadius: 80,
  },
  bold: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  nor: {
    fontSize: 18
  },
  white:{
    fontSize: 18,
    color: 'white'
  },
  bottomButton: {
    position: 'absolute',
    top: 600,
    alignSelf: 'center',
    backgroundColor: '#356AF5',
    paddingVertical: 10, // Kích thước dọc của nút
    paddingHorizontal: 20, // Kích thước ngang của nút
    borderRadius: 20, // Độ cong góc của nút,
    zIndex: 2,
    
  }
});
