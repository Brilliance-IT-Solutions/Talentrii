import React from "react";
import { TextInput, View, Text, TouchableOpacity } from "react-native";
import styles from "../../../style/styles";
import { Controller } from "react-hook-form";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import colors from "../../../assets/themes/colors";
import Label from "../label/label";
import fontFamily from "../../../style/fontFamily";

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
    showPassword,
    label,
    style,
  }) => {

    return (
        <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
            <View>
              {label && <Label title={label}></Label>}
              {/* asterisk={error &&  (error?.message ||  STRINGS?.ERROR) && 'error'} */}
              <View style={{flexDirection:'row',alignItems:'center'}}>
              {icon && <View style={{position:'absolute',left:25,zIndex:1}}>
              <Icon name={icon} size={15} color={colors.Icon}/>
              </View>}
              <TextInput
                style={[styles.textBoxes, styles.leftStandardPadding, {flex:1,position:'relative',paddingLeft:icon ? 30 : 20},
                multiline ? {height: 120} : {height:50},style ]}
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
             {showPassword ? <Icon name={'eye-off'} size={15} color={colors.Icon}/> :
              <Icon name={'eye'} size={15} color={colors.Icon}/>}
              </View>

             </TouchableOpacity>
          }           
             </View>
             {error && (
            <Text style={[ styles.leftStandardPadding,{
                color: 'red',
                alignSelf: 'stretch',
                marginHorizontal: 18,
                fontSize:11,
                fontFamily:fontFamily.medium
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