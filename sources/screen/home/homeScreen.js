import React, {useState,useEffect,useContext} from 'react';
import {
  View,
  FlatList
} from 'react-native';
import {RouterNames} from '../../constants/routeNames';
import {Enums} from '../../constants/Enum/enum';
import {AuthContext} from '../../context/context';
import {APIs} from '../../constants/api';
import axiosManager from '../../helpers/axiosHandler';
import {useFocusEffect} from '@react-navigation/native';
import {showError} from '../../component/common/toaster/toaster';
import InnerSwiper from '../../component/home/InnerSwiper';
import { width } from '../../style/responsiveSize';
import colors from '../../assets/themes/colors';
import { GlobalContext } from '../../context/Provider';

const HomeScreen = ({navigation}) => {
  const {signOut} = React.useContext(AuthContext);
  const [count, setCount] = useState(0);
  const pressLike = () => setCount(prevCount => prevCount + 1);
  const [currentRenderVideoIndex, setCurrentRenderVideoIndex] = useState(0);
  const [users, setUsers] = useState([]);
  const { authState} = useContext(GlobalContext);

  async function fetchMyAPI(pagenumber) {
    try {
      const url = `${APIs.BASE_URL}${APIs.DASHBOARD_LINK}`;
      const param = {};
      const response = await axiosManager.post(url, param);
      setUsers(response.data);
    } catch (error) {
      const data = error.response.data.response.message ? error.response.data.response.message : error.response.data.error
      if(error.response.data.response.message === "Your session has expired. Please login again to continue."){
        signOut();
      }
      showError(data);
    }
  }

  // useFocusEffect to fetch data for page 1 when the route changes
  useFocusEffect(
    React.useCallback(() => {
      fetchMyAPI();
    }, [])
  );

const handleChangeIndexvalue = ({index}) =>{
  setCurrentRenderVideoIndex(index)
}

const separator = () => {
  return <View style={{width:width,height:0.4,backgroundColor:colors.Grey}}/>;
};

  return (
    <View style={{flex: 1}}>
        <FlatList
         vertical
          data={users}
          pagingEnabled={true}
          snapToAlignment="center"
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
          ItemSeparatorComponent={separator}
        />
     </View>
  );
};
export default HomeScreen;