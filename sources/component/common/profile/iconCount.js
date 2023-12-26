import react from 'react';
import { View } from 'react-native';
import Icon from '../IconCount/Icons';
import colors from '../../../assets/themes/colors';

const ProfileIconCount = ({likecount,commentcount,sharecount}) =>{
    return (
        <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          padding: 10,
        }}>
        <Icon  name={'thumbs-o-up'} size={13} label={'Like'} count={likecount} iconColor={colors.grey}/>
        <Icon  name={'comment-o'} size={13} label={'Comment'} count={commentcount} iconColor={colors.grey}/>
          <Icon  name={'share-alt'} size={13} label={'Share'} count={sharecount} iconColor={colors.grey}/>
      </View>
    )
}

export default ProfileIconCount;