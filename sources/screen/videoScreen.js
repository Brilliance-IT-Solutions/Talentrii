import React from 'react'
import { View, Text,Button } from 'react-native'
import styles from '../style/styles';
import editProfileScreen from './editProfileScreen';
import { RouterNames } from '../constants/routeNames';
import { staticConstant } from '../constants/staticData/staticConstant';


const videoScreen = ({navigation}) => {
    return (
        <View style={styles.screen}>
            <Text>{staticConstant.videoScreen.welcome} </Text>
            <Text>{staticConstant.videoScreen.nextScreen}</Text>
            <Button title={staticConstant.videoScreen.btnTitle} onPress={()=> navigation.navigate(RouterNames.EDIT_PROFILE_SCREEN)}/>
        </View>
    )
};

export default videoScreen;