import React from 'react';
import { Image, ActivityIndicator, View, Dimensions } from 'react-native';
import { SCREEN_WIDTH } from '../assets/constants';

export class FeedImage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            width: 0,
            height: 0,
        }
        this.mounted = false;
    }

    componentDidMount() {
        this.mounted = true;
    }

    render() {

        let sideLength = SCREEN_WIDTH / 2 - 24;

        return (
            <View>
                {
                    this.state.loading &&
                    <ActivityIndicator
                        style={{
                            height: sideLength,
                            width: sideLength,
                        }}
                        size="large"
                    />
                }
                <Image
                    source={{ uri: this.props.image, cache: 'reload' }} //force-cache
                    style={{
                        height: this.state.height,
                        width: this.state.width,
                        elevation: 1,
                    }}
                    onLoadStart={() => this.mounted && this.setState({ loading: true })}
                    onLoad={() => this.mounted && this.setState({ loading: false, width: sideLength, height: sideLength })}
                />
            </View>
        );
    }
}