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

const smallcases = [
  {
    _id: '0001',
    scid: 'SCMO_0001'
  },
  {

  },
  {

  }
];

@inject('store')
@observer
export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      refreshing: false,
    }
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest() {
    this.props.store.loadSmallcases('SCMO_0002')
  }

  render() {
    return (
      <View>
      </View>
    );
  }
}