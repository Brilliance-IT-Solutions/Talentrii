import React from 'react'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import colors from '../../../assets/themes/colors'
import styles from '../../../style/styles'

const ButtonComponent = ({ title, onPressFunc, loading ,width="auto",buttonStyle,textStyle}) => {
    return (
        <TouchableOpacity
            onPress={onPressFunc}
            style={[styles.buttons, {width:width},buttonStyle]}>
            <View style={[
                { flexDirection: 'row'}
            ]}>
            {loading && <ActivityIndicator color={colors.White} />}
            <Text style={[styles.buttonText,textStyle]}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default ButtonComponent
