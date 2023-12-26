import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { RouterNames } from '../constants/routeNames';

/////////////////// SCREEN LIST /////////////////////////
import LoginScreen from '../screen/auth/loginScreen';
import Signup from '../component/Signup/SignupComponent';
import ForgotPassword from '../component/password/ForgotPassword';
import ResetPassword from '../component/password/ResetPassword';
import Otp from '../component/password/Otp';
import Welcome from '../component/welcome/Welcome';
///////////////////////

const AuthStack = createStackNavigator();

const options = () => {
    return { animationEnabled: true, headerShown: false }
}

export const AuthStackScreen = () => (
    <AuthStack.Navigator initialRouteName={RouterNames.WELCOME_SCREEN}>
         <AuthStack.Screen name={RouterNames.WELCOME_SCREEN} component={Welcome} options={options}/>     
        <AuthStack.Screen name={RouterNames.LOGIN_SCREEN} component={LoginScreen} options={options}/>     
        <AuthStack.Screen name={RouterNames.SIGNUP_SCREEN} component={Signup} options={options}/>        
        <AuthStack.Screen name={RouterNames.FORGOT_SCREEN} component={ForgotPassword} options={options}/>   
        <AuthStack.Screen name={RouterNames.OTP_SCREEN} component={Otp} options={options}/>        
        <AuthStack.Screen name={RouterNames.RESET_SCREEN} component={ResetPassword} options={options}/>        
    </AuthStack.Navigator>
);