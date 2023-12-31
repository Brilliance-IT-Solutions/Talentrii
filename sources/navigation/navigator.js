import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {RouterNames} from '../constants/routeNames';
import splashScreen from '../screen/splash/splashScreen';
import {AuthContext} from '../context/context';
import {getToken, clearToken} from '../utils/GenericFunction';
import {HomeStackScreen} from './HomeStackNav';
import {AuthStackScreen} from './AuthStackNav';
import {Enums} from '../constants/Enum/enum';
import Comments from '../component/home/Comments';
import DetailProfileScreen from '../component/Profile/DetailProfileScreen';
import UpdateProfileScreen from '../screen/profile/updateProfile';

const Navigation = () => {
  const [isLogged, setisLogged] = React.useState(Enums.LoggedInStatus.initial);

  const RootStack = createStackNavigator();
  const RootStackScreen = ({}) => (
    <RootStack.Navigator>
      {isLogged === Enums.LoggedInStatus.initial ? (
        <RootStack.Screen
          name={RouterNames.SPLASH_SCREEN}
          component={splashScreen}
          options={{
            animationEnabled: true,
            headerShown: false,
          }}
        />
      ) : (
        getCurrentStack()
      )}
    </RootStack.Navigator>
  );

  const getCurrentStack = () => {
    console.log('isLogged', isLogged);
    if (isLogged == Enums.LoggedInStatus.LoggedIn) {
      return (
        <>
          <RootStack.Screen
            name="home"
            component={HomeStackScreen}
            options={{
              animationEnabled: true,
              headerShown: false,
            }}
          />
          <RootStack.Screen
            name={RouterNames.COMMENTS}
            component={Comments}
            options={{animationEnabled: true, headerShown: false}}
          />
            <RootStack.Screen
            name={RouterNames.DETAIL_PROFILE_SCREEN}
            component={DetailProfileScreen}
            options={{animationEnabled: true, headerShown: false}}
          />
            <RootStack.Screen
            name={RouterNames.UPDATE_PROFILE_SCREEN}
            component={UpdateProfileScreen}
            options={{animationEnabled: true, headerShown: false}}
          />
        </>
      );
    } else {
      return (
        <RootStack.Screen
          name="login"
          component={AuthStackScreen}
          options={{
            animationEnabled: true,
            headerShown: false,
          }}
        />
      );
    }
  };
  const authContext = React.useMemo(() => {
    return {
      signIn: async () => {
        let token = await getToken();
        if (token == null) {
          await clearToken();
          setisLogged(Enums.LoggedInStatus.LoggedOut);
        } else {
          setisLogged(Enums.LoggedInStatus.LoggedIn);
        }
      },
      signOut: async () => {
        await clearToken();
        setisLogged(Enums.LoggedInStatus.LoggedOut);
      },
    };
  }, []);

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStackScreen />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default Navigation;
