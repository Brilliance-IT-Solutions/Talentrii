import DateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';
import { Controller } from 'react-hook-form';
import {TouchableOpacity, View ,Text} from 'react-native';
import colors from '../../../assets/themes/colors';
import Label from '../label/label';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import fontFamily from '../../../style/fontFamily';

var maximumDate = new Date();

const TimePicker = ({
  control,
  name,
  value,
  onPress,
  mode = 'time',
  label,
  style,
  styleIcon,
  iconColor,
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
      // rules={rules}
      defaultValue={maximumDate}
      render={({
        field: { value, onChange },
        fieldState: { error },
      }) => (
        <View>
            <Label title={label} style={{marginLeft:0}}></Label>
           
           <TouchableOpacity
            onPress={()=> onPress(!isVisible)}
            style={[{padding:10,borderWidth:1,borderRadius:5,borderColor:colors.searchborder,elevation:0.5},style]}
            >
             <View style={{flexDirection:'row',alignItems:'center'}}>
              <Icon name={'clock-time-four-outline'} size={15} color={iconColor}/>
             {!value ? <Text style={{fontSize:10,fontFamily:fontFamily.regular}}>select date</Text> :
              <Text style={{fontSize:10,color:styleIcon,fontFamily:fontFamily.regular}}>{value.toLocaleTimeString()}</Text> }  
              <View style={{position:'absolute',right:0}}>
              <Icon name={'menu-down'} size={15} color={styleIcon}/></View>   
             </View>
            </TouchableOpacity>

            { isVisible && (
              <DateTimePicker
              testID='date'
              value={value || new Date()}
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
              fontSize:11,
              fontFamily:fontFamily.regular
            }}>
              {error.message}
            </Text>
          )}
        </View>
      )}
    />
  );
};

export default TimePicker;
