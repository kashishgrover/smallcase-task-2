import React from 'react';

import {
  Image,
  ScrollView,
  Text,
  View,
  ActivityIndicator,
  NetInfo,
  AsyncStorage,
} from 'react-native';

import { Toast } from 'native-base';

import { observer, inject } from 'mobx-react';
import HTML from 'react-native-render-html';

import { FeedImage } from '../components/FeedImage';
import { SmallcaseLineChart } from '../components/SmallcaseLineChart';
import { SCREEN_WIDTH } from '../assets/constants';

@inject('store')
@observer
export default class SingleSmallcaseScreen extends React.Component {

  constructor(props) {
    super(props);

    this.image = this.props.navigation.state.params.image;
    this.scid = this.props.navigation.state.params.scid;

    this.rationale = '';
    this.stats = {};
    this.info = {};

    this.state = {
      loading: true,
      graphLoading: true,
    }
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest() {

    NetInfo.getConnectionInfo().then((connectionInfo) => {
      if (connectionInfo.type === 'none') {
        Toast.show({
          text: 'Not Connected to internet!',
          type: 'warning',
          position: 'top',
        });
        this.checkAsync();
      }
    });

    this.props.store.loadSmallcase(this.scid)
      .then((res) => {
        this.rationale = res.rationale;
        this.stats = res.stats;
        this.info = res.info;
        this.setState({ loading: false });
      })
      .catch((err) => {
        Toast.show({
          text: 'Unable to fetch data!',
          type: 'warning',
          position: 'top',
        })
      })

    this.props.store.loadHistorical(this.scid)
      .then((res) => {
        this.historical = res;
        this.setState({ graphLoading: false });
      })
      .catch((err) => {
        Toast.show({
          text: 'Unable to fetch historical data!',
          type: 'warning',
          position: 'top',
        })
      })
  }

  checkAsync() {
    AsyncStorage.getItem(this.scid)
      .then((res) => {
        res = JSON.parse(res);
        if (res.rationale)
          this.rationale = res.rationale;
        if (res.stats)
          this.stats = res.stats;
        if (res.info)
          this.info = res.info;
        if (res.historical) {
          this.historical = res.historical;
          this.setState({ graphLoading: false })
        }
        this.setState({ loading: false });
      })
      .catch(err => {
        console.warn(err);
      });
  }

  render() {
    let indexValue, monthly, yearly, name, type;

    if (!this.state.loading) {
      indexValue = this.stats.indexValue.toFixed(2);
      monthly = this.stats.returns.monthly.toFixed(2);
      yearly = this.stats.returns.yearly.toFixed(2);
      name = this.info.name;
      type = this.info.type;
    }

    return (
      this.state.loading ?
        <ActivityIndicator style={{ marginTop: 48 }} size="large" />
        :
        <ScrollView
          style={{
            paddingHorizontal: 24,
            width: SCREEN_WIDTH,
          }}
        >
          <Text style={{ fontSize: 22, color: '#333', fontWeight: '700', marginTop: 24 }}>
            <Text>{name}</Text>
          </Text>
          <Text style={{ fontSize: 16, color: '#999', fontWeight: '700', marginBottom: 24 }}>
            <Text>{type}</Text>
          </Text>
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
            <HTML
              html={'<p>' + this.rationale + '</p>'}
              tagsStyles={{
                i: {
                  fontSize: 16,
                  fontStyle: 'italic',
                },
                em: {
                  fontWeight: '600',
                },
                ul: {
                  marginTop: 16,
                },
                ol: {
                  marginTop: 16,
                },
                li: {
                }
              }}
            />
          </View>
          {this.state.graphLoading ?
            <ActivityIndicator size="large" style={{ height: 400, alignSelf: 'center', justifyContent: 'center' }} />
            :
            <SmallcaseLineChart data={this.historical} />
          }
        </ScrollView>
    );
  }
}