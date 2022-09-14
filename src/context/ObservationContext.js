import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


import { BASE_URL } from '../config';


export const ObservationContext = createContext();

export const ObservationProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [observations, setObservations] = useState([]);
    // const [snowType, setSnowType] = useState({});
    const [editingObservation, setEditingObservation] = useState({});
    const [lastIndex, setLastIndex] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);


    const newObservation = (observation) => {
       // setIsLoading(true);
        setObservations( (arr) => {
            return [...arr, observation]});
        setEditingObservation(observation);
        //setIsLoading(false);
    }

    // const updateObservationSonwType = (snowTypeObjetc) => {
    //     console.log(snowTypeObjetc);
    // }

    const updateSelectedIndex = (index) => {
        setEditingObservation(observations[index]); 
        setSelectedIndex(index)
    }

    const updateObervations = (obj, index) => {
        // setIsLoading(true);
        let aux = observations;
        aux[index] = obj;
        setObservations(aux);
        setEditingObservation(obj);
        
        // setIsLoading(false);
    }

    const deleteObservation = () => {
        console.log('Remove observation');
        setEditingObservation({});
        setObservations( (arr) => {
            observations.splice(selectedIndex,1)
            return observations});
        let index = observations.length 
        setLastIndex(index);
        setSelectedIndex(null);
    }

    // const isSync = () =>{r
    //     //TODO check if network and sync observation list...
    //     try {
    //         setIsLoading(true);
    //     } catch (e) {
    //         console.log('error on is loadin method:');
    //         console.log(e);
    //     }
    //     setIsLoading(false);
    // }

    /*useEffect(()=>{
        console.log('refreshing observation...');
        
    }, [observation]);*/

    useEffect(()=>{
        let index = observations.length 
        setLastIndex(index);
        setSelectedIndex(index-1);
    },[observations]);

    useEffect(()=>{
        console.log('editingObservation has been updated....');
        //console.log(editingObservation);
    },[editingObservation]);

    return(
        <ObservationContext.Provider 
            value={{
                newObservation, 
                updateObervations, 
                deleteObservation,
                setSelectedIndex,
                setEditingObservation,
                updateSelectedIndex,
                // updateObservationSonwType,
                isLoading, 
                observations,
                editingObservation,
                lastIndex,
                selectedIndex
            }}> 
            {children}
        </ObservationContext.Provider>
    )
}