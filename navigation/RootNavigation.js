import { Notifications } from 'expo';
import React from 'react';
import { StackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';

const RootStackNavigator = StackNavigator(
  {
    Main: {
      screen: HomeScreen,
    },
  },
  {
    navigationOptions: () => ({
      header: null,
    }),
  }
);

export default class RootNavigator extends React.Component {

  render() {
    return <RootStackNavigator />;
  }

}
