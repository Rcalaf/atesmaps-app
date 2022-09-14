import React, { useState, useEffect, useContext } from 'react';
import type {Node} from 'react';

import {
    StatusBar,
    StyleSheet,
    useColorScheme,
    View,
    Text,
    TouchableOpacity
  } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthContext } from '../context/AuthContext';

const Stack = createNativeStackNavigator();

const Profile: () => Node = () => {

const {logout} = useContext(AuthContext);

return(


    <View style={styles.container}>
        <Text>This is your profile page</Text>
        <TouchableOpacity style={{backgroundColor: '#3098CF', padding: 20, borderRadius:10, marginBottom: 20}} onPress={() => {logout()}}>
          <Text style={{textAlign:'center', color:'#fff', fontWeight: '700', fontSize: 17  }}>Logout</Text>
        </TouchableOpacity>
    </View>
    
 
)};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
  });

export default Profile;