import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import { BASE_URL } from '../config';


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [userDetails, setUserDetails] = useState(null);

    const login = async (email, password) => {
        try {
            setIsLoading(true);
            let response = await axios.post(`${BASE_URL}/auth/login`,{'email': email, 'pwd':password});
            console.log(response.data);
            //console.log(response.data.accessToken);
            let user = {userName, userEmail, userId} = response.data;
            //console.log('This is after logging:')
            //console.log(user);
            console.log('------------------------')
            await AsyncStorage.setItem('userToken', response.data.accessToken);
            await AsyncStorage.setItem('userDetails', JSON.stringify(user));
            setUserToken(response.data.accessToken);
            setUserDetails(user);
        } catch (e) {
            console.log(e);
        }
        setIsLoading(false);
    }

    const signUp = async (userName, password, email) => {
        try {
            console.log(userName + ', '+email+', '+password);
            setIsLoading(true);
            let response = await axios.post(`${BASE_URL}/register`,{'userName':userName, 'email': email, 'pwd':password});
            let user = {userName, userEmail, userId} = response.data;
            await AsyncStorage.setItem('userToken', response.data.accessToken);
            await AsyncStorage.setItem('userDetails', JSON.stringify(user));
            setUserToken(response.data.accessToken);
            setUserDetails(user);
        } catch (e) {
            console.log(e);
        }
        setIsLoading(false);
    }

    const logout = async () => {
        try {
            setIsLoading(true);
            setUserToken(null);
            setUserDetails(null);
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.removeItem('userDetails');
        } catch (e) {
            console.log(e);
        }
        setIsLoading(false);
    }

    const isLoggedIn = async () =>{
        let userToken;
        let userDetails;
        try {
            setIsLoading(true);
            userToken = await AsyncStorage.getItem('userToken');
            userDetails = await AsyncStorage.getItem('userDetails');
            setUserToken(userToken);
            setUserDetails(JSON.parse(userDetails));    
        } catch (e) {
            console.log('error on is looged in method:');
            console.log(e);
        }
        setIsLoading(false);
    }

    useEffect(()=>{
        console.log('checking if logged in....')
        isLoggedIn();
    }, [])

    return(
        <AuthContext.Provider value={{signUp, login, logout, isLoading, userToken, userDetails }}> 
            {children}
        </AuthContext.Provider>
    )
}