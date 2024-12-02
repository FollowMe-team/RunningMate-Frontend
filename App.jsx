import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { StatusBar, BackHandler, ToastAndroid, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WebView } from 'react-native-webview';

import PropTypes from 'prop-types';

// import back from './src/assets/images/NaviIcon/left.png';
// import settingsIcon from './src/assets/images/NaviIcon/web-settings.png';
import StackNavigator from './src/navigation/StackNavigator';

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

const App = () => {
  const navigationRef = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const [backPressedOnce, setBackPressedOnce] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const value = await AsyncStorage.getItem('isLoggedIn');
        console.log('isLoggedIn value:', value); // 로그 추가
      } catch (error) {
        console.error('Failed to fetch isLoggedIn from AsyncStorage', error);
      } finally {
        setIsLoading(false);
      }
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
        <StackNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
  settingButton: {
    marginRight: 16,
  },
  settingButtonCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#50C878',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingIcon: {
    width: 24,
    height: 24,
  },
});

export default App;
