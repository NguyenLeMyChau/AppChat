import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import search from '../assets/search.png';
import note from '../assets/note.png';
import bell from '../assets/bell.png';
import avt from '../assets/AnexanderTom.jpg';
import picture from '../assets/picture.png';
import video from '../assets/video.png';
import album from '../assets/album.png';
import memories from '../assets/memories.png';


export default function App() {
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity>
          <Image style={styles.icon} source={search} />
        </TouchableOpacity>
        <TextInput style={styles.text} placeholder='Tìm kiếm'></TextInput>
        <View style={styles.flexEndContainer}>
          <TouchableOpacity>
            <Image source={bell} style={styles.img} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={note} style={styles.img} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.body}>
        <TouchableOpacity>
          <Image style={styles.avt} source={avt}/>
        </TouchableOpacity>
        <TextInput style={styles.textInput} placeholder="Hôm nay bạn thế nào?" />
      </View>

      <View style={styles.body}>
      <TouchableOpacity>
          <View style={styles.group}>
            <Image style={styles.img} source={picture}/>
            <Text style={styles.nor}> Ảnh </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.group}>
            <Image style={styles.img} source={video}/>
            <Text style={styles.nor}> Video </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.group}>
            <Image style={styles.img} source={album}/>
            <Text style={styles.nor}> Album </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.group}>
            <Image style={styles.img} source={memories}/>
            <Text style={styles.nor}> Kỷ niệm </Text>
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
  },
  icon: {
    width: 25,
    height: 25,
    alignItems: 'left',
    justifyContent: 'left',
    margin: 10,
  },
  flexEndContainer: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginRight: 10,
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
  }, 
  body: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
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
  },
  nor: {
    fontSize: 14,
    margin: 10,
  },
  group: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRightWidth: 1,
    flex: 1,
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
