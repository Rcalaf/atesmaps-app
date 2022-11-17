import React, {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


import { BASE_URL } from '../config';

import { AuthContext } from '../context/AuthContext';
export const ObservationContext = createContext();

export const ObservationProvider = ({children}) => {
    const {userDetails,userToken} = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(false);
    const [observations, setObservations] = useState([]);
    // const [snowType, setSnowType] = useState({});
    const [editingObservation, setEditingObservation] = useState({});
    const [lastIndex, setLastIndex] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);

    const setList = async (observations) => {
        try {
            await AsyncStorage.setItem('list', JSON.stringify(observations));
        } catch (err) {
            console.log(err);
        }
    }

    const getList = async () => {
        let list;
        try {
            list = JSON.parse(await AsyncStorage.getItem('list'));
        } catch (err) {
            console.log(err);
        }
        return list;
    }

    const sentRequest = async (url, method, data) => {
        console.log(url);
        console.log(method);
        console.log(data);
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
          //console.log('error triggered while sending data')
          console.log(error);
          return error;
        }
    };

    const getData = async () => {
        try{
            let response = await sentRequest(`/observations/user/${userDetails.userId}`, "get", '');
            //TODO: Sync local data with new data
            await AsyncStorage.setItem('list', JSON.stringify(response.data));
            setObservations(response.data);
        }catch (err){
            console.log(err);
            //NO internet, then use LOCAL DATA
            let list = JSON.parse(await AsyncStorage.getItem('list'));
            setObservations(list);
        }
       
    }
    
    const newObservation = async (observation) => {
        setIsLoading(true);
            observation.user = userDetails.userId;
            let response = await sentRequest('/observations', "post", observation)
            observation._id = response.data._id
            setObservations( (arr) => {
                return [...arr, observation]});
            setEditingObservation(observation);
        setIsLoading(false);
    }

    const syncObservations = () => {

    }

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

    const deleteObservation = async () => {
        console.log('Remove observation');
        let response = await sentRequest(`/observations`, "delete", editingObservation);
        setEditingObservation({});
        setObservations( (arr) => {
            observations.splice(selectedIndex,1)
            return observations});
        let index = observations.length 
        setLastIndex(index);
        setSelectedIndex(null);
    }

    useEffect(()=>{
        let index = observations.length 
        console.log(index);
        setLastIndex(index);
        setSelectedIndex(index-1);
    },[observations]);

    useEffect(()=>{
        console.log('editingObservation has been updated....');
        //console.log(editingObservation);
    },[editingObservation]);

    const syncData = async () =>{
        
    }

    useEffect(()=>{  
        console.log('Loading data...');  
        getData();
    },[userDetails])

    return(
        <ObservationContext.Provider 
            value={{
                newObservation, 
                updateObervations, 
                deleteObservation,
                setSelectedIndex,
                setEditingObservation,
                updateSelectedIndex,
                sentRequest,
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