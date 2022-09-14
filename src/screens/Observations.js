import React, {useState, useEffect, useContext} from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  Image, 
  Button,
  TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { ObservationContext } from '../context/ObservationContext';
import {LocationContext } from '../context/LocationContext';

import Item from '../components/ObservationItem';

export default function ObservationDetail({ navigation }) {
    const {location} = useContext(LocationContext);
    const {lastIndex, observations, newObservation} = useContext(ObservationContext);


    
    //const [numOfItems, setNumOfItems] = useState(setNumOfItems)

    // console.log(observations.length);

    if( observations.length < 1 ) {

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
        <View style={styles.container}>
        <MaterialIcons 
           // name='add-a-photo'
           name='my-library-books'
           size={50} 
           color={'gray'}
           style={{marginBottom: 20}}/>
       <Text>No se ha creado ninguna observación.</Text>
       <Button style={styles.button} title="Añadir observación"  onPress={() => {
                newObservation(observation);
                let index = lastIndex;      
                navigation.navigate('Observación', {index})
                }} />
   </View>
      )
    }
  

    return (

        <View style={styles.listContainer}>
           <FlatList
            data={observations}
            renderItem={({ item, index }) => <Item item={item} index={index} navigation={navigation}/>}
            keyExtractor={(item,index) => index}
            />
        </View>
    );

}

const styles = StyleSheet.create({
    listContainer: {
      flex: 1,
      //padding: 36
    },
    container: {
      paddingTop: 100,
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
    }
  });