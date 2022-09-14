/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import type {Node} from 'react';
import MapView from 'react-native-maps';


import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Button,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import RNLocation from 'react-native-location';

const MapExplorer: () => Node = () => {

  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = 0.0421;

  const [permission, setPermission] = useState(false);
  const [location, setLocation] = useState({latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,});

  const isDarkMode = useColorScheme() === 'light';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    RNLocation.configure({
      distanceFilter: 0.0
    })

    RNLocation.checkPermission({
      ios: 'whenInUse', // or 'always'
      android: {
        detail: 'coarse' // or 'fine'
      }
    }).then( granted => {
      if (!granted){
        RNLocation.requestPermission({
          ios: "whenInUse",
          android: {
            detail: "coarse",
            rationale: {
              title: "We need to access your location",
              message: "We use your location to show where you are on the map",
              buttonPositive: "OK",
              buttonNegative: "Cancel"
            }
          }
        }).then( granted => {
          console.log('useEffect hook Request permission.')
          setPermission(granted);
          console.log(granted)
          permissionHandle();
        })
      }
      console.log('useEffect hook check permission.')
      setPermission(granted);
      permissionHandle();
    });
  },[])
 
  const permissionHandle = async () => {
    if(!permission){
      let granted = await RNLocation.requestPermission({
        ios: "whenInUse",
        android: {
          detail: "coarse",
          rationale: {
            title: "We need to access your location",
            message: "We use your location to show where you are on the map",
            buttonPositive: "OK",
            buttonNegative: "Cancel"
          }
        }
      })
      console.log(granted)
      RNLocation.getLatestLocation({timeout: 100}).then( location => {
        setLocation(location);
        console.log('this is after asking permission'+ location);
      })
      //console.log(location, location.longitude, location.latitude,location.timestamp)
    } else {
      
      RNLocation.getLatestLocation({timeout: 100}).then( newLocation => {
        console.log(location)
        setLocation(newLocation);
        console.log('this is the location: ');
        console.log(newLocation);
        console.log(location);
      })
      //console.log(location, location.longitude, location.latitude,location.timestamp);
    }
   
  }

  const getMapRegion = () => {
    console.log('Updating map location');
    console.log(location);  
    console.log("-------------");
    return {latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA}
    
  };

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View
        style={styles.container}>
       <MapView style={styles.map}
        showsUserLocation = {true}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        region={getMapRegion()}
        />
        
      </View>
      <View style={{ alignItems: 'center',}}>
        <View style={{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}>
          <Button style={styles.button}
            title="Get Location"
            onPress={permissionHandle}
          />
        </View>
      <Text>Latitude: {location.latitude}  </Text>
      <Text>Longitude: {location.longitude} </Text>
      <View style={{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}>
        <Button
          title="Send Location"
          />
      </View>
     </View>
    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    height:'60%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 10
  },
});



export default MapExplorer;
