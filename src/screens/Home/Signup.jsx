import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import PasswordInput, { validatePassword } from '../../components/Password';
import AddressInput from '../../components/AddressInput';
import api from '../../utils/api';
import { useNavigation } from '@react-navigation/native';

import ProfilePhotoPicker from '../../screens/setting/ProfilePhotoPicker';

const runningCareer = [
  { label: '시작', value: 'BEGINNER' },
  { label: '1 ~ 3년차', value: '1-3' },
  { label: '3 ~ 5년차', value: '3-5' },
  { label: '5년 이상', value: '5+' },
];

const Signup = () => {
  const [photo, setPhoto] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [nicknameError, setNicknameError] = useState('');

  const [address, setAddress] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [selectedGender, setSelectedGender] = useState(null);
  const [experience, setExperience] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [info, setInfo] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      onAddressSelected: handleAddressChange,
    });
  }, [navigation]);

  const years = Array.from({ length: 100 }, (_, i) => ({
    label: `${2023 - i}`,
    value: `${2023 - i}`,
  }));
  const months = Array.from({ length: 12 }, (_, i) => ({
    label: `${i + 1}`,
    value: `${i + 1}`,
  }));
  const days = Array.from({ length: 31 }, (_, i) => ({
    label: `${i + 1}`,
    value: `${i + 1}`,
  }));

  const handleAddressChange = newAddress => {
    setAddress(newAddress);
  };

  const handleGenderSelect = gender => {
    setSelectedGender(gender);
  };

  const validateForm = () => {
    if (
      photo &&
      email &&
      password &&
      confirmPassword &&
      name &&
      selectedGender &&
      year &&
      month &&
      day &&
      experience &&
      !passwordError &&
      !confirmPasswordError &&
      isEmailChecked && // 이메일 중복 확인이 완료된 경우에만 활성화
      isNicknameChecked // 닉네임 중복 확인이 완료된 경우에만 활성화
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };

  const handleEmailCheck = async () => {
    try {
      const response = await api.post('/auth/check-email', { email });
      if (response.data.isAvailable) {
        setIsEmailChecked(true);
        setEmailError('');
        alert('사용 가능한 이메일입니다.');
      } else {
        setIsEmailChecked(false);
        setEmailError('이미 사용 중인 이메일입니다.');
      }
    } catch {
      setIsEmailChecked(false);
      setEmailError('이메일 확인 중 오류가 발생했습니다.');
    }
  };

  const handleNicknameCheck = async () => {
    try {
      const response = await api.post('/auth/check-nickname', { nickname });
      if (response.data.isAvailable) {
        setIsNicknameChecked(true);
        setNicknameError('');
        alert('사용 가능한 닉네임입니다.');
      } else {
        setIsNicknameChecked(false);
        setNicknameError('이미 사용 중인 닉네임입니다.');
      }
    } catch {
      setIsNicknameChecked(false);
      setNicknameError('닉네임 확인 중 오류가 발생했습니다.');
    }
  };

  const handleSignup = async () => {
    const birth = `${year}-${month}-${day}`;
    const gender = selectedGender === '남' ? 'MALE' : 'FEMALE';

    try {
      const response = await api.post('/auth/signup', {
        profileUrl: photo,
        email,
        password,
        name,
        gender,
        birth,
        nickname,
        runningCareer: experience,
      });

      if (response.status === 200) {
        setIsModalVisible(true);
      }
    } catch (error) {
      if (error.response.data.code === 'VALID001') {
        alert('잘못된 입력값입니다.');
      } else {
        alert('회원가입에 실패했습니다.');
      }
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <ProfilePhotoPicker photo={photo} setPhoto={setPhoto} />
        <View style={[styles.formContainer, { marginTop: 20 }]}>
          <Text style={styles.formTitle}>이메일</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="abcd@naver.com"
              style={[styles.input, { flex: 1 }]}
              value={email}
              onChangeText={text => {
                setEmail(text);
                setIsEmailChecked(false); // 이메일이 변경되면 중복 확인 상태를 초기화
                setEmailError('');
                validateForm();
              }}
              placeholderTextColor="#9B9B9D"
            />
            <TouchableOpacity
              style={styles.emailCheckButton}
              onPress={handleEmailCheck}
            >
              <Text style={styles.emailCheckButtonText}>중복 체크</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.errorContainer}>
            {emailError ? (
              <Text style={styles.errorText}>{emailError}</Text>
            ) : null}
          </View>
        </View>
        <PasswordInput
          label="비밀번호 입력"
          value={password}
          onChangeText={password => {
            validatePassword(password, setPasswordError);
            setPassword(password);
            validateForm();
          }}
          error={passwordError}
          placeholder="2~8자리 영문과 숫자 조합을 입력해주세요."
          titleStyle={styles.formTitle}
        />
        <PasswordInput
          label="비밀번호 확인"
          value={confirmPassword}
          onChangeText={confirmPassword => {
            if (confirmPassword !== password) {
              setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
            } else {
              setConfirmPasswordError('');
            }
            setConfirmPassword(confirmPassword);
            validateForm();
          }}
          error={confirmPasswordError}
          placeholder="동일한 비밀번호를 입력해주세요"
          titleStyle={styles.formTitle}
        />
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>생년월일</Text>
          <View style={styles.birthdateContainer}>
            <Dropdown
              style={styles.dropdown}
              data={years}
              labelField="label"
              valueField="value"
              placeholder="연 선택"
              value={year}
              onChange={item => {
                setYear(item.value);
                validateForm();
              }}
              placeholderStyle={{ color: '#101010' }} // 글자색 수정
              itemTextStyle={{ color: '#101010' }} // 드롭다운 리스트 글자색 수정
              selectedTextStyle={{ color: '#101010' }} // 선택된 항목 글자색 수정
            />
            <Dropdown
              style={styles.dropdown}
              data={months}
              labelField="label"
              valueField="value"
              placeholder="월 선택"
              value={month}
              onChange={item => {
                setMonth(item.value);
                validateForm();
              }}
              placeholderStyle={{ color: '#101010' }} // 글자색 수정
              itemTextStyle={{ color: '#101010' }} // 드롭다운 리스트 글자색 수정
              selectedTextStyle={{ color: '#101010' }} // 선택된 항목 글자색 수정
            />
            <Dropdown
              style={styles.dropdown}
              data={days}
              labelField="label"
              valueField="value"
              placeholder="일 선택"
              value={day}
              onChange={item => {
                setDay(item.value);
                validateForm();
              }}
              placeholderStyle={{ color: '#101010' }} // 글자색 수정
              itemTextStyle={{ color: '#101010' }} // 드롭다운 리스트 글자색 수정
              selectedTextStyle={{ color: '#101010' }} // 선택된 항목 글자색 수정
            />
          </View>
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>성별</Text>
          <View style={styles.genderSet}>
            <TouchableOpacity
              style={[
                styles.genderButton,
                selectedGender === '남' ? styles.selectedGenderButton : null,
              ]}
              onPress={() => {
                handleGenderSelect('남');
                validateForm();
              }}
            >
              <Text style={styles.genderText}>남</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.genderButton,
                selectedGender === '여' ? styles.selectedGenderButton : null,
              ]}
              onPress={() => {
                handleGenderSelect('여');
                validateForm();
              }}
            >
              <Text style={styles.genderText}>여</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>이름</Text>
          <TextInput
            placeholder="ex) 홍길동"
            style={styles.input}
            value={name}
            onChangeText={text => {
              setName(text);
              validateForm();
            }}
            placeholderTextColor="#9B9B9D"
          />
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>닉네임</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="ex) 길동이"
              style={[styles.input, { flex: 1 }]}
              value={nickname}
              onChangeText={text => {
                setNickname(text);
                setIsNicknameChecked(false); // 닉네임이 변경되면 중복 확인 상태를 초기화
                setNicknameError('');
                validateForm();
              }}
              placeholderTextColor="#9B9B9D"
            />
            <TouchableOpacity
              style={styles.nicknameCheckButton}
              onPress={handleNicknameCheck}
            >
              <Text style={styles.nicknameCheckButtonText}>중복 체크</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.errorContainer}>
            {nicknameError ? (
              <Text style={styles.errorText}>{nicknameError}</Text>
            ) : null}
          </View>
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>거주지</Text>
          <AddressInput
            placeholder="검색 버튼을 눌러 주소를 입력해주세요"
            placeholderTextColor="#9B9B9D"
            address={address}
            onAddressChange={handleAddressChange}
          />
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>러닝 경력</Text>
          <Dropdown
            style={styles.runningCareerDropdown}
            data={runningCareer}
            labelField="label"
            valueField="value"
            placeholder="경력 선택"
            value={experience}
            onChange={item => {
              setExperience(item.value);
              validateForm();
            }}
            placeholderStyle={{ color: '#101010' }} // 글자색 수정
            itemTextStyle={{ color: '#101010' }} // 드롭다운 리스트 글자색 수정
            selectedTextStyle={{ color: '#101010' }} // 선택된 항목 글자색 수정
          />
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>한줄 소개</Text>
          <TextInput style={styles.input} value={info} onChangeText={setInfo} />
        </View>
      </View>
      <View
        style={[
          styles.signupButton,
          isButtonDisabled ? styles.disabledButton : null,
        ]}
      >
        <TouchableOpacity
          onPress={handleSignup}
          disabled={isButtonDisabled}
          style={styles.button}
        >
          <Text style={styles.buttonText}>회원가입</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>회원 가입에 성공하였습니다!</Text>
            <TouchableOpacity
              onPress={() => {
                setIsModalVisible(false);
                navigation.navigate('Login');
              }}
              style={styles.modalButton}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  formContainer: {
    width: '100%',
    marginBottom: 30,
  },
  formTitle: {
    color: '#101010',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  input: {
    color: 'black',
    width: '100%',
    height: 50,
    borderColor: '#D6D6D6',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  genderSet: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderButton: {
    width: '48%',
    borderColor: '#D6D6D6',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
  },
  selectedGenderButton: {
    backgroundColor: '#73D393', // 활성화 상태 배경색
  },
  genderText: {
    textAlign: 'center',
    color: '#101010',
    fontSize: 14,
    fontWeight: 'bold',
  },
  signupButton: {
    width: '85%',
    paddingVertical: 22,
    marginTop: 30,
    marginBottom: 100,
    backgroundColor: '#73D393',
    borderRadius: 15,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  button: {
    color: '#fff',
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorContainer: {
    height: 20, // 고정 높이 설정
    justifyContent: 'center', // 수직 중앙 정렬
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeIcon: {
    width: 20,
    height: 20,
  },
  birthdateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropdown: {
    width: '30%',
    height: 50,
    borderColor: '#D6D6D6',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
  },
  runningCareerDropdown: {
    height: 50,
    borderColor: '#D6D6D6',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
  },
  disabledButton: {
    backgroundColor: '#E8E8E8',
  },
  buttonText: {
    color: '#fff',
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#73D393',
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
  emailCheckButton: {
    position: 'absolute',
    left: '77%',
    backgroundColor: '#352555',
    borderRadius: 32,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginLeft: 10,
  },
  emailCheckButtonText: {
    color: 'white',
    fontSize: 10,
  },
  nicknameCheckButton: {
    position: 'absolute',
    left: '77%',
    backgroundColor: '#352555',
    borderRadius: 32,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginLeft: 10,
  },
  nicknameCheckButtonText: {
    color: 'white',
    fontSize: 10,
  },
});

export default Signup;
