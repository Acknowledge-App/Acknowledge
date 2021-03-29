import React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { BarChart, XAxis } from 'react-native-svg-charts';
import { Text } from 'react-native-svg';
import * as scale from 'd3-scale';

function BarChartVerticalWithLabels(props) {
  const achievementsData = props.data;
  const xAxisData = props.xAxisData;

  function addCustomColour() {
    let newData = [];
    achievementsData.forEach((element) => {
      newData.push({
        value: element,
        svg: {
          fill: 'green',
        },
      });
    });

    return newData;
  }

  const data = [
    {
      value: 50,
    },
    {
      value: 10,
      svg: {
        fill: 'rgba(134, 65, 244, 0.5)',
      },
    },
    {
      value: 40,
      svg: {
        stroke: 'purple',
        strokeWidth: 2,
        fill: 'white',
        strokeDasharray: [4, 2],
      },
    },
    {
      value: 85,
      svg: {
        fill: 'green',
      },
    },
  ];

  const CUT_OFF = 20;
  const Labels = ({ x, y, bandwidth, data }) => {
    return props.data.map((value, index) => (
      <Text
        key={index}
        x={x(index) + bandwidth / 2}
        y={value < CUT_OFF ? y(value) - 10 : y(value) + 15}
        fontSize={14}
        fill={value >= CUT_OFF ? 'red' : 'black'}
        alignmentBaseline={'middle'}
        textAnchor={'middle'}
      >
        {value}
      </Text>
    ));
  };

  return (
    <View
      style={{
        height: useWindowDimensions().height - 300,
        paddingVertical: 16,
      }}
    >
      <BarChart
        style={{ flex: 1 }}
        data={addCustomColour()}
        gridMin={0}
        svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
        yAccessor={({ item }) => item.value}
        contentInset={{ top: 20, bottom: 20 }}
      >
        <Labels />
      </BarChart>

      <XAxis
        style={{ marginHorizontal: -10 }}
        scale={scale.scaleBand}
        data={xAxisData}
        formatLabel={(_, index) => xAxisData[index]}
        contentInset={{ left: 10, right: 10 }}
        svg={{ fontSize: 16, fill: 'black' }}
      />
    </View>
  );
}

export default BarChartVerticalWithLabels;
