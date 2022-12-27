import React, {useContext} from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';

export default function ImageItem({ item, index, deleteItem, navigation  }) {
    //const {setSelectedIndex, updateSelectedIndex} = useContext(ObservationContext);
    // console.log(item);
    return (
      <View style={styles.imageListItem}>
        {/* <Image source={{uri:`${path}/${directory}/${item}`}} style={{height:250,borderRadius:5, marginRight: 10,alignItems:"flex-start",flex:1}} />  */}
        <Image source={{uri:item.path}} style={{height:250,borderRadius:5, marginRight: 10,alignItems:"flex-start",flex:1}} /> 
        <TouchableOpacity 
            style={{justifyContent:"center",alignItems:"center"}}
            onPress={() => {
              deleteItem(index);
            }}
        >
          <Text style={{color:'#B00020'}}>Borrar</Text>
          {/* <MaterialIcons name='arrow-forward-ios' size={20} color="#333" style={{marginRight: 5}}/> */}
        </TouchableOpacity>
      </View>
    );
  }

  const styles = StyleSheet.create({
    imageListItem:{
      margin:5,
      padding:10,
      backgroundColor:"#FFF",
      flex:1,
      flexDirection:"row",
      borderRadius:5
    }
  });