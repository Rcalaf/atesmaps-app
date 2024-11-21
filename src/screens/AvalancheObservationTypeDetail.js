import React, { useState, useEffect, useLayoutEffect, useContext } from 'react';
import type {Node} from 'react';
import RadioButtonRN from 'radio-buttons-react-native';

import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    ScrollView,
    useColorScheme,
    Button,
    View,
    Text,
    TextInput
} from 'react-native';

import  Snackbar  from "react-native-snackbar";
import CheckBox from '@react-native-community/checkbox';

import { ObservationContext } from '../context/ObservationContext';
import { useForm, Controller } from "react-hook-form";

import CustomRadioButton from "../components/CustomRadioButton";
import CustomButton from "../components/CustomButton";
import CustomCheckbox from "../components/CustomCheckbox";
import CustomInput from "../components/CustomInput";

const AvalancheObservationTypeDetail: () => Node = ({ route, navigation }) => {
const { editingObservation, selectedIndex, updateObservations, setEditingObservation  } = useContext(ObservationContext);

const [avalancheValues, setAvalancheValues] = useState(editingObservation.observationTypes?.avalanche ? editingObservation.observationTypes?.avalanche : {status: false, values: {}});
const { control, handleSubmit, formState: { errors }, getValues, setValue } = useForm({
    //defaultValues: preloadedValues
    defaultValues: {
        date: avalancheValues.values?.date,
        when: avalancheValues.values?.when,
        geoAccuracy: avalancheValues.values?.geoAccuracy,
        amount: avalancheValues.values?.amount,
        obsType: avalancheValues.values?.obsType,
        windExposure: avalancheValues.values?.windExposure,
        dangerLevel1: avalancheValues.values?.dangerLevel?.level_1,
        dangerLevel2: avalancheValues.values?.dangerLevel?.level_2,
        dangerLevel3: avalancheValues.values?.dangerLevel?.level_3,
        dangerLevel4: avalancheValues.values?.dangerLevel?.level_4,
        dangerLevel5: avalancheValues.values?.dangerLevel?.level_5,
        avalancheType1: avalancheValues.values?.avalancheType?.type_1,
        avalancheType2: avalancheValues.values?.avalancheType?.type_2,
        avalancheType3: avalancheValues.values?.avalancheType?.type_3,
        avalancheType4: avalancheValues.values?.avalancheType?.type_4,
        avalancheType5: avalancheValues.values?.avalancheType?.type_5,
        avalancheType6: avalancheValues.values?.avalancheType?.type_6,
        avalancheType7: avalancheValues.values?.avalancheType?.type_7,
        avalancheType8: avalancheValues.values?.avalancheType?.type_8,
        avalancheType9: avalancheValues.values?.avalancheType?.type_9,
        heightRange1: avalancheValues.values?.heightRange?.range_1,
        heightRange2: avalancheValues.values?.heightRange?.range_2,
        heightRange3: avalancheValues.values?.heightRange?.range_3,
        heightRange4: avalancheValues.values?.heightRange?.range_4,
        orientationN: avalancheValues.values?.orientation?.N,
        orientationNE: avalancheValues.values?.orientation?.NE,
        orientationE: avalancheValues.values?.orientation?.E,
        orientationSE: avalancheValues.values?.orientation?.SE,
        orientationS: avalancheValues.values?.orientation?.S,
        orientationSO: avalancheValues.values?.orientation?.SO,
        orientationO: avalancheValues.values?.orientation?.O,
        orientationNO: avalancheValues.values?.orientation?.NO,
        trigger: avalancheValues.values?.trigger,
        snowType: avalancheValues.values?.snowType, 
        depth: avalancheValues.values?.depth, 
        width: avalancheValues.values?.width, 
        length: avalancheValues.values?.length, 
        height: avalancheValues.values?.height, 
        inclination: avalancheValues.values?.inclination, 
        comments: avalancheValues.values?.comments, 
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

useLayoutEffect(() => {
    navigation.setOptions({
      // title: value === '' ? 'No title' : value,
      headerRight: () => (
        <Button
          onPress={() => {
            console.log('Saving Avalanche observation on local storage....');
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


  const removeData = () => {
    // console.log('------Avalanche report---------');
    // console.log("Delete Avalanche report observation...");  

   
    let observation = editingObservation;
    observation.observationTypes['avalanche'] = {status: false, values: {}}; 
    setEditingObservation({...editingObservation, observationTypes: observation.observationTypes['avalanche']});
    updateObservations(observation);
    
    // console.log(observation);
    // console.log('---------------------------');
    
    navigation.navigate('Observación',{selectedIndex});
    Snackbar.show({
        text: 'Tu observación sobre avalanchas se ha eliminado.',
        duration: Snackbar.LENGTH_SHORT,
        numberOfLines: 2,
        textColor: "#fff",
        backgroundColor: "#B00020",
    });
}



const updateData = () => {
    // console.log('------Avalanche report---------');
    const values = getValues();
    ///console.log(values);

    let aux = {values: {}}
    aux['values']['dangerLevel'] = {
        'level_1': values.deepPowder,
        'level_2': values.crusty,
        'level_3': values.wet,
        'level_4': values.heavy,
        'level_5': values.heavy,
    }
   
    aux['values']['avalancheType'] = {
        'type_1': values.avalancheType1,
        'type_2': values.avalancheType2,
        'type_3': values.avalancheType3,
        'type_4': values.avalancheType4,
        'type_5': values.avalancheType5,
        'type_6': values.avalancheType6,
        'type_7': values.avalancheType7,
        'type_8': values.avalancheType8,
        'type_9': values.avalancheType9,
    }
    aux['values']['heightRange'] = {
        'range_1': values.heightRange1,
        'range_2': values.heightRange2,
        'range_3': values.heightRange3,
        'range_4': values.heightRange4,
    }
    aux['values']['orientation'] = {
        'N': values.orientationN,
        'NE': values.orientationNE,
        'E': values.orientationE,
        'SE': values.orientationSE,
        'SO': values.orientationSO,
        'O': values.orientationO,
        'NO': values.orientationNO,
    }
    aux.values.trigger = values.trigger;
    aux.values.snowType = values.snowType; 
    aux.values.depth = values.depth; 
    aux.values.width = values.width; 
    aux.values.length = values.length; 
    aux.values.height = values.height; 
    aux.values.inclination = values.inclination;
    aux.values.comments = values.comments; 
    aux.values.date = values.date;
    aux.values.when = values.when;
    aux.values.amount = values.amount;
    aux.values.windExposure = values.windExposure;
    aux.values.obsType = values.obsType;
    aux.values.geoAccuracy = values.geoAccuracy;

    aux.status = true;
    // console.log("----------------");
    // console.log(aux);
    // console.log("----------------");
    setAvalancheValues(aux);
    
    let observation = editingObservation;
    observation.observationTypes['avalanche'] = aux; 
    setEditingObservation({...editingObservation, observationTypes: observation.observationTypes['avalanche']});
    updateObservations(observation);
    
    // console.log("Value updated...");
    // console.log('---------------------------');
    navigation.navigate('Observación',{selectedIndex});
    Snackbar.show({
        text: 'Tu observación sobre avalanchas se ha guardado.',
        duration: Snackbar.LENGTH_SHORT,
        numberOfLines: 2,
        textColor: "#fff",
        backgroundColor: "#62a256",
    });

}

useEffect(()=>{
    let observation = editingObservation.observationTypes;
    console.log(editingObservation)
    console.log(observation)
    // observation['avalanche'] = avalancheValues; 
    setEditingObservation({...editingObservation,observationTypes: observation});
    //updateObservations(obj);
    // console.log(observation);
},[avalancheValues]);


const obsTypeOptions = [
    {label: 'Singular'},
    {label: 'Síntesis'},
];

const whenOptions = [
        {label: 'Del mismo dia'},
        {label: 'Del dia anterior'},
        {label: 'Mas de dos días'},
    ];

const accuracyOptions = [
    {label: 'Exacta (20-50m)'},
    {label: 'Bastante precisa (50-500m)'},
    {label: 'Poco precisa (>500m)'},
];

const amountOptions = [
        {label: '1'},
        {label: '2-5'},
        {label: '6-10'},
        {label: '>10'}
    ];

const triggerOptions = [
        {label: 'Accidental'},
        {label: 'Natural'},
        {label: 'Artificial'},
    ];

const windExposureOptions = [
        {label: 'Sotavento'},
        {label: 'Carga cruzada'},
        {label: 'Otras situaciones'},
        {label: 'Sin exposicion al viento'},
    ];

return(
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
        <ScrollView >
            <View style={styles.container}>
                <View style={styles.introContainer} >
                    <Text style={styles.intro}>Si tienes información sobre una avalancha o una situación de condiciones generalizada, 
                    aquí puedes detallar información al respecto. Rellena solamente aquellos campos de los que tengas información precisa. </Text> 
                    <Text style={styles.introSubtext}> * campos obligatorios</Text>
                </View>
                <View style={styles.formContainer} >
                    <View style={styles.spacer}/>
                     <CustomRadioButton 
                        name="obsType"
                        title="Observación singular o síntesis del lugar de observación:*"
                        control={control}
                        data={obsTypeOptions}
                        rules={{required: 'Campo obligatorio'}}
                        box={false}
                        textColor={'black'}
                        circleSize={14}
                    />
                </View>
                <View style={styles.formContainer} >
                    <View style={styles.spacer}/>
                     <CustomRadioButton 
                        name="geoAccuracy"
                        title="La geolocalización de la observación es precisa?"
                        control={control}
                        data={accuracyOptions}
                        // rules={{required: 'Campo obligatorio'}}
                        box={false}
                        textColor={'black'}
                        circleSize={14}
                    />
                </View>
                

                <View style={styles.formContainer} >
                    <View style={styles.spacer}/>
                    <CustomRadioButton 
                        name="when"
                        title="La actividad de avalancha fue:"
                        control={control}
                        data={whenOptions}
                        // rules={{required: 'Campo obligatorio'}}
                        box={false}
                        textColor={'black'}
                        circleSize={14}
                    />
                </View>

                <View style={styles.formContainer} >
                    <View style={styles.spacer}/>
                    <CustomRadioButton 
                        name="amount"
                        title="Número de avalanchas:"
                        control={control}
                        data={amountOptions}
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

                    
                    <Text>Medida:</Text>
                    <Text style={{fontSize:12, color: 'gray', padding:5}}>Puedes marcar multiples opciones</Text>        
                    <View style={styles.formGroup}>
                        <CustomCheckbox name="dangerLevel1"
                                        title="1-Peligro de enterramiento mínimo (peligro de caída)" 
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                    </View>
                    <View style={styles.formGroup}>
                        <CustomCheckbox name="dangerLevel2" 
                                        title="2-Puede enterrar, herir o matar a una persona."
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                    </View> 

                    <View style={styles.formGroup}>
                        <CustomCheckbox name="dangerLevel3"
                                        title="3-Puede enterrar o destruir un coche." 
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                    </View>
                    <View style={styles.formGroup}>
                        <CustomCheckbox name="dangerLevel4" 
                                        title="4-Puede enterrar o destruir un vagon de tren."
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                    </View> 
                    <View style={styles.formGroup}>
                        <CustomCheckbox name="dangerLevel5"
                                        title="5-Puede modificar el paisaje, possibilidad de daños desastrosos." 
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

                    
                    <Text>Tipología de alud:</Text>
                    <Text style={{fontSize:12, color: 'gray', padding:5}}>Puedes marcar multiples opciones</Text>            
                    <View style={styles.formGroup}>
                        <CustomCheckbox name="avalancheType1"
                                        title="Placa nieve reciente." 
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                        <CustomCheckbox name="avalancheType2" 
                                        title="Placa de viento."
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                    </View> 

                    <View style={styles.formGroup}>
                        <CustomCheckbox name="avalancheType3"
                                        title="Capa debil persistente" 
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                        <CustomCheckbox name="avalancheType4" 
                                        title="Placa húmeda."
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                    </View> 
                    <View style={styles.formGroup}>
                        <CustomCheckbox name="avalancheType5"
                                        title="Cornisa." 
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                        <CustomCheckbox name="avalancheType6" 
                                        title="Cornisa y placa."
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                    </View>
                    <View style={styles.formGroup}>
                        <CustomCheckbox name="avalancheType7"
                                        title="Puntual húmeda." 
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                        <CustomCheckbox name="avalancheType8" 
                                        title="Puntual seca."
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                    </View>
                    <View style={styles.formGroup}>
                        <CustomCheckbox name="avalancheType9"
                                        title="Deslizamiento basal." 
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

                    <Text>Características de la avalancha:</Text>
                    {/* <Text style={{fontSize:12, color: 'gray', padding:5}}>Si dudas entre dos tipos, puedes marcar las dos</Text>         */}
                    
                    <View style={styles.inputGroup}>
                
                       
                        <CustomInput
                            name="depth"
                            placeholder=" Profundidad de la fractura (en avalanchas de placa)(cm)"
                            control={control}
                            customStyles={{width:"100%"}}
                            //   rules={{required: 'Email is required'}}
                            // onPress={showDatepicker}
                            />
                        

                        
                            <CustomInput
                                name="width"
                                placeholder=" Ancho (en avalanchas de placa)(m)"
                                control={control}
                                customStyles={{width:"100%"}}
                                //   rules={{required: 'Email is required'}}
                                // onPress={showDatepicker}
                                />
                            
               
                            <CustomInput
                                name="length"
                                placeholder=" Largo (en avalanchas de placa y puntuales)(m)"
                                control={control}
                                customStyles={{width:"100%"}}
                                //   rules={{required: 'Email is required'}}
                                // onPress={showDatepicker}
                                />
                           
                       
                    </View>
                   
                </View>
                <View style={styles.formContainer} >
                    <View style={styles.spacer}></View>
                    <CustomRadioButton 
                        name="trigger"
                        title="Desencadenamiento:"
                        control={control}
                        data={triggerOptions}
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

                    
                    <Text>Franja altitudinal:</Text>
                    <Text style={{fontSize:12, color: 'gray', padding:5}}>Puedes marcar multiples opciones</Text>    
                    <View style={styles.formGroup}>
                        <CustomCheckbox name="heightRange1"
                                        title="<2.000 m" 
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                        <CustomCheckbox name="heightRange2" 
                                        title="2.000 - 2.300 m"
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                        <CustomCheckbox name="heightRange3"
                                        title="> 2.300" 
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                    </View> 

                    {/* <View style={styles.formGroup}>
                        <CustomCheckbox name="heightRange3"
                                        title="> 2.300" 
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                        <CustomCheckbox name="heightRange4" 
                                        title="superior a 2.400 m"
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                    </View>  */}
                 
             
                {/* {errors.deepPowder && (
                    <Text style={{color: 'red', alignSelf: 'stretch'}}>{errors.deepPowder?.message || 'Error'}</Text>
                )} 
                </View>*/}

                    <View style={styles.inputGroup}>
                        <CustomInput
                            name="height"
                            placeholder="Cota altimetrica zona de salida (m)"
                            control={control}
                            customStyles={{width:"100%"}}
                            //   rules={{required: 'Email is required'}}
                            // onPress={showDatepicker}
                            />
                    
                       
                    </View> 
                </View>
                <View style={styles.formContainer} >
                <Text>Inclinación zona de salida:</Text>
                <View style={styles.spacer}></View>
                    <View style={styles.inputGroup}>
                    
                         
                    <CustomInput
                            name="inclination"
                            placeholder="Inclinación zona de salida (º)"
                            control={control}
                            customStyles={{width:"100%"}}
                            //   rules={{required: 'Email is required'}}
                            // onPress={showDatepicker}
                            />
                    
                    </View> 
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
                    <Text>Orientación:</Text>
                    <Text style={{fontSize:12, color: 'gray', padding:5}}>Puedes marcar multiples opciones</Text>    
                    <View style={styles.formGroup}>
                        <CustomCheckbox name="orientationN"
                                        title="N" 
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                        <CustomCheckbox name="orientationNE" 
                                        title="NE"
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                         <CustomCheckbox name="orientationE" 
                                        title="E"
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                    </View> 

                    <View style={styles.formGroup}>
                        <CustomCheckbox name="orientationSE"
                                        title="SE" 
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                        <CustomCheckbox name="orientationS" 
                                        title="S"
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                         <CustomCheckbox name="orientationSO" 
                                        title="SO"
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                       
                    </View> 
                    <View style={styles.formGroup}>
                        <CustomCheckbox name="orientationO"
                                        title="O" 
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                        <CustomCheckbox name="orientationNO" 
                                        title="NO"
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                         <View style={styles.checkboxGroup}>
                            
                            </View>
                        
                       
                    </View> 
                  
                  
                </View>
                {/* {errors.deepPowder && (
                    <Text style={{color: 'red', alignSelf: 'stretch'}}>{errors.deepPowder?.message || 'Error'}</Text>
                )} 
                </View>*/}
                <View style={styles.formContainer} >
                <Text>Grano de la capa:</Text>
                <View style={styles.spacer}></View>
                    <View style={styles.inputGroup}>
                    
                        <CustomInput
                            name="snowType"
                            placeholder="Grano de la capa debil"
                            control={control}
                            customStyles={{width:"100%"}}
                            //   rules={{required: 'Email is required'}}
                            // onPress={showDatepicker}
                            />
                    
                    </View> 
                </View>
                <View style={styles.formContainer} >
                 <View style={styles.spacer}></View>
                 <CustomRadioButton 
                        name="windExposure"
                        title="Exposición:"
                        control={control}
                        data={windExposureOptions}
                        // rules={{required: 'Campo obligatorio'}}
                        box={false}
                        textColor={'black'}
                        circleSize={14}
                    />
                   
                </View>

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
            {/* <View style={styles.space} /> */}
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
    inputContainer: {
        backgroundColor: 'white',
        // width: '100%',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 5,
    },
    textArea: {
        borderColor: "gray",
        width: "100%",
        height:'20%',
    },
    input: {
        borderColor: "gray",
        width: "100%",
        height:'auto',
        paddingTop: 10,
        paddingBottom: 10,
    },
    space: {
        height: 20,
    }

});
export default AvalancheObservationTypeDetail;