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

const Signup = () => {
  const [state, setState] = useState({
    showDatePicker: false,
  });
  const {showDatePicker} = state;

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
  };

  return (
    <View style={{backgroundColor: Colors.White,
      //  height:height,
      flex: 1,}}>
    <View style={{flex: 1}}>
    {/* <ScrollView style={{flex: 1}}> */}
         <CustomHeader showImage showBack />
      <Text
        style={{
          alignSelf: 'center',
          margin: 30,
          fontSize: 30,
          color: Colors.Green,
        }}>
        Sign Up
      </Text>
      <RootContainer>
      <View style={{paddingBottom: 100}}>
        <CustomInput
          control={control}
          name="firstname"
          placeholder="Enter First Name"
          rules={{
            required: 'First Name is required',
          }}
        />
        <CustomInput
          control={control}
          name="lastname"
          placeholder="Enter Last Name"
          rules={{
            required: 'Last Name is required',
          }}
        />
        <CustomInput
          control={control}
          name="email"
          placeholder="example@email.com"
          rules={{
            required: 'email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid Email',
            },
          }}
        />
        <CustomInput
          control={control}
          name="password"
          placeholder="Enter Password"
          rules={{
            required: 'Password is required',
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$#!%*?&]{8,}$/,
              message:
                'Password must have atleast one uppercase one lowercase one digit and one special character',
            },
          }}
        />
        <CustomInput
          control={control}
          name="confirmpassword"
          placeholder="Enter Confirm Password"
          rules={{
            validate: value => {
              if (!value) return 'confirm password is required';
              if (value !== getValues('password'))
                return 'Password and Confirm Password should be same';
            },
          }}
        />
        <DropDown
          control={control}
          name={'gender'}
          placeholder={'select Gender'}
          dropdownData={staticConstant.gender}
          rules={{
            required: 'Gender is required',
          }}
        />
        <CustomInput
          control={control}
          name="mobileno"
          placeholder="Enter Mobile No"
          rules={{
            required: 'Mobile No. is required',
          }}
        />

        <DatePickerComponent
          control={control}
          name={'dateOfBirth'}
          isVisible={showDatePicker}
          onPress={setVisible => updateState({showDatePicker: setVisible})}
          rules={{
            required: 'DOB is required',
          }}
        />

        <ButtonComponent
          title="Sign Up"
          onPressFunc={handleSubmit(onSignUpClick)}
          width="70%"
        />
        
      </View>
      </RootContainer>
    </View>
    </View>
  );
};

export default Signup;
