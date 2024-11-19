import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';

import myprofile from '../../components/MyProfile/myprofileInfo.json';

import correct from '../../assets/images/Settings/checked.png';
import bad from '../../assets/images/Settings/delete.png';
import eye from '../../assets/images/Settings/show.png';
import eyeOff from '../../assets/images/Settings/hide.png';

const PasswordChange = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [currentPasswordError, setCurrentPasswordError] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isCurrentPasswordFocused, setIsCurrentPasswordFocused] =
    useState(false);
  const [isNewPasswordFocused, setIsNewPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] =
    useState(false);

  const validateCurrentPassword = password => {
    if (password !== myprofile.password) {
      setCurrentPasswordError('기존 비밀번호랑 다릅니다.');
    } else {
      setCurrentPasswordError('');
    }
    setCurrentPassword(password);
  };

  const validatePassword = password => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        '8자리 이상, 영문과 숫자, 특수문자를 반드시 포함해야 합니다.',
      );
    } else {
      setPasswordError('적용 가능한 비밀번호입니다!');
    }
    setNewPassword(password);
  };

  const validateConfirmPassword = password => {
    if (password !== newPassword) {
      setConfirmPasswordError('새 비밀번호와 일치하지 않습니다.');
    } else {
      setConfirmPasswordError('');
    }
    setConfirmPassword(password);
  };

  const handlePasswordChange = () => {
    // 비밀번호 변경 로직 추가
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const isButtonDisabled =
    passwordError !== '적용 가능한 비밀번호입니다!' ||
    confirmPasswordError !== '' ||
    currentPasswordError !== '' ||
    !currentPassword;

  return (
    <View style={styles.container}>
      <View style={styles.bundle}>
        <Text style={styles.title}>기존 비밀번호</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            secureTextEntry={!showCurrentPassword}
            value={currentPassword}
            onChangeText={validateCurrentPassword}
            onFocus={() => setIsCurrentPasswordFocused(true)}
            onBlur={() => setIsCurrentPasswordFocused(false)}
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
      <View style={styles.bundle}>
        <Text style={styles.title}>새 비밀번호</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            secureTextEntry={!showNewPassword}
            value={newPassword}
            onChangeText={validatePassword}
            onFocus={() => setIsNewPasswordFocused(true)}
            onBlur={() => setIsNewPasswordFocused(false)}
          />
          {isNewPasswordFocused && (
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowNewPassword(!showNewPassword)}
            >
              <Image
                source={showNewPassword ? eyeOff : eye}
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          )}
          {passwordError ? (
            <View style={styles.errorContainer}>
              <Image
                source={
                  passwordError === '적용 가능한 비밀번호입니다!'
                    ? correct
                    : bad
                }
                style={styles.errorIcon}
              />
              <Text
                style={[
                  styles.errorText,
                  passwordError === '적용 가능한 비밀번호입니다!'
                    ? styles.successText
                    : null,
                ]}
              >
                {passwordError}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
      <View style={styles.bundle}>
        <Text style={styles.title}>새 비밀번호 확인</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={validateConfirmPassword}
            onFocus={() => setIsConfirmPasswordFocused(true)}
            onBlur={() => setIsConfirmPasswordFocused(false)}
          />
          {isConfirmPasswordFocused && (
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Image
                source={showConfirmPassword ? eyeOff : eye}
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          )}
          {confirmPasswordError ? (
            <View style={styles.errorContainer}>
              <Image source={bad} style={styles.errorIcon} />
              <Text style={styles.errorText}>{confirmPasswordError}</Text>
            </View>
          ) : null}
        </View>
      </View>
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
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>비밀번호 변경이 완료되었어요!</Text>
            <TouchableOpacity onPress={closeModal} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>확인</Text>
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
  },
  bundle: {
    padding: 20,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    color: 'black',
    fontSize: 18,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#73D393',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default PasswordChange;
