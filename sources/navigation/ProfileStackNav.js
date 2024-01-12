import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { RouterNames } from '../constants/routeNames';

/////////////////// SCREEN LIST /////////////////////////
import ProfileScreen from '../screen/profile/profileScreen';
import UpdateProfileScreen from '../screen/profile/updateProfile';
import DetailProfileScreen from '../component/Profile/DetailProfileScreen';
///////////////////////

const ProfileStack = createStackNavigator();

const options = () => {
    return { animationEnabled: false, headerShown: false }
}

export const ProfileStackScreen = () => (
    <ProfileStack.Navigator initialRouteName={RouterNames.PROFILE_SCREEN}>
        <ProfileStack.Screen name={RouterNames.PROFILE_SCREEN} component={ProfileScreen} options={options}/> 
        <ProfileStack.Screen name={RouterNames.UPDATE_PROFILE_SCREEN} component={UpdateProfileScreen} options={options}/>
        <ProfileStack.Screen name={RouterNames.DETAIL_PROFILE_SCREEN} component={DetailProfileScreen} options={options}/>        
    </ProfileStack.Navigator>
);