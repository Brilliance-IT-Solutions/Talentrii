import react,{useState} from 'react'
import CheckBox from '@react-native-community/checkbox';
import { Controller } from "react-hook-form";
import {View,Text} from 'react-native'
import colors from '../../../assets/themes/colors';
import fontFamily from '../../../style/fontFamily';

const Checkbox = ({ 
    control,
    name,label}) => {
    return(
        <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <View style={{flexDirection:'row',alignItems:'center',flex:1}}>
          <View>
        <CheckBox
        disabled={false}
        value={value}
        onValueChange={onChange}
        tintColors={{true : colors.Green , false: colors.Icon}}
        boxType={'square'}
        tintColor={{true : colors.Green , false: colors.Icon}}
      />
      </View>
      <View style={{flex:1}}>
       <Text style={{fontSize:10,color:colors.Black,fontFamily:fontFamily.medium}}>{label}</Text>
       </View>
      </View>
    )}/>
    )
}

export default Checkbox;