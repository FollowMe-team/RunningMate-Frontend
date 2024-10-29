import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Course from '../../screens/Course/Course';
import Community from '../../screens/Community/Community';
import Crew from '../../screens/Crew/Crew';
import MyProfile from '../../screens/MyProfile/MyProfile';

const BottomTab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <BottomTab.Navigator
        initialRouteName="Course"
        screenOptions={{
          tabBarActiveTintColor: '#40B59F',
        }}
      >
        <BottomTab.Screen
          name="Course"
          component={Course}
          options={{
            title: '러닝 코스',
            tabBarIcon: ({ color, size }) => (
              <Icon name="directions-run" color={color} size={size} />
            ),
          }}
        />
        <BottomTab.Screen
          name="Community"
          component={Community}
          options={{
            title: '커뮤니티',
            tabBarIcon: ({ color, size }) => (
              <Icon name="comment" color={color} size={size} />
            ),
          }}
        />
        <BottomTab.Screen
          name="Crew"
          component={Crew}
          options={{
            title: '러닝 크루',
            tabBarIcon: ({ color, size }) => (
              <Icon name="groups" color={color} size={size} />
            ),
          }}
        />
        <BottomTab.Screen
          name="MyProfile"
          component={MyProfile}
          options={{
            title: '마이 프로필',
            tabBarIcon: ({ color, size }) => (
              <Icon name="info-outline" color={color} size={size} />
            ),
          }}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}
