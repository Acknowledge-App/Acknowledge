import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Text, FAB, List } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';


// Access state in Redux
import { useSelector, useDispatch } from 'react-redux';
import { getachievementsfirebase } from '../redux/achievements/achievements.actions';

function todayDate() {
  return new Date().toISOString().split('T')[0];
}

function ViewAchievements({ navigation }) {
  const [counter, setCounter] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [markedDates, setMarkedDates] = useState({
    [todayDate()]: dateHighlight,
  });
  const [dateArr, setDateArr] = useState([]);
  const [filteredAchievements, setFilteredAchievements] = useState([]);

  const dispatch = useDispatch();
  const getAchievementsFirebase = () => dispatch(getachievementsfirebase());
  const achievements = useSelector((state) => state.achievements);

  const dateSelector = (date) => {
    if (counter == 0) {
      displayOneDayAchievements(date.dateString);
      setMarkedDates({
        [date.dateString]: dateHighlight,
      });
      setStartDate(date.dateString);
      setCounter(1);
      // } else if (counter === 1 && date.dateString === startDate) {
      //   setMarkedDates({
      //     [date.dateString]: initialCalendarHighlight,
      //   });
      //   setCounter(0);
    } else {
      setMarkedDates({
        [startDate]: dateHighlight,
        [date.dateString]: dateHighlight,
      });
      setRangeOfDates(date);
      setCounter(0);
    }
  };

  let displayOneDayAchievements = (day) => {
    let filteredArray = [];
    achievements.forEach((achievement) => {
      if (
        convertDate(new Date(getMilliseconds(achievement.createdAt))) === day
      ) {
        filteredArray.push(achievement);
      }
    });
    setFilteredAchievements(filteredArray);
  };

  // potential bug find more clear way to generate list of dates
  var arrayFromSelectedDates = function (lastSelected, newArray) {
    for (
      var newDateObject = new Date(startDate);
      newDateObject <= new Date(lastSelected);
      newDateObject.setDate(newDateObject.getDate() + 1)
    ) {
      newArray.push(convertDate(newDateObject));
      setDateArr(newArray);
      filterAchievementWithDates(newArray);
    }
    
  };

  let setRangeOfDates = (date) => {
    let daysArray = []; // <---- check this array
    arrayFromSelectedDates(date.dateString, daysArray);

    setMarkedDates(
      daysArray.reduce(
        (a, b) => ((a[b] = { color: '#70d7c7', textColor: 'white' }), a),
        {}
      )
      
    );
      
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

  function filterAchievementWithDates(dateArray) {
    let filteredArray = [];
    achievements.forEach((achievement) => {
      dateArray.forEach((day) => {
        if (
          convertDate(new Date(getMilliseconds(achievement.createdAt))) === day
        ) {
          filteredArray.push(achievement);
        }
      });
    });
    console.log('set achievements');
    setFilteredAchievements(filteredArray);
  }

  // Call firebase database and add achievements to firebase store
  useEffect(() => {
    getAchievementsFirebase();
  }, []);

  return (
    <>
      <Calendar
        onDayPress={(day) => {
          dateSelector(day);
        }}
        markedDates={markedDates}
        markingType={'period'}
      />

      <View style={styles.container}>
        {filteredAchievements.length === 0 ? (
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
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
  color: '#fff',
  textColor: 'white',
  endingDay: true,
};

export default ViewAchievements;
