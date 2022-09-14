import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { back } from 'react-native/Libraries/Animated/Easing';

export default function CustomButton(props) {
  const { onPress, title = 'Save', color = 'black' } = props;
  return (
    <Pressable style={{
        // alignItems: 'center',
      //  justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 12,
        //borderRadius: 4,
        elevation: 3,
        backgroundColor: color,
   
      }} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    // alignItems: 'center',
    //justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    marginTop: 15
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});