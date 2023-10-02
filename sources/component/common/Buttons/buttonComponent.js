import React from 'react'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import colors from '../../../assets/themes/colors'
import styles from '../../../style/styles'

const ButtonComponent = ({ title, onPressFunc, loading }) => {
    return (
        <TouchableOpacity
            onPress={onPressFunc}
            style={styles.buttons}>
            <View style={[
                { flexDirection: 'row' }
            ]}>
            {loading && <ActivityIndicator color={colors.White} />}
            <Text style={[styles.buttonText, {paddingLeft: 10}]}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default ButtonComponent
