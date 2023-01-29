import React, {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import  Snackbar  from "react-native-snackbar";
import { BASE_URL } from '../config';

import { AuthContext } from '../context/AuthContext';

export const ObservationContext = createContext();

export const ObservationProvider = ({children}) => {
    const {userDetails,userToken} = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);

    const [observations, setObservations] = useState([]);
    const [historicObservations, setHistoricObservations] = useState([]);
    
    const [editingObservation, setEditingObservation] = useState({});

    const [lastIndex, setLastIndex] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);
    

    const sentRequest = async (url, method, data) => {
        try {
          const response = await axios({
            method: method,
            url: `${BASE_URL}${url}`,
            data: data,
            //headers: { "Content-Type": "multipart/form-data" },
            headers: {"Authorization": `Bearer ${userToken}`}
          });
          return response;
        } catch (error) {
          console.log(error);
          return error;
        }
    };

    const getData = async () => {
        try{
            let response = await sentRequest(`/observations/user/${userDetails?._id}`, "get", '');
            //TODO: Sync local data with new data
            if (response.data) {
                setHistoricObservations(response.data);
            }
            
        } catch (err){
            console.log(err);
            setHistoricObservations(historicObservations);
        }
        let list = JSON.parse(await AsyncStorage.getItem('list'));
        if(list) setObservations(list);
    }
    
    const newObservation = async (observation) => {
        // setIsLoading(true);
            // console.log('------ New Observation data received----')
            // console.log(observation);
            // console.log('----------------------------------------')
            let aux = observations;
            aux.push(observation);
            // setObservations( (arr) => { return [...arr, observation]});
            setObservations(aux);
            updateSelectedIndex(aux.length-1)
            await AsyncStorage.setItem('list', JSON.stringify(aux)); 
            setEditingObservation(observation);
            Snackbar.show({
                text: 'Tu borrador de observación se ha creado.',
                duration: Snackbar.LENGTH_SHORT,
                numberOfLines: 2,
                textColor: "#fff",
                backgroundColor: "#62a256",
            });
        // setIsLoading(false);
    }

  
    const updateSelectedIndex = (index) => {
        setEditingObservation(observations[index]); 
        setSelectedIndex(index)
    }

    const updateObservations = async (obj) => {
        console.log('calling update observations');
        // setIsLoading(true);
        let aux = observations;
        aux[selectedIndex] = obj;
        setObservations(aux);
        setEditingObservation({...obj}); 
        await AsyncStorage.setItem('list', JSON.stringify(aux));
       // console.log('------------------');  
        // setIsLoading(false);
        
    }

    const deleteObservation = async () => {
        console.log('Remove observation');
        //let response = await sentRequest(`/observations`, "delete", editingObservation);
        //TODO: update async storage list
        let aux = observations;
        aux.splice(selectedIndex,1);
        setEditingObservation({});
        setObservations(aux);
        // setObservations( (arr) => {
        //     observations.splice(selectedIndex,1)
        //     return observations});
        // console.log(aux);
       

        await AsyncStorage.setItem('list', JSON.stringify(aux));
        let index = aux.length 
        setLastIndex(index);
        setSelectedIndex(null);
        Snackbar.show({
            text: 'Tu borrador de observación se ha eliminado.',
            duration: Snackbar.LENGTH_SHORT,
            numberOfLines: 2,
            textColor: "#fff",
            backgroundColor: "#62a256",
        });
        // console.log('---');
        // console.log(observations);
        // console.log('---END REmoving observation---');
        // navigation.navigate('Lista de Observaciones');
    }

    useEffect(()=>{
        // console.log('-----Observations updated-----')
        // console.log(observations);
        let index = observations.length 
       // console.log(index);
        setLastIndex(index);
       // setSelectedIndex(index-1);
      //  console.log('-----------------------------')
        // setList();
    },[observations]);


    // useEffect(()=>{
    //     console.log('-----Last index updated -----')
    //     console.log(lastIndex);
    //     console.log('-----------------------------')
    // },[lastIndex]);

    // useEffect(()=>{
    //     console.log('-----Selected index updated -----')
    //     console.log(selectedIndex);
    //     console.log('-----------------------------')
    // },[selectedIndex]);

    // useEffect(()=>{
    //     console.log('-----Update Editing observation -----')
    //     console.log(editingObservation.images?.length);
    //     console.log('-----------------------------')
    // },[editingObservation]);

    useEffect(()=>{  
        console.log('Loading user oservations data...');  
        getData();
    },[userDetails]);

    return(
        <ObservationContext.Provider 
            value={{
                newObservation, 
                updateObservations, 
                setObservations,
                deleteObservation,
                setSelectedIndex,
                setEditingObservation,
                updateSelectedIndex,
                sentRequest,
                getData,
                isLoading, 
                observations,
                historicObservations,
                editingObservation,
                lastIndex,
                selectedIndex
            }}> 
            {children}
        </ObservationContext.Provider>
    )
}