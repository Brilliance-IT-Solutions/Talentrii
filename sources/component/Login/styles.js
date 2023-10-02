import { StyleSheet, Dimensions } from "react-native";
import Colors from "../../assets/themes/colors";

const styles = StyleSheet.create({

    loginScreen: {
        flex: 1,
        backgroundColor: Colors.White,        
    },
    header: {
        alignSelf: 'center',
        margin: 30,
        fontSize: 40,
        color: Colors.Green,
    },

});

export default styles;