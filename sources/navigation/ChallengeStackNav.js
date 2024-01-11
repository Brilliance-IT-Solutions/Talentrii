import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { RouterNames } from '../constants/routeNames';

/////////////////// SCREEN LIST /////////////////////////
import ChallengeScreen from '../screen/Challenge/ChallengeScreen';
import CreateChallengeScreen from '../screen/createChallenge/createChallengeScreen';
import PreviewChallenge from '../component/PreviewChallenge/PreviewChallenge';
import PrivacyComponent from '../component/common/privacy/Privacy';
import ShowChallenges from '../component/Challenge/ShowChallenges';
import ShowChallengeDetail from '../component/Challenge/ChallengeDetail';
///////////////////////

const ChallengeStack = createStackNavigator();

const options = () => {
    return { animationEnabled: false, headerShown: false }
}

export const ChallengeStackScreen = () => (
    <ChallengeStack.Navigator initialRouteName={RouterNames.SHOW_ALL_CHALLENGES}>
        <ChallengeStack.Screen name={RouterNames.SHOW_ALL_CHALLENGES} component={ShowChallenges} options={options}/>        
        <ChallengeStack.Screen name={RouterNames.CHALLENGE_SCREEN} component={ChallengeScreen} options={options}/>  
        <ChallengeStack.Screen name={RouterNames.CREATE_CHALLENGE_SCREEN} component={CreateChallengeScreen} options={options}/> 
        <ChallengeStack.Screen name={RouterNames.SHOW_CHALLNEGE_DETAIL} component={ShowChallengeDetail} options={options}/>        
        <ChallengeStack.Screen name={RouterNames.PRIVACY} component={PrivacyComponent} options={options}/>        
        <ChallengeStack.Screen name={RouterNames.PREVIEW_CHALLENGE_SCREEN} component={PreviewChallenge} options={options}/> 
    </ChallengeStack.Navigator>
);