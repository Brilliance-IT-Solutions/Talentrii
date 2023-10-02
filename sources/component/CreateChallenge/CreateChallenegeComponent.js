import React from 'react';
import { StyleSheet, Text, View } from 'react-native'
import colors from '../../assets/themes/colors';
import { getHeight } from '../../utils/GenericFunction';
import ButtonComponent from '../common/Buttons/buttonComponent';
import InputContainer from '../common/TextInput/textInput';
import CustomHeader from '../customHeader/customHeader';
import TittleHeader from '../customHeader/tittleHeader';
import RootContainer from '../rootContainer/rootContainer';
import CustomFooter from '../customHeader/footer';
import PopupComponent from '../common/Buttons/popupComponent';

const CreateChallenegeComponent = () => {

    // const [form, setForm] = React.useState({})
    // const [errors, setErrors] = React.useState({})

    // const onChange = ({ name, value }) => {

    //     setForm({ ...form, [name]: value });
    //     if (value !== '') {
    //         setErrors(prev => {
    //             return { ...prev, [name]: null }
    //         })
    //     } else {
    //         setErrors(prev => {
    //             return { ...prev, [name]: name + ' is required' }
    //         })
    //     }
    // };
    function Press(item){
    return item
    }
    return (
        <View style={styles.rootContainer}>
            <CustomHeader showImage showBack title="create a" />
            <RootContainer>
                <View style={{ marginTop: 20, height: getHeight() }}>
                     <InputContainer
                        placeholder='Title'
                        maxLength={30}
                    />
                    <InputContainer
                        placeholder='Description'
                        maxLength={120}
                        needMultilie = {true}
                        noLines ={4}
                    />
                    {/*<InputContainer
                        placeholder='Video Link'
                        maxLength={100}
                    />
                    <InputContainer
                        placeholder='Location'
                        maxLength={100}
                    />
              <ButtonComponent title='Create' />*/}
              <PopupComponent title="+" onPressFunc={Press}/>
             </View>
            </RootContainer>
            <CustomFooter/>
        </View>
    );
};

const styles = StyleSheet.create({
    rootContainer: {
        backgroundColor: colors.White,
        flex: 1,
    },
})

export default CreateChallenegeComponent;