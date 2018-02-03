import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import HomeScreen from '../screens/BottomBar/HomeScreen';
import JobsScreen from '../screens/BottomBar/JobsScreen';
import MoreScreen from '../screens/BottomBar/MoreScreen';
import NotificationsScreen from '../screens/BottomBar/NotificationsScreen';

export default TabNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Notifications: {
      screen: NotificationsScreen,
    },
    Jobs: {
      screen: JobsScreen,
    },
    More: {
      screen: MoreScreen,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Home': iconName = 'md-home'; break;
          case 'Notifications': iconName = 'md-notifications'; break;
          case 'Jobs': iconName = 'md-briefcase'; break;
          case 'More': iconName = 'md-more'; break;          
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: true,
  }
);
