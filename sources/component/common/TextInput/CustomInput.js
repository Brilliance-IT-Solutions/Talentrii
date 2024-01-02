import React from "react";
import { TextInput, View, Text, TouchableOpacity } from "react-native";
import styles from "../../../style/styles";
import { Controller } from "react-hook-form";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const CustomInput = ({
    control,
    name,
    placeholder,
    rules = {},
    icon,
    multiline = false,
    secureTextEntry = false,
    maxLength=30,
    onPressIcon,
    showPassword
  }) => {

    return (
        <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
            <View>
              <View style={{flexDirection:'row',alignItems:'center'}}>
              <View style={{position:'absolute',left:25,zIndex:1}}>
              <Icon name={icon} size={15} color={'#9EA3A8'}/>
              </View>
              <TextInput
                style={[styles.textBoxes, styles.leftStandardPadding, {flex:1,position:'relative',paddingLeft:30},
                multiline ? {height: 120} : {height:50} ]}
                value={value}
                secureTextEntry={secureTextEntry}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                multiline={multiline}
                maxLength={maxLength}
            ></TextInput>  
           {!!onPressIcon &&
              <TouchableOpacity style={{marginBottom:20}} onPress={onPressIcon} hitSlop={{ top: 20, bottom: 20, left: 30, right: 20 }}>

             <View style={{position:'absolute',right:35}}>
             {showPassword ? <Icon name={'eye-off'} size={15} color={'#9EA3A8'}/> :
              <Icon name={'eye'} size={15} color={'#9EA3A8'}/>}
              </View>

             </TouchableOpacity>
          }           
             </View>
             {error && (
            <Text style={[ styles.leftStandardPadding,{
                color: 'red',
                alignSelf: 'stretch',
                marginHorizontal: 30,
              } ,]}>
              {error.message || STRINGS.ERROR}
            </Text>
          )}                    
        </View>
        )}
        />

    )
};
export default CustomInput;