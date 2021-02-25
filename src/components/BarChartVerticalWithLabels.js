import React from 'react'
import { View, useWindowDimensions } from 'react-native'
import { BarChart, XAxis } from 'react-native-svg-charts'
import { Text } from 'react-native-svg'
import * as scale from 'd3-scale'


function BarChartVerticalWithLabels(props) {

  const achievementsData = props.data
  const xAxisData = props.xAxisData
  
  const CUT_OFF = 20
  const Labels = ({ x, y, bandwidth, data }) => (
    data.map((value, index) => (
      <Text
        key={ index }
        x={ x(index) + (bandwidth / 2) }
        y={ value < CUT_OFF ? y(value) - 10 : y(value) + 15 }
        fontSize={ 14 }
        fill={ value >= CUT_OFF ? 'white' : 'black' }
        alignmentBaseline={ 'middle' }
        textAnchor={ 'middle' }
      >
        {value}
      </Text>
    ))
  )

  return (
    <View style={{ height: useWindowDimensions().height - 300, paddingVertical: 16 }}>
      <BarChart
        style={{ flex: 1 }}
        data={achievementsData}
        svg={{ fill: 'rgba(46, 113, 102, 0.8)' }}
        contentInset={{ top: 20, bottom: 10 }}
        spacing={0.2}
        gridMin={0}
      >
      <Labels/>
      </BarChart>
      <XAxis
        style={{ marginHorizontal: -10}}
        scale={scale.scaleBand}
        data={xAxisData}
        formatLabel={(_, index) => xAxisData[ index ]}
        contentInset={{ left: 10, right: 10 }}
        svg={{ fontSize: 16, fill: 'black'}}
      />
    </View>
  )

}

export default BarChartVerticalWithLabels
