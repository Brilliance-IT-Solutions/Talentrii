import react,{useState} from 'react'
import CheckBox from '@react-native-community/checkbox';
import { Controller } from "react-hook-form";
import {View,Text} from 'react-native'
import colors from '../../../assets/themes/colors';

const Checkbox = ({ 
    control,
    name,}) => {
    return(
        <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <View style={{flexDirection:'row',marginHorizontal:15}}>
        <View>
        <CheckBox
        disabled={false}
        value={value}
        onValueChange={onChange}
        tintColors={{true : colors.Green , false: colors.Grey}}
      />
      </View>
      <View style={{paddingHorizontal:14,flex:1,marginVertical:5}}>
       <Text style={{fontSize:10,color:colors.Black}}>{'By Creating An Account You Agree To Our General Terms & Conditions'}</Text>
       </View>
      </View>
    )}/>
    )
}

export default Checkbox;