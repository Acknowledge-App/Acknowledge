import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'

// Importing Navigation Stacks
import AuthenticationStack from './AuthenticationStack'
import MainAppBottomTabNavigator from './MainAppBottomTabNavigator'

import { useSelector } from 'react-redux'

const Stack = createStackNavigator()

function FullAppNavigator() {
  const user = useSelector(state => state.user)
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        headerShown: false
      }}
      >
      {user.uid == undefined ? (
        <Stack.Screen
          name='AuthenticationStack'
          component={AuthenticationStack}
        />
      ) : (
        <Stack.Screen
          name='MainAppBottomTabNavigator'
          component={MainAppBottomTabNavigator}
        />
      )}
    </Stack.Navigator>
  )
}

export default FullAppNavigator;
