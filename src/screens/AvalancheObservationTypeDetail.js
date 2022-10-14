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

import { ObservationContext } from '../context/ObservationContext';

const AvalancheObservationTypeDetail: () => Node = () => {
const { editingObservation, setEditingObservation  } = useContext(ObservationContext);

const [formValues, setFormValues] = useState(editingObservation.observationTypes?.avalanche ? editingObservation.observationTypes?.avalanche : {status: true, values: {}});

useEffect(()=>{
    let observation = editingObservation.observationTypes;
    observation['avalanche'] = formValues; 
    setEditingObservation({...editingObservation,observationTypes: observation});
    console.log(observation);
},[formValues]);

//Snow conditions:
const [date, setDate] = useState(formValues.values?.date);
const [when, setWhen] = useState(formValues.values?.when);
const [amount, setAmount] = useState(formValues.values?.amount);
const [windExposure, setWindExposure] = useState(formValues.values?.windExposure);
const [trigger, setTrigger] = useState(formValues.values?.trigger);

useEffect(()=>{
    let conditions = formValues;
    conditions.values['when'] = when;
    conditions.values['amount'] = amount;
    conditions.values['windExposure'] = windExposure;
    conditions.values['trigger'] = trigger;
    // conditions.status = true;
    setFormValues(conditions);
    console.log(formValues);
},[when,amount,windExposure,trigger])

const [snowType, setSnowType] = useState(formValues.values?.snowType);
const [depth, setDepth] = useState(formValues.values?.depth);
const [width, setWidth] = useState(formValues.values?.width);
const [length, setLength] = useState(formValues.values?.length);
const [height, setHeight] = useState(formValues.values?.height);
const [inclination, setInclination] = useState(formValues.values?.inclination);

useEffect(()=>{
    let conditions = formValues;
    conditions.values['depth'] = depth;
    conditions.values['width'] = width;
    conditions.values['height'] = height;
    conditions.values['length'] = length;
    conditions.values['inclination'] = inclination;
    conditions.values['snowType'] = snowType;
    // conditions.status = true;
    setFormValues(conditions);
    console.log(formValues);
},[depth,width,height,length,inclination,snowType])

const [dangerLevel1, setDangerLevel1] = useState(formValues.values?.dangerLevel?.level_1);
const [dangerLevel2, setDangerLevel2] = useState(formValues.values?.dangerLevel?.level_2);
const [dangerLevel3, setDangerLevel3] = useState(formValues.values?.dangerLevel?.level_3);
const [dangerLevel4, setDangerLevel4] = useState(formValues.values?.dangerLevel?.level_4);
const [dangerLevel5, setDangerLevel5] = useState(formValues.values?.dangerLevel?.level_5);
useEffect(()=>{
    let conditions = formValues;
    conditions.values['dangerLevel'] = {
        level_1: dangerLevel1,
        level_2: dangerLevel2,
        level_3: dangerLevel3,
        level_4: dangerLevel4,
        level_5: dangerLevel5,
    }
    // conditions.status = true;
    setFormValues(conditions);
    console.log(formValues);
},[dangerLevel1,dangerLevel2,dangerLevel3,dangerLevel4,dangerLevel5])

const [avalancheType1, setAvalancheType1] = useState(formValues.values?.avalancheType?.type_1);
const [avalancheType2, setAvalancheType2] = useState(formValues.values?.avalancheType?.type_2);
const [avalancheType3, setAvalancheType3] = useState(formValues.values?.avalancheType?.type_3);
const [avalancheType4, setAvalancheType4] = useState(formValues.values?.avalancheType?.type_4);
const [avalancheType5, setAvalancheType5] = useState(formValues.values?.avalancheType?.type_5);
const [avalancheType6, setAvalancheType6] = useState(formValues.values?.avalancheType?.type_6);
const [avalancheType7, setAvalancheType7] = useState(formValues.values?.avalancheType?.type_7);
const [avalancheType8, setAvalancheType8] = useState(formValues.values?.avalancheType?.type_8);
const [avalancheType9, setAvalancheType9] = useState(formValues.values?.avalancheType?.type_9);
useEffect(()=>{
    let conditions = formValues;
    conditions.values['avalancheType'] = {
       type_1: avalancheType1,
       type_2: avalancheType2,
       type_3: avalancheType3,
       type_4: avalancheType4,
       type_5: avalancheType5,
       type_6: avalancheType6,
       type_7: avalancheType7,
       type_8: avalancheType8,
       type_9: avalancheType9,
    }
    // conditions.status = true;
    setFormValues(conditions);
    console.log(formValues);
},[avalancheType1,avalancheType2,avalancheType3,avalancheType4,avalancheType5,avalancheType6,avalancheType7,avalancheType8,avalancheType9])


const [heightRange1, setHeightRange1] = useState(formValues.values?.heightRange?.range_1);
const [heightRange2, setHeightRange2] = useState(formValues.values?.heightRange?.range_2);
const [heightRange3, setHeightRange3] = useState(formValues.values?.heightRange?.range_3);
const [heightRange4, setHeightRange4] = useState(formValues.values?.heightRange?.range_4);
useEffect(()=>{
    let conditions = formValues;
    conditions.values['heightRange'] = {
        range_1: heightRange1,
        range_2: heightRange2,
        range_3: heightRange3,
        range_4: heightRange4,
    }
    // conditions.status = true;
    setFormValues(conditions);
    console.log(formValues);
},[heightRange1,heightRange2,heightRange3,heightRange4])

const [orientation, setOrientation] = useState(formValues.values?.orientation);
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
    console.log(formValues);
},[orientationN,orientationNE,orientationE,orientationSE,orientationS,orientationO,orientationNO])

