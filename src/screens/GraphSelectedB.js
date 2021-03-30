import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import BarChartVerticalWithLabels from '../components/BarChartVerticalWithLabels';
import { Text, FAB } from 'react-native-paper';

// Access state in Redux
import { useSelector } from 'react-redux';

function GraphSelectedB({ navigation }) {
  const achievements = useSelector((state) => state.achievements);
  const [count, setCount] = useState([]);

  const satisfier = [
    'Health, Wellbeing, Fitness',
    'Creating',
    'New Developments',
    'Giving',
    'Receiving',
  ];
  const satisfier_labels = [
    'Wellbeing',
    'Creating',
    'New Devs',
    'Giving',
    'Receiving',
  ];

  const countOccurrences = (arr, val) =>
    arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

  const countLabels = () => {
    const allData = [];
    const countValues = [];
    var i;
    for (i = 0; i < achievements.length; i++) {
      var j;
      const satisfierValues = achievements[i].selectedB;
      for (j = 0; j < satisfierValues.length; j++) {
        allData.push(satisfierValues[j]);
      }
    }
    var k;
    for (k = 0; k < satisfier.length; k++) {
      countValues.push(countOccurrences(allData, satisfier[k]));
    }
    setCount(countValues);
  };

  useEffect(() => {
    countLabels();
  }, [achievements]);
  //

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Part of Life</Text>
        <BarChartVerticalWithLabels data={count} xAxisData={satisfier_labels} />
        <FAB
          style={styles.fabAdd}
          small
          label="                               Toggle graph                                 "
          onPress={() => navigation.navigate('GraphSelectedA')}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  iconButton: {
    backgroundColor: 'rgba(46, 113, 102, 0.8)',
    position: 'absolute',
    right: 0,
    top: 40,
    margin: 10,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
  },
  fabAdd: {
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default GraphSelectedB;
