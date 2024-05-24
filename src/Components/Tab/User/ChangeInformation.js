import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Animated,
  Alert,
} from "react-native";
import { Octicons, AntDesign } from "@expo/vector-icons";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Platform } from "react-native";
import * as ImagePicker from 'expo-image-picker';

export default function ChangeInformation({ navigation }) {
  const [userData, setUserData] = useState({});
  const [name, setName] = useState("");
  const [gender, setGender] = useState(true);
  const [avatar, setAvatar] = useState(null);
  const [change, setChange] = useState(false);

  async function getData() {
    const foundUser = await AsyncStorage.getItem("foundUser");
    const userData = JSON.parse(foundUser);
    setUserData(userData);
    setName(userData.name);
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setAvatar(avatar);
    console.log('................avatar', avatar);
  }, [avatar]);

  async function selectFile() {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      // Gọi hàm handleUpImage sau khi chọn tệp
      const imageUrl = await handleUpImage(result.assets[0].uri);
      setAvatar(imageUrl);
    }
  }

  async function handleUpImage(uri) {
    const formData = new FormData();
    let file = {
      uri: uri,
      name: 'image.jpg',
      type: 'image/jpeg'
    };
    formData.append("avatar", file);
    if (file !== null) {
      const responseAvatar = await axios.post(
        `https://backend-chatapp-rdj6.onrender.com/user/uploadAvatarS3/${userData._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const image = responseAvatar.data.avatar;
      return image;
    }
  }

  const [isNameValid, setIsNameValid] = useState(true);
  const handleChange = async (text) => {

    if (text.length >= 2 && text.length <= 40) {
      setIsNameValid(true);
      const response = await axios.put(
        `https://backend-chatapp-rdj6.onrender.com/user/updateUser/${userData._id}`,
        { name, gender, avatar: avatar }
      );

      const { data } = response;

      if (data.success) {
        alert(data.message);
        let updatedUser;

        if (avatar === null) {
          updatedUser = {
            _id: userData._id,
            name: name,
            email: userData.email,
            gender: gender,
            avatar: userData.avatar,
          }
        } else {
          updatedUser = {
            _id: userData._id,
            name: name,
            email: userData.email,
            gender: gender,
            avatar: avatar,
          };

        }

        console.log(updatedUser);
        await AsyncStorage.setItem("foundUser", JSON.stringify(updatedUser));
        setUserData(updatedUser);
        await navigation.navigate("BottomTab");
      } else {
        if (error.response) {
          alert(error.response.data.message);
        } else {
          console.log(error.message);
        }
      }
    } else {
      setIsNameValid(false);
    }

  };

  useEffect(() => {
    setGender(userData.gender);
  }, [userData.gender]);

  useEffect(() => { }, [avatar]);

  const options = [
    { label: "Nữ", value: true },
    { label: "Nam", value: false },
  ];

  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 0.5,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1.5,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#006AF5", "#5ac8fa"]}
        start={[0, 0.5]}
        end={[1, 0.5]}
        style={styles.header}
      >
        <TouchableOpacity>
          <Octicons
            name="arrow-left"
            size={25}
            color="white"
            onPress={() => navigation.navigate('Information')}
          />
        </TouchableOpacity>

        <Text style={styles.name}>Chỉnh sửa thông tin</Text>
      </LinearGradient>

      <View style={{ backgroundColor: "white" }}>
        <View style={{ flexDirection: "row", paddingTop: 20, justifyContent: 'flex-start' }}>
          <View style={styles.head}>
            <TouchableOpacity
              onPress={() => {
                selectFile(), setChange(true);
              }}
            >
              <ImageBackground
                source={
                  avatar
                    ? { uri: avatar }
                    : userData.avatar
                      ? { uri: userData.avatar }
                      : { uri: "https://inkythuatso.com/uploads/thumbnails/800/2023/03/6-anh-dai-dien-trang-inkythuatso-03-15-26-36.jpg?gidzl=QL-ECEnPjmnbHeyrw4A_3s16W3Bo4xu5BHU2CwWUl0Wd6T4mhH2-N24LZs2h7RDU94-ADcEyCGaEvr-_3W" }
                }
                style={styles.avatar}
                imageStyle={{
                  borderRadius: 75,
                  borderWidth: 1,
                  borderColor: "#C4C4C4",
                }}
              >
                <LinearGradient
                  colors={["#fff", "#fff"]}
                  style={styles.avatarStory}
                >
                  <Animated.View style={{ transform: [{ scale }] }}>
                    <AntDesign name="camera" size={13} color="#C4C4C4" />
                  </Animated.View>
                </LinearGradient>
              </ImageBackground>
            </TouchableOpacity>
          </View>

          <View style={styles.infor}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View>
                <TextInput
                  style={[styles.option, { borderBottomColor: isNameValid ? 'black' : 'red' }]}
                  onChangeText={(text) => {
                    setName(text), setChange(true);
                  }}
                  value={name}
                // placeholder={userData.name}
                />
                <Octicons
                  name="pencil"
                  size={18}
                  color="black"
                  style={{ right: 35 }}
                />
                {!isNameValid ? <Text style={{ color: 'red' }}>Tên phải lớn hơn 2 và nhỏ hơn hoặc bằng 40 kí tự</Text> : null}
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TextInput
                style={styles.option}
                placeholder={userData.email}
                editable={false}
              />
              <Octicons
                name="pencil"
                size={18}
                color="black"
                style={{ right: 35 }}
              />
            </View>

            <RadioForm
              formHorizontal={true} // Đảo ngang Radiobox
              animation={true}
              style={{ ...styles.radioFormContainer }}
            >
              {options.map((option, i) => (
                <RadioButton
                  labelHorizontal={true}
                  key={i}
                  style={styles.radioButton}
                >
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
        </View>
        {change ? (
          <TouchableOpacity style={styles.uploadStatus} onPress={async () => {
            await handleChange(name);
          }}>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "white" }}>
              Lưu
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#rgba(0, 0, 0, 0.05)",
   
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    height: 50,
    width: "100%",
  },

  head: {
    width: "30%",
    height: "100%",
  },

  infor: {
    width: "70%",
    height: "100%",
  },

  name: {
    color: "white",
    marginLeft: 20,
    fontSize: 18,
    fontWeight: "400",
  },

  option: {
    fontSize: 14,
    fontWeight: "400",
    marginLeft: 10,
    padding: 13,
    borderBottomWidth: 1,
    borderBottomColor: "#rgba(0, 0, 0, 0.1)",
    width: "100%",
  },

  avatar: {
    width: 100,
    height: 100,
    marginLeft: 10,
  },

  radioFormContainer: {
    fontSize: 18,
    fontWeight: "400",
    padding: 13,
  },
  radioButton: {
    marginRight: 50,
  },

  uploadStatus: {
    width: "90%",
    height: 40,
    backgroundColor: "#006AF5",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    marginLeft: 20,
  },

  avatarStory: {
    width: 40,
    height: 40,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#C4C4C4",
    top: 60,
    left: 60,
  },
});
