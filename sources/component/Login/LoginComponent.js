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
    props.sendDataToParent(data);
  };

  return (
    <SafeAreaView style={styles.loginScreen}>
      <View>
        <CustomHeader showBack showClose />
        <View style={styles.headingTitleContainer}>
          <MultiLineContainer
            txt1={"Let's Get Started!"}
            txt2="Welcome back.You've been missed!"
            fontWeight={'700'}
          />
        </View>
        <View style={{marginTop: 25, marginBottom: 15}}>
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
          <Checkbox control={control} name="policy" />
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
        <Social/>
      </View>
    </SafeAreaView>
  );
};
export default LoginComponent;
