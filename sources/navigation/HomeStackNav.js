import React, { useEffect, useState } from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RouterNames} from '../constants/routeNames';

/////////////////// SCREEN LIST /////////////////////////
import HomeScreen from '../screen/home/homeScreen';
import ProfileScreen from '../screen/profile/profileScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import colors from '../assets/themes/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import ChallengeScreen from '../screen/Challenge/ChallengeScreen';
import {ChallengeStackScreen} from './ChallengeStackNav';
import { height } from '../style/responsiveSize';
import Comments from '../component/home/Comments';
///////////////////////

const HomeStack = createStackNavigator();

const options = () => {
  return {animationEnabled: true, headerShown: false};
};

const Tab = createBottomTabNavigator();

export const HomeStackScreen = () => (
  <>
  <Tab.Navigator
    initialRouteName="home"
    screenOptions={{
      tabBarActiveTintColor: colors.Green,
      tabBarStyle: {
        height: height * 0.15,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal:20,
      },
      tabBarLabelStyle: {marginBottom: 30},
      tabBarIconStyle: {marginTop: 30},
    }}>
    <Tab.Screen
      name="homeScreen"
      component={HomeScreen}
      options={{
        tabBarLabel: 'Home',
        animationEnabled: true,
        headerShown: false,
        tabBarIcon: ({color}) => <Icon name="home" color={color} size={20} />,
      }}
    />
    <Tab.Screen
      name="profileScreen"
      component={ProfileScreen}
      options={{
        tabBarLabel: 'Profile',
        animationEnabled: true,
        headerShown: false,
        tabBarIcon: ({color}) => <Icon name="user" color={color} size={20} />,
      }}
    
    />
    <Tab.Screen
      name="challengeScreen"
      component={ChallengeStackScreen}
      options={{
        tabBarLabel: '',
        animationEnabled: true,
        headerShown: false,
        tabBarIconStyle: {bottom: 10},
        tabBarIcon: ({color}) => (
          <Icon name="plus-circle" color={color} size={25} />
        ),
      }}
    />
    <Tab.Screen
      name="Join"
      component={ChallengeScreen}
      options={{
        tabBarLabel: 'join',
        animationEnabled: true,
        headerShown: false,
        tabBarIcon: ({color}) => <Icon name="user" color={color} size={20} />,
      }}
    />
    <Tab.Screen
      name="settings"
      component={ChallengeScreen}
      options={{
        tabBarLabel: 'settings',
        animationEnabled: true,
        headerShown: false,
        tabBarIcon: ({color}) => <Icon name="gears" color={color} size={20} />,
      }}
    />
  </Tab.Navigator>
 
  </>
  );
