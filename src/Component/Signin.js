import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import { Alert } from 'react-native';
import { StyleSheet, View ,Text} from 'react-native';
import { Image } from 'react-native';
export default function Signin({navigation}) {
  const [email,setEmail] = useState('');
  const [pass,setPass]=useState('');
  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/User'); // URL của JSON Server
      const users = await response.json();
      const user = users.find(
        (user) => user.email === email && user.password === pass
      );

      if (user) {
        await AsyncStorage.setItem('email',email);
        navigation.navigate('HomeStack');
      } else {
        alert('Lỗi', 'Sai email hoặc mật khẩu');
      }
    } catch (error) {
      console.error('Error handling login:', error);
      alert('Lỗi Sai email hoặc mật khẩu');
    }
  };
 
  return (
    <View style={styles.container}>
      <View  style={styles.title}>
        <View style={{ flexDirection: 'row',alignItems: 'center',}}>
          <TouchableOpacity style={styles.back}
            onPress={()=> navigation.navigate('HomeStack')} >
            <Image style={{width:'40px',height:'40px',marginLeft:10, justifyContent:'center'}} source={require("../assets/Icon Button 11.png")}/>
            </TouchableOpacity>
        </View> 
        </View>
      <View style={{width:'100%',height:150,alignItems:'center',justifyContent:'center'}}>
        <Image
        source={require('../assets/logo.png')}
        style={styles.logoImage}
        />
      </View>
      <View style={styles.Area}>
      <View style={styles.TextInput}>
        <MaterialCommunityIcons name='email' size={24} color="black"/>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
        /> 
      </View>
      <View style={styles.TextInput}>
        <MaterialCommunityIcons name='lock' size={24} color="black"/>
        <TextInput
           style={styles.input}
           placeholder="Mật khẩu"
           secureTextEntry
           onChangeText={(text) => setPass(text)}
        />
      </View>
    </View>
      <View style={styles.Button}>
      <TouchableOpacity style={styles.dangNhap} onPress={handleLogin}>
        <Text style={styles.buttonText}>Đăng nhập</Text>
      </TouchableOpacity>  
      <TouchableOpacity style={styles.dangKy} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.buttonText}>Đăng ký</Text>
      </TouchableOpacity>   
      <View style={styles.btnQuenMK}>
      <TouchableOpacity onPress={() => navigation.navigate('ResendEmail')}>
        <Text style={styles.link}>Gửi lại email kích hoạt</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.link}>Quên mật khẩu</Text>
      </TouchableOpacity>  
      </View>
      
      </View>
      
      <View style={styles.Text}>
        <Text>
          Khi bạn nhấn đăng nhập mặc nhiên được coi là đồng ý với <br/><a href='#'>Chính sách bảo mật </a>
          cùng <a href='#'>Điều khoản và điều kiện</a>    
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
},
title:{
  justifyContent: 'flex-start',
  alignItems: 'center',
  paddingHorizontal: 16,
  paddingVertical: 8,
  height:70,
  width:'100%',
  flexDirection:'row'
},
Area:{
  width:'90%',
},
  TextInput: {
    width:'90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderColor: 'black',
    padding: 15,
    borderBottomWidth:1
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    paddingLeft: 10,
  },
  Button:{
    
    justifyContent:'space-evenly',
    alignItems:'center',
    width:'90%',
    height:150
  },
  dangNhap:{
    backgroundColor: '#6DB9EF',
    padding:5,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  dangKy:{
    backgroundColor: 'black',
    padding:5,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  Text: {
    flex: 1,
    width:'90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  btnQuenMK:{
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between'
  },
  link: {
    color: 'white',
    textDecorationLine: 'underline',
  },
});