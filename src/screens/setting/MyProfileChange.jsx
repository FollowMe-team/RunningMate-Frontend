import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dropdown } from 'react-native-element-dropdown';
import {
  updateProfile,
  checkNickname,
  getProfileSummary,
} from '../../utils/api';

import ProfilePhotoPicker from './ProfilePhotoPicker';
import calendarIcon from '../../assets/images/Settings/free-icon-calendar-8786347.png';
import AddressInput from '../../components/AddressInput';

const MyProfileChange = () => {
  const navigation = useNavigation();

  const [photo, setPhoto] = useState(null);
  const [nickname, setNickname] = useState('');
  const [info, setInfo] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [nicknameError, setNicknameError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      const response = await getProfileSummary();
      if (response.data) {
        setPhoto(response.data.profileImageUrl || null);
        setNickname(response.data.nickname);
        setInfo(response.data.introduce);
        setBirthday(response.data.birth.replace(/-/g, '.'));
        setGender(response.data.gender === 'MALE' ? '남' : '여');
        setAddress(response.data.locationInfo.address);
      }
    };
    loadProfile();
  }, []);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthday;
    setShowDatePicker(false);
    setBirthday(currentDate.toISOString().split('T')[0].replace(/-/g, '.'));
  };

  const handleAddressChange = newAddress => {
    setAddress(newAddress);
  };

  const handleNicknameCheck = async () => {
    try {
      const response = await checkNickname(nickname);
      if (!response.data.isDuplicated) {
        setIsNicknameChecked(true);
        setNicknameError('');
        setModalMessage('사용 가능한 닉네임입니다.');
        setModalVisible(true);
      } else {
        setIsNicknameChecked(false);
        setNicknameError('이미 사용 중인 닉네임입니다.');
        setModalMessage('이미 사용 중인 닉네임입니다.');
        setModalVisible(true);
      }
    } catch {
      setIsNicknameChecked(false);
      setNicknameError('닉네임 확인 중 오류가 발생했습니다.');
      setModalMessage('닉네임 확인 중 오류가 발생했습니다.');
      setModalVisible(true);
    }
  };

  const validateNickname = nickname => {
    const nicknameRegex = /^.{2,12}$/; // 2자리 이상 12자리 이하
    if (!nicknameRegex.test(nickname)) {
      setNicknameError('2자리 이상 12자리 이하이어야 합니다.');
    } else {
      setNicknameError('');
    }
    setNickname(nickname);
    setIsNicknameChecked(false); // 닉네임이 변경되면 중복 확인 상태를 초기화
  };

  const handleProfileChange = async () => {
    if (!isNicknameChecked) {
      setNicknameError('닉네임 중복 체크를 해주세요.');
      setModalMessage('닉네임 중복 체크를 해주세요.');
      setModalVisible(true);
      return;
    }

    const profileData = {
      gender: gender === '남' ? 'MALE' : 'FEMALE',
      nickname,
      birth: birthday.replace(/\./g, '-'),
      introduce: info,
      locationInfo: {
        address,
        latitude: 0,
        longitude: 0,
      },
    };

    const result = await updateProfile(profileData, photo);
    if (result.success) {
      await AsyncStorage.setItem('myprofile', JSON.stringify(profileData));
      setModalMessage('마이 프로필 변경이 완료되었어요!');
      setModalVisible(true);
    } else {
      setModalMessage(result.message);
      setModalVisible(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    if (modalMessage === '마이 프로필 변경이 완료되었어요!') {
      navigation.navigate('Setting');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <ProfilePhotoPicker photo={photo} setPhoto={setPhoto} />
      <View style={styles.bundle}>
        <Text style={styles.title}>닉네임</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={nickname}
            onChangeText={validateNickname}
          />
          <TouchableOpacity
            style={styles.nicknameCheckButton}
            onPress={handleNicknameCheck}
          >
            <Text style={styles.nicknameCheckButtonText}>중복 체크</Text>
          </TouchableOpacity>
          {nicknameError ? (
            <Text style={styles.errorText}>{nicknameError}</Text>
          ) : null}
        </View>
      </View>
      <View style={styles.bundle}>
        <Text style={styles.title}>한줄 소개</Text>
        <TextInput style={styles.input} value={info} onChangeText={setInfo} />
      </View>
      <View style={styles.set}>
        <View style={styles.bundleHalf}>
          <Text style={styles.title}>생일</Text>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={styles.dateInput}
          >
            <Text style={styles.dateText}>{birthday}</Text>
            <Image source={calendarIcon} style={styles.calendarIcon} />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={new Date(birthday.replace(/\./g, '-'))}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>
        <View style={styles.bundleHalf}>
          <Text style={styles.title}>성별</Text>
          <Dropdown
            style={styles.dropdown}
            data={[
              { label: '남', value: '남' },
              { label: '여', value: '여' },
            ]}
            labelField="label"
            valueField="value"
            placeholder="성별 선택"
            value={gender}
            onChange={item => setGender(item.value)}
            placeholderStyle={{ color: '#101010' }}
            itemTextStyle={{ color: '#101010' }}
            selectedTextStyle={{ color: '#101010' }}
          />
        </View>
      </View>
      <View style={styles.bundle}>
        <Text style={styles.title}>주소</Text>
        <AddressInput address={address} onAddressChange={handleAddressChange} />
      </View>
      <View style={styles.changeButton}>
        <TouchableOpacity onPress={handleProfileChange}>
          <Text style={styles.button}>변경하기</Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
        animationType="fade"
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.modalButtonText}>확인</Text>
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
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  set: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addressSet: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  bundle: {
    padding: 20,
    borderBottomColor: '#E5E5E5',
  },
  bundleHalf: {
    flex: 1,
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
  },
  addressInput: {
    flex: 3,
    color: 'black',
    height: 50,
    borderRadius: 8,
    borderColor: '#D6D6D6',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 15,
  },
  dateInput: {
    height: 50,
    borderRadius: 8,
    borderColor: '#D6D6D6',
    borderWidth: 1,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateText: {
    color: 'black',
  },
  calendarIcon: {
    width: 20,
    height: 20,
  },
  pickerContainer: {
    height: 50,
    borderRadius: 8,
    borderColor: '#D6D6D6',
    borderWidth: 1,
    justifyContent: 'center',
  },
  pickerIcon: {
    width: 20,
    height: 20,
  },
  addressButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 15,
    backgroundColor: '#4A9B8C',
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
  errorText: {
    position: 'absolute',
    bottom: -20,
    left: 0,
    color: 'red',
    fontSize: 14,
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
  nicknameCheckButton: {
    position: 'absolute',
    right: 10,
    top: 8,
    backgroundColor: '#352555',
    borderRadius: 32,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  nicknameCheckButtonText: {
    color: 'white',
    fontSize: 10,
  },
  dropdown: {
    height: 50,
    borderColor: '#D6D6D6',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
  },
});

MyProfileChange.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default MyProfileChange;
