import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { RouterNames } from '../constants/routeNames';

/////////////////// SCREEN LIST /////////////////////////
import ChallengeScreen from '../screen/Challenge/ChallengeScreen';
import CreateChallengeScreen from '../screen/createChallenge/createChallengeScreen';
import PreviewChallenge from '../component/PreviewChallenge/PreviewChallenge';
///////////////////////

const ChallengeStack = createStackNavigator();

const options = () => {
    return { animationEnabled: false, headerShown: false }
}

export const ChallengeStackScreen = () => (
    <ChallengeStack.Navigator initialRouteName={RouterNames.CHALLENGE_SCREEN}>
        <ChallengeStack.Screen name={RouterNames.CHALLENGE_SCREEN} component={ChallengeScreen} options={options}/>  
        <ChallengeStack.Screen name={RouterNames.CREATE_CHALLENGE_SCREEN} component={CreateChallengeScreen} options={options}/>        
        <ChallengeStack.Screen name={RouterNames.PREVIEW_CHALLENGE_SCREEN} component={PreviewChallenge} options={options}/>        
    </ChallengeStack.Navigator>
);