import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Modal, Button } from "react-native";
import axios from "axios";
import { Octicons } from "@expo/vector-icons/build/Icons";
import { OtpInput } from "react-native-otp-entry";


const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpR,setOtpR] = useState('');
  const [otpConfirm, setOtpConfirm] = useState(false);
  const [passwordNew, setPasswordNew] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [confirmRepassword,setconfirmRePassword] = useState(false);
  useEffect(()=>{
    if (passwordNew !== rePassword) {
      setconfirmRePassword(false)
  }else setconfirmRePassword(true)
  })

  const [isNewPasswordValid, setIsNewPasswordValid] = useState();
      
  const handleCheckNewPass = (text) => {
    setPasswordNew(text);
   if(text.length >= 8){
        setIsNewPasswordValid(true);
    } else {
      setIsNewPasswordValid(false);
    }
  };
  const handleConfirmOtp = () => {
   if(otp === otpR){
        setOtpConfirm(true);
        setModalVisible(false);
    } else {
      setOtpConfirm(false);
      setModalVisible(false);
    }
  };

  const handleSendOTP = async () => {

    try {
      const response = await axios.post('https://backend-chatapp-rdj6.onrender.com/user/sendOTP', { email: email, checkGetPassEmail: true }, {
      });
      const { data } = response; // data = response.data
      if (data.success) {
        setOtpR(data.otp)
      } 
    } catch (error) {
      console.error('Error send OTP:', error);
      alert("Tài khoản không tồn tại");
    }
  };

  const handleChange = async () => {
    const response = await axios.put(`https://backend-chatapp-rdj6.onrender.com/user/updatePassword/${email}`, {newPassword: passwordNew});
    const { data } = response;

    if (data.success) {
        alert(data.message);
        navigation.navigate('Signin')
    } else {
        Alert.alert(data.message);
        alert(data.message);
    }
}



  return (
    
    <View style={styles.container}>
    
    <View style={styles.header}>
        <TouchableOpacity>
          <Octicons
            name="arrow-left"
            size={25}
            color="white"
            onPress={() => navigation.goBack()}
          />
        </TouchableOpacity>
        <Text style={{ color: "white",
    marginLeft: 20,
    fontSize: 18,
    fontWeight: "400",}}>Lấy lại mật khẩu</Text>
      </View>
      {otpConfirm?(
         <View style={{ width: '90%', marginBottom: 20 }}>

         <Text style={{ fontSize: 16, color: 'black', padding: 10, fontWeight: 'bold', marginTop: 20 }}>Mật khẩu mới</Text>

         <TextInput
             style={[styles.txtSDT]}
             placeholder="Nhập mật khẩu mới"
             value={passwordNew}
             onChangeText={handleCheckNewPass}
             underlineColorAndroid="transparent"
             secureTextEntry={true}
         />
         {!isNewPasswordValid && <Text style={{color: 'red'}}>Mật khẩu mới phải lớn hơn 8 kí tự </Text>}    


         <TextInput
             style={styles.txtSDT}
             placeholder="Nhập lại mật khẩu mới"
             value={rePassword}
             onChangeText={(text) => {setRePassword(text)}}
             underlineColorAndroid="transparent"
             secureTextEntry={true}
         />
         {confirmRepassword?null:<Text style={{color:'red'}}>Nhập lại mật khẩu không chính xác</Text>}
         <TouchableOpacity style={styles.uploadStatus} onPress={() => handleChange()} disabled={confirmRepassword?false:true}>
                    <Text style={{ fontSize: 18, fontWeight: "600", color: "white" }}>
                        Cập nhật
                    </Text>
                </TouchableOpacity>

     </View>
      ):( <View style={{ flex:1,alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20}}>
      <Text style={styles.title}>Forgot Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <TouchableOpacity style={styles.button} onPress={()=>{setModalVisible(true);handleSendOTP() }}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
      </View>)}
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

          <Button title="Verify OTP" onPress={()=>handleConfirmOtp()}/>
        </View>

      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  header: {
    backgroundColor: "#007bff",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    height: 60,
    width: "100%",
   
  },
  title: {
    fontSize: 24,
    marginBottom: 20
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20
  },
  txtSDT: {
    borderBottomWidth: 1,
    fontSize: 16,
    color: 'gray',
    padding: 10,
},
  button: {
    width: "100%",
    height: 40,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5
  },
  buttonText: {
    color: "#fff",
    fontSize: 16
  },
  uploadStatus: {
    width: "90%",
    height: 40,
    backgroundColor: '#006AF5',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    marginLeft: 20,
   color:"while"
},
});

export default ForgotPassword;
