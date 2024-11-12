import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar, BackHandler, ToastAndroid } from 'react-native';

import Navigation from './src/components/Navigation/Navigation';

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

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Navigation"
          component={Navigation}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
