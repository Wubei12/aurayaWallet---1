import { View, Text } from "react-native";
import React from "react";
import { LineChart } from "react-native-wagmi-charts";

const data = [
  {
    timestamp: 1625945400000,
    value: 30575.25,
  },
  {
    timestamp: 1625946300000,
    value: 31545.25,
  },
  {
    timestamp: 1625946300000,
    value: 35545.25,
  },
  {
    timestamp: 1625946300000,
    value: 33545.25,
  },
  {
    timestamp: 1625946300000,
    value: 38000.25,
  },
  {
    timestamp: 1625955300000,
    value: 41233.5,
  },
  {
    timestamp: 1625947200000,
    value: 33510.25,
  },
  {
    timestamp: 1625948100000,
    value: 33215.25,
  },
];

const Chart = () => {
  return (
    <View style={{ top: 20 }}>
      <LineChart.Provider data={data}>
        <LineChart width={207} height={100}>
          <LineChart.Path
            animationDuration={500}
            animateOnMount="foreground"
            color="#00FFA3"
          >
            <LineChart.Gradient color="#00FFA3" />
          </LineChart.Path>
        </LineChart>
      </LineChart.Provider>
    </View>
  );
};

export default Chart;
