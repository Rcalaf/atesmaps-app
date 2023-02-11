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
    // console.log(data);
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
            keyboardType='email-address'
            rules={{required: 'Introduce el Email'}}
            />

          <CustomInput
            name="password"
            placeholder="Password"
            control={control}
            // customStyles={{width:"100%"}}
            secureTextEntry={true}
            rules={{required: 'Introduce el password'}}
            />
          <TouchableOpacity style={{alignItems: 'flex-end', marginBottom: 25}} onPress={() => {navigation.navigate('Forgot');}}>
                 <Text style={{color: '#3098CF', fontWeight: '700'  }}>Olvidaste el password?</Text>
          </TouchableOpacity>
          <View style={{marginTop: 0}}>
                <CustomButton text="Login" bgColor={"#3098CF"} fgColor='white' iconName={null} onPress={handleSubmit(submit)} />
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: 30}}>
            <Text> Crear una cuenta:</Text>
            <TouchableOpacity onPress={() => {
              //navigation.popToTop();
              navigation.navigate('Register');
            }}>
                <Text style={{color: '#3098CF', fontWeight: '700'  }}>  Registrarse</Text>
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