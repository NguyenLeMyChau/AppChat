import { useState } from 'react';

import { StyleSheet, View ,Text, TouchableOpacity} from 'react-native';
export default function HomeLoginZalo() {
  const [language,setLanguage] = useState('VN');
  const handleLanguage = (lan) => { 
    setLanguage(lan); 
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Zalo</Text>
      <View>
        <TouchableOpacity style={styles.btnLogin}>
          <Text style={{fontSize:20,fontWeight:'bold',color:'white'}}>
            {language === 'VN' ? 'Đăng nhập' : 'Login'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnRegister}>
          <Text style={{fontSize:20,fontWeight:'bold',color:'black'}}> 
            {language === 'VN' ? 'Đăng ký' : 'Register'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.fillerLanguage}>
        <TouchableOpacity style={language === 'VN' ? styles.btnLanguageSelected : null} onPress={()=> handleLanguage('VN')}>
          <Text style={[styles.txtLanguage,language === 'VN' ? styles.txtLanguageSelected : null]}>
            Tiếng Việt
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={language === 'EN' ? styles.btnLanguageSelected : null}  onPress={()=>  handleLanguage('EN')}>
          <Text style={[styles.txtLanguage,language === 'EN' ? styles.txtLanguageSelected : null]}>
            Tiếng Anh
          </Text>
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
    fontSize:48,
    color:'blue',
    fontWeight:'500',
  },
  btnLogin:{
    width:260,
    height:60,
    color:'white',
    backgroundColor:'#0290fe',
    borderRadius:50,
    alignItems:'center',
    justifyContent:'center',
  },
  btnRegister:{
    width:260,
    height:60,
    color:'white',
    backgroundColor:'#f4f1f1',
    borderRadius:50,
    alignItems:'center',
    justifyContent:'center',
    marginTop:20,
  },
  fillerLanguage:{
    width:300,
    height:60,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around'
  },
  txtLanguage:{
    fontSize:20,
  },
  txtLanguageSelected:{
    fontWeight:'bold'
  },
  btnLanguageSelected:{
    borderBottomWidth:2,
  },
});