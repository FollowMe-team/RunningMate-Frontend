import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar, BackHandler, ToastAndroid, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WebView } from 'react-native-webview';

import Login from './src/screens/Home/Login';
import Signup from './src/screens/Home/Signup';
import Navigation from './src/components/Navigation/Navigation';
import Setting from './src/screens/setting/Setting';
import MyProfileChange from './src/screens/setting/MyProfileChange';
import SearchAddress from './src/screens/setting/SearchAddress';
import PasswordChange from './src/screens/setting/PasswordChange';
import Withdrawal from './src/screens/setting/Withdrawal';
import WithdrawalComplete from './src/screens/setting/WithdrawalComplete';
import CreateCrew from './src/screens/Crew/CreateCrew';
import ForgotPassword from './src/screens/Home/ForgotPassword';
import CrewSearch from './src/screens/Crew/CrewSearch';
import Header from './src/components/Header';
import MyCrew from './src/screens/Crew/MyCrew';
import CrewScheduleRegister from './src/screens/Crew/CrewScheduleRegister';
import FollowerList from './src/screens/MyProfile/FollowerList';
import FollowingList from './src/screens/MyProfile/FollowingList';
import CrewInformation from './src/components/Crew/CrewInformation';
import CrewApplicant from './src/screens/Crew/CrewApplicant';
import CrewSearchResult from './src/screens/Crew/CrewSearchResult';
import Course_basic from './src/screens/Course/Course_basic';
import Course_with_record_choosed from './src/screens/Course/Course_with_record_choosed';
import Course_with_record from './src/screens/Course/Course_with_record';
import courserecommend from './src/screens/Course/courserecommend';
import courserecommend_map from './src/screens/Course/courserecommend_map';
import coursesearch from './src/screens/Course/coursesearch';
import coursesearchmaplist from './src/screens/Course/coursesearchmaplist';
import coursesearchmapview from './src/screens/Course/coursesearchmapview';
import MyCourse from './src/screens/Course/MyCourse';
import MyCourse_none from './src/screens/Course/MyCourse_none';
import reviewed from './src/screens/Course/reviewed';
import reviewing from './src/screens/Course/reviewing';
import reviewlist from './src/screens/Course/reviewlist';
import runningtimesaving from './src/screens/Course/runningtimesaving';
import runningtime from './src/screens/Course/runningtime';
import savingcourse from './src/screens/Course/savingcourse';
import runningend from './src/screens/Course/runningend';
import Othersprofile from './src/screens/Othersprofile/Othersprofile';
import Othersprofile_notteam from './src/screens/Othersprofile/Othersprofile_notteam';
import Othersfootprinting from './src/screens/Othersprofile/OthersFootprinting';

import PropTypes from 'prop-types';

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

// StatusBar 투명하게 설정
StatusBar.setBackgroundColor('transparent');
StatusBar.setTranslucent(true);
StatusBar.setBarStyle('dark-content');

// Stack Navigation
const Stack = createStackNavigator();

