import React from "react";
import { View, Text } from "react-native";
import styles from "../../../style/styles";
import colors from "../../../assets/themes/colors";
const MultiLineContainer = ({ txt1, txt2 ,fontSizetxt1=25,color=colors.gray,align='flex-start',fontSizetxt2=16,fontWeight='500'}) => {
    return (
        <View style={[styles.multiLineTxt,{alignItems:align}]}>
            <Text style={[styles.bottomMargin5,{fontSize:fontSizetxt1,fontWeight:fontWeight}]}>{txt1}</Text>
            <Text style={{fontSize:fontSizetxt2,color:color}}>{txt2}</Text>
        </View>
    )
};
export default MultiLineContainer;