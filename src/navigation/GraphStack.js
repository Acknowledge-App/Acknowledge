import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'

import GraphSelectedA from '../screens/GraphSelectedA';
import GraphSelectedB from '../screens/GraphSelectedB';

const Stack = createStackNavigator()

function GraphStack({ navigation }) {
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
          name='GraphSelectedA'
          component={GraphSelectedA}
          options={{
            title: 'Acknowledge',
          }}
        />
      <Stack.Screen
        name='GraphSelectedB'
        component={GraphSelectedB}
        options={{
          title: 'Acknowledge',
        }}
      />
    </Stack.Navigator>
  );
}

export default GraphStack