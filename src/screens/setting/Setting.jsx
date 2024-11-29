import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Modal,
  ToastAndroid,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import myprofile from '../../components/MyProfile/myprofileInfo.json';

const Setting = () => {
  const navigation = useNavigation();
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);
  const [isVibrationEnabled, setIsVibrationEnabled] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleNotificationSwitch = () =>
    setIsNotificationEnabled(previousState => !previousState);
  const toggleVibrationSwitch = () =>
    setIsVibrationEnabled(previousState => !previousState);

  const handleLogout = () => {
    setIsModalVisible(false);
    ToastAndroid.show('성공적으로 로그아웃하셨습니다.', ToastAndroid.SHORT);
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.bundle}>
        <Text style={styles.title}>내 계정</Text>
        <View>
          <View style={styles.buttonDetail}>
            <Text style={styles.nonButton}>로그인 계정</Text>
            <Text style={{ color: '#A8A5AF', fontSize: 13, paddingBottom: 19 }}>
              {myprofile.login_id}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('MyProfileChange')}
          >
            <Text style={styles.button}>마이 프로필 변경</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('PasswordChange')}
          >
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
          <TouchableOpacity onPress={() => navigation.navigate('Withdrawal')}>
            <Text style={{ color: 'red', fontSize: 15 }}>회원탈퇴</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsModalVisible(true)}>
            <Text style={{ color: '#A8A5AF', fontSize: 15 }}>로그아웃</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>정말 로그아웃하시겠습니까?</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <Text style={styles.modalNoButtonText}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleLogout}>
                <Text style={styles.modalYesButtonText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 250,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#959393',
    textAlign: 'center',
    marginBottom: 50,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  modalNoButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
  },
  modalYesButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#00C81B',
  },
});

export default Setting;
