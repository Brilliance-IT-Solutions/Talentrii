import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import InputContainer from '../common/TextInput/textInput';
import ButtonComponent from '../common/Buttons/buttonComponent';
import Spinner from 'react-native-loading-spinner-overlay';
import { SafeAreaView } from 'react-native-safe-area-context';


const LoginComponent = (props) => {

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
                <ButtonComponent disabled={props.loading} title='login' onPressFunc={props.onSubmit} loading={props.loading} />
            </View>
        </SafeAreaView>
    );
};
export default LoginComponent;
