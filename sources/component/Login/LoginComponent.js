import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import InputContainer from '../common/TextInput/textInput';
import ButtonComponent from '../common/Buttons/buttonComponent';
import Spinner from 'react-native-loading-spinner-overlay';
import { SafeAreaView } from 'react-native-safe-area-context';
import { staticConstant } from '../../constants/staticData/staticConstant';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';


const LoginComponent = (props) => {
  const navigation = useNavigation();

   const GoToSignup = ()=>{
    navigation.navigate('signupScreen')
    }

    return (
        <SafeAreaView style={styles.loginScreen}>
            <View>
                <Text style={styles.header}>Login</Text>
                <Spinner />
                <InputContainer
                    placeholder='example@email.com'
                    onChangeText={(value) => {
                        props.onChange({ name: 'Email', value })
                    }}
                    maxLength={30}
                    error={props.errors.Email}
                />
                <InputContainer
                    placeholder='password'
                    isSecuredText={true}
                    onChangeText={(value) => {
                        props.onChange({ name: 'Password', value })
                    }}
                    error={props.errors.Password} />
                    <TouchableOpacity onPress={GoToSignup}>
                    <Text style={{textAlign:'center'}}>Do not have an account? Sign up</Text>
                    </TouchableOpacity>
                <ButtonComponent disabled={props.loading} title={staticConstant.Login.btnTitle} onPressFunc={props.onSubmit} loading={props.loading} />
            </View>
        </SafeAreaView>
    );
};
export default LoginComponent;
