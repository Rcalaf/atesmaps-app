import React, {createContext, useState, useEffect} from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
//import Geolocation from '@react-native-community/geolocation';
import Geolocation from 'react-native-geolocation-service';

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

    const [currentLocation, setCurrentlocation] = useState({latitude: 42.677973,
        longitude: 1.218886,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,});
    
    const [position, setPosition] = useState( {coords: {latitude: 42.677973,
                                                longitude: 1.218886,
                                                altitude: 0,
                                                accuracy: 0,
                                                altitudeAccuracy: null,
                                                heading: 0,
                                                speed:0 }});
    
    const [trackingLocation, setTrackingLocation ] = useState(false); 
    const [watchId, setWatchId ] = useState(null);                                              
  
        useEffect(() => {
          console.log('Requesting location permision')
          const requestLocationPermission = async () => {
            if (Platform.OS === 'ios') {
              try {
                const granted = await Geolocation.requestAuthorization('always');
                // console.log(granted);
                if (granted === 'granted') {
                  getOneTimeLocation();
                  if (trackingLocation) subscribeLocation();
                }else{
                  console.log(granted);
                  setLocationStatus('Permission Denied');
                } 
                
              }catch (err) {
                console.warn(err);
              }
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
                  if (trackingLocation) subscribeLocation();
                  //subscribeLocation();
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
            Geolocation.clearWatch(watchId);
            //console.log(watchId);
            //console.log('cleared the watchpostion process')
          };
        }, []);
      
        const getOneTimeLocation = () => {
          setLocationStatus('Getting Location ...');
          Geolocation.getCurrentPosition(
            //Will give you the current location
            (position) => {
              setLocationStatus('You are Here');
              // console.log('You are Here One time:')
              //getting the Longitude from the location json
              const currentLongitude = 
                JSON.stringify(position.coords.longitude);
      
              //getting the Latitude from the location json
              const currentLatitude = 
                JSON.stringify(position.coords.latitude);


              const currentLocation = { ...position.coords, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA }
              console.log('----Location Context-----')
              console.log(currentLocation.latitude, currentLocation.longitude);
              setCurrentlocation(currentLocation);
      
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
              timeout: 3000,
              maximumAge: 1000
            },
          );
        };
      
        const subscribeLocation = () => {
         let id = Geolocation.watchPosition(
            (position) => {
              //Will give you the location on location change
              
              setLocationStatus('You are Here');
              console.log('Subscription pushe location:')
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

              setPosition(position)
            },
            (error) => {
              setLocationStatus(error.message);
            },
            {
              enableHighAccuracy: false,
              maximumAge: 1000
            },
          );
          // console.log(watchId);
          setWatchId(id);
        };
      
        const unsubscribeLocation = (id) => {
          console.log('Calling unsubscribe method in context')
          console.log(watchId);
          Geolocation.clearWatch(watchId);
        }
    
    


    return(
        <LocationContext.Provider value={{ currentLocation, LATITUDE_DELTA , LONGITUDE_DELTA, position, watchId, unsubscribeLocation, subscribeLocation, getOneTimeLocation}}> 
            {children}
        </LocationContext.Provider>
    )
}