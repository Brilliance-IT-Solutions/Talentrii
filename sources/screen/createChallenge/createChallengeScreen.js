import React from 'react'
import { View, Text } from 'react-native'
import CreateChallenegeComponent from '../../component/CreateChallenge/CreateChallenegeComponent'
import {useRoute} from '@react-navigation/native';

const CreateChallengeScreen = () => {
    const route = useRoute();
    const challenge = route.params.data
    return (
        <CreateChallenegeComponent props={{data:challenge}}/>
    )
}

export default CreateChallengeScreen
