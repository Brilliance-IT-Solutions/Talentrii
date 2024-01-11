import * as React from 'react';
import NotificationScreen from '../screen/notifilcation/notification';
import { RouterNames } from '../constants/routeNames';
import { createStackNavigator } from '@react-navigation/stack';

const NotificationStack = createStackNavigator();
const options = () => {
    return  { animationEnabled: false, headerShown: false }
}
export const NotificationSTackNav= () => {
  return (
    <NotificationStack.Navigator initialRouteName="alerts"
    screenOptions={{
      tabBarActiveTintColor: '#e91e63',
    }}>
      <NotificationStack.Screen name={RouterNames.NOTIFICATION_SCREEN} component={NotificationScreen} options={options}/>
      </NotificationStack.Navigator>
  );
}