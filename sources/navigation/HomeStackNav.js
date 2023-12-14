import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { RouterNames } from '../constants/routeNames';

/////////////////// SCREEN LIST /////////////////////////
import HomeScreen from '../screen/home/homeScreen';
import CreateChallengeScreen from '../screen/createChallenge/createChallengeScreen';
import ProfileScreen from '../screen/profile/profileScreen';
import UpdateProfileScreen from '../screen/profile/updateProfile';
import Comments from '../component/home/Comments';
import DetailProfileScreen from '../component/Profile/DetailProfileScreen';
///////////////////////

const HomeStack = createStackNavigator();

const options = () => {
    return { animationEnabled: true, headerShown: false }
}

export const HomeStackScreen = () => (
    <HomeStack.Navigator initialRouteName={RouterNames.HOME_SCREEN}>
        <HomeStack.Screen name={RouterNames.HOME_SCREEN} component={HomeScreen} options={options}/>
        <HomeStack.Screen name={RouterNames.COMMENTS} component={Comments} options={options}/>
        {/* <HomeStack.Screen name={RouterNames.CREATE_CHALLENGE_SCREEN} component={CreateChallengeScreen} options={options}/>         */}
        <HomeStack.Screen name={RouterNames.PROFILE_SCREEN} component={ProfileScreen} options={options}/>    
        <HomeStack.Screen name={RouterNames.DETAIL_PROFILE_SCREEN} component={DetailProfileScreen} options={options}/>        
        <HomeStack.Screen name={RouterNames.UPDATE_PROFILE_SCREEN} component={UpdateProfileScreen} options={options}/>   
    </HomeStack.Navigator>
);