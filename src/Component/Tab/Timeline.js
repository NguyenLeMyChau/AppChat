import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ImageBackground, Animated } from 'react-native';
import Header from '../Head/Header';
import { AntDesign, MaterialIcons, FontAwesome, MaterialCommunityIcons, EvilIcons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import avatar from '../../../assets/AnexanderTom.jpg';

export default function Timeline() {
  const icons = [
    { name: 'camera', component: AntDesign, size: 18, color: 'white' },
    { name: 'video-camera', component: FontAwesome, size: 16, color: 'white' },
    { name: 'pencil', component: MaterialCommunityIcons, size: 20, color: 'white' },
  ];

  const [iconIndex, setIconIndex] = useState(0);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const nextScaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(nextScaleAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(1000)
    ]).start(() => {
      scaleAnim.setValue(1);
      nextScaleAnim.setValue(0);
      setIconIndex((prevIndex) => (prevIndex + 1) % icons.length);
    });
  }, [iconIndex]);

  const IconComponent = icons[iconIndex].component;
  const NextIconComponent = icons[(iconIndex + 1) % icons.length].component;

  return (
    <View style={styles.container}>
      <View style={{
        flexDirection: "row", alignItems: 'center', width: "100%"
      }}>
        <Header />
        <TouchableOpacity style={{ marginLeft: -90 }}>
          <MaterialCommunityIcons name="file-image-plus-outline" size={25} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginLeft: 20 }}>
          <EvilIcons name="bell" size={35} color="white" />
        </TouchableOpacity>

      </View>

      <View style={styles.header}>
        <View style={styles.headerWrite}>
          <Image source={avatar} style={styles.avatar} />
          <TextInput
            placeholder="Hôm nay bạn thế nào?"
            style={{ fontSize: 20, marginLeft: 10, width: "100%", padding: 20 }}
          />
        </View>

        <View style={styles.headerChoice}>
          <TouchableOpacity >
            <View style={styles.group}>
              <FontAwesome name='picture-o' color='green' size={18} style={styles.icon} />
              <Text style={styles.nor}> Ảnh </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity >
            <View style={styles.group}>
              <FontAwesome name='video-camera' color='#eb52a3' size={18} style={styles.icon} />
              <Text style={styles.nor}> Video </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.group}>
              <MaterialIcons name='photo-album' color='#15A0EE' size={18} style={styles.icon} />
              <Text style={styles.nor}> Album </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.group}>
              <AntDesign name='clockcircle' color='orange' size={18} style={styles.icon} />
              <Text style={styles.nor}> Kỷ niệm </Text>
            </View>
          </TouchableOpacity>

        </View>

      </View>

      <View
        style={{
          borderBottomColor: '#e3e3e3',
          borderBottomWidth: 12, // Độ dày của đường gạch ngang
          width: '100%', // Chiều rộng của gạch ngang
        }} />

      <View style={{ width: "100%", height: "auto", paddingTop: 10, paddingLeft: 15, paddingBottom: 15 }}>
        <Text style={{ ...styles.textMoment, fontWeight: 550, top: -8 }}>Khoảnh khắc</Text>

        <View>

          <ImageBackground source={avatar} style={styles.story}>
            <LinearGradient
              colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.7)']}
              style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 150 }}
            />


            <LinearGradient
              colors={['#52a0ff', '#df16b7']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.avatarStory}>

              <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                <IconComponent
                  name={icons[iconIndex].name}
                  size={icons[iconIndex].size}
                  color={icons[iconIndex].color} />
              </Animated.View>

              <Animated.View style={{ transform: [{ scale: nextScaleAnim }], position: 'absolute' }}>
                <NextIconComponent
                  name={icons[(iconIndex + 1) % icons.length].name}
                  size={icons[(iconIndex + 1) % icons.length].size}
                  color={icons[(iconIndex + 1) % icons.length].color} />
              </Animated.View>
              
            </LinearGradient>

            <Text style={{ color: 'white', top: -10 }}>Tạo mới</Text>

          </ImageBackground>



        </View>
      </View>

      <View
        style={{
          borderBottomColor: '#e3e3e3',
          borderBottomWidth: 12, // Độ dày của đường gạch ngang
          width: '100%', // Chiều rộng của gạch ngang
        }} />



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    width: "100%",
    padding: 10,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    left: 5
  },

  headerWrite: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    marginBottom: 8
  },

  headerChoice: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center"
  },

  group: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    padding: 10
  },

  nor: {
    fontSize: 15
  },

  icon: {
    left: -1,
    top: 0.5
  },

  textMoment: {
    fontSize: 15,
    marginTop: 5,
    marginBottom: 2
  },

  story: {
    width: 100,
    height: 150,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: "flex-end"
  },

  avatarStory: {
    width: 40,
    height: 40,
    borderRadius: 50,
    top: -13,
    alignItems: "center",
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: "#C4C4C4",
    // padding: 2 được thêm vào để tạo ra khoảng cách giữa icon và đường viền
  }

});
