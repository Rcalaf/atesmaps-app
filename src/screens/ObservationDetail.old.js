import React, {useState, useEffect, useContext} from "react";
import { Text, View, TextInput, Button, Alert, StyleSheet, Keyboard } from "react-native";
import { useForm, Controller } from "react-hook-form";

import CustomButton from "../components/CustomButtonOld"
import { ObservationContext } from '../context/ObservationContext';


export default function ObservationDetail({ navigation }) {
    // const item = navigation.getParam('item');
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
          title: '',
          lastName: ''
        }
    });

    const [title, setTitle] = useState(null);
    
    const onSubmit = data => console.log(data);

    // const [keyboardStatus, setKeyboardStatus] = useState(undefined);

    // useEffect(() => {
    //   const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
    //     setKeyboardStatus("Keyboard Shown");
    //   });
    //   const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
    //     setKeyboardStatus("Keyboard Hidden");
    //   });

    //   return () => {
    //     showSubscription.remove();
    //     hideSubscription.remove();
    //   };
    // }, []);

    return (
  
        <View style={styles.container}>
          <Text style={styles.label}>Nombre</Text>
          <Controller
            control={control}
            rules={{
             required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
               // keyboardType="email-address"
              />
            )}
            name="title"
          />
          {errors.title && <Text style={styles.errorText}>Campo obligatorio</Text>}
          <Text style={styles.label}>Report date</Text>
          <Controller
            control={control}
            rules={{
             maxLength: 100,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
      
              <TextInput
                style={styles.input}
                keyboardType="email-address"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="reportDate"
          />
          <Text style={styles.label}>Report Location</Text>
          <Controller
            control={control}
            rules={{
             maxLength: 100,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
      
              <TextInput
                style={styles.input}
                keyboardType="email-address"
                onBlur={onBlur}
                onChangeText={onChange}
                //onFocus={() => navigation.navigate('Location')}
                value={value}
              />
            )}
            name="reportLocation"
          />

          <Text style={styles.label}>Photos</Text>
          <Controller
            control={control}
            rules={{
             maxLength: 100,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
      
              <TextInput
                style={styles.input}
                keyboardType="email-address"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="photos"
          />
          <View style={{marginTop: 50, background: "black"}}>
              
            <Text>Observations</Text>
            
             

            <CustomButton title="Quick" color={"#62a256"} onPress={() => navigation.navigate('Observation Type')} />
            <CustomButton title="Avalanche" color={"#48a5e9"} onPress={handleSubmit(onSubmit)} />
            <CustomButton title="Snowpack" color={"#4052ac"} onPress={handleSubmit(onSubmit)} />
            <CustomButton title="Weather" color={"#f5c144"} onPress={handleSubmit(onSubmit)} />
            <CustomButton title="Incident" color={"#e15141"} onPress={handleSubmit(onSubmit)} />
          </View>
          <Button style={styles.button} title="Submit" onPress={handleSubmit(onSubmit)} />
          {/* <Text style={styles.status}> {keyboardStatus}</Text> */}
        </View>
      
    );
}

const styles = StyleSheet.create({
  input: {
    borderColor: "gray",
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  label:{ 
    fontWeight: 'bold', 
    fontSize: 15, 
    marginBottom: 5,
    marginTop: 5
  },
  container: {
    flex: 1,
    padding: 36
  },
  errorText: {
    color: 'red',
    padding: 5
  },
  button: {
    width: "100%",
    color: 'white',
    background: 'blue'
  },
  status: {
    padding: 10,
    textAlign: "center"
  }
});