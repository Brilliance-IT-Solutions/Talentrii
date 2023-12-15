//import libraries
import DateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';
import { Controller } from 'react-hook-form';
import {TouchableOpacity, View ,Image,TextInput,Text} from 'react-native';
import { IMAGES } from '../../../constants/images';
import styles from '../../../style/styles';
import colors from '../../../assets/themes/colors';

var maximumDate = new Date();

// create a component
const DatePickerComponent = ({
  label,
  control,
  name,
  rules = {},
  inputStyle,
  icon,
  style,
  onPress,
  mode = 'date',
  // selectedDate = new Date(),
  isVisible = false,
}) => {

  const formatDate = (utcString, format = 'dd/mm/yyyy') => {
    if (!utcString) {
        return ''
    }
    var local = new Date(utcString);
    return local.toJSON().slice(0, 10);
  };



  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={maximumDate}
      render={({
        field: { value, onChange },
        fieldState: { error },
      }) => (
        <View style={{   
            flex:1,
            flexDirection:'row',
            marginHorizontal:25, 
            marginVertical: 10}} >
          
      <Image source={IMAGES.CALENDER_ICON} style={{marginVertical:6,marginLeft:6}}/> 
      <View style={{flex:6,marginLeft:12,marginRight:5}}>
      <TextInput  inputMode='none' placeholder='Choose Date' value={formatDate(value)} onPressOut={() => onPress(!isVisible)}  style={{ borderWidth: 0.8,
      borderColor: colors.lightGrey,
      borderRadius:10,
      height:50,
      paddingHorizontal:16,
      fontSize:16}}/>
      </View>
           
            { isVisible && (
              <DateTimePicker
              testID='date'
              value={new Date(value)}
                mode={mode}
                is24Hour={false}
                onChange={d => {
                  if (d.type === 'set') {
                    onPress(false);
                    onChange(new Date(d.nativeEvent.timestamp));
                    return;
                  }
                  onPress(false);
                }}
                maximumDate={maximumDate}
              />
             )} 
        
        {error && (
            <Text style={{
              color: 'red',
              alignSelf: 'stretch',
            
            }}>
              {error.message}
            </Text>
          )}
        </View>
      )}
    />
  );
};

export default DatePickerComponent;
