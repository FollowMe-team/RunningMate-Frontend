import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';

const Setting = () => {
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);
  const [isVibrationEnabled, setIsVibrationEnabled] = useState(false);

  const toggleNotificationSwitch = () =>
    setIsNotificationEnabled(previousState => !previousState);
  const toggleVibrationSwitch = () =>
    setIsVibrationEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <View style={styles.bundle}>
        <Text style={styles.title}>내 계정</Text>
        <View>
          <View style={styles.buttonDetail}>
            <Text style={styles.nonButton}>로그인 계정</Text>
            <Text style={{ color: '#A8A5AF', fontSize: 13 }}>{}</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.button}>마이 프로필 변경</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.button}>비밀번호 변경</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bundle}>
        <Text style={styles.title}>앱 설정</Text>
        <View style={styles.buttonDetail}>
          <Text style={styles.nonButton}>알림 설정</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#73D393' }}
            thumbColor={isNotificationEnabled ? '#f4f3f4' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleNotificationSwitch}
            value={isNotificationEnabled}
            style={{ paddingBottom: 19 }}
          />
        </View>
        <View style={styles.buttonDetail}>
          <Text style={styles.nonButton}>진동설정</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#73D393' }}
            thumbColor={isVibrationEnabled ? '#f4f3f4' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleVibrationSwitch}
            value={isVibrationEnabled}
            style={{ paddingBottom: 19 }}
          />
        </View>
      </View>
      <View style={styles.bundle}>
        <Text style={styles.title}>프리미엄</Text>
        <View>
          <TouchableOpacity>
            <Text style={styles.button}>프리미엄 구독</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bundle}>
        <View style={styles.resignNLogout}>
          <TouchableOpacity>
            <Text style={{ color: 'red', fontSize: 15 }}>회원탈퇴</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{ color: '#A8A5AF', fontSize: 15 }}>로그아웃</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bundle: {
    margin: 10,
    padding: 10,
  },
  title: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 19,
  },
  button: {
    color: 'black',
    fontSize: 20,
    paddingBottom: 19,
  },
  nonButton: {
    color: 'black',
    fontSize: 20,
    paddingBottom: 19,
  },
  buttonDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resignNLogout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Setting;
