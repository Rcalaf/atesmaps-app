import React, { useState, useEffect } from 'react';
import type {Node} from 'react';

import {
    StatusBar,
    StyleSheet,
    useColorScheme,
    View,
    Text,
    Image,
    TouchableOpacity
  } from 'react-native';

import CustomButtom from '../../components/CustomButtonOld'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { render } from 'react-native/Libraries/Renderer/implementations/ReactNativeRenderer-prod';

const Stack = createNativeStackNavigator();

const Welcome: () => Node = ({ navigation }) => {
// console.log(navigation);
return(
    <View style={styles.container}>
       
        <View style={styles.backgroundContainer}>
            <View>
                <Image
                style={styles.backgroundImage}
                source={require('../../../assets/images/backgrounds/background.jpg')}
                />
            </View>
           <View style={{position: 'relative', top: '-70%',justifyContent: 'center',alignItems: 'center'}}>
                <Image
             
                source={require('../../../assets/images/logos/logo-vertical-white.png')}
                /> 
            </View>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={{width: '47%',backgroundColor: '#3098CF', padding: 20, borderRadius:10, height: 65, marginBottom: 20}}  onPress={() => navigation.navigate('Login')}>
              <Text style={{textAlign:'center', color:'#fff', fontWeight: '700', fontSize: 17  }}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{width: '47%',backgroundColor: '#3098CF', padding: 20, borderRadius:10, height: 65, marginBottom: 20}}  onPress={() => navigation.navigate('Register')}>
              <Text style={{ textAlign:'center', color:'#fff', fontWeight: '700', fontSize: 17  }}>Register</Text>
          </TouchableOpacity>
            {/* <CustomButtom
                title='Login'
                color='#3098CF'
                styles={styles.loginButton}
                onPress={() => navigation.navigate('Login')}
            /> */}
             {/* <CustomButtom
                title='Register'
                color='#3098CF'
                styles={styles.registerButton}
                onPress={() => navigation.navigate('Register')}
            /> */}
        </View>
    </View>
)};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginButton: {
        alignItems: 'center',
        width: '45%',
        height: '25%',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#3098CF',
        marginTop: 15,
    },
    registerButton: {
        alignItems: 'center',
        width: '45%',
        height: '25%',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        color: 'black',
        backgroundColor: '#fff',
        marginTop: 15,
    },
    buttonsContainer: { 
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height: '30%',
        padding: 20,
    },
    backgroundImage: {
        height: '100%',
        width: '100%',
    },
    backgroundContainer:{
        height: '100%',
        width: '100%',
    }
  });

export default Welcome;