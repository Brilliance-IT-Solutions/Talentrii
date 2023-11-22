import { StyleSheet, Dimensions, StatusBar, Platform } from "react-native";
import colors from "../../assets/themes/colors";
import {getHeight} from '../../utils/GenericFunction'

const { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
    bgvideo: {
        flex: 1,
        height: getHeight(),
        width: width,
        backgroundColor:colors.Black
    },
    bottomHomeIconContainer: {
        position: 'absolute',
        paddingLeft: 60, alignSelf: 'flex-start', justifyContent: 'flex-start'
    },
    bottomCreateChallengeContainer: {
        position: 'absolute', alignSelf: 'center', justifyContent: 'center',
        
    },
    bottomProfileIconContainer: {
        position: 'absolute', alignSelf: 'flex-end', justifyContent: 'flex-end',
        paddingRight: 60
    }
});

export default styles;