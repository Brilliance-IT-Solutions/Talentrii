import react from 'react'
import { View, StyleSheet, TouchableOpacity,Image } from 'react-native'
import Icons from 'react-native-vector-icons/FontAwesome5'
import colors from '../../../assets/themes/colors';
import {IMAGES} from '../../../constants/images'
const Social = ({onPressFunc}) =>{
    return(
        <View style={{marginHorizontal:10,marginVertical:16}}>
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',alignContent:'center'}}>
            <View style={[styles.iconBorder,{paddingHorizontal:16}]}>
            <Icons name={'twitter'} size={21} color={'#00A1C9'}/>
            </View>
            <View style={[styles.iconBorder,{paddingHorizontal:16}]}>
            <Icons name={'facebook'} size={20} color={'#4A7DFF'}/>
            </View>
            <View style={[styles.iconBorder,{paddingHorizontal:18}]}>
            <Icons name={'apple'} size={20} color={colors.Black}/>
            </View>
            <View style={[styles.iconBorder,{paddingHorizontal:16}]}>
             <TouchableOpacity onPress={onPressFunc}>
                  <Image source={IMAGES.GOOGLE} style={{width:20,height:20,resizeMode:'contain'}}/>
             </TouchableOpacity>

            </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    iconBorder:{
        borderWidth:1,borderRadius:40,padding:15,borderColor:colors.InputBox,marginHorizontal:6
    }
})

export default Social;