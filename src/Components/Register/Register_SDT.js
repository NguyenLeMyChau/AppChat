import {
    AntDesign,
    MaterialCommunityIcons,
    MaterialIcons,
  } from "@expo/vector-icons";
  import { StatusBar } from "expo-status-bar";
  import { useState } from "react";
  import { Alert, TextInput, TouchableOpacity } from "react-native";
  import { StyleSheet, View, Button, Text } from "react-native";
  import { Image } from "react-native";
  import { CheckBox } from "react-native-web";
  
  export default function Register_SDT({ navigation ,route}) {
     const {name} = route.params;
     const email="hoangghsadsadasdasdsa@gmail.com";
     const password="hoangghcc";
    const avatar = "adsasdasdasas"
    const gender=true;
     console.log();
     const [phone,setPhone]=useState('');
    const [isSelected1, setSelection1] = useState(false);
    const [isSelected2, setSelection2] = useState(false);
    const handleRegister = async () => {
      try {
        const response = await fetch('http://localhost:4000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, phone, password ,avatar,gender}),
        });
        const data = await response.json();
        if (data.success) {
          // Đăng ký thành công, hiển thị thông báo thành công và chuyển hướng đến màn hình khác
          console.log('Thông báo', 'Đăng ký thành công');
          navigation.navigate('BottomTab'); 
        } else {
          // Đăng ký không thành công, hiển thị thông báo lỗi
          console.log('Lỗi', data.message);
        }
      } catch (error) {
        console.error('Error handling registration:', error);
        console.log('Lỗi', 'Đã xảy ra lỗi khi đăng ký');
      }
    };
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            backgroundImage: "linear-gradient(90deg, #006AF5 30%, #5ac8fa 100%)",
            paddingHorizontal: 16,
            paddingVertical: 8,
          }}
        >
          <MaterialIcons
            onPress={() => navigation.goBack()}
            name="keyboard-backspace"
            size={20}
            color="white"
          />
          <Text
            style={{ fontSize: 20, color: "white", padding: 10, marginLeft: 10 }}
          >
            Tạo tài khoản
          </Text>
        </View>
        <View style={{ padding: 10 }}>
          <Text
            style={{
              fontSize: 16,
              color: "black",
              padding: 15,
              fontWeight: "bold",
            }}
          >
            Số điện thoại
          </Text>
          <TextInput
            placeholder="Nhập số điện thoại"
            onChangeText={(text) => setPhone(text)}
            value={phone}
            maxLength={40}
            autoCapitalize="none"
            style={{
              padding: 10,
              borderBottomWidth: 2,
              color: "gray",
              width: "100%",
              height: 50,
              fontSize: 14,
            }}
          />
        </View>
  
        <View style={{ padding: 10 }}>
          <View style={{ flexDirection: "row"}}>
            <CheckBox
              value={isSelected1}
              onValueChange={setSelection1}
              style={{ alignSelf: "center" }}
            />
            <Text style={{ fontSize: 14, padding: 10 }}>
              Tôi đồng ý các điều khoản sử dụng Zalo
            </Text>
          </View>
          <View style={{ flexDirection: "row"}}>
            <CheckBox
              value={isSelected2}
              onValueChange={setSelection2}
              style={{ alignSelf: "center" }}
            />
            <Text style={{ fontSize: 14, padding: 10 }}>
              Tôi đồng ý với điều khoản mạng xã hội của Zalo
            </Text>
          </View>
        </View>
  
        <TouchableOpacity
          style={{
            borderRadius: "50%",
            backgroundColor: "#C7C7C7",
            width: 50,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            right: 20,
            bottom: 20,
            position: "absolute",
          }}
          onPress={handleRegister}
        >
          <AntDesign name="arrowright" size={25} color="white" />
        </TouchableOpacity>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    logoImage: {
      width: 100,
      height: 100,
      resizeMode: "cover",
    },
    Area: {
      width: "90%",
      alignItems: "center",
      justifyContent: "center",
    },
    TextInput: {
      width: "90%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      borderColor: "gray",
      padding: 15,
      borderBottomWidth: 1,
    },
    input: {
      width: "100%",
      height: 40,
      borderColor: "gray",
      paddingLeft: 10,
    },
    Button: {
      justifyContent: "space-evenly",
      alignItems: "center",
      width: "90%",
      height: 150,
    },
    dangKy: {
      backgroundColor: "#6DB9EF",
      padding: 5,
      borderRadius: 10,
      width: "100%",
      alignItems: "center",
    },
    buttonText: {
      color: "white",
      fontSize: 16,
    },
  });