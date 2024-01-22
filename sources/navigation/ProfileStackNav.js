import React,{useEffect} from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { RouterNames } from '../constants/routeNames';

/////////////////// SCREEN LIST /////////////////////////
import ProfileScreen from '../screen/profile/profileScreen';
import UpdateProfileScreen from '../screen/profile/updateProfile';
import DetailProfileScreen from '../component/Profile/DetailProfileScreen';
import { getUser } from '../utils/GenericFunction';
import { useNavigation } from '@react-navigation/native';
///////////////////////

const ProfileStack = createStackNavigator();

const options = () => {
    return { animationEnabled: false, headerShown: false }
}

export const ProfileStackScreen = () => {
const navigation = useNavigation()

  useEffect(() => {
      const getuser = async () =>{
          const data = await getUser();
          const userDetailID = data ? JSON.parse(data) : '';
          navigation.navigate(RouterNames.PROFILE_SCREEN, { userId :  userDetailID.id});
      }
      getuser();
  }, []);
return(
    <ProfileStack.Navigator>
        <ProfileStack.Screen name={RouterNames.PROFILE_SCREEN} component={ProfileScreen} options={options}/> 
        <ProfileStack.Screen name={RouterNames.UPDATE_PROFILE_SCREEN} component={UpdateProfileScreen} options={options}/>
        <ProfileStack.Screen name={RouterNames.DETAIL_PROFILE_SCREEN} component={DetailProfileScreen} options={options}/>        
    </ProfileStack.Navigator>
)
}