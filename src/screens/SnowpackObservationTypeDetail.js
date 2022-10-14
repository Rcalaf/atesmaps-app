import React, { useState, useEffect, useContext } from 'react';
import type {Node} from 'react';
import RadioButtonRN from 'radio-buttons-react-native';

import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    ScrollView,
    useColorScheme,
    View,
    Text,
    TextInput
} from 'react-native';
import Section from '../components/Section';

import CheckBox from '@react-native-community/checkbox';
import CustomInput from "../components/CustomInput";

import { ObservationContext } from '../context/ObservationContext';

const SnowpackObservationTypeDetail: () => Node = () => {
const { editingObservation, setEditingObservation  } = useContext(ObservationContext);

const [formValues, setFormValues] = useState(editingObservation.observationTypes?.snowpack ? editingObservation.observationTypes?.snowpack : {status: false, values: {}});

useEffect(()=>{
    let observation = editingObservation.observationTypes;
    observation['snowpack'] = formValues; 
    setEditingObservation({...editingObservation,observationTypes: observation});
},[formValues]);

//Snow conditions:
const [altitude, setAltitude] = useState(formValues.values?.altitude);
useEffect(()=>{
    let conditions = formValues;
    conditions.values['altitude'] = altitude
    // conditions.status = true;
    setFormValues(conditions);
 
},[altitude]);

const [altitudeRange1, setAltitudeRange1] = useState(formValues.values?.altitudeRange?.range_1);
const [altitudeRange2, setAltitudeRange2] = useState(formValues.values?.altitudeRange?.range_2);
const [altitudeRange3, setAltitudeRange3] = useState(formValues.values?.altitudeRange?.range_3);
const [altitudeRange4, setAltitudeRange4] = useState(formValues.values?.altitudeRange?.range_4);
useEffect(()=>{
    let conditions = formValues;
    conditions.values['altitudeRange'] = {
        range_1: altitudeRange1,
        range_2: altitudeRange2,
        range_3: altitudeRange3,
        range_4: altitudeRange4,
    }
    // conditions.status = true;
    setFormValues(conditions);

},[altitudeRange1,altitudeRange2,altitudeRange3,altitudeRange4])

const [orientationN, setOrientationN] = useState(formValues.values?.orientation?.N);
const [orientationNE, setOrientationNE] = useState(formValues.values?.orientation?.NE);
const [orientationE, setOrientationE] = useState(formValues.values?.orientation?.E);
const [orientationSE, setOrientationSE] = useState(formValues.values?.orientation?.SE);
const [orientationS, setOrientationS] = useState(formValues.values?.orientation?.S);
const [orientationSO, setOrientationSO] = useState(formValues.values?.orientation?.SO);
const [orientationO, setOrientationO] = useState(formValues.values?.orientation?.O);
const [orientationNO, setOrientationNO] = useState(formValues.values?.orientation?.NO);
useEffect(()=>{
    let conditions = formValues;
    conditions.values['orientation'] = {
        N: orientationN,
        NE: orientationNE,
        E: orientationE,
        SE: orientationSE,
        S: orientationS,
        SO: orientationSO,
        O: orientationO,
        NO: orientationNO,
    }
    // conditions.status = true;
    setFormValues(conditions);
 
},[orientationN,orientationNE,orientationE,orientationSE,orientationS,orientationO,orientationNO])

const [depth, setDepth] = useState(formValues.values?.depth);
useEffect(()=>{
    let conditions = formValues;
    conditions.values['depth'] = depth
    // conditions.status = true;
    setFormValues(conditions);
},[depth]);
const [observationType, setObservationType] = useState(formValues.values?.observationType);
useEffect(()=>{
    let conditions = formValues;
    conditions.values['observationType'] = observationType
    // conditions.status = true;
    setFormValues(conditions);
},[observationType]);
const [woumpfs, setWoumpfs] = useState(formValues.values?.woumpfs);
const [sounds, setSounds] = useState(formValues.values?.sounds);
const [layerSnowType, setLayerSnowType] = useState(formValues.values?.layerSnowType);
const [footPenetration, setFootPenetration] = useState(formValues.values?.footPenetration);
const [skiPenetration, setSkiPenetration] = useState(formValues.values?.skiPenetration);
const [handTest, setHandTest] = useState(formValues.values?.handTest);
const [compresionTest, setCompresionTest] = useState(formValues.values?.compresionTest);
const [extensionTest, setExtensionTest] = useState(formValues.values?.extensionTest);
const [fractureType, setFractureType] = useState(formValues.values?.fractureType);
const [fractureDepth, setFractureDepth] = useState(formValues.values?.fractureDepth);
const [layerHardness, setLayerHardness] = useState(formValues.values?.layerHardness);
const [snowHumidity, setSnowHumidity] = useState(formValues.values?.snowHumidity);
const [snowType, setSnowType] = useState(formValues.values?.snowType);

useEffect(()=>{
    let conditions = formValues;
    conditions.values['woumpfs'] = woumpfs
    conditions.values['sounds'] = sounds
    conditions.values['layerSnowType'] = layerSnowType
    conditions.values['footPenetration'] = footPenetration
    conditions.values['skiPenetration'] = skiPenetration
    conditions.values['handTest'] = handTest
    conditions.values['compresionTest'] = compresionTest
    conditions.values['extensionTest'] = extensionTest
    conditions.values['fractureType'] = fractureType
    conditions.values['fractureDepth'] = fractureDepth
    conditions.values['layerHardness'] = layerHardness
    conditions.values['snowHumidity'] = snowHumidity
    conditions.values['snowType'] = snowType
    // conditions.status = true;
    setFormValues(conditions);
},[woumpfs,sounds,layerSnowType,footPenetration,skiPenetration,handTest, compresionTest,extensionTest,fractureType,fractureDepth,layerHardness,snowHumidity,snowType]);

//comments 
const [comments, setComments] = useState(formValues.values?.otherComments);

useEffect(()=>{
    let conditions = formValues;
    conditions.values['cxz  omments'] = comments
    conditions.status = true;
    setFormValues(conditions);
},[comments]);


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
                    <Text>La observación fué hace:</Text>
                        <RadioButtonRN
                            textColor={'black'}
                            circleSize={14}
                            data={typeOptions}
                            initial={observationType ? observationType : null}
                            box={false}
                            selectedBtn={(e) => {
                                setObservationType(typeOptions.map(object => object.label).indexOf(e.label)+1);
                            }}
                            />
                </View>

           
                 <View style={styles.formContainer} >
                    <View style={styles.spacer}></View>
                    <Text>Franja altitudinal:</Text>
                    {/* <Text style={{fontSize:12, color: 'gray', padding:5}}>Si dudas entre dos tipos, puedes marcar las dos</Text>         */}
                    <View style={styles.formGroup}>
                        <View style={styles.checkboxGroup}>
                            <CheckBox
                                value={altitudeRange1}
                                style={[ { height: 20, width: 20 } ]}
                                boxType={'circle'}
                                animationDuration={0.4}
                                onAnimationType={'flat'}
                                offAnimationType={'flat'}
                                onValueChange={(newValue) => setAltitudeRange1(newValue)}
                            />
                            <Text style={{marginLeft:10}}> inferior a 1.600 m</Text>
                        </View>
                        <View style={styles.checkboxGroup}>
                            <CheckBox
                                value={altitudeRange2}
                                style={[ { height: 20, width: 20 } ]}
                                boxType={'circle'}
                                animationDuration={0.4}
                                onAnimationType={'flat'}
                                offAnimationType={'flat'}
                                onValueChange={(newValue) => setAltitudeRange2(newValue)}
                            />
                            <Text style={{marginLeft:10}}>entre 1.600 - 2.000 m</Text>
                        </View> 
                    </View>   
                    <View style={styles.formGroup}>
                        <View style={styles.checkboxGroup}>
                            <CheckBox
                                value={altitudeRange3}
                                style={[ { height: 20, width: 20 } ]}
                                boxType={'circle'}
                                animationDuration={0.4}
                                onAnimationType={'flat'}
                                offAnimationType={'flat'}
                                onValueChange={(newValue) => setAltitudeRange3(newValue)}
                            />
                            <Text style={{marginLeft:10}}>entre 2.000 - 2.400 m</Text>
                        </View>
                        <View style={styles.checkboxGroup}>
                            <CheckBox
                                value={altitudeRange4}
                                style={[ { height: 20, width: 20 } ]}
                                boxType={'circle'}
                                animationDuration={0.4}
                                onAnimationType={'flat'}
                                offAnimationType={'flat'}
                                onValueChange={(newValue) => setAltitudeRange4(newValue)}
                            />
                            <Text style={{marginLeft:10}}> superior a 2.400 m</Text>
                        </View>
                        
                    </View>  
                  
                    <View style={[styles.inputContainer, {width:"100%"}]}>
                        <TextInput
                            value={altitude}
                            style={styles.input}
                            multiline={false}
                            numberOfLines={1}
                            placeholder="(m)"
                            onChangeText={(text) => setAltitude(text)}
                            />
                    </View>    
                </View>
                <View style={styles.formContainer} >
                    <View style={styles.spacer}></View>
                    <Text>Orientación:</Text>
                    <View style={styles.formGroup}>
                        <View style={styles.checkboxGroup}>
                            <CheckBox
                                value={orientationN}
                                style={[ { height: 20, width: 20 } ]}
                                boxType={'circle'}
                                animationDuration={0.4}
                                onAnimationType={'flat'}
                                offAnimationType={'flat'}
                                onValueChange={(newValue) => setOrientationN(newValue)}
                            />
                            <Text style={{marginLeft:10}}>N</Text>
                        </View>
                        <View style={styles.checkboxGroup}>
                            <CheckBox
                                value={orientationNE}
                                style={[ { height: 20, width:  20} ]}
                                boxType={'circle'}
                                animationDuration={0.4}
                                onAnimationType={'flat'}
                                offAnimationType={'flat'}
                                onValueChange={(newValue) => setOrientationNE(newValue)}
                            />
                            <Text style={{marginLeft:10}}>NE</Text>
                        </View>
                        <View style={styles.checkboxGroup}>
                            <CheckBox
                                value={orientationE}
                                style={[ { height: 20, width:  20} ]}
                                boxType={'circle'}
                                animationDuration={0.4}
                                onAnimationType={'flat'}
                                offAnimationType={'flat'}
                                onValueChange={(newValue) => setOrientationE(newValue)}
                            />
                            <Text style={{marginLeft:10}}>E</Text>
                        </View>
                    </View> 
                    <View style={styles.formGroup}>
                        <View style={styles.checkboxGroup}>
                            <CheckBox
                                value={orientationSE}
                                style={[ { height: 20, width: 20 } ]}
                                boxType={'circle'}
                                animationDuration={0.4}
                                onAnimationType={'flat'}
                                offAnimationType={'flat'}
                                onValueChange={(newValue) => setOrientationSE(newValue)}
                            />
                            <Text style={{marginLeft:10}}>SE</Text>
                        </View>
                        <View style={styles.checkboxGroup}>
                            <CheckBox
                                value={orientationS}
                                style={[ { height: 20, width:  20} ]}
                                boxType={'circle'}
                                animationDuration={0.4}
                                onAnimationType={'flat'}
                                offAnimationType={'flat'}
                                onValueChange={(newValue) => setOrientationS(newValue)}
                            />
                            <Text style={{marginLeft:10}}>S</Text>
                        </View>
                        <View style={styles.checkboxGroup}>
                            <CheckBox
                                value={orientationSO}
                                style={[ { height: 20, width:  20} ]}
                                boxType={'circle'}
                                animationDuration={0.4}
                                onAnimationType={'flat'}
                                offAnimationType={'flat'}
                                onValueChange={(newValue) => setOrientationSO(newValue)}
                            />
                            <Text style={{marginLeft:10}}>SO</Text>
                        </View>
                    </View> 
                    <View style={styles.formGroup}>
                        <View style={styles.checkboxGroup}>
                            <CheckBox
                                value={orientationO}
                                style={[ { height: 20, width: 20 } ]}
                                boxType={'circle'}
                                animationDuration={0.4}
                                onAnimationType={'flat'}
                                offAnimationType={'flat'}
                                onValueChange={(newValue) => setOrientationO(newValue)}
                            />
                            <Text style={{marginLeft:10}}>O</Text>
                        </View>
                        <View style={styles.checkboxGroup}>
                            <CheckBox
                                value={orientationNO}
                                style={[ { height: 20, width:  20} ]}
                                boxType={'circle'}
                                animationDuration={0.4}
                                onAnimationType={'flat'}
                                offAnimationType={'flat'}
                                onValueChange={(newValue) => setOrientationNO(newValue)}
                            />
                            <Text style={{marginLeft:10}}>NO</Text>
                        </View>
                        <View style={styles.checkboxGroup}>
                            
                        </View>
                    </View> 
                </View>

                <View style={styles.formContainer} >
                <View style={styles.spacer}></View>
                    <Text>Profundidad del manto:</Text>
                    <View style={[styles.inputContainer, {width:"100%"}]}>
                        <TextInput
                            value={depth}
                            style={styles.input}
                            multiline={false}
                            numberOfLines={1}
                            placeholder="Cota altimetrica (m)"
                            onChangeText={(text) => setDepth(text)}
                            />
                    </View> 
                </View>

                <View style={styles.formContainer} >
                    <View style={styles.spacer}/>
                    <Text>Has escuchado/sentido woumpfs?</Text>
                        <RadioButtonRN
                            textColor={'black'}
                            circleSize={14}
                            data={booleanOptions}
                            initial={woumpfs ? woumpfs : null}
                            box={false}
                            selectedBtn={(e) => {
                                setWoumpfs(booleanOptions.map(object => object.label).indexOf(e.label)+1);
                            }}
                            />
                </View>

                <View style={styles.formContainer} >
                    <View style={styles.spacer}/>
                    <Text>Has escuchado crujidos?</Text>
                        <RadioButtonRN
                            textColor={'black'}
                            circleSize={14}
                            data={booleanOptions}
                            initial={sounds ? sounds : null}
                            box={false}
                            selectedBtn={(e) => {
                                setSounds(booleanOptions.map(object => object.label).indexOf(e.label)+1);
                            }}
                            />
                </View>
            
                <View style={styles.formContainer} >
                    <View style={styles.spacer}/>
                    <Text>Nieve en superfície</Text>
                        <RadioButtonRN
                            textColor={'black'}
                            circleSize={14}
                            data={snowTypeOptions}
                            initial={layerSnowType ? layerSnowType : null}
                            box={false}
                            selectedBtn={(e) => {
                                setLayerSnowType(snowTypeOptions.map(object => object.label).indexOf(e.label)+1);
                            }}
                            />
                </View>

                <View style={styles.formContainer} >
                    <View style={styles.spacer}></View>
                    <Text>Penetración pie:</Text>
                    <View style={[styles.inputContainer, {width:"100%"}]}>
                        <TextInput
                            value={footPenetration}
                            style={styles.input}
                            multiline={false}
                            numberOfLines={1}
                            placeholder="(cm)"
                            onChangeText={(text) => setFootPenetration(text)}
                            />
                    </View> 
                </View>
            
                <View style={styles.formContainer} >
                    <View style={styles.spacer}></View>
                    <Text>Penetración esqui:</Text>
                    <View style={[styles.inputContainer, {width:"100%"}]}>
                        <TextInput
                            value={skiPenetration}
                            style={styles.input}
                            multiline={false}
                            numberOfLines={1}
                            placeholder="(cm)"
                            onChangeText={(text) => setSkiPenetration(text)}
                            />
                    </View> 
                </View>

                <View style={styles.formContainer} >
                    <View style={styles.spacer}/>
                    <Text>Test Cizalla de mano</Text>
                        <RadioButtonRN
                            textColor={'black'}
                            circleSize={14}
                            data={cmtOptions}
                            initial={handTest ? handTest : null}
                            box={false}
                            selectedBtn={(e) => {
                                setHandTest(cmtOptions.map(object => object.label).indexOf(e.label)+1);
                            }}
                            />
                </View>

                <View style={styles.formContainer} >
                    <View style={styles.spacer}/>
                    <Text>Test Compresión (CT)</Text>
                        <RadioButtonRN
                            textColor={'black'}
                            circleSize={14}
                            data={ctOptions}
                            initial={compresionTest ? compresionTest : null}
                            box={false}
                            selectedBtn={(e) => {
                                setCompresionTest(ctOptions.map(object => object.label).indexOf(e.label)+1);
                            }}
                            />
                </View>

                <View style={styles.formContainer} >
                    <View style={styles.spacer}/>
                    <Text>Test Columna Extendida (ECT)</Text>
                        <RadioButtonRN
                            textColor={'black'}
                            circleSize={14}
                            data={ectOptions}
                            initial={extensionTest ? extensionTest : null}
                            box={false}
                            selectedBtn={(e) => {
                                setExtensionTest(ectOptions.map(object => object.label).indexOf(e.label)+1);
                            }}
                            />
                </View>

                <View style={styles.formContainer} >
                    <View style={styles.spacer}/>
                    <Text>Tipo de fractura</Text>
                        <RadioButtonRN
                            textColor={'black'}
                            circleSize={14}
                            data={fractureOptions}
                            initial={fractureType ? fractureType : null}
                            box={false}
                            selectedBtn={(e) => {
                                setFractureType(fractureOptions.map(object => object.label).indexOf(e.label)+1);
                            }}
                            />
                </View>

                <View style={styles.formContainer} >
                <View style={styles.spacer}></View>
                    <Text>Profundidad de fractura (cm, desde la superfície):</Text>
                    <View style={[styles.inputContainer, {width:"100%"}]}>
                        <TextInput
                            value={fractureDepth}
                            style={styles.input}
                            multiline={false}
                            numberOfLines={1}
                            placeholder="Cota altimetrica (m)"
                            onChangeText={(text) => setFractureDepth(text)}
                            />
                    </View> 
                </View>

                <View style={styles.formContainer} >
                    <View style={styles.spacer}/>
                    <Text>Dureza de la capa</Text>
                        <RadioButtonRN
                            textColor={'black'}
                            circleSize={14}
                            data={hardnessOptions}
                            initial={layerHardness ? layerHardness : null}
                            box={false}
                            selectedBtn={(e) => {
                                setLayerHardness(hardnessOptions.map(object => object.label).indexOf(e.label)+1);
                            }}
                            />
                </View>

                <View style={styles.formContainer} >
                    <View style={styles.spacer}/>
                    <Text>Humedad de la capa</Text>
                        <RadioButtonRN
                            textColor={'black'}
                            circleSize={14}
                            data={humidityOptions}
                            initial={snowHumidity ? snowHumidity : null}
                            box={false}
                            selectedBtn={(e) => {
                                setSnowHumidity(humidityOptions.map(object => object.label).indexOf(e.label)+1);
                            }}
                            />
                </View>

                <View style={styles.formContainer} >
                    <View style={styles.spacer}></View>
                    <Text>Tipo de grano:</Text>
                    <View style={[styles.inputContainer, {width:"100%"}]}>
                        <TextInput
                            value={snowType}
                            style={styles.input}
                            multiline={false}
                            numberOfLines={1}
                            placeholder="(cm)"
                            onChangeText={(text) => setSnowType(text)}
                            />
                    </View> 
                </View>

                <View style={styles.formContainer} >
                    <View style={styles.spacer}></View>

                    <Text>Other comments:</Text>

                    
                    <View style={styles.textAreaContainer}>
                        <TextInput
                            value={comments}
                            multiline={true}
                            numberOfLines={4}
                            style={styles.textArea}
                            onChangeText={(text) => setComments(text)}
                            />
                    </View>
                </View>    
            </View>
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
        width: '45%',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 5,
    },
    inputGroup:{
        padding: 10,
        marginRight: 10,
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textAreaContainer:{
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
        height:'30%',
        paddingTop: 10,
        paddingBottom: 10,
    },
    input: {
        borderColor: "gray",
        width: "100%",
        paddingTop: 10,
        paddingBottom: 10,
      },

});

export default SnowpackObservationTypeDetail;