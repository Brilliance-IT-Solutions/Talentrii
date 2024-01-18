import React, {useState} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import InputContainer from '../common/TextInput/textInput';
import ButtonComponent from '../common/Buttons/buttonComponent';
import Spinner from 'react-native-loading-spinner-overlay';
import {SafeAreaView} from 'react-native-safe-area-context';
import {staticConstant} from '../../constants/staticData/staticConstant';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import style from '../../style/styles';
import CustomHeader from '../customHeader/customHeader';
import TittleHeader from '../customHeader/tittleHeader';
import MultiLineContainer from '../common/2LineText/multiLineText';
import multistyle from '../../component/Profile/styles';
import CustomInput from '../common/TextInput/CustomInput';
import {useForm} from 'react-hook-form';
import Checkbox from '../common/checkbox/Checkbox';
import Social from '../common/social/Social';
import RootContainer from '../rootContainer/rootContainer';
import { GoogleSignin ,statusCodes } from '@react-native-google-signin/google-signin';


const LoginComponent = props => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(true);
  const [dataToSend, setDataToSend] = useState('');
  const {
    control,
    register,
    resetField,
    getValues,
    setValue,
    handleSubmit,
    formState: {errors},
  } = useForm({
    mode: 'onChange',
    defaultValues: {},
  });
  const GoToSignup = () => {
    navigation.navigate('signupScreen');
  };

  const onSignInClick = async data => {
    let formdata = {
      emailId: data.emailId,
      password: data.password,
      authProvider:'local'
      }
    props.sendDataToParent(formdata);
  };

  GoogleSignin.configure({
    // apiKey:"AIzaSyAi3jmbXmkVz08rkgpApv230c7KDkecETA",
    AndroidClientId:"899441618311-t6j3uo57dcbpeaocrbsikosjh560nq9d.apps.googleusercontent.com"
   
  });

  const signInWithGoogle = async () =>{
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      let data = {
        firstName : userInfo.user.givenName,
        emailId:userInfo.user.email,
        authProvider:"google"
      }
      props.sendDataToParent(data)
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log("cancelled")
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("in progree")

        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log("not avaible")

      } else {
        // some other error happened
        console.log("wererr",error)

      }
    }
  }

  return (
    <SafeAreaView style={styles.loginScreen}>
      <View style={{flex:1}}>
        <CustomHeader showBack  />
        <View style={styles.headingTitleContainer}>
          <MultiLineContainer
            txt1={"Let's Get Started!"}
            txt2="Welcome back.You've been missed!"    
          />
        </View>
        <RootContainer>
        <View style={{marginTop: 25, marginBottom: 5}}>
          <CustomInput
            control={control}
            name="emailId"
            placeholder="Enter Your Email"
            rules={{
              required: 'email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid Email',
              },
            }}
            icon={'email-outline'}
          />
          <CustomInput
            control={control}
            name="password"
            placeholder="Enter Your Password"
            secureTextEntry={showPassword}
            rules={{required: 'Password is required'}}
            onPressIcon={() => setShowPassword(showPassword => !showPassword)}
            inputMode={'password'}
            showPassword={showPassword}
            icon={'lock'}
          />
          <View style={{marginHorizontal:18,marginTop:10}}>
          <Checkbox control={control} name="policy" label={'By Creating An Account You Agree To Our General Terms & Conditions'}  rules={{
              required: 'please check the checkbox to agree terms & conditions'}} />
          </View>
        </View>
        {/* <TouchableOpacity onPress={GoToSignup}>
                    <Text style={{textAlign:'center'}}>Do not have an account? Sign up</Text>
                    </TouchableOpacity> */}
        <ButtonComponent
          disabled={props.loading}
          title={staticConstant.Login.btnTitle}
          onPressFunc={handleSubmit(onSignInClick)}
          loading={props.loading}
          buttonStyle={style.btnStyle}
          textStyle={style.textStyle}
          width={'90%'}
        />
        <Social onPressFunc={signInWithGoogle}/>
        </RootContainer>
      </View>
    </SafeAreaView>
  );
};
export default LoginComponent;
