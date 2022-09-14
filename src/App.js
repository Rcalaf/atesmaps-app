/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';

import AppNav from './navigation/AppNav';

import { AuthProvider } from './context/AuthContext';
import { ObservationProvider } from './context/ObservationContext';
import { LocationProvider } from './context/LocationContext';

const App: () => Node = () => {
  
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
