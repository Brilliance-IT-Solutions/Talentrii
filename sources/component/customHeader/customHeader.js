import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../../assets/themes/colors';
import { IMAGES } from '../../constants/images';
import { RouterNames } from '../../constants/routeNames';
import { useNavigation } from '@react-navigation/native';
import { getTopMargin } from '../../utils/GenericFunction';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const CustomHeader = (props) => {
 
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
            { props.showBack && <TouchableOpacity onPress={didBackTapped}>
                <Image style={styles.backLogo}
                    source={IMAGES.BACK_ICON}
                    resizeMode="contain" />
            </TouchableOpacity> }
            <View style={{flexDirection:'row',alignItems:'center'}}>
            {<View>
                {props.title && <Text style={styles.headerTitle}>
                    {props.title}
                </Text>}
            </View>}
            <View>
                {props.showImage && <Image style={styles.centerLogo}
                    source={IMAGES.BRAND_FULL_LOGO}
                    resizeMode="contain" />}
            </View>
            </View>
            { props.showClose && <TouchableOpacity onPress={didBackTapped}>
            {/* <Image style={styles.close}
                    source={IMAGES.BACK_ICON}
                    resizeMode="contain" /> */}
                    <View style={{marginHorizontal:10}}>
                    <Icon name={'close-thick'} size={18} color={colors.Black}/>
                    </View>
            </TouchableOpacity> }
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
        justifyContent: 'space-between',
    },
    headerTitle: {
        color: colors.Green,
        fontSize: 18,
        fontWeight:"500"
    },
    centerLogo: {
        // flex: 1,
        width: 100
    },
    backLogoContainer: {
        position: 'absolute', justifyContent: 'center'
    },
    backLogo: {
        flex: 1,
        width: 20,
        marginLeft:14
    },
    close:{
        flex: 1,
        width: 20,
        marginRight: 14
    }
})
export default CustomHeader;