const App = () => {
  const navigationRef = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [backPressedOnce, setBackPressedOnce] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const value = await AsyncStorage.getItem('isLoggedIn');
      if (value === 'true') {
        setIsLoggedIn(true);
      }
      setIsLoading(false);
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    const backAction = () => {
      const currentRoute = navigationRef.current?.getCurrentRoute()?.name;

      if (
        currentRoute === 'Login' ||
        ['Course', 'Community', 'Crew', 'MyProfile'].includes(currentRoute)
      ) {
        if (backPressedOnce) {
          BackHandler.exitApp();
          return true;
        }

        setBackPressedOnce(true);
        ToastAndroid.show('한번 더 누르면 종료됩니다.', ToastAndroid.SHORT);

        setTimeout(() => {
          setBackPressedOnce(false);
        }, 2000);

        return true;
      }

      navigationRef.current?.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [backPressedOnce, isLoading]);

  if (isLoading) {
    return null; // 로딩 중일 때 표시할 컴포넌트 (스플래시 화면 등)
  }

  const customTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white',
    },
    fonts: {
      regular: {
        color: 'black',
        fontFamily: 'Pretendard',
      },
    },
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <NavigationContainer theme={customTheme} ref={navigationRef}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animationEnabled: true,
            gestureDirection: 'vertical',
          }}
        >
          {isLoggedIn ? (
            <>
              <Stack.Screen
                name="Navigation"
                component={Navigation}
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
                    />
                  ),
                  headerShown: true,
                })}
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
                    <Header title="설정" navigation={navigation} />
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
                    <Header title="마이 프로필 변경" navigation={navigation} />
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
                    <Header title="비밀번호 변경" navigation={navigation} />
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
                    <Header title="계정 탈퇴" navigation={navigation} />
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
                    <Header title="계정 탈퇴" navigation={navigation} />
                  ),
                  headerShown: true,
                }}
              />
              {/* <Stack.Screen name="Crew" component={Crew} /> */}
              <Stack.Screen name="CrewSearch" component={CrewSearch} />
              <Stack.Screen
                name="WebViewScreen"
                component={WebViewScreen}
                options={{ headerShown: false }}
              />
            </>
          ) : (
            <>
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
                    <Header title="회원 가입" navigation={navigation} />
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
                    <Header title="비밀번호 찾기" navigation={navigation} />
                  ),
                  headerShown: true,
                }}
              />
              <Stack.Screen
            name="Course_basic"
            component={Course_basic}
            options={{ title: '러닝 코스' }}
          />
          <Stack.Screen
            name="Course_with_record"
            component={Course_with_record}
            options={{ title: '러닝 코스_기록' }}
          />
          <Stack.Screen
            name="Course_with_record_choosed"
            component={Course_with_record_choosed}
            options={{ title: '코스 추천_선택' }}
          />
          <Stack.Screen
            name="Courserecommend"
            component={courserecommend}
            options={{ title: '코스 추천' }}
          />
          <Stack.Screen
            name="Courserecommend_map"
            component={courserecommend_map}
            options={{ title: '코스 추천_지도' }}
          />
          <Stack.Screen
            name="Coursesearch"
            component={coursesearch}
            options={{ title: '코스 검색' }}
          />
          <Stack.Screen
            name="Coursesearchmaplist"
            component={coursesearchmaplist}
            options={{ title: '러닝 검색 리스트' }}
          />
          <Stack.Screen
            name="Coursesearchmapview"
            component={coursesearchmapview}
            options={{ title: '코스 검색 선택 뷰' }}
          />
          <Stack.Screen
            name="MyCourse"
            component={MyCourse}
            options={{ title: '내 코스' }}
          />
          <Stack.Screen
            name="MyCourse_none"
            component={MyCourse_none}
            options={{ title: '내 코스 없음' }}
          />
          <Stack.Screen
            name="Reviewed"
            component={reviewed}
            options={{ title: '리뷰' }}
          />
          <Stack.Screen
            name="Reviewing"
            component={reviewing}
            options={{ title: '리뷰 작성' }}
          />
          <Stack.Screen
            name="Reviewlist"
            component={reviewlist}
            options={{ title: '리뷰 리스트' }}
          />
          <Stack.Screen
            name="Runningtimesaving"
            component={runningtimesaving}
            options={{ title: '코스 기록' }}
          />
          <Stack.Screen
            name="Runningtime"
            component={runningtime}
            options={{ title: '달리기' }}
          />
          <Stack.Screen
            name="Savingcourse"
            component={savingcourse}
            options={{ title: '코스 저장' }}
          />
          <Stack.Screen
            name="Runningend"
            component={runningend}
            options={{ title: '달리기 완료' }}
          />
          <Stack.Screen
            name="Othersprofile"
            component={Othersprofile}
            options={{ title: '타인 프로필 기본' }}
          />
          <Stack.Screen
            name="Othersprofile_notteam"
            component={Othersprofile_notteam}
            options={{ title: '타인 프로필 기본' }}
          />
          <Stack.Screen
            name="Othersfootprinting"
            component={Othersfootprinting}
            options={{ title: '발자국 평가' }}
          />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default App;
