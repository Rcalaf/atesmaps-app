import React, { useState, useEffect, useContext } from 'react';
import type {Node} from 'react';

import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    useColorScheme,
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity
  } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useForm, Controller } from "react-hook-form";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../../context/AuthContext';

import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";

const Stack = createNativeStackNavigator();

const Login: () => Node = ({navigation}) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const {login} = useContext(AuthContext);
  const { control, handleSubmit, formState: { errors }, getValues, setValue } = useForm({
    //defaultValues: preloadedValues
    defaultValues: {
        email: '',
        password: '',
    }
  });

  const submit = (data) => {
    console.log('performing login...');
    console.log(data);
    login(data.email, data.password);
  }

  return(

      <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
        <View style={{paddingHorizontal: 25}}>
          {/* <View>
              <Text style={{fontSize: 28, fontWeight: '500', color: '#333', marginBottom: 25}}>Login</Text>
          </View> */}

          <View style={{top: '-15%',justifyContent: 'center',alignItems: 'center'}}>
                <Image
                style={{height: 200, width: 235}}
                 source={require('../../../assets/images/logos/logo-vertical-small.png')}
                /> 
          </View>

          <CustomInput
            name="email"
            placeholder="Email"
            control={control}
            // customStyles={{width:"100%"}}
           
            rules={{required: 'Introduce el Email'}}

            // onPress={showDatepicker}
            />

          {/* <View style={{flexDirection: 'row', borderBottomColor:'#ccc', borderBottomWidth: 1, paddingBottom: 8, marginBottom: 25}}>
            <MaterialIcons name='alternate-email' size={20} color="#333" style={{marginRight: 5}}/>
            <TextInput 
              placeholder='Email' 
              style={{flex: 1, paddingVertical: 0}} 
              keyboardType='email-address'
              value={email}
              onChangeText={text => setEmail(text)} />

          </View> */}

          <CustomInput
            name="password"
            placeholder="Password"
            control={control}
            // customStyles={{width:"100%"}}
            secureTextEntry={true}
            rules={{required: 'Introduce el password'}}
            // onPress={showDatepicker}
            />
          {/* <View style={{flexDirection: 'row', borderBottomColor:'#ccc', borderBottomWidth: 1, paddingBottom: 8, marginBottom: 25}}>
            <MaterialIcons 
              name='lock' 
              size={20} 
              color="#333" 
              style={{marginRight: 5}}/>
            <TextInput 
              placeholder='Password' 
              style={{flex: 1, paddingVertical: 0}} 
              secureTextEntry={true}
              value={password}
              onChangeText={text => setPassword(text)} />
              <TouchableOpacity onPress={() => {
                  navigation.navigate('Forgot');
              }}>
                 <Text style={{color: '#3098CF', fontWeight: '700'  }}>Forgot?</Text>
              </TouchableOpacity>
          </View> */}
          <TouchableOpacity style={{alignItems: 'flex-end', marginBottom: 25}} onPress={() => {navigation.navigate('Forgot');}}>
                 <Text style={{color: '#3098CF', fontWeight: '700'  }}>Forgot?</Text>
          </TouchableOpacity>
          <View style={{marginTop: 0}}>
                <CustomButton text="Login" bgColor={"#3098CF"} fgColor='white' iconName={null} onPress={handleSubmit(submit)} />
            </View>
          {/* <TouchableOpacity style={{backgroundColor: '#3098CF', padding: 20, borderRadius:10, marginBottom: 20}} onPress={() => {
            login(email, password)
          }}>
              <Text style={{textAlign:'center', color:'#fff', fontWeight: '700', fontSize: 17  }}>Login</Text>
          </TouchableOpacity> */}

          <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: 30}}>
            <Text>New to AtesMaps?</Text>
            <TouchableOpacity onPress={() => {
              //navigation.popToTop();
              navigation.navigate('Register');
            }}>
                <Text style={{color: '#3098CF', fontWeight: '700'  }}>  Register</Text>
            </TouchableOpacity>
          </View>
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

export default Login;