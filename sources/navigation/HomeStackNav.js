import React, { useEffect, useState } from 'react';
import {createStackNavigator} from '@react-navigation/stack';

/////////////////// SCREEN LIST /////////////////////////
import HomeScreen from '../screen/home/homeScreen';
import ProfileScreen from '../screen/profile/profileScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import colors from '../assets/themes/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/MaterialIcons';

import {ChallengeStackScreen} from './ChallengeStackNav';
import { height } from '../style/responsiveSize';
import { View } from 'react-native';
import { NotificationSTackNav } from './NotificationStackNav';
import fontFamily from '../style/fontFamily';
import UploadFile from '../screen/uploadScreen';
///////////////////////
const MyTabScreen = ({ focused, color }) => {
  const borderColor = focused ? colors.Green : colors.Grey;

  return (
    <View style={{
      borderRadius: 50,
      borderWidth: 8,
      paddingHorizontal: 12,
      paddingVertical:10,
      borderColor: borderColor,
    }}>
      <Icon name="plus" color={color} size={15} />
    </View>
  );
};
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
      tabBarInactiveTintColor:colors.Grey,
      tabBarStyle: {
        height: height * 0.15,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal:20,
      },
      tabBarLabelStyle: {marginBottom: 30,fontFamily:fontFamily.medium,fontSize:10},
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
      name="challenge"
      component={ChallengeStackScreen}
      options={{
        tabBarLabel: '',
        animationEnabled: true,
        headerShown: false,
        tabBarIconStyle: {bottom: -5},
        tabBarIcon: ({focused,color}) => (
          <MyTabScreen focused={focused} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="alerts"
      component={NotificationSTackNav}
      options={{
        tabBarLabel: 'Alerts',
        animationEnabled: true,
        headerShown: false,
        tabBarIcon: ({color}) => <Icons name="join-inner" color={color} size={20} />
      }}
    />
    <Tab.Screen
      name="settings"
      component={UploadFile}
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
