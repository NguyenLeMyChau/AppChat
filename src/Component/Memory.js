import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { AntDesign,MaterialIcons, SimpleLineIcons,Feather, FontAwesome } from "@expo/vector-icons";
import avt from '/assets/AnexanderTom.jpg';

export default function Memory() {
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity>
          <SimpleLineIcons name='magnifier' style={styles.header_icon} size={25}></SimpleLineIcons>
        </TouchableOpacity>
        <TextInput style={styles.text} placeholder='Tìm kiếm'></TextInput>
        <View style={styles.flexEndContainer}>
          <TouchableOpacity>
            <Feather name='bell' style={styles.header_icon} size={25} />
          </TouchableOpacity>
          <TouchableOpacity>
            <SimpleLineIcons name='note' style={[styles.header_icon,styles.iconRight]} size={25} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.avt_stt}>
        <TouchableOpacity>
          <Image style={styles.avt} source={avt}/>
        </TouchableOpacity>
        <TextInput style={styles.textInput} placeholder="Hôm nay bạn thế nào?" />
      </View>

      <View style={styles.body}>
        <TouchableOpacity >
          <View style={styles.group}>
            <FontAwesome name='picture-o' color = 'green'  size={20}/>
            <Text style={styles.nor}> Ảnh </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity >
          <View style={styles.group}>
            <AntDesign name='videocamera' color = 'purple' size={20}/>
            <Text style={styles.nor}> Video </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.group}>
            <MaterialIcons name='photo-album' color= '#15A0EE' size={20}/>
            <Text style={styles.nor}> Album </Text>
          </View>
        </TouchableOpacity>

       

      </View>

      <View style={styles.column}>
        <Text style={styles.bold}>Khoảnh khắc</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#15A0EE',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  header_icon: {
    color: 'white',
  },
  flexEndContainer: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginRight: 10,
  },
  iconRight: {
    marginRight: 20,
  },
  img: {
    width: 25,
    height: 25,
    margin: 4,
  },
  text: {
    fontSize: 16,
    margin: 10,
    color: 'white',
    width: '60%'
  },
  avt_stt: {
    flexDirection: 'row'
  },
  body: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    justifyContent:"space-around"
  },
  avt: {
    width: 80,
    height: 80,
    borderRadius: 40,
    margin: 10,
  },
  textInput: {
    fontSize: 20,
    margin: 10,
    width: '100%',
    height: '80%'
  },
  nor: {
    fontSize: 14,
    margin: 10,
  },
  group: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#efefef',
    paddingLeft: 10
  },
  bold:{
    fontSize: 16,
    margin: 10,
    fontWeight: 'bold',
  },
  column:{
    flexDirection:'column',
  }
});
