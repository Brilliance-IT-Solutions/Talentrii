import react from 'react'
import {View,Text,TouchableOpacity} from 'react-native'
import CustomHeader from '../customHeader/customHeader'
import TittleHeader from '../customHeader/tittleHeader'
import styles from '../home/styles'
import colors from '../../assets/themes/colors'
import {useForm} from 'react-hook-form';
import CustomInput from '../common/TextInput/CustomInput';
import {useNavigation} from "@react-navigation/native"
import { RouterNames } from '../../constants/routeNames'
const ForgotPassword = () =>{
    const navigation = useNavigation();

    const navigateTo = () =>{
        navigation.navigate(RouterNames.OTP_SCREEN);
      }

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
    
      const resetPassword = data => {
        console.log(data);
      };

  return(
    <View style={{flex:1,  backgroundColor: colors.White}}>
          <CustomHeader showImage showBack />
          <TittleHeader title={"Forgot Password"} />
          <View style={{marginTop:30}}>
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
        </View>
        <TouchableOpacity onPress={navigateTo}>
          <Text style={{textAlign: 'center',color:'blue'}}>
         Send OTP to Reset Password
          </Text>
        </TouchableOpacity>
    </View>
  )
}

export default ForgotPassword