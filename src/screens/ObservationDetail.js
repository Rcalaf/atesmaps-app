import React, {useState, useEffect, useLayoutEffect, useContext} from "react";
import { Text, View, TextInput, Button, Alert, StyleSheet, Keyboard } from "react-native";
import { useForm, Controller } from "react-hook-form";
import moment from 'moment';

import DateTimePicker from '@react-native-community/datetimepicker';

import axios from 'axios';
import { BASE_URL } from '../config';

import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";

import { ObservationContext } from '../context/ObservationContext';
import { AuthContext } from '../context/AuthContext';

export default function ObservationDetail({ route, navigation }) {
    const {editingObservation, selectedIndex, observations, deleteObservation, updateObservations } = useContext(ObservationContext);
    const {userDetails,userToken} = useContext(AuthContext);

    const [index, setIndex] = useState(route.params?.index);
    const [update, setUpdate] = useState(route.params?.update);

    const [ observation, setObservation ] = useState(editingObservation);
    const [ location, setLocation] = useState(editingObservation.location);

    const [rawDate, setRawDate] = useState(moment(observation.date).toDate());
    const [show, setShow] = useState(false);
    

    const formatLocation = (locationDetails) =>{
      return locationDetails?.latitude + ', ' +locationDetails?.longitude;
    }

    const parseLocation = (locationString) => {
      return {latitude:Number(locationString.split(',')[0]), longitude: Number(locationString.split(',')[1])}
    }

    const sentData = async (id,data) => {
    
      data.user = id;
      try {
        const response = await axios({
          method: "post",
          url: `${BASE_URL}/observations`,
          data: data,
          //headers: { "Content-Type": "multipart/form-data" },
          headers: {"Authorization": `Bearer ${userToken}`}
        });
        //console.log(response.message);
        //console.log(response.status);
        if (response.status === 201){
            console.log('cleaning local storage');
            deleteObservation();
            navigation.navigate('Lista de Observaciones');
        }
      } catch (error) {
        console.log(error.response.status);
      }
    };
    

    const { control, handleSubmit, formState: { errors }, getValues, setValue } = useForm({
      defaultValues: {
        title: observation.title,
        date: moment(observation.date).format('MMMM Do YYYY, hh:mm:ss'),
        location: formatLocation(location),
      }
    });

    useLayoutEffect(() => {
      navigation.setOptions({
        // title: value === '' ? 'No title' : value,
        headerRight: () => (
          <Button
            onPress={() => {
              // console.log(handleSubmit);
              handleSubmit(onSave)();
              // let index = route.params?.index;
              // setEditingObservation({...editingObservation, location:pickedLocation});
              navigation.navigate('Lista de Observaciones');
            }}
            title="Guardar"
          />
        )
        
        // headerRight: (props) => (
        //   <HeaderBackButton labelVisible={true} onPress={()=>{}}></HeaderBackButton>
        // )
      });
      //TODO: Here we can dynamically change the header of the screen....
      //check documentation here: https://reactnavigation.org/docs/navigation-prop/#setparams
    }, [navigation]);


    const onSave = (data) => {
      // console.log('Saving data...')
      console.log(parseLocation(data.location));
      let obj = data;
      obj.date = moment(rawDate).format();
      
      obj.location = parseLocation(data.location);
      obj.status = 0;
      obj.observationTypes = editingObservation.observationTypes;
      console.log(obj);
      updateObservations(obj);

    }


    
    const onSubmit = (data) => {
      console.log(data);
      console.log(errors);
      let obj = data;
      //TODO: check if date updates properly
      obj.date = moment(rawDate).format();
      obj.location = location;
      obj.observationTypes = editingObservation.observationTypes;
     
      sentData(userDetails._id,obj);  
    }; 

    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate;
      setShow(false);
      setRawDate(currentDate);      
      setValue('date',moment(currentDate).format('MMMM Do YYYY, hh:mm:ss'))
    };

    const showDatepicker = () => {
      // console.log('showing date picker...');
      // showMode('date');
      setShow(!show);
    };

    useEffect(()=>{
      console.log('Observation has been updated');
      // editingObservation.user = userDetails.userId;
      setObservation(editingObservation);
     // console.log(observation);
    },[editingObservation]);

    useEffect(()=>{
      setLocation(editingObservation.location);
      setValue('location', formatLocation(editingObservation.location));
      route.params={index}
    },[route.params?.update]);

    
  

    return (
  
        <View style={styles.container}>
          <CustomInput
            name="title"
            placeholder="Titulo"
            control={control}
            rules={{required: 'Title is required'}}
          />
          
          <CustomInput
            name="date"
            placeholder={moment().format('MMMM Do YYYY, hh:mm:ss')}
            control={control}
            rules={{required: 'Date is required'}}
            onPress={showDatepicker}
          />
        
        {/* <CustomButton 
            text="Date" 
            type="TERTIARY"
            onPress={showDatepicker}
          /> */}

        {show && (
          
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <DateTimePicker
              style={{ width: '43%',}}
              testID="datePicker"
              value={rawDate}
              mode='date'
              is24Hour={true}
              onChange={onChange}
            />
            <DateTimePicker
              style={{width: '33%'}}
              testID="TimePicker"
              value={rawDate}
              mode='time'
              is24Hour={true}
              onChange={onChange}
            />
          </View>
        )}  

          {/* <CustomInput
            name="location"
            placeholder={'Ubicación'}
            control={control}
            rules={{required: 'Ubicación is required'}}
            onPress={() => navigation.navigate('Location Picker')}
          />  */}

          <CustomButton 
            text={'Ubicación: '+ getValues("location")} 
            type="custom"
            fColor="gray"
            onPress={() => {
              navigation.navigate('Location Picker',{index, resetPin: true});
            }} 
          />

          <CustomButton 
            text="Fotos" 
            type="custom"
            fColor="gray"
            onPress={() => {
              console.log('photos library to be called');
              navigation.navigate('Imagenes',{index});
            }} 
          />

          <View style={{marginTop: 50}}>
              
            <Text style={{marginBottom: 10, fontWeight:'bold'}}>Observaciones</Text>
            <CustomButton text="Quick" type="custom" order="top" bgColor={"#48a5e9"} fColor='white' iconName={observation.observationTypes.quick?.status ?  "arrow-forward-ios" : "add-circle"} onPress={() => navigation.navigate('Rapida')} />
            <CustomButton text="Avalanche" type="custom" order="middle" bgColor={"#4062ff"} fColor='white' iconName={observation.observationTypes.avalanche?.status ?  "arrow-forward-ios" : "add-circle"} onPress={() => navigation.navigate('Avalancha')} /> 
            <CustomButton text="Snowpack" type="custom" order="bottom" bgColor={"#48a5e9"} fColor='white' iconName={observation.observationTypes.snowpack?.status ?  "arrow-forward-ios" : "add-circle"} onPress={() => navigation.navigate('Manto de nieve')} />
            {/* <CustomButton text="Weather" type="custom" order="middle" bgColor={"#f5c144"} fgColor='white' iconName={"add-circle"} onPress={()=>{console.log('seting type Weather')}} />
            <CustomButton text="Incident" type="custom" order="bottom" bgColor={"#e15141"} fgColor='white' iconName={"add-circle"} onPress={()=>{console.log('seting type Incident')}} /> */}
          </View>
          <View style={{marginTop: 50}}>
            <CustomButton text="Subir a Atesmaps" bgColor={"#62a256"} fgColor='white' iconName={null} onPress={handleSubmit(onSubmit)} />
          </View>
          <View >
            <CustomButton text="Eliminar" 
                bgColor={"#f00"} 
                fgColor='white' 
                iconName={null} 
                onPress={() => {
                  //let index = selectedIndex;
                  deleteObservation();
                  navigation.navigate('Lista de Observaciones');
                }} />
          </View>
       
       
          {/* <Text style={styles.status}> {keyboardStatus}</Text> */}
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