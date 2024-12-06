import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Modal,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation, useRoute } from '@react-navigation/native';
import TimePicker from '../../components/TimePicker';
import crewData from '../../components/Crew/crew.json';

const MyCrewModification = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { crewId } = route.params; // crewId를 올바르게 가져오는지 확인
  const crew = crewData.crew.find(c => c.id === crewId);

  // crew 객체가 존재하지 않을 때의 처리 추가
  if (!crew) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>크루 정보를 불러올 수 없습니다.</Text>
      </View>
    );
  }

  const [name, setName] = useState(crew.name);
  const [shortDescription, setShortDescription] = useState(crew.brief);
  const [detailDescription, setDetailDescription] = useState(crew.description);
  const [city, setCity] = useState(crew.city);
  const [district, setDistrict] = useState(crew.district);
  const [openChatUrl, setOpenChatUrl] = useState(crew.open_chat);
  const [activityTime, setActivityTime] = useState({
    startTime: crew.start_time,
    endTime: crew.end_time,
  });
  const [selectedDays, setSelectedDays] = useState(crew.week);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

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

  const handleSaveChanges = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    navigation.goBack(); // 이전 페이지로 이동
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

  useEffect(() => {
    checkFormCompletion();
  }, [
    name,
    shortDescription,
    detailDescription,
    city,
    district,
    openChatUrl,
    activityTime,
  ]);

  const getTodayDateWithTime = time => {
    const today = new Date();
    const [hours, minutes] = time.split(':');
    today.setHours(hours, minutes, 0, 0);
    return today;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
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
              time={getTodayDateWithTime(activityTime.startTime)}
              setTime={time => {
                setActivityTime({
                  ...activityTime,
                  startTime: time.toTimeString().slice(0, 5),
                });
                checkFormCompletion();
              }}
              placeholder="시작 시간 선택"
            />
            <TimePicker
              time={getTodayDateWithTime(activityTime.endTime)}
              setTime={time => {
                setActivityTime({
                  ...activityTime,
                  endTime: time.toTimeString().slice(0, 5),
                });
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
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>변경 사항이 저장되었습니다!</Text>
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
  },
  formContainer: {
    width: '85%',
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
});

export default MyCrewModification;
