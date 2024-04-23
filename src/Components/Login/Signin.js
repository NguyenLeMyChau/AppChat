import { useContext, useState } from "react";
import { Alert, TextInput, TouchableOpacity } from "react-native";
import { StyleSheet, View, Text } from "react-native";
import { AuthContext } from "./AuthProvider";
import {
  Octicons,
  AntDesign,
  Entypo,
  SimpleLineIcons,
} from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Signin({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const {login} = useContext(AuthContext);

  const [isFocus, setIsfocus] = useState(false);
  const handleFocus = () => setIsfocus(true);
  const handleBlur = () => setIsfocus(false);

  const [passwordFocus, setpasswordfocus] = useState(false);
  const handlePasswordFocus = () => {
    setpasswordfocus(true);
  };
  const handlePasswordBlur = () => {
    setpasswordfocus(false);
  };

  const handleLogin = async () => {
    console.log(email, password);

    const userData = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/user/login",
        userData
      );
      const { data } = response; // data = response.data

      console.log(data.foundUser);
      AsyncStorage.setItem("foundUser", JSON.stringify(data.foundUser));
      // Lưu thông tin user vào AsyncStorage để sử dụng ở các màn hình khác
      //JSON.stringify(data.foundUser) chuyển object thành chuỗi JSON
      Alert.alert(data.message);
      alert(data.message);
      navigation.navigate("BottomTab");

    } catch (error) {
      console.error(error);
      if (error.response) {
        alert(error.response.data.message);
      } else {
        console.log(error.message);
      }
    }
  };

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

        <Text style={styles.name}>Đăng nhập</Text>
      </View>

      <Text style={styles.title}>
        Vui lòng nhập số điện thoại và mật khẩu để đăng nhập
      </Text>

      <View style={{ width: "90%", marginBottom: 20 }}>
        <TextInput
          style={isFocus ? styles.txtSDTfocus : styles.txtSDT}
          placeholder="Email"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={(text) => setEmail(text)}
          underlineColorAndroid="transparent"
        />

        <TextInput
          style={[styles.txtSDT, passwordFocus ? styles.txtSDTfocus : null]}
          placeholder="Mật khẩu"
          onFocus={handlePasswordFocus}
          onBlur={handlePasswordBlur}
          onChangeText={(text) => setPassword(text)}
          underlineColorAndroid="transparent"
          secureTextEntry={true}
        />
      </View>

      <View style={styles.btnForgetPass}>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={{ color: "#006AF5", fontSize: 18, fontWeight: "bold" }}>
            Lấy lại mật khẩu
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.confirm}>
        <TouchableOpacity style={styles.btnQuestion}>
          <Text style={{ color: "gray", fontSize: 16 }}>
            Câu hỏi thường gặp
            <AntDesign name="right" size={15} color="black" />
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnconfirm}
          onPress={() => handleLogin()}
        >
          <AntDesign name="arrowright" size={25} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  title: {
    width: "100%",
    alignItems: "flex-start",
    fontSize: 14,
    padding: 12,
    backgroundColor: "#F4F5F6",
  },

  header: {
    backgroundImage: "linear-gradient(90deg, #006AF5 30%, #5ac8fa 100%)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    height: "8%",
    width: "100%",
  },

  name: {
    color: "white",
    marginLeft: 20,
    fontSize: 18,
    fontWeight: "400",
  },

  txtSDT: {
    borderBottomWidth: 1,
    fontSize: 16,
    color: "gray",
    padding: 10,
    marginTop: 10,
  },

  txtSDTfocus: {
    fontSize: 16,
    padding: 10,
    borderBottomWidth: 3,
    borderBottomColor: "#74d3f7",
    color: "gray",
    marginTop: 10,
  },

  btnForgetPass: {
    marginTop: 5,
    width: "90%",
    height: 40,
  },

  btnQuestion: {
    color: "gray",
    fontSize: 18,
  },

  confirm: {
    width: "90%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    bottom: 0,
    position: "absolute",
    padding: 10,
  },

  btnconfirm: {
    backgroundColor: "gray",
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
