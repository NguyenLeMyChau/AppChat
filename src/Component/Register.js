import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import { StyleSheet, View ,Button,Text} from 'react-native';
import { Image } from 'react-native';
export default function Register({navigation}) {
  const [email,setEmail] = useState('');
  const [pass,setPass]=useState('');
  const [error, setError] = useState('');
  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/User'); // URL của JSON Server
      const users = await response.json();

      const user = users.find(
        (user) => user.email === email && user.password === pass
      );

      if (user) {
        Alert.alert('Lỗi', 'Đã tồn tại');
        
      } else {
        navigation.navigate('HomeStack');
      }
    } catch (error) {
      console.error('Error handling login:', error);
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi xử lý đăng nhập');
    }
  };
 
  return (
    <View style={styles.container}>
      <a href='#' >X</a>
      <View style={{width:'100%',height:200,alignItems:'center',justifyContent:'center'}}>
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
      <View style={styles.TextInput}>
        <MaterialCommunityIcons name='lock' size={24} color="black"/>
        <TextInput
           style={styles.input}
           placeholder="Xác nhận mật khẩu"
           secureTextEntry
           onChangeText={(text) => setPass(text)}
        />
      </View>
    </View>
      <View style={styles.Button}>
      <TouchableOpacity style={styles.dangKy} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.buttonText}>Đăng ký</Text>
      </TouchableOpacity>   
      <View style={styles.btnQuenMK}>
      </View>      
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
},
Area:{
  width:'90%',
},
  TextInput: {
    width:'90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderColor: 'gray',
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
  dangKy:{
    backgroundColor: '#6DB9EF',
    padding:5,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});