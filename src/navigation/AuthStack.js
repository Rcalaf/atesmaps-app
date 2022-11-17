import * as React from 'react';
import { Text, View, Image, StyleSheet, Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from '../screens/auth/Welcome';
import Registration from '../screens/auth/Registration';
import Login from '../screens/auth/Login';
import ForgotPassword from '../screens/auth/ForgotPassword';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return(
      <Stack.Navigator >
        {/* <Stack.Screen name="Welcome" component={Welcome} options={{ title: 'Welcome', headerShown: false }}  /> */}
        <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
        <Stack.Screen name="Register" component={Registration} options={{ title: 'Register' }}  />
        <Stack.Screen name="Forgot" component={ForgotPassword} options={{ title: 'Reset Password Request' }}  />
      </Stack.Navigator> 
  );
};

export default AuthStack;

const styles = StyleSheet.create({
  tabBarItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#ffffff',
    paddingHorizontal: 10,
    bottom: Platform.OS === 'ios' ? -5 : 0,
  },
  tabBarIcon: {
    width: 23,
    height: 23,
  },
  tabBarIconFocused: {
    tintColor: '#555CC4',
  },
});
