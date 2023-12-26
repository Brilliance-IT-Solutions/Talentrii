import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStackScreen } from './HomeStackNav'
import { ChallengeStackScreen } from './ChallengeStackNav'
import ProfileComponent from '../component/Profile/ProfileComponent';
import colors from '../assets/themes/colors';
import Icon from 'react-native-vector-icons/FontAwesome'
const Tab = createBottomTabNavigator();
const options = () => {
    return { animationEnabled: true, headerShown: false , tabBarIcon: ({ color, size }) => (
        <Icon name="home" color={colors.Black} size={20} />
      ),}
}
export const MyTabs= () => {
  return (
    <Tab.Navigator initialRouteName="home"
    screenOptions={{
      tabBarActiveTintColor: '#e91e63',
    }}>
      <Tab.Screen name="home" component={HomeStackScreen} options={options}/>
      <Tab.Screen name="challenge" component={ChallengeStackScreen} options={options}/>
      <Tab.Screen name="profileScreen" component={ProfileComponent} options={options}/>
    </Tab.Navigator>
  );
}