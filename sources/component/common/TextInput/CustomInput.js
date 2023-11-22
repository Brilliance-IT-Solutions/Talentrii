import React from "react";
import { TextInput, View, Text } from "react-native";
import colors from "../../../assets/themes/colors";
import styles from "../../../style/styles";
import { Controller } from "react-hook-form";

const CustomInput = ({
    control,
    name,
    placeholder,
    rules = {},
    multiline = false,
    secureTextEntry,
  }) => {

    return (
        <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
            <View>
            <TextInput
                style={[styles.textBoxes, styles.leftStandardPadding, 
                multiline ? {height: 120} : {height:50} ]}
                value={value}
                secureTextEntry={ secureTextEntry}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                multiline={multiline}
            ></TextInput>  
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
        // <View>
        //     <TextInput
        //         style={[styles.textBoxes, styles.leftStandardPadding, 
        //             props.needMultilie ? {height: 120} : {height:50} ]}
        //         value={props.value}
        //         secureTextEntry={props.isSecuredText ? true : false}
        //         onChangeText={props.onChangeText}
        //         placeholder={props.placeholder}
        //         maxLength={props.maxLength}
        //         multiline = {props.needMultilie ? true : false }
        //         numberOfLines= {props.noLines || 1}
                
        //     ></TextInput>                
        //        {
        //            props.error && <Text
        //             style={[
        //                 { color: colors.Red, fontSize: 12, marginLeft: 40}
        //             ]}>{props.error}</Text>
        //         }
        // </View>

    )
};
export default CustomInput;