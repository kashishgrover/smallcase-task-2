import { Notifications } from 'expo';
import React from 'react';
import { StackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import SingleSmallcaseScreen from '../screens/SingleSmallcaseScreen';

const RootStackNavigator = StackNavigator(
  {
    Main: {
      screen: HomeScreen,
    },
    SingleSmallcase: {
      screen: SingleSmallcaseScreen,
    }
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
