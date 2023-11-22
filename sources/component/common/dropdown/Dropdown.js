import React from "react";
import { TextInput, View, Text } from "react-native";
import colors from "../../../assets/themes/colors";
import styles from "../../../style/styles";
import { Controller } from "react-hook-form";
import { Dropdown } from 'react-native-element-dropdown';

const DropDown = ({
    dropdownData = [
      { label: '1', value: 'value1' },
      { label: '2', value: 'value2' },
    ],
    label = 'label',
    control,
    name,
    rules = {},
    inputStyle,
    placeholder = 'Select item',
    searchPlaceholder = 'search...',
    dropdownStyle,
    placeholderStyle,
    selectedTextStyle,
  }) => {

    return (
        <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
            <View>
            <Dropdown
              style={[styles.textBoxes, styles.leftStandardPadding, 
                {height:50} ]}
            data={dropdownData}
            labelField="label"
            valueField="value"
            placeholder={placeholder}
            searchPlaceholder={searchPlaceholder}
            value={value}
            onChange={data => onChange(data.value)}
          />
            {error && (
              <Text style={{
                color: 'red',
                alignSelf: 'stretch',
                marginHorizontal:45
              }}>
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
export default DropDown;