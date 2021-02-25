import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'

import { View} from 'react-native';
import { IconButton } from 'react-native-paper';

import ViewAchievements from '../screens/ViewAchievements';
import AddAchievement from '../screens/AddAchievement';

const Stack = createStackNavigator()

import { useDispatch } from 'react-redux'

import { getachievementsfirebase } from '../redux/achievements/achievements.actions'

function AchievementsStack({ navigation }) {

  const dispatch = useDispatch()
  const getAchievementsFirebase = () => dispatch(getachievementsfirebase())

  return (
    <Stack.Navigator 
    screenOptions={{
        gestureEnabled: true,
        headerShown: true,
        headerStyle: {
          backgroundColor: '#60DBC5',
        },
        headerTintColor: '#2E7166',
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: '600',
        },
        headerTitleAlign: 'center'
      }}>
      <Stack.Screen
        name='ViewAchievements'
        component={ViewAchievements}
        options={{
          title: 'Acknowledge',
          headerRight: () => (
            <IconButton
              icon="refresh"
              onPress={() => getAchievementsFirebase()}
            />
          ),
        }}
      />
      <Stack.Screen
        name='AddAchievement'
        component={AddAchievement}
        options={{
          title: 'Add an Achievement',
        }}
      />
    </Stack.Navigator>
  );
}
 
export default AchievementsStack