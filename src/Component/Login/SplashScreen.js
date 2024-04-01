import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import zalo from '../../../assets/zalo.jpg';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('HomeLoginZalo');
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={zalo} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: '100%'
  },
});

export default SplashScreen;
