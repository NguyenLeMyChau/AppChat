import { useEffect, useState } from "react";
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import xichtamtuanthienpic from '../assets/xichtamtuanthien_dot1.png';
import { useNavigation } from "@react-navigation/native";

export default function Body(){
    const navigation = useNavigation();
    const [data,setData] = useState('');
    useEffect(() => {
        
        fetchData();
      }, []);
    const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:3000/Truyen'); // URL của JSON Server
          const db = await response.json();
          setData(db)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    return (
        <View style={styles.container}>
          <ScrollView>
          <img src={xichtamtuanthienpic} width='390px' height='200px' alignItems= 'center'
            justifyContent= 'center'  >
            </img>
            <Text style={{fontSize: 20}}>Mới nhất</Text>
            <ScrollView horizontal={true}>
              <FlatList
                  data={data}
                  renderItem={({item})=> (
                      <TouchableOpacity onPress={()=>navigation.navigate('Story',{item})}>
                          <Image source={{uri:item.img}}
                          style = {styles.image}/>
                          
                      </TouchableOpacity>
                  )}
                  numColumns={4}
              />
              </ScrollView>

              <View style={{flexDirection: 'row'}}>
                <View style={styles.Text}>
                  <Text style={{fontSize: 18,marginBottom: 10}}>Huyền Huyễn</Text>
                  <Text style={styles.boldText}>Xích Tâm Tuần Thiên</Text>
                  <Text style={styles.lightText}>Ta có xích tâm một viên, lấy tuần thiên!</Text>
                 
                  <FlatList
                  data={data.slice(0, 1)} // Lấy chỉ một phần tử từ mảng data
                  renderItem={({item}) => (
                    <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('Story', {item})}>
                    <Text style={styles.buttonText}>Đọc</Text>
                  </TouchableOpacity>
                  )}
                  numColumns={2}
                  />
                </View>
                <FlatList
                  data={data.slice(0, 1)} // Lấy chỉ một phần tử từ mảng data
                  renderItem={({item}) => (
                      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Story', {item})}>
                          <Image source={{uri: item.img}} style={styles.img}/>
                      </TouchableOpacity>
                  )}
                  numColumns={2}
              />
              </View>
                <Text style={{fontSize: 20}}>Đề cử</Text>
                <FlatList
                  data={data}
                  renderItem={({item})=> (
                      <TouchableOpacity onPress={()=>navigation.navigate('Story',{item})}>
                          <Image source={{uri:item.img}}
                          style = {styles.image}/>
                          
                      </TouchableOpacity>
                  )}
                  numColumns={4}
              />
              <View>
              <Text style={{fontSize: 20}}>Thịnh hành</Text>
                <FlatList
                  data={data}
                  renderItem={({item})=> (
                      <TouchableOpacity onPress={()=>navigation.navigate('Story',{item})}>
                          <Image source={{uri:item.img}}
                          style = {styles.image}/>
                          
                      </TouchableOpacity>
                  )}
                  numColumns={4}
              />
              </View>
          </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    item:{
        width:300,
        flexDirection:'column'
    },
    theLoai:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    name:{
        height:100,
        marginTop: 10,
        marginLeft:10,
        fontWeight:"bold",
    },
    title:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        height:'10%',
        width:'100%'
      },
      imageColumn: {
        flexDirection: 'column', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginVertical: 10,
      },
      image: {
        width: 100,
        height: 100,
        borderRadius: 8, 
      },
      Text: {
        flexDirection: 'column',
      },  buttonContainer: {
        backgroundColor: 'black', 
        borderRadius: 5,
        width: '80px',
      },
      buttonText: {
        color: 'white', 
        fontSize: 16,
        textAlign: 'center',
      },
      boldText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
      },
      lightText: {
        fontSize: 14,
        fontWeight:'lighter',
        marginBottom: 10
      },
      img: {
        width: 180,
        height: 180,
        borderRadius: 8, 
      },
})
