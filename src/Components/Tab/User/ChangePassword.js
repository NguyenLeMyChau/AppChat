import { useContext, useState } from 'react';
import { Alert, TextInput, TouchableOpacity } from 'react-native';
import { StyleSheet, View, Text } from 'react-native';
import { Octicons, AntDesign, Entypo, SimpleLineIcons } from "@expo/vector-icons";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRef } from 'react';
import { useEffect } from 'react';

export default function ChangePassword({ navigation }) {
    const [userData, setUserData] = useState({});
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordNew, setPasswordNew] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [OldpasswordValid, setOldPasswordValid] = useState('');


    const handleCheckOldPass = async (text) => {
        try {
            const response = await axios.post(
                "https://backend-chatapp-rdj6.onrender.com/user/login",
                {
                    email: userData.email,
                    password: text,
                }
            );
            const { data } = response; // data = response.data
            if (data.success) {
                setOldPasswordValid(true);
            } else {
                setOldPasswordValid(false);
            }
        } catch (error) {
            setOldPasswordValid(false);
        }
    };
    


    // const {login} = useContext(AuthContext);

    const [isFocus, setIsfocus] = useState(false);
    const handleFocus = () => setIsfocus(true);
    const handleBlur = () => setIsfocus(false);

    const [passwordFocus, setpasswordfocus] = useState(false);
    const handlePasswordFocus = () => { setpasswordfocus(true); }
    const handlePasswordBlur = () => { setpasswordfocus(false); }

    const [rePasswordFocus, setrepasswordfocus] = useState(false);
    const [confirmRepassword,setconfirmRePassword] = useState(true);
    
    const handleRePasswordChange = (text) => {
        setRePassword(text);
        if (passwordNew !== text) {
            setconfirmRePassword(false);
        } else {
            setconfirmRePassword(true);
        }
    };


    async function getData() {
        const foundUser = await AsyncStorage.getItem('foundUser');     
        console.log(foundUser) 
        setUserData(JSON.parse(foundUser));
        //JSON.parse(foundUser) chuyển chuỗi JSON thành object
    }
    
    useEffect(() => {
        getData();
    }, []);

    const handleChange = async () => {
        const response = await axios.put(`https://backend-chatapp-rdj6.onrender.com/user/updatePassword/${userData.email}`, {currentPassword:password,newPassword: passwordNew});
        const { data } = response;

        if (data.success) {
            Alert.alert(data.message);
            alert(data.message);
            console.log(data.message);
            setPassword('');
            setPasswordNew('');
            setRePassword('');
            await navigation.navigate("HomeLoginZalo");
        } else {
            Alert.alert(data.message);
            alert(data.message);
        }
    }

    const [isNewPasswordValid, setIsNewPasswordValid] = useState();
      
      const handleCheckNewPass = (text) => {
        setPasswordNew(text);
        if (password === text || text.length <8 ) {
          let isMatch = true;
          for (let i = 0; i < password.length; i++) {
            if (password[i] !== text[i]) {
              isMatch = false;
              break;
            }
          }
          if ((isMatch && password.length === text.length) || text.length<8) {
            setIsNewPasswordValid(false);
          } 

        } 
        else {
          setIsNewPasswordValid(true);
        }
      };

      


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
                    style={[styles.txtSDT, { borderBottomColor: OldpasswordValid ? 'black' : 'red' }]}
                    placeholder="Nhập mật khẩu hiện tại"
                    onChangeText={(text) => setPassword(text)}
                    onBlur={() => handleCheckOldPass(password)}
                    value={password}
                    underlineColorAndroid="transparent"
                />

                {!OldpasswordValid && <Text style={{color: 'red'}}>Mật khẩu hiện tại không đúng! </Text>}    


                <Text style={{ fontSize: 16, color: 'black', padding: 10, fontWeight: 'bold', marginTop: 20 }}>Mật khẩu mới</Text>

                <TextInput
                    style={[styles.txtSDT,{  borderBottomColor: isNewPasswordValid ? 'black' : 'red' }]}
                    placeholder="Nhập mật khẩu mới"
                    value={passwordNew}
                    onChangeText={handleCheckNewPass}
                    underlineColorAndroid="transparent"
                    secureTextEntry={true}
                />
                {!isNewPasswordValid && <Text style={{color: 'red'}}>Mật khẩu mới phải lớn hơn 8 kí tự </Text>}    


                <TextInput
                    style={styles.txtSDT}
                    placeholder="Nhập lại mật khẩu mới"
                    value={rePassword}
                    onChangeText={handleRePasswordChange}
                    underlineColorAndroid="transparent"
                    secureTextEntry={true}
             
                />
                {confirmRepassword?null:<Text style={{color:'red'}}>Nhập lại mật khẩu không chính xác</Text>}
               
            </View>

            <TouchableOpacity style={styles.uploadStatus} onPress={async() => {
                if(isNewPasswordValid && confirmRepassword && OldpasswordValid ){
                    if(password === passwordNew){
                        Alert.alert("Vui lòng nhập mật khẩu mới khác mật khẩu cũ!")
                    }
                    else
                    await handleChange();
                }
                else{
                    console.log("Vui long kiem tra lai thong tin!");
                }
            }}>
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
        backgroundColor: 'blue',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        height: 50,
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