//comments 
const [comments, setComments] = useState(formValues.values?.otherComments);

useEffect(()=>{
    let conditions = formValues;
    conditions.values['otherComments'] = comments
    conditions.status = true;
    setFormValues(conditions);
},[comments]);


const whenOptions = [
        {label: '< 12 horas'},
        {label: '12 - 24 horas'},
        {label: '24 - 48 horas'},
        {label: '> 48 horas'},
    ];

const amountOptions = [
        {label: '1'},
        {label: '2-5'},
        {label: '6-10'},
        {label: '10-20'},
        {label: '>20'},
    ];

const triggerOptions = [
        {label: 'Accidental'},
        {label: 'Natural'},
        {label: 'Artificial'},
    ];

const windExposureOptions = [
        {label: 'Sotavento'},
        {label: 'Sobrevento'},
        {label: 'Carga cruzada'},
        {label: 'Sin exposicion al viento'},
    ];

return(
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
        <ScrollView >
            <View style={styles.container}>
                <View style={styles.introContainer} >
                    <Text style={styles.intro}>Avalanche text intro.... HERE </Text> 
                </View>
                <View style={styles.formContainer} >
                    <View style={styles.spacer}/>
                    <Text>La observación fué hace:</Text>
                        <RadioButtonRN
                            textColor={'black'}
                            circleSize={14}
                            data={whenOptions}
                            initial={when ? when : null}
                            box={false}
                            selectedBtn={(e) => {
                                setWhen(whenOptions.map(object => object.label).indexOf(e.label)+1);
                            }}
                            />
                </View>

                <View style={styles.formContainer} >
                    <View style={styles.spacer}/>
                    <Text>Número de avalanchas:</Text>
                        <RadioButtonRN
                            textColor={'black'}
                            circleSize={14}
                            data={amountOptions}
                            initial={amount ? amount : null}
                            box={false}
                            selectedBtn={(e) => {
                                setAmount(amountOptions.map(object => object.label).indexOf(e.label)+1);
                            }}
                            />
                </View>
   
                <View style={styles.formContainer} >
                    <View style={styles.spacer}></View>

                    <Text>Medida:</Text>
                    <Text style={{fontSize:12, color: 'gray', padding:5}}>Si dudas entre dos tipos, puedes marcar las dos</Text>        
                    <View style={styles.formGroup}>
                        <View style={styles.checkboxGroup}>
                            <CheckBox
                                value={dangerLevel1}
                                style={[ { height: 20, width: 20 } ]}
                                boxType={'circle'}
                                animationDuration={0.4}
                                onAnimationType={'flat'}
                                offAnimationType={'flat'}
                                onValueChange={(newValue) => setDangerLevel1(newValue)}
                            />
                            <Text style={{marginLeft:10}}>1-Peligro de enterramiento mínimo (peligro de caída)</Text>
                        </View>
                    </View>   
                    <View style={styles.formGroup}>
                        <View style={styles.checkboxGroup}>
                            <CheckBox
                                value={dangerLevel2}
                                style={[ { height: 20, width: 20 } ]}
                                boxType={'circle'}
                                animationDuration={0.4}
                                onAnimationType={'flat'}
                                offAnimationType={'flat'}
                                onValueChange={(newValue) => setDangerLevel2(newValue)}
                            />
                            <Text style={{marginLeft:10}}>2-Puede enterrar, herir o matar a una persona.</Text>
                        </View>
                    </View>  
                    <View style={styles.formGroup}>
                        <View style={styles.checkboxGroup}>
                            <CheckBox
                                value={dangerLevel3}
                                style={[ { height: 20, width: 20 } ]}
                                boxType={'circle'}
                                animationDuration={0.4}
                                onAnimationType={'flat'}
                                offAnimationType={'flat'}
                                onValueChange={(newValue) => setDangerLevel3(newValue)}
                            />
                            <Text style={{marginLeft:10}}>3-Puede enterrar o destruir un coche.</Text>
                        </View>
                    </View>  
                    <View style={styles.formGroup}>
                        <View style={styles.checkboxGroup}>
                            <CheckBox
                                value={dangerLevel4}
                                style={[ { height: 20, width:  20} ]}
                                boxType={'circle'}
                                animationDuration={0.4}
                                onAnimationType={'flat'}
                                offAnimationType={'flat'}
                                onValueChange={(newValue) => setDangerLevel4(newValue)}
                            />
                            <Text style={{marginLeft:10}}>4-Puede enterrar o destruir un vagon de tren.</Text>
                        </View>
                    </View>  
                    <View style={styles.formGroup}>
                        <View style={styles.checkboxGroup}>
                            <CheckBox
                                value={dangerLevel5}
                                style={[ { height: 20, width:  20} ]}
                                boxType={'circle'}
                                animationDuration={0.4}
                                onAnimationType={'flat'}
                                offAnimationType={'flat'}
                                onValueChange={(newValue) => setDangerLevel5(newValue)}
                            />
                            <Text style={{marginLeft:10}}>5-Puede modificar el paisaje, possibilidad de daños desastrosos.</Text>
                        </View>
                    </View>  
                </View>
                <View style={styles.formContainer} >
                    <View style={styles.spacer}></View>

                    <Text>Tipología de avalancha:</Text>
                    <Text style={{fontSize:12, color: 'gray', padding:5}}>Si dudas entre dos tipos, puedes marcar las dos</Text>        
                    <View style={styles.formGroup}>
                        <View style={styles.checkboxGroup}>
                            <CheckBox
                                value={avalancheType1}
                                style={[ { height: 20, width: 20 } ]}
                                boxType={'circle'}
                                animationDuration={0.4}
                                onAnimationType={'flat'}
                                offAnimationType={'flat'}
                                onValueChange={(newValue) => setAvalancheType1(newValue)}
                            />
                            <Text style={{marginLeft:10}}>Placa nieve reciente.</Text>
                        </View>
                        <View style={styles.checkboxGroup}>
                            <CheckBox
                                value={avalancheType2}
                                style={[ { height: 20, width: 20 } ]}
                                boxType={'circle'}
                                animationDuration={0.4}
                                onAnimationType={'flat'}
                                offAnimationType={'flat'}
                                onValueChange={(newValue) => setAvalancheType2(newValue)}
                            />
                            <Text style={{marginLeft:10}}>Placa de viento.</Text>
                        </View> 
                    </View>   
                    <View style={styles.formGroup}>
                        <View style={styles.checkboxGroup}>
                            <CheckBox
                                value={avalancheType3}
                                style={[ { height: 20, width: 20 } ]}
                                boxType={'circle'}
                                animationDuration={0.4}
                                onAnimationType={'flat'}
                                offAnimationType={'flat'}
                                onValueChange={(newValue) => setAvalancheType3(newValue)}
                            />
                            <Text style={{marginLeft:10}}>Placa capa debil persistente</Text>
                        </View>
                        <View style={styles.checkboxGroup}>
                            <CheckBox
                                value={avalancheType4}
                                style={[ { height: 20, width: 20 } ]}
                                boxType={'circle'}
                                animationDuration={0.4}
                                onAnimationType={'flat'}
                                offAnimationType={'flat'}
                                onValueChange={(newValue) => setAvalancheType4(newValue)}
                            />
                            <Text style={{marginLeft:10}}>Placa húmeda</Text>
                        </View>
                    </View>  
                    <View style={styles.formGroup}>
                        <View style={styles.checkboxGroup}>
                            <CheckBox
                                value={avalancheType5}
                                style={[ { height: 20, width: 20 } ]}
                                boxType={'circle'}
                                animationDuration={0.4}
                                onAnimationType={'flat'}
                                offAnimationType={'flat'}
                                onValueChange={(newValue) => setAvalancheType5(newValue)}
                            />
                            <Text style={{marginLeft:10}}>Cornisa</Text>
                        </View>
                        <View style={styles.checkboxGroup}>
                            <CheckBox
                                value={avalancheType6}
                                style={[ { height: 20, width:  20} ]}
                                boxType={'circle'}
                                animationDuration={0.4}
                                onAnimationType={'flat'}
                                offAnimationType={'flat'}
                                onValueChange={(newValue) => setAvalancheType6(newValue)}
                            />
                            <Text style={{marginLeft:10}}>Cornisa y placa</Text>
                        </View>
                    </View>  
                    <View style={styles.formGroup}>
                        <View style={styles.checkboxGroup}>
                            <CheckBox
                                value={avalancheType7}
                                style={[ { height: 20, width:  20} ]}
                                boxType={'circle'}
                                animationDuration={0.4}
                                onAnimationType={'flat'}
                                offAnimationType={'flat'}
                                onValueChange={(newValue) => setAvalancheType7(newValue)}
                            />
                            <Text style={{marginLeft:10}}>Puntual húmeda</Text>
                        </View>
                        <View style={styles.checkboxGroup}>
                            <CheckBox
                                value={avalancheType8}
                                style={[ { height: 20, width:  20} ]}
                                boxType={'circle'}
                                animationDuration={0.4}
                                onAnimationType={'flat'}
                                offAnimationType={'flat'}
                                onValueChange={(newValue) => setAvalancheType8(newValue)}
                            />
                            <Text style={{marginLeft:10}}>Puntual seca</Text>
                        </View>
                       
                    </View>  
                    <View style={styles.formGroup}>
                        <View style={styles.checkboxGroup}>
                            <CheckBox
                                value={avalancheType9}
                                style={[ { height: 20, width:  20} ]}
                                boxType={'circle'}
                                animationDuration={0.4}
                                onAnimationType={'flat'}
                                offAnimationType={'flat'}
                                onValueChange={(newValue) => setAvalancheType9(newValue)}
                            />
                            <Text style={{marginLeft:10}}>Deslizamiento basal</Text>
                        </View>
                    </View>  
                </View>
                <View style={styles.formContainer} >
                    <View style={styles.spacer}></View>

                    <Text>Características de la avalancha:</Text>
                    {/* <Text style={{fontSize:12, color: 'gray', padding:5}}>Si dudas entre dos tipos, puedes marcar las dos</Text>         */}
                    
                    <View style={styles.inputGroup}>
                        <View style={[styles.inputContainer, {width:"30%"}]}>
                            <TextInput
                                value={depth}
                                style={styles.input}
                                multiline={false}
                                numberOfLines={1}
                                placeholder="Profundidad (cm)"
                                onChangeText={(text) => setDepth(text)}
                                />
                        </View>
                        <View style={[styles.inputContainer, {width:"30%"}]}>
                            <TextInput
                                value={width}
                                style={styles.input}
                                multiline={false}
                                numberOfLines={1}
                                placeholder="Ancho (m)"
                                onChangeText={(text) => setWidth(text)}
                                />
                        </View>
                        <View style={[styles.inputContainer, {width:"30%"}]}>
                            <TextInput
                                value={length}
                                style={styles.input}
                                multiline={false}
                                numberOfLines={1}
                                placeholder="Largo (m)"
                                onChangeText={(text) => setLength(text)}
                                />
                        </View>
                    </View>
                    <View style={styles.inputGroup}>
                        <View style={styles.inputContainer}>
                            <TextInput
                                value={snowType}
                                style={styles.input}
                                multiline={false}
                                numberOfLines={1}
                                placeholder="Grano de la capa debil"
                                onChangeText={(text) => setSnowType(text)}
                                />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                value={inclination}
                                style={styles.input}
                                multiline={false}
                                numberOfLines={1}
                                placeholder="Inclinación zona de salida (º)"
                                onChangeText={(text) => setInclination(text)}
                                />
                        </View>
                    </View> 
                </View>
                <View style={styles.formContainer} >
                    <View style={styles.spacer}></View>
                        <Text>Desencadenamiento:</Text>
                        <RadioButtonRN
                            textColor={'black'}
                            circleSize={14}
                            data={triggerOptions}
                            initial={trigger ? trigger : null}
                            box={false}
                            selectedBtn={(e) => {
                                setTrigger(triggerOptions.map(object => object.label).indexOf(e.label)+1);
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
                                value={heightRange1}
                                style={[ { height: 20, width: 20 } ]}
                                boxType={'circle'}
                                animationDuration={0.4}
                                onAnimationType={'flat'}
                                offAnimationType={'flat'}
                                onValueChange={(newValue) => setHeightRange1(newValue)}
                            />
                            <Text style={{marginLeft:10}}> inferior a 1.600 m</Text>
                        </View>
                        <View style={styles.checkboxGroup}>
                            <CheckBox
                                value={heightRange2}
                                style={[ { height: 20, width: 20 } ]}
                                boxType={'circle'}
                                animationDuration={0.4}
                                onAnimationType={'flat'}
                                offAnimationType={'flat'}
                                onValueChange={(newValue) => setHeightRange2(newValue)}
                            />
                            <Text style={{marginLeft:10}}>entre 1.600 - 2.000 m</Text>
                        </View> 
                    </View>   
                    <View style={styles.formGroup}>
                        <View style={styles.checkboxGroup}>
                            <CheckBox
                                value={heightRange3}
                                style={[ { height: 20, width: 20 } ]}
                                boxType={'circle'}
                                animationDuration={0.4}
                                onAnimationType={'flat'}
                                offAnimationType={'flat'}
                                onValueChange={(newValue) => setHeightRange3(newValue)}
                            />
                            <Text style={{marginLeft:10}}>entre 2.000 - 2.400 m</Text>
                        </View>
                        <View style={styles.checkboxGroup}>
                            <CheckBox
                                value={heightRange4}
                                style={[ { height: 20, width: 20 } ]}
                                boxType={'circle'}
                                animationDuration={0.4}
                                onAnimationType={'flat'}
                                offAnimationType={'flat'}
                                onValueChange={(newValue) => setHeightRange4(newValue)}
                            />
                            <Text style={{marginLeft:10}}> superior a 2.400 m</Text>
                        </View>
                        
                    </View>  
                    <View style={styles.inputGroup}>
                        <View style={styles.inputContainer}>
                            <TextInput
                                value={height}
                                style={styles.input}
                                multiline={false}
                                numberOfLines={1}
                                placeholder="Cota altimetrica zona de salida (m)"
                                onChangeText={(text) => setHeight(text)}
                                />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                value={inclination}
                                style={styles.input}
                                multiline={false}
                                numberOfLines={1}
                                placeholder="Inclinación zona de salida (º)"
                                onChangeText={(text) => setInclination(text)}
                                />
                        </View>
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
                    <Text>Exposición:</Text>
                    <RadioButtonRN
                            textColor={'black'}
                            circleSize={14}
                            data={windExposureOptions}
                            initial={windExposure ? windExposure : null}
                            box={false}
                            selectedBtn={(e) => {
                                setWindExposure(windExposureOptions.map(object => object.label).indexOf(e.label)+1);
                            }}
                            />
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

export default AvalancheObservationTypeDetail;