import React from "react";
import { StyleSheet, View, Text } from "react-native";
import colors from "../../../assets/themes/colors";
import fontFamily from "../../../style/fontFamily";

const Label = ({title,style,asterisk}) => {

    return (
        <View style={[styles.subHeading,style]}>
        <Text style={[styles.subHeadingText,style]}>
            {title}
            {/* {asterisk && <Text style={{color:asterisk ? 'red':'black'}}>{"*"}</Text>} */}
        </Text>
    </View>

    )   
};
const styles = StyleSheet.create({
    subHeading: {
        width: '100%',
        flexDirection: 'row',
        alignItems:'center'
     
    },
    subHeadingText: {
        marginLeft: 20,
        fontSize: 12,
         marginVertical:4,
        color:colors.Black,
        fontFamily:fontFamily.medium

    }
});
export default Label;