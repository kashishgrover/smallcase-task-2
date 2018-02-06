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
        this.dates = points.map(x => {
            let date = new Date(x.date);
            date = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
            return date;
        });
        return true;
    }

    render() {
        return (
            !this.state.loading ?
                <View>
                    <ScrollView
                        style={{
                            flexDirection: 'row',
                        }}
                        pinchGestureEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        horizontal={true}
                        zoomScale={1}
                    >
                        <AreaChart
                            style={{
                                marginTop: 12,
                                marginBottom: 24,
                                width: 1200,
                                height: 400,
                                backgroundColor: '#ddd',
                            }}
                            dataPoints={this.dataPoints}
                            animate={false}
                            showGrid={false}
                            svg={{
                                fill: 'rgba(134, 65, 244, 0.2)',
                                stroke: 'rgb(134, 65, 244, 0.8)',
                            }}
                            contentInset={{ top: 20, bottom: 30 }}
                        />
                    </ScrollView>
                    <YAxis
                        style={{ position: 'absolute', top: 0, bottom: 0 }}
                        dataPoints={this.dataPoints}
                        labelStyle={{
                            fontSize: 8,
                            color: 'black',
                        }}
                        contentInset={{ top: 20, bottom: 30 }}
                    />
                    <XAxis
                        style={{ position: 'absolute', left: 0, bottom: 32, right: 0 }}
                        values={this.dates}
                        labelStyle={{
                            fontSize: 12,
                            color: 'black',
                        }}
                        chartType={XAxis.Type.BAR}
                    // contentInset={{ top: 20, bottom: 30 }}
                    />
                </View>
                :
                <View />
        );
    }
}