import React, {useState,useEffect} from 'react';
import {
  View,
  FlatList
} from 'react-native';
import CustomFooter from '../../component/customHeader/footer';
import {RouterNames} from '../../constants/routeNames';
import {Enums} from '../../constants/Enum/enum';
import {AuthContext} from '../../context/context';
import {APIs} from '../../constants/api';
import axiosManager from '../../helpers/axiosHandler';
import {useFocusEffect} from '@react-navigation/native';
import {height} from '../../style/responsiveSize';
import {showError} from '../../component/common/toaster/toaster';
import InnerSwiper from '../../component/home/InnerSwiper';
import HomeComponent from '../../component/home/HomeComponent';
import DoubleTap from "@memrearal/react-native-doubletap";
import { getUser } from '../../utils/GenericFunction';

const HomeScreen = ({navigation}) => {
  const {signOut} = React.useContext(AuthContext);
  const [count, setCount] = useState(0);
  const pressLike = () => setCount(prevCount => prevCount + 1);
  const [currentRenderVideoIndex, setCurrentRenderVideoIndex] = useState(0);
  const [users, setUsers] = useState([]);
  const [userDetail, setUserDetail] = useState('');

  
  const getuserDetail = async () =>{
    const data = await getUser();
    const userDetailID = data ? JSON.parse(data) : ''
  setUserDetail(userDetailID.id)
 }

 useEffect(()=>{
   getuserDetail()
 },[])

  const navigatePage = index => {
    var link = RouterNames.HOME_SCREEN;
    var params = {};
    switch (index) {
      case Enums.HomeIconRedirection.HOME:
        link = RouterNames.HOME_SCREEN;
        break;
      case Enums.ChallengeIconRedirection.CREATE_CHALLENGE_SCREEN:
        (link = RouterNames.CHALLENGE), {screen: RouterNames.CHALLENGE_SCREEN};
        break;
      case Enums.HomeIconRedirection.PROFILE:
        link = RouterNames.PROFILE_SCREEN;
        params = {userId : userDetail}
        break;
      default:
        break;
    }
    navigation.navigate(link,params);
  };

  async function fetchMyAPI(pagenumber) {
    try {
      const url = `${APIs.BASE_URL}${APIs.DASHBOARD_LINK}`;
      const param = {};
      const response = await axiosManager.post(url, param);
      setUsers(response.data);
    } catch (error) {
      console.log('gfhhhhhhhhhhhhhh', error);
      const data = error.response.data.response.message ? error.response.data.response.message : error.response.data.error
      showError(data);
    }
  }

  // useFocusEffect to fetch data for page 1 when the route changes
  useFocusEffect(
    React.useCallback(() => {
      fetchMyAPI();
    }, [])
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
    <View style={{flex: 1}}>
      <View>
        <FlatList
         vertical
          data={users}
          pagingEnabled={true}
          decelerationRate={'fast'}
          disableintervalmomentum={true}   
          onChangeIndex={handleChangeIndexvalue}   
          removeClippedSubviews={true} 
          initialScrollIndex={0}
          maxToRenderPerBatch={1}
          renderItem={({item, index}) => (
              <InnerSwiper innerdata={item} index={index} currentIndex={currentRenderVideoIndex}/>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        {/* <View
          style={{
            position: 'absolute',
            bottom: 0,
          }}>
          <CustomFooter
            didTapped={index => {
              navigatePage(index);
            }}
          />
        </View> */}
      </View>
    </View>
  );
};
export default HomeScreen;