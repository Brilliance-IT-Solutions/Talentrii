import React from 'react'
import { View, Text } from 'react-native'
import styles from '../style/styles'
import { staticConstant } from '../constants/staticData/staticConstant';

const editProfileScreen = () => {
    return (
        <View style={styles.editProfileScreen}>
            <Text>{staticConstant.editProfile.titleHeader}</Text>
        </View>
    )
};
export default editProfileScreen
