import React from 'react'
import { View, Text,Button } from 'react-native'
import styles from '../style/styles';
import editProfileScreen from './editProfileScreen';


const videoScreen = ({navigation}) => {
    return (
        <View style={styles.screen}>
            <Text>welcome to video screen </Text>
            <Text>going to next screen</Text>
            <Button title='next page' onPress={()=> navigation.navigate("editProfileScreen")}/>
        </View>
    )
};

export default videoScreen;