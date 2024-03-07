import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { TextInput } from 'react-native';
import { StyleSheet, View ,Text} from 'react-native';
export default function ResendEmail() {
  const navigation= useNavigation();
  const [email,setEmail]=useState('');
  return (
    <View style={styles.container}>
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
          value={email}
        /> 
      </View>
    </View>

      <View style={styles.Button}>
      <TouchableOpacity style={styles.XacNhan} onPress={() => navigation.navigate('Signin')}>
        <Text style={styles.buttonText}>Gửi lại email kích hoạt</Text>
      </TouchableOpacity>  
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
  XacNhan:{
    backgroundColor: '#6DB9EF',
    padding:5,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
});