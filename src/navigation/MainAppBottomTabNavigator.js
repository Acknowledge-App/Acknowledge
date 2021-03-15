import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'

import AchievementsStack from './AchievementsStack'
import GraphStack from './GraphStack';
import ProfileStack from './ProfileStack';
import HomeScreenStack from './HomeScreenStack';

const Tab = createMaterialBottomTabNavigator();

function MainAppBottomTabNavigator() {
  return(
    <Tab.Navigator
      initialRouteName="HomeScreen"
      shifting={true}
      sceneAnimationEnabled={true}
      barStyle={{ backgroundColor: '#60DBC5' }}
      activeColor="#f0edf6"
      inactiveColor='#2E7166'
      >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreenStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: 'home',
        }}
      />
      <Tab.Screen
        name="ViewAchievements"
        component={AchievementsStack}
        options={{
          tabBarLabel: 'Achievements',
          tabBarIcon: 'trophy',
        }}
      />
      <Tab.Screen
        name="GraphAchievements"
        component={GraphStack}
        options={{
          tabBarLabel: 'Graph',
          tabBarIcon: 'chart-bar',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: 'account'
        }}
      />
    </Tab.Navigator>
  )
}

export default MainAppBottomTabNavigator;