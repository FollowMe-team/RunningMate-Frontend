import React, { useRef } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';

// Screens (화면 메인 페이지)
import Course from '../../screens/Course/Course';
import Community from '../../screens/Community/Community';
import Crew from '../../screens/Crew/Crew';
import MyProfile from '../../screens/MyProfile/MyProfile';

// Navigation Icon (-Ac: Active Icon)
import courseIcon from '../../assets/images/NaviIcon/course_icon.png';
import courseIconAc from '../../assets/images/NaviIcon/course_icon_ac.png';
import communityIcon from '../../assets/images/NaviIcon/community_icon.png';
import communityIconAc from '../../assets/images/NaviIcon/community_icon_ac.png';
import crewIcon from '../../assets/images/NaviIcon/crew_icon.png';
import crewIconAc from '../../assets/images/NaviIcon/crew_icon_ac.png';
import myProfileIcon from '../../assets/images/NaviIcon/myprofile_icon.png';
import myProfileIconAc from '../../assets/images/NaviIcon/myprofile_icon_ac.png';
import back from '../../assets/images/NaviIcon/left.png';

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

const NavigationBar = () => {
  const navigation = useNavigation();
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
    <Tab.Navigator
      screenOptions={{
        initialRouteName: 'Course',
        tabBarStyle: styles.tabBar,
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        tabBarShowLabel: false,
        headerTitleAlign: 'center',
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <Animated.View
              style={[
                styles.backButtonCircle,
                { transform: [{ scale: scaleValue }] },
              ]}
            >
              <Image source={back} style={styles.backIcon} />
            </Animated.View>
          </TouchableOpacity>
        ),
      }}
    >
      <Tab.Screen
        name="Course"
        component={Course}
        options={{
          title: '러닝 코스',
          tabBarLabel: '러닝 코스',
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
          tabBarLabel: '커뮤니티',
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
          tabBarLabel: '러닝 크루',
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
          tabBarLabel: '마이 프로필',
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
  header: {
    backgroundColor: 'transparent',
    elevation: 0,
    shadowOpacity: 0,
  },
  headerTitle: {
    color: '#352555',
    fontSize: 20,
    fontWeight: 'bold',
  },
  tabBar: {
    height: 80,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
  backButton: {
    marginLeft: 16,
  },
  backButtonCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#50C878',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: 24,
    height: 24,
  },
});

export default NavigationBar;
