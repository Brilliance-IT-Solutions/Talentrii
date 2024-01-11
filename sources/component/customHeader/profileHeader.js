import react from 'react'
import { View,Text } from 'react-native'
import { height } from '../../style/responsiveSize'
import IconCont from '../common/IconCount/iconCount'
import {IMAGES} from '../../constants/images'
import { Enums } from '../../constants/Enum/enum'
import Icons from 'react-native-vector-icons/SimpleLineIcons'

import colors from '../../assets/themes/colors'
import fontFamily from '../../style/fontFamily'

const ProfileHeader = ({userName}) =>{
    return(
        <View style={{width:'100%',height:44,flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:10}}>
            <Text style={{color:colors.Black,fontSize:14,fontFamily:fontFamily.medium}}>{userName}</Text>
            <View style={{flexDirection:'row'}}>
              <Icons name={"plus"} size={15} color={colors.Black} style={{paddingHorizontal:5}}/>
              <Icons name={"menu"} size={17} color={colors.Black} style={{paddingLeft:5}}/>
              </View>
        </View>
    )
}

export default ProfileHeader