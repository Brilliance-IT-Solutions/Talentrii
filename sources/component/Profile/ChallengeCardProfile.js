import react, {useRef} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import styles from './styles';
import Video from 'react-native-video';
import {IMAGES} from '../../constants/images';
import colors from '../../assets/themes/colors';
import {useNavigation} from '@react-navigation/native';
import {RouterNames} from '../../constants/routeNames';
import UserProfile from '../common/profile/profile';
import ProfileIconCount from '../common/profile/iconCount';

const ChallengeCardProfile = ({userdetail}) => {
  const videoRef = useRef(null);

  const navigation = useNavigation();

  const navigateTo = item => {
    navigation.navigate(RouterNames.DETAIL_PROFILE_SCREEN, {
      userName: userdetail.userName,
      userProfile: userdetail.profileImage,
      challengeId: item,
    });
  };

  const onBuffer = e => {
    // console.log("buffering....", e)
  };
  const onError = e => {
    // console.log("error released....", e)
  };
  const onLoad = e => {};

  const onVideoLoadStart = () => {};

  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}>
      {userdetail?.media &&
        userdetail?.media?.map((items, i) => (
          <View key={items.id} style={{marginTop: 15}}>
            {items.inner &&
              items.inner.map((item, index) => (
                <TouchableOpacity
                  onPress={() => navigateTo(item.challenge_id)}
                  key={item.id}>
                  {index === 0 ? (
                    <View style={{marginHorizontal: 10, marginVertical: 2}}>
                      {item.type === 'video/mp4' ? (
                        <View
                          style={[
                            styles.bottomHistoryView,
                            {backgroundColor: colors.White, padding: 10},
                          ]}>
                          <Video
                            poster={item.thumbnail_url}
                            posterResizeMode={'cover'}
                            source={{uri: item.original_url}}
                            ref={videoRef}
                            onBuffer={onBuffer}
                            onError={onError}
                            style={styles.bottomHistoryImage}
                            muted
                            paused={true}
                            onLoadStart={onVideoLoadStart}
                            onLoad={onLoad}
                            resizeMode="cover"></Video>
                         <UserProfile userName={userdetail.userName} location={"Noida India"}/>
                         <ProfileIconCount likecount={item.likes_count}  commentcount={item.comments_count}/>
                        </View>
                      ) : (
                        <View
                          style={[
                            styles.bottomHistoryView,
                            {backgroundColor: colors.White, padding: 10},
                          ]}>
                          <Image
                            source={{
                              uri:
                                item.original_url !== 'undefined' ||
                                item.original_url !== 'null'
                                  ? item.original_url
                                  : IMAGES.USER_DEFAULT_ICON,
                            }}
                            style={[
                              styles.bottomHistoryImage,
                              {resizeMode: 'cover'},
                            ]}
                          />
                          {items.inner.length > 1 && (
                            <Image
                              source={{
                                uri: 'https://cdn.iconscout.com/icon/premium/png-256-thumb/multi-post-1702546-1486961.png?f=webp',
                              }}
                              style={{
                                position: 'absolute',
                                right: 0,
                                height: 20,
                                width: 20,
                                resizeMode: 'contain',
                                paddingHorizontal: 5,
                              }}
                            />
                          )}
                          <UserProfile userName={userdetail.userName} location={"Noida India"}/>
                           <ProfileIconCount likecount={item.likes_count} commentcount={item.comments_count}/>
                        </View>
                      )}
                    </View>
                  ) : null}
                </TouchableOpacity>
              ))}
          </View>
        ))}
    </View>
  );
};

export default ChallengeCardProfile;
