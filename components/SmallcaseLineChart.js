import { AreaChart, YAxis, XAxis } from 'react-native-svg-charts';
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
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
            .then(res => this.setState({ loading: false }))
            .catch(err => console.warn(err));
    }

    async mapData(points) {
        this.dataPoints = points.map(x => x.index);
        this.max = Math.max.apply(Math, this.dataPoints);
        this.min = Math.min.apply(Math, this.dataPoints);

        this.months = points.map(x => {
            let y = new Date(x.date).getMonth() + '/' + new Date(x.date).getFullYear();
            return y;
        });

        alert(this.months)

        return true;
    }

    render() {
        return (
            !this.state.loading ?
                <ScrollView
                    style={{
                        flexDirection: 'row',
                        marginBottom: 24,
                    }}
                    pinchGestureEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    horizontal={true}
                    bouncesZoom={true}
                    zoomScale={1}
                >
                    <AreaChart
                        style={{
                            marginTop: 12,
                            marginBottom: 48,
                            width: 1200,
                            height: 400,
                            backgroundColor: '#ddd',
                        }}
                        dataPoints={this.dataPoints}
                        animate={true}
                        showGrid={false}
                        svg={{
                            fill: 'rgba(134, 65, 244, 0.2)',
                            stroke: 'rgb(134, 65, 244, 0.8)',
                        }}
                        contentInset={{ top: 20, bottom: 30 }}
                    />
                    <YAxis
                        style={{ position: 'absolute', top: 0, bottom: 0 }}
                        dataPoints={this.dataPoints}
                        min={this.min}
                        max={this.max}
                        labelStyle={{
                            fontSize: 8,
                            color: 'black',
                        }}
                        contentInset={{ top: 20, bottom: 30 }}
                    />
                    <XAxis
                        style={{ position: 'absolute', left: 0, bottom: 32, right: 0 }}
                        values={this.months}
                        labelStyle={{
                            fontSize: 12,
                            color: 'black',
                        }}
                        chartType={XAxis.Type.BAR}
                        contentInset={{ top: 20, bottom: 30 }}
                        formatLabel={(value, index) => {
                            return value;
                        }}

                    />
                </ScrollView>
                :
                <View />
        );
    }
}