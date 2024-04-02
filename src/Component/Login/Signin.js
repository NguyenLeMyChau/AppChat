import { AntDesign } from '@expo/vector-icons';
import { useContext, useState } from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import { StyleSheet, View ,Text} from 'react-native';
import { AuthContext } from './AuthProvider';

export default function Signin({navigation}) {
  const [phone,setphone] = useState('');
  const [password,setPassword]=useState('');
  const [isFocus,setIsfocus]  =useState(false);
  const {login} = useContext(AuthContext);
  const handleFocus = () => {
    setIsfocus(true);
  }
  const handleBlur = () => {
    setIsfocus(false);
  }
  const [passwordFocus,setpasswordfocus]  =useState(false);
  const handlePasswordFocus = () => {
    setpasswordfocus(true);
  }
  const handlePasswordBlur = () => {
    setpasswordfocus(false);
  }
   const handleLogin = async () => {
     try {
      
       const response = await fetch('http://localhost:4000/login', {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json'
         },
           body: JSON.stringify({  phone, password })
       });

       const data = await response.json();
       if (data.success) {
           login(data.user);
           navigation.navigate('BottomTab');
       } else {  
           alert(data.message);
       }
   } catch (error) {
       console.error('Error handling login:', error);
       alert('Đã xảy ra lỗi khi đăng nhập');
   }
   };
 
  return (
    <View style={styles.container}>
     <Text style={styles.title}>Vui lòng nhập số điện thoại và mật khẩu để đăng nhập</Text>
     <View style={{width:'90%'}}>
        <TextInput
            style={[styles.txtphone,isFocus? styles.txtphonefocus:null]}
            placeholder="Số điện thoại"
            onFocus={handleFocus}
            onBlur={handleBlur}
            maxLength={10}
            keyboardType='phone-pad'
            onChangeText={(text) => setphone(text)}
            underlineColorAndroid="transparent"
        />

        <TextInput
            style={[styles.txtphone,passwordFocus? styles.txtphonefocus:null]}
            placeholder="Mật khẩu"
            onFocus={handlePasswordFocus}
            onBlur={handlePasswordBlur}
            onChangeText={(text) => setPassword(text)}
            underlineColorAndroid="transparent"
            secureTextEntry={true}
        />  
     </View>
     <TouchableOpacity style={styles.btnForgetPass} onPress={()=>navigation.navigate('BottomTab')}>
        Lấy lại mật khẩu
     </TouchableOpacity>
     <View style={styles.confirm}>
      <TouchableOpacity style={styles.btnQuestion} onPress={()=>navigation.navigate('HomeLogin')}>
        <Text style={{color:'gray',fontSize:16}}>Câu hỏi thường gặp
        <AntDesign name="right" size={15} color="black"/>
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnconfirm} onPress={handleLogin}>
      <AntDesign name="arrowright" size={25} color="white"/>
      </TouchableOpacity>
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
  title:{
    width: '90%',
    alignItems:'flex-start',
    fontSize:16,
  },
  txtphone:{
    borderBottomWidth:1,
    fontSize:20,
    color:'gray',
    padding:10
  },
  txtphonefocus:{
    borderBottomColor:'blue',
    color:'blue',
  },
  btnForgetPass:{
    marginTop:5,
    width:"90%",
    height:40,
    color:'blue',
    fontSize:18,
    fontWeight:'bold'
  },
  btnQuestion:{
    color:'gray',
    fontSize:18,
  },
  confirm:{
    width:"90%",
    justifyContent:'space-between',
    flexDirection:'row',
    alignItems:'center'
  },
  btnconfirm:{
    backgroundColor:'gray',
    borderRadius:'50%',
    width:50,
    height:50,
    alignItems:'center',
    justifyContent:'center'
  },
});