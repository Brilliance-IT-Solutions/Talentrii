import React, {useRef, useState} from 'react';
import {
  View,
  FlatList
} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import CustomFooter from '../../component/customHeader/footer';
import {RouterNames} from '../../constants/routeNames';
import {Enums} from '../../constants/Enum/enum';
import {AuthContext} from '../../context/context';
import {GlobalContext} from '../../context/Provider';
import {dashboardAction} from '../../context/actions/dashboardAction';
import {
  DASHBOARD_FAIL,
  DASHBOARD_LOADING,
  DASHBOARD_SUCCESS,
} from '../../constants/actionTypes';
import {APIs} from '../../constants/api';
import axios from 'react-native-axios';
import axiosManager from '../../helpers/axiosHandler';
import {useFocusEffect} from '@react-navigation/native';
import {width, height} from '../../style/responsiveSize';
import {getHeight} from '../../utils/GenericFunction';
import {showError} from '../../component/common/toaster/toaster';
import InnerSwiper from '../../component/home/InnerSwiper';
import HomeComponent from '../../component/home/HomeComponent';

const HomeScreen = ({navigation}) => {
  const {signOut} = React.useContext(AuthContext);
  const [pause, setPause] = useState(false);
  const [count, setCount] = useState(0);
  const pressLike = () => setCount(prevCount => prevCount + 1);
  const [currentRenderVideoIndex, setCurrentRenderVideoIndex] = useState(0);
  // const { authState, authDispatch} = useContext(GlobalContext);
  const [users, setUsers] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 95,
    waitForInteraction: true,
  };

  const videoRef = useRef(null);
  const onBuffer = e => {
    // setIsLoading(false)
    //    buffering: true
    // console.log("buffering....", e)
  };
  const onError = e => {
    // console.log("error released....", e)
  };
  const onLoad = e => {
    // console.log("error loader....", e)
    /* set loader to true*/
  };

  const navigatePage = index => {
    var link = RouterNames.HOME_SCREEN;
    switch (index) {
      case Enums.HomeIconRedirection.HOME:
        link = RouterNames.HOME_SCREEN;
        break;
      case Enums.ChallengeIconRedirection.CREATE_CHALLENGE_SCREEN:
        (link = RouterNames.CHALLENGE), {screen: RouterNames.CHALLENGE_SCREEN};
        break;
      case Enums.HomeIconRedirection.PROFILE:
        link = RouterNames.PROFILE_SCREEN;
        break;
      default:
        break;
    }
    // console.log("....", link)
    navigation.navigate(link);
  };
  const onViewableItemsChanged = ({viewableItems, changed}) => {
    if (viewableItems !== undefined) {
      if (viewableItems.length > 0) {
        // console.log(viewableItems[0].index)
        setCurrentRenderVideoIndex(viewableItems[0].index ?? 0);
      }
    }
  };

  async function fetchMyAPI() {
    try {
      const url = APIs.BASE_URL + APIs.DASHBOARD_LINK;
      const param = {};
      const response = await axiosManager.post(url, param);
      console.log(response)
      setUsers(response.data);
    } catch (error) {
      console.log('gfhhhhhhhhhhhhhh', error);
      // const data = error.response.data.response.message ? error.response.data.response.message : error.response.data.error
      // showError(data);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchMyAPI(); // Refresh data when the screen gains focus
    }, []),
  );

  // const callDashboardAPI = async () => {

  //     authDispatch({
  //         type: DASHBOARD_LOADING
  //     })
  //     try {
  //         const res = await dashboardAction();
  //         authDispatch({
  //             type: DASHBOARD_SUCCESS,
  //             payload: res
  //         })
  //         setUsers(res)

  //     } catch (error) {
  //          console.log("error is ", error)
  //         authDispatch({
  //             type: DASHBOARD_FAIL,
  //             payload: error
  //         });
  //     }
  //   }
const handleChangeIndexvalue = ({index}) =>{
  setCurrentRenderVideoIndex(index)
}
  return (
    <View style={{flex: 1,height:height}}>
      <View>
        <FlatList
         vertical
          data={users}
          pagingEnabled={true}
          decelerationRate={'fast'}
          disableintervalmomentum={true}   
          onChangeIndex={handleChangeIndexvalue}   
          removeClippedSubviews={true} 
          maxToRenderPerBatch={1}
          renderItem={({item, index}) => (
              <InnerSwiper innerdata={item} index={index} currentIndex={currentRenderVideoIndex}/>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 0,
          }}>
          <CustomFooter
            didTapped={index => {
              console.log('sf', index);
              navigatePage(index);
            }}
          />
        </View>
      </View>
    </View>
  );
};
export default HomeScreen;