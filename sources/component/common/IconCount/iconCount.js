import React from "react";
import { Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import margin from "../../../style/commonStyles"

const IconCont = ({ imageSource,onIconPress,width, height}) => {
    return (
        <TouchableOpacity onPress={onIconPress}>
            <Image style={[icon.text, {resizeMode:'contain',width:width,height:height}]}
                source={imageSource}
                >
            </Image>
        </TouchableOpacity>
    )
};
const icon = StyleSheet.create({
    text: {
        marginHorizontal: margin.marginHorizontalTwo,
        // marginTop: 10,
    }
});
export default IconCont