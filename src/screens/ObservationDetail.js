import React, {useState, useEffect, useLayoutEffect, useContext} from "react";
import { Text, View, ActivityIndicator, Button, Alert, ScrollView, StyleSheet, SafeAreaView, Keyboard } from "react-native";
import { useForm, Controller } from "react-hook-form";
import moment from 'moment';

import DateTimePicker from '@react-native-community/datetimepicker';

import axios from 'axios';
import fs from "react-native-fs";
const Base64Binary = require('base64-arraybuffer');
import { BASE_URL, PULIC_BUCKET_URL } from '../config';
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../aws/s3";

import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";

import { ObservationContext } from '../context/ObservationContext';
import { AuthContext } from '../context/AuthContext';
import  Snackbar  from "react-native-snackbar";
import { UpdateIdentityPoolCommand } from "@aws-sdk/client-cognito-identity";


export default function ObservationDetail({ route, navigation }) {
    const {editingObservation,setEditingObservation, selectedIndex, observations, getData, deleteObservation, updateObservations } = useContext(ObservationContext);
    const {userDetails,userToken} = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(false);

    const [index, setIndex] = useState(route.params?.index);
    const [update, setUpdate] = useState(route.params?.update);

    const [ observation, setObservation ] = useState(editingObservation);
    const [ location, setLocation] = useState(editingObservation.location);

    // const [images, setImages] = useState(editingObservation.images);

    const [rawDate, setRawDate] = useState(moment(observation.date).toDate());
    const [show, setShow] = useState(false);
    

    const formatLocation = (locationDetails) =>{
      return locationDetails?.latitude + ', ' +locationDetails?.longitude;
    }

    const parseLocation = (locationString) => {
      return {latitude:Number(locationString.split(',')[0]), longitude: Number(locationString.split(',')[1])}
    }

    const uploadFile = async (image) => {
      const file = image.path; // Path to and name of object. For example '../myFiles/index.js'.
      const fileStream = await fs.readFile(file,'base64');
      const arrayBuffer = Base64Binary.decode(fileStream);
      
      let bucketParams = {
        Bucket: "atesmaps",
        ACL: 'public-read',
        Key: observation.directoryId + "/" + image.filename,
        Body: arrayBuffer
      };
      try {
        const data = await s3Client.send(new PutObjectCommand(bucketParams));
        //console.log(data);
        console.log(
          "Successfully uploaded object: " +
            bucketParams.Bucket +
            "/" +
            bucketParams.Key
        );
        return data;
      } catch (err) {
        console.log("Error", err);
      }
      //setIsLoading(false);
    }

    const sendData = async (id,data) => {
      setIsLoading(true);
      data.user = id;
      const aux_images = data.images;
      data.images = []
      aux_images.forEach(image => {
        data.images.push(image.filename);
      });
      try {
        const response = await axios({
          method: "post",
          url: `${BASE_URL}/observations`,
          data: data,
          //headers: { "Content-Type": "multipart/form-data" },
          headers: {"Authorization": `Bearer ${userToken}`}
        });
         console.log(response.status);
         console.log(response.data);

        if (response.status === 201){
            console.log('uploading images...');
            aux_images.forEach(image => {
              uploadFile(image);
            });
            
            // console.log('cleaning local storage');
            getData();
            setObservation({
              title: 'Has no title',
              date: Date.now(),
              location: {
                latitude: location.latitude,
                longitude: location.longitude
              },
              directoryId: userDetails._id+moment().format('X'),
              observationTypes:{},
              status: 0,
              images: [],
              submitted: false,
            });
            setIsLoading(false);
            navigation.navigate('Lista de Observaciones');
            deleteObservation();
            
            Snackbar.show({
              text: 'Muchas gracias. Tu Observación se ha enviado a revisar pr el equipo de ATESMAPS.',
              duration: Snackbar.LENGTH_SHORT,
              numberOfLines: 2,
              textColor: "#fff",
              backgroundColor: "#62a256",
            });
        }else{
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error.response.status);
        setIsLoading(false);
      }
      
    };
    

    const { control, handleSubmit, formState: { errors }, getValues, setValue } = useForm({
      defaultValues: {
        title: editingObservation.title,
        date: moment(editingObservation.date).format('MMMM Do YYYY, hh:mm:ss'),
        location: formatLocation(editingObservation.location),
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
      });
    }, [navigation,editingObservation,rawDate]);


    const onSave = (data) => {

      let obj = data;
      
      obj.date = moment(rawDate).format();
      obj.location = parseLocation(data.location);
      obj.images = editingObservation.images;
      obj.directoryId= editingObservation.directoryId;
      obj.status = 0;
      obj.observationTypes = editingObservation.observationTypes;
      setEditingObservation(obj);
      updateObservations(obj);
 
      Snackbar.show({
        text: 'Los datos de tu observación se han guardado.',
        duration: Snackbar.LENGTH_SHORT,
        numberOfLines: 2,
        textColor: "#fff",
        backgroundColor: "#62a256",
      });
    }


    
    const onSubmit = (data) => {
      if(editingObservation.observationTypes.quick?.status ||
        editingObservation.observationTypes.snowConditions?.status ||
        editingObservation.observationTypes.avalanche?.status){
        //console.log('at least one report...')
       
        let obj = data;
   
        obj.directoryId= editingObservation.directoryId;
        obj.images = editingObservation.images;
        //TODO: check if date updates properly
        obj.date = moment(rawDate).format();
        
        obj.location = location;
        obj.observationTypes = editingObservation.observationTypes;
    
        sendData(userDetails._id,obj); 
  
      }else{
        Snackbar.show({
          text: 'Antes de subir una Observación, completa por lo menos uno de los típos de observaciones',
          duration: Snackbar.LENGTH_SHORT,
          numberOfLines: 2,
          textColor: "#fff",
          backgroundColor: "#B00020",
        });
      } 
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

    // useEffect(()=>{
    //   console.log('Observation has been updated');
    //   // editingObservation.user = userDetails.userId;
    //   setObservation(observations[selectedIndex]);
    //  // console.log(observation);
    // },[observations]);

    useEffect(()=>{
      console.log('Updating editing observation on Observation details');
      // editingObservation.user = userDetails.userId;
      
      setObservation(editingObservation);
      setLocation(editingObservation.location)
      setValue('location',formatLocation(editingObservation.location))
      // setImages(editingObservation.images)
      // console.log(editingObservation.images.length)
      
    },[editingObservation]);

    // useEffect(()=>{
    //   setImages(editingObservation.images)
    // })


    // useEffect(()=>{
    //    console.log('observations has been Updated...')
    //    console.log(observation);
    // },[observation])

    // useEffect(()=>{
    //   setLocation(editingObservation.location);
    //   setValue('location', formatLocation(editingObservation.location));
    //   route.params={index}
    // },[route.params?.update]);

    
    if( isLoading ) {
      return(
          <View style={{flex:1, justifyContent: 'center', alignItems:'center'}}>
              <ActivityIndicator size={'large'}/> 
          </View>
      )
    }

    return (
      <SafeAreaView style={styles.safeContainer}>
        <ScrollView style={styles.container}>
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
            text={`Fotos (${editingObservation.images ? editingObservation.images.length : 0})`}
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
                bgColor={"#B00020"} 
                fgColor='white' 
                iconName={null} 
                onPress={() => {
                  //let index = selectedIndex;
                  deleteObservation();
                  setObservation({
                    title: 'Has no title',
                    date: Date.now(),
                    location: {
                      latitude: location.latitude,
                      longitude: location.longitude
                    },
                    directoryId: userDetails._id+moment().format('X'),
                    observationTypes:{},
                    status: 0,
                    images: [],
                    submitted: false,
                  });
                  navigation.navigate('Lista de Observaciones');
                }} />
          </View>
       
       
          {/* <Text style={styles.status}> {keyboardStatus}</Text> */}
        </ScrollView>
      </SafeAreaView>
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
  },
  safeContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingBottom: 40
},
});