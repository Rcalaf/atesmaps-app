import React, {useState, useEffect, useLayoutEffect, useContext} from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  SectionList,
  Pressable,
  Image, 
  Button,
  TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { AuthContext } from '../context/AuthContext';
import { ObservationContext } from '../context/ObservationContext';
import {LocationContext } from '../context/LocationContext';

import Item from '../components/ObservationItem';

export default function ObservationDetail({ navigation }) {
    const {location} = useContext(LocationContext);
    const {lastIndex, observations, historicObservations, newObservation} = useContext(ObservationContext);
    const {isLoading, logout, userDetails, userToken} = useContext(AuthContext);

    console.log(observations);
    console.log(historicObservations);

    let observation = {
      title: 'Has no title',
      date: Date.now(),
      location: {
        latitude: location.latitude,
        longitude: location.longitude
      },
      observationTypes:{},
      status: 0,
      submitted: false,
    }

    useLayoutEffect(() => {
      navigation.setOptions({
        // title: value === '' ? 'No title' : value,
        headerRight: userDetails.status ? () => (
                <Pressable
                  onPress={async ()  => {
                    await newObservation(observation);
                    let index = lastIndex;      
                    navigation.navigate('Observación', {index})
                    }}
                >
                  <MaterialCommunityIcons size={25} 
                                        color={'#307df6'} 
                                        name="eye-plus"/>
                </Pressable>
            ) :  null
      });
      //TODO: Here we can dynamically change the header of the screen....
      //check documentation here: https://reactnavigation.org/docs/navigation-prop/#setparams
    }, [navigation]);

    
    //const [numOfItems, setNumOfItems] = useState(setNumOfItems)

    // console.log(observations);

    if (!userDetails.status) {
      
      return ( 
        <View style={styles.container}>
        <MaterialCommunityIcons 
        
          // name='add-a-photo'
          name='account'
          size={50} 
          color={'gray'}
          style={{marginBottom: 20}}/>
        <Text>Por favor, antes de realizar observaciones,</Text>
        <Text>complete su perfil de usuario.</Text>
        <Text>Gracias.</Text>
        
        <Button style={styles.button} title="Volver al perfil"  onPress={async () => {
                navigation.navigate('Perfil')
                }} />
      </View>
    )};

    if( observations.length < 1 && historicObservations.lenght < 1) {
      return(
        <View style={styles.container}>
          <MaterialIcons 
            // name='add-a-photo'
            name='my-library-books'
            size={50} 
            color={'gray'}
            style={{marginBottom: 20}}/>
          <Text>No se ha creado ninguna observación.</Text>
          <Button style={styles.button} title="Añadir observación"  onPress={async () => {
                  await newObservation(observation);
                  let index = lastIndex;      
                  navigation.navigate('Observación', {index})
                  }} />
        </View>
      )
    }
  

    return (

        <View style={styles.listContainer}>
           <SectionList
              
              sections={[{index: 1, title:'Borradores', data: observations},{index: 2, title:'Historial', data: historicObservations}]}
              renderItem={({ item, index }) => <Item item={item} index={index} navigation={navigation}/>}
              // renderSectionHeader={({section})=>(
              //   <View style={{
              //                 borderBottomWidth: 1,
              //                 borderBottomColor: '#333',
              //                 marginBottom: 10,
              //                 // marginTop: (section.index > 1 ? 10 : 0)
              //                 }}>            
              //     <Text style={styles.taskTitle}>{section.title}</Text>
              //   </View>
              // )}
              keyExtractor={(item,index) => index}
              stickySectionHeadersEnabled
            />
           {/* <FlatList
            data={observations}
            renderItem={({ item, index }) => <Item item={item} index={index} navigation={navigation}/>}
            keyExtractor={(item,index) => index}
            /> */}
        </View>
    );r

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
    },
    taskTitle:{
      backgroundColor: "#ffffff",
      fontSize: 20,
      fontWeight: "bold",
      padding: 10,
      elevation: 4,
  
      
      
    }
  });