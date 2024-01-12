import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { RouterNames } from '../constants/routeNames';

/////////////////// SCREEN LIST /////////////////////////
import HomeScreen from '../screen/home/homeScreen';
import OtherProfileComponent from '../component/Profile/OtherProfileComponent';
///////////////////////

const HomeStack = createStackNavigator();

const options = () => {
    return { animationEnabled: false, headerShown: false }
}

export const HomeStackScreen = () => (
    <HomeStack.Navigator initialRouteName={RouterNames.HOME_SCREEN}>
        <HomeStack.Screen name={RouterNames.HOME_SCREEN} component={HomeScreen} options={options}/>        
        <HomeStack.Screen name={RouterNames.OTHER_PROFILE_SCREEN} component={OtherProfileComponent} options={options}/>  
    </HomeStack.Navigator>
);