import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Text, FAB, List } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';
import Header from '../components/Header';

// Access state in Redux
import { useSelector, useDispatch } from 'react-redux';
import {
  getachievementsfirebase,
  deleteachievementfirebase,
} from '../redux/achievements/achievements.actions';

let counter = 0;

function ViewAchievements({ navigation }) {
  const [startDate, setStartDate] = useState('2020-11-27');
  const [endDate, setEndDate] = useState('2020-11-27');
  const [markedDates, setMarkedDates] = useState({});
  const [dateArr, setDateArr] = useState([]);

  const dateSelector = (date) => {
    if (counter === 0) {
      setMarkedDates({
        [date.dateString]: dateHighlight,
      });
      setStartDate(date.dateString);
      counter++;
    } else if (counter === 1 && date.dateString === startDate) {
      setMarkedDates({
        [date.dateString]: initialCalendarHighlight,
      });
      counter = 0;
    } else {
      setRangeOfDates(date);
    }
  };

  var getDaysArray = function (start, end, daysArray) {
    for (
      var newDateObject = new Date(start);
      newDateObject <= new Date(end);
      newDateObject.setDate(newDateObject.getDate() + 1)
    ) {
      daysArray.push(convertDate(newDateObject));
      setEndDate(daysArray.slice(-1).pop());
      setDateArr(daysArray);
    }
    filterAchievementWithDates(dateArr);
  };

  let setRangeOfDates = (date) => {
    let daysArray = [];
    getDaysArray(startDate, date.dateString, daysArray);
    setMarkedDates(
      daysArray.reduce(
        (a, b) => ((a[b] = { color: '#70d7c7', textColor: 'white' }), a),
        {}
      )
    );
    counter = 0;
  };

  const convertDate = (date) => {
    var day = ('0' + date.getDate()).slice(-2);
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var year = date.getFullYear();
    return year + '-' + month + '-' + day;
  };

  const getMilliseconds = (date) => {
    if (date != null) {
      return date.toMillis();
    } else {
      date = new Date();
      return date.getTime();
    }
  };

  const achievements = useSelector((state) => state.achievements);

  // Showing initial achievements state
  let filteredAchievements = achievements.filter(
    (achievement) =>
      convertDate(new Date(getMilliseconds(achievement.createdAt))) ===
      startDate
  );

  function filterAchievementWithDates(arr) {
    let filteredArrays = [];
    for (let i = 0; i < arr.length; i++) {
      const newAchievementsArray = achievements.filter(
        (achievement) =>
          convertDate(new Date(getMilliseconds(achievement.createdAt))) ===
          dateArr[i]
      );

      filteredArrays.push(newAchievementsArray);
    }

    filteredAchievements = filteredArrays.flat(1);
    console.log('filteredachievements ===');
    console.log(filteredAchievements);
  }

  // Adding redux dispatch commands to update redux.
  const dispatch = useDispatch();
  const getAchievementsFirebase = () => dispatch(getachievementsfirebase());
  const deleteAchievementFirebase = (id) =>
    dispatch(deleteachievementfirebase(id));

  // Call firebase database and add achievements to firebase store
  useEffect(() => {
    getAchievementsFirebase();
  }, []);

  return (
    <>
      <Header titleText="Access" />
      <Calendar
        onDayPress={(day) => {
          dateSelector(day), console.log('selected day', day);
        }}
        markedDates={markedDates}
        markingType={'period'}
      />

      <View style={styles.container}>
        {filteredAchievements.length === 0 ? (
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              {' '}
              No achievements saved on selected day
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredAchievements}
            renderItem={({ item }) => (
              <List.Item
                title={item.achievementTitle}
                description={[
                  item.selectedA.join(),
                  ',',
                  item.selectedB.join(),
                ]}
                descriptionNumberOfLines={2}
                titleStyle={styles.listTitle}
                onPress={() =>
                  console.log(
                    `Achievment: id:${item.id} with title: ${item.achievementTitle}`
                  )
                }
              />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        )}
        <FAB
          style={styles.fabAdd}
          small
          icon="plus"
          label="Add Achievement"
          onPress={() => navigation.navigate('AddAchievement')}
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
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    fontSize: 20,
  },
  fabAdd: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 10,
  },
  listTitle: {
    fontSize: 20,
  },
});

const dateHighlight = { color: '#50cebb', textColor: 'white' };
const initialCalendarHighlight = {
  startingDay: true,
  color: '#50cebb',
  textColor: 'white',
  endingDay: true,
};

export default ViewAchievements;
