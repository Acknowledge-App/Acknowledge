import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, FAB } from 'react-native-paper';
import PieChartWithDynamicSlices from '../components/PieChartWithDynamicSlices';

import { useSelector, useDispatch } from 'react-redux';
import AchievementsCarousel from '../components/AchievementsCarousel';
import { db } from '../../config/Firebase';

function HomeScreen({ navigation }) {
  let dispatch = useDispatch();
  let achievements = useSelector((state) => state.achievements);
  let user = useSelector((state) => state.user);
  const [count, setCount] = useState([0, 0, 0, 0]);
  const partOfLife = ['Work', 'Self', 'Play', 'Living'];
  const graphColors = ['#9352EB', '#EB5A23', '#3BEBCA', '#EBE62F'];

  useEffect(() => {
    fetchAchievements();
    return clearReduxData();
  }, []);

  let clearReduxData = () => {
    dispatch({
      type: 'CLEAR_ACH',
      payload: '',
    });
  };

  let fetchAchievements = () => {
    db.collection('users')
      .doc(user.uid)
      .collection('achievements')
      .orderBy('createdAt', 'asc')
      .onSnapshot(
        (querySnapshot) => {
          const newAchievements = [];
          querySnapshot.forEach((doc) => {
            const achievement = doc.data();
            achievement.id = doc.id;
            newAchievements.push(achievement);
          });
          dispatch({
            type: 'GET_ACHIEVEMENTS',
            payload: newAchievements,
          });
        },
        (error) => {
          console.log(error);
        }
      );
  };

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

  return (
    <>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Welcome to Acknowledge</Text>
        </View>
      </View>

      <PieChartWithDynamicSlices
        data={count}
        labels={partOfLife}
        colors={graphColors}
      />
      <FAB
        style={styles.fabAddSeeMore}
        small
        label="See More"
        onPress={() => navigation.navigate('GraphSelectedA')}
      />
      <FAB
        style={styles.fabAdd}
        small
        label="                      Add an achievement now!                      "
        onPress={() => navigation.navigate('AddAchievement')}
      />
      <Text style={styles.Achieved}>Already Achieved</Text>
      {achievements.length === 0 ? (
        <AchievementsCarousel
          data={[
            {
              achievementTitle:
                'Your achievements will appear here when you add one :)',
            },
          ]}
        />
      ) : (
        <AchievementsCarousel data={achievements} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  body: {
    fontSize: 20,
    textAlign: 'justify',
  },
  title: {
    fontSize: 45,
    marginBottom: 0,
    textAlign: 'center',
  },
  Achieved: {
    textAlign: 'center',
    bottom: -40,
  },
  fabAddSeeMore: {
    marginBottom: 20,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    position: 'absolute',
    margin: 10,
    right: 0,
    bottom: 250,
  },
  fabAdd: {
    marginTop: 80,
    margin: 10,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
