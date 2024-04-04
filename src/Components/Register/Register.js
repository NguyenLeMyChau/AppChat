
import { AntDesign, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useRef } from 'react';
import { useState } from 'react';
import { Alert, Modal, TextInput, TouchableOpacity } from 'react-native';
import { StyleSheet, View, Button, Text } from 'react-native';
import { Image } from 'react-native';
import OTPTextView from 'react-native-otp-textinput';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { OtpInput } from "react-native-otp-entry";
import axios from 'axios';



export default function Register({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [gender, setGender] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [otp, setOtp] = useState('');

  const options = [
    { label: 'Nam', value: false },
    { label: 'Nữ', value: true },
  ];


  const handleSendOTP = async () => {

    try {
      const response = await axios.post('http://localhost:4000/user/sendOTP', { email: email });
      const { data } = response; // data = response.data

      if (data.success) {
        console.log(data.otp);
        Alert.alert(data.message);
      } else {
        Alert.alert(data.message);
      }
    } catch (error) {
      console.error('Error send OTP:', error);

    }

  };

  const handleRegister = async () => {

    const userData = {
      name,
      email,
      password,
      gender,
      otp
    };

    const response = await axios.post('http://localhost:4000/user/signup', userData);
    console.log("dâta :",response);  
    const { data } = response;

    if (data.success) {
      Alert.alert(data.message);
      setModalVisible(false);
      navigation.navigate('Signin');
    } else {
      Alert.alert(data.message);
    }

  }

  const [isNameValid, setIsNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPassValid, setIsPassValid,] = useState(true);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);


  const handleCheckName = (text) => {
    setName(text);
    if (text.length >= 2 && text.length <= 40) {
      setIsNameValid(true);
    } else {
      setIsNameValid(false);
    }
  };


  const handleCheckEmail = (text) => {
    setEmail(text);
    if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)){
      setIsEmailValid(true);
    }
    else {
      setIsEmailValid(false);
    }
  };

  const handleCheckPass = (text) => {
    setPassword(text);
    if (text.length >= 6 && /^[A-Z]/.test(text)) {
      setIsPassValid(true);
    } else {
      setIsPassValid(false);
    }
  };
  
  const handleCheckConfirmPass = (text) => {
    setConfirmPass(text);
    if (password === text) {
      // Kiểm tra từng ký tự của hai mật khẩu để đảm bảo chính xác về cả chữ hoa và chữ thường
      let isMatch = true;
      for (let i = 0; i < password.length; i++) {
        if (password[i] !== text[i]) {
          isMatch = false;
          break;
        }
      }
      if (isMatch && password.length === text.length) {
        setIsConfirmPasswordValid(true);
      } else {
        setIsConfirmPasswordValid(false);
      }
    } else {
      setIsConfirmPasswordValid(false);
    }
  };
  
  





  return (
    <View style={styles.container}>
      <View style={{
        flexDirection: "row", alignItems: 'center', width: "100%", backgroundImage: 'linear-gradient(90deg, #006AF5 30%, #5ac8fa 100%)',
        paddingHorizontal: 16,
        paddingVertical: 8,
      }}>
        <MaterialIcons
          onPress={() => navigation.goBack()}
          name="keyboard-backspace"
          size={20}
          color="white"
        />
        <Text style={{ fontSize: 20, color: 'white', padding: 10, marginLeft: 10 }}>
          Tạo tài khoản
        </Text>
      </View>

      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 16, color: 'black', padding: 10, fontWeight: 'bold' }}>Tên Zalo</Text>
        <TextInput
          placeholder="Gồm 2-40 kí tự"
          // onChangeText={(text) => setName(text)}
          onChangeText={handleCheckName}
          value={name}
          autoCapitalize='none'
          style={[styles.txtSDT,{  borderBottomColor: isNameValid ? 'black' : 'red' }]}
        />
        {!isNameValid && <Text style={{color: 'red'}}>Tên phải lớn hơn 2 và nhỏ hơn hoặc bằng 40 kí tự</Text>}    


        <Text style={{ fontSize: 16, color: 'black', padding: 10, fontWeight: 'bold' }}>Email</Text>
        <TextInput
          placeholder="email@gmail.com"
          // onChangeText={(text) => setEmail(text)}
          onChangeText={handleCheckEmail}
          value={email}
          autoCapitalize='none'
          style={[styles.txtSDT,{  borderBottomColor: isEmailValid ? 'black' : 'red' }]}
        />
        {!isEmailValid && <Text style={{color: 'red'}}>Địa chỉ email không hợp lệ!</Text>}    

        <Text style={{ fontSize: 16, color: 'black', padding: 10, fontWeight: 'bold' }}>Mật khẩu</Text>
        <TextInput
          placeholder="Nhập password"
          // onChangeText={(text) => setPassword(text)}
          onChangeText={handleCheckPass}
          secureTextEntry={true}
          value={password}
          autoCapitalize='none'
          style={[styles.txtSDT,{  borderBottomColor: isPassValid ? 'black' : 'red' }]}
        />
        {!isPassValid && <Text style={{color: 'red'}}>Mật khẩu phải lớn hơn 6 kí tự và có kí tự đầu là kí tự in hoa</Text>}    

        <Text style={{ fontSize: 16, color: 'black', padding: 10, fontWeight: 'bold' }}>Nhập lại mật khẩu</Text>
        <TextInput
          placeholder="Nhập lại password"
          // onChangeText={(text) => setConfirmPass(text)}
          onChangeText={handleCheckConfirmPass}
          secureTextEntry={true}
          value={confirmPass}
          autoCapitalize='none'
          style={[styles.txtSDT,{  borderBottomColor: isConfirmPasswordValid ? 'black' : 'red' }]}
        />
        {!isConfirmPasswordValid && <Text style={{color: 'red'}}>Xác nhận mật khẩu không chính xác!</Text>}    


        <Text style={{ fontSize: 16, color: 'black', padding: 10, fontWeight: 'bold' }}>Giới tính</Text>

        <RadioForm
          formHorizontal={true} // Đảo ngang Radiobox
          animation={true}
          style={{ ...styles.radioFormContainer }}
        >
          {options.map((option, i) => (
            <RadioButton labelHorizontal={true} key={i} style={styles.radioButton}>
              <RadioButtonInput
                obj={option}
                index={i}
                isSelected={gender === option.value}
                onPress={(value) => {
                  setGender(value);
                }}
                borderWidth={1}
                buttonSize={15}

              />

              <RadioButtonLabel
                obj={option}
                index={i}
                labelHorizontal={true}
                onPress={(value) => {
                  setGender(value);
                }}
                labelStyle={{ fontSize: 14 }}
              />
            </RadioButton>
          ))}
        </RadioForm>
      </View>

      <TouchableOpacity
        style={styles.register}
        onPress={() => {
          setModalVisible(true);
          handleSendOTP();
        }}
      >
        <AntDesign
          name="arrowright"
          size={25}
          color="white"
        />
      </TouchableOpacity>


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={{ marginTop: "70%", backgroundColor: "white", borderWidth: 1, padding: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "600", marginBottom: 20 }}>Nhập OTP</Text>
          <OtpInput
            numberOfDigits={6}
            onTextChange={(text) => setOtp(text)}
            focusColor="green"
            theme={{
              containerStyle: { backgroundColor: 'white' }, // Thay đổi màu nền của OTP entry
              pinCodeContainerStyle: { backgroundColor: 'white' }, // Thay đổi màu nền của ô nhập OTP
              focusedPinCodeContainerStyle: { borderColor: 'gray' } // Thay đổi màu viền của ô nhập OTP khi được focus

            }}
          />

          <Button title="Verify OTP" onPress={() => handleRegister()} />


        </View>

      </Modal>


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
  Area: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextInput: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderColor: 'gray',
    padding: 15,
    borderBottomWidth: 1
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    paddingLeft: 10,
  },
  Button: {

    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '90%',
    height: 150
  },
  dangKy: {
    backgroundColor: '#6DB9EF',
    padding: 5,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },

  txtSDT: {
    borderBottomWidth: 1,
    fontSize: 16,
    color: 'black',
    padding: 10,
    borderBottomColor: "gray"
  },

  radioFormContainer: {
    fontSize: 18,
    fontWeight: "400",
    padding: 10,
  },

  radioButton: {
    marginRight: 50
  },

  register: {
    borderRadius: '50%',
    backgroundColor: '#C7C7C7',
    width: 50, height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    position: 'absolute'
  }
});
