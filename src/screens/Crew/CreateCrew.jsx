import React, { useState, useRef } from 'react';
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
import DropDownPicker from 'react-native-dropdown-picker';
import PropTypes from 'prop-types';
import CrewPhotoPicker from '../../components/Crew/CrewPhotoPicker';
import { createCrew, checkCrewName } from '../../utils/crew/crew';
import cityData from '../../components/Crew/city.json';
import { rankImages } from '../../components/Rank';
import ActivitySelector from '../../components/ActivitySelector';

// import plus from '../../assets/images/Crew/plus.png';
// import minus from '../../assets/images/Crew/minus.png';

const CreateCrew = ({ navigation }) => {
  const [name, setName] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [detailDescription, setDetailDescription] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const cityOptions = cityData.cities.map(city =>
    typeof city === 'string'
      ? { label: city, value: city }
      : { label: city.name, value: city.name },
  );
  const districtOptions = cityData.cities
    .find(city => city.name === '인천광역시')
    .districts.map(district => ({
      label: district,
      value: district,
    }));
  const [ranking, setRanking] = useState('');
  const [openChatUrl, setOpenChatUrl] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [photo, setPhoto] = useState();
  const [nameCheckModalVisible, setNameCheckModalVisible] = useState(false);
  const rankOptions = [
    {
      label: '스피드 데몬',
      value: 'SPEED_DEMON',
      image: rankImages.SPEED_DEMON,
    },
    { label: '아이언 레그', value: 'IRON_LEGS', image: rankImages.IRON_LEGS },
    {
      label: '울트라 러너',
      value: 'ULTRA_RUNNER',
      image: rankImages.ULTRA_RUNNER,
    },
    { label: '마라토너', value: 'MARATHONER', image: rankImages.MARATHONER },
    { label: '스프린터', value: 'SPRINTER', image: rankImages.SPRINTER },
    { label: '레이서', value: 'RACER', image: rankImages.RACER },
    { label: '러너', value: 'RUNNER', image: rankImages.RUNNER },
    { label: '조깅러', value: 'JOGGER', image: rankImages.JOGGER },
  ];
  const [openCity, setOpenCity] = useState(false);
  const [openDistrict, setOpenDistrict] = useState(false);
  const [openRank, setOpenRank] = useState(false);
  const scrollViewRef = useRef(null);
  const [activityTimes, setActivityTimes] = useState([]);
  const [nameError, setNameError] = useState('');
  const [isNameChecked, setIsNameChecked] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleDaySelect = day => {
    let updatedDays = [...selectedDays];
    if (updatedDays.includes(day)) {
      updatedDays = updatedDays.filter(d => d !== day);
      setActivityTimes(activityTimes.filter(time => time.day !== day));
    } else {
      updatedDays.push(day);
      setActivityTimes([
        ...activityTimes,
        { day, startTime: null, endTime: null },
      ]);
    }
    setSelectedDays(updatedDays);
  };

  const updateActivityTime = (day, startTime, endTime) => {
    setActivityTimes(
      activityTimes.map(time =>
        time.day === day ? { ...time, startTime, endTime } : time,
      ),
    );
  };

  const isDaySelected = day => selectedDays.includes(day);

  const handleNameCheck = async () => {
    try {
      const isDuplicated = await checkCrewName(name);
      if (!isDuplicated) {
        setIsNameChecked(true);
        setNameError('');
        setModalMessage('사용 가능한 크루명입니다.');
        setNameCheckModalVisible(true);
      } else {
        setIsNameChecked(false);
        setNameError('이미 사용 중인 크루명입니다.');
        setModalMessage('이미 사용 중인 크루명입니다.');
        setNameCheckModalVisible(true);
      }
    } catch {
      setIsNameChecked(false);
      setNameError('크루명 확인 중 오류가 발생했습니다.');
      setModalMessage('크루명 확인 중 오류가 발생했습니다.');
      setNameCheckModalVisible(true);
    }
  };

  const handleNameCheckModalClose = () => {
    setNameCheckModalVisible(false);
  };

  const validateName = name => {
    setName(name);
    setIsNameChecked(false); // 크루명이 변경되면 중복 확인 상태를 초기화
  };

  const handleSignup = async () => {
    if (!isNameChecked) {
      setNameError('크루명 중복 체크를 해주세요.');
      setModalMessage('크루명 중복 체크를 해주세요.');
      setNameCheckModalVisible(true);
      return;
    }
    const dayMap = {
      월: 'MONDAY',
      화: 'TUESDAY',
      수: 'WEDNESDAY',
      목: 'THURSDAY',
      금: 'FRIDAY',
      토: 'SATURDAY',
      일: 'SUNDAY',
    };

    const formatTime = date => {
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    };

    const crewData = {
      name,
      shortDescription,
      detailDescription,
      city,
      district,
      ranking,
      openChatUrl,
      activityTimes: activityTimes.map(({ day, startTime, endTime }) => ({
        startTime: startTime ? formatTime(startTime) : '',
        endTime: endTime ? formatTime(endTime) : '',
        type: dayMap[day],
      })),
    };

    console.log('Sending Crew Data:', crewData); // 보낸 데이터 로그 추가

    try {
      const crewId = await createCrew(crewData, photo);
      console.log('Created Crew ID:', crewId); // crewId 출력
      setModalMessage('크루 생성이 완료되었습니다.');
      setModalVisible(true);
    } catch (error) {
      console.error('Failed to create crew:', error);
      alert('크루 생성에 실패했습니다. 다시 시도해주세요.');
    }
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
      ranking &&
      openChatUrl &&
      activityTimes.every(({ startTime, endTime }) => startTime && endTime)
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };

  const handleRankChange = value => {
    setRanking(value);
    setOpenRank(false);
    checkFormCompletion();
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      style={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.photoContainer}>
          <CrewPhotoPicker photo={photo} setPhoto={setPhoto} />
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.title}>크루명</Text>
          <View style={styles.inputContainer}>
            <TextInput
              value={name}
              onChangeText={validateName}
              placeholder="크루 이름을 적어주세요(욕설, 비하 발언 금지)"
              style={styles.input}
              placeholderTextColor="#9B9B9D"
            />
            <TouchableOpacity
              style={styles.nameCheckButton}
              onPress={handleNameCheck}
            >
              <Text style={styles.nameCheckButtonText}>중복 체크</Text>
            </TouchableOpacity>
            {nameError ? (
              <Text style={styles.errorText}>{nameError}</Text>
            ) : null}
          </View>
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
        <View style={[styles.formContainer, { zIndex: 3000 }]}>
          <Text style={styles.title}>위치</Text>
          <View style={styles.locationLayout}>
            <View style={styles.dropdownWrapper}>
              <DropDownPicker
                open={openCity}
                value={city}
                items={cityOptions}
                setOpen={setOpenCity}
                setValue={setCity}
                setItems={() => {}}
                placeholder="시/도 선택"
                style={styles.locationDropdown}
                dropDownContainerStyle={styles.dropDownContainer}
                placeholderStyle={{ color: '#101010' }}
                itemTextStyle={{ color: '#101010' }}
                selectedTextStyle={{ color: '#101010' }}
                onChangeValue={() => checkFormCompletion()}
                nestedScrollEnabled={true}
                dropDownDirection="AUTO"
              />
            </View>
            <View style={styles.dropdownWrapper}>
              <DropDownPicker
                open={openDistrict}
                value={district}
                items={districtOptions}
                setOpen={setOpenDistrict}
                setValue={setDistrict}
                setItems={() => {}}
                placeholder="구/군 선택"
                style={styles.locationDropdown}
                dropDownContainerStyle={styles.dropDownContainer}
                placeholderStyle={{ color: '#101010' }}
                itemTextStyle={{ color: '#101010' }}
                selectedTextStyle={{ color: '#101010' }}
                onChangeValue={() => checkFormCompletion()}
                nestedScrollEnabled={true}
                dropDownDirection="AUTO"
              />
            </View>
          </View>
        </View>
        <View style={[styles.formContainer, { zIndex: 2000 }]}>
          <View style={styles.titleSet}>
            <Text style={styles.title}>크루 참여 조건</Text>
            <Text style={styles.subTitle}>(선택)</Text>
          </View>
          <View>
            <DropDownPicker
              open={openRank}
              value={ranking}
              items={rankOptions}
              setOpen={setOpenRank}
              setValue={handleRankChange}
              setItems={() => {}}
              placeholder="(미선택)"
              style={styles.defaultDropdown}
              dropDownContainerStyle={styles.dropDownContainer}
              placeholderStyle={{ color: '#101010' }}
              itemTextStyle={{ color: '#101010' }}
              selectedTextStyle={{ color: '#101010' }}
              renderListItem={({ item }) => (
                <TouchableOpacity
                  onPress={handleRankChange.bind(this, item.value)}
                  style={styles.rankItem}
                >
                  <Image source={item.image} style={styles.rankImage} />
                  <Text style={styles.rankLabel}>{item.label}</Text>
                </TouchableOpacity>
              )}
              nestedScrollEnabled={true}
              dropDownDirection="AUTO"
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
          {selectedDays.map(day => (
            <ActivitySelector
              key={day}
              day={day}
              activityTime={activityTimes.find(time => time.day === day)}
              updateActivityTime={(day, startTime, endTime) => {
                updateActivityTime(day, startTime, endTime);
                checkFormCompletion();
              }}
            />
          ))}
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
        animationType="fade"
        transparent={true}
        visible={nameCheckModalVisible}
        onRequestClose={() => setNameCheckModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity
              style={styles.okButton}
              onPress={handleNameCheckModalClose}
            >
              <Text style={styles.okButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity
              style={styles.okButton}
              onPress={handleModalClose}
            >
              <Text style={styles.okButtonText}>OK</Text>
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
    marginBottom: 50,
    marginHorizontal: 20,
  },
  formContainer: {
    width: '100%',
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
  dropdownWrapper: {
    flex: 1,
    marginRight: 8,
  },
  locationDropdown: {
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
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 50,
  },
  okButton: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  okButtonText: {
    color: '#73D393',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  rankItem: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 999,
  },
  rankLabel: {
    marginLeft: 10,
    padding: 5,
    color: '#101010',
  },
  rankImage: {
    width: 75,
    height: 25,
  },
  dropDownContainer: {
    borderColor: '#D6D6D6',
  },
  inputContainer: {
    position: 'relative',
  },
  nameCheckButton: {
    position: 'absolute',
    right: 10,
    top: 15.5,
    backgroundColor: '#352555',
    borderRadius: 32,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  nameCheckButtonText: {
    color: 'white',
    fontSize: 10,
  },
  errorText: {
    position: 'absolute',
    bottom: -20,
    left: 0,
    color: 'red',
    fontSize: 14,
  },
});
CreateCrew.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default CreateCrew;
