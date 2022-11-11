import React, { useState, useEffect, useContext } from 'react';
import type {Node} from 'react';


import {
    StatusBar,
    StyleSheet,
    useColorScheme,
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    SafeAreaView,
    ActivityIndicator
  } from 'react-native';

import axios from 'axios';
import { BASE_URL } from '../config';

import { AuthContext } from '../context/AuthContext';

import UserForm from '../components/UserForm';
import CustomButton from "../components/CustomButton";


// const Stack = createNativeStackNavigator();



const Profile: () => Node = () => {

const {logout, userDetails,userToken} = useContext(AuthContext);

const [user, setUser] = useState(null);

const sentData = async (id,data) => {
  try {
    const response = await axios({
      method: "put",
      url: `${BASE_URL}/users/${id}`,
      data: data,
      //headers: { "Content-Type": "multipart/form-data" },
      headers: {"Authorization": `Bearer ${userToken}`}
    });
    //let response = await axios.post(`${BASE_URL}/users/${id}`,data,{ "Content-Type": "multipart/form-data" });
    console.log('-----Performed a user updat to the API-----')
    console.log(response);
  } catch (error) {
    console.log('error triggered while sending data')
    console.log(error);
  }
};

const getUserData = async (id) => {
  try{
    const response = await axios({
      method: "get",
      url: `${BASE_URL}/users/${id}`,
      //headers: { "Content-Type": "multipart/form-data" },
      headers: {"Authorization": `Bearer ${userToken}`}
    });
    //console.log(response.data);
    return response.data  
  }catch (error) {
    console.log(error);
  }
}

useEffect(()=>{
  const fetchUser = async () => {
    setUser(await getUserData(userDetails.userId))
  }
  fetchUser();
  console.log(user);
  //console.log(userDetails.accessToken);
},[])



const onSubmit = (data) => {
  //console.log(getValues('password'));
  //console.log(getValues('password') != '')
  //console.log(user);
  let formData = new FormData(data);
  sentData(userDetails.userId, data);
  //console.log(formData);
  //console.log(data);
};


return user ? (
  <SafeAreaView style={styles.safeContainer}>
  <ScrollView style={styles.container}>
    <UserForm preloadedValues={user} onSubmit={onSubmit}/>
    {/* <View>
      <CustomButton text="Logout" bgColor={"#f00"} fgColor='white' iconName={null} onPress={() => {logout()}} />
    </View> */}
    <View style={styles.space} />
  </ScrollView>
</SafeAreaView>

) : ( 
      <View style={{flex:1, justifyContent: 'center', alignItems:'center'}}>
        <ActivityIndicator size={'large'}/> 
      </View>
    )};



const styles = StyleSheet.create({
  safeContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      paddingBottom: 40
  },
  container: {
    flex: 1,
    padding: 15,
    
  },
  space: {
    height: 50,
  }
});

export default Profile;