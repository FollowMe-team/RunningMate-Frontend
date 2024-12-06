import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
} from 'react-native';
import PasswordInput, { validatePassword } from '../../components/Password';
import { useNavigation } from '@react-navigation/native';

import bad from '../../assets/images/Settings/delete.png';
import eye from '../../assets/images/Settings/show.png';
import eyeOff from '../../assets/images/Settings/hide.png';
import { changePassword } from '../../utils/api';

const PasswordChange = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [currentPasswordError, setCurrentPasswordError] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [isCurrentPasswordFocused, setIsCurrentPasswordFocused] =
    useState(false);
  const navigation = useNavigation();

  const handlePasswordChange = async () => {
    const result = await changePassword(currentPassword, newPassword);
    if (result.success) {
      setModalVisible(true);
    } else {
      setCurrentPasswordError(result.message);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    navigation.navigate('Setting'); // 'Setting' 페이지로 이동
  };

  const isButtonDisabled =
    passwordError !== '' ||
    confirmPasswordError !== '' ||
    currentPasswordError !== '' ||
    !currentPassword ||
    !newPassword ||
    !confirmPassword;

  return (
    <View style={styles.container}>
      <View style={styles.bundle}>
        <Text style={styles.title}>기존 비밀번호</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            secureTextEntry={!showCurrentPassword}
            value={currentPassword}
            onChangeText={setCurrentPassword}
            onFocus={() => setIsCurrentPasswordFocused(true)}
            onBlur={() => setIsCurrentPasswordFocused(false)}
            placeholder="기존 비밀번호를 입력해주세요"
            placeholderTextColor={'#9B9B9D'}
          />
          {isCurrentPasswordFocused && (
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowCurrentPassword(!showCurrentPassword)}
            >
              <Image
                source={showCurrentPassword ? eyeOff : eye}
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          )}
          {currentPasswordError ? (
            <View style={styles.errorContainer}>
              <Image source={bad} style={styles.errorIcon} />
              <Text style={styles.errorText}>{currentPasswordError}</Text>
            </View>
          ) : null}
        </View>
      </View>
      <PasswordInput
        label="새 비밀번호"
        value={newPassword}
        onChangeText={password => {
          validatePassword(password, setPasswordError);
          setNewPassword(password);
        }}
        error={passwordError}
        placeholder="8자리 이상, 영문과 숫자, 특수문자를 반드시 포함해야 합니다."
        titleStyle={styles.title}
      />
      <PasswordInput
        label="새 비밀번호 확인"
        value={confirmPassword}
        onChangeText={password => {
          if (password !== newPassword) {
            setConfirmPasswordError('새 비밀번호와 일치하지 않습니다.');
          } else {
            setConfirmPasswordError('');
          }
          setConfirmPassword(password);
        }}
        error={confirmPasswordError}
        placeholder="동일한 비밀번호를 입력해주세요"
        titleStyle={styles.title}
      />
      <TouchableOpacity
        onPress={handlePasswordChange}
        disabled={isButtonDisabled}
      >
        <View
          style={[
            styles.changeButton,
            isButtonDisabled ? styles.buttonDisabled : null,
          ]}
        >
          <Text style={styles.button}>변경하기</Text>
        </View>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>비밀번호 변경이 완료되었어요!</Text>
            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    marginHorizontal: 16,
  },
  bundle: {
    paddingVertical: 20,
    borderBottomColor: '#E5E5E5',
  },
  title: {
    fontSize: 20,
    color: '#000',
    paddingBottom: 6,
  },
  inputContainer: {
    position: 'relative',
  },
  input: {
    color: 'black',
    height: 50,
    borderRadius: 8,
    borderColor: '#D6D6D6',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingRight: 40,
  },
  eyeButton: {
    position: 'absolute',
    right: 10,
    top: 15,
  },
  eyeIcon: {
    width: 20,
    height: 20,
  },
  changeButton: {
    width: '30%',
    margin: 20,
    padding: 20,
    backgroundColor: '#73D393',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  button: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonDisabled: {
    backgroundColor: '#E8E8E8',
  },
  errorContainer: {
    position: 'absolute',
    bottom: -20,
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorIcon: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
  },
  successText: {
    color: 'green',
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
  modalButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#00C81B',
  },
});

export default PasswordChange;
