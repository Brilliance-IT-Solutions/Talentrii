import React from "react";
import { View, Text } from "react-native";
import styles from "../../../style/styles";
import colors from "../../../assets/themes/colors";
import fontFamily from "../../../style/fontFamily";
const MultiLineContainer = ({ txt1, txt2 ,fontSizetxt1=20,color=colors.Icon,align='flex-start',fontSizetxt2=14,style}) => {
    return (
        <View style={[styles.multiLineTxt,{alignItems:align}]}>
            <Text style={[styles.bottomMargin5,{fontSize:fontSizetxt1,fontFamily:fontFamily.medium,},style]}>{txt1}</Text>
            <Text style={{fontSize:fontSizetxt2,color:color,fontFamily:fontFamily.light}}>{txt2}</Text>
        </View>
    )
};
export default MultiLineContainer;