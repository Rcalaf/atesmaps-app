import React, { useState, useEffect, useLayoutEffect, useContext } from 'react';
import type {Node} from 'react';
// import RadioButtonRN from 'radio-buttons-react-native';

import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    ScrollView,
    useColorScheme,
    View,
    Button,
    Text,
    TextInput
} from 'react-native';

import CustomRadioButton from "../components/CustomRadioButton";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import CustomCheckbox from "../components/CustomCheckbox";
import Snackbar from "react-native-snackbar";


// import CheckBox from '@react-native-community/checkbox';
import { useForm, Controller } from "react-hook-form";

import { ObservationContext } from '../context/ObservationContext';

const QuickObservationTypeDetail: () => Node = ({ route, navigation }) => {

const { editingObservation, selectedIndex, setEditingObservation, updateObservations  } = useContext(ObservationContext);
const [ quickValues, setQuickValues ] = useState(editingObservation.observationTypes?.quick ? editingObservation.observationTypes?.quick : {status: false, values: {}});
const [inputError, setInputError ] = useState(false);

const { control, handleSubmit, formState: { errors }, getValues, setValue, reset } = useForm({
    //defaultValues: preloadedValues
    defaultValues: {
        deepPowder: quickValues.values.snowConditions?.deepPowder ? quickValues.values.snowConditions?.deepPowder : null,
        customActivityType: quickValues.values.customActivityType ? quickValues.values.customActivityType : null,
        crusty: quickValues.values.snowConditions?.crusty ? quickValues.values.snowConditions?.crusty : null,
        wet: quickValues.values.snowConditions?.wet ? quickValues.values.snowConditions?.wet : null,
        heavy: quickValues.values.snowConditions?.heavy ? quickValues.values.snowConditions?.heavy : null,
        windAffected: quickValues.values.snowConditions?.windAffected ? quickValues.values.snowConditions?.windAffected : null,
        hard: quickValues.values.snowConditions?.hard ? quickValues.values.snowConditions?.hard : null,
        rodeMellow: quickValues.values.rodeSlopeTypes?.mellow? quickValues.values.rodeSlopeTypes?.mellow : null,
        rodeAlpine: quickValues.values.rodeSlopeTypes?.alpine ? quickValues.values.rodeSlopeTypes?.alpine : null,
        rodeClear: quickValues.values.rodeSlopeTypes?.clear ? quickValues.values.rodeSlopeTypes?.clear : null,
        rodeDense: quickValues.values.rodeSlopeTypes?.dense ? quickValues.values.rodeSlopeTypes?.dense : null,
        rodeSteep: quickValues.values.rodeSlopeTypes?.steep ? quickValues.values.rodeSlopeTypes?.steep : null,
        rodeOpen: quickValues.values.rodeSlopeTypes?.openTrees ? quickValues.values.rodeSlopeTypes?.openTrees : null,
        rodeShade: quickValues.values.rodeSlopeTypes?.rodeShade ? quickValues.values.rodeSlopeTypes?.rodeShade : null,
        rodeSunny: quickValues.values.rodeSlopeTypes?.sunny ? quickValues.values.rodeSlopeTypes?.sunny : null,
        // avoidAlpine: 
        // avoidDense,
        // avoidSteep,
        // avoidOpen,
        // avoidCut,
        // avoidSunny,
        warmDay: quickValues.values.dayType?.warm ? quickValues.values.dayType?.warm : null,
        foggyDay:quickValues.values.dayType?.foggy ? quickValues.values.dayType?.foggy : null,
        cloudyDay: quickValues.values.dayType?.cloudy ? quickValues.values.dayType?.cloudy : null,
        // stormyDay: quickValues.values.dayType?.stormy ? quickValues.values.dayType?.stormy : null,
        intenseSnowDay: quickValues.values.dayType?.intenseSnow ? quickValues.values.dayType?.intenseSnow : null,
        weakSnowDay: quickValues.values.dayType?.weakSnow ? quickValues.values.dayType?.weakSnow : null,
        windyDay: quickValues.values.dayType?.windy ? quickValues.values.dayType?.windy : null,
        coldDay: quickValues.values.dayType?.cold  ? quickValues.values.dayType?.cold : null,
        wetDay: quickValues.values.dayType?.wet ? quickValues.values.dayType?.wet : null,
        sunnyDay: quickValues.values.dayType?.sunny ? quickValues.values.dayType?.sunny : null,
        rainyDay: quickValues.values.dayType?.rainy ? quickValues.values.dayType?.rainy : null,
        newConditions: quickValues.values.avalancheConditions?.newConditions ? quickValues.values.avalancheConditions?.newConditions : null,
        avalanches: quickValues.values.avalancheConditions?.slabs ? quickValues.values.avalancheConditions?.slabs : null,
        sounds: quickValues.values.avalancheConditions?.sounds ? quickValues.values.avalancheConditions?.sounds : null,
        tempChanges: quickValues.values.avalancheConditions?.tempChanges ? quickValues.values.avalancheConditions?.tempChanges : null,
        snowAccumulation: quickValues.values.avalancheConditions?.snowAccumulation ? quickValues.values.avalancheConditions?.snowAccumulation : null,
        comments: quickValues.values.comments ? quickValues.values.comments : null,
        ridingQuality: quickValues.values.ridingQuality ? quickValues.values.ridingQuality : null,
        activityType: quickValues.values.activityType ? quickValues.values.activityType : null,
    }
});

useEffect(()=>{
    if (errors && Object.keys(errors).length != 0) {
        let errorsText = 'Revisa los siguientes campos: \n';
        for (const key in errors) {
            errorsText += `${key}: ${errors[key]['message']} \n`
            // console.log(`${key}: ${errors[key]}`);
        }
        Snackbar.show({
            text: errorsText,
            duration: Snackbar.LENGTH_INDEFINITE,
            numberOfLines: 4,
            textColor: "#fff",
            backgroundColor: "#B00020",
            action: {
                text: 'Cerrar',
                textColor: 'white',
                onPress: () => { /* Do something. */ },
            },
        });
    }
},[errors])

useEffect(() => {
    Snackbar.dismiss();
},[])

//NOTE: Here we can dynamically change the header of the screen....
//check documentation here: https://reactnavigation.org/docs/navigation-prop/#setparams
useLayoutEffect(() => {
    navigation.setOptions({
      // title: value === '' ? 'No title' : value,
      headerRight: () => (
        <Button
          onPress={() => {
            // console.log(getValues());
            console.log(errors);
            handleSubmit(updateData)();
           
            // navigation.navigate('Observación', {index, update:true})
          }}
          title="Guardar"
        />
      )
    });
   
  }, [navigation]);



const updateData = () => {
    console.log('------Quick report---------');
    const values = getValues();
    console.log(values.activityType);
    if( values.activityType == 7 && (values.customActivityType === null || values.customActivityType == "")){
        setInputError(true);
        Snackbar.show({
            text: 'Por favor, escribe el tipo de actividad.',
            duration: Snackbar.LENGTH_SHORT,
            numberOfLines: 2,
            textColor: "#fff",
            backgroundColor: "#B00020",
        });
    }else{
        setInputError(false);
        let aux = {values: {}}

        aux['values']['snowConditions'] = {
            'deepPowder': values.deepPowder,
            'crusty': values.crusty,
            'wet': values.wet,
            'heavy': values.heavy,
            'windAffected': values.windAffected,
            'hard': values.hard,
        }

        aux['values']['rodeSlopeTypes'] = {
            'mellow': values.rodeMellow,
            'alpine': values.rodeAlpine,
            'clear': values.rodeClear,
            'dense': values.rodeDense,
            'steep':values.rodeSteep,
            'openTrees': values.rodeOpen,
            'shade': values.rodeShade,
            'sunny': values.rodeSunny
        }

        aux['values']['dayType'] = {
            'warm': values.warmDay,
            'foggy': values.foggyDay,
            'cloudy': values.cloudyDay,
            'intenseSnow': values.intenseSnowDay,
            'weakSnow': values.weakSnowDay,
            'windy': values.windyDay,
            'cold': values.coldDay,
            'wet': values.wetDay, 
            'sunny': values.sunnyDay,
            'rainy': values.rainyDay
        }

        aux['values']['avalancheConditions'] = {
            'newConditions': values.newConditions,
            'slabs': values.avalanches,
            'sounds': values.sounds,
            'tempChanges': values.tempChanges,
            'snowAccumulation': values.snowAccumulation
        }

        aux['values'].comments = values.comments

        aux['values'].ridingQuality = values.ridingQuality

        aux['values'].activityType = values.activityType
        aux['values'].customActivityType = values.customActivityType

        aux.status = true;
    
        setQuickValues(aux);
        
        let observation = editingObservation;
        observation.observationTypes['quick'] = aux; 
        setEditingObservation({...editingObservation, observationTypes: observation.observationTypes['quick']});
        updateObservations(observation);
        Snackbar.show({
            text: 'Tu observación rápida se ha guardado.',
            duration: Snackbar.LENGTH_SHORT,
            numberOfLines: 2,
            textColor: "#fff",
            backgroundColor: "#62a256",
        });
        navigation.navigate('Observación',{selectedIndex});
    }
}

const removeData = () => {
    // console.log('------Quick report---------');
    // console.log("Delete Quick report observation...");  

   
    let observation = editingObservation;
    observation.observationTypes['quick'] = {status: false, values: {}}; 
    setEditingObservation({...editingObservation, observationTypes: observation.observationTypes['quick']});
    updateObservations(observation);
    
    // console.log(observation);
    // console.log('---------------------------');
    Snackbar.show({
        text: 'Tu observación rápida se ha eliminado.',
        duration: Snackbar.LENGTH_SHORT,
        numberOfLines: 2,
        textColor: "#fff",
        backgroundColor: "#B00020",
    });
    navigation.navigate('Observación',{selectedIndex});
}

//Riding conditions:
const data = [
    {label: 'Muy buenas condiciones'},
    {label: 'Buenas condiciones'},
    {label: 'Condiciones aceptables'},
    {label: 'Malas condiciones'},
];

const [ridingQuality, setRidingQuality] = useState(quickValues.values?.ridingQuality);

//Activity type:
const activityData = [
    {label: 'Esqui de montaña / Splitboard'},
    {label: 'Raquetas de nieve'},
    {label: 'Alpinismo'},
    {label: 'Esquí/Snowboard (Pista)'},
    {label: 'Esquí de fondo'},
    {label: 'Sin actividad'},
    {label: 'Otra'}
]

const [activityType, setActivityType] = useState();


return(
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
        <ScrollView >
            <View style={styles.container}>
                <View style={styles.introContainer} >
                    <Text style={styles.intro}>Realiza un breve análisis de tu actividad y las condiciones observadas. 
                    Cualquier informacion puede ser útil a otros usuarios o profesionales. Solo la primera pregunta es obligada, 
                    no respondas aquellas de las que no estés seguro/a. Puedes añadir más detalles en los apartados Avalancha, Manto y Accidente.</Text> 
                    <Text style={styles.introSubtext}> * campos obligatorios</Text>
                </View>

                <View style={styles.formContainer} >
                    <View style={styles.spacer}/>
                     <CustomRadioButton 
                        name="activityType"
                        title="Actividad*:"
                        control={control}
                        data={activityData}
                        rules={{required: 'Campo obligatorio'}}
                        box={false}
                        textColor={'black'}
                        circleSize={14}
                    />
                    <CustomInput
                            name="customActivityType"
                            placeholder="Otro tipo de actividad"
                            control={control}
                            customError={inputError}
                            customStyles={{width:"100%"}}
                            // rules={getValues('activityType') == 6 ? {required: 'Indica actividad'} : null}
                            // onPress={showDatepicker}
                            />
                </View>
                
                <View style={styles.formContainer} >
                    <View style={styles.spacer}/>
                    <CustomRadioButton 
                        name="ridingQuality"
                        title="Evaluación general de la actividad:"
                        control={control}
                        data={data}
                        // rules={{required: 'Campo obligatorio'}}
                        box={false}
                        textColor={'black'}
                        circleSize={14}
                    />
                </View>
                
                <View style={styles.formContainer} >
                    <View style={styles.spacer}></View>
                    {/* <View
                        style={[
                        styles.container,
                        { borderColor: errors.deepPowder ? 'red' : 'none',
                            borderWidth:  errors.deepPowder ? 1 : 0,
                            borderRadius: errors.deepPowder ? 5 : 0,
                            padding: errors.deepPowder ? 5 : 0
                        }
                        ]}
                    > */}

                    
                    <Text>Condiciones de nieve:</Text>
                    <Text style={{fontSize:12, color: 'gray', padding:5}}>Puedes marcar multiples opciones</Text>    
                    <View style={styles.formGroup}>
                        <CustomCheckbox name="deepPowder"
                                        title="Polvo" 
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                        <CustomCheckbox name="wet" 
                                        title="Húmeda"
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                    </View> 

                    <View style={styles.formGroup}>
                        <CustomCheckbox name="crusty"
                                        title="Costra que se rompe" 
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                        <CustomCheckbox name="hard" 
                                        title="Dura/Hielo"
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                    </View> 
                    <View style={styles.formGroup}>
                        {/* <CustomCheckbox name="heavy"
                                        title="Pesada" 
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        /> */}
                        <CustomCheckbox name="windAffected" 
                                        title="Venteada"
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                    </View> 
                </View>
                {/* {errors.deepPowder && (
                    <Text style={{color: 'red', alignSelf: 'stretch'}}>{errors.deepPowder?.message || 'Error'}</Text>
                )} 
                </View>*/}

                <View style={styles.formContainer} >
                    <View style={styles.spacer}></View>
                    {/* <View
                        style={[
                        styles.container,
                        { borderColor: errors.deepPowder ? 'red' : 'none',
                            borderWidth:  errors.deepPowder ? 1 : 0,
                            borderRadius: errors.deepPowder ? 5 : 0,
                            padding: errors.deepPowder ? 5 : 0
                        }
                        ]}
                    > */}
                    <Text>Tipo de terreno:</Text>
                    <Text style={{fontSize:12, color: 'gray', padding:5}}>Puedes marcar multiples opciones</Text>    
                    <View style={styles.formGroup}>
                        <CustomCheckbox name="rodeMellow"
                                        title="Suave" 
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                        <CustomCheckbox name="rodeSteep" 
                                        title="Empinado"
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                        <CustomCheckbox name="rodeAlpine" 
                                        title="Alpino"
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                    </View> 

                    <View style={styles.formGroup}>
                        <CustomCheckbox name="rodeDense"
                                        title="Bosque denso" 
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                        <CustomCheckbox name="rodeClear" 
                                        title="Bosque Abierto"
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                        <CustomCheckbox name="rodeOpen" 
                                        title="Terreno Abierto"
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                    </View> 
                    <View style={styles.formGroup}>
                        <CustomCheckbox name="rodeShade"
                                        title="Umbrío" 
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                        <CustomCheckbox name="rodeSunny" 
                                        title="Soleado"
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                        <View style={styles.checkboxGroup}></View>
                    </View> 
                </View>
                {/* {errors.deepPowder && (
                    <Text style={{color: 'red', alignSelf: 'stretch'}}>{errors.deepPowder?.message || 'Error'}</Text>
                )} 
                </View>*/}

                <View style={styles.formContainer} >
                    <View style={styles.spacer}></View>
                    {/* <View
                        style={[
                        styles.container,
                        { borderColor: errors.deepPowder ? 'red' : 'none',
                            borderWidth:  errors.deepPowder ? 1 : 0,
                            borderRadius: errors.deepPowder ? 5 : 0,
                            padding: errors.deepPowder ? 5 : 0
                        }
                        ]}
                    > */}

                    
                    <Text>El tiempo:</Text>
                    <Text style={{fontSize:12, color: 'gray', padding:5}}>Puedes marcar multiples opciones</Text>    
                    <View style={styles.formGroup}>
                        <CustomCheckbox name="warmDay"
                                        title="Caluroso" 
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                        <CustomCheckbox name="coldDay" 
                                        title="Frio"
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                    </View> 

                    <View style={styles.formGroup}>
                        <CustomCheckbox name="cloudyDay"
                                        title="Nublado" 
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                        <CustomCheckbox name="sunnyDay" 
                                        title="Soleado"
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                    </View> 
                    <View style={styles.formGroup}>
                        <CustomCheckbox name="windyDay"
                                        title="Venteado" 
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                        <CustomCheckbox name="foggyDay" 
                                        title="Niebla"
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                    </View> 

                    <View style={styles.formGroup}>
                        <CustomCheckbox name="wetDay"
                                        title="Húmedo" 
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                        <CustomCheckbox name="rainyDay" 
                                        title="Lluvia"
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                    </View> 
                    <View style={styles.formGroup}>
                        <CustomCheckbox name="weakSnowDay" 
                                        title="Nevada leve"
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                        <CustomCheckbox name="intenseSnowDay"
                                        title="Nevada intensa" 
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                    </View> 
                </View>
                {/* {errors.deepPowder && (
                    <Text style={{color: 'red', alignSelf: 'stretch'}}>{errors.deepPowder?.message || 'Error'}</Text>
                )} 
                </View>*/}

                <View style={styles.formContainer} >
                    <View style={styles.spacer}></View>
                    {/* <View
                        style={[
                        styles.container,
                        { borderColor: errors.deepPowder ? 'red' : 'none',
                            borderWidth:  errors.deepPowder ? 1 : 0,
                            borderRadius: errors.deepPowder ? 5 : 0,
                            padding: errors.deepPowder ? 5 : 0
                        }
                        ]}
                    > */}

                    <Text>Señales de alerta:</Text>
                    <Text style={{fontSize:12, color: 'gray', padding:5}}>Puedes marcar multiples opciones</Text>    
                    <View style={styles.formGroup}>
                        <CustomCheckbox name="newConditions"
                                        title="Carga de nieve nueva (más de 30cm en 48h)" 
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                   
                    </View> 

                    <View style={styles.formGroup}>
                        <CustomCheckbox name="avalanches"
                                        title="Aludes de placa recientes" 
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                     
                    </View> 
                  
                    <View style={styles.formGroup}>
                        <CustomCheckbox name="sounds"
                                        title="Woumfs o fisuras con propagación" 
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                     
                    </View> 
                    <View style={styles.formGroup}>
                        <CustomCheckbox name="tempChanges"
                                        title="Sobrecarga por fusión o lluvia" 
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                     
                    </View> 
                    <View style={styles.formGroup}>
                        <CustomCheckbox name="snowAccumulation"
                                        title="Acumulaciones recientes por viento" 
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                     
                    </View> 
                 
                </View>
                {/* {errors.deepPowder && (
                    <Text style={{color: 'red', alignSelf: 'stretch'}}>{errors.deepPowder?.message || 'Error'}</Text>
                )} 
                </View>*/}

                <View style={styles.formContainer} >
                    <View style={styles.spacer}></View>
                    <Text>Otras observaciones:</Text>
                
                    <CustomInput
                        name="comments"
                        control={control}
                        multiline={true}
                        numberOfLines={4}
                        customStyles={[styles.inputContainer, {height: '20%'}]}
                        placeholder="1000 letras max"
                        />
                        <View style={{marginTop: 30}}>
                            <CustomButton text="Guardar" bgColor={"#62a256"} fgColor='white' iconName={null} onPress={handleSubmit(updateData)} />
                        </View>
                        <View>
                            <CustomButton text="Borrar datos" bgColor={"#B00020"} fgColor='white' iconName={null} onPress={removeData} />
                        </View>
                </View>


            </View>
            <View style={styles.space} />
        </ScrollView>
    </SafeAreaView>
)};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginBottom: 100
    },
    introContainer:{
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    formContainer:{
        padding: 10
    },
    intro: {
        padding:10,
        paddingBottom: 5,
        textAlign: 'left'
    },
    introSubtext:{
        color: 'gray',
        fontSize:12,
        paddingLeft:10,
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
    textArea: {
        borderColor: "gray",
        width: "100%",
        height:'20%',
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
    container: {
        width: '100%',
        borderColor: 'none',
        marginVertical: 5,
    }, 
    space: {
        height: 150,
    }
});

export default QuickObservationTypeDetail;