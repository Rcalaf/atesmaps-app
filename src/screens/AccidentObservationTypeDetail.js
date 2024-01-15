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

const AccidentObservationTypeDetail: () => Node = ({ route, navigation }) => {

const { editingObservation, selectedIndex, setEditingObservation, updateObservations  } = useContext(ObservationContext);
const [ accidentValues, setAccidentValues ] = useState(editingObservation.observationTypes?.accident ? editingObservation.observationTypes?.accident : {status: false, values: {}});
const [inputError, setInputError ] = useState(false);

const { control, handleSubmit, formState: { errors }, getValues, setValue, reset } = useForm({
    //defaultValues: preloadedValues
    defaultValues: {
        activityType: accidentValues.values.activityType ? accidentValues.values.activityType : null,
        customActivityType: accidentValues.values.customActivityType ? accidentValues.values.customActivityType : null,
        numOfPeople: accidentValues.values.numOfPeople ? accidentValues.values.numOfPeople : null,
        numOfBuried: accidentValues.values.numOfBuried ? accidentValues.values.numOfBuried : null,
        numOfPartiallyBuried: accidentValues.values.numOfPartiallyBuried ? accidentValues.values.numOfPartiallyBuried : null,
        numOfInjured: accidentValues.values.numOfInjured ? accidentValues.values.numOfInjured : null,
        numOfSeverlyInjured: accidentValues.values.numOfSeverlyInjured ? accidentValues.values.numOfSeverlyInjured : null,
        numOfDead: accidentValues.values.numOfDead ? accidentValues.values.numOfDead : null,
        // terrainType: accidentValues.values.terrainType ? accidentValues.values.terrainType : null,
        crackDepth: accidentValues.values.crackDepth ? accidentValues.values.crackDepth : null,
        terrainTraps: accidentValues.values.terrainTraps ? accidentValues.values.terrainTraps : null,
        avalancheSize1: accidentValues.values.avalancheSize?.size_1 ? accidentValues.values.avalancheSize?.size_1 : null,
        avalancheSize2: accidentValues.values.avalancheSize?.size_2 ? accidentValues.values.avalancheSize?.size_2 : null,
        avalancheSize3: accidentValues.values.avalancheSize?.size_3 ? accidentValues.values.avalancheSize?.size_3 : null,
        avalancheSize4: accidentValues.values.avalancheSize?.size_4 ? accidentValues.values.avalancheSize?.size_4 : null,
        avalancheSize5: accidentValues.values.avalancheSize?.size_5 ? accidentValues.values.avalancheSize?.size_5 : null,
        comments: accidentValues.values.comments ? accidentValues.values.comments : null,
        contactMe: accidentValues.values.contactMe ? accidentValues.values.contactMe : null,
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
            // console.log(getValues());
            console.log(errors);
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
    console.log('------Accident report---------');
    const values = getValues();

    if( values.activityType == 6 && (values.customActivityType === null || values.customActivityType == "")){
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

        aux['values'].activityType = values.activityType
        aux['values'].customActivityType = values.customActivityType
        aux['values'].numOfPeople = values.numOfPeople
        aux['values'].numOfBuried = values.numOfBuried
        aux['values'].numOfPartiallyBuried = values.numOfPartiallyBuried
        aux['values'].numOfInjured = values.numOfInjured
        aux['values'].numOfSeverlyInjured = values.numOfSeverlyInjured
        aux['values'].numOfDead = values.numOfDead
        aux['values'].terrainType = values.terrainType
        aux['values'].terrainTraps = values.terrainTraps

        aux['values']['avalancheSize'] = {
            'size_1': values.avalancheSize1,
            'size_2': values.avalancheSize2,
            'size_3': values.avalancheSize3,
            'size_4': values.avalancheSize4,
            'size_5': values.avalancheSize5,
        }

        aux['values'].crackDepth = values.crackDepth
        aux['values'].comments = values.comments
        aux['values'].contactMe = values.contactMe
        
        aux.status = true;
    
        setAccidentValues(aux);
        
        let observation = editingObservation;
        observation.observationTypes['accident'] = aux; 
        setEditingObservation({...editingObservation, observationTypes: observation.observationTypes['quick']});
        updateObservations(observation);
        Snackbar.show({
            text: 'Tu observación del accidente se ha guardado.',
            duration: Snackbar.LENGTH_SHORT,
            numberOfLines: 2,
            textColor: "#fff",
            backgroundColor: "#62a256",
        });
        navigation.navigate('Observación',{selectedIndex});
    }
}

const removeData = () => {
    let observation = editingObservation;
    observation.observationTypes['accident'] = {status: false, values: {}}; 
    setEditingObservation({...editingObservation, observationTypes: observation.observationTypes['accident']});
    updateObservations(observation);
    
    Snackbar.show({
        text: 'Tu observación de accidente se ha eliminado.',
        duration: Snackbar.LENGTH_SHORT,
        numberOfLines: 2,
        textColor: "#fff",
        backgroundColor: "#B00020",
    });
    navigation.navigate('Observación',{selectedIndex});
}


//Activity options:
const activityData = [
    {label: 'Esquí de montaña/splitboard'},
    {label: 'Freeride'},
    {label: 'Escalada/alpinismo'},
    {label: 'Raquetas de nieve'},
    {label: 'Trekking'},
    {label: 'Otra'},
];

// Terrain options
const terrainOptionsData = [
    {label: 'Convexo: un puente'},
    {label: 'Cóncavo: forma de cuenco'},
    {label: 'Planar: liso sin convexidades o concavidades significativas'},
    {label: 'Sin apoyo: una pendiente que cae abruptamente en la parte inferior'},
];

const terrainTrapOptions = [
    {label: 'Sin apariencia'},
    {label: 'Cortado/zanja'},
    {label: 'Desnivel/cambio de pendiente'},
    {label: 'Árboles'},
    {label: 'Barranco'},
]



return(
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
        <ScrollView >
            <View style={styles.container}>
                <View style={styles.introContainer} >
                    <Text style={styles.intro}>Has provocado o presenciado un accidente de alud? Aqui puedes dar algunos datos al respecto. 
                    La informacion que introduzcas se guardará en la base de datos de Atesmaps,
                     así como en la de ACNA (Asociació pel Coneixement de la Neu i les Allaus), 
                     la del ICGC (Cataluña), el CENMA (Andorra) y el CLA (Val d’Aran).</Text> 
                    <Text style={styles.introSubtext}>* campos obligatorios</Text>
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
                <Text>Información sobre el grupo y los afectados:</Text>
                <View style={styles.spacer}></View>
                    <View style={[styles.inputGroup, {flexDirection:'row'}]}>
                        <CustomInput
                            name="numOfPeople"
                            placeholder="Num. personas en el grupo"
                            control={control}
                            customStyles={{width:"100%",marginRight: 15}}
                            //   rules={{required: 'Email is required'}}
                            // onPress={showDatepicker}
                            />
                    </View> 
                    <View style={styles.inputGroup}>
                        <CustomInput
                            name="numOfPartiallyBuried"
                            placeholder="Num. personas parcialmente enterradas"
                            control={control}
                            customStyles={{width:"100%"}}
                            //   rules={{required: 'Email is required'}}
                            // onPress={showDatepicker}
                            />
                    </View> 
                    <View style={styles.inputGroup}>
                        <CustomInput
                            name="numOfBuried"
                            placeholder="Num. personas totalmente enterradas"
                            control={control}
                            customStyles={{width:"100%"}}
                            //   rules={{required: 'Email is required'}}
                            // onPress={showDatepicker}
                            />
                    </View> 
                    <View style={styles.inputGroup}>
                        <CustomInput
                            name="numOfInjured"
                            placeholder="Num. personas con lesiones leves"
                            control={control}
                            customStyles={{width:"100%"}}
                            //   rules={{required: 'Email is required'}}
                            // onPress={showDatepicker}
                            />
                    </View> 
                    <View style={styles.inputGroup}>
                        <CustomInput
                            name="numOfSeverlyInjured"
                            placeholder="Num. personas con lesiones graves"
                            control={control}
                            customStyles={{width:"100%"}}
                            //   rules={{required: 'Email is required'}}
                            // onPress={showDatepicker}
                            />
                    </View> 
                    <View style={styles.inputGroup}>
                        <CustomInput
                            name="numOfDead"
                            placeholder="Num. de fallecidos"
                            control={control}
                            customStyles={{width:"100%"}}
                            //   rules={{required: 'Email is required'}}
                            // onPress={showDatepicker}
                            />
                    </View> 
                </View>

                <View style={styles.formContainer} >
                <Text>Profundidad de la cicatriz:</Text>
                <View style={styles.spacer}></View>
                <CustomInput
                    name="crackDepth"
                    placeholder="(cm)"
                    control={control}
                    customStyles={{width:"100%"}}
                    // rules={{required: 'Email is required'}}
                    // onPress={showDatepicker}
                    />
                </View> 
                {/* <View style={styles.formContainer} >
                    <View style={styles.spacer}/>
                    <CustomRadioButton 
                        name="terrainType"
                        title="Morfología del terreno en la zona de salida:"
                        control={control}
                        data={terrainOptionsData}
                        // rules={{required: 'Campo obligatorio'}}
                        box={false}
                        textColor={'black'}
                        circleSize={14}
                    />
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

                    
                    <Text>Tamaño alud:</Text>
                    <View style={styles.formGroup}>
                        <CustomCheckbox name="avalancheSize1"
                                        title="1-Peligro de enterramiento mínimo (peligro de caída)" 
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                    </View>
                    <View style={styles.formGroup}>
                        <CustomCheckbox name="avalancheSize2" 
                                        title="2-Puede enterrar, herir o matar a una persona"
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                    </View> 

                    <View style={styles.formGroup}>
                        <CustomCheckbox name="avalancheSize3"
                                        title="3-Puede enterrar o destruir un coche" 
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                    </View>
                    <View style={styles.formGroup}>
                        <CustomCheckbox name="avalancheSize4" 
                                        title="4-Puede enterrar o destruir un vagon de tren"
                                        control={control}  
                                        // rules={{required: 'Campo obligatorio'}}
                        />
                    </View> 
                    <View style={styles.formGroup}>
                        <CustomCheckbox name="avalancheSize5"
                                        title="5-Puede modificar el paisaje, possibilidad de daños desastrosos" 
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
                    <View style={styles.spacer}/>
                     <CustomRadioButton 
                        name="terrainTraps"
                        title="Trampas del terreno:"
                        control={control}
                        data={terrainTrapOptions}
                        // rules={{required: 'Campo obligatorio'}}
                        box={false}
                        textColor={'black'}
                        circleSize={14}
                    />

                </View>
                <View style={styles.spacer}></View>
               
               
                <View style={styles.formContainer} >
                    
                    <Text>Otras observaciones:</Text>
                
                    <CustomInput
                        name="comments"
                        control={control}
                        multiline={true}
                        numberOfLines={4}
                        customStyles={[styles.inputContainer, {height: '20%'}]}
                        placeholder="1000 letras max"
                        />
                       <View style={{width:'100%',flexDirection: 'row'}}>
                            <CustomCheckbox name="contactMe" 
                                            title="Marcar si quieres ser contactado para aportar más información sobre el accidente. Añade un método de contacto en observaciones."
                                            control={control}  
                                            // customStyles={styles.inputContainer}
                                            // rules={{required: 'Campo obligatorio'}}
                            />
                      </View> 
                      <Text>Los datos de contacto se tratarán con confidencialidad y solo con la finalidad de contactar con los/las implicados/as para el registro y estudio posterior de los aludes. </Text>

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
        textAlign: 'left'
    },
    introSubtext:{
        color: 'gray',
        fontSize:12,
        paddingLeft:5,
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

export default AccidentObservationTypeDetail;