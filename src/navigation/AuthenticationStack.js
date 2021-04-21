import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'

import Login from '../screens/Login';
import Signup from '../screens/Signup';
import PasswordReset from '../screens/PasswordReset'

const AuthStack = createStackNavigator()

function AuthenticationStack() {
  return (
    <AuthStack.Navigator
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
      <AuthStack.Screen
        name='Login'
        component={Login}
        options={{
          title: 'Acknowledge',
        }}
      />
      <AuthStack.Screen
        name='PasswordReset'
        component={PasswordReset}
        options={{
          title: 'Password Reset',
        }}
      />
      <AuthStack.Screen
        name='Signup'
        component={Signup}
        options={{
            title: 'Sign up',
          }}
      />
    </AuthStack.Navigator>
  )
}

export default AuthenticationStack;