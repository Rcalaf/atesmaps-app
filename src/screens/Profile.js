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
import { AccessControlTranslationFilterSensitiveLog } from '@aws-sdk/client-s3';
import  Snackbar  from "react-native-snackbar";

// const Stack = createNativeStackNavigator();



const Profile: () => Node = () => {

const {logout, updateUser, userDetails, userToken} = useContext(AuthContext);

const [user, setUser] = useState(userDetails);
const [isLoading, setIsLoading] = useState(false);

const sentData = async (id,data) => {
  setIsLoading(true);
  try {
    const response = await axios({
      method: "put",
      url: `${BASE_URL}/users/${id}`,
      data: data,
      //headers: { "Content-Type": "multipart/form-data" },
      headers: {"Authorization": `Bearer ${userToken}`}
    });
    //let response = await axios.post(`${BASE_URL}/users/${id}`,data,{ "Content-Type": "multipart/form-data" });
    // console.log('-----Performed a user updat to the API-----')

    await updateUser(response.data);
    if (response.status === 200){
      setIsLoading(false);
      Snackbar.show({
        text: 'Los datos se actualizaron correctamente.',
        duration: Snackbar.LENGTH_SHORT,
        numberOfLines: 2,
        textColor: "#fff",
        backgroundColor: "#62a256",
      });
    }
  } catch (error) {
    console.log('error triggered while sending data')
    console.log(error);
    setIsLoading(false);
    Snackbar.show({
      text: 'Ooops, algo fue mal.',
      duration: Snackbar.LENGTH_SHORT,
      numberOfLines: 2,
      textColor: "#fff",
      backgroundColor: "#B00020",
    });
  }
  
};

useEffect(()=>{
  console.log('userDetails updeted on profile component...');
},[userDetails]);


const onSubmit = (data) => {
  //console.log(getValues('password'));
  //console.log(getValues('password') != '')
  //console.log(user);
  let formData = new FormData(data);
  sentData(userDetails._id, data);
  //console.log(formData);
  //console.log(data);
};


if( isLoading ) {
  return(
      <View style={{flex:1, justifyContent: 'center', alignItems:'center'}}>
          <ActivityIndicator size={'large'}/> 
      </View>
  )
}


return user ? (
  <SafeAreaView style={styles.safeContainer}>
    <ScrollView style={styles.container}>
      <UserForm preloadedValues={user} onSubmit={onSubmit}/>
      {/*<View>
        <CustomButton text="Logout" bgColor={"#f00"} fgColor='white' iconName={null} onPress={() => {logout()}} />
      </View>*/}
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