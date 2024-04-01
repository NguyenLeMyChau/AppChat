import React from 'react';
import { View } from 'react-native';
import {StyleSheet } from 'react-native';
import Login from './Login/HomeLoginZalo';

export default function HomeChat() {
  return (
    <View style={styles.container}>
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

