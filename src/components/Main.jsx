import React, { useRef } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import PropTypes from 'prop-types';

import Header from './Header';

// Screens (화면 메인 페이지)
import Course from '../screens/Course/Course';
import Community from '../screens/Community/Community';
import Crew from '../screens/Crew/Crew';
import MyProfile from '../screens/MyProfile/MyProfile';

// Navigation Icon (-Ac: Active Icon)
import courseIcon from '../assets/images/NaviIcon/course_icon.png';
import courseIconAc from '../assets/images/NaviIcon/course_icon_ac.png';
import communityIcon from '../assets/images/NaviIcon/community_icon.png';
import communityIconAc from '../assets/images/NaviIcon/community_icon_ac.png';
import crewIcon from '../assets/images/NaviIcon/crew_icon.png';
import crewIconAc from '../assets/images/NaviIcon/crew_icon_ac.png';
import myProfileIcon from '../assets/images/NaviIcon/myprofile_icon.png';
import myProfileIconAc from '../assets/images/NaviIcon/myprofile_icon_ac.png';
// import back from '../assets/images/NaviIcon/left.png';
// import settingsIcon from '../assets/images/NaviIcon/web-settings.png';

const Tab = createBottomTabNavigator();

const TabButton = ({ children, onPress }) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.timing(scaleValue, {
      toValue: 0.9,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={styles.iconTouchArea}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          {children}
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

TabButton.propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func.isRequired,
};

const Main = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Course"
        component={Course}
        options={{
          title: '러닝 코스',
          header: ({ navigation }) => (
            <Header title="러닝 코스" navigation={navigation} hideBackButton />
          ),
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? courseIconAc : courseIcon}
              style={styles.tabIcon}
              resizeMode="contain"
            />
          ),
          tabBarButton: props => <TabButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Community"
        component={Community}
        options={{
          title: '커뮤니티',
          header: ({ navigation }) => (
            <Header title="커뮤니티" navigation={navigation} hideBackButton />
          ),
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? communityIconAc : communityIcon}
              style={styles.tabIcon}
              resizeMode="contain"
            />
          ),
          tabBarButton: props => <TabButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Crew"
        component={Crew}
        options={{
          title: '러닝 크루',
          header: ({ navigation }) => (
            <Header title="러닝 크루" navigation={navigation} hideBackButton />
          ),
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? crewIconAc : crewIcon}
              style={styles.tabIcon}
              resizeMode="contain"
            />
          ),
          tabBarButton: props => <TabButton {...props} />,
        }}
      />
      <Tab.Screen
        name="MyProfile"
        component={MyProfile}
        options={{
          title: '마이 프로필',
          header: ({ navigation }) => (
            <Header
              title="마이 프로필"
              navigation={navigation}
              hideBackButton
            />
          ),
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? myProfileIconAc : myProfileIcon}
              style={styles.tabIcon}
              resizeMode="contain"
            />
          ),
          tabBarButton: props => <TabButton {...props} />,
        }}
      />
    </Tab.Navigator>
  );
};

// 네비게이션 바 스타일링
const styles = StyleSheet.create({
  tabBar: {
    height: 80,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopColor: 'white',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 8,
    backgroundColor: 'white',
    paddingTop: 16,
    paddingBottom: 24,
  },
  tabContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconTouchArea: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIcon: {
    width: 35,
    height: 35,
    marginBottom: 4,
  },
});

export default Main;
