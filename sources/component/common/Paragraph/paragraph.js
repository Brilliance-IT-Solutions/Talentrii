import React from "react";
import { StyleSheet , View, Text, TouchableOpacity } from "react-native";
import colors from "../../../assets/themes/colors";
const ParagraphContainer = ({ txt,textstyle,containerStyle ,onPressFunc,numberOfLines=1}) => {
    return (
        <TouchableOpacity onPress={onPressFunc}>
        <View style={[styles.paragraph,containerStyle]}>
            <Text style={[styles.paragraphtxt,textstyle]} numberOfLines={numberOfLines} ellipsizeMode="tail">{txt}</Text>
        </View>
      </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    paragraph: {     
        width: '100%',
    },
    paragraphtxt: {
        marginLeft: 30,
        marginRight: 30,
        textAlign:'center',
        fontSize: 13,
        paddingBottom:10,
        color:colors.gray
    }
})
export default ParagraphContainer;