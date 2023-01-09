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
import CustomInput from "../components/CustomInput";
import CustomRadioButton from "../components/CustomRadioButton";
import CustomButton from "../components/CustomButton";

import CustomCheckbox from "../components/CustomCheckbox";

import { useForm, Controller } from "react-hook-form";

import { ObservationContext } from '../context/ObservationContext';

const SnowpackObservationTypeDetail: () => Node = ({ route, navigation }) => {
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
const { editingObservation, selectedIndex, setEditingObservation,updateObservations  } = useContext(ObservationContext);
const [snowpackValues, setSnowpackValues] = useState(editingObservation.observationTypes?.snowpack ? editingObservation.observationTypes?.snowpack : {status: false, values: {}});


const { control, handleSubmit, formState: { errors }, getValues, setValue } = useForm({
    defaultValues: {
        // range_1: snowpackValues.values.altitudeRange?.range_1 ? snowpackValues.values.altitudeRange?.range_1 : null,
        // range_2: snowpackValues.values.altitudeRange?.range_2 ? snowpackValues.values.altitudeRange?.range_2 : null,
        // range_3: snowpackValues.values.altitudeRange?.range_3 ? snowpackValues.values.altitudeRange?.range_3 : null,
        // range_4: snowpackValues.values.altitudeRange?.range_4 ? snowpackValues.values.altitudeRange?.range_4 : null,
        altitude: snowpackValues.values?.altitude ? snowpackValues.values?.altitude : null,
        altitudeRange1: snowpackValues.values?.altitudeRange?.range_1 ? snowpackValues.values?.altitudeRange?.range_1 : null,
        altitudeRange2: snowpackValues.values?.altitudeRange?.range_2 ? snowpackValues.values?.altitudeRange?.range_2 : null,
        altitudeRange3: snowpackValues.values?.altitudeRange?.range_3 ? snowpackValues.values?.altitudeRange?.range_3 : null,
        altitudeRange4: snowpackValues.values?.altitudeRange?.range_4 ? snowpackValues.values?.altitudeRange?.range_4 : null,
        orientationN: snowpackValues.values?.orientation?.N ? snowpackValues.values?.orientation?.N : null,
        orientationNE: snowpackValues.values?.orientation?.NE ? snowpackValues.values?.orientation?.NE : null,
        orientationE: snowpackValues.values?.orientation?.E ? snowpackValues.values?.orientation?.E : null,
        orientationSE: snowpackValues.values?.orientation?.SE ? snowpackValues.values?.orientation?.SE : null,
        orientationS: snowpackValues.values?.orientation?.S ? snowpackValues.values?.orientation?.S : null,
        orientationSO: snowpackValues.values?.orientation?.SO ? snowpackValues.values?.orientation?.SO : null, 
        orientationO: snowpackValues.values?.orientation?.O ? snowpackValues.values?.orientation?.O : null,
        orientationNO: snowpackValues.values?.orientation?.NO ? snowpackValues.values?.orientation?.NO : null,
        depth: snowpackValues.values?.depth ? snowpackValues.values?.depth : null,
        observationType: snowpackValues.values?.observationType ? snowpackValues.values?.observationType : null,
        woumpfs:snowpackValues.values?.woumpfs ? snowpackValues.values?.woumpfs : null, 
        sounds:snowpackValues.values?.sounds ? snowpackValues.values?.sounds : null, 
        layerSnowType:snowpackValues.values?.layerSnowType ? snowpackValues.values?.layerSnowType : null, 
        footPenetration:snowpackValues.values?.footPenetration ? snowpackValues.values?.footPenetration : null,
        skiPenetration:snowpackValues.values?.skiPenetration ? snowpackValues.values?.skiPenetration : null,
        handTest:snowpackValues.values?.handTest ? snowpackValues.values?.handTest : null, 
        compresionTest:snowpackValues.values?.compresionTest ? snowpackValues.values?.compresionTest : null,
        extensionTest:snowpackValues.values?.extensionTest ? snowpackValues.values?.extensionTest : null,
        fractureType:snowpackValues.values?.fractureType ? snowpackValues.values?.fractureType : null,
        fractureDepth:snowpackValues.values?.fractureDepth ? snowpackValues.values?.fractureDepth : null,
        layerHardness:snowpackValues.values?.layerHardness ? snowpackValues.values?.layerHardness : null,
        snowHumidity:snowpackValues.values?.snowHumidity ? snowpackValues.values?.snowHumidity : null, 
        snowType:snowpackValues.values?.snowType ? snowpackValues.values?.snowType : null,
        comments:snowpackValues.values?.comments ? snowpackValues.values?.comments : null,
    }
});

const removeData = () => {
    // console.log('------Snowpack report---------');
    // console.log("Delete Snowpack report observation...");  

   
    let observation = editingObservation;
    observation.observationTypes['snowpack'] = {status: false, values: {}}; 
    setEditingObservation({...editingObservation, observationTypes: observation.observationTypes['snowpack']});
    updateObservations(observation);
    
    // console.log(observation);
    // console.log('---------------------------');
    Snackbar.show({
        text: 'Tu observación sobre el manto de nieve se ha eliminado.',
        duration: Snackbar.LENGTH_SHORT,
        numberOfLines: 2,
        textColor: "#fff",
        backgroundColor: "#B00020",
    });
    navigation.navigate('Observación',{selectedIndex});
}

const updateData = () => {
    // console.log('------Quick report---------');
    const values = getValues();
    // console.log(values);

    let aux = {values: {}}

    aux['values'].observationType= values.observationType;

    aux['values'].altitude= values.altitude;

    aux['values']['altitudeRange'] = {
        'range_1': values.altitudeRange1,
        'range_2': values.altitudeRange2,
        'range_3': values.altitudeRange3,
        'range_4': values.altitudeRange4,
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

    aux['values'].depth= values.depth;
    aux['values'].woumpfs= values.woumpfs;
    aux['values'].sounds= values.sounds;
    aux['values'].layerSnowType= values.layerSnowType;
    aux['values'].footPenetration= values.footPenetration;
    aux['values'].skiPenetration= values.skiPenetration;

    aux['values'].handTest= values.handTest;
    aux['values'].compresionTest= values.compresionTest;
    aux['values'].extensionTest= values.extensionTest;
    aux['values'].fractureType= values.fractureType;
    aux['values'].fractureDepth= values.fractureDepth;
    aux['values'].layerHardness= values.layerHardness;
    aux['values'].layerHumidity= values.layerHumidity;
    aux['values'].snowType= values.snowType;
    aux['values'].comments= values.comments;

    aux.status = true;
    
    // console.log(aux.status);
    setSnowpackValues(aux);
    
    let observation = editingObservation;
    observation.observationTypes['snowpack'] = aux; 
    setEditingObservation({...editingObservation, observationTypes: observation.observationTypes['snowpack']});
    updateObservations(observation);
    // console.log("Value updated...");
    // console.log('---------------------------');
    navigation.navigate('Observación',{selectedIndex});
    Snackbar.show({
        text: 'Tu observación sobre el manto de nieve se ha guardado.',
        duration: Snackbar.LENGTH_SHORT,
        numberOfLines: 2,
        textColor: "#fff",
        backgroundColor: "#62a256",
    });
    navigation.navigate('Observación',{selectedIndex});
}

//Snow conditions:
const [altitude, setAltitude] = useState(snowpackValues.values?.altitude);


const [altitudeRange1, setAltitudeRange1] = useState(snowpackValues.values?.altitudeRange?.range_1);
const [altitudeRange2, setAltitudeRange2] = useState(snowpackValues.values?.altitudeRange?.range_2);
const [altitudeRange3, setAltitudeRange3] = useState(snowpackValues.values?.altitudeRange?.range_3);
const [altitudeRange4, setAltitudeRange4] = useState(snowpackValues.values?.altitudeRange?.range_4);
// useEffect(()=>{
//     let conditions = snowpackValues;
//     conditions.values['altitudeRange'] = {
//         range_1: altitudeRange1,
//         range_2: altitudeRange2,
//         range_3: altitudeRange3,
//         range_4: altitudeRange4,
//     }
//     // conditions.status = true;
//     setsnowpackValues(conditions);

// },[altitudeRange1,altitudeRange2,altitudeRange3,altitudeRange4])

const [orientationN, setOrientationN] = useState(snowpackValues.values?.orientation?.N);
const [orientationNE, setOrientationNE] = useState(snowpackValues.values?.orientation?.NE);
const [orientationE, setOrientationE] = useState(snowpackValues.values?.orientation?.E);
const [orientationSE, setOrientationSE] = useState(snowpackValues.values?.orientation?.SE);
const [orientationS, setOrientationS] = useState(snowpackValues.values?.orientation?.S);
const [orientationSO, setOrientationSO] = useState(snowpackValues.values?.orientation?.SO);
const [orientationO, setOrientationO] = useState(snowpackValues.values?.orientation?.O);
const [orientationNO, setOrientationNO] = useState(snowpackValues.values?.orientation?.NO);
// useEffect(()=>{
//     let conditions = snowpackValues;
//     conditions.values['orientation'] = {
//         N: orientationN,
//         NE: orientationNE,
//         E: orientationE,
//         SE: orientationSE,
//         S: orientationS,
//         SO: orientationSO,
//         O: orientationO,
//         NO: orientationNO,
//     }
//     // conditions.status = true;
//     setsnowpackValues(conditions);
 
// },[orientationN,orientationNE,orientationE,orientationSE,orientationS,orientationO,orientationNO])

const [depth, setDepth] = useState(snowpackValues.values?.depth);
// useEffect(()=>{
//     let conditions = snowpackValues;
//     conditions.values['depth'] = depth
//     // conditions.status = true;
//     setsnowpackValues(conditions);
// },[depth]);
const [observationType, setObservationType] = useState(snowpackValues.values?.observationType);
// useEffect(()=>{
//     let conditions = snowpackValues;
//     conditions.values['observationType'] = observationType
//     // conditions.status = true;
//     setsnowpackValues(conditions);
// },[observationType]);
const [woumpfs, setWoumpfs] = useState(snowpackValues.values?.woumpfs);
const [sounds, setSounds] = useState(snowpackValues.values?.sounds);
const [layerSnowType, setLayerSnowType] = useState(snowpackValues.values?.layerSnowType);
const [footPenetration, setFootPenetration] = useState(snowpackValues.values?.footPenetration);
const [skiPenetration, setSkiPenetration] = useState(snowpackValues.values?.skiPenetration);
const [handTest, setHandTest] = useState(snowpackValues.values?.handTest);
const [compresionTest, setCompresionTest] = useState(snowpackValues.values?.compresionTest);
const [extensionTest, setExtensionTest] = useState(snowpackValues.values?.extensionTest);
const [fractureType, setFractureType] = useState(snowpackValues.values?.fractureType);
const [fractureDepth, setFractureDepth] = useState(snowpackValues.values?.fractureDepth);
const [layerHardness, setLayerHardness] = useState(snowpackValues.values?.layerHardness);
const [snowHumidity, setSnowHumidity] = useState(snowpackValues.values?.snowHumidity);
const [snowType, setSnowType] = useState(snowpackValues.values?.snowType);

// useEffect(()=>{
//     let conditions = snowpackValues;
//     conditions.values['woumpfs'] = woumpfs
//     conditions.values['sounds'] = sounds
//     conditions.values['layerSnowType'] = layerSnowType
//     conditions.values['footPenetration'] = footPenetration
//     conditions.values['skiPenetration'] = skiPenetration
//     conditions.values['handTest'] = handTest
//     conditions.values['compresionTest'] = compresionTest
//     conditions.values['extensionTest'] = extensionTest
//     conditions.values['fractureType'] = fractureType
//     conditions.values['fractureDepth'] = fractureDepth
//     conditions.values['layerHardness'] = layerHardness
//     conditions.values['snowHumidity'] = snowHumidity
//     conditions.values['snowType'] = snowType
//     // conditions.status = true;
//     setsnowpackValues(conditions);
// },[woumpfs,sounds,layerSnowType,footPenetration,skiPenetration,handTest, compresionTest,extensionTest,fractureType,fractureDepth,layerHardness,snowHumidity,snowType]);

//comments 
const [comments, setComments] = useState(snowpackValues.values?.comments);

// useEffect(()=>{
//     let conditions = snowpackValues;
//     conditions.values['cxz  omments'] = comments
//     conditions.status = true;
//     setsnowpackValues(conditions);
// },[comments]);


const typeOptions = [
        {label: 'Puntual'},
        {label: 'Salida'},
      
    ];

const triggerOptions = [
        {label: 'Accidental'},
        {label: 'Natural'},
        {label: 'Artificial'},
    ];

const booleanOptions = [
        {label: 'Si'},
        {label: 'No'},
    ];

const windExposureOptions = [
        {label: 'Sotavento'},
        {label: 'Sobrevento'},
        {label: 'Carga cruzada'},
        {label: 'Sin exposicion al viento'},
    ];

const cmtOptions = [
        {label: 'Muy facil'},
        {label: 'Facil'},
        {label: 'Moderado'},
        {label: 'Difícil'},
        {label: 'No concluyente'},
    ];

const  snowTypeOptions= [
        {label: 'Nueva'},
        {label: 'Crosta'},
        {label: 'Facetas'},
        {label: 'Grano fino'},
        {label: 'Variable'},
    ];

const ctOptions = [
        {label: '1 a 10 Golpes'},
        {label: '11 a 20 Golpes'},
        {label: '21 a 30 Golpes'},
        {label: 'No concluyente'},
    ];

const ectOptions = [
        {label: 'Positivo'},
        {label: 'Negativo'},
        {label: 'No concluyente'},
    ];

const fractureOptions = [
        {label: 'Subito/Colapso'},
        {label: 'Subita/Planar'},
        {label: 'Resistente/Planar'},
        {label: 'Progresiva/Colapso'},
        {label: 'Irregular'},
    ];

const hardnessOptions = [
        {label: '1 - (P) Puño'},
        {label: '2 - (4d) 4 dedos'},
        {label: '3 - (1d) 1 dedo'},
        {label: '4 - (L) Lápiz'},
        {label: '5 - (C) Cuchillo'},
        {label: '6 - (H) Hielo'},
    ]

const humidityOptions = [
        {label: '1-Seca-Bola imposible'},
        {label: '2-Húmeda-Bola fácil'},
        {label: '3-Mojada-Guante no se moja'},
        {label: '4-Muy mojada-Guante se moja'},
        {label: '5-Slush-Sin aire en los poros'},
     
    ]


return(
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
        <ScrollView >
            <View style={styles.container}>
                <View style={styles.introContainer} >
                    <Text style={styles.intro}>manto nieve text intro.... HERE </Text> 
                </View>
                <View style={styles.formContainer} >
                    <View style={styles.spacer}/>
                    <CustomRadioButton 
                        name="observationType"
                        title="La observación fué hace:"
                        control={control}
                        data={typeOptions}
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
                    <Text>Franja altitudinal:</Text>
                    <View style={styles.formGroup}>
                        <CustomCheckbox name="altitudeRange1"
                                        title="inferior a 1.600 m" 
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                        <CustomCheckbox name="altitudeRange2" 
                                        title="entre 1.600 - 2.000 m"
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                    </View> 

                    <View style={styles.formGroup}>
                        <CustomCheckbox name="altitudeRange3"
                                        title="entre 2.000 - 2.400 m" 
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                        <CustomCheckbox name="altitudeRange4" 
                                        title="superior a 2.400 m"
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                       
                    </View> 
                    <CustomInput
                        name="altitude"
                        placeholder="Cota altimetrica zona de salida (m)"
                        control={control}
                        // rules={{required: 'Title is required'}}
                    />      
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
                    <Text>Orientación:</Text>
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
                <View style={styles.spacer}></View>
                    <Text>Profundidad del manto:</Text>
                    <CustomInput
                        name="depth"
                        placeholder="Profundidad del manto (cm)"
                        control={control}
                        // rules={{required: 'Title is required'}}
                    />       
                </View>

                <View style={styles.formContainer} >
                    <View style={styles.spacer}/>
                   
                    <CustomRadioButton 
                        name="woumpfs"
                        title="Has escuchado/sentido woumpfs?"
                        control={control}
                        data={booleanOptions}
                        // rules={{required: 'Campo obligatorio'}}
                        box={false}
                        textColor={'black'}
                        circleSize={14}
                    />
               
                </View>

                <View style={styles.formContainer} >
               
                    <View style={styles.spacer}/>
                    <CustomRadioButton 
                        name="sounds"
                        title="Has escuchado crujidos?"
                        control={control}
                        data={booleanOptions}
                        // rules={{required: 'Campo obligatorio'}}
                        box={false}
                        textColor={'black'}
                        circleSize={14}
                    />
                </View>
            
                <View style={styles.formContainer} >
                    <View style={styles.spacer}/>
                    <CustomRadioButton 
                        name="layerSnowType"
                        title="Nieve en superfície"
                        control={control}
                        data={snowTypeOptions}
                        // rules={{required: 'Campo obligatorio'}}
                        box={false}
                        textColor={'black'}
                        circleSize={14}
                    />
                   
                </View>

                <View style={styles.formContainer} >
                    <View style={styles.spacer}></View>
                    <Text>Penetración pie:</Text>
                    <CustomInput
                        name="footPenetration"
                        placeholder="(cm)"
                        control={control}
                        // rules={{required: 'Title is required'}}
                    />   
                </View>
            
                <View style={styles.formContainer} >
                    <View style={styles.spacer}></View>
                    <Text>Penetración esqui:</Text>
                    <CustomInput
                        name="skiPenetration"
                        placeholder="(cm)"
                        control={control}
                        // rules={{required: 'Title is required'}}
                    />   
                </View>

                <View style={styles.formContainer} >
                    <View style={styles.spacer}/>
                    <CustomRadioButton 
                        name="handTest"
                        title="Test Cizalla de mano"
                        control={control}
                        data={cmtOptions}
                        // rules={{required: 'Campo obligatorio'}}
                        box={false}
                        textColor={'black'}
                        circleSize={14}
                    />
                    {/* <Text>Test Cizalla de mano</Text>
                        <RadioButtonRN
                            textColor={'black'}
                            circleSize={14}
                            data={cmtOptions}
                            initial={handTest ? handTest : null}
                            box={false}
                            selectedBtn={(e) => {
                                setHandTest(cmtOptions.map(object => object.label).indexOf(e.label)+1);
                            }}
                            /> */}
                </View>

                <View style={styles.formContainer} >
                    <View style={styles.spacer}/>
                    <CustomRadioButton 
                        name="compresionTest"
                        title="Test Compresión (CT)"
                        control={control}
                        data={ctOptions}
                        // rules={{required: 'Campo obligatorio'}}
                        box={false}
                        textColor={'black'}
                        circleSize={14}
                    />
                    
                </View>

                <View style={styles.formContainer} >
                    <View style={styles.spacer}/>
                    <CustomRadioButton 
                        name="extensionTest"
                        title="Test Columna Extendida (ECT)"
                        control={control}
                        data={ectOptions}
                        // rules={{required: 'Campo obligatorio'}}
                        box={false}
                        textColor={'black'}
                        circleSize={14}
                    />
                   
                </View>

                <View style={styles.formContainer} >
                    <View style={styles.spacer}/>
                    <CustomRadioButton 
                        name="fractureType"
                        title="Tipo de fractura"
                        control={control}
                        data={fractureOptions}
                        // rules={{required: 'Campo obligatorio'}}
                        box={false}
                        textColor={'black'}
                        circleSize={14}
                    />
                </View>

                <View style={styles.formContainer} >
                <View style={styles.spacer}></View>
                    <Text>Profundidad de fractura (cm, desde la superfície):</Text>
                    <CustomInput
                        name="fractureDepth"
                        placeholder="Profundidad de fractura (cm)"
                        control={control}
                        // rules={{required: 'Title is required'}}
                    />   
                  
                </View>

                <View style={styles.formContainer} >
                    <View style={styles.spacer}/>
                    <CustomRadioButton 
                        name="layerHardness"
                        title="Dureza de la capa"
                        control={control}
                        data={hardnessOptions}
                        // rules={{required: 'Campo obligatorio'}}
                        box={false}
                        textColor={'black'}
                        circleSize={14}
                    />
                </View>

                <View style={styles.formContainer} >
                    <View style={styles.spacer}/>
                    <CustomRadioButton 
                        name="snowHumidity"
                        title="Humedad de la capa"
                        control={control}
                        data={humidityOptions}
                        // rules={{required: 'Campo obligatorio'}}
                        box={false}
                        textColor={'black'}
                        circleSize={14}
                    />
                   
                </View>

                <View style={styles.formContainer} >
                    <View style={styles.spacer}></View>
                    <Text>Tipo de grano:</Text>
                    <CustomInput
                        name="snowType"
                        placeholder="(cm)"
                        control={control}
                        // rules={{required: 'Title is required'}}
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
                        customStyles={styles.inputContainer}
                        placeholder="1000 letras max"
                        />
                    <View style={{marginBottom: 30}}>
                            <CustomButton text="Borrar datos" bgColor={"#B00020"} fgColor='white' iconName={null} onPress={removeData} />
                        </View>
                </View>

                {/* <View style={styles.formContainer} >
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
                            <CustomButton text="Borrar datos" bgColor={"#B00020"} fgColor='white' iconName={null} onPress={removeData} />
                        </View>
                </View>  */}
                
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
    textArea: {
        borderColor: "gray",
        width: "100%",
        height:'20%',
    },
    input: {
        borderColor: "gray",
        width: "100%",
        height:'20%',
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

export default SnowpackObservationTypeDetail;