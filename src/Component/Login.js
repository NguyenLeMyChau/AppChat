import { AntDesign } from '@expo/vector-icons';
import { useContext, useState } from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import { StyleSheet, View ,Text} from 'react-native';
import { AuthContext } from '../Login/AuthProvider';

export default function Signin({navigation}) {
  const [sdt,setSDT] = useState('');
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
    //  try {
    //    const response = await fetch('https://65530f285449cfda0f2e0c90.mockapi.io/api/v1/users'); 
    //    const users = await response.json();
    //    const user = users.find(
    //      (user) => user.sdt === sdt && user.password === password
    //  );

    //    if (user) {
    //     login(user);
    //      navigation.navigate('BottomTab');
    //    } else {
    //      alert('Lỗi', 'Sai sdt hoặc mật khẩu');
    //   }
    //  } catch (error) {
    //    console.error('Error handling login:', error);
    //    alert('Lỗi Sai sdt hoặc mật khẩu');
    //  }
    navigation.navigate('BottomTab');
  };
 
  return (
    <View style={styles.container}>
     <Text style={styles.title}>Vui lòng nhập số điện thoại và mật khẩu để đăng nhập</Text>
     <View style={{width:'90%'}}>
        <TextInput
            style={[styles.txtSDT,isFocus? styles.txtSDTfocus:null]}
            placeholder="Số điện thoại"
            onFocus={handleFocus}
            onBlur={handleBlur}
            maxLength={10}
            keyboardType='phone-pad'
            onChangeText={(text) => setSDT(text)}
            underlineColorAndroid="transparent"
        />

        <TextInput
            style={[styles.txtSDT,passwordFocus? styles.txtSDTfocus:null]}
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
  txtSDT:{
    borderBottomWidth:1,
    fontSize:20,
    color:'gray',
    padding:10
  },
  txtSDTfocus:{
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