import { StyleSheet, Dimensions } from "react-native";
import Colors from "../assets/themes/colors";

const { height, width } = Dimensions.get('window')
const styles = StyleSheet.create({

    //################-----> COMMON CSS <-----##############//    
    textBoxes : {
        fontSize: 16,
        borderWidth: 0.8,
        borderColor: Colors.lightGrey,
        marginHorizontal: 30,
        marginVertical: 10,
        borderRadius:10
        
    },
    leftStandardPadding : {
        paddingHorizontal: 16,
    },
    buttons : {
        marginVertical: 10,
        // marginHorizontal: 80,
        width:'auto',
        paddingHorizontal:30,
        backgroundColor: Colors.Green,        
        borderRadius: 8,
        // height:50,
        alignSelf:'center',
        justifyContent: 'center',
        alignItems:'center'
    },
    
    buttonText : {
        marginVertical: 12,        
        fontSize: 15,
        fontWeight: '400',
        color: Colors.White,
    },

    topMargin20 : {
        top: 20,     
    },
    topMargin40 : {
        top: 40    
    },
    bottomMargin5 : {
        marginBottom: 5    
    },

    //################------> MULTI LINE TEXT CONTAINER (20k Followers) <----------###############
    multiLineTxt: {
        flex: 0.4, 
        alignItems: 'center', 
        height: 50, 
        flexDirection: 'column'                
    },

    //################-----> SPLASH_SCREEN <-----##############//
    screen: {
        flex: 1,
        backgroundColor: Colors.White,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerLogo:{
        flex: 1, 
        width: 90        
    }

});
export default styles;