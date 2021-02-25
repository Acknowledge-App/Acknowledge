import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'

import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator()

function HomeScreenStack() {
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
          name='HomeScreen'
          component={HomeScreen}
          options={{
            title: 'Acknowledge',
          }}
        />
    </Stack.Navigator>
  );
}

export default HomeScreenStack