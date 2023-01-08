import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {Controller} from 'react-hook-form';

const CustomInput = ({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
  multiline=false,
  numberOfLines=1,
  keyboardType='default',
  onPress,
  customStyles={}
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}

      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
          <View
            style={[
              styles.container,
              customStyles,
              {borderColor: error ? 'red' : '#e8e8e8'},
            ]}
          >
            <TextInput
              value={value}
              keyboardType={keyboardType}
              onChangeText={onChange}
              onBlur={onBlur}
              onFocus={onPress}
              multiline={multiline}
              numberOfLines={numberOfLines}
              placeholder={placeholder}
              style={[styles.input ]}
              secureTextEntry={secureTextEntry} 
              placeholderTextColor="#000" 
            />
          </View>
          {error && (
            <Text style={{color: 'red', alignSelf: 'stretch'}}>{error.message || 'Error'}</Text>
          )}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
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
    paddingTop: 10,
    paddingBottom: 10,
  },
});

export default CustomInput;
