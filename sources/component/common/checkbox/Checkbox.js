import react,{useState} from 'react'
import CheckBox from '@react-native-community/checkbox';
import { Controller } from "react-hook-form";
import {View,Text} from 'react-native'
import colors from '../../../assets/themes/colors';
import fontFamily from '../../../style/fontFamily';
import styles from "../../../style/styles";

const Checkbox = ({ 
    control,
    name,label,rules}) => {
    return(
        <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <View style={{flex:1}}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
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
          {error && (
            <Text style={[{
                color: 'red',
                alignSelf: 'stretch',
                marginHorizontal: 10,
                fontSize:10,
                // flex:1,
                fontFamily:fontFamily.medium
              }]}>
              {error.message || STRINGS.ERROR}
            </Text>
          )}  
          </View>
    )}/>
    )
}

export default Checkbox;