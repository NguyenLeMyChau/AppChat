import React from 'react';
import { View } from 'react-native';
import {StyleSheet } from 'react-native';
import Login from './HomeLoginZalo';

export default function HomeChat() {
  return (
    <View style={styles.container}>
      {/* <Navbar/>
      <ScrollView >
      <Image source={require('../assets/logo.png')} style={styles.logoImage}/> 
      <Body/>
      </ScrollView> */}
      <Login/>
      
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'flex-start',
    
  },
  logoImage: {
    width: 400,
    height: 400,
    resizeMode: 'cover',
},
})

