import React, { useState, useEffect, useContext } from 'react';
import type {Node} from 'react';
import axios from 'axios';

import { BASE_URL } from '../../config';

import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    useColorScheme,
    View,
    Text,
    TextInput,
    TouchableOpacity
  } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../../context/AuthContext';

const Stack = createNativeStackNavigator();

const ForgotPassword: () => Node = ({navigation}) => {
  const [email, setEmail] = useState(null);

  const {login} = useContext(AuthContext);

  const resetPassword = async (email) => {
    console.log('Email sent: '+email);
    try{
      let response = await axios.post(`${BASE_URL}/auth/resetpassword`,{'email': email});
      console.log(response);
    }catch (err){
      console.log(err);
    }
    
  }

  return(

      <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
        <View style={{paddingHorizontal: 25}}>
         <View>
              <Text style={{height: 100, fontSize: 14, textAlign: 'center', fontWeight: '200', color: '#333', marginBottom: 25}}>Introduce el email de tu cuenta AtesMaps y se enviará un correo con un link para resetear tu password.</Text>
         </View> 

          
          <View style={{flexDirection: 'row', borderBottomColor:'#ccc', borderBottomWidth: 1, paddingBottom: 8, marginBottom: 25}}>
            <MaterialIcons name='alternate-email' size={20} color="#333" style={{marginRight: 5}}/>
            <TextInput 
              placeholder='Email' 
              style={{flex: 1, paddingVertical: 0}} 
              keyboardType='email-address'
              value={email}
              onChangeText={text => setEmail(text)} />

          </View>
          
          <TouchableOpacity style={{backgroundColor: '#3098CF', padding: 20, borderRadius:10, marginBottom: 20}} onPress={() => {
             resetPassword(email)
          }}>
              <Text style={{textAlign:'center', color:'#fff', fontWeight: '700', fontSize: 17  }}>Enviar Petición</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
 
)};

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
  });

export default ForgotPassword;