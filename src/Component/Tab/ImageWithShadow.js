import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ImageWithShadow = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#C4C4C4', '#C4C4C4']}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        style={styles.gradient}
      />
      <View style={styles.imageContainer}>
        <Image
          source={require("../../../assets/AnexanderTom.jpg")}
          style={styles.image}
        />
      </View>
    </View>
  );
  };

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 150,
  },
  gradient: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});




export default ImageWithShadow;
