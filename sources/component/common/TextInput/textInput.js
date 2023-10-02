import React from "react";
import { TextInput, View, Text } from "react-native";
import colors from "../../../assets/themes/colors";
import styles from "../../../style/styles";
const InputContainer = (props) => {

    return (
        <View>
            <TextInput
                style={[styles.textBoxes, styles.leftStandardPadding, 
                    props.needMultilie ? {height: 120} : {height:50} ]}
                value={props.value}
                secureTextEntry={props.isSecuredText ? true : false}
                onChangeText={props.onChangeText}
                placeholder={props.placeholder}
                maxLength={props.maxLength}
                multiline = {props.needMultilie ? true : false }
                numberOfLines= {props.noLines || 1}
                
            ></TextInput>                
               {
                   props.error && <Text
                    style={[
                        { color: colors.Red, fontSize: 12, marginLeft: 40}
                    ]}>{props.error}</Text>
                }
        </View>

    )
};
export default InputContainer;