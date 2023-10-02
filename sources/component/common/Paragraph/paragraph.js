import React from "react";
import { StyleSheet , View, Text } from "react-native";
import colors from "../../../assets/themes/colors";
const ParagraphContainer = ({ txt }) => {
    return (
        <View style={styles.paragraph}>
            <Text style={styles.paragraphtxt}>{txt}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    paragraph: {     
        width: '100%',
    },
    paragraphtxt: {
        marginLeft: 30,
        marginRight: 30,
        textAlign:'center',
        fontSize: 13,
        paddingBottom:10,
        color:colors.gray
    }
})
export default ParagraphContainer;