import {View,Image, TextInput, StyleSheet,TouchableOpacity} from 'react-native' 
import DateTimePicker from '@react-native-community/datetimepicker';
import React from "react";
import {useState} from 'react'
import { IMAGES } from '../../../constants/images';
import colors from '../../../assets/themes/colors';

const EndDate = (props) =>{
  const handleEvent = () => {
    const eventValue = false;   
    props.updateParent(eventValue);
  };
    const [date, setDate] = useState(new Date());

    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate;
      setShow(false);
      setDate(currentDate);
      props.onChange(currentDate)
    };
  
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
      showMode('date');
    };

 
  
   return(
    <View style={styles.container}>
      <Image source={IMAGES.CALENDER_ICON} style={{marginVertical:6}}/> 
      <View style={{flex:6,marginLeft:15.5,marginRight:9.5}}>
      <TextInput  inputMode='none' placeholder='Choose Date' value={date.toLocaleDateString()}  onPressOut={showDatepicker}  style={styles.inputBox}/>
      </View>
      {show && (
        <DateTimePicker
          testID='date'
          value={date}
          mode={mode}
          onChange={onChange}
          minimumDate={props.minimumDate}
        />
      )}
      <TouchableOpacity onPress={handleEvent}><Image source={IMAGES.DELETE_ICON} style={{marginVertical:12}}/></TouchableOpacity>
    </View>
   )
}

const styles =  StyleSheet.create({
    container:{
      flex:1,
      flexDirection:'row',
      marginHorizontal:30, 
      marginVertical: 10
    },
    inputBox:{
      borderWidth: 0.8,
      borderColor: colors.lightGrey,
      borderRadius:10,
      height:50,
      paddingHorizontal:16,
      fontSize:16
    }
})

export default EndDate;