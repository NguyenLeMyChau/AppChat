import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import zalo from '/assets/loginzalo1.jpg';


export default function HomeLoginZalo({navigation}) {
  const [language, setLanguage] = useState('VN');
  const handleLanguage = (lan) => {
    setLanguage(lan);
  };
  return (
    <View style={styles.container}>

      <Image source={zalo} style={{ width: "100%", height: 200, position: "absolute", top: "30%"}} />

      <View style={styles.bottom}>
        <TouchableOpacity style={styles.btnLogin} onPress={() =>{navigation.navigate("Signin")}}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>
            {language === 'VN' ? 'Đăng nhập' : 'Login'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnRegister} onPress={() =>{navigation.navigate("Register")}}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>
            {language === 'VN' ? 'Đăng ký' : 'Register'}
          </Text>
        </TouchableOpacity>

        <View style={styles.fillerLanguage}>
          <TouchableOpacity style={language === 'VN' ? styles.btnLanguageSelected : null} onPress={() => handleLanguage('VN')}>
            <Text style={[styles.txtLanguage, language === 'VN' ? styles.txtLanguageSelected : null]}>
              Tiếng Việt
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={language === 'EN' ? styles.btnLanguageSelected : null} onPress={() => handleLanguage('EN')}>
            <Text style={[styles.txtLanguage, language === 'EN' ? styles.txtLanguageSelected : null]}>
              Tiếng Anh
            </Text>
          </TouchableOpacity>
        </View>
      </View>



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  btnLogin: {
    width: 300,
    height: 50,
    color: 'white',
    backgroundColor: '#0290fe',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnRegister: {
    width: 300,
    height: 50,
    color: 'white',
    backgroundColor: '#f4f1f1',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  fillerLanguage: {
    width: 300,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  txtLanguage: {
    fontSize: 16,
  },
  txtLanguageSelected: {
    fontWeight: 'bold'
  },
  btnLanguageSelected: {
    borderBottomWidth: 2,
  },
  bottom: {
    position: 'absolute', // Đặt vị trí cố định
    bottom: 0, // Đặt ở cuối màn hình
    padding: 10, // Padding để tạo khoảng cách giữa phần tử và mép màn hình
  }
});