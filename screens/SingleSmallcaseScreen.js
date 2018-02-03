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
      <View
        style={{
          padding: 24,
          width: SCREEN_WIDTH,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <View
            style={{
              width: SCREEN_WIDTH / 2,
              height: SCREEN_WIDTH / 2,
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text>Image</Text>
          </View>

          <View
            style={{
              width: SCREEN_WIDTH / 3 + 4,
              height: SCREEN_WIDTH / 2,
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 16,
            }}
          >
            <Text>META</Text>
          </View>
        </View>
        <View
          style={{
            borderWidth: 1,
            width: SCREEN_WIDTH - 48,
            height: 100,
            marginTop: 12,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text>Rationale</Text>
        </View>
        <View
          style={{
            borderWidth: 1,
            width: SCREEN_WIDTH - 48,
            height: 100,
            marginTop: 12,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text>Diagram</Text>
        </View>
      </View>
    );
  }
}