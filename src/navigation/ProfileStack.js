import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'

import Profile from '../screens/Profile';

const Stack = createStackNavigator()

function ProfileStack() {
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
          name='GraphAchievements'
          component={Profile}
          options={{
            title: 'Acknowledge',
          }}
        />
    </Stack.Navigator>
  );
}

export default ProfileStack