import React from "react";
import {  TouchableOpacity, Text,View } from "react-native";
import colors from "../../../assets/themes/colors";
import Icons from 'react-native-vector-icons/FontAwesome'
import fontFamily from "../../../style/fontFamily";

const Icon = ({ name,size,iconColor=colors.White,onIconPress,label,color,count,paddingTop=0}) => {
    return (
        <TouchableOpacity onPress={onIconPress}>
            <Icons name={name} size={size} color={iconColor} style={{paddingTop:paddingTop,marginHorizontal:5,textAlign:'center'}}/>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',}}>
            {count !== 'undefined' && <Text style={{textAlign:"center",fontSize:8,color:iconColor,marginHorizontal:1,fontFamily:fontFamily.regular}}>{count}</Text>}
            <Text style={{textAlign:"center",fontSize:8,color:iconColor,marginHorizontal:1,fontFamily:fontFamily.regular}}>{label}</Text>
            </View>           
        </TouchableOpacity>
    )
};
export default Icon;