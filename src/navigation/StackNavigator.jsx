import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { WebView } from 'react-native-webview';
import PropTypes from 'prop-types';

import Header from '../components/Header';

import Login from '../screens/Home/Login';
import Signup from '../screens/Home/Signup';
import Setting from '../screens/setting/Setting';
import MyProfileChange from '../screens/setting/MyProfileChange';
import SearchAddress from '../screens/setting/SearchAddress';
import PasswordChange from '../screens/setting/PasswordChange';
import Withdrawal from '../screens/setting/Withdrawal';
import WithdrawalComplete from '../screens/setting/WithdrawalComplete';
import CreateCrew from '../screens/Crew/CreateCrew';
import ForgotPassword from '../screens/Home/ForgotPassword';
import CrewSearch from '../screens/Crew/CrewSearch';
import MyCrew from '../screens/Crew/MyCrew';
import CrewScheduleRegister from '../screens/Crew/CrewScheduleRegister';
import FollowerList from '../screens/MyProfile/FollowerList';
import FollowingList from '../screens/MyProfile/FollowingList';
import CrewInformation from '../components/Crew/CrewInformation';
import CrewApplicant from '../screens/Crew/CrewApplicant';
import CrewSearchResult from '../screens/Crew/CrewSearchResult';
// import Course from '../screens/Course/Course';
// import Community from '../screens/Community/Community';
// import Crew from '../screens/Crew/Crew';
// import MyProfile from '../screens/MyProfile/MyProfile';
import Main from '../components/Main';
import ApplyList from '../screens/Crew/ApplyList';

const WebViewScreen = ({ route }) => {
  const { url } = route.params;
  return <WebView source={{ uri: url }} />;
};

WebViewScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const Stack = createStackNavigator();

const StackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      animationEnabled: true,
      gestureDirection: 'vertical',
    }}
  >
    <Stack.Screen
      name="Login"
      component={Login}
      options={{ title: '로그인', headerShown: false }}
    />
    <Stack.Screen
      name="Signup"
      component={Signup}
      options={{
        title: '회원 가입',
        header: ({ navigation }) => (
          <Header title="회원 가입" navigation={navigation} hideSettingButton />
        ),
        headerShown: true,
      }}
    />
    <Stack.Screen
      name="ForgotPassword"
      component={ForgotPassword}
      options={{
        title: '비밀번호 찾기',
        header: ({ navigation }) => (
          <Header
            title="비밀번호 찾기"
            navigation={navigation}
            hideSettingButton
          />
        ),
        headerShown: true,
      }}
    />
    <Stack.Screen
      name="Main"
      component={Main}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="CreateCrew"
      component={CreateCrew}
      options={{
        title: '크루 생성',
        header: ({ navigation }) => (
          <Header title="크루 생성" navigation={navigation} />
        ),
        headerShown: true,
      }}
    />
    <Stack.Screen
      name="CreateSearch"
      component={CreateCrew}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="CrewSearchResult"
      component={CrewSearchResult}
      options={{
        title: '크루 검색 결과',
        header: ({ navigation }) => (
          <Header title="크루 검색 결과" navigation={navigation} />
        ),
        headerShown: true,
      }}
    />
    <Stack.Screen
      name="MyCrew"
      component={MyCrew}
      options={({ route }) => ({
        title: route.params.crew.name,
        header: ({ navigation }) => (
          <Header
            title={route.params.crew.name}
            navigation={navigation}
            crew={route.params.crew}
          />
        ),
        headerShown: true,
      })}
    />
    <Stack.Screen
      name="ApplyList"
      component={ApplyList}
      options={{
        title: '크루 신청자 목록',
        header: ({ navigation }) => (
          <Header title="크루 신청자 목록" navigation={navigation} />
        ),
        headerShown: true,
      }}
    />
    <Stack.Screen
      name="CrewScheduleRegister"
      component={CrewScheduleRegister}
      options={{
        title: '크루 일정 등록',
        header: ({ navigation }) => (
          <Header title="크루 일정 등록" navigation={navigation} />
        ),
        headerShown: true,
      }}
    />
    <Stack.Screen
      name="CrewInformation"
      component={CrewInformation}
      options={{
        title: '크루 정보',
        header: ({ navigation }) => (
          <Header title="크루 정보" navigation={navigation} />
        ),
        headerShown: true,
      }}
    />
    <Stack.Screen
      name="CrewApplicant"
      component={CrewApplicant}
      options={{
        title: '크루 신청자',
        header: ({ navigation }) => (
          <Header title="크루 신청자" navigation={navigation} />
        ),
        headerShown: true,
      }}
    />
    <Stack.Screen
      name="FollowerList"
      component={FollowerList}
      options={{
        title: '팔로워 목록',
        header: ({ navigation }) => (
          <Header title="팔로워 목록" navigation={navigation} />
        ),
        headerShown: true,
      }}
    />
    <Stack.Screen
      name="FollowingList"
      component={FollowingList}
      options={{
        title: '팔로잉 목록',
        header: ({ navigation }) => (
          <Header title="팔로잉 목록" navigation={navigation} />
        ),
        headerShown: true,
      }}
    />
    <Stack.Screen
      name="Setting"
      component={Setting}
      options={{
        title: '설정',
        header: ({ navigation }) => (
          <Header title="설정" navigation={navigation} hideSettingButton />
        ),
        headerShown: true,
      }}
    />
    <Stack.Screen
      name="MyProfileChange"
      component={MyProfileChange}
      options={{
        title: '마이 프로필 변경',
        header: ({ navigation }) => (
          <Header
            title="마이 프로필 변경"
            navigation={navigation}
            hideSettingButton
          />
        ),
        headerShown: true,
      }}
    />
    <Stack.Screen
      name="SearchAddress"
      component={SearchAddress}
      options={{
        title: '주소 검색',
        header: ({ navigation }) => (
          <Header title="주소 검색" navigation={navigation} />
        ),
        headerShown: true,
      }}
    />
    <Stack.Screen
      name="PasswordChange"
      component={PasswordChange}
      options={{
        title: '비밀번호 변경',
        header: ({ navigation }) => (
          <Header
            title="비밀번호 변경"
            navigation={navigation}
            hideSettingButton
          />
        ),
        headerShown: true,
      }}
    />
    <Stack.Screen
      name="Withdrawal"
      component={Withdrawal}
      options={{
        title: '계정 탈퇴',
        header: ({ navigation }) => (
          <Header title="계정 탈퇴" navigation={navigation} hideSettingButton />
        ),
        headerShown: true,
      }}
    />
    <Stack.Screen
      name="WithdrawalComplete"
      component={WithdrawalComplete}
      options={{
        title: '계정 탈퇴',
        header: ({ navigation }) => (
          <Header title="계정 탈퇴" navigation={navigation} hideSettingButton />
        ),
        headerShown: true,
      }}
    />
    <Stack.Screen name="CrewSearch" component={CrewSearch} />
    <Stack.Screen
      name="WebViewScreen"
      component={WebViewScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

StackNavigator.propTypes = {
  // isLoggedIn: PropTypes.bool.isRequired,
};

export default StackNavigator;