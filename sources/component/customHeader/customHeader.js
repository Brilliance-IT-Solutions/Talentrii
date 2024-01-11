import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../../assets/themes/colors';
import { useNavigation } from '@react-navigation/native';
import { getTopMargin } from '../../utils/GenericFunction';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import fontFamily from '../../style/fontFamily';

const CustomHeader = ({showBack,title,showClose,rightIcon='close',colorRightIcon,styleBox,containerStyle,navigationPage}) => {
 
    const navigation = useNavigation();

    const didBackTapped = () => {
        if(navigation.canGoBack()){
            navigation.goBack()
        }else{
            return
        }
    }
    return (
        <View style={[styles.header, styles.headerExt]}>
            { showBack && <TouchableOpacity onPress={didBackTapped}>
                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
            <Icon name={'arrow-left'} size={18} color={colors.Black} style={styles.backLogo}/>
            </View>
            </TouchableOpacity> }    
           
                {title && 
                <View style={{position:'absolute',left:0,right:0,margin:"auto"}}>
                    <Text style={styles.headerTitle}>
                    {title}
                </Text>
                </View>}
        
            <View style={{position:'absolute',right:0}}>
            { showClose && <TouchableOpacity onPress={navigationPage ? navigationPage : didBackTapped}>
                <View style={[styleBox ? containerStyle : '',{marginRight:10}]}>
                    <Icon name={rightIcon} size={18} color={colorRightIcon ? colorRightIcon :colors.Black} style={[styles.close]}/>
                    </View>
            </TouchableOpacity>}
                    </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 44,
        backgroundColor: colors.White,
        marginTop: getTopMargin()
    },
    headerExt: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        color: colors.Black,
        fontSize: 16,
        fontWeight:"500",
        textAlign:'center',
        fontFamily:fontFamily.medium
        
    },
    centerLogo: {
        // flex: 1,
        width: 100
    },
    backLogoContainer: {
        position: 'absolute', justifyContent: 'center'
    },
    backLogo: {
        width: 20,
        marginHorizontal:10,
    },
    close:{
        textAlign:'center',
        width: 20,
        marginRight:0,
        borderRadius:5
    }
})
export default CustomHeader;