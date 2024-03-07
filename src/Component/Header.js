import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';


export default function Header() {
  return (
    <Swiper style={styles.wrapper} showsButtons>
<View style={styles.slide1}>
<Text style={styles.text}>Welcome to Swiper</Text>
</View>
<View style={styles.slide2}>
<Text style={styles.text}>You are beautiful</Text>
</View>
<View style={styles.slide3}>
<Text style={styles.text}>You are amazing</Text>
</View>
</Swiper>
  );
}

const styles = StyleSheet.create({ wrapper: {
},
slide1: { flex: 1,
justifyContent: 'center', alignItems: 'center', backgroundColor: '#caff75'
},
slide2: { flex: 1,
justifyContent: 'center', alignItems: 'center', backgroundColor: '#fffa73'
},
slide3: { flex: 1,
justifyContent: 'center', alignItems: 'center',
backgroundColor: '#6cf5d9'
},
text: {
color: '#6e596d', fontSize: 25, fontWeight: 'bold'
}
});