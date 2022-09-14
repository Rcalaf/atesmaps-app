import React, {useContext} from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';

import {ObservationContext } from '../context/ObservationContext';

export default function Item({ item, index,  navigation  }) {
    const {setSelectedIndex, updateSelectedIndex} = useContext(ObservationContext);
    return (
      <View style={styles.listItem}>
       {/* <Image source={{uri:item.photo}}  style={{width:60, height:60,borderRadius:30, marginRight: 10}} /> */}
        <View style={{marginTop:10,alignItems:"flex-start",flex:1}}>
          <Text style={{fontWeight:"bold"}}>{item.title}</Text>
          <Text>{moment(item.date).format('Do MMMM YYYY')}</Text>
          
        </View>
        <TouchableOpacity 
            style={{height:50,width:50, justifyContent:"center",alignItems:"center"}}
            onPress={() => {
              updateSelectedIndex(index);
             // setSelectedIndex(index);
              navigation.navigate('Observación',{item, index});
            }}
        >
          {/* <Text style={{color:"green"}}>Edit</Text> */}
          <MaterialIcons name='chevron-right' size={20} color="#333" style={{marginRight: 5}}/>
        </TouchableOpacity>
      </View>
    );
  }

  const styles = StyleSheet.create({
    listItem:{
      margin:5,
      padding:10,
      backgroundColor:"#FFF",
      width:"90%",
      flex:1,
      alignSelf:"center",
      flexDirection:"row",
      borderRadius:5
    }
  });