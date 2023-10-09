import React from 'react';
import {StyleSheet, View} from 'react-native';
import colors from '../../assets/themes/colors';
import {getHeight} from '../../utils/GenericFunction';
import ButtonComponent from '../common/Buttons/buttonComponent';
import CustomHeader from '../customHeader/customHeader';
import TittleHeader from '../customHeader/tittleHeader';
import RootContainer from '../rootContainer/rootContainer';
import Label from '../common/label/label';
import ParagraphContainer from '../common/Paragraph/paragraph';
import { staticConstant } from '../../constants/staticData/staticConstant';
import { useNavigation } from '@react-navigation/native';
import { RouterNames } from '../../constants/routeNames';

const CreateChallenegeScreenComponent = () => {
const navigation = useNavigation()

  function navigateTo(){
     navigation.navigate(RouterNames.CREATE_CHALLENGE_SCREEN)
  }
  return (
    <View style={styles.rootContainer}>
      <CustomHeader showImage showBack />
      <TittleHeader title={staticConstant.createChallenge.titleHeader} />
      <RootContainer>
        <View style={{marginTop: 20, height: getHeight()}}>
          <View style={{marginTop: 20, marginBottom: 140}}>
            <Label title={staticConstant.createChallenge.titleLabelOne} />
            <ParagraphContainer txt={staticConstant.createChallenge.paragraphTextOne} />
            <ButtonComponent title={staticConstant.createChallenge.buttonTitleOne} onPressFunc={navigateTo}/>
          </View>
          <View>
            <Label title={staticConstant.createChallenge.titleLabelTwo} />
            <ParagraphContainer txt={staticConstant.createChallenge.paragraphTextTwo} />
            <ButtonComponent title={staticConstant.createChallenge.buttonTitleTwo}/>
          </View>       
        </View>
      </RootContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: colors.White,
    flex: 1,
  },
});

export default CreateChallenegeScreenComponent;
