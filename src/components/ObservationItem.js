import React, {useContext} from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';

import {ObservationContext } from '../context/ObservationContext';

export default function Item({ item, index,  navigation  }) {
    const {setSelectedIndex, updateSelectedIndex} = useContext(ObservationContext);
    // console.log(item);

    const status = () => {
      if (item.status == 0) {
        return (
          <View style={styles.itemStatus}>
            <Text style={{fontSize:10, textAlign: 'center', color: 'white'}}>{'Borrador'}</Text>
          </View>
        )
      }
      if (item.status == 1) {
        return (
          <View style={[styles.itemStatus,{backgroundColor:"#62a256"}]}>
            <Text style={{fontSize:10, textAlign: 'center', color: 'white'}}>{ 'Enviadas'}</Text>
          </View>
        )
      }
    }

    const button = () => {
     if (item.status == 0) {
      return (
        <TouchableOpacity 
            style={{height:50,width:50, justifyContent:"center",alignItems:"center"}}
            onPress={() => {
              if(item.status > 0){
                navigation.navigate('Detalles',{item});
              }else{
                updateSelectedIndex(index);
                // setSelectedIndex(index);
                 navigation.navigate('Observación',{item, index});
              }
            }}
        > 
     
          {/* <Text style={{color:"green"}}>Edit</Text> */}
          <MaterialIcons name='arrow-forward-ios' size={20} color="#333" style={{marginRight: 5}}/>
        </TouchableOpacity>
        );
      }
    }

    return (
      <>
      <View style={styles.listItem}>
       {/* <Image source={{uri:item.photo}}  style={{width:60, height:60,borderRadius:30, marginRight: 10}} /> */}
        <View style={{marginTop:5,marginBottom: (item.status > 0 ? 5 : 0), alignItems:"flex-start",flex:1}}>
          <Text style={{fontWeight:"bold"}}>{item.title}</Text>
          <Text style={{ marginTop: (item.status > 0 ? 5 : 0)}}>{moment(item.date).format('Do MMMM YYYY')}</Text>
         
        </View>
    
        {button()}
       
      </View>
      {status()}
      {/* <View style={styles.itemStatus}>
        <Text style={{fontSize:10, textAlign: 'center', color: 'white'}}>{item.status == 0 ? 'Drafts' : null}</Text>
      </View> */}
      </>
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
    },
    itemStatus: {
      backgroundColor:"red",
      margin:5, 
      alignSelf:"center",
      alignContent: 'center',
      bottom: 0, 
      width:'90%', 
      position:'absolute',
      borderBottomRightRadius:5,
      borderBottomLeftRadius:5
    }
  });