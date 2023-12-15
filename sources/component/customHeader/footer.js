import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Enums} from '../../constants/Enum/enum';
import {IMAGES} from '../../constants/images';
import IconCont from '../common/IconCount/iconCount';
import colors from '../../assets/themes/colors';

const bottomIconSize = 28;

const CustomFooter = props => {
  return (
    <View style={styles.footer}>
      <IconCont
        imageSource={IMAGES.HOME}
        width={33}
        height={32}
        onIconPress={() => props.didTapped(Enums.HomeIconRedirection.HOME)}
      />
      <IconCont
        imageSource={IMAGES.WARNING}
        width={bottomIconSize}
        height={27}
      />
      <IconCont
        imageSource={IMAGES.CREATE_CHALLENGE}
        width={bottomIconSize}
        height={bottomIconSize}
        onIconPress={() => props.didTapped(Enums.ChallengeIconRedirection.CREATE_CHALLENGE_SCREEN)}
      />
      <IconCont
        imageSource={IMAGES.FLAGS}
        width={bottomIconSize}
        height={bottomIconSize}
      />

      <IconCont
        imageSource={IMAGES.USER_PROFILE_ICON}
        width={bottomIconSize}
        height={bottomIconSize}
        onIconPress={() => props.didTapped(Enums.HomeIconRedirection.PROFILE)}
      />

      {/* <IconCont
                imageSource={IMAGES.CREATE_CHALLENGE}
                width={bottomIconSize}
                height={bottomIconSize}
                onIconPress={() => props.didTapped(Enums.HomeIconRedirection.CREATE_CHALLENGE)}
            />
            <IconCont
                imageSource={IMAGES.USER_PROFILE_ICON}
                width={bottomIconSize}
                height={bottomIconSize}
                onIconPress={() =>props.didTapped(Enums.HomeIconRedirection.PROFILE)}
            /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderColor: colors.lightGrey,
    paddingVertical: 12,
  },
});
export default CustomFooter;