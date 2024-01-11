import React from "react";
import { Image, TouchableOpacity, Text, StyleSheet,View } from "react-native";
import margin from "../../../style/commonStyles"
import colors from "../../../assets/themes/colors";
import fontFamily from "../../../style/fontFamily";

const IconCont = ({ imageSource,onIconPress,width, height,marginhorizontal=20,marginvertical=0,label,color,count}) => {
    return (
        <TouchableOpacity onPress={onIconPress}>
            <View style={{width:'20%'}}>
            <Image style={{resizeMode:'contain',width:width,height:height,marginHorizontal:marginhorizontal,marginVertical:marginvertical}}
                source={imageSource}
                >
            </Image>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
            {count !== 'undefined' && <Text style={{fontSize:10,color:color,marginHorizontal:0}}>{count}</Text>}
            <Text style={{fontSize:10,color:color,marginHorizontal:0,color:colors.Black,fontFamily:fontFamily.medium,textAlign:'center'}}>{label}</Text>
            </View>
            </View>
        </TouchableOpacity>
    )
};
export default IconCont