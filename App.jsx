import React, { useState, useEffect } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar, BackHandler, ToastAndroid, StyleSheet } from 'react-native';

import Navigation from './src/components/Navigation/Navigation';
import Setting from './src/screens/setting/Setting';
import MyProfileChange from './src/screens/setting/MyProfileChange';
import SearchAddress from './src/screens/setting/SearchAddress';
import PasswordChange from './src/screens/setting/PasswordChange';
import Withdrawal from './src/screens/setting/Withdrawal';
import WithdrawalComplete from './src/screens/setting/WithdrawalComplete';
import CreateCrew from './src/screens/Crew/CreateCrew';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// StatusBar 투명하게 설정
StatusBar.setBackgroundColor('transparent');
StatusBar.setTranslucent(true);
StatusBar.setBarStyle('dark-content');

// Stack Navigation
const Stack = createStackNavigator();

const App = () => {
  const [backPressedOnce, setBackPressedOnce] = useState(false);

  useEffect(() => {
    // 뒤로가기 버튼 이벤트
    const backAction = () => {
      // 한번 더 누르면 앱 종료
      if (backPressedOnce) {
        BackHandler.exitApp();
        return true;
      }

      // 한번 더 누르면 종료 메시지 출력
      setBackPressedOnce(true);
      ToastAndroid.show('한번 더 누르면 종료됩니다.', ToastAndroid.SHORT);

      // 2초 내에 뒤로가기 버튼을 한번 더 누르면 앱 종료
      setTimeout(() => {
        setBackPressedOnce(false);
      }, 2000);

      return true;
    };

    // 뒤로가기 버튼 이벤트 등록
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [backPressedOnce]);

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
      <NavigationContainer theme={customTheme}>
        <Stack.Navigator>
          <Stack.Screen
            name="Navigation"
            component={Navigation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CreateCrew"
            component={CreateCrew}
            options={{ title: '크루 생성' }}
          />
          <Stack.Screen
            name="Setting"
            component={Setting}
            options={{ title: '설정' }}
          />
          <Stack.Screen
            name="MyProfileChange"
            component={MyProfileChange}
            options={{ title: '마이 프로필 변경' }}
          />
          <Stack.Screen
            name="SearchAddress"
            component={SearchAddress}
            options={{ title: '주소 검색' }}
          />
          <Stack.Screen
            name="PasswordChange"
            component={PasswordChange}
            options={{ title: '비밀번호 변경' }}
          />
          <Stack.Screen
            name="Withdrawal"
            component={Withdrawal}
            options={{ title: '계정 탈퇴' }}
          />
          <Stack.Screen
            name="WithdrawalComplete"
            component={WithdrawalComplete}
            options={{ title: '계정 탈퇴' }}
          />
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
