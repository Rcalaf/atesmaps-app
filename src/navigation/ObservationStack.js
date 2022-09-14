import React, { useState, useEffect,useContext } from 'react';

import type {Node} from 'react';

import {
    StatusBar,
    StyleSheet,
    Button,
    Pressable,
    useColorScheme,
    View,
    Text,
  } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Observations from '../screens/Observations';
import ObservationDetail from '../screens/ObservationDetail';
import QuickObservationTypeDetail from '../screens/QuickObservationTypeDetail';
import AvalancheObservationTypeDetail from '../screens/AvalancheObservationTypeDetail';
import SnowpackObservationTypeDetail from '../screens/SnowpackObservationTypeDetail';
import ObservationImageList from '../screens/ObservationImageList';
import LocationPicker from '../screens/LocationPicker';


import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import {ObservationContext } from '../context/ObservationContext';
import {LocationContext } from '../context/LocationContext';

const Stack = createNativeStackNavigator();

const Observation: () => Node = ({ navigation, route }) => {

const {lastIndex, selectedIndex, setSelectedIndex, observations, newObservation, deleteObservation} = useContext(ObservationContext);
// let index = observations.length > 0 ? observations.length-1 : 0;

useEffect(()=>{
  console.log('new index recieved...');
},[lastIndex]);

useEffect(()=>{
  console.log('new selected index recieved...');
},[selectedIndex]);

const {location} = useContext(LocationContext);

const observation = {
  title: 'Has no title',
  date: Date.now(),
  location: {
    latitude: location.latitude,
    longitude: location.longitude
  },
  observationTypes:{},
  status: 0,
}

return(
    <Stack.Navigator> 
      <Stack.Screen 
        name="Lista de Observaciones" 
        component={Observations} 
        options={{
          headerShown: true ,
        //headerTitle: () => <Text>Title...</Text>,
          headerRight: () => (
           
            <Pressable
              onPress={() => {
                newObservation(observation);
                let index = lastIndex;      
                navigation.navigate('Observación', {index})
                }}
            >
                <MaterialCommunityIcons size={25} 
            color={'#307df6'} name="eye-plus"/>
            </Pressable>
            // <Button
            //   onPress={() => {
            //     newObservation(observation);
            //     let index = lastIndex;      
            //     navigation.navigate('Observación', {index})
            //     }
            //   }
            //   title="Add"
            //   // color="#000"
            // />
            
        )
      }}/>
      <Stack.Screen 
        name="Observación" 
        component={ObservationDetail}
        options={{
          headerShown: true ,
        //headerTitle: () => <Text>Title...</Text>,
          headerRight: () => (
            <Button
              onPress={() => {
                let index = selectedIndex;
                console.log(index);
                deleteObservation();
                navigation.navigate('Lista de Observaciones');
              }
              }
              title="Remove"
              color="#f00"
            />
        )
      }} />
      <Stack.Screen name="Imagenes" component={ObservationImageList} />

      <Stack.Screen 
          name="Location Picker" 
          component={LocationPicker} 
          // options={{
          //   headerRight: () => (
          //     <Button
          //       onPress={() => {
          //         let index = selectedIndex;
          //         navigation.navigate('Observación', {index, update:true})
          //       }}
          //       title="Save"
          //     />
          //   )}}
          />
      <Stack.Screen name="Rapida" component={QuickObservationTypeDetail} />
      <Stack.Screen name="Avalancha" component={AvalancheObservationTypeDetail} />
      <Stack.Screen name="Manto de nieve" component={SnowpackObservationTypeDetail} />

    </Stack.Navigator>
)};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
  });

export default Observation;