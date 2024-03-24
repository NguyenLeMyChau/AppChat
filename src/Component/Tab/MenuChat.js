import { useContext, useEffect, useState } from "react";
import { FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign, MaterialCommunityIcons, SimpleLineIcons } from "@expo/vector-icons";
import { AuthContext } from "../Login/AuthProvider";
import Header from "../Head/Header";

export default function MenuChat({ navigation }) {

  // const { user } = useContext(AuthContext);
  // console.log(user.sdt);
  // const [searchQuery, setSearchQuery] = useState("");
  // const [searchResults, setSearchResults] = useState([]);
  // const [listChat, setListChat] = useState([]);
  // const [listUsers, setListUsers] = useState([]);


  return (
    <View style={styles.container}>

      <View style={{
        flexDirection: "row", alignItems: 'center', width: "100%"
      }}>
        <Header />
          <TouchableOpacity style={{marginLeft: -90}}>
            <MaterialCommunityIcons name="qrcode-scan" size={25} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={{marginLeft: 20}}> 
            <AntDesign name="plus" size={25} color="white" />
          </TouchableOpacity>

      </View>


      {/* <View style={styles.header}>
        <TouchableOpacity style={styles.theLoai} onPress={handleSearch}>
          <SimpleLineIcons name="magnifier" size={20} color="white" />
        </TouchableOpacity>
        <TextInput
          style={{ height: 40, borderColor: 'blue', borderWidth: '0', paddingHorizontal: 10, width: '70%', color: 'white' }}
          onChangeText={(query) => setSearchQuery(query)}
          value={searchQuery}
          placeholder="Tìm kiếm"
        />
        <TouchableOpacity style={styles.theLoai} onPress={handleSearch}>
          <MaterialCommunityIcons name="qrcode-scan" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.theLoai} onPress={handleSearch}>
          <AntDesign name="plus" size={20} color="white" />
        </TouchableOpacity>

      </View> */}

      {/* <ScrollView style={{ backgroundColor: 'white', width: '100%' }}>
        <FlatList
            style= {styles.items}
                data={listChat}
                renderItem={({item})=> (                
                  <TouchableOpacity style={styles.item} onPress={()=>navigation.navigate('ChatScreen',{users:item})}>
                  <Image source={item.img} style={styles.image} />
                  
                  <View style={{width:'70%'}}>
                    <Text style={styles.name} numberOfLines ={1}>
                      {listUsers.name.find(u => u.sdt === item.users)}
                    </Text>
                  <Text style={styles.name} numberOfLines ={1}>
                     {item.messages}
                  </Text>
                  </View>
                  <View>
                    <Text style={styles.time}>Time</Text>
                    <Text style={styles.noti}>?</Text>
                  </View>
                
                </TouchableOpacity>
                
                )}
                
                numColumns={1}
                
            />
      </ScrollView> */}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  tittle: {
    fontSize: 20,
    color: 'white',
  },
  items: {

    marginTop: 5,
    width: "100%",
    borderRadius: 10,


    overflow: "hidden",
    borderWidth: 0,
  },
  item: {
    height: 70,
    width: '100%',
    flexDirection: 'row',
    padding: 15,

  },
  theLoai: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    borderRadius: '50%',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 'column'
  },
  name: {
    marginLeft: 10,
    height: 50,
    color: 'black',
    width: 150,
  },
  header: {
    backgroundImage: 'linear-gradient(90deg, #006AF5 30%, #5ac8fa	100%)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    height: '8%',
    width: '100%'
  },
  time: {
    color: 'black',
    fontSize: 12,

  },
  noti: {
    textAlign: 'center',
    fontSize: 10,
    color: 'white',
    borderWidth: 1,
    backgroundColor: 'black',
    borderRadius: 10,
    marginTop: 5,
  },
})
