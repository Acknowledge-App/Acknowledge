import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Text, FAB } from "react-native-paper";
import { Calendar } from "react-native-calendars";
import Accordion from "react-native-collapsible/Accordion";
// Access state in Redux
import { useSelector } from "react-redux";

function todayDate() {
  return new Date().toISOString().split("T")[0];
}

function ViewAchievements({ navigation }) {
  // Understand where achievements Const comes from
  // Work from there

  const achievements = useSelector((state) => state.achievements);

  // Ordering the titles by data
  const [counter, setCounter] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [markedDates, setMarkedDates] = useState({
    [todayDate()]: dateHighlight,
  });
  // used as a check to see if array is 0 then display no achivevments
  const [filteredAchievements, setFilteredAchievements] = useState([]);
  // Dis info for Accordion component toggle on title of acheivements
  var [activeSections, setActiveSections] = useState([]);
  const dateSelector = (date) => {
    if (counter == 0) {
      displayOneDayAchievements(date.dateString);
      setMarkedDates({
        [date.dateString]: dateHighlight,
      });
      setStartDate(date.dateString);
      setCounter(1);
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

  var arrayFromSelectedDates = function (lastSelected, newArray) {
    for (
      var newDateObject = new Date(startDate);
      newDateObject <= new Date(lastSelected);
      newDateObject.setDate(newDateObject.getDate() + 1)
    ) {
      newArray.push(convertDate(newDateObject));
      filterAchievementWithDates(newArray);
    }
  };

  let setRangeOfDates = (date) => {
    let daysArray = [];
    arrayFromSelectedDates(date.dateString, daysArray);

    setMarkedDates(
      daysArray.reduce(
        (a, b) => ((a[b] = { color: "#70d7c7", textColor: "white" }), a),
        {}
      )
    );
  };

  const convertDate = (date) => {
    var day = ("0" + date.getDate()).slice(-2);
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var year = date.getFullYear();
    return year + "-" + month + "-" + day;
  };

  function secondsToDate(secs) {
    var convertedDate = new Date(1970, 0, 1); // Epoch
    convertedDate.setSeconds(secs);
    return convertedDate;
  }

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
    setFilteredAchievements(filteredArray);
  }

  useEffect(() => {
    let todayDate = new Date(Date.now());
    let initialDateObj = {
      dateString: convertDate(todayDate),
    };
    dateSelector(initialDateObj);
  }, [achievements]);

  function displayNoAchievement() {
    if (filteredAchievements.length <= 1) return "No achievements yet";

    let lastAchievementTitle =
      achievements[achievements.length - 1].achievementTitle;

    let lastAchievementSeconds =
      achievements[achievements.length - 1].createdAt.seconds;
    let lastAchievementDate = secondsToDate(lastAchievementSeconds)
      .toString()
      .split("GMT")[0];

    return `The Last achievement was ${lastAchievementTitle} from ${lastAchievementDate}`;
  }

  let _renderHeader = (section) => {
    return (
      <View style={styles.listTitle}>
        <Text style={styles.listTitle}>{section.achievementTitle}</Text>
      </View>
    );
  };

  let _renderContent = (section) => {
    return (
      <View style={styles.content}>
        <Text style={styles.titleDescription}>
          {section.achievementDescription}{" "}
        </Text>
      </View>
    );
  };

  let _updateSections = (activeSections) => {
    setActiveSections(activeSections);
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          <Calendar
            onDayPress={(day) => {
              dateSelector(day);
            }}
            markedDates={markedDates}
            markingType={"period"}
          />

          {filteredAchievements.length === 0 ? (
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{displayNoAchievement()}</Text>
            </View>
          ) : (
            <Accordion
              sections={filteredAchievements}
              activeSections={activeSections}
              renderHeader={_renderHeader}
              renderContent={_renderContent}
              onChange={_updateSections}
            />
          )}
        </ScrollView>
        <FAB
          style={styles.fabAdd}
          small
          icon="plus"
          label="Add Achievement"
          onPress={() => navigation.navigate("AddAchievement")}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  title: {
    flex: 1,
    fontSize: 20,
  },
  titleDescription: {
    marginBottom: 5,
    fontSize: 15,
    textAlign: "center",
    marginLeft: 3,
    marginRight: 3,
  },
  fabAdd: {
    position: "absolute",
    margin: 20,
    right: 0,
    bottom: 10,
  },
  listTitle: {
    marginBottom: 8,
    textAlign: "center",
    fontSize: 20,
  },
});

const dateHighlight = { color: "#50cebb", textColor: "white" };
const initialCalendarHighlight = {
  startingDay: true,
  color: "#fff",
  textColor: "white",
  endingDay: true,
};

export default ViewAchievements;
