import {View, StyleSheet,TouchableOpacity} from 'react-native' 
import DateTimePicker from '@react-native-community/datetimepicker';
import React from "react";
import {useState} from 'react'
import {TextInput,Image} from 'react-native'
import { IMAGES } from '../../../constants/images';
import colors from '../../../assets/themes/colors';

const Time = (props) =>{
    const [time, setTime] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
  
    const onChange = (event, selectedDate) => {
      const currentTime = selectedDate || time;
      setShow(false);
      setTime(currentTime);
      props.onChange(currentTime)
    };
  
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
  
    const showTimepicker = () => {
      showMode('time');
    };

    const handleEvent = () => {
      const eventValue = false;   
      props.updateParent(eventValue);
    };
    

   return(
    <View style={styles.container}>
    <Image source={IMAGES.CALENDER_ICON} style={{marginVertical:6}}/> 
    <View  style={{flex:6,marginLeft:15.5,marginRight:9.5}}>
      <TextInput inputMode='none' placeholder='Choose Time' value={time.toLocaleTimeString()} onPressOut={showTimepicker}  style={styles.inputbox}/>
      </View>
      {show && (
        <DateTimePicker
        testID='time'
          value={time}
          mode={mode}
          onChange={onChange}
         style={{color:'blue'}}
        />
      )}
      <TouchableOpacity onPress={handleEvent}><Image source={IMAGES.DELETE_ICON} style={{marginVertical:12}}/></TouchableOpacity>
    </View>
   )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'row',
    marginHorizontal:30,
    marginVertical: 10
  },
  inputbox:{
    borderWidth: 0.8,
    borderColor: colors.lightGrey,
    borderRadius:10,
    height:50,
    paddingHorizontal:16,
    fontSize:16
  }
})

export default Time;