import React, { useState, useEffect, useContext } from 'react';
import type {Node} from 'react';

import {
    StatusBar,
    StyleSheet,
    useColorScheme,
    View,
    Text,
    TouchableOpacity,
    SafeAreaView
  } from 'react-native';

 import axios from 'axios';
 import { BASE_URL } from '../config';

// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import DateTimePicker from '@react-native-community/datetimepicker';

import { AuthContext } from '../context/AuthContext';
import { useForm, Controller } from "react-hook-form";

// const Stack = createNativeStackNavigator();



const Profile: () => Node = () => {

const {logout, userDetails,userToken} = useContext(AuthContext);

// useEffect(()=>{
//   console.log('Showing Profile');
//   console.log(userDetails);
//   let response = axios.post(`${BASE_URL}/users`,{'id': userDetails.id},{
//     headers: { Authorization: `Bearer ${userToken}` }});
//   console.log(response.data);
//  // console.log(observation);
// },[]);

useEffect(()=>{
  console.log(userDetails);
  console.log(userDetails.accessToken);
},[])

const showDatepicker = () => {
  // console.log('showing date picker...');
  // showMode('date');
  setShow(!show);
};

const { control, handleSubmit, formState: { errors }, getValues, setValue } = useForm({
  defaultValues: {
    name: "",
    email: userDetails.email,
    password: "",
  }
});

const onSubmit = (data) => {
  console.log(data);
};

return(
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View style={{marginTop: 50}}>
            <Text>This is your profile page</Text>
            <CustomInput
              name="email"
              placeholder="Email"
              control={control}
              rules={{required: 'Email is required'}}
              // onPress={showDatepicker}
            />

            <CustomInput
              name="password"
              placeholder="Password"
              control={control}
              rules={{required: 'password is required'}}
              // onPress={showDatepicker}
            />

          </View>
          <View style={{marginTop: 50}}>
          <Text>This is your profile page</Text>
          <CustomInput
            name="name"
            placeholder="Nombre"
            control={control}
            rules={{required: 'Name is required'}}
            // onPress={showDatepicker}
          />

          <Text>This is your profile page</Text>
          <CustomInput
            name="lastName"
            placeholder="Apellidos"
            control={control}
            rules={{required: 'lastName is required'}}
            // onPress={showDatepicker}
          />

        </View>
        <View style={{marginTop: 50}}>
            <CustomButton text="Guardar" bgColor={"#62a256"} fgColor='white' iconName={null} onPress={handleSubmit(onSubmit)} />
        </View>
        <View>
          <Text>This is your profile page</Text>
          <TouchableOpacity style={{backgroundColor: '#3098CF', padding: 20, borderRadius:10, marginBottom: 20}} onPress={() => {logout()}}>
            <Text style={{textAlign:'center', color:'#fff', fontWeight: '700', fontSize: 17  }}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
    
 
)};

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    container: {
      flex: 1,
      padding: 15
    },
  });

export default Profile;