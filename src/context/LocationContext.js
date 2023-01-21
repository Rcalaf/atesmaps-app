import React, {createContext, useState, useEffect} from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';

export const LocationContext = createContext();

export const LocationProvider = ({children}) => {
    const LATITUDE_DELTA = 0.0922;
    const LONGITUDE_DELTA = 0.0421;

    const [
      currentLongitude,
      setCurrentLongitude
    ] = useState('...');
    const [
      currentLatitude,
      setCurrentLatitude
    ] = useState('...');
    const [
      locationStatus,
      setLocationStatus
    ] = useState('');


    const [location, setLocation] = useState({latitude: 42.677973,
        longitude: 1.218886,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,});
    
    let watchID;

        useEffect(() => {
          const requestLocationPermission = async () => {
            if (Platform.OS === 'ios') {
              getOneTimeLocation();
             // subscribeLocationLocation();
            } else {
              try {
                const granted = await PermissionsAndroid.request(
                  PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                  {
                    title: 'Location Access Required',
                    message: 'This App needs to Access your location',
                  },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                  //To Check, If Permission is granted
                  getOneTimeLocation();
                  //subscribeLocationLocation();
                } else {
                  setLocationStatus('Permission Denied');
                }
              } catch (err) {
                console.warn(err);
              }
            }
          };
          requestLocationPermission();
          return () => {
            Geolocation.clearWatch(watchID);
          };
        }, []);
      
        const getOneTimeLocation = () => {
          setLocationStatus('Getting Location ...');
          Geolocation.getCurrentPosition(
            //Will give you the current location
            (position) => {
              setLocationStatus('You are Here');
              console.log('You are Here One time:')
              //getting the Longitude from the location json
              const currentLongitude = 
                JSON.stringify(position.coords.longitude);
      
              //getting the Latitude from the location json
              const currentLatitude = 
                JSON.stringify(position.coords.latitude);


              const currentLocation = { ...position.coords, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA }
              console.log('----')
              console.log(currentLocation);
              setLocation(currentLocation);
      
              //Setting Longitude state
              setCurrentLongitude(currentLongitude);
              
              //Setting Longitude state
              setCurrentLatitude(currentLatitude);
            },
            (error) => {
              setLocationStatus(error.message);
            },
            {
              enableHighAccuracy: false,
              timeout: 30000,
              maximumAge: 1000
            },
          );
        };
      
        const subscribeLocationLocation = () => {
          watchID = Geolocation.watchPosition(
            (position) => {
              //Will give you the location on location change
              
              setLocationStatus('You are Here');
              console.log('You are Here:')
              console.log(position);
      
              //getting the Longitude from the location json        
              const currentLongitude =
                JSON.stringify(position.coords.longitude);
      
              //getting the Latitude from the location json
              const currentLatitude = 
                JSON.stringify(position.coords.latitude);
      
              //Setting Longitude state
              setCurrentLongitude(currentLongitude);
      
              //Setting Latitude state
              setCurrentLatitude(currentLatitude);
            },
            (error) => {
              setLocationStatus(error.message);
            },
            {
              enableHighAccuracy: false,
              maximumAge: 1000
            },
          );
        };
      
    
    


    return(
        <LocationContext.Provider value={{ location }}> 
            {children}
        </LocationContext.Provider>
    )
}