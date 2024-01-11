import React from "react";
import { Image, TouchableOpacity, Text ,View} from "react-native";
import colors from "../../../assets/themes/colors";
import {IMAGES} from '../../../constants/images'
import fontFamily from "../../../style/fontFamily";

const UserProfile = ({ imageSource,onIconPress,width=30, height=30,marginhorizontal=0,marginvertical=10,userName,location,userNameTextStyle,locationTextStyle,style}) => {
    return (
        <TouchableOpacity onPress={onIconPress}>
            <View style={[{flexDirection:"row",marginHorizontal:marginhorizontal,marginVertical:marginvertical,alignItems:'center'},style]}>
            <View style={{borderRadius:50,marginRight:5}}>
            <Image style={{resizeMode:'contain',width:width,height:height,borderRadius:50}}
                source={{uri:IMAGES.USER_DEFAULT_ICON}}
                >
            </Image>
            </View>
            <View style={{marginLeft:5}}>
            {userNameTextStyle && <Text style={[userNameTextStyle,{fontFamily:fontFamily.regular}]}>
               {userName}
            </Text>}
            {locationTextStyle &&<Text style={[locationTextStyle,{fontFamily:fontFamily.regular}]}>
               {location}
            </Text>}
            </View>
            </View>
        </TouchableOpacity>
    )
};

export default UserProfile