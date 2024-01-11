import React, {useEffect, useState, useRef, useContext} from 'react';
import {
  View,
  Text,
  Image,
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
import {Dimensions} from 'react-native';
import {getUser} from '../../utils/GenericFunction';
import {useFocusEffect} from '@react-navigation/native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import RootContainer from '../rootContainer/rootContainer';
import {staticConstant} from '../../constants/staticData/staticConstant';
import ProfileHeader from '../customHeader/profileHeader';
import ButtonComponent from '../common/Buttons/buttonComponent';
import ChallengeCardProfile from './ChallengeCardProfile';
import Icon from '../common/IconCount/Icons';
import {GlobalContext} from '../../context/Provider';
import fontFamily from '../../style/fontFamily';
const ProfileComponent = ({userId}) => {
  const navigation = useNavigation();
  const [userdetail, setUserDetail] = useState([]);
  const [LoggedInUserId, setLoggedInUserId] = useState('');
  const [UserId, setUserId] = useState(0);
  const layout = useWindowDimensions();
  const {authState} = useContext(GlobalContext);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState(staticConstant.Profile.routeTabs);

  const test = () => {
    navigation.navigate(RouterNames.UPDATE_PROFILE_SCREEN);
  };

  // Dummy data for users who are following the profile user
  const followedBy = [
    {
      id: 'follower1',
      imageUrl:
        'https://dutchuppblob.s3.amazonaws.com/originals/1698196732122/lavender-1595581_1280.jpg',
    },
    {
      id: 'follower2',
      imageUrl:
        'https://dutchuppblob.s3.amazonaws.com/originals/1698196732122/lavender-1595581_1280.jpg',
    },
    {
      id: 'follower3',
      imageUrl:
        'https://dutchuppblob.s3.amazonaws.com/originals/1698196732122/lavender-1595581_1280.jpg',
    },
  ];
  
  useEffect(() => {
    if (!userId) {
      getUser()
        .then(data => {
          const userDetailID = data ? JSON.parse(data) : '';
          setUserId(userDetailID.id);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      setUserId(userId);
    }
  }, [userId]);

  const fetchProfileApi = async () => {
    try {
      const response = await axiosManager.post(
        APIs.BASE_URL + APIs.GET_USERDETAIL_BY_USERID,
        {userId: userId},
      );
      setUserDetail(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // useFocusEffect to fetch data for page 1 when the route changes
  useFocusEffect(
    React.useCallback(() => {
      setUserDetail([]);
      fetchProfileApi();
    }, [UserId]),
  );

  // useEffect(()=>{
  //  fetchProfileApi()
  // },[userId])

  const getuserDetail = async () => {
    const data = await getUser();
    const userDetailID = data ? JSON.parse(data) : '';
    setLoggedInUserId(userDetailID.id);
  };

  useEffect(() => {
    getuserDetail();
  }, []);

  const FirstRoute = () => (
    <View style={{flex: 1, backgroundColor: colors.White}}>
      <RootContainer>
        <ChallengeCardProfile userdetail={userdetail} />
      </RootContainer>
    </View>
  );

  const SecondRoute = () => <View style={{flex: 1}} />;
  const ThirdRoute = () => <View style={{flex: 1}} />;

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });

  const renderTabBar = props => {
    return (
      <View
        style={{
          marginTop: 0,
          borderBottomWidth: 1,
          borderColor: colors.lightGrey,
        }}>
        <TabBar
          {...props}
          style={{backgroundColor: colors.White, elevation: 0, height: 55}}
          indicatorStyle={{backgroundColor: colors.Green, height: 2}}
          renderLabel={({route}) => (
            <View style={{alignItems: 'center', alignContent: 'center'}}>
              <Icon
                name={route.icon}
                label={route.title}
                size={15}
                iconColor={
                  route.key ===
                  props.navigationState.routes[props.navigationState.index].key
                    ? colors.Green
                    : colors.Grey
                }
              />
            </View>
          )}
        />
      </View>
    );
  };

  return (
    <View style={styles.rootContainer}>
      <ProfileHeader userName={userdetail.firstName} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 10,
        }}>
        <View>
          <Image
            style={styles.bioDataImage}
            source={{
              uri:
                userdetail.profileImage !== 'undefined' &&
                userdetail.profileImage !== null
                  ? userdetail.profileImage
                  : IMAGES.USER_DEFAULT_ICON,
            }}
            resizeMode="contain"
          />

          <Text
            style={{
              color: colors.Black,
              fontFamily: fontFamily.medium,
              fontSize: 10,
            }}>
            {userdetail.firstName}
          </Text>
          <Text
            style={{
              color: colors.Black,
              fontFamily: fontFamily.regular,
              fontSize: 10,
            }}>
            {'Creative Digital Agency'}
          </Text>
          <Text
            style={{
              color: colors.Green,
              fontFamily: fontFamily.regular,
              fontSize: 10,
            }}>
            {'linktre./Amandeep'}
          </Text>
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              marginHorizontal: 5,
            }}>
            <MultiLineContainer
              txt1={'2'}
              txt2={'Posts'}
              fontSizetxt1={13}
              color={colors.Black}
              align={'center'}
              fontSizetxt2={10}
              style={{marginBottom: 0}}
            />
            <MultiLineContainer
              txt1={'10'}
              txt2={'Followers'}
              fontSizetxt1={13}
              color={colors.Black}
              align={'center'}
              fontSizetxt2={10}
              style={{marginBottom: 0}}
            />
            <MultiLineContainer
              txt1={'120'}
              txt2={'Following'}
              fontSizetxt1={13}
              color={colors.Black}
              align={'center'}
              fontSizetxt2={10}
              style={{marginBottom: 0}}
            />
          </View>
        </View>
      </View>

      <View
        style={{
          marginHorizontal: 10,
          marginVertical: 10,
          flexDirection: 'row',
          alignItems:'center',
        
        }}>
        {followedBy &&
          followedBy.map((item, index) => (
            <View key={item.id}>
            <Image
              source={{uri: item.imageUrl}}
              style={{
                width: 15,
                height: 15,
                borderRadius: 50
              }}
              />
              </View>
          ))}
        <Text
          style={{
            color: colors.Black,
            fontFamily: fontFamily.medium,
            fontSize: 10,
            marginHorizontal:5,
            flex:1,
            flexWrap:'wrap'
          }}>
          Followed By Aajizz,Richard and 6 others
        </Text>
      </View>

      {+LoggedInUserId === +UserId && (
        <View style={{flexDirection: 'row', marginHorizontal: 10}}>
          <View style={{flex: 1, marginRight: 6}}>
            <ButtonComponent
              title={'Edit Profile'}
              buttonStyle={styles.btnStyle}
              textStyle={styles.textStyle}
              width={'100%'}
              onPressFunc={test}
            />
          </View>
          <View style={{flex: 1, marginLeft: 6}}>
            <ButtonComponent
              title={'Share Profile'}
              buttonStyle={styles.btnStyle}
              textStyle={styles.textStyle}
              width={'100%'}
            />
          </View>
        </View>
      )}
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
