import React, {useState, useEffect, useLayoutEffect, useContext} from "react";
import { Text, View, TextInput, Button, Alert, StyleSheet, Keyboard } from "react-native";
import { useForm, Controller } from "react-hook-form";
import moment from 'moment';

import DateTimePicker from '@react-native-community/datetimepicker';

import axios from 'axios';
import { BASE_URL } from '../config';

import CustomButton from "../components/CustomButton";


export default function ShowObservation({ route, navigation }) {  

    return (
  
        <View style={styles.container}>
         
         <Text> This is the view to show the observation details...</Text>
        
      
        
        </View>
      
    );
}

const styles = StyleSheet.create({

  label:{ 
    fontWeight: 'bold', 
    fontSize: 15, 
    marginBottom: 5,
    marginTop: 5
  },
  container: {
    flex: 1,
    padding: 15
  },
  errorText: {
    color: 'red',
    padding: 5
  },
  datePicker:{
    width: "100%",
  },
  status: {
    padding: 10,
    textAlign: "center"
  }
});