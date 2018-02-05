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
  ActivityIndicator,
} from 'react-native';

import { observer, inject } from 'mobx-react';
import { FeedImage } from '../components/FeedImage';
import { SCREEN_WIDTH } from '../assets/constants';

@inject('store')
@observer
export default class SingleSmallcaseScreen extends React.Component {

  constructor(props) {
    super(props);

    this.image = this.props.navigation.state.params.image;
    this.scid = this.props.navigation.state.params.scid;

    this.rationale = '';
    this.info = {};

    this.state = {
      loading: true,
    }
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest() {
    this.props.store.loadSmallcase(this.scid)
      .then((res) => {
        this.rationale = res.rationale;
        this.info = res.stats;
        this.setState({ loading: false });
      })
      .catch((err) => {
        console.warn('Unable to fetch data!')
      })
  }

  render() {
    let indexValue, monthly, yearly;

    if (!this.state.loading) {
      indexValue = this.info.indexValue.toFixed(2);
      monthly = this.info.returns.monthly.toFixed(2);
      yearly = this.info.returns.yearly.toFixed(2);
    }

    return (
      this.state.loading ?
        <ActivityIndicator style={{ marginTop: 48 }} size="large" />
        :
        <ScrollView
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
            <Image
              source={{ uri: this.image, cache: 'reload' }} //force-cache
              style={{
                width: SCREEN_WIDTH / 2,
                height: SCREEN_WIDTH / 2,
                borderRadius: 8,
              }}
            />
            <View
              style={{
                width: SCREEN_WIDTH / 3 + 4,
                height: SCREEN_WIDTH / 2,
                marginLeft: 16,
              }}
            >
              <Text style={{ fontSize: 18, color: '#666' }}>
                <Text style={{ fontWeight: '600' }}>Index: </Text>
                <Text>{indexValue}</Text>
              </Text>
              <Text style={{ fontSize: 18, color: '#333', marginTop: 48, fontWeight: '700' }}>
                Returns
              </Text>
              <Text style={{ fontSize: 16, color: '#666' }}>
                <Text style={{ fontWeight: '600' }}>Monthly: </Text>
                <Text>{monthly}</Text>
              </Text>
              <Text style={{ fontSize: 16, color: '#666' }}>
                <Text style={{ fontWeight: '600' }}>Yearly: </Text>
                <Text>{yearly}</Text>
              </Text>
            </View>
          </View>
          <View
            style={{
              width: SCREEN_WIDTH - 48,
              marginTop: 12,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                color: '#333',
                fontSize: 16,
                lineHeight: 24,
              }}
            >
              {this.rationale}
            </Text>
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
        </ScrollView>
    );
  }
}