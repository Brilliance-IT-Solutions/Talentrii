import react from 'react'
import { View,Text } from 'react-native'
import { height } from '../../style/responsiveSize'
import IconCont from '../common/IconCount/iconCount'
import {IMAGES} from '../../constants/images'
import { Enums } from '../../constants/Enum/enum'
import Icon from '../common/IconCount/Icons'
import colors from '../../assets/themes/colors'

const ProfileHeader = ({userName}) =>{
    return(
        <View style={{width:'100%',height:44,flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:10}}>
            <Text>{userName}</Text>
            <View style={{flexDirection:'row'}}>
              <Icon name={"plus-square-o"} size={20} iconColor={colors.Black}/>
              <Icon name={"navicon"} size={20} iconColor={colors.Black}/>
              </View>
        </View>
    )
}

export default ProfileHeader