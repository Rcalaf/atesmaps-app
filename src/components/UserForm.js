import React, { useState, useEffect, useContext } from 'react';
import type {Node} from 'react';

import {
    StatusBar,
    StyleSheet,
    useColorScheme,
    View,
    Text,
    TouchableOpacity,
    SafeAreaView
  } from 'react-native';

 import axios from 'axios';
 import { BASE_URL } from '../config';

import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import CustomRadioButton from "../components/CustomRadioButton";
import RadioButtonRN from 'radio-buttons-react-native';

import { useForm, Controller } from "react-hook-form";

const UserForm = ({preloadedValues, onSubmit}) => {
    const [user, setUser] = useState(null);

    const { control, handleSubmit, formState: { errors }, getValues, setValue } = useForm({
      //defaultValues: preloadedValues
      defaultValues: {
        userName: preloadedValues?.username,
        name: preloadedValues?.name,
        lastName: preloadedValues?.lastName,
        email: preloadedValues?.email,
        password: "",
        passwordConfirmation: "",
        gender: Number(preloadedValues?.gender),
        professionalOrientation: Number(preloadedValues?.professionalOrientation),
        snowEducationLevel: Number(preloadedValues?.snowEducationLevel),
        snowExperienceLevel: Number(preloadedValues?.snowExperienceLevel),
        avalanchExposure: Number(preloadedValues?.avalanchExposure),
        terrainType: Number(preloadedValues?.terrainType),
        conditionsType:Number(preloadedValues?.conditionsType),
      }
    });

    //Activity type:
    const genderOptions = [
        {label: 'Mujer'},
        {label: 'Hombre'},
        {label: 'No binario'},
    ]
    const [gender, setGender] = useState(false);

     //Activity type:
     const carreerOptions = [
        {label: 'No relacionada con el terreno de aludes'},
        {label: 'Relacionada con el terreno de aludes (trabajador/a estacion esqui, guarda refugio...)'},
        {label: 'Especificamente relacionada con el terreno de aludes (observador/a, predictor/a, guia, consultor/a, pister/a avalanchas)'},
    ]
    const [carreer, setCarreer] = useState(false);

     //Activity type:
     const educationOptions = [
        {label: 'Sin formación específica'},
        {label: 'Curso/formación recreativo nivel 1'},
        {label: 'Curso/formación recreativo nivel 2'},
        {label: 'Curso profesional (ACNA.CAG, CAP o CAS, CAA ITP, AAA PRO, equivalente)'},
    ]
    const [education, setEducation] = useState(false);


     //Activity type:
     const terrainExpirienceOptions = [
        {label: 'Novel/principiante/inexperto: 1-2 años'},
        {label: 'Aprendiente: 3-5 años'},
        {label: 'Experto: más de 5 años'},
    ]
    const [terrainExpirience, setTerrainExpirience] = useState(false);

     //Activity type:
     const terrainFrequencyOptions = [
        {label: 'Baja: 1-2 actividades-días/mes'},
        {label: 'Mediana: 1-2 actividades-días/semana'},
        {label: 'Alta: 3-7 actividades-días/semana'},
    ]
    const [terrainFrequency, setTerrainFrequency] = useState(false);

     //Activity type:
     const terrainTypeOptions = [
        {label: 'Simple (Exposición a pendientes poco derechos y terreno forestal. Algunas claros de bosque pueden implicar zonas de llegada de aludes poco frecuentes. Muchas opciones para reducir o eliminar la exposición.)'},
        {label: 'Exigente (Exposición a zonas de trayecto de aludes bien definidos, a zonas de salida o en trampas. Hay opciones para reducir o eliminar la exposición encontrando rutas cuidadosamente.)'},
        {label: 'Complejo (Exposición a zonas de trayecto de aludes múltiples y superpuestas o en grandes extensiones de terreno abierto y derecho. Zonas de inicio de aludes múltiples y con trampas debajo. Mínimas opciones de reducir la exposición.)'},
    ]
    const [terrainType, setTerrainType] = useState(false);

     //Activity type:
     const conditionsOptions = [
        {label: 'Sólo con grado de peligro 1-Débil o 2-Moderado'},
        {label: 'Incluso con grado de peligro 3-Marcado pero escojo terreno menos complejo y expuesto.'},
        {label: 'Incluso con grado de pelirgo 4-Fuerte, pero escojo terreno menos complejo y expuesto.'},
    ]
    const [condition, setCondition] = useState(false);

    return(
       <>
            <Text style={styles.sectionTitle}>Datos de Usuario</Text>
            <View style={styles.spacer}/>
            <View style={{marginTop: 10}}>
                
                <CustomInput
                  name="userName"
                  placeholder= "Nombre de usuario"
                  control={control}
                  rules={{required: 'El Nombre de usuario es obligatorio.'}}
                  // onPress={showDatepicker}
                />

                <CustomInput
                  name="email"
                  placeholder="Email"
                  control={control}
                  rules={{required: 'Email is required'}}
                  // onPress={showDatepicker}
                />
    
                {/* <CustomInput
                  name="password"
                  placeholder="Password"
                  secureTextEntry={true}
                  control={control}
                  //rules={{required: {value: (getValues('password') != '') ,message: 'password is required'}}}
                  // onPress={showDatepicker}
                />
    
                <CustomInput
                  name="passwordConfirmation"
                  placeholder="Confrimación password"
                  secureTextEntry={true}
                  control={control}
                  //rules={{required: 'password is required'}}
                  // onPress={showDatepicker}
                /> */}
              </View>
              <Text style={[styles.sectionTitle,{marginTop: 40}]}>Datos personales</Text>
              <View style={styles.spacer}/>
              <View style={{marginTop: 10}}>
                <Text>Nombre</Text>
                <CustomInput
                    name="name"
                    placeholder="Nombre"
                    control={control}
                    rules={{required: 'Name is required'}}
                    // onPress={showDatepicker}
                />
        
                <Text>Apellidos</Text>
                <CustomInput
                    name="lastName"
                    placeholder="Apellidos"
                    control={control}
                    rules={{required: 'lastName is required'}}
                    // onPress={showDatepicker}
                />

                <CustomRadioButton 
                    name="gender"
                    title="Género:"
                    control={control}
                    data={genderOptions}
                    rules={{required: 'Genero is required'}}
                    box={false}
                    textColor={'black'}
                    circleSize={14}
                    
                />
                
                <Text style={[styles.sectionTitle,{marginTop: 40}]}>Experiencia en terreno de aludes (TA)</Text>
                <View style={styles.spacer}/>
                <CustomRadioButton 
                    name="professionalOrientation"
                    title="Profesión:"
                    control={control}
                    data={carreerOptions}
                    rules={{required: 'Profesión is required'}}
                    box={false}
                    textColor={'black'}
                    circleSize={14}
                    containerStyle={{marginTop: 10}}
                />

                <CustomRadioButton 
                    name="snowEducationLevel"
                    title="Formació en terreno de aludes:"
                    control={control}
                    data={educationOptions}
                   //rules={{required: 'Profesión is required'}}
                    box={false}
                    textColor={'black'}
                    circleSize={14}
                    containerStyle={{marginTop: 50}}
                />

                <CustomRadioButton 
                    name="snowExperienceLevel"
                    title="Experiencia en terreno de aludes:"
                    control={control}
                    data={terrainExpirienceOptions}
                   //rules={{required: 'Profesión is required'}}
                    box={false}
                    textColor={'black'}
                    circleSize={14}
                    containerStyle={{marginTop: 50}}
                />

                <CustomRadioButton 
                    name="avalanchExposure"
                    title="Frecuencia en terreno de aludes:"
                    control={control}
                    data={terrainFrequencyOptions}
                   //rules={{required: 'Profesión is required'}}
                    box={false}
                    textColor={'black'}
                    circleSize={14}
                    containerStyle={{marginTop: 50}}
                />

                <Text style={[styles.sectionTitle,{marginTop: 40}]}>Exposición al riesgo de aludes (RA)</Text>
                <View style={styles.spacer}/>
                <CustomRadioButton 
                    name="terrainType"
                    title="Tipo de terreno que escojo para hacer actividad siempre que sea posible por condiciones:"
                    control={control}
                    data={terrainTypeOptions}
                   //rules={{required: 'Profesión is required'}}
                    box={false}
                    textColor={'black'}
                    circleSize={14}
                    containerStyle={{marginTop: 10}}
                />

                <CustomRadioButton 
                    name="conditionsType"
                    title="Condiciones de aludes que escojo para hacer actividad:"
                    control={control}
                    data={conditionsOptions}
                   //rules={{required: 'Profesión is required'}}
                    box={false}
                    textColor={'black'}
                    circleSize={14}
                    containerStyle={{marginTop: 50}}
                />
               
              
            </View>
            <View style={{marginTop: 50}}>
                <CustomButton text="Guardar" bgColor={"#62a256"} fgColor='white' iconName={null} onPress={handleSubmit(onSubmit)} />
            </View>
            </>
    )};

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'column',
            marginBottom: 100
        },
        introContainer:{
            flexDirection: 'row',
            alignItems: 'flex-start',
        },
        formContainer:{
            padding: 10
        },
        intro: {
            padding:10,
            textAlign: 'left'
        },
        formGroup: {
            flex: 1,
            flexDirection: 'row',
            // justifyContent: 'space-between',
            alignItems: 'flex-start',
          
        },
        checkboxGroup:{
            padding: 10,
            marginRight: 10,
            width: '30%',
            flex:1,
            flexDirection: 'row',
            // justifyContent: 'space-between',
            alignItems: 'center'
        },
        textInput: {
            borderColor: 'gray',
            borderWidth: 1,
          },
        spacer: {
            width: '100%',
            marginTop: 10,
            marginBottom: 10,
            backgroundColor: 'gray',
            height: 1,
        },
        inputContainer: {
            backgroundColor: 'white',
            width: '100%',
            borderColor: '#e8e8e8',
            borderWidth: 1,
            borderRadius: 5,
            paddingHorizontal: 10,
            marginVertical: 5,
        },
        input: {
            borderColor: "gray",
            width: "100%",
            height:'30%',
            paddingTop: 10,
            paddingBottom: 10,
        }, 
        sectionTitle: {
            fontSize: 20,
            fontWeight: '600',
        },
    });
      
      
export default UserForm;