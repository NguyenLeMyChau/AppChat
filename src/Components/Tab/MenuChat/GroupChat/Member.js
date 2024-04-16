import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { AntDesign, Octicons } from '@expo/vector-icons';

const GroupMembersScreen = ({navigation, route }) => {
    const { user,group } = route.params;
  const [members, setMembers] = useState([]);


  useEffect(() => {
    fetchGroupMembers();
  }, []);

  const fetchGroupMembers = async () => {
    try {
    const response = await axios.get(`http://localhost:4000/group/getGroupMembers/${group._id}`);
      setMembers(response.data.groupMembers);
    } catch (error) {
      console.error('Error fetching group members:', error);
    }
  };

  const renderMemberItem = ({ item }) => (
    <View style={styles.memberItem}>
      <Text style={{fontSize:16}}>{item.name}</Text>
      <Text style={{fontSize:12}}>{item.role?item.role:null}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
         <View
        style={{
          backgroundImage: "linear-gradient(90deg, #006AF5 30%, #5ac8fa 100%)",
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingVertical: 8,
          height: "8%",
          width: "100%",
        }}
      >
        <TouchableOpacity>
          <Octicons
            name="arrow-left"
            size={25}
            color="white"
            onPress={() => navigation.goBack()}
          />
        </TouchableOpacity>

        <Text
          style={{
            color: "white",
            marginLeft: 20,
            fontSize: 18,
            fontWeight: "400",
            width:'85%'
          }}
        >
          Thành viên
        </Text>
        <TouchableOpacity style={{ marginRight: 20 }} onPress={()=>navigation.navigate('AddMember',{user:user,group:group})}>
          <AntDesign name="adduser" size={20} color="white" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={members}
        renderItem={renderMemberItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  memberItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    padding:10
  },
});

export default GroupMembersScreen;
