import { AreaChart } from 'react-native-svg-charts';
import React from 'react';
import { View, Text } from 'react-native';
import { SCREEN_WIDTH } from '../assets/constants';

export class SmallcaseLineChart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        }
    }

    componentDidMount() {
        this.mapData(this.props.data.points)
            .then(res => {
                this.dataPoints = res;
                this.setState({ loading: false })
            })
            .catch(err => console.warn(err));
    }

    async mapData(points) {
        let dataPoints = points.map(x => x.index);
        return dataPoints;
    }

    render() {
        return (
            !this.state.loading ?
                <AreaChart
                    style={{
                        marginTop: 12,
                        marginBottom: 48,
                        width: SCREEN_WIDTH - 48,
                        height: 200,
                        backgroundColor: '#ddd'
                    }}
                    dataPoints={this.dataPoints}
                    svg={{
                        fill: 'rgba(134, 65, 244, 0.2)',
                        stroke: 'rgb(134, 65, 244)',
                    }}
                    contentInset={{ top: 20, bottom: 30 }}
                />
                :
                <View />
        );
    }
}