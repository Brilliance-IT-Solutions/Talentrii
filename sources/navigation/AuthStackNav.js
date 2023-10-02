import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { RouterNames } from '../constants/routeNames';

/////////////////// SCREEN LIST /////////////////////////
import LoginScreen from '../screen/auth/loginScreen';
///////////////////////

const AuthStack = createStackNavigator();

const options = () => {
    return { animationEnabled: true, headerShown: false }
}

export const AuthStackScreen = () => (
    <AuthStack.Navigator initialRouteName={RouterNames.LOGIN_SCREEN}>
        <AuthStack.Screen name={RouterNames.LOGIN_SCREEN} component={LoginScreen} options={options}/>        
    </AuthStack.Navigator>
);