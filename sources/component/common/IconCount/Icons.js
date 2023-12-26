import React from "react";
import { Image, TouchableOpacity, Text, StyleSheet,View } from "react-native";
import margin from "../../../style/commonStyles"
import colors from "../../../assets/themes/colors";
import Icons from 'react-native-vector-icons/FontAwesome'

const Icon = ({ name,size,iconColor=colors.White,onIconPress,label,color,count,paddingTop=0}) => {
    return (
        <TouchableOpacity onPress={onIconPress}>
            <Icons name={name} size={size} color={iconColor} style={{paddingTop:paddingTop,marginHorizontal:5,textAlign:'center'}}/>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',}}>
            {count !== 'undefined' && <Text style={{textAlign:"center",fontSize:10,color:iconColor,marginHorizontal:1}}>{count}</Text>}
            <Text style={{textAlign:"center",fontSize:10,color:iconColor,marginHorizontal:1}}>{label}</Text>
            </View>           
        </TouchableOpacity>
    )
};
export default Icon;