import DateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';
import { Controller } from 'react-hook-form';
import {TouchableOpacity, View ,Text} from 'react-native';
import colors from '../../../assets/themes/colors';
import Label from '../label/label';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import fontFamily from '../../../style/fontFamily';

var maximumDate = new Date();

const DatePickerComponent = ({
  control,
  name,
  onPress,
  mode = 'date',
  label,
  style,
  styleIcon,
  iconColor,
  // selectedDate = new Date(),
  isVisible = false,
}) => {

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' }); // Use short month name
    const year = date.getFullYear();
    
    const formattedDate = `${day} ${month}, ${year}`;
    return formattedDate.toString()
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
              <Icon name={'calendar-blank'} size={15} color={iconColor}/>
             {!value ? <Text style={{fontSize:10,fontFamily:fontFamily.regular}}>select date</Text> :
              <Text style={{fontSize:10,color:styleIcon,fontFamily:fontFamily.regular,paddingTop:2,paddingLeft:2}}>{formatDate(value)}</Text> }  
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
              fontFamily:fontFamily.medium
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
