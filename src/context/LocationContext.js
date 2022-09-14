import React, {createContext, useState, useEffect} from 'react';
import RNLocation from 'react-native-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LocationContext = createContext();

export const LocationProvider = ({children}) => {
    const LATITUDE_DELTA = 0.0922;
    const LONGITUDE_DELTA = 0.0421;

    const [permission, setPermission] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [location, setLocation] = useState({latitude: 42.677973,
        longitude: 1.218886,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,});
    
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
          console.log(granted);
          RNLocation.getLatestLocation({timeout: 100}).then( location => {
            location = { ...location, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA }
            setLocation(location);
             console.log('this is after asking permission');
             console.log(location);
          })
          //console.log(location, location.longitude, location.latitude,location.timestamp)
        } else {
          RNLocation.getLatestLocation({timeout: 100}).then( newLocation => {
         //   console.log(location)
            newLocation = { ...newLocation, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA }
            setLocation(newLocation);
             console.log('this is the location: ');
            // console.log(newLocation);
             console.log(location);
          })
          console.log(location, location.longitude, location.latitude,location.timestamp);
        }
    }


    return(
        <LocationContext.Provider value={{ location }}> 
            {children}
        </LocationContext.Provider>
    )
}