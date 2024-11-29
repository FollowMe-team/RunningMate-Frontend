import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Modal,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import PropTypes from 'prop-types';
import CrewPhotoPicker from '../../components/Crew/CrewPhotoPicker';
import TimePicker from '../../components/TimePicker';

// import plus from '../../assets/images/Crew/plus.png';
// import minus from '../../assets/images/Crew/minus.png';
import wave from '../../assets/images/Crew/wave.png';

const CreateCrew = ({ navigation }) => {
  const [name, setName] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [detailDescription, setDetailDescription] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const cityOptions = [
    { label: '서울', value: '서울' },
    { label: '부산', value: '부산' },
    // ... 다른 도시들 ...
  ];
  const districtOptions = [
    { label: '강남구', value: '강남구' },
    { label: '서초구', value: '서초구' },
    // ... 다른 구/군들 ...
  ];
  const [openChatUrl, setOpenChatUrl] = useState('');
  const [activityTime, setActivityTime] = useState({
    startTime: null,
    endTime: null,
  });
  const [selectedDays, setSelectedDays] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [photos, setPhotos] = useState([]);

  const handleDaySelect = day => {
    let updatedDays = [...selectedDays];
    if (updatedDays.includes(day)) {
      updatedDays = updatedDays.filter(d => d !== day);
    } else {
      updatedDays.push(day);
    }
    setSelectedDays(updatedDays);
  };

  const isDaySelected = day => selectedDays.includes(day);

  const handleSignup = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    navigation.navigate('Crew');
  };

  const checkFormCompletion = () => {
    if (
      name &&
      shortDescription &&
      detailDescription &&
      city &&
      district &&
      openChatUrl &&
      activityTime.startTime &&
      activityTime.endTime
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.photoContainer}>
          <CrewPhotoPicker photos={photos} setPhotos={setPhotos} />
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.title}>크루명</Text>
          <TextInput
            value={name}
            onChangeText={text => {
              setName(text);
              checkFormCompletion();
            }}
            placeholder="크루 이름을 적어주세요(욕설, 비하 발언 금지)"
            style={styles.input}
            placeholderTextColor="#9B9B9D"
          />
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.title}>크루 간단 소개</Text>
          <TextInput
            value={shortDescription}
            onChangeText={text => {
              setShortDescription(text);
              checkFormCompletion();
            }}
            placeholder="간단한 크루 활동의 목적"
            style={styles.input}
            placeholderTextColor="#9B9B9D"
          />
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.title}>크루 상세 소개 글</Text>
          <TextInput
            value={detailDescription}
            onChangeText={text => {
              setDetailDescription(text);
              checkFormCompletion();
            }}
            placeholder="활동 규칙, 뛰는 주기 등등..."
            style={[styles.input, { height: 200 }]}
            placeholderTextColor="#9B9B9D"
            multiline={true}
            scrollEnabled={true}
          />
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.title}>위치</Text>
          <View style={styles.locationLayout}>
            <Dropdown
              style={styles.locationDropdown}
              data={cityOptions}
              labelField="label"
              valueField="value"
              placeholder="시/도 선택"
              value={city}
              onChange={item => {
                setCity(item.value);
                checkFormCompletion();
              }}
              placeholderStyle={{ color: '#101010' }}
              itemTextStyle={{ color: '#101010' }}
              selectedTextStyle={{ color: '#101010' }}
            />
            <Dropdown
              style={styles.locationDropdown}
              data={districtOptions}
              labelField="label"
              valueField="value"
              placeholder="구/군 선택"
              value={district}
              onChange={item => {
                setDistrict(item.value);
                checkFormCompletion();
              }}
              placeholderStyle={{ color: '#101010' }}
              itemTextStyle={{ color: '#101010' }}
              selectedTextStyle={{ color: '#101010' }}
            />
          </View>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.titleSet}>
            <Text style={styles.title}>크루 참여 조건</Text>
            <Text style={styles.subTitle}>(선택)</Text>
          </View>
          <View>
            <Dropdown
              style={styles.defaultDropdown}
              data={[]}
              labelField="label"
              valueField="value"
              placeholder="(미선택)"
              value={''}
              onChange={() => {}}
              placeholderStyle={{ color: '#101010' }}
              itemTextStyle={{ color: '#101010' }}
              selectedTextStyle={{ color: '#101010' }}
            />
          </View>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.titleSet}>
            <Text style={styles.title}>주 활동 시간대</Text>
            <Text style={styles.subTitle}>(중복 선택 가능)</Text>
          </View>
          <View style={styles.weekButtonLayout}>
            {['월', '화', '수', '목', '금', '토', '일'].map(day => (
              <TouchableOpacity
                key={day}
                style={[
                  styles.weekSelectButton,
                  isDaySelected(day) && styles.weekSelectButtonActive,
                ]}
                onPress={() => handleDaySelect(day)}
              >
                <View>
                  <Text
                    style={[
                      styles.weekSelectButtonText,
                      isDaySelected(day) && styles.weekSelectButtonTextActive,
                    ]}
                  >
                    {day}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.titleSet}>
            <Text style={styles.title}>주 활동 시간대</Text>
            <Text style={styles.subTitle}>(중복 선택 가능)</Text>
          </View>
          <View style={styles.activityTimeDropdownLayout}>
            <TimePicker
              time={activityTime.startTime}
              setTime={time => {
                setActivityTime({ ...activityTime, startTime: time });
                checkFormCompletion();
              }}
              placeholder="시작 시간 선택"
            />
            <Image source={wave} style={{ width: 25, height: 11 }} />
            <TimePicker
              time={activityTime.endTime}
              setTime={time => {
                setActivityTime({ ...activityTime, endTime: time });
                checkFormCompletion();
              }}
              placeholder="끝 시간 선택"
            />
          </View>
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.title}>
            오픈채팅방 생성하기 or 채팅방 링크 넣기
          </Text>
          <TextInput
            value={openChatUrl}
            onChangeText={text => {
              setOpenChatUrl(text);
              checkFormCompletion();
            }}
            placeholder="kakao.com"
            style={styles.input}
            placeholderTextColor="#9B9B9D"
          />
        </View>
        <View
          style={[
            styles.createCrewButton,
            isButtonDisabled ? styles.disabledButton : null,
          ]}
        >
          <TouchableOpacity
            onPress={handleSignup}
            disabled={isButtonDisabled}
            style={styles.button}
          >
            <Text style={styles.buttonText}>크루 생성 신청</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>크루 생성 신청이 완료되었습니다!</Text>
          <TouchableOpacity style={styles.okButton} onPress={handleModalClose}>
            <Text style={styles.okButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 50,
  },
  formContainer: {
    width: '85%',
    marginBottom: 12,
  },
  photoContainer: {
    flexDirection: 'row',
    marginVertical: 33,
  },
  photoSet: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#636363',
    marginRight: 10,
  },
  photoSetSecond: {
    position: 'absolute',
    top: 0,
    right: -10,
    zIndex: -1,
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  photoCount: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 100,
  },
  photoButtonText: {
    color: '#636363',
    fontSize: 10,
    fontWeight: 'regular',
    textAlign: 'center',
  },
  titleSet: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#101010',
    marginRight: 5,
  },
  subTitle: {
    fontSize: 14,
    fontWeight: 'regular',
    color: '#101010',
  },
  input: {
    color: 'black',
    width: '100%',
    height: 50,
    borderColor: '#D6D6D6',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginTop: 8,
  },
  defaultDropdown: {
    width: '100%',
    borderColor: '#D6D6D6',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginTop: 8,
  },
  locationLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  locationDropdown: {
    width: '48%',
    borderColor: '#D6D6D6',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginTop: 8,
  },
  timeDropdown: {
    width: '45%',
    borderColor: '#D6D6D6',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginTop: 8,
  },
  weekButtonLayout: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 8,
  },
  weekSelectButton: {
    padding: 16,
    backgroundColor: 'white',
    borderColor: '#D6D6D6',
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
  },
  weekSelectButtonActive: {
    backgroundColor: '#73D393',
    borderWidth: 0,
  },
  weekSelectButtonText: {
    fontSize: 14,
    fontWeight: 'medium',
    color: '#101010',
  },
  weekSelectButtonTextActive: {
    color: 'white',
  },
  plusButton: {
    justifyContent: 'center',
    paddingVertical: 2,
    paddingHorizontal: 16,
    borderColor: '#D6D6D6',
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 8,
  },
  minusButton: {
    justifyContent: 'center',
    paddingVertical: 2,
    paddingHorizontal: 16,
    borderColor: '#D6D6D6',
    borderWidth: 1,
    borderRadius: 8,
  },
  activityTimeDropdownLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  createCrewButton: {
    width: '85%',
    paddingVertical: 22,
    marginTop: 100,
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
  disabledButton: {
    backgroundColor: '#E8E8E8',
  },
  buttonText: {
    color: '#fff',
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  okButton: {
    backgroundColor: '#73D393',
    padding: 10,
    borderRadius: 10,
  },
  okButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
CreateCrew.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default CreateCrew;
