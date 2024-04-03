import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

export default function Navbar() {
    const navigation =useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <View style={styles.left}>
                    <View style={styles.logo}>
                        <Image
                            source={require('../assets/logo.png')}
                            style={styles.logoImage}
                        />
                    </View>
                   
                </View>

                <View style={styles.right}>
                    <TouchableOpacity  onPress={() => navigation.navigate('List')}>
                        <MaterialCommunityIcons name="filter-variant" size={30} color='white'/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = {
    container: {
       
        backgroundColor: 'black',
        width:'100%',
        height:'12%'
    },
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        padding: 8,
    },
    logoImage: {
        width: 48,
        height: 48,
        resizeMode: 'cover',
    },
  
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchInput: {
        flex: 1,
        marginLeft: 20,
        fontSize: 15,
    },
    searchIcon: {
        marginRight: 20,
    },
    icon: {
        fontSize: 30,
        color: '#b78a28',
    },

    right: {
        flexDirection: 'row',
        alignItems: 'center',
    },
};
