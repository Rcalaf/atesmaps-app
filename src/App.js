/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {enableLatestRenderer} from 'react-native-maps';
import AppNav from './navigation/AppNav';

import { AuthProvider } from './context/AuthContext';
import { ObservationProvider } from './context/ObservationContext';
import { LocationProvider } from './context/LocationContext';
// import  Snackbar  from "react-native-snackbar";

enableLatestRenderer();

const App: () => Node = () => {
  // Snackbar.show({
  //   text: 'Hello world',
  //   duration: Snackbar.LENGTH_SHORT,
  // });

  return (
  
    <AuthProvider>
      <LocationProvider>
        <ObservationProvider>
          <AppNav />
        </ObservationProvider>
      </LocationProvider>
    </AuthProvider>
    
  );
};

export default App;
