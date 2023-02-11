import React, { useState, useEffect, useLayoutEffect, useContext } from 'react';
import type {Node} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    TouchableOpacity
  } from 'react-native';

import CustomButton from "../components/CustomButton";

import { LocationContext } from '../context/LocationContext';

const TrackRecorder: () => Node = () => {
    const { unsubscribeLocation, subscribeLocation, position, watchId } = useContext(LocationContext);
    const [recording, setRecording] = useState(false);

    const handleRecording = () => {
        setRecording(!recording);
    }

    useEffect(()=>{
        if(recording){
            subscribeLocation();
            console.log('subscribing location')
         }else{
            console.log(watchId)
            unsubscribeLocation();
            console.log('unsubscribing location')
         }
    },[recording])

    useLayoutEffect(()=>{
      console.log('updating Postion?')
    },[position])

    return(
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.container}>
                <Text>Current GPS data:</Text>
                <View style={styles.spacer}></View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{marginRight: 30}}>Latitude:{position.coords.latitude}</Text>
                    <Text>Longitude:{position.coords.longitude}</Text>
                </View>
                <Text>Altitude:{position.coords.altitude}</Text>
                <Text>Accuracy:{position.coords.accuracy}</Text>
                <Text>Heading:{position.coords.heading}</Text>
                <Text>Speed:{position.coords.speed}</Text>
                <View style={{marginTop: 50}}>
                    <CustomButton text={recording ? 'Detener' : 'Empezar'} bgColor={"#3098CF"} fgColor='white' iconName={null} onPress={handleRecording} />
                </View>
            </View>
        </SafeAreaView>
        
)};




const styles = StyleSheet.create({
  safeContainer: {
      flex: 1,
    //  flexDirection: 'column',
       justifyContent: 'center',
  },
  container: {
    // flex: 1,
    justifyContent: 'center',
    padding: 15,
  },    
  spacer: {
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'gray',
    height: 1,
  },
  space: {
    height: 50,
  }
});

export default TrackRecorder;