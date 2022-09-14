
import React, { useState, useEffect, useLayoutEffect, useContext } from 'react';
import type {Node} from 'react';

import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    Button,
    TouchableOpacity,
  } from 'react-native';

 import { HeaderBackButton } from '@react-navigation/elements';
//import { HeaderBackButton } from '@react-navigation/stack';

import MapView, {Marker} from 'react-native-maps';

// import RNLocation from 'react-native-location';
import { ObservationContext } from '../context/ObservationContext';
import { LocationContext } from '../context/LocationContext';

const LocationPicker: () => Node = ({ route, navigation }) => {
    const { location } = useContext(LocationContext);
    const { editingObservation, setEditingObservation, updateObervations, selectedIndex} = useContext(ObservationContext);
    const [pickedLocation, setPickedLocation]= useState({latitude:editingObservation.location.latitude,longitude:editingObservation.location.longitude}); 
    // const [ observation, setObservation ] = useState(observations[route.params?.index]);
    const [marker, setMarker] = useState({
      coordinate: editingObservation.location,
      key: 1,
      color: '#ff0000'
  });

    useEffect(()=>{
      console.log('Location picked updated...');
      console.log(pickedLocation);
    },[pickedLocation]);

    useLayoutEffect(() => {
      navigation.setOptions({
        // title: value === '' ? 'No title' : value,
        headerRight: () => (
          <Button
            onPress={() => {
              let index = route.params?.index;
              setEditingObservation({...editingObservation, location:pickedLocation});
              navigation.navigate('Observación', {index, update:true})
            }}
            title="Save"
          />
        )
        // headerRight: (props) => (
        //   <HeaderBackButton labelVisible={true} onPress={()=>{}}></HeaderBackButton>
        // )
      });
      //TODO: Here we can dynamically change the header of the screen....
      //check documentation here: https://reactnavigation.org/docs/navigation-prop/#setparams
    }, [navigation, pickedLocation]);

      const getMapRegion = () => {
        //console.log('Updating map location');
        //console.log(location);  
        return {latitude: location?.latitude,
                longitude: location?.longitude,
                latitudeDelta: location?.latitudeDelta,
                longitudeDelta: location?.longitudeDelta}
        
      };

    const onMapPress = (e) => {
        //console.log(e.nativeEvent.coordinate)
        setMarker({
            coordinate: e.nativeEvent.coordinate,
            key: 1,
            color: '#ff0000'
        })
        setPickedLocation(e.nativeEvent.coordinate);
        // updateLocation(pickedLocation);
        // let newObservation = {...observation, location:{latitude: e.nativeEvent.coordinate.latitude , longitude:e.nativeEvent.coordinate.longitude}}
        // setObservation(newObservation);
        //console.log(observation);
        //  updateObervations(observation, index);
        //  console.log(observations[index]);
        // this.setState({
        //     markers: [
        //     ...this.state.markers,
        //     {
        //         coordinate: e.nativeEvent.coordinate,
        //         key: id++,
        //         color: randomColor(),
        //     },
        //     ],
        // });
    }

return(
    <View style={styles.container}>
        <MapView
        //provider={this.props.provider}
          style={styles.map}
          showsUserLocation = {true}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta:  location.latitudeDelta,
            longitudeDelta: location.longitudeDelta,
          }}
          onPress={onMapPress}
          region={getMapRegion()}>
         { marker ? 
            <Marker
              key={marker.key}
              coordinate={marker.coordinate}
              pinColor={marker.color}
            />
            : null
          }
        </MapView>
        { marker || location ? 
        <View style={styles.topButtonContainer}>
          <TouchableOpacity
            onPress={() => setMarker(null)}
            style={styles.bubble}>
             <Text>{marker ? marker.coordinate.latitude : location.latitude}, {marker ? marker.coordinate.longitude : location.longitude}</Text>
          </TouchableOpacity>
        </View>
      : 
      null }
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              setPickedLocation({latitude:location.latitude,longitude:location.longitude});
              setMarker({
                coordinate: {latitude:location.latitude,longitude:location.longitude},
                key: 1,
                color: '#ff0000'
              });
            }}
            style={styles.bubble}>
            <Text>Clica per esborrar selecció</Text>
          </TouchableOpacity>
        </View>
      </View>
)};

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    bubble: {
      backgroundColor: 'rgba(255,255,255,0.7)',
      paddingHorizontal: 18,
      paddingVertical: 12,
      borderRadius: 20,
    },
    button: {
      width: 80,
      paddingHorizontal: 12,
      alignItems: 'center',
      marginHorizontal: 10,
    },
    buttonContainer: {
      flexDirection: 'row',
      marginVertical: 20,
      backgroundColor: 'transparent',
    },
    topButtonContainer: {
      flexDirection: 'row',
      marginVertical: 10,
      backgroundColor: 'transparent',
    },
  });

export default LocationPicker;