import React from 'react';
import { AreaChart, Grid } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;

class AreaChartExample extends React.PureComponent {
  render() {
    const chartConfig = {
      backgroundGradientFrom: '#fff',
      backgroundGradientFromOpacity: 0,
      backgroundGradientTo: '#ffff',
      backgroundGradientToOpacity: 0.5,
      color: (opacity = 1) => `rgba(73, 95, 117, ${opacity})`,
      strokeWidth: 2, // optional, default 3
      barPercentage: 0.5,
      useShadowColorFromDataset: false, // optional
    };

    const data = {
      labels: ['Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat','Sun'],
      datasets: [
        {
          data: [3, 5, 6, 4, 7, 4,5],
          color: (opacity = 1) => `rgba(84, 90, 95, ${opacity})`, // optional
          strokeWidth: 4, // optional
        },
      ],
       // optional
    };

    return (
      <LineChart
      style={{}}
        data={data}
        width={screenWidth}
        height={256}
        chartConfig={chartConfig}
        bezier
      />
    );
  }
}

export default class App extends React.Component {
  render() {
    return <AreaChartExample />;
  }
}
