import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import colors from '../../assets/themes/colors';

const TittleHeader = props => {
    return (
        <View style={styles.subHeading}>
            <Text style={styles.subHeadingText}>
                {props.title}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    subHeading: {
        // height: 0,
        borderColor: colors.lightGrey,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        width: '100%',
        flexDirection: 'row',
     
    },
    subHeadingText: {
        marginLeft: 20,
        fontSize: 18,
        paddingTop:10,
        paddingBottom:10,
        color:colors.Black
    }
})
export default TittleHeader;