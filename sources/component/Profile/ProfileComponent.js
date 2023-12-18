import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {IMAGES} from '../../constants/images';
import MultiLineContainer from '../common/2LineText/multiLineText';
import styles from './styles';
import colors from '../../assets/themes/colors';
import {RouterNames} from '../../constants/routeNames';

import {useNavigation} from '@react-navigation/native';
import axiosManager from '../../helpers/axiosHandler';
import {APIs} from '../../constants/api';
import Video from 'react-native-video';
import {getHeight} from '../../utils/GenericFunction';
import {Dimensions} from 'react-native';
import {getUser} from '../../utils/GenericFunction';
import {useFocusEffect} from '@react-navigation/native';
const {width} = Dimensions.get('window');
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import RootContainer from '../rootContainer/rootContainer';

const ProfileComponent = ({userId}) => {
  const videoRef = useRef(null);
  const [userdetail, setUserDetail] = useState([]);
  const [LoggedInUserId, setLoggedInUserId] = useState('');

  const navigation = useNavigation();
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'My Challenges'},
    {key: 'second', title: 'Engaged Challenges'},
  ]);

  const navigateTo = item => {
    navigation.navigate(RouterNames.DETAIL_PROFILE_SCREEN, {
      userName : userdetail.userName,
      userProfile : userdetail.profileImage,
      challengeId : item
    });
  };

  const onBuffer = e => {
    //    buffering: true
    // console.log("buffering....", e)
  };
  const onError = e => {
    // console.log("error released....", e)
  };
  const onLoad = e => {};

  const onVideoLoadStart = () => {};

  const test = () => {
    navigation.navigate(RouterNames.UPDATE_PROFILE_SCREEN);
  };

    const fetchProfileApi = async () => {
      try {
        const response = await axiosManager.post(
          APIs.BASE_URL + '/getUserDetailById',
          {userId},
        );
        console.log('test', response.data);
        setUserDetail(response.data);
      } catch (error) {
        console.log(error);
      }
    };
   
    // useFocusEffect to fetch data for page 1 when the route changes
    useFocusEffect(
      React.useCallback(() => {
        fetchProfileApi();
      }, [])
    );

  const getuserDetail = async () => {
    const data = await getUser();
    const userDetailID = data ? JSON.parse(data) : '';
    setLoggedInUserId(userDetailID.id);
  };

  useEffect(() => {
    getuserDetail();
  }, []);

  const FirstRoute = () => (
    <View style={{flex: 1}}>
      <RootContainer>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {userdetail?.media &&
            userdetail?.media?.map((items, i) =>  (
                <View style={{padding: 3}} key={items.id}>
                  {items.inner &&
                    items.inner.map((item, index) => (
                          <TouchableOpacity onPress={() => navigateTo(item.challenge_id)} key={item.id}>
                            {index === 0 ? (
                              item.type === 'video/mp4' ? (
                                <View
                                  style={[
                                    styles.bottomHistoryView,
                                    {backgroundColor: colors.lightGrey},
                                  ]}
                                 >
                                  <Video
                                    source={{uri: item.original_url}}
                                    ref={videoRef}
                                    onBuffer={onBuffer}
                                    onError={onError}
                                    style={styles.bottomHistoryImage}
                                    muted
                                    onLoadStart={onVideoLoadStart}
                                    onLoad={onLoad}
                                    resizeMode="cover"></Video>
                                  <Text
                                    style={{
                                      position: 'absolute',
                                      color: colors.White,
                                      bottom: 0,
                                      paddingHorizontal: 5,
                                    }}>
                                    {item.likes_count}
                                  </Text>
                                </View>
                              ) : (
                                <View
                                  style={[
                                    styles.bottomHistoryView,
                                    {backgroundColor: colors.lightGrey},
                                  ]}
                                  >
                                  <Image
                                    source={{
                                      uri:
                                        item.original_url !== 'undefined' &&
                                        item.original_url !== 'null'
                                          ? item.original_url
                                          : 'https://www.iconpacks.net/icons/2/free-user-icon-3297-thumb.png',
                                    }}
                                    style={[
                                      styles.bottomHistoryImage,
                                      {resizeMode: 'cover'},
                                    ]}
                                  />
                                  <Text
                                    style={{
                                      position: 'absolute',
                                      color: colors.White,
                                      bottom: 0,
                                      paddingHorizontal: 5,
                                    }}>
                                    {item.likes_count}
                                  </Text>
                                </View>
                              )
                            ) : null}
                          </TouchableOpacity>
                      )
                    )}
                </View>
              )
            )}
        </View>
      </RootContainer>
    </View>
  );

  const SecondRoute = () => <View style={{flex: 1}} />;

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const renderTabBar = props => {
    return (
      <View style={{marginTop: 28}}>
        <TabBar
          {...props}
          style={{backgroundColor: colors.White, elevation: 0, height: 36}}
          indicatorStyle={{backgroundColor: colors.Green, height: 2}}
          renderLabel={({route}) => (
            <View>
              <Text
                style={{
                  fontSize: 13,
                  textAlign: 'center',
                  color:
                    route.key ===
                    props.navigationState.routes[props.navigationState.index]
                      .key
                      ? colors.Green
                      : colors.Black,
                }}>
                {route.title}
              </Text>
            </View>
          )}
        />
      </View>
    );
  };

  return (
    <View style={styles.rootContainer}>
      <View style={styles.bioDataSection}>
        <View style={styles.bioDataImageView}>
          <Image
            style={styles.bioDataImage}
            source={{
              uri:
                userdetail.profileImage !== 'undefined' &&
                userdetail.profileImage !== 'null'
                  ? userdetail.profileImage
                  : 'https://www.iconpacks.net/icons/2/free-user-icon-3297-thumb.png',
            }}
            resizeMode="contain"
          />
        </View>
        <View style={styles.bioDataTextView}>
          <Text style={styles.bioDataText}>{userdetail.firstName}</Text>
        </View>
        {+LoggedInUserId === +userId ? (
          <TouchableOpacity onPress={test}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={{height: 10, width: 10, marginHorizontal: 5}}
                source={IMAGES.EDIT_ICON}
                resizeMode="contain"
              />
              <Text
                style={{
                  color: 'blue',
                  textDecorationLine: 'underline',
                  fontSize: 10,
                }}>
                Edit
              </Text>
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
      {/* <View style={styles.multiLineContainerSection}>
                <MultiLineContainer txt1='20K' txt2='Followers' />
                <View style={styles.multiLineContainerCenterLine} />
                <MultiLineContainer txt1='20K' txt2='Followings' />
            </View> */}
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={index => setIndex(index)}
        initialLayout={{width: layout.width}}
      />
    </View>
  );
};
export default ProfileComponent;
