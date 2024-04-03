
import { AntDesign, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import { StyleSheet, View ,Button,Text} from 'react-native';
import { Image } from 'react-native';


export default function Register({navigation}) {
  const [name,setName] = useState('');
  const [error, setError] = useState('');
  const handleLogin = async () => {
    // try {
    //   const response = await fetch('http://localhost:3000/User'); // URL của JSON Server
    //   const users = await response.json();

    //   const user = users.find(
    //     (user) => user.email === email && user.password === pass
    //   );

    //   if (user) {
    //     Alert.alert('Lỗi', 'Đã tồn tại');
        
    //   } else {
    //     navigation.navigate('HomeStack');
    //   }
    // } catch (error) {
    //   console.error('Error handling login:', error);
    //   Alert.alert('Lỗi', 'Đã xảy ra lỗi khi xử lý đăng nhập');
    // }
  };
 
  return (
    <View style={styles.container}>
      <View style={{
        flexDirection: "row", alignItems: 'center', width: "100%",backgroundImage: 'linear-gradient(90deg, #006AF5 30%, #5ac8fa 100%)',
        paddingHorizontal: 16,
        paddingVertical: 8,
      }}>
           <MaterialIcons
            onPress={() => navigation.goBack()}
            name="keyboard-backspace"
            size={20}
            color="white"
          />
          <Text style={{ fontSize: 20,color:'white', padding: 10 ,marginLeft:10}}>
            Tạo tài khoản
          </Text>
      </View>
      <View style={{padding:10}}>
        <Text style={{fontSize:16,color:'black',padding:15,fontWeight:'bold'}}>Tên Zalo</Text>
        <TextInput
           placeholder="Gồm 2-40 kí tự"
          onChangeText={(text)=>setName(text)}
          value={name}
          maxLength={40}
          autoCapitalize='none'
          style={{padding:10,borderBottomWidth:2, color:'gray', width:'100%',height:50,fontSize:14}}
          />      
      </View>
      <View style={{padding:10}}>
        <Text style={{fontSize:14}}>Sử dụng tên thật giúp bạn bè dễ dàng nhận ra bạn</Text>
      </View>

      <TouchableOpacity style={{borderRadius:'50%',backgroundColor:'#C7C7C7',width:50,height:50,alignItems:'center',justifyContent: 'center',right:20,bottom:20,position:'absolute'}} 
      onPress={()=>navigation.navigate('Register_SDT',{name})}>
          <AntDesign
            name="arrowright"
            size={25}
            color="white"
          />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
},
Area:{
  width:'90%',
  alignItems:'center',
  justifyContent: 'center',
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
