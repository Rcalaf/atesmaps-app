import React, {useState, useEffect, useLayoutEffect, useContext} from "react";
import { Text, View,StyleSheet, Alert } from "react-native";



export default function UpdateNeeded({ route, navigation }) {  
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