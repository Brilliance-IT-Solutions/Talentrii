import React from "react";
import { View, Text } from "react-native";
import styles from "../../../style/styles";
const MultiLineContainer = ({ txt1, txt2 }) => {
    return (
        <View style={styles.multiLineTxt}>
            <Text style={styles.bottomMargin5}>{txt1}</Text>
            <Text>{txt2}</Text>
        </View>
    )
};
export default MultiLineContainer;