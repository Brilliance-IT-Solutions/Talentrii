import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  FlatList
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
import {Enums} from '../../constants/Enum/enum';
import {staticConstant} from '../../constants/staticData/staticConstant';
import ProfileHeader from '../customHeader/profileHeader';
import ButtonComponent from '../common/Buttons/buttonComponent';
import IconCont from '../common/IconCount/iconCount';
import ChallengeCardProfile from './ChallengeCardProfile';
import CustomFooter from '../customHeader/footer';
import Icon from '../common/IconCount/Icons';

const ProfileComponent = ({userId}) => {
  const navigation = useNavigation();
  const [userdetail, setUserDetail] = useState([]);
  const [LoggedInUserId, setLoggedInUserId] = useState('');
  const [UserId, setUserId] = useState(0);
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState(staticConstant.Profile.routeTabs);

  const test = () => {
    navigation.navigate(RouterNames.UPDATE_PROFILE_SCREEN);
  };

   // Dummy data for users who are following the profile user
   const followedBy = [
    { id: 'follower1', imageUrl: 'https://dutchuppblob.s3.amazonaws.com/originals/1698196732122/lavender-1595581_1280.jpg' },
    { id: 'follower2', imageUrl: 'https://dutchuppblob.s3.amazonaws.com/originals/1698196732122/lavender-1595581_1280.jpg' },
    { id: 'follower3', imageUrl: 'https://dutchuppblob.s3.amazonaws.com/originals/1698196732122/lavender-1595581_1280.jpg' },
  ];
  useEffect(() => {
    if (!userId) {
      getUser().then(data=>{
        const userDetailID = data ? JSON.parse(data) : '';
        setUserId(userDetailID.id)
      }).catch(error=>{console.log(error)});
    } else {
      setUserId(userId)
    }
  }, [userId]);

  const fetchProfileApi = async () => {
    try {
      const response = await axiosManager.post(
        APIs.BASE_URL + APIs.GET_USERDETAIL_BY_USERID,
        {userId: UserId},
      );
      setUserDetail(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // useFocusEffect to fetch data for page 1 when the route changes
  useFocusEffect(
    React.useCallback(() => {
      setUserDetail([])
      fetchProfileApi();
    }, [UserId])
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
    <View style={{flex: 1, backgroundColor: colors.lightGrey}}>
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
              <Icon name={route.icon} label={route.title} size={15} iconColor={
                  route.key ===
                  props.navigationState.routes[props.navigationState.index].key
                    ? colors.Green
                    : colors.Black
                }/>
            </View>
          )}
        />
      </View>
    );
  };

  return (
    <View style={styles.rootContainer}>
      <ProfileHeader userName={userdetail.firstName}/>
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
                userdetail.profileImage !== 'null'
                  ? userdetail.profileImage
                  : IMAGES.USER_DEFAULT_ICON,
            }}
            resizeMode="contain"
          />
          <Text>{userdetail.firstName}</Text>
          <Text>{'Creative Digital Agency'}</Text>
          <Text>{'linktre./Amandeep'}</Text>
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
              fontSizetxt2={12}
            />
            <MultiLineContainer
              txt1={'10'}
              txt2={'Followers'}
              fontSizetxt1={13}
              color={colors.Black}
              align={'center'}
              fontSizetxt2={12}
            />
            <MultiLineContainer
              txt1={'120'}
              txt2={'Following'}
              fontSizetxt1={13}
              color={colors.Black}
              align={'center'}
              fontSizetxt2={12}
            />
          </View>
        </View>
      </View>

      <View style={{marginHorizontal: 10, marginVertical: 10}}>
      <FlatList
          data={followedBy}
          keyExtractor={(item) => item.id}
          horizontal
          renderItem={({ item }) => (
          
            <Image
              source={{ uri: item.imageUrl }}
              style={{ width: 15,
                height: 15,
                borderRadius: 50
                }}
              />
              
          )}
        />
        <Text>Followed By Aajizz,Richard and 6 others</Text>
      </View>

      {+LoggedInUserId === +UserId && (
        <View style={{flexDirection: 'row', marginHorizontal: 10}}>
          <View style={{flex: 1, marginRight: 10}}>
            <ButtonComponent
              title={'Edit Profile'}
              buttonStyle={styles.btnStyle}
              textStyle={styles.textStyle}
              width={'100%'}
              onPressFunc={test}
            />
          </View>
          <View style={{flex: 1, marginLeft: 10}}>
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
