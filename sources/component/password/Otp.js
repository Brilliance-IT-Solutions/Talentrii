import react from 'react'
import {View,Text} from 'react-native'
import colors from '../../assets/themes/colors'
import CustomHeader from '../customHeader/customHeader'
import TittleHeader from '../customHeader/tittleHeader'

const Otp = () =>{
  return(
    <View style={{flex:1,  backgroundColor: colors.White}}>
    <CustomHeader showImage showBack />
<TittleHeader title={"OTP Screen"} />
</View>
  )
}

export default Otp