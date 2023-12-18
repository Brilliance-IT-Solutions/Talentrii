import React from "react";
import { Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import margin from "../../../style/commonStyles"

const IconCont = ({ imageSource,onIconPress,width, height,marginhorizontal=20,marginvertical=0}) => {
    return (
        <TouchableOpacity onPress={onIconPress}>
            <Image style={{resizeMode:'contain',width:width,height:height,marginHorizontal:marginhorizontal,marginVertical:marginvertical}}
                source={imageSource}
                >
            </Image>
        </TouchableOpacity>
    )
};
const icon = StyleSheet.create({
    // text: {
    //     marginHorizontal: margin,
    //     // marginTop: 10,
    // }
});
export default IconCont