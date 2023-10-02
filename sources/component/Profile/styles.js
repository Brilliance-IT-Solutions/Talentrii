import { Dimensions, StyleSheet } from "react-native";
import colors from "../../assets/themes/colors";
import { Constants } from "../../constants/constants";

const numColumns = Constants.PROFILE_PAGE_NUMBER_OF_COLUMNS;
const size = Dimensions.get('window').width / numColumns;

const styles = StyleSheet.create({
       
    rootContainer: {
        backgroundColor: colors.White,
        flex: 1,
        paddingBottom: 10
    },
    bioDataSection: {
        flexDirection: 'row',
        marginHorizontal: 40, marginVertical: 20, height: 130,
        borderColor: colors.Green, borderWidth: 0.5, borderRadius: 26
    },
    bioDataImageView: {
        flex: 0.5, justifyContent: 'center'
    },
    bioDataImage: {
        height: 100, left: 0, width: 100, marginLeft: '10%'
    },
    bioDataTextView: {
        flex: 0.5, justifyContent: 'center'
    },
    bioDataText: {
        fontSize: 16, fontWeight: '700', letterSpacing: 1
    },
    multiLineContainerSection: {
        justifyContent: 'center', flexDirection: 'row', height: 50, margin: 10
    },
    multiLineContainerCenterLine: {
        height: 40, width: 0.5,
        borderColor: colors.Green, borderWidth: 0.5,
    },
    bottomHistorySection: {
        flex: 1, paddingBottom: 10,
    },
    bottomHistoryView: {
        width: size,
        height: size,
        padding: 8        
    },
    bottomHistoryImageView: {
        flex: 1,
        backgroundColor: 'lightblue',
        borderRadius: 10
    },
    bottomHistoryImage: {
        height: '100%', width: '100%'
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    imgaeView: {
        flex: 1, height: 120
    }, 


});

export default styles;