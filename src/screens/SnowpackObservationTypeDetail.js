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

const SnowpackObservationTypeDetail: () => Node = () => {
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

//Riding conditions:
const [ridingQuality, setRidingQuality] = useState(quickValues.values?.ridingQuality);
useEffect(()=>{
    let conditions = quickValues;
    conditions.values['ridingQuality'] = ridingQuality
    //conditions.status = true;
    setQuickValues(conditions);
   // console.log('Riding quality triggered...');
},[ridingQuality]);

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
const [rodeConvex, setRodeConvex] = useState(quickValues.values?.rodeSlopeTypes?.convex);
const [rodeDense, setRodeDense] = useState(quickValues.values?.rodeSlopeTypes?.dense);
const [rodeSteep, setRodeSteep] = useState(quickValues.values?.rodeSlopeTypes?.steep);
const [rodeOpen, setRodeOpen] = useState(quickValues.values?.rodeSlopeTypes?.openTrees);
const [rodeCut, setRodeCut] = useState(quickValues.values?.rodeSlopeTypes?.cut);
const [rodeSunny, setRodeSunny] = useState(quickValues.values?.rodeSlopeTypes?.sunnys);

useEffect(()=>{
    let conditions = quickValues;
    conditions.values['rodeSlopeTypes'] = {
        'mellow': rodeMellow,
        'alpine': rodeAlpine,
        'convex': rodeConvex,
        'dense': rodeDense,
        'steep':rodeSteep,
        'openTrees': rodeOpen,
        'cut': rodeCut,
        'sunny': rodeSunny
    }
    conditions.status = true;
    setQuickValues(conditions);
     
    // console.log(quickValues);
},[rodeMellow,rodeAlpine,rodeConvex,rodeDense,rodeSteep,rodeOpen,rodeCut,rodeSunny]);

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

const data = [
    {label: 'Amazing'},
    {label: 'Good'},
    {label: 'Ok'},
    {label: 'Terrible'},
    ];


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
                    <Text>Riding quality was:</Text>
                        <RadioButtonRN
                            textColor={'black'}
                            circleSize={14}
                            data={data}
                            initial={ridingQuality ? ridingQuality : null}
                            box={false}
                            selectedBtn={(e) => {
                                // console.log(data.map(object => object.label).indexOf(e.label));
                                //console.log(e.label)
                                setRidingQuality(data.map(object => object.label).indexOf(e.label)+1);
                            }}
                            />
                </View>
                
                <View style={styles.formContainer} >
                    <View style={styles.spacer}></View>

                    <Text>Snow conditions were:</Text>

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
      
                            <Text style={{marginLeft:10}}>Deep Powder</Text>
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
                            <Text style={{marginLeft:10}}>Wet</Text>
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
                            <Text style={{marginLeft:10}}>Crusty</Text>
                        </View>
                        <View style={styles.checkboxGroup}>
                            <CheckBox
                           style={[ { height: 20, width: 20 } ]}
                           disabled={false}
                           boxType={'circle'}
                           animationDuration={0.2}
                           onAnimationType={'flat'}
                           offAnimationType={'flat'}
                           value={powder}
                           onValueChange={(newValue) => setPowder(newValue)}
                            />
                            <Text style={{marginLeft:10}}>Powder</Text>
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
                            <Text style={{marginLeft:10}}>Heavy</Text>
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
                            <Text style={{marginLeft:10}}>Wind Affected</Text>
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
                           value={hard}
                           onValueChange={(newValue) => setHard(newValue)}
                            />
                            <Text style={{marginLeft:10}}>Hard</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.formContainer} >
                    <View style={styles.spacer}></View>

                    <Text>We rode:</Text>

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
      
                            <Text style={{marginLeft:10}}>Mellow slopes</Text>
                        </View>
                        <View style={styles.checkboxGroup}> 
                            <CheckBox
                            style={[ { height: 20, width: 20 } ]}
                            disabled={false}
                            boxType={'circle'}
                            animationDuration={0.2}
                            onAnimationType={'flat'}
                            offAnimationType={'flat'}
                            value={rodeConvex}
                            onValueChange={(newValue) => setRodeConvex(newValue)}
                            />
                            <Text style={{marginLeft:10}}>Convex slopes</Text>
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
                            value={rodeAlpine}
                            onValueChange={(newValue) => setRodeAlpine(newValue)}

                            />
                            <Text style={{marginLeft:10}}>Alpine slopes</Text>
                        </View>
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
                            <Text style={{marginLeft:10}}>Dense slopes</Text>
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
                          value={rodeSteep}
                          onValueChange={(newValue) => setRodeSteep(newValue)}
                            />
                            <Text style={{marginLeft:10}}>Steep slopes</Text>
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
                            <Text style={{marginLeft:10}}>Open trees</Text>
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
                          value={rodeCut}
                          onValueChange={(newValue) => setRodeCut(newValue)}
                            />
                            <Text style={{marginLeft:10}}>Cut blocks</Text>
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
                            <Text style={{marginLeft:10}}>Suny slopes</Text>
                        </View> 
                    </View>
                </View>
                <View style={styles.formContainer} >
                    <View style={styles.spacer}></View>

                    <Text>We stayed away from:</Text>
  
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
                            <Text style={{marginLeft:10}}>Alpine slopes</Text>
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
                            <Text style={{marginLeft:10}}>Dense slopes</Text>
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
                            <Text style={{marginLeft:10}}>Steep slopes</Text>
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
                            <Text style={{marginLeft:10}}>Open trees</Text>
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
                            <Text style={{marginLeft:10}}>Cut blocks</Text>
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
                            <Text style={{marginLeft:10}}>Suny slopes</Text>
                        </View> 
                    </View>
                </View>
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
      
                            <Text style={{marginLeft:10}}>Warm</Text>
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
                            <Text style={{marginLeft:10}}>Cloudy</Text>
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
                            <Text style={{marginLeft:10}}>Stormy</Text>
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
                            <Text style={{marginLeft:10}}>Windy</Text>
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
                            <Text style={{marginLeft:10}}>Cold</Text>
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
                            <Text style={{marginLeft:10}}>Wet</Text>
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
                            <Text style={{marginLeft:10}}>Sunny</Text>
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
                            <Text style={{marginLeft:10}}>30cm + of new snow, or significant drifting, or rain in the last 48 hours.</Text>
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
                            <Text style={{marginLeft:10}}>Slab avalanches today or yesterday.</Text>
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
                            <Text style={{marginLeft:10}}>Whumpfing or drum-like sounds or shooting cracks.</Text>
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
                            <Text style={{marginLeft:10}}>Rapid temperature rise to near zero degrees or wet surface snow.</Text>
                        </View>
                    </View>  
                </View>
                <View style={styles.formContainer} >
                    <View style={styles.spacer}></View>

                    <Text>Other comments:</Text>

                    
                    <View style={styles.inputContainer}>
                        <TextInput
                            value={comments}
                            multiline={true}
                            numberOfLines={4}
                            style={styles.input}
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

export default SnowpackObservationTypeDetail;