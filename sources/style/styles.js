import { StyleSheet, Dimensions } from "react-native";
import Colors from "../assets/themes/colors";
import fontFamily from "./fontFamily";

const { height, width } = Dimensions.get('window')
const styles = StyleSheet.create({

    //################-----> COMMON CSS <-----##############//    
    textBoxes : {
        fontSize: 11,
        borderWidth: 0.5,
        borderColor: Colors.searchborder,
        marginHorizontal: 18,
        marginVertical: 5,
        borderRadius:5,
        backgroundColor:Colors.White,
        fontFamily:fontFamily.regular,
        elevation:0.5
        
    },
    leftStandardPadding : {
        paddingHorizontal: 16,
    },
    buttons : {
        marginVertical: 10,
        // marginHorizontal: 80,
        paddingHorizontal:30,
        // backgroundColor: Colors.Green,        
        borderRadius: 5,
        // height:50,
        alignSelf:'center',
        justifyContent: 'center',
        alignItems:'center',
    },
    
    buttonText : {
        marginVertical: 10, 
        fontSize: 13,
        fontFamily:fontFamily.medium
        // color: Colors.White,
    },

    btnStyle:{
        marginVertical:2,
        backgroundColor:Colors.Green,
       },
       textStyle:{
        color:Colors.White
       },

    topMargin20 : {
        top: 20,     
    },
    topMargin40 : {
        top: 40    
    },
    bottomMargin5 : {
        marginBottom: 5,
        // fontSize:25,
        color:Colors.Black   
    },

    //################------> MULTI LINE TEXT CONTAINER (20k Followers) <----------###############
    multiLineTxt: {
        flex: 1, 
        // alignItems: 'center', 
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