import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Enums} from '../../constants/Enum/enum';
import {IMAGES} from '../../constants/images';
import IconCont from '../common/IconCount/iconCount';
import colors from '../../assets/themes/colors';
import {height, width} from '../../style/responsiveSize';
import Icon from '../common/IconCount/Icons';

const bottomIconSize = 28;

const CustomFooter = props => {
  return (
    <View style={styles.footer}>
      <View style={styles.footerItem}>
        {/* <IconCont
          imageSource={IMAGES.HOME}
          width={33}
          height={32}
          onIconPress={() => props.didTapped(Enums.HomeIconRedirection.HOME)}
          label={'Home'}
          color={colors.Green}
        /> */}
        <View style={{marginHorizontal:10}}>
        <Icon name={'home'} size={20} iconColor={colors.grey} label={'Home'}  onIconPress={() => props.didTapped(Enums.HomeIconRedirection.HOME)}/>
        </View>
        {/* <IconCont
          imageSource={IMAGES.USER_PROFILE_ICON}
          width={bottomIconSize}
          height={bottomIconSize}
          onIconPress={() => props.didTapped(Enums.HomeIconRedirection.PROFILE)}
          label={'Profile'}
          color={colors.Green}
        /> */}
         <View style={{marginHorizontal:10}}>
        <Icon name={'user'} size={20} iconColor={colors.grey} label={'Profile'} onIconPress={() => props.didTapped(Enums.HomeIconRedirection.PROFILE)}/>
        </View>

        <View style={{alignSelf: 'center', bottom: 15,marginHorizontal:20}}>
          {/* <IconCont
            imageSource={IMAGES.CREATE_CHALLENGE}
            width={bottomIconSize}
            height={bottomIconSize}
            onIconPress={() =>
              props.didTapped(
                Enums.ChallengeIconRedirection.CREATE_CHALLENGE_SCREEN,
              )
            }
          /> */}
           <Icon name={'plus-circle'} size={30} iconColor={colors.grey} onIconPress={() =>
              props.didTapped(
                Enums.ChallengeIconRedirection.CREATE_CHALLENGE_SCREEN,
              )
            }/>
        </View>
        {/* <IconCont
          imageSource={IMAGES.WARNING}
          width={bottomIconSize}
          height={27}
          label={'Join'}
          color={colors.Green}
        /> */}
          <View style={{marginHorizontal:10}}>
         <Icon name={'user'} size={20} iconColor={colors.grey} label={'Join'}/>
         </View>
        {/* <IconCont
          imageSource={IMAGES.FLAGS}
          width={bottomIconSize}
          height={bottomIconSize}
          label={'Settings'}
          color={colors.Green}
        /> */}
        <View style={{marginHorizontal:10}}>
      <Icon name={'gears'} size={20} iconColor={colors.grey} label={'Settings'}/> 
      </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    width: width,
    flex: 1,
  },
  footerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'space-between',
    borderTopWidth: 1,
    paddingVertical: 12,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: colors.White,
    backgroundColor: colors.White,
    paddingTop: 23,
    paddingBottom: 23,
    paddingLeft: 20,
    paddingRight: 20,
  },
});
export default CustomFooter;
