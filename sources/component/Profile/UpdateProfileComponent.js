import React from 'react';
import { Image, View } from 'react-native'
import { IMAGES } from '../../constants/images';
import ButtonComponent from '../common/Buttons/buttonComponent';
import InputContainer from '../common/TextInput/textInput';
import CustomHeader from '../customHeader/customHeader';
import TittleHeader from '../customHeader/tittleHeader';
import RootContainer from '../rootContainer/rootContainer';
import styles from './styles'
import { staticConstant } from '../../constants/staticData/staticConstant';

const UpdateProfileComponent = () => {

    return (
        <View style={styles.rootContainer}>
            <CustomHeader showImage showBack/>
            <TittleHeader title={staticConstant.UpdateProfile.btnTitle}/>
            <RootContainer>
                <View style={styles.rootContainer}>
                    <View style={styles.imageViewContainer}>
                        <Image 
                        style={styles.imgaeView}
                        source={IMAGES.USER_PIC} 
                        resizeMode='contain' />
                    </View>
                    <View style={{marginTop: 40}}>
                        <InputContainer
                            placeholder='Name'
                            maxLength={30}
                        />
                        <InputContainer
                            placeholder='Email'
                            maxLength={30}
                        />
                        <InputContainer
                            placeholder='UserName'
                            maxLength={30}
                        />
                        <InputContainer
                            placeholder='Age'
                            maxLength={30}
                        />
                        <ButtonComponent title={staticConstant.UpdateProfile.btnTitle} />
                    </View>
                </View>
            </RootContainer>
        </View>
    );
};

export default UpdateProfileComponent;