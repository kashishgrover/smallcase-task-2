import React from 'react';

import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';

import { observer, inject } from 'mobx-react';
import { FeedImage } from '../components/FeedImage';

import { SCREEN_WIDTH } from '../assets/constants';

@inject('store')
@observer
export default class SingleSmallcaseScreen extends React.Component {

  render() {
    return (
      <View>
      </View>
    );
  }
}