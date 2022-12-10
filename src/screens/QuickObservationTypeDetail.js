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
import CustomCheckbox from "../components/CustomCheckbox";

// import CheckBox from '@react-native-community/checkbox';
import { useForm, Controller } from "react-hook-form";

import { ObservationContext } from '../context/ObservationContext';

const QuickObservationTypeDetail: () => Node = ({ route, navigation }) => {

const { editingObservation, selectedIndex, setEditingObservation, updateObservations  } = useContext(ObservationContext);
const [ quickValues, setQuickValues ] = useState(editingObservation.observationTypes?.quick ? editingObservation.observationTypes?.quick : {status: false, values: {}});

const { control, handleSubmit, formState: { errors }, getValues, setValue, reset } = useForm({
    //defaultValues: preloadedValues
    defaultValues: {
        deepPowder: quickValues.values.snowConditions?.deepPowder ? quickValues.values.snowConditions?.deepPowder : null,
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
        stormyDay: quickValues.values.dayType?.stormy ? quickValues.values.dayType?.stormy : null,
        windyDay: quickValues.values.dayType?.windy ? quickValues.values.dayType?.windy : null,
        coldDay: quickValues.values.dayType?.cold  ? quickValues.values.dayType?.cold : null,
        wetDay: quickValues.values.dayType?.wet ? quickValues.values.dayType?.wet : null,
        sunnyDay: quickValues.values.dayType?.sunny ? quickValues.values.dayType?.sunny : null,
        newConditions: quickValues.values.avalancheConditions?.newConditions ? quickValues.values.avalancheConditions?.newConditions : null,
        avalanches: quickValues.values.avalancheConditions?.slabs ? quickValues.values.avalancheConditions?.slabs : null,
        sounds: quickValues.values.avalancheConditions?.sounds ? quickValues.values.avalancheConditions?.sounds : null,
        tempChanges: quickValues.values.avalancheConditions?.tempChanges ? quickValues.values.avalancheConditions?.tempChanges : null,
        snowAccumulation: quickValues.values.avalancheConditions?.snowAccumulation ? quickValues.values.avalancheConditions?.snowAccumulation : null,
        comments: quickValues.values.otherComments ? quickValues.values.otherComments : null,
        ridingQuality: quickValues.values.ridingQuality ? quickValues.values.ridingQuality : null,
        activityType: quickValues.values.activityType ? quickValues.values.activityType : null,
    }
});

useLayoutEffect(() => {
    navigation.setOptions({
      // title: value === '' ? 'No title' : value,
      headerRight: () => (
        <Button
          onPress={() => {
            console.log('Saving quick observation on local storage....');
            // console.log(getValues());
            // console.log(errors);
            handleSubmit(updateData)();
          
            // navigation.navigate('Observación', {index, update:true})
          }}
          title="Guardar"
        />
      )
    });
    //TODO: Here we can dynamically change the header of the screen....
    //check documentation here: https://reactnavigation.org/docs/navigation-prop/#setparams
  }, [navigation]);



const updateData = () => {
    console.log('------Quick report---------');
    const values = getValues();
    // console.log(values);

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
        'stormy': values.stormyDay,
        'windy': values.windyDay,
        'cold': values.coldDay,
        'wet': values.wetDay, 
        'sunny': values.sunnyDay
    }

    aux['values']['avalancheConditions'] = {
        'newConditions': values.newConditions,
        'slabs': values.avalanches,
        'sounds': values.sounds,
        'tempChanges': values.tempChanges,
        'snowAccumulation': values.snowAccumulation
    }

    aux['values'].otherComments = values.comments

    aux['values'].ridingQuality = values.ridingQuality

    aux['values'].activityType = values.activityType

    aux.status = true;
 
    setQuickValues(aux);
    
    let observation = editingObservation;
    observation.observationTypes['quick'] = aux; 
    setEditingObservation({...editingObservation, observationTypes: observation.observationTypes['quick']});
    updateObservations(observation);
    navigation.navigate('Observación',{selectedIndex});
}

