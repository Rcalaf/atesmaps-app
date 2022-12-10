import React, {useContext} from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';

export default function ImageItem({ item, index,  navigation  }) {
    //const {setSelectedIndex, updateSelectedIndex} = useContext(ObservationContext);
    //console.log(item);
    return (
      <View style={styles.imageListItem}>
        <Image source={{uri:item.photo}}  style={{width:60, height:60,borderRadius:30, marginRight: 10}} /> 
        <View style={{marginTop:10,alignItems:"flex-start",flex:1}}>
          <Text style={{fontWeight:"bold"}}>{item.title}</Text>
          <Text>{moment(item.date).format('Do MMMM YYYY')}</Text>
          <Text>{item.status == 0 ? 'Draft' : ''}</Text>
        </View>
        {/* <TouchableOpacity 
            style={{height:50,width:50, justifyContent:"center",alignItems:"center"}}
            onPress={() => {
              updateSelectedIndex(index);
             // setSelectedIndex(index);
              navigation.navigate('Observación',{item, index});
            }}
        >
      
          <MaterialIcons name='arrow-forward-ios' size={20} color="#333" style={{marginRight: 5}}/>
        </TouchableOpacity> */}
      </View>
    );
  }

  const styles = StyleSheet.create({
    imageListItem:{
      margin:5,
      padding:10,
      backgroundColor:"#FFF",
      width:"20%",
      flex:1,
      alignSelf:"center",
      flexDirection:"row",
      borderRadius:5
    }
  });