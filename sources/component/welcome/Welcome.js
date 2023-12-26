import react from 'react'
import { View,Text ,Image, StyleSheet} from 'react-native';
import {IMAGES} from '../../constants/images'
import { width ,height} from '../../style/responsiveSize';
import ButtonComponent from '../common/Buttons/buttonComponent';
import colors from '../../assets/themes/colors';
import { useNavigation } from '@react-navigation/native';
import { RouterNames } from '../../constants/routeNames';
import styles from '../../style/styles';


const Welcome = () =>{
    const navigation = useNavigation()
   const GoToLogin = () =>{
     navigation.navigate(RouterNames.LOGIN_SCREEN)
    }
    const GoToSignUp = () =>{
     navigation.navigate(RouterNames.SIGNUP_SCREEN)

    }
    return(
       <View style={style.container}>
            <View style={{marginTop:30}}>
            <Image style={style.centerLogo}
            source={IMAGES.SPLASH_SCREEN_LOGO}
            resizeMode="contain" />
            </View> 
            <View style={{marginVertical:20}}>
                <Text style={{fontSize:25, color:colors.Black}}>Welcome to 
                      <Text style={{color:colors.Green,fontWeight:'700'}}>Talentrii!</Text>
                </Text>
            </View>
            <ButtonComponent title={'Get Started'} width={'70%'} buttonStyle={styles.btnStyle} textStyle={styles.textStyle} onPressFunc={GoToLogin}></ButtonComponent>
            <ButtonComponent title={'Sign Up'} width={'70%'}  buttonStyle={style.btnStyle} textStyle={style.textStyle} onPressFunc={GoToSignUp}></ButtonComponent>
       </View>
    )
}

const style = StyleSheet.create({
    container:{
        flex:1,alignItems:'center'
    },
    centerLogo:{
        width: width * 0.3,        
   },
   btnStyle:{
    borderWidth:1
   },
   textStyle:{
    color:colors.Black
   },
})

export default Welcome;