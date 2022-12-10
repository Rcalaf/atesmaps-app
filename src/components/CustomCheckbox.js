import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

import CheckBox from '@react-native-community/checkbox';
import {Controller} from 'react-hook-form';
import { AccessControlTranslationFilterSensitiveLog } from '@aws-sdk/client-s3';

const CustomRadioButton = ({
  control,
  name,
  title,
  rules = {},
  data = {},
  disabled=false,
  boxType='circle',
  animationDuration=0.2,
  onAnimationType='flat',
  offAnimationType='flat',
  containerStyle={},
}) => {
  return (
    <Controller
      control={control}
      name={name}
      title={title}
      rules={rules}

      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
      
            <View style={styles.checkboxGroup}>
              <CheckBox style={[ { height: 20, width: 20 } ]}
                disabled={disabled}
                boxType={boxType}
                animationDuration={animationDuration}
                onAnimationType={onAnimationType}
                offAnimationType={offAnimationType}
                value={value}
                checked={value}
                onValueChange={onChange}
              />
              <Text style={{marginLeft:10}}>{title}</Text>
            </View>
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
  checkboxGroup:{
    padding: 10,
    marginRight: 10,
    width: '30%',
    flex:1,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center'
  },
});

export default CustomRadioButton;
