import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView } from 'react-native';
import { TextInput, FAB, Text } from 'react-native-paper';

import Checkbox from '../components/checkbox';

import firebase from 'firebase';
import 'firebase/firestore';

import { useDispatch } from 'react-redux';
import { addachievementfirebase } from '../redux/achievements/achievements.actions';

function AddAchievement({ navigation }) {
  const [achievementTitle, setAchievementTitle] = useState('');
  const [selectedA, setSelectedA] = useState([]);
  const [selectedB, setSelectedB] = useState([]);

  const dispatch = useDispatch();
  const addAchievementFirebase = (achievement) =>
    dispatch(addachievementfirebase(achievement));

  function onSaveAchievement() {
    const createdAt = firebase.firestore.FieldValue.serverTimestamp();
    addAchievementFirebase({
      achievementTitle,
      selectedA,
      selectedB,
      createdAt,
    });
    navigation.goBack();
  }

  const saveSelectedPartOfLife = (isSelected, label) => {
    isSelected
      ? setSelectedA([...selectedA.filter((x) => x !== label)])
      : setSelectedA([...selectedA, label]);
  };

  const saveSelectedSatisfied = (isSelected, label) => {
    isSelected
      ? setSelectedB([...selectedB.filter((x) => x !== label)])
      : setSelectedB([...selectedB, label]);
  };

  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
            <TextInput
              label="Add Title Here"
              value={achievementTitle}
              mode="outlined"
              onChangeText={setAchievementTitle}
              style={styles.title}
            />
            <Text style={styles.text}> Where does it sit? </Text>
            <Checkbox label="Work" saveSelected={saveSelectedPartOfLife} />
            <Checkbox label="Self" saveSelected={saveSelectedPartOfLife} />
            <Checkbox label="Play" saveSelected={saveSelectedPartOfLife} />
            <Checkbox label="Living" saveSelected={saveSelectedPartOfLife} />
            <Text style={styles.text}> What does it cover? </Text>
            <Checkbox
              label="Health, Wellbeing, Fitness"
              saveSelected={saveSelectedSatisfied}
            />
            <Checkbox label="Creating" saveSelected={saveSelectedSatisfied} />
            <Checkbox
              label="New Developments"
              saveSelected={saveSelectedSatisfied}
            />
            <Checkbox label="Giving" saveSelected={saveSelectedSatisfied} />
            <Checkbox label="Receiving" saveSelected={saveSelectedSatisfied} />
            <FAB
              style={styles.fab}
              small
              icon="check"
              disabled={achievementTitle == '' ? true : false}
              onPress={() => onSaveAchievement()}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 120,
  },
  iconButton: {
    backgroundColor: 'rgba(46, 113, 102, 0.8)',
    position: 'absolute',
    right: 0,
    top: 20,
    margin: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
  },
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 70,
  },
});

export default AddAchievement;
