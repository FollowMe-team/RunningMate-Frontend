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
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ProfilePhotoPicker from './ProfilePhotoPicker';
import calendarIcon from '../../assets/images/Settings/free-icon-calendar-8786347.png';
import down from '../../assets/images/Settings/free-icon-down-arrow-748063.png';

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
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      const profile = await AsyncStorage.getItem('myprofile');
      if (profile) {
        const parsedProfile = JSON.parse(profile);
        setPhoto(parsedProfile.profile_url || null);
        setNickname(parsedProfile.nickname);
        setInfo(parsedProfile.info);
        setBirthday(parsedProfile.birthday);
        setGender(parsedProfile.gender);
        setAddress(parsedProfile.address);
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

  const validateNickname = nickname => {
    const nicknameRegex = /^.{2,12}$/; // 2자리 이상 12자리 이하
    if (!nicknameRegex.test(nickname)) {
      setNicknameError('2자리 이상 12자리 이하이어야 합니다.');
    } else {
      setNicknameError('');
    }
    setNickname(nickname);
  };

  const handleProfileChange = async () => {
    // 프로필 정보 변경 로직 추가
    const updatedProfile = {
      profile_url: photo,
      nickname,
      info,
      birthday,
      gender,
      address,
    };
    await AsyncStorage.setItem('myprofile', JSON.stringify(updatedProfile));

    // 변경 완료 메시지 출력
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    navigation.goBack();
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
          <View style={styles.pickerContainer}>
            <RNPickerSelect
              value={gender}
              onValueChange={value => setGender(value)}
              items={[
                { label: '남', value: '남' },
                { label: '여', value: '여' },
              ]}
              style={pickerSelectStyles}
              Icon={() => {
                return <Image source={down} style={styles.pickerIcon} />;
              }}
            />
          </View>
        </View>
      </View>
      <View style={styles.bundle}>
        <Text style={styles.title}>주소</Text>
        <View style={styles.addressSet}>
          <TextInput
            style={styles.addressInput}
            value={address}
            editable={false}
          />
          <TouchableOpacity
            style={styles.addressButton}
            onPress={() =>
              navigation.navigate('SearchAddress', {
                onAddressSelected: handleAddressChange,
              })
            }
          >
            <Text style={styles.button}>검색</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.changeButton}>
        <TouchableOpacity onPress={handleProfileChange}>
          <Text style={styles.button}>변경하기</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              마이 프로필 변경이 완료되었어요!
            </Text>
            <TouchableOpacity onPress={closeModal} style={styles.modalButton}>
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 50,
    borderRadius: 8,
    borderColor: '#D6D6D6',
    borderWidth: 1,
    paddingHorizontal: 10,
    color: 'black',
  },
  inputAndroid: {
    height: 50,
    borderRadius: 8,
    borderColor: '#D6D6D6',
    borderWidth: 1,
    paddingHorizontal: 10,
    color: 'black',
  },
  iconContainer: {
    top: 15,
    right: 15,
  },
  placeholder: {
    color: 'black',
  },
  done: {
    borderTopColor: '#D6D6D6',
    borderTopWidth: 1,
  },
});

MyProfileChange.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default MyProfileChange;