const removeData = () => {
    console.log('------Quick report---------');
    console.log("Delete Quick report observation...");  

   
    let observation = editingObservation;
    observation.observationTypes['quick'] = {status: false, values: {}}; 
    setEditingObservation({...editingObservation, observationTypes: observation.observationTypes['quick']});
    updateObservations(observation);
    
    console.log(observation);
    console.log('---------------------------');
    navigation.navigate('Observación',{selectedIndex});
}

//Snow conditions:
const [deepPowder, setDeepPowder] = useState(quickValues.values?.snowConditions?.deepPowder);
const [crusty, setCrusty] = useState(quickValues.values?.snowConditions?.crusty);
const [wet, setWet] = useState(quickValues.values?.snowConditions?.wet);
const [heavy, setHeavy] = useState(quickValues.values?.snowConditions?.heavy);
// const [powder, setPowder] = useState(quickValues.values?.snowConditions?.powder);
const [windAffected, setWindAffected] = useState(quickValues.values?.snowConditions?.windAffected);
const [hard, setHard] = useState(quickValues.values?.snowConditions?.hard);



//ridden slopes:
const [rodeMellow, setRodeMellow] = useState(quickValues.values?.rodeSlopeTypes?.mellow);
const [rodeAlpine, setRodeAlpine] = useState(quickValues.values?.rodeSlopeTypes?.alpine);
const [rodeClear, setRodeClear] = useState(quickValues.values?.rodeSlopeTypes?.clear);
const [rodeDense, setRodeDense] = useState(quickValues.values?.rodeSlopeTypes?.dense);
const [rodeSteep, setRodeSteep] = useState(quickValues.values?.rodeSlopeTypes?.steep);
const [rodeOpen, setRodeOpen] = useState(quickValues.values?.rodeSlopeTypes?.open);
const [rodeShade, setRodeShade] = useState(quickValues.values?.rodeSlopeTypes?.shade);
const [rodeSunny, setRodeSunny] = useState(quickValues.values?.rodeSlopeTypes?.sunnys);


//avoided slopes 
// const [avoidAlpine, setAvoidAlpine] = useState(quickValues.values?.avoidedSlopeTypes?.alpine);
// const [avoidDense, setAvoidDense] = useState(quickValues.values?.avoidedSlopeTypes?.dense);
// const [avoidSteep, setAvoidSteep] = useState(quickValues.values?.avoidedSlopeTypes?.steep);
// const [avoidOpen, setAvoidOpen] = useState(quickValues.values?.avoidedSlopeTypes?.openTrees);
// const [avoidCut, setAvoidCut] = useState(quickValues.values?.avoidedSlopeTypes?.cut);
// const [avoidSunny, setAvoidSunny] = useState(quickValues.values?.avoidedSlopeTypes?.sunny);

// useEffect(()=>{
//     let conditions = quickValues;
//     conditions.values['avoidedSlopeTypes'] = {
//         'alpine': avoidAlpine,
//         'dense': avoidDense,
//         'steep': avoidSteep,
//         'openTrees': avoidOpen,
//         'cut': avoidCut,
//         'sunny': avoidSunny
//     }
//     setQuickValues(conditions);
//     // console.log(quickValues);
// },[avoidAlpine,avoidDense,avoidSteep,avoidOpen,avoidCut,avoidSunny]);


//weather conditions
const [warmDay, setWarmDay] = useState(quickValues.values?.dayType?.warm);
const [foggyDay, setFoggyDay] = useState(quickValues.values?.dayType?.foggy);
const [cloudyDay, setCloudyDay] = useState(quickValues.values?.dayType?.cloudy);
const [stormyDay, setStormyDay] = useState(quickValues.values?.dayType?.stormy);
const [windyDay, setWindyDay] = useState(quickValues.values?.dayType?.windy);
const [wetDay, setWetDay] = useState(quickValues.values?.dayType?.wet);
const [coldDay, setColdDay] = useState(quickValues.values?.dayType?.cold);
const [sunnyDay, setSunnyDay] = useState(quickValues.values?.dayType?.sunny);

