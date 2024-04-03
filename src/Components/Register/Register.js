
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
    } else {
      Alert.alert(data.message);
    }

  }

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
          onChangeText={(text) => setName(text)}
          value={name}
          maxLength={40}
          autoCapitalize='none'
          style={styles.txtSDT}
        />

        <Text style={{ fontSize: 16, color: 'black', padding: 10, fontWeight: 'bold' }}>Email</Text>
        <TextInput
          placeholder="email@gmail.com"
          onChangeText={(text) => setEmail(text)}
          value={email}
          maxLength={40}
          autoCapitalize='none'
          style={styles.txtSDT}
        />

        <Text style={{ fontSize: 16, color: 'black', padding: 10, fontWeight: 'bold' }}>Mật khẩu</Text>
        <TextInput
          placeholder="Nhập password"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          value={password}
          maxLength={40}
          autoCapitalize='none'
          style={styles.txtSDT}
        />

        {/* <Text style={{ fontSize: 16, color: 'black', padding: 10, fontWeight: 'bold' }}>Nhập lại mật khẩu</Text>
        <TextInput
          placeholder="Nhập lại password"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          value={name}
          maxLength={40}
          autoCapitalize='none'
          style={styles.txtSDT}
        /> */}

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
