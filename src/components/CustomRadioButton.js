import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native';
import {Controller} from 'react-hook-form';

const CustomRadioButton = ({
  control,
  name,
  title,
  rules = {},
  data = {},
  box=false,
  textColor='black',
  circleSize=14,
  containerStyle={},
  secureTextEntry,
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
              { borderColor: error ? 'red' : 'none',
                borderWidth:  error ? 1 : 0,
                borderRadius: error ? 5 : 0,
                padding: error ? 5 : 0
              },containerStyle
            ]}
          >

          <Text>{title}</Text>
          <RadioButtonRN
              textColor={textColor}
              circleSize={circleSize}
              data={data}
              initial={value ? value : null}
              box={box}
              selectedBtn={(e) => {
                  onChange(data.map(object => object.label).indexOf(e.label)+1);
              }}
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
    width: '100%',
    borderColor: 'none',
    marginVertical: 5,
  },
  input: {
    borderColor: "gray",
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10,
  },
});

export default CustomRadioButton;
