import React from "react";
import { Image, TouchableOpacity, Text ,View} from "react-native";
import colors from "../../../assets/themes/colors";
import {IMAGES} from '../../../constants/images'

const UserProfile = ({ imageSource,onIconPress,width=30, height=30,marginhorizontal=0,marginvertical=10,userName,location,userNameTextColor=colors.Black,style}) => {
    return (
        <TouchableOpacity onPress={onIconPress}>
            <View style={[style,{flexDirection:"row",marginHorizontal:marginhorizontal,marginVertical:marginvertical,alignItems:'center'}]}>
            <View style={{borderRadius:50,marginRight:5}}>
            <Image style={{resizeMode:'contain',width:width,height:height,borderRadius:50}}
                source={{uri:IMAGES.USER_DEFAULT_ICON}}
                >
            </Image>
            </View>
            <View style={{marginLeft:5}}>
            <Text style={{fontSize:12,color:userNameTextColor}}>
               {userName}
            </Text>
            <Text style={{fontSize:10,color:colors.Grey}}>
               {location}
            </Text>
            </View>
            </View>
        </TouchableOpacity>
    )
};

export default UserProfile