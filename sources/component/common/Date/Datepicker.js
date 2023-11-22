//import libraries
import DateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';
import { Controller } from 'react-hook-form';
import {TouchableOpacity, View ,Image,TextInput} from 'react-native';
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
          
            <Image source={IMAGES.CALENDER_ICON} style={{marginVertical:6}}/> 
      <View style={{flex:6,marginLeft:15.5,marginRight:9.5}}>
      <TextInput  inputMode='none' placeholder='Choose Date' value={value?.toLocaleDateString()} onPressOut={() => onPress(!isVisible)}  style={{ borderWidth: 0.8,
      borderColor: colors.lightGrey,
      borderRadius:10,
      height:50,
      paddingHorizontal:16,
      fontSize:16}}/>
      </View>
           
            { isVisible && (
              <DateTimePicker
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
