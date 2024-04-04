import { useContext, useState } from 'react';
import { Alert, TextInput, TouchableOpacity } from 'react-native';
import { StyleSheet, View, Text } from 'react-native';
import { Octicons, AntDesign, Entypo, SimpleLineIcons } from "@expo/vector-icons";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
<<<<<<< HEAD

export default function ChangePassword({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
=======
import { useRef } from 'react';
import { useEffect } from 'react';

export default function ChangePassword({ navigation }) {
    const [userData, setUserData] = useState({});
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordNew, setPasswordNew] = useState('');
>>>>>>> Hoang
    const [rePassword, setRePassword] = useState('');


    // const {login} = useContext(AuthContext);

    const [isFocus, setIsfocus] = useState(false);
    const handleFocus = () => setIsfocus(true);
    const handleBlur = () => setIsfocus(false);

    const [passwordFocus, setpasswordfocus] = useState(false);
    const handlePasswordFocus = () => { setpasswordfocus(true); }
    const handlePasswordBlur = () => { setpasswordfocus(false); }

    const [rePasswordFocus, setrepasswordfocus] = useState(false);
<<<<<<< HEAD
    const handleRePasswordFocus = () => { setrepasswordfocus(true); }
    const handleRePasswordBlur = () => { setrepasswordfocus(false); }

    const handleLogin = async () => {

=======
    const [confirmRepassword,setconfirmRePassword] = useState(true);
    const handleRePasswordFocus = () => { setrepasswordfocus(true); }
    const handleRePasswordBlur = () => { setrepasswordfocus(false); 
        if (passwordNew !== rePassword) {
            setconfirmRePassword(false)
        }else setconfirmRePassword(true)
    }
    
    async function getData() {
        const foundUser = await AsyncStorage.getItem('foundUser');      
        setUserData(JSON.parse(foundUser));
        //JSON.parse(foundUser) chuyển chuỗi JSON thành object
    }
    
    useEffect(() => {
        getData();
    }, []);

    const handleChange = async () => {
        const response = await axios.put(`http://localhost:4000/user/updatePassword/${userData.email}`, {currentPassword:password,newPassword: passwordNew});
        const { data } = response;

        if (data.success) {
            Alert.alert(data.message);
            console.log(data.message);
            setPassword('');
            setPasswordNew('');
            setRePassword('');
        } else {
            Alert.alert(data.message);
        }
>>>>>>> Hoang
    }


    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity>
                    <Octicons name="arrow-left" size={25} color="white" onPress={() => navigation.goBack()} />
                </TouchableOpacity>

                <Text style={styles.name}>Cập nhật mật khẩu</Text>
            </View>


            <Text style={styles.title}>Mật khẩu phải gồm chữ và số, không được chứa năm sinh, username và tên Zalo của bạn</Text>

            <View style={{ width: '90%', marginBottom: 20 }}>

                <Text style={{ fontSize: 16, color: 'black', padding: 10, fontWeight: 'bold' }}>Mật khẩu hiện tại:</Text>

                <TextInput
                    style={styles.txtSDT}
                    placeholder="Nhập mật khẩu hiện tại"
                    keyboardType='phone-pad'
<<<<<<< HEAD
                    onChangeText={(text) => setEmail(text)}
=======
                    value={password}
                    onChangeText={(text) => setPassword(text)}
>>>>>>> Hoang
                    underlineColorAndroid="transparent"
                />

                <Text style={{ fontSize: 16, color: 'black', padding: 10, fontWeight: 'bold', marginTop: 20 }}>Mật khẩu mới</Text>

                <TextInput
                    style={styles.txtSDT}
                    placeholder="Nhập mật khẩu mới"
<<<<<<< HEAD
                    onChangeText={(text) => setPassword(text)}
=======
                    value={passwordNew}
                    onChangeText={(text) => setPasswordNew(text)}
>>>>>>> Hoang
                    underlineColorAndroid="transparent"
                    secureTextEntry={true}
                />

                <TextInput
                    style={styles.txtSDT}
                    placeholder="Nhập lại mật khẩu mới"
<<<<<<< HEAD
                    onChangeText={(text) => setRePassword(text)}
                    underlineColorAndroid="transparent"
                    secureTextEntry={true}
                />
=======
                    value={rePassword}
                    onChangeText={(text) => setRePassword(text)}
                    underlineColorAndroid="transparent"
                    secureTextEntry={true}
                    onFocus={handleRePasswordFocus}
                    onBlur={handleRePasswordBlur}
                />
                {confirmRepassword?null:<Text style={{color:'red'}}>Nhập lại mật khẩu không chính xác</Text>}
               
>>>>>>> Hoang
            </View>

            <TouchableOpacity style={styles.uploadStatus} onPress={() => handleChange()}>
                    <Text style={{ fontSize: 18, fontWeight: "600", color: "white" }}>
                        Cập nhật
                    </Text>
                </TouchableOpacity>


        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',

    },
    title: {
        width: '100%',
        alignItems: 'flex-start',
        fontSize: 14,
        padding: 12,
        backgroundColor: "#F4F5F6"
    },

    header: {
        backgroundImage: 'linear-gradient(90deg, #006AF5 30%, #5ac8fa 100%)',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        height: '8%',
        width: '100%'
    },

    name: {
        color: 'white',
        marginLeft: 20,
        fontSize: 18,
        fontWeight: "400"
    },

    txtSDT: {
        borderBottomWidth: 1,
        fontSize: 16,
        color: 'gray',
        padding: 10,
    },

    btnForgetPass: {
        marginTop: 5,
        width: "90%",
        height: 40,
        color: '#006AF5',
        fontSize: 18,
        fontWeight: 'bold'
    },

    btnQuestion: {
        color: 'gray',
        fontSize: 18,
    },

    confirm: {
        width: "90%",
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        bottom: 0,
        position: 'absolute',
        padding: 10
    },

    btnconfirm: {
        backgroundColor: 'gray',
        borderRadius: '50%',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    uploadStatus: {
        width: "90%",
        height: 40,
        backgroundColor: '#006AF5',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
        marginLeft: 20
    },
});