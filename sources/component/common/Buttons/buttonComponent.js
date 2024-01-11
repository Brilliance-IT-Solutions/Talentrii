import React from 'react'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import colors from '../../../assets/themes/colors'
import styles from '../../../style/styles'
import Icons from 'react-native-vector-icons/Feather'

const ButtonComponent = ({ title, onPressFunc, loading ,width="auto",buttonStyle,textStyle,icon=false,iconName}) => {
    return (
        <TouchableOpacity
            onPress={onPressFunc}
            style={[styles.buttons, {width:width},buttonStyle]}>
            <View style={[
                { flexDirection: 'row',alignItems:'center'}
            ]}>
            {loading && <ActivityIndicator color={colors.White} />}
            <Text style={[styles.buttonText,textStyle]}>{title}</Text>
            {icon && <Icons name={iconName} size={13} color={colors.White} style={{marginLeft:7,fontWeight:"800"}}></Icons>}
            </View>
        </TouchableOpacity>
    )
}

export default ButtonComponent