//avalanche conditions:
const [newConditions, setNewConditions] = useState(quickValues.values?.avalancheConditions?.newConditions);
const [avalanches, setAvalanches] = useState(quickValues.values?.avalancheConditions?.slabs);
const [sounds, setSounds] = useState(quickValues.values?.avalancheConditions?.sounds);
const [tempChanges, setTempChanges] = useState(quickValues.values?.avalancheConditions?.tempChanges);
const [snowAccumulation, setSnowAccumulation] = useState(quickValues.values?.avalancheConditions?.setSnowAccumulation);

//comments 
const [comments, setComments] = useState(quickValues.values?.otherComments);


//Riding conditions:
const data = [
    {label: 'Muy buenas condiciones'},
    {label: 'Buenas condiciones'},
    {label: 'Condiciones aceptables'},
    {label: 'Malas condiciones'},
];

const [ridingQuality, setRidingQuality] = useState(quickValues.values?.ridingQuality);
// useEffect(()=>{
//     let conditions = quickValues;
//     conditions.values['ridingQuality'] = ridingQuality
//     //conditions.status = true;
//     setQuickValues(conditions);
//    // console.log('Riding quality triggered...');
// },[ridingQuality]);

//Activity type:
const activityData = [
    {label: 'Esqui de montaña'},
    {label: 'Raquetas de nieve'},
    {label: 'Alpinismo'},
]

const [activityType, setActivityType] = useState();
// useEffect(()=>{
//     let conditions = quickValues;
//     conditions.values['activityType'] = activityType
//     //conditions.status = true;
//     setQuickValues(conditions);
//    // console.log('Riding quality triggered...');
// },[activityType]);




