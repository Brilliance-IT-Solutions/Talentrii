import { View,Text ,Image,StyleSheet} from "react-native";
import {IMAGES} from "../../constants/images";
import colors from "../../assets/themes/colors";
import { width } from "../../style/responsiveSize";
import ButtonComponent from "../common/Buttons/buttonComponent";
import fontFamily from "../../style/fontFamily";
const CommentCard = ({title,description}) =>{
    return(
        <View  style={{borderWidth:1,borderRadius:5,borderColor:colors.searchborder,padding:8,marginVertical:5,elevation:0.5}}>
            <View style={{flexDirection:"row",alignItems:'center'}}>
            
            <View style={{borderRadius:50,marginRight:5}}>
            <Image style={{resizeMode:'contain',width:50,height:50,borderRadius:50}}
                source={{uri:IMAGES.USER_DEFAULT_ICON}}
                >
            </Image>
            </View>
            <View style={{marginLeft:5,flex:1}}>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <Text style={{fontFamily:fontFamily.semiBold,color:colors.Black,fontSize:12}}>
               {title}
            </Text>
             <ButtonComponent title={'Request to become Topper'}   buttonStyle={styles.btnStyle}
              textStyle={styles.textStyle}></ButtonComponent>
            </View>
            <Text style={{color:colors.Icon,fontSize:10,fontFamily:fontFamily.medium}}>
               {description}
            </Text>
            </View>
            </View>
            <View style={{alignSelf:'flex-end'}}>
                <View style={{flexDirection:'row'}}>
                <Image source={IMAGES.RECTANGLE_IMAGE1} style={{width:20,height:20,resizeMode:'contain',marginRight:2}}/>
                <Image source={IMAGES.RECTANGLE_IMAGE2} style={{width:20,height:20,resizeMode:'contain',marginRight:2}}/>
                <Image source={IMAGES.RECTANGLE_IMAGE3} style={{width:20,height:20,resizeMode:'contain',marginRight:2}}/>
                <Image source={IMAGES.RECTANGLE_IMAGE4} style={{width:20,height:20,resizeMode:'contain',marginRight:2}}/>
                <Image source={IMAGES.RECTANGLE_IMAGE5} style={{width:20,height:20,resizeMode:'contain'}}/>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    btnStyle: {
      backgroundColor: colors.Green,
      borderRadius: 2,
      marginVertical: 0,
      paddingHorizontal: 7,
      paddingVertical: 3,
      marginHorizontal: 0,
    },
    textStyle: {
      color: colors.White,
      fontSize: 8,
      marginTop:1,
      marginBottom:0
    },
})
export default CommentCard;