import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import BarChartVerticalWithLabels from '../components/BarChartVerticalWithLabels';
import { Text, FAB } from 'react-native-paper';

// Access state in Redux
import { useSelector } from 'react-redux';

function GraphSelectedA({ navigation }) {
  const achievements = useSelector((state) => state.achievements);
  const [count, setCount] = useState([]);
  const partOfLife = ['Work', 'Self', 'Play', 'Living'];

  const countOccurrences = (arr, val) =>
    arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

  const countLabels = () => {
    const allData = [];
    const countValues = [];
    var i;
    for (i = 0; i < achievements.length; i++) {
      var j;
      const partOfLifeValues = achievements[i].selectedA;
      for (j = 0; j < partOfLifeValues.length; j++) {
        allData.push(partOfLifeValues[j]);
      }
    }
    var k;
    for (k = 0; k < partOfLife.length; k++) {
      countValues.push(countOccurrences(allData, partOfLife[k]));
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
        <BarChartVerticalWithLabels data={count} xAxisData={partOfLife} />
        <FAB
          style={styles.fabAdd}
          small
          label="                               Toggle graph                                 "
          onPress={() => navigation.navigate('GraphSelectedB')}
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
    backgroundColor: 'red',
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

export default GraphSelectedA;
