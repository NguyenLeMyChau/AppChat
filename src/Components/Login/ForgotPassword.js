import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import axios from "axios";
import { Octicons } from "@expo/vector-icons/build/Icons";

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState("");

  const handleForgotPassword = async () => {
    try {
      console.log(email);
      const response = await axios.post("http://localhost:4000/user/resetPassword", { email: email });
      if (response.data.success) {
        Alert.alert("Success", "An email with instructions to reset your password has been sent to your email address.");
        console.log(response.data.message);
      } else {
        Alert.alert("Error", response.data.message);
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      Alert.alert("Error", "An error occurred while resetting your password. Please try again later.");
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
        <Text style={{ color: "white",
    marginLeft: 20,
    fontSize: 18,
    fontWeight: "400",}}>Lấy lại mật khẩu</Text>
      </View>
      <View style={{ flex:1,alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20}}>
      <Text style={styles.title}>Forgot Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <TouchableOpacity style={styles.button} onPress={handleForgotPassword}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
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
  }
});

export default ForgotPassword;
