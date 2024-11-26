import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar, BackHandler, ToastAndroid, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
                name="MyCrew"
                component={MyCrew}
                options={({ route }) => ({
                  title: route.params.crewName,
                  header: ({ navigation }) => (
                    <Header
                      title={route.params.crewName}
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
