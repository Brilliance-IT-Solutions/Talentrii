import { Dimensions, StyleSheet } from "react-native";
import colors from "../../assets/themes/colors";
import { Constants } from "../../constants/constants";
import { width } from "../../style/responsiveSize";
import fontFamily from "../../style/fontFamily";

const numColumns = Constants.PROFILE_PAGE_NUMBER_OF_COLUMNS;
const size = Dimensions.get('window').width/2.3;
const sizeheight = Dimensions.get('window').width / 1.5;

const styles = StyleSheet.create({
       
    rootContainer: {
        backgroundColor: colors.White,
        flex: 1,
        // paddingBottom: 10
    },
    bioDataSection: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'center'
        // marginHorizontal: 40, marginVertical: 20, height: 130,
        // borderColor: colors.Green, borderWidth: 0.5, borderRadius: 26
    },
    bioDataImageView: {
        // flex: 0.5, 
        // justifyContent: 'center'
    },
    bioDataImage: {
        height: '100%', 
        // left: 0, 
        width: "100%",
        //  marginLeft: '10%'
        borderRadius:50,
        resizeMode:'cover'
       
    },
    bioDataTextView: {
        // flex: 0.5, 
        // justifyContent: 'center'
    },

    btnStyle:{
     backgroundColor:colors.Button
    },
    textStyle:{
        fontFamily:fontFamily.medium,
        color:colors.Black
    },
    bioDataText: {
        fontSize: 16, fontWeight: '700', 
        // letterSpacing: 1,
        color:colors.Black
    },
    multiLineContainerSection: {
        justifyContent: 'center', flexDirection: 'row', height: 50, margin: 10
    },
    multiLineContainerCenterLine: {
        height: 40, width: 0.5,
        borderColor: colors.Green, borderWidth: 0.5,
    },
    bottomHistorySection: {
        flex: 1, 
        // flexDirection:'row',
        // width:width,
        // flexWrap:"wrap",
        // width:300,
        paddingBottom: 10,
    },
    bottomHistoryView: {
        width: size,
        height: sizeheight,
        // padding: 8   
        // borderWidth:0.5,
        elevation:1,
        // borderColor:colors.searchborder,
        borderRadius:20   
    },
    bottomHistoryImageView: {
        flex: 1,
        backgroundColor: 'lightblue',
        borderRadius: 10
    },
    bottomHistoryImage: {
        height: '60%',
        width: '100%',
        borderRadius:20,
        
       

    },
    bottomHistoryTextContainer: {
        position: 'absolute',
        bottom: 3, left: 5, width: '100%'
    },
    bottomHistoryText : {
        fontSize: 16
    },

    ////// UPDATE PROFILE CSS /////////
    imageViewContainer: {
        marginTop: 40,
        height: 100,    
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    imgaeView: {
        flex: 1, 
        height: 100,
        width:100,
        borderRadius:50
    }, 


});

export default styles;