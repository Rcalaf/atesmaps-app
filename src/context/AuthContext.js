import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import { BASE_URL } from '../config';
import { AccessControlTranslationFilterSensitiveLog } from '@aws-sdk/client-s3';
import  Snackbar  from "react-native-snackbar";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [userDetails, setUserDetails] = useState(null);

    const updateUser = async (data) => {
       // console.log('user local storage updated...')
       // let user = data;
       // await AsyncStorage.setItem('userDetails', JSON.stringify(user));
        // console.log(data);
        //setUserDetails(user);
    }

    const login = async (email, password) => {
        try {
            setIsLoading(true);
            console.log('---------');
            console.log(BASE_URL);
            console.log('---------');
            let response = await axios.post(`${BASE_URL}/auth/login`,{'email': email, 'pwd':password});
            console.log(response.data);
            //console.log(response.data.accessToken);
            //let user = {userName, userEmail, userId} = response.data;
            let user = response.data.user;
            // console.log('This is after logging:')
            // console.log(user);
            // console.log('------------------------')
            await AsyncStorage.setItem('userToken', response.data.accessToken);
            await AsyncStorage.setItem('userDetails', JSON.stringify(user));
            setUserToken(response.data.accessToken);
            setUserDetails(user);
        } catch (e) {
            console.log(e);
            Snackbar.show({
                text: 'Password o email incorrectos',
                duration: Snackbar.LENGTH_SHORT,
                numberOfLines: 2,
                textColor: "#fff",
                backgroundColor: "#B00020",
            });

        }
        setIsLoading(false);
    }

    const signUp = async (userName, password, email) => {
        try {
           // console.log(userName + ', '+email+', '+password);
            setIsLoading(true);
            let response = await axios.post(`${BASE_URL}/register`,{'userName':userName, 'email': email, 'pwd':password});
            //console.log(response.data);
            //let user = {userName, userEmail, userId} = response.data;
            let user = response.data.user;
            await AsyncStorage.setItem('userToken', response.data.accessToken);
            await AsyncStorage.setItem('userDetails', JSON.stringify(user));
            setUserToken(response.data.accessToken);
            setUserDetails(user);
        } catch (e) {
            console.log('error:')
            console.log(e);
            Snackbar.show({
                text: e.response.status,
                duration: Snackbar.LENGTH_SHORT,
                numberOfLines: 2,
                textColor: "#fff",
                backgroundColor: "#B00020",
            });
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
            Snackbar.show({
                text: e.response.status,
                duration: Snackbar.LENGTH_SHORT,
                numberOfLines: 2,
                textColor: "#fff",
                backgroundColor: "#B00020",
            });
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
            console.log('error on is logged in method:');
            console.log(e);
        }
        setIsLoading(false);
    }

    useEffect(()=>{
        console.log('checking if logged in....')
        isLoggedIn();
    }, [])


    // useEffect(()=>{
    //     console.log('user details updated....')
    //     // isLoggedIn();
    // }, [userDetails])

    return(
        <AuthContext.Provider value={{signUp, 
                                    login, 
                                    logout, 
                                    isLoading, 
                                    userToken, 
                                    userDetails, 
                                    setUserDetails,
                                    updateUser,
                                    }}> 
            {children}
        </AuthContext.Provider>
    )
}