return(
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
        <ScrollView >
            <View style={styles.container}>
                <View style={styles.introContainer} >
                    <Text style={styles.intro}>Use the Quick Report to quickly share information 
                    about your trip. You can create a comprehensive report by adding more details in 
                    the Avalanche, Snowpack, Weather and/or Incident tabs.</Text> 
                </View>
                <View style={styles.formContainer} >
                    <View style={styles.spacer}/>
                     <CustomRadioButton 
                        name="activityType"
                        title="Actividad:"
                        control={control}
                        data={activityData}
                        rules={{required: 'Campo obligatorio'}}
                        box={false}
                        textColor={'black'}
                        circleSize={14}
                    />
                </View>
                
                <View style={styles.formContainer} >
                    <View style={styles.spacer}/>
                    <CustomRadioButton 
                        name="ridingQuality"
                        title="Evaluación general de la actividad:"
                        control={control}
                        data={data}
                        rules={{required: 'Campo obligatorio'}}
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
                                        title="Crosta" 
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                        <CustomCheckbox name="hard" 
                                        title="Dura"
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                    </View> 
                    <View style={styles.formGroup}>
                        <CustomCheckbox name="heavy"
                                        title="Pesada" 
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                        <CustomCheckbox name="windAffected" 
                                        title="Ventnada"
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
                    <View style={styles.formGroup}>
                        <CustomCheckbox name="warmDay"
                                        title="Cáildo" 
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
                        <CustomCheckbox name="cloudyDay"
                                        title="Nublado" 
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                        <CustomCheckbox name="stormyDay" 
                                        title="Tormenta"
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                    </View> 
                    <View style={styles.formGroup}>
                        <CustomCheckbox name="windyDay"
                                        title="Ventnado" 
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
                        <CustomCheckbox name="wetDay"
                                        title="Húmedo" 
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                        <CustomCheckbox name="sunnyDay" 
                                        title="Soleado"
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                    </View> 
                </View>
                {/* {errors.deepPowder && (
                    <Text style={{color: 'red', alignSelf: 'stretch'}}>{errors.deepPowder?.message || 'Error'}</Text>
                )} 
                </View>*/}


             
                {/* <View style={styles.formContainer} >
                    <View style={styles.spacer}></View>

                    <Text>Meteo del día:</Text>
  
                    <View style={styles.formGroup}>
                        <View style={styles.checkboxGroup}>
                            <CheckBox
                            style={[ { height: 20, width: 20 } ]}
                            disabled={false}
                            boxType={'circle'}
                            animationDuration={0.2}
                            onAnimationType={'flat'}
                            offAnimationType={'flat'}
                            value={avoidAlpine}
                            onValueChange={(newValue) => setAvoidAlpine(newValue)}

                            />
                            <Text style={{marginLeft:10}}>Cálido</Text>
                        </View>
                        <View style={styles.checkboxGroup}>
                            <CheckBox
                           style={[ { height: 20, width: 20 } ]}
                           disabled={false}
                           boxType={'circle'}
                           animationDuration={0.2}
                           onAnimationType={'flat'}
                           offAnimationType={'flat'}
                           value={avoidDense}
                           onValueChange={(newValue) => setAvoidDense(newValue)}
                            />
                            <Text style={{marginLeft:10}}>Frío</Text>
                        </View> 
                    </View>   
                    <View style={styles.formGroup}>
                        <View style={styles.checkboxGroup}>
                            <CheckBox
                          style={[ { height: 20, width: 20 } ]}
                          disabled={false}
                          boxType={'circle'}
                          animationDuration={0.2}
                          onAnimationType={'flat'}
                          offAnimationType={'flat'}
                          value={avoidSteep}
                          onValueChange={(newValue) => setAvoidSteep(newValue)}
                            />
                            <Text style={{marginLeft:10}}>Nublado</Text>
                        </View>
                        <View style={styles.checkboxGroup}>
                            <CheckBox
                         style={[ { height: 20, width: 20 } ]}
                         disabled={false}
                         boxType={'circle'}
                         animationDuration={0.2}
                         onAnimationType={'flat'}
                         offAnimationType={'flat'}r
                         value={avoidOpen}
                         onValueChange={(newValue) => setAvoidOpen(newValue)}
                            />
                            <Text style={{marginLeft:10}}>Venteado</Text>
                        </View> 
                    </View>
                    <View style={styles.formGroup}>
                        <View style={styles.checkboxGroup}>
                            <CheckBox
                          style={[ { height: 20, width: 20 } ]}
                          disabled={false}
                          boxType={'circle'}
                          animationDuration={0.2}
                          onAnimationType={'flat'}
                          offAnimationType={'flat'}r
                          value={avoidCut}
                          onValueChange={(newValue) => setAvoidCut(newValue)}
                            />
                            <Text style={{marginLeft:10}}>Niebla</Text>
                        </View>
                        <View style={styles.checkboxGroup}>
                            <CheckBox
                         style={[ { height: 20, width: 20 } ]}
                         disabled={false}
                         boxType={'circle'}
                         animationDuration={0.2}
                         onAnimationType={'flat'}
                         offAnimationType={'flat'}r
                         value={avoidSunny}
                         onValueChange={(newValue) => setAvoidSunny(newValue)}
                            />
                            <Text style={{marginLeft:10}}>Tormenta</Text>
                        </View> 
                    </View>
                </View> */}

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
                    <View style={styles.formGroup}>
                        <CustomCheckbox name="newConditions"
                                        title="Carga por nieve nueva (+30cm), viento o lluvia durante las últimas 48 horas." 
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                   
                    </View> 

                    <View style={styles.formGroup}>
                        <CustomCheckbox name="avalanches"
                                        title="Indicios de alud de placa, del mismo dia o del dia antes." 
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                     
                    </View> 
                  
                    <View style={styles.formGroup}>
                        <CustomCheckbox name="sounds"
                                        title="Indicios de inestabilidad? Woumfs, crujidos o efecto tambor." 
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                     
                    </View> 
                    <View style={styles.formGroup}>
                        <CustomCheckbox name="tempChanges"
                                        title="Subida crítica de la temperatura (temp cercana a 0º)." 
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                     
                    </View> 
                    <View style={styles.formGroup}>
                        <CustomCheckbox name="snowAccumulation"
                                        title="Accumulaciones recientes por nieve." 
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

                        <View style={styles.inputContainer}>
                            <TextInput
                                value={comments}
                                multiline={true}
                                numberOfLines={4}
                                style={styles.input}
                                placeholder={"1000 letras max"}
                                onChangeText={(text) => setComments(text)}
                                />
                        </View>
                        <View style={{marginBottom: 30}}>
                            <CustomButton text="Borrar observación rápida" bgColor={"#B00020"} fgColor='white' iconName={null} onPress={removeData} />
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