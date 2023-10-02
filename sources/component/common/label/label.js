import React from "react";
import { StyleSheet, View, Text } from "react-native";
import colors from "../../../assets/themes/colors";

const Label = (props) => {

    return (
        <View style={styles.subHeading}>
        <Text style={styles.subHeadingText}>
            {props.title}
        </Text>
    </View>

    )   
};
const styles = StyleSheet.create({
    subHeading: {
        width: '100%',
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center'
     
    },
    subHeadingText: {
        marginLeft: 20,
        fontSize: 13,
        paddingTop:10,
        paddingBottom:10,
        color:colors.grey

    }
});
export default Label;