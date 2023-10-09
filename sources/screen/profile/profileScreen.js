import React from 'react'
import { View } from 'react-native'
import colors from '../../assets/themes/colors'
import CustomHeader from '../../component/customHeader/customHeader'
import TittleHeader from '../../component/customHeader/tittleHeader'
import ProfileComponent from '../../component/Profile/ProfileComponent'
import { staticConstant } from '../../constants/staticData/staticConstant'

const ProfileScreen = () => {

    return (
        <View style={{flex: 1, backgroundColor: colors.White}}>
            <CustomHeader showImage showBack/>
            <TittleHeader title={staticConstant.Profile.titleHeader} />
            <ProfileComponent />
        </View>
    )
}
export default ProfileScreen
