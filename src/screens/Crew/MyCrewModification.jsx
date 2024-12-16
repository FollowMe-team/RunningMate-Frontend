import React, { useState, useEffect, useRef } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Modal,
  Image,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';

import {
  getCrewDetailForModification,
  modifyCrew,
} from '../../utils/crew/crew2';
import CrewPhotoPicker from '../../components/Crew/CrewPhotoPicker';
import ActivitySelector from '../../components/ActivitySelector';

import { checkCrewName } from '../../utils/crew/crew';
import cityData from '../../components/Crew/city.json';
import { rankImages } from '../../components/Rank';

const MyCrewModification = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { crewId } = route.params; // crewId를 올바르게 가져오는지 확인

  const [photos, setPhotos] = useState([]);
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
  const [openChatUrl, setOpenChatUrl] = useState('');
  const [activityTime, setActivityTime] = useState({
    startTime: '',
    endTime: '',
  });
  const [selectedDays, setSelectedDays] = useState([]);
  const [activityTimes, setActivityTimes] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRank, setSelectedRank] = useState('');
  const [nameError, setNameError] = useState('');
  const [isNameChecked, setIsNameChecked] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [openCity, setOpenCity] = useState(false);
  const [openDistrict, setOpenDistrict] = useState(false);
  const [openRank, setOpenRank] = useState(false);
  const scrollViewRef = useRef(null);
  const [nameCheckModalVisible, setNameCheckModalVisible] = useState(false);
  const [initialName, setInitialName] = useState('');

  const dayMap = {
    월: 'MONDAY',
    화: 'TUESDAY',
    수: 'WEDNESDAY',
    목: 'THURSDAY',
    금: 'FRIDAY',
    토: 'SATURDAY',
    일: 'SUNDAY',
  };

  const reverseDayMap = {
    MONDAY: '월',
    TUESDAY: '화',
    WEDNESDAY: '수',
    THURSDAY: '목',
    FRIDAY: '금',
    SATURDAY: '토',
    SUNDAY: '일',
  };

  const convertTo12HourFormat = time => {
    const [hour, minute] = time.split(':');
    const hourInt = parseInt(hour, 10);
    const period = hourInt >= 12 ? '오후' : '오전';
    const adjustedHour = hourInt % 12 || 12;
    return `${period} ${adjustedHour}:${minute}`;
  };

  const convertToDate = timeString => {
    const [period, time] = timeString.split(' ');
    const [hour, minute] = time.split(':');
    let hourInt = parseInt(hour, 10);
    if (period === '오후' && hourInt !== 12) {
      hourInt += 12;
    } else if (period === '오전' && hourInt === 12) {
      hourInt = 0;
    }
    const date = new Date();
    date.setHours(hourInt);
    date.setMinutes(minute);
    return date;
  };

  useEffect(() => {
    const fetchCrewData = async () => {
      try {
        const crew = await getCrewDetailForModification(crewId);
        setPhotos([crew.profileImageUrl]);
        setName(crew.name);
        setInitialName(crew.name); // 초기 크루명 설정
        setShortDescription(crew.shortDescription);
        setDetailDescription(crew.detailDescription);
        setCity(crew.city);
        setDistrict(crew.district);
        setOpenChatUrl(crew.openChatUrl);
        setActivityTime({
          startTime: convertToDate(
            convertTo12HourFormat(crew.crewActivityTimeList[0].startTime),
          ),
          endTime: convertToDate(
            convertTo12HourFormat(crew.crewActivityTimeList[0].endTime),
          ),
        });
        setSelectedDays(
          crew.crewActivityTimeList.map(
            time => reverseDayMap[time.activityTimes],
          ),
        );
        setSelectedRank(crew.ranking);
      } catch (error) {
        console.error('Failed to fetch crew data:', error);
        alert('크루 정보를 불러오는데 실패했습니다.');
      }
    };

    fetchCrewData();
  }, [crewId]);

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
      } else {
        setIsNameChecked(false);
        setNameError('이미 사용 중인 크루명입니다.');
        setModalMessage('이미 사용 중인 크루명입니다.');
      }
      setNameCheckModalVisible(true);
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

  const handleSaveChanges = async () => {
    if (!isNameChecked && name !== initialName) {
      setNameError('크루명 중복 체크를 해주세요.');
      setModalMessage('크루명 중복 체크를 해주세요.');
      setNameCheckModalVisible(true);
      return;
    }
    const crewData = {
      name,
      shortDescription,
      detailDescription,
      city,
      district,
      ranking: selectedRank,
      openChatUrl,
      activityTimes: selectedDays.map(day => ({
        startTime: activityTime.startTime,
        endTime: activityTime.endTime,
        activityTimes: dayMap[day],
      })),
    };

    try {
      const updatedCrew = await modifyCrew(crewId, crewData, photos[0] || null); // representativeImage 전달
      setModalMessage('변경 사항이 저장되었습니다!');
      setModalVisible(true);
      navigation.setParams({ crew: updatedCrew }); // 수정된 크루 정보 전달
    } catch (error) {
      console.error('Failed to save changes:', error);
      alert('크루 정보를 수정하는데 실패했습니다.');
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
    navigation.goBack(); // 이전 페이지로 이동
  };

  const checkFormCompletion = () => {
    if (
      shortDescription &&
      detailDescription &&
      city &&
      district &&
      selectedRank &&
      openChatUrl &&
      activityTime.startTime &&
      activityTime.endTime
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };

  const handleRankChange = value => {
    setSelectedRank(value);
    setOpenRank(false);
    checkFormCompletion();
  };

  useEffect(() => {
    checkFormCompletion();
  }, [
    shortDescription,
    detailDescription,
    city,
    district,
    selectedRank,
    openChatUrl,
    activityTime,
  ]);

  return (
    <ScrollView
      ref={scrollViewRef}
      style={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.photoContainer}>
          <CrewPhotoPicker photo={photos[0]} setPhoto={setPhotos} />
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
              <Text style={styles.nameErrorText}>{nameError}</Text>
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
            style={[styles.input, { height: 200, textAlignVertical: 'top' }]}
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
                onChangeValue={() => {
                  checkFormCompletion();
                }}
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
                onChangeValue={() => {
                  checkFormCompletion();
                }}
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
              value={selectedRank}
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
              activityTime={
                activityTimes.find(time => time.day === day) || {
                  startTime: null,
                  endTime: null,
                }
              }
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
            onPress={handleSaveChanges}
            disabled={isButtonDisabled}
            style={styles.button}
          >
            <Text style={styles.buttonText}>변경 사항 저장</Text>
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
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity onPress={handleNameCheckModalClose}>
              <Text style={styles.modalButtonText}>OK</Text>
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
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity onPress={handleModalClose}>
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
    marginBottom: 50,
    marginHorizontal: 20,
  },
  photoContainer: {
    marginBottom: 20,
  },
  formContainer: {
    width: '100%',
    marginBottom: 12,
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
    width: '103%',
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  nameCheckButton: {
    position: 'absolute',
    right: 10,
    top: 15,
    backgroundColor: '#352555',
    borderRadius: 32,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  nameCheckButtonText: {
    color: 'white',
    fontSize: 10,
  },
  nameErrorText: {
    position: 'absolute',
    bottom: -20,
    left: 0,
    color: 'red',
    fontSize: 14,
  },
  dropdownWrapper: {
    flex: 1,
    marginRight: 8,
  },
  dropDownContainer: {
    borderColor: '#D6D6D6',
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
});

export default MyCrewModification;
