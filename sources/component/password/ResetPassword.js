import react from 'react'
import {View,Text} from 'react-native'
import colors from '../../assets/themes/colors'
import CustomHeader from '../customHeader/customHeader'
import TittleHeader from '../customHeader/tittleHeader'

const ResetPassword = () =>{
  return(
    <View style={{flex:1,  backgroundColor: colors.White}}>
    <CustomHeader showImage showBack />
<TittleHeader title={"Reset Password"} />
</View>
  )
}

export default ResetPassword