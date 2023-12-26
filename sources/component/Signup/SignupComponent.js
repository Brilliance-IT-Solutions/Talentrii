import React, {useState} from 'react';
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

const Signup = () => {
  const [state, setState] = useState({
    showDatePicker: false,
  });
  const {showDatePicker} = state;
  const [showPassword,setShowPassword]=useState(true)
  const [showCPassword,setShowCPassword]=useState(true)

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

  const onSignUpClick = data => {
    console.log(data);
    props
  };

  return (
    <View style={{backgroundColor: Colors.White,
      //  height:height,
      flex: 1,}}>
    <View style={{flex: 1}}>
    <CustomHeader showBack showClose/>
              <View style={{ justifyContent: 'flex-start', flexDirection: 'row', height: 50, marginTop:25, marginLeft:15}}>
                <MultiLineContainer txt1={"Let's Get Started!"} txt2="Welcome back.You've been missed!"/>
                </View>
      <RootContainer>
      <View style={{marginTop:25,marginBottom:15}}>
        <CustomInput
          control={control}
          name="email"
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
          name="firstname"
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
        
      </View>
      </RootContainer>
    </View>
    </View>
  );
};

export default Signup;
