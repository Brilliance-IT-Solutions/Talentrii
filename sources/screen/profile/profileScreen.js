import React from 'react'
import { View } from 'react-native'
import colors from '../../assets/themes/colors'
import CustomHeader from '../../component/customHeader/customHeader'
import TittleHeader from '../../component/customHeader/tittleHeader'
import ProfileComponent from '../../component/Profile/ProfileComponent'
import { staticConstant } from '../../constants/staticData/staticConstant'
import {useRoute} from '@react-navigation/native';

const ProfileScreen = () => {
    const route = useRoute();
    const userId = route.params.userId
    return (
        <View style={{flex: 1, backgroundColor: colors.White}}>
            <CustomHeader showImage showBack/>
            <TittleHeader title={staticConstant.Profile.titleHeader} />
            <ProfileComponent userId={userId}/>
        </View>
    )
}
export default ProfileScreen
