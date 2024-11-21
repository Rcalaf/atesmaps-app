import React, { useState, useEffect,useContext } from 'react';

import type {Node} from 'react';

import {
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
import WeatherObservationTypeDetail from '../screens/WeatherObservationTypeDetail';
import AvalancheObservationTypeDetail from '../screens/AvalancheObservationTypeDetail';
import SnowpackObservationTypeDetail from '../screens/SnowpackObservationTypeDetail';
import AccidentObservationTypeDetail from '../screens/AccidentObservationTypeDetail';
import ObservationImageList from '../screens/ObservationImageList';
import LocationPicker from '../screens/LocationPicker';
import ShowObservation from '../screens/ShowObservation';


import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import {ObservationContext } from '../context/ObservationContext';
import {LocationContext } from '../context/LocationContext';

const Stack = createNativeStackNavigator();

const ObservationStack: () => Node = ({ navigation, route }) => {

const {lastIndex, selectedIndex} = useContext(ObservationContext);
// let index = observations.length > 0 ? observations.length-1 : 0;

return(
    <Stack.Navigator> 
      <Stack.Group>
        <Stack.Screen name="Observaciones" component={Observations} />
        <Stack.Screen 
          name="Observación" 
          component={ObservationDetail}
          options={{
            headerShown: true,
        }} />
        <Stack.Screen name="Detalles" component={ShowObservation} />
        <Stack.Screen name="Imagenes" component={ObservationImageList} />
        <Stack.Screen name="Ubicación" component={LocationPicker} />
        <Stack.Screen name="Rapida" component={QuickObservationTypeDetail} />
        <Stack.Screen name="Avalancha" component={AvalancheObservationTypeDetail} />
        <Stack.Screen name="Manto de nieve" component={SnowpackObservationTypeDetail} />
        <Stack.Screen name="Accidente" component={AccidentObservationTypeDetail} />
        <Stack.Screen name="Tiempo" component={WeatherObservationTypeDetail} />
        
      </Stack.Group>
      
    </Stack.Navigator>
)};



export default ObservationStack;