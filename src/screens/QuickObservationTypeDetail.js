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

const QuickObservationTypeDetail: () => Node = () => {
    
const { editingObservation, setEditingObservation  } = useContext(ObservationContext);
const [quickValues, setQuickValues] = useState(editingObservation.observationTypes?.quick ? editingObservation.observationTypes?.quick : {status: false, values: {}});

useEffect(()=>{
   // console.log('------OTypeDetails---------');
   // console.log(quickValues);
   // console.log('------END-OTypeDetails-----')
    let observation = editingObservation.observationTypes;
    observation['quick'] = quickValues; 
    setEditingObservation({...editingObservation,observationTypes: observation});
},[quickValues]);

//Snow conditions:
const [deepPowder, setDeepPowder] = useState(quickValues.values?.snowConditions?.deepPowder);
const [crusty, setCrusty] = useState(quickValues.values?.snowConditions?.crusty);
const [wet, setWet] = useState(quickValues.values?.snowConditions?.wet);
const [heavy, setHeavy] = useState(quickValues.values?.snowConditions?.heavy);
const [powder, setPowder] = useState(quickValues.values?.snowConditions?.powder);
const [windAffected, setWindAffected] = useState(quickValues.values?.snowConditions?.windyAffected);
const [hard, setHard] = useState(quickValues.values?.snowConditions?.hard);

useEffect(()=>{
    let conditions = quickValues;
    conditions.values['snowConditions'] = {
        deepPowder,
        crusty,
        wet,
        heavy,
        powder,
        windAffected,
        hard
    }
    conditions.status = true;
    setQuickValues(conditions);
    // console.log(quickValues);
},[deepPowder,crusty,wet,heavy,powder,windAffected,hard])

//ridden slopes:
const [rodeMellow, setRodeMellow] = useState(quickValues.values?.rodeSlopeTypes?.mellow);
const [rodeAlpine, setRodeAlpine] = useState(quickValues.values?.rodeSlopeTypes?.alpine);
const [rodeCut, setRodeCut] = useState(quickValues.values?.rodeSlopeTypes?.cut);
const [rodeDense, setRodeDense] = useState(quickValues.values?.rodeSlopeTypes?.dense);
const [rodeSteep, setRodeSteep] = useState(quickValues.values?.rodeSlopeTypes?.steep);
const [rodeOpen, setRodeOpen] = useState(quickValues.values?.rodeSlopeTypes?.openTrees);
const [rodeShade, setRodeShade] = useState(quickValues.values?.rodeSlopeTypes?.shade);
const [rodeSunny, setRodeSunny] = useState(quickValues.values?.rodeSlopeTypes?.sunnys);

useEffect(()=>{
    let conditions = quickValues;
    conditions.values['rodeSlopeTypes'] = {
        'mellow': rodeMellow,
        'alpine': rodeAlpine,
        'cut': rodeCut,
        'dense': rodeDense,
        'steep':rodeSteep,
        'openTrees': rodeOpen,
        'shade': rodeShade,
        'sunny': rodeSunny
    }
    conditions.status = true;
    setQuickValues(conditions);
     
    // console.log(quickValues);
},[rodeMellow,rodeAlpine,rodeCut,rodeDense,rodeSteep,rodeOpen,rodeShade,rodeSunny]);

//avoided slopes 
const [avoidAlpine, setAvoidAlpine] = useState(quickValues.values?.avoidedSlopeTypes?.alpine);
const [avoidDense, setAvoidDense] = useState(quickValues.values?.avoidedSlopeTypes?.dense);
const [avoidSteep, setAvoidSteep] = useState(quickValues.values?.avoidedSlopeTypes?.steep);
const [avoidOpen, setAvoidOpen] = useState(quickValues.values?.avoidedSlopeTypes?.openTrees);
const [avoidCut, setAvoidCut] = useState(quickValues.values?.avoidedSlopeTypes?.cut);
const [avoidSunny, setAvoidSunny] = useState(quickValues.values?.avoidedSlopeTypes?.sunny);

useEffect(()=>{
    let conditions = quickValues;
    conditions.values['avoidedSlopeTypes'] = {
        'alpine': avoidAlpine,
        'dense': avoidDense,
        'steep': avoidSteep,
        'openTrees': avoidOpen,
        'cut': avoidCut,
        'sunny': avoidSunny
    }
    conditions.status = true;
    setQuickValues(conditions);
    // console.log(quickValues);
},[avoidAlpine,avoidDense,avoidSteep,avoidOpen,avoidCut,avoidSunny]);


//weather conditions
const [warmDay, setWarmDay] = useState(quickValues.values?.dayType?.warm);
const [foggyDay, setFoggyDay] = useState(quickValues.values?.dayType?.foggy);
const [cloudyDay, setCloudyDay] = useState(quickValues.values?.dayType?.cloudy);
const [stormyDay, setStormyDay] = useState(quickValues.values?.dayType?.stormy);
const [windyDay, setWindyDay] = useState(quickValues.values?.dayType?.windy);
const [wetDay, setWetDay] = useState(quickValues.values?.dayType?.wet);
const [coldDay, setColdDay] = useState(quickValues.values?.dayType?.cold);
const [sunnyDay, setSunnyDay] = useState(quickValues.values?.dayType?.sunny);

useEffect(()=>{
    let conditions = quickValues;
    conditions.values['dayType'] = {
        'warm': warmDay,
        'foggy': foggyDay,
        'cloudy': cloudyDay,
        'stormy': stormyDay,
        'windy': windyDay,
        'cold': coldDay,
        'wet': wetDay, 
        'sunny': sunnyDay
    }
    conditions.status = true;
    setQuickValues(conditions);
    // console.log(quickValues);
},[warmDay,foggyDay,cloudyDay,stormyDay,windyDay,coldDay,wetDay,sunnyDay]);

//avalanche conditions:
const [newConditions, setNewConditions] = useState(quickValues.values?.avalancheConditions?.newConditions);
const [avalanches, setAvalanches] = useState(quickValues.values?.avalancheConditions?.slabs);
const [sounds, setSounds] = useState(quickValues.values?.avalancheConditions?.sounds);
const [temperatureChange, setTemperatureChange] = useState(quickValues.values?.avalancheConditions?.tempChanges);

useEffect(()=>{
    let conditions = quickValues;
    conditions.values['avalancheConditions'] = {
        'newConditions': newConditions,
        'slabs': avalanches,
        'sounds': sounds,
        'tempChanges': temperatureChange,
    }
    conditions.status = true;
    setQuickValues(conditions);
},[newConditions,avalanches,sounds,temperatureChange]);

//comments 
const [comments, setComments] = useState(quickValues.values?.otherComments);

useEffect(()=>{
    let conditions = quickValues;
    conditions.values['otherComments'] = comments
    conditions.status = true;
    setQuickValues(conditions);
},[comments]);


//Riding conditions:
const data = [
    {label: 'Muy buenas condiciones'},
    {label: 'Buenas condiciones'},
    {label: 'Condiciones aceptables'},
    {label: 'Malas condiciones'},
];

const [ridingQuality, setRidingQuality] = useState(quickValues.values?.ridingQuality);
useEffect(()=>{
    let conditions = quickValues;
    conditions.values['ridingQuality'] = ridingQuality
    //conditions.status = true;
    setQuickValues(conditions);
   // console.log('Riding quality triggered...');
},[ridingQuality]);

//Activity type:
const activityData = [
    {label: 'Esqui de montaña'},
    {label: 'Raquetas de nieve'},
    {label: 'Alpinismo'},
]

const [activityType, setActivityType] = useState(quickValues.values?.activityType);
useEffect(()=>{
    let conditions = quickValues;
    conditions.values['activityType'] = activityType
    //conditions.status = true;
    setQuickValues(conditions);
   // console.log('Riding quality triggered...');
},[activityType]);


return(
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
        <ScrollView >
            <View style={styles.container}>
                <View style={styles.introContainer} >
                    <Text style={styles.intro}>Use the Quick Report to quickly share information 
                    about your trip. You can create a comprehensive repotr by adding more details in 
                    the Avalanche, Snowpack, Weather and/or Incident tabs.</Text> 
                </View>
                <View style={styles.formContainer} >
                    <View style={styles.spacer}/>
                    <Text>Actividad:</Text>
                        <RadioButtonRN
                            textColor={'black'}
                            circleSize={14}
                            data={activityData}
                            initial={activityType ? activityType : null}
                            box={false}
                            selectedBtn={(e) => {
                                setActivityType(activityData.map(object => object.label).indexOf(e.label)+1);
                            }}
                            />
                </View>
                <View style={styles.formContainer} >
                    <View style={styles.spacer}/>
                    <Text>Evaluación general de la actividad:</Text>
                        <RadioButtonRN
                            textColor={'black'}
                            circleSize={14}
                            data={data}
                            initial={ridingQuality ? ridingQuality : null}
                            box={false}
                            selectedBtn={(e) => {
                               
                                setRidingQuality(data.map(object => object.label).indexOf(e.label)+1);
                            }}
                            />
                </View>
                
                <View style={styles.formContainer} >
                    <View style={styles.spacer}></View>

                    <Text>Condiciones de nieve:</Text>

                    <View style={styles.formGroup}>
                        <View style={styles.checkboxGroup}>
                        <CheckBox
                            value={deepPowder}
                            style={[ { height: 20, width: 20 } ]}
                            boxType={'circle'}
                            animationDuration={0.4}
                            onAnimationType={'flat'}
                            offAnimationType={'flat'}
                            onValueChange={(newValue) => setDeepPowder(newValue)}
                        />
      
                            <Text style={{marginLeft:10}}>Polvo</Text>
                        </View>
                        <View style={styles.checkboxGroup}> 
                            <CheckBox
                            style={[ { height: 20, width: 20 } ]}
                            disabled={false}
                            boxType={'circle'}
                            animationDuration={0.2}
                            onAnimationType={'flat'}
                            offAnimationType={'flat'}
                            value={wet}
                            onValueChange={(newValue) => setWet(newValue)}
                            />
                            <Text style={{marginLeft:10}}>Húmeda</Text>
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
                            value={crusty}
                            onValueChange={(newValue) => setCrusty(newValue)}

                            />
                            <Text style={{marginLeft:10}}>Crosta</Text>
                        </View>
                        <View style={styles.checkboxGroup}>
                            <CheckBox
                           style={[ { height: 20, width: 20 } ]}
                           disabled={false}
                           boxType={'circle'}
                           animationDuration={0.2}
                           onAnimationType={'flat'}
                           offAnimationType={'flat'}
                           value={hard}
                           onValueChange={(newValue) => setPowder(newValue)}
                            />
                            <Text style={{marginLeft:10}}>Dura</Text>
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
                          value={heavy}
                          onValueChange={(newValue) => setHeavy(newValue)}
                            />
                            <Text style={{marginLeft:10}}>Pesada</Text>
                        </View>
                        <View style={styles.checkboxGroup}>
                            <CheckBox
                         style={[ { height: 20, width: 20 } ]}
                         disabled={false}
                         boxType={'circle'}
                         animationDuration={0.2}
                         onAnimationType={'flat'}
                         offAnimationType={'flat'}
                         value={windAffected}
                         onValueChange={(newValue) => setWindAffected(newValue)}
                            />
                            <Text style={{marginLeft:10}}>Venteada</Text>
                        </View> 
                    </View>
                    
                </View>
                <View style={styles.formContainer} >
                    <View style={styles.spacer}></View>

                    <Text>Tipo de terreno :</Text>

                    <View style={styles.formGroup}>
                        <View style={styles.checkboxGroup}>
                        <CheckBox
                            value={rodeMellow}
                            style={[ { height: 20, width: 20 } ]}
                            boxType={'circle'}
                            animationDuration={0.4}
                            onAnimationType={'flat'}
                            offAnimationType={'flat'}
                            onValueChange={(newValue) => setRodeMellow(newValue)}
                        />
      
                            <Text style={{marginLeft:10}}>Suave</Text>
                        </View>
                        <View style={styles.checkboxGroup}> 
                            <CheckBox
                            style={[ { height: 20, width: 20 } ]}
                            disabled={false}
                            boxType={'circle'}
                            animationDuration={0.2}
                            onAnimationType={'flat'}
                            offAnimationType={'flat'}
                            value={rodeSteep}
                            onValueChange={(newValue) => setRodeSteep(newValue)}
                            />
                            <Text style={{marginLeft:10}}>Empinados</Text>
                        </View>
                        <View style={styles.checkboxGroup}>
                            <CheckBox
                            style={[ { height: 20, width: 20 } ]}
                            disabled={false}
                            boxType={'circle'}
                            animationDuration={0.2}
                            onAnimationType={'flat'}
                            offAnimationType={'flat'}
                            value={rodeAlpine}
                            onValueChange={(newValue) => setRodeAlpine(newValue)}

                            />
                            <Text style={{marginLeft:10}}>Alpino</Text>
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
                           value={rodeDense}
                           onValueChange={(newValue) => setRodeDense(newValue)}
                            />
                            <Text style={{marginLeft:10}}>Bosque denso</Text>
                        </View> 
                        <View style={styles.checkboxGroup}>
                            <CheckBox
                         style={[ { height: 20, width: 20 } ]}
                         disabled={false}
                         boxType={'circle'}
                         animationDuration={0.2}
                         onAnimationType={'flat'}
                         offAnimationType={'flat'}
                         value={rodeCut}
                         onValueChange={(newValue) => setRodeCut(newValue)}
                            />
                            <Text style={{marginLeft:10}}>Bosque abierto</Text>
                        </View> 
                        <View style={styles.checkboxGroup}>
                            <CheckBox
                         style={[ { height: 20, width: 20 } ]}
                         disabled={false}
                         boxType={'circle'}
                         animationDuration={0.2}
                         onAnimationType={'flat'}
                         offAnimationType={'flat'}
                         value={rodeOpen}
                         onValueChange={(newValue) => setRodeOpen(newValue)}
                            />
                            <Text style={{marginLeft:10}}>Terreno abierto</Text>
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
                          value={rodeShade}
                          onValueChange={(newValue) => setRodeShade(newValue)}
                            />
                            <Text style={{marginLeft:10}}>Umbrío</Text>
                        </View>
                        <View style={styles.checkboxGroup}>
                            <CheckBox
                         style={[ { height: 20, width: 20 } ]}
                         disabled={false}
                         boxType={'circle'}
                         animationDuration={0.2}
                         onAnimationType={'flat'}
                         offAnimationType={'flat'}
                         value={rodeSunny}
                         onValueChange={(newValue) => setRodeSunny(newValue)}
                            />
                            <Text style={{marginLeft:10}}>Soleado</Text>
                        </View> 
                        <View style={styles.checkboxGroup}></View>
                    </View>
                </View>
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

                    <Text>The day was:</Text>

                    <View style={styles.formGroup}>
                        <View style={styles.checkboxGroup}>
                        <CheckBox
                            value={warmDay}
                            style={[ { height: 20, width: 20 } ]}
                            boxType={'circle'}
                            animationDuration={0.4}
                            onAnimationType={'flat'}
                            offAnimationType={'flat'}
                            onValueChange={(newValue) => setWarmDay(newValue)}
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
                            value={foggyDay}
                            onValueChange={(newValue) => setFoggyDay(newValue)}
                            />
                            <Text style={{marginLeft:10}}>Foggy</Text>
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
                            value={cloudyDay}
                            onValueChange={(newValue) => setCloudyDay(newValue)}

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
                           offAnimationType={'flat'}
                           value={stormyDay}
                           onValueChange={(newValue) => setStormyDay(newValue)}
                            />
                            <Text style={{marginLeft:10}}>Tormenta</Text>
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
                          value={windyDay}
                          onValueChange={(newValue) => setWindyDay(newValue)}
                            />
                            <Text style={{marginLeft:10}}>Venteado</Text>
                        </View>
                        <View style={styles.checkboxGroup}>
                            <CheckBox
                         style={[ { height: 20, width: 20 } ]}
                         disabled={false}
                         boxType={'circle'}
                         animationDuration={0.2}
                         onAnimationType={'flat'}
                         offAnimationType={'flat'}
                         value={coldDay}
                         onValueChange={(newValue) => setColdDay(newValue)}
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
                          value={wetDay}
                          onValueChange={(newValue) => setWetDay(newValue)}
                            />
                            <Text style={{marginLeft:10}}>Húmedo</Text>
                        </View>
                        <View style={styles.checkboxGroup}>
                            <CheckBox
                         style={[ { height: 20, width: 20 } ]}
                         disabled={false}
                         boxType={'circle'}
                         animationDuration={0.2}
                         onAnimationType={'flat'}
                         offAnimationType={'flat'}
                         value={sunnyDay}
                         onValueChange={(newValue) => setSunnyDay(newValue)}
                            />
                            <Text style={{marginLeft:10}}>Soleado</Text>
                        </View> 
                    </View>
                </View>
                <View style={styles.formContainer} >
                    <View style={styles.spacer}></View>

                    <Text>Avalanche conditions:</Text>

                    <View style={styles.formGroup}>
                        <View style={styles.checkboxGroup}>
                            <CheckBox
                                value={newConditions}
                                style={[ { height: 20, width: 20 } ]}
                                boxType={'circle'}
                                animationDuration={0.4}
                                onAnimationType={'flat'}
                                offAnimationType={'flat'}
                                onValueChange={(newValue) => setNewConditions(newValue)}
                            />
                            <Text style={{marginLeft:10}}>Carga por nieve nueva (+30cm), viento o lluvia durante las últimas 48 horas.</Text>
                        </View>
                    </View>   
                    <View style={styles.formGroup}>
                        <View style={styles.checkboxGroup}>
                            <CheckBox
                                value={avalanches}
                                style={[ { height: 20, width: 20 } ]}
                                boxType={'circle'}
                                animationDuration={0.4}
                                onAnimationType={'flat'}
                                offAnimationType={'flat'}
                                onValueChange={(newValue) => setAvalanches(newValue)}
                            />
                            <Text style={{marginLeft:10}}>Indicios de alud de placa, del mismo dia o del dia antes.</Text>
                        </View>
                    </View>  
                    <View style={styles.formGroup}>
                        <View style={styles.checkboxGroup}>
                            <CheckBox
                                value={sounds}
                                style={[ { height: 20, width: 20 } ]}
                                boxType={'circle'}
                                animationDuration={0.4}
                                onAnimationType={'flat'}
                                offAnimationType={'flat'}
                                onValueChange={(newValue) => setSounds(newValue)}
                            />
                            <Text style={{marginLeft:10}}>Indicios de inestabilidad? Woumfs, crujidos o efecto tambor.</Text>
                        </View>
                    </View>  
                    <View style={styles.formGroup}>
                        <View style={styles.checkboxGroup}>
                            <CheckBox
                                value={temperatureChange}
                                style={[ { height: 20, width:  20} ]}
                                boxType={'circle'}
                                animationDuration={0.4}
                                onAnimationType={'flat'}
                                offAnimationType={'flat'}
                                onValueChange={(newValue) => setTemperatureChange(newValue)}
                            />
                            <Text style={{marginLeft:10}}>Subida crítica de la temperatura (temp cercana a 0º).</Text>
                        </View>
                    </View>  
                </View>
                <View style={styles.formContainer} >
                    <View style={styles.spacer}></View>

                    <Text>Otras observaciones:</Text>

                    
                    <View style={styles.inputContainer}>
                        <TextInput
                            value={comments}
                            multiline={true}
                            numberOfLines={4}
                            style={styles.input}
                            placeholder={"1000 characters max"}
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
    }
});

export default QuickObservationTypeDetail;