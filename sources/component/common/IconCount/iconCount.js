import React from "react";
import { Image, TouchableOpacity, Text, StyleSheet,View } from "react-native";
import margin from "../../../style/commonStyles"
import colors from "../../../assets/themes/colors";

const IconCont = ({ imageSource,onIconPress,width, height,marginhorizontal=20,marginvertical=0,label,color,count}) => {
    return (
        <TouchableOpacity onPress={onIconPress}>
            <Image style={{resizeMode:'contain',width:width,height:height,marginHorizontal:marginhorizontal,marginVertical:marginvertical}}
                source={imageSource}
                >
            </Image>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
            {count !== 'undefined' && <Text style={{textAlign:"center",fontSize:10,color:color,marginHorizontal:1}}>{count}</Text>}
            <Text style={{textAlign:"center",fontSize:10,color:color,marginHorizontal:1}}>{label}</Text>
            </View>
        </TouchableOpacity>
    )
};
export default IconCont