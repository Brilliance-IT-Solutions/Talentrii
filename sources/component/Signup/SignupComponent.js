import React, {useState,useContext} from 'react';
import {useForm} from 'react-hook-form';
import {Text, View, ScrollView} from 'react-native';
import InputContainer from '../common/TextInput/textInput';
import Colors from '../../assets/themes/colors';
import ButtonComponent from '../common/Buttons/buttonComponent';
import DropDown from '../common/dropdown/Dropdown';
import {staticConstant} from '../../constants/staticData/staticConstant';
import EndDate from '../common/Date/EndDate';
import DatePickerComponent from '../common/Date/Datepicker';
import CustomInput from '../common/TextInput/CustomInput';
import CustomHeader from '../customHeader/customHeader';
import RootContainer from '../rootContainer/rootContainer';
import MultiLineContainer from '../common/2LineText/multiLineText';
import style from '../../style/styles';
import Checkbox from '../common/checkbox/Checkbox';
import Social from '../common/social/Social';
import axiosManager from '../../helpers/axiosHandler';
import { authSignUpAction } from '../../context/actions/authAction';
import { setToken,setUser } from '../../utils/GenericFunction';
import { GlobalContext } from '../../context/Provider';
import { showError, showSuccess } from '../../component/common/toaster/toaster';
import { REGISTER_LOADING, REGISTER_SUCCESS,REGISTER_FAIL } from '../../constants/actionTypes/index'
import { AuthContext } from '../../context/context';

const Signup = () => {
  const [state, setState] = useState({
    showDatePicker: false,
  });
  const {showDatePicker} = state;
  const [showPassword,setShowPassword]=useState(true)
  const [showCPassword,setShowCPassword]=useState(true)
  const { authDispatch, authState: { error, loading, data } } = useContext(GlobalContext);
  const { signIn } = React.useContext(AuthContext);
  const updateState = data => setState(state => ({...state, ...data}));

  const {
    control,
    register,
    resetField,
    getValues,
    handleSubmit,
    formState: {errors},
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      //   password: '',
      //   confirmPassword: '',
      // dateOfBirth: new Date(),
    },
  });


  const callSignUpAPI = async (data) => {

    authDispatch({ type: REGISTER_LOADING })
    try {
      const res = await authSignUpAction(data);
      if (res.token) { await setToken(res.token) }
      if (res?.data) { await setUser(JSON.stringify(res?.data)) }
      
      authDispatch({ type: REGISTER_SUCCESS, payload: res.response })
      signIn()
      showSuccess(res.message)

    } catch (error) {
      showError(error.response.data.response.message)
      authDispatch({ type: REGISTER_FAIL, payload: error });
    }
  }

  const onSignUpClick = data => {
      callSignUpAPI(data)
  };

  return (
    <View style={{backgroundColor: Colors.White,
      flex: 1,}}>
    <View style={{flex: 1}}>
    <CustomHeader showBack showClose/>
              <View style={{ justifyContent: 'flex-start', flexDirection: 'row', height: 50, marginTop:25, marginLeft:15}}>
                <MultiLineContainer txt1={"Let's Get Started!"} txt2="Welcome back.You've been missed!"  fontWeight={'700'}/>
                </View>
      <RootContainer>
      <View style={{marginTop:25,marginBottom:15}}>
        <CustomInput
          control={control}
          name="emailId"
          placeholder="Enter your email"
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
          name="firstName"
          placeholder="Enter your Name"
          rules={{
            required: 'First Name is required',
          }}
          icon={'account'}
        />
        <CustomInput
          control={control}
          name="password"
          placeholder="Enter your password"
          secureTextEntry={showPassword}
          onPressIcon={()=>setShowPassword(showPassword=>!showPassword)}  showPassword={showPassword}
          rules={{
            required: 'Password is required',
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$#!%*?&]{8,}$/,
              message:
                'Password must have atleast one uppercase one lowercase one digit and one special character',
            },
          }}
          icon={'lock'}
        />
        <CustomInput
          control={control}
          name="confirmpassword"
          placeholder="confirm your password"
          secureTextEntry={showCPassword}
          onPressIcon={()=>setShowCPassword(showCPassword=>!showCPassword)}  showPassword={showCPassword}
          rules={{
            validate: value => {
              if (!value) return 'confirm password is required';
              if (value !== getValues('password'))
                return 'Password and Confirm Password should be same';
            },
          }}
          icon={'lock'}
        />
        <Checkbox control={control}  name="policy" />
        <ButtonComponent
          title="Sign Up"
          onPressFunc={handleSubmit(onSignUpClick)}
          buttonStyle={style.btnStyle} textStyle={style.textStyle} width={'90%'}
        />
         <Social/>
      </View>
      </RootContainer>
    </View>
    </View>
  );
};

export default Signup;
