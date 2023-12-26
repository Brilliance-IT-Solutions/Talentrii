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

    headingTitleContainer:{
        justifyContent: 'flex-start', flexDirection: 'row', height: 50, marginTop:25, marginLeft:15
    }

});

export default styles;