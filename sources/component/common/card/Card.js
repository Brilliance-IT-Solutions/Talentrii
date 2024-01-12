import React from "react";
import { View,Text, StyleSheet,Image, TouchableOpacity } from "react-native";
import colors from "../../../assets/themes/colors";
import ButtonComponent from "../Buttons/buttonComponent";
import { IMAGES } from "../../../constants/images";
import fontFamily from "../../../style/fontFamily";
const CardComponent = ({onPressFunc,title,description}) =>{
    return(
<TouchableOpacity onPress={onPressFunc}>
<View style={{flex:1,backgroundColor:colors.White,elevation:1,borderRadius:10,marginHorizontal:15,marginVertical:5}}>
    <View style={{flexDirection:'row',alignItems:'center',marginHorizontal:10,paddingVertical:15}}>
    <View style={{elevation:0.5,padding:5,borderRadius:5}}>
    <Image source={IMAGES.CHALLENGE_IMAGE}  style={{height:20,width:20,resizeMode:'contain'}}></Image>
    </View>
    <View style={{marginLeft:15}}>
    <Text style={{fontSize:10,color:colors.Black,fontFamily:fontFamily.medium}}>{title}</Text>
    <Text  style={{fontSize:10,color:colors.Black,fontFamily:fontFamily.semiBold}}>{description}</Text>
    </View>
    <View style={{position:'absolute',right:0}}>
    <View style={{flexDirection:'row',marginVertical:3}}>
    <Image source={IMAGES.ELLIPSE_IMAGE1}  style={{height:20,width:20,resizeMode:'contain'}}></Image>
    <Image source={IMAGES.ELLIPSE_IMAGE3}  style={{height:20,width:20,resizeMode:'contain'}}></Image><Image source={IMAGES.ELLIPSE_IMAGE2}  style={{height:20,width:20,resizeMode:'contain'}}></Image><Image source={IMAGES.ELLIPSE_IMAGE4}  style={{height:20,width:20,resizeMode:'contain'}}></Image>
    </View>
    <ButtonComponent title={'Public'} buttonStyle={styles.btnStyle} textStyle={styles.textStyle}/>
    </View>
    </View>
</View>
</TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btnStyle:{
   backgroundColor:colors.Green,
   borderRadius:50,
     marginVertical:0,
     paddingHorizontal:6,
     paddingVertical:2,
     marginHorizontal:5
    },
    textStyle:{
color:colors.White,
fontSize:8,
marginTop:1,
marginBottom:0
    }
})

export default CardComponent;