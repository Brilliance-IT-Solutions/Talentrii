import { StyleSheet, Dimensions } from "react-native";
import colors from "../../assets/themes/colors";
import {getHeight, getTopMargin} from '../../utils/GenericFunction'

const { height, width } = Dimensions.get('window')
const textColor = colors.White

const styles = StyleSheet.create({

    topGradiant: {
        height: 150, width: '100%', position: 'absolute', opacity: 0.5
    },
    bottomGradiant: {
        width: '100%', position: 'absolute', height: 300, opacity: 0.5, top:  getHeight() - 300
    },
    headerFont: {
        margin: 10, color: textColor, fontSize: 16, fontWeight: '600'
    },
    topSection: {
        flexDirection: 'row', marginTop: getTopMargin(), marginLeft: 5, width: width
    },
    topIconRowSection: {
        marginHorizontal:10,
         top:50
    },
    topIcon: {
        alignItems: 'center', marginRight: 30, marginVertical: 8
    },
    topIconText: {
        marginTop: 5, fontSize: 16, color: colors.Green, fontWeight: '600'
    },
    bottomSection: {
        position: 'absolute', top: getHeight() - 200,
        width:'100%',
        marginHorizontal:10,
    },
    bottomProfileImage: {
        width: 50, height: 50, borderRadius: 25
    },
    bottomProfileTextContainer: {
        height: 50, margin: 5, width: width / 2 + 20
    },
    bottomProfileNameText: {
        fontSize: 16, fontWeight: '600', height: 20, color: textColor
    },
    bottomProfileFollowerSection: {
        flexDirection: 'row', width: '100%', marginTop: 2,
    },
    followerCount: {
        color: textColor, fontSize: 12
    },
    bottomFollowerText: {
        fontSize: 10, fontWeight: '400', marginLeft: 5, alignSelf: 'center', color: textColor
    },
    bottomChallengeButton: {
        alignSelf: 'center', position: 'absolute', right: 10, width: 80, alignItems: 'center',
        bottom:10

    },
    challengeTitleContainer: {
        marginRight: 20,
        // maxHeight:20,
        width:'70%', 
    },
    challengeTitle: {
        fontSize: 10, fontWeight: '700', color: textColor,flexWrap:'wrap',overflow:'scroll', marginLeft:0,marginRight:0,
        paddingBottom:0,textAlign:"left"
       
    },
    challengeSubTitleContainer: {
        marginTop: 5, maxHeight: 40, width: width - 40
    },
    challengeSubTitle: {
        width: '100%', fontSize: 12, fontWeight: '600', paddingRight: 20, color: textColor
    },

    btnStyle:{
     backgroundColor:colors.White,
     borderRadius:50,
     marginVertical:0,
     paddingHorizontal:5,
     paddingVertical:2,
     marginHorizontal:5
     
    },
    textStyle:{
        color:colors.Black,
        fontSize:10,
        marginVertical:0,
    }

});

export default styles;