import React, { useState, useEffect, useContext, useRef } from 'react';
import type {Node} from 'react';

import {
    StatusBar,
    StyleSheet,
    Button,
    useColorScheme,
    View,
    Text,
    TouchableOpacity
  } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { AuthContext } from '../context/AuthContext';

import ImagePicker from 'react-native-image-crop-picker';
import CustomButton from "../components/CustomButton";


import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import { baseGestureHandlerProps } from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlerCommon';

import { ListBucketsCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../aws/s3";


//import {path} from "path";
import fs from "react-native-fs";
const Base64Binary = require('base64-arraybuffer');

const ObservationImagesList: () => Node = () => {

// const {logout} = useContext(AuthContext);
const {image,setImage} = useState(null);
const sheetRef = useRef();
const fall = new Animated.Value(1);


const uploadFile = async (image) => {
  
  const file = image.path; // Path to and name of object. For example '../myFiles/index.js'.
  const fileStream = await fs.readFile(file,'base64');
  const arrayBuffer = Base64Binary.decode(fileStream);

  let bucketParams = {
    Bucket: "atesmaps",
    Key: image.filename,
    Body: arrayBuffer
  };
  try {
    const data = await s3Client.send(new PutObjectCommand(bucketParams));
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
}

const takePhotoFromCamera = () => {
  ImagePicker.openCamera({
    compressImageMaxWidth: 300,
    compressImageMaxHeight: 300,
    cropping: true,
    compressImageQuality: 0.7
  }).then(image => {
    console.log(image.filename);
    setImage(image.filename);
    uploadFile(image);
    sheetRef.current.snapTo(1);
  });
}


const choosePhotoFromLibrary = () => {
  ImagePicker.openPicker({
    width: 300,
    height: 300,
    cropping: true,
    compressImageQuality: 0.7
  }).then(image => {
    console.log(image.filename);
    setImage(image.filename);
    uploadFile(image);
    sheetRef.current.snapTo(1);
  });
}

const renderContent = () => (
  <View
    style={{
      backgroundColor: 'white',
      padding: 16,
      height: 450,
    }}
  >
    <View style={{alignItems: 'center'}}>
      <Text style={styles.panelTitle}>Cargar Foto</Text>
      <Text style={styles.panelSubtitle}>Sube imagenes de la observación</Text>
    </View>
    <CustomButton 
          text="Take Photo" 
          type="tertiary"
          onPress={takePhotoFromCamera}
          iconName = {null}
        />
    <CustomButton 
        text="Choose From Library" 
        type="tertiary"
        iconName = {null}
        onPress={choosePhotoFromLibrary} 
      />
    <CustomButton 
        text="Cancel" 
        type="tertiary"
        iconName = {null}
        onPress={() => sheetRef.current.snapTo(1)} 
      />
  </View>
);

const renderHeader = () => (
  <View style={styles.header}>
    <View style={styles.panelHeader}>
      <View style={styles.panelHandle} />
    </View>
  </View>
);


return(
  <>
    <Animated.View style={[styles.container, {opacity: Animated.add(0.1, Animated.multiply(fall,1.0))}]}>
         <MaterialIcons 
            // name='add-a-photo'
            name='collections'
            size={50} 
            color={'gray'}
            style={{marginBottom: 20}}/>
        <Text>No se ha subido ninguna imagen.</Text>
        <Button style={styles.button} 
          title="Añadir imagen" 
          onPress={() => {
            console.log('mostrar imagepicker....');
            sheetRef.current.snapTo(0); 
          }} />
        {/* <TouchableOpacity style={{backgroundColor: '#3098CF', padding: 20, borderRadius:10, marginBottom: 20}} onPress={() => {console.log('buttons pressed....')}}>
          <Text style={{textAlign:'center', color:'#fff', fontWeight: '700', fontSize: 17  }}>Añadir image</Text>
        </TouchableOpacity> */}
    </Animated.View>
    <BottomSheet
          ref={sheetRef}
          snapPoints={[330, -100]}
          initialSnap={1}
          callbackNode={fall}
          enabledGestureInteration={true}
          borderRadius={10}
          renderContent={renderContent}
          renderHeader={renderHeader}
        />
 </>
   
)};

const styles = StyleSheet.create({
    container: {
        paddingTop: 100,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    header: {
      backgroundColor: '#FFFFFF',
      shadowColor: '#333333',
      shadowOffset: {width: -1, height: -1},
      shadowRadius: 2,
      shadowOpacity: 0.4,
      // elevation: 5,
      paddingTop: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    panel: {
      padding: 20,
      backgroundColor: '#FFFFFF',
      paddingTop: 20,
      // borderTopLeftRadius: 20,
      // borderTopRightRadius: 20,
      // shadowColor: '#000000',
      // shadowOffset: {width: 0, height: 0},
      // shadowRadius: 5,
      // shadowOpacity: 0.4,
    },
    panelHeader: {
      alignItems: 'center',
    },
    panelHandle: {
      width: 40,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#00000040',
      marginBottom: 10,
    },
    panelTitle: {
      fontSize: 27,
      height: 35,
    },
    panelSubtitle: {
      fontSize: 14,
      color: 'gray',
      height: 30,
      marginBottom: 10,
    },
  });

export default ObservationImagesList;