import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { WebView } from 'react-native-webview';
import PropTypes from 'prop-types';

import Header from '../components/Header';

import Login from '../screens/Home/Login';
import Signup from '../screens/Home/Signup';
import Main from '../components/Main';
import Course_basic from '../../src/screens/Course/Course_basic';
import Course_with_record_choosed from '../../src/screens/Course/Course_with_record_choosed';
import Course_with_record from '../../src/screens/Course/Course_with_record';
import courserecommend from '../../src/screens/Course/courserecommend';
import courserecommend_map from '../../src/screens/Course/courserecommend_map';
import coursesearch from '../../src/screens/Course/coursesearch';
import coursesearchmaplist from '../../src/screens/Course/coursesearchmaplist';
import coursesearchmapview from '../../src/screens/Course/coursesearchmapview';
import MyCourse from '../../src/screens/Course/MyCourse';
import MyCourse_none from '../../src/screens/Course/MyCourse_none';
import reviewed from '../../src/screens/Course/reviewed';
import reviewing from '../../src/screens/Course/reviewing';
import reviewlist from '../../src/screens/Course/reviewlist';
import runningtimesaving from '../../src/screens/Course/runningtimesaving';
import runningtime from '../../src/screens/Course/runningtime';
import savingcourse from '../../src/screens/Course/savingcourse';
import runningend from '../../src/screens/Course/runningend';
import SearchLocation from '../../src/screens/Course/SearchLocation';
import RecommendLocation from '../../src/screens/Course/RecommendLocation';
import Othersprofile from '../../src/screens/Othersprofile/Othersprofile';
import Othersprofile_notteam from '../../src/screens/Othersprofile/Othersprofile_notteam';
import Othersfootprinting from '../../src/screens/Othersprofile/OthersFootprinting';
import CreateCrew from '../screens/Crew/CreateCrew';
import CrewSearch from '../screens/Crew/CrewSearch';
import MyCrew from '../screens/Crew/MyCrew';
import CrewScheduleRegister from '../screens/Crew/CrewScheduleRegister';
import FollowerList from '../screens/MyProfile/FollowerList';
import FollowingList from '../screens/MyProfile/FollowingList';
import CrewInformation from '../components/Crew/CrewInformation';
import CrewApplicant from '../screens/Crew/CrewApplicant';
import CrewSearchResult from '../screens/Crew/CrewSearchResult';
import ApplyList from '../screens/Crew/ApplyList';
import Setting from '../screens/setting/Setting';
import MyProfileChange from '../screens/setting/MyProfileChange';
import ForgotPassword from '../screens/Home/ForgotPassword';
import SearchAddress from '../screens/setting/SearchAddress';
import PasswordChange from '../screens/setting/PasswordChange';
import Withdrawal from '../screens/setting/Withdrawal';
import WithdrawalComplete from '../screens/setting/WithdrawalComplete';
import MyCrewModification from '../screens/Crew/MyCrewModification';
import CrewList from '../screens/Crew/CrewList';
import MyCrewCourse from '../screens/Crew/MyCrewCourse';

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
      name="Course_basic"
      component={Course_basic}
      options={{
        title: '러닝 코스',
        header: ({ navigation }) => (
          <Header title="러닝 코스" navigation={navigation} />
        ),
        headerShown: true,
      }}
    />
    <Stack.Screen
      name="Course_with_record"
      component={Course_with_record}
      options={{
        title: '러닝 코스_기록',
        header: ({ navigation }) => (
          <Header title="러닝 코스" navigation={navigation} />
        ),
        headerShown: true,
      }}
    />
    <Stack.Screen
      name="Course_with_record_choosed"
      component={Course_with_record_choosed}
      options={{
        title: '코스 추천_선택',
        header: ({ navigation }) => (
          <Header title="코스 추천" navigation={navigation} hideSettingButton />
        ),
        headerShown: true,
      }}
    />
    <Stack.Screen
      name="Courserecommend"
      component={courserecommend}
      options={{
        title: '코스 추천',
        header: ({ navigation }) => (
          <Header title="코스 추천" navigation={navigation} hideSettingButton />
        ),
        headerShown: true,
      }}
    />
    <Stack.Screen
      name="Courserecommend_map"
      component={courserecommend_map}
      options={{
        title: '코스 추천_지도',
        header: ({ navigation }) => (
          <Header title="코스 추천" navigation={navigation} hideSettingButton />
        ),
        headerShown: true,
      }}
    />
    <Stack.Screen
      name="Coursesearch"
      component={coursesearch}
      options={{
        title: '코스 검색',
        header: ({ navigation }) => (
          <Header title="코스 검색" navigation={navigation} hideSettingButton />
        ),
        headerShown: true,
      }}
    />
    <Stack.Screen
      name="Coursesearchmaplist"
      component={coursesearchmaplist}
      options={{
        title: '러닝 검색 리스트',
        header: ({ navigation }) => (
          <Header title="코스 검색" navigation={navigation} hideSettingButton />
        ),
        headerShown: true,
      }}
    />
    <Stack.Screen
      name="Coursesearchmapview"
      component={coursesearchmapview}
      options={{
        title: '코스 검색 선택 뷰',
        header: ({ navigation }) => (
          <Header title="코스 검색" navigation={navigation} hideSettingButton />
        ),
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="MyCourse"
      component={MyCourse}
      options={{
        title: '내 코스',
        header: ({ navigation }) => (
          <Header title="내 코스" navigation={navigation} hideSettingButton />
        ),
        headerShown: true,
      }}
    />
    <Stack.Screen
      name="MyCourse_none"
      component={MyCourse_none}
      options={{
        title: '내 코스 없음',
        header: ({ navigation }) => (
          <Header title="내 코스" navigation={navigation} hideSettingButton />
        ),
        headerShown: true,
      }}
    />
    <Stack.Screen
      name="Reviewed"
      component={reviewed}
      options={{
        title: '리뷰',
        header: ({ navigation }) => (
          <Header title="상세보기" navigation={navigation} hideSettingButton />
        ),
        headerShown: true,
      }}
    />
    <Stack.Screen
      name="Reviewing"
      component={reviewing}
      options={{
        title: '리뷰 작성',
        header: ({ navigation }) => (
          <Header title="리뷰 작성" navigation={navigation} hideSettingButton />
        ),
        headerShown: true,
      }}
    />
    <Stack.Screen
      name="Reviewlist"
      component={reviewlist}
      options={{
        title: '리뷰 리스트',
        header: ({ navigation }) => (
          <Header
            title="작성된 리뷰"
            navigation={navigation}
            hideSettingButton
          />
        ),
        headerShown: true,
      }}
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
      options={{
        title: '코스 저장',
        header: ({ navigation }) => (
          <Header
            title="코스 저장"
            navigation={navigation}
            hideBackButton
            hideSettingButton
          />
        ),
        headerShown: true,
      }}
    />
    <Stack.Screen
      name="Runningend"
      component={runningend}
      options={{
        title: '달리기 완료',
        header: ({ navigation }) => (
          <Header
            title="달리기 완료"
            navigation={navigation}
            hideBackButton
            hideSettingButton
          />
        ),
        headerShown: true,
      }}
    />
    <Stack.Screen
      name="Othersprofile"
      component={Othersprofile}
      options={{
        title: '타인 프로필 기본',
        header: ({ navigation }) => (
          <Header
            title="타인 프로필"
            navigation={navigation}
            hideSettingButton
          />
        ),
        headerShown: true,
      }}
    />
    <Stack.Screen
      name="Othersprofile_notteam"
      component={Othersprofile_notteam}
      options={{
        title: '타인 프로필 기본',
        header: ({ navigation }) => (
          <Header
            title="타인 프로필"
            navigation={navigation}
            hideSettingButton
          />
        ),
        headerShown: true,
      }}
    />
    <Stack.Screen
      name="Othersfootprinting"
      component={Othersfootprinting}
      options={{
        title: '발자국 평가',
        header: ({ navigation }) => (
          <Header
            title="발자국 평가"
            navigation={navigation}
            hideSettingButton
          />
        ),
        headerShown: true,
      }}
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
    <Stack.Screen
      name="SearchLocation"
      component={SearchLocation}
      options={{
        title: '위치 선택',
        header: ({ navigation }) => (
          <Header title="위치 선택" navigation={navigation} hideSettingButton />
        ),
        headerShown: true,
      }}
    />
    <Stack.Screen
      name="RecommendLocation"
      component={RecommendLocation}
      options={{
        title: '위치 선택',
        header: ({ navigation }) => (
          <Header title="위치 선택" navigation={navigation} hideSettingButton />
        ),
        headerShown: true,
      }}
    />
    <Stack.Screen name="CrewSearch" component={CrewSearch} />
    <Stack.Screen
      name="Modification"
      component={MyCrewModification}
      options={{
        title: '크루 정보 수정',
        header: ({ navigation }) => (
          <Header title="크루 정보 수정" navigation={navigation} />
        ),
        headerShown: true,
      }}
    />
    <Stack.Screen
      name="WebViewScreen"
      component={WebViewScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="CrewList"
      component={CrewList}
      options={{
        title: '크루 멤버 목록',
        header: ({ navigation }) => (
          <Header title="크루 멤버 목록" navigation={navigation} />
        ),
        headerShown: true,
      }}
    />
    <Stack.Screen
      name="MyCrewCourse"
      component={MyCrewCourse}
      options={{
        title: '크루 코스 관리',
        header: ({ navigation }) => (
          <Header title="크루 코스 관리" navigation={navigation} />
        ),
        headerShown: true,
      }}
    />
  </Stack.Navigator>
);

StackNavigator.propTypes = {
  // isLoggedIn: PropTypes.bool.isRequired,
};

export default StackNavigator;
