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

import { FeedImage } from '../components/FeedImage';
import { SCREEN_WIDTH } from '../assets/constants';

const smallcases = [
  {
    _id: 1,
    scid: 'SCMO_0002',
    image: 'https://www.smallcase.com/images/smallcases/187/SCMO_0001.png'
  },
  {
    _id: 2,
    scid: 'SCMO_0003',
    image: 'https://www.smallcase.com/images/smallcases/187/SCMO_0002.png'
  },
  {
    _id: 3,
    scid: 'SCMO_0006',
    image: 'https://www.smallcase.com/images/smallcases/187/SCMO_0001.png'
  },
  {
    _id: 4,
    scid: 'SCNM_0003',
    image: 'https://www.smallcase.com/images/smallcases/187/SCNM_0003.png'
  },
  {
    _id: 5,
    scid: 'SCNM_0007',
    image: 'https://www.smallcase.com/images/smallcases/187/SCNM_0007.png'
  },
  {
    _id: 6,
    scid: 'SCNM_0008',
    image: 'https://www.smallcase.com/images/smallcases/187/SCNM_0008.png'
  },
  {
    _id: 7,
    scid: 'SCNM_0009',
    image: 'https://www.smallcase.com/images/smallcases/187/SCNM_0009.png'
  },
  {
    _id: 8,
    scid: 'SCMO_0002',
    image: 'https://www.smallcase.com/images/smallcases/187/SCMO_0001.png'
  },
  {
    _id: 9,
    scid: 'SCMO_0003',
    image: 'https://www.smallcase.com/images/smallcases/187/SCMO_0002.png'
  },
  {
    _id: 10,
    scid: 'SCMO_0006',
    image: 'https://www.smallcase.com/images/smallcases/187/SCMO_0001.png'
  },
  {
    _id: 11,
    scid: 'SCNM_0003',
    image: 'https://www.smallcase.com/images/smallcases/187/SCNM_0003.png'
  },
  {
    _id: 12,
    scid: 'SCNM_0007',
    image: 'https://www.smallcase.com/images/smallcases/187/SCNM_0007.png'
  },
  {
    _id: 13,
    scid: 'SCNM_0008',
    image: 'https://www.smallcase.com/images/smallcases/187/SCNM_0008.png'
  },
  {
    _id: 14,
    scid: 'SCNM_0009',
    image: 'https://www.smallcase.com/images/smallcases/187/SCNM_0009.png'
  },
];

export default class HomeScreen extends React.Component {

  render() {
    return (
      <View
        style={{
          alignItems: 'center',
        }}
      >
        <FlatList
          style={{
            flexDirection: 'column',
            width: SCREEN_WIDTH
          }}
          data={smallcases}
          keyExtractor={(item, index) => item._id}
          numColumns={2}
          renderItem={(data) => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  margin: 12,
                  elevation: 3,
                }}
                onPress={() => this.props.navigation.navigate('SingleSmallcase')}
              >
                <FeedImage
                  image={data.item.image}
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
}