import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import TimePicker from '../../components/TimePicker';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { getFavoriteCourses } from '../../utils/crew/crew_course';
import SimpleCourse from '../../components/Course/SimpleCourse';
import { registerCrewSchedule } from '../../utils/crew/crew_schedule';
import DateTimePicker from '@react-native-community/datetimepicker';
import { RadioButton } from 'react-native-paper';

import wave from '../../assets/images/Crew/wave.png';

const CrewScheduleRegister = ({ route }) => {
  const { crewId } = route.params;
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [maxParticipants, setMaxParticipants] = useState('');
  const [location, setLocation] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [favoriteCourses, setFavoriteCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchFavoriteCourses = async () => {
      try {
        const courses = await getFavoriteCourses(crewId);
        setFavoriteCourses(courses);
      } catch (error) {
        console.error('Failed to fetch favorite courses:', error);
      }
    };

    fetchFavoriteCourses();
  }, []);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
    checkFormCompletion();
  };

  const handleTimeChange = (type, value) => {
    if (type === 'startTime') {
      setStartTime(value);
    } else {
      setEndTime(value);
    }
    checkFormCompletion();
  };

  const handleCourseSelect = courseId => {
    setSelectedCourseId(courseId);
    checkFormCompletion();
  };

  const checkFormCompletion = () => {
    if (location && startTime && endTime && maxParticipants) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };

  const handleRegisterCrew = async () => {
    console.log('Selected course ID:', selectedCourseId); // 추가된 로그

    const formatDateTime = (date, time) => {
      const datePart = date.toISOString().split('T')[0];
      const timePart = time.toTimeString().split(' ')[0];
      return `${datePart}T${timePart}`;
    };

    const newSchedule = {
      courseId: selectedCourseId,
      startTime: formatDateTime(date, startTime),
      endTime: formatDateTime(date, endTime),
      meetingPlace: location,
      memberMax: parseInt(maxParticipants),
    };

    try {
      await registerCrewSchedule(crewId, newSchedule);
      setModalVisible(true);
    } catch (error) {
      console.error('Failed to register crew schedule:', error);
      alert('일정 등록에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
    navigation.navigate('MyCrew');
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.crewScheduleBox}>
          <Text style={styles.crewScheduleText}>코스 즐겨찾기</Text>
          {favoriteCourses.length > 0 ? (
            favoriteCourses.map((course, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleCourseSelect(course.id)}
                style={styles.courseItem}
              >
                <RadioButton
                  value={course.id}
                  status={
                    selectedCourseId === course.id ? 'checked' : 'unchecked'
                  }
                  color="#73D393"
                  onPress={() => handleCourseSelect(course.id)}
                />
                <SimpleCourse data={course} />
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noCoursesText}>해당 코스가 없습니다...</Text>
          )}
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.title}>날짜 선택</Text>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={styles.datePicker}
          >
            <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.title}>일시 선택</Text>
          <View style={styles.activityTimeDropdownLayout}>
            <TimePicker
              time={startTime}
              setTime={value => handleTimeChange('startTime', value)}
              placeholder="시작 시간"
            />
            <Image source={wave} style={{ width: 25, height: 11 }} />
            <TimePicker
              time={endTime}
              setTime={value => handleTimeChange('endTime', value)}
              placeholder="끝 시간"
            />
          </View>
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.title}>참여 인원</Text>
          <TextInput
            value={maxParticipants}
            onChangeText={text => {
              setMaxParticipants(text);
              checkFormCompletion();
            }}
            placeholder="최대 참여 인원"
            style={styles.input}
            placeholderTextColor="#9B9B9D"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.title}>모집 장소</Text>
          <TextInput
            value={location}
            onChangeText={text => {
              setLocation(text);
              checkFormCompletion();
            }}
            placeholder="모집 장소 지역명명"
            style={styles.input}
            placeholderTextColor="#9B9B9D"
          />
        </View>
        <View
          style={[
            styles.registerCrewButton,
            isButtonDisabled ? styles.disabledButton : null,
          ]}
        >
          <TouchableOpacity
            onPress={handleRegisterCrew}
            disabled={isButtonDisabled}
            style={styles.button}
          >
            <Text style={styles.buttonText}>크루 일정 등록</Text>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                크루 일정 등록이 완료되었습니다!
              </Text>
              <TouchableOpacity
                style={styles.okButton}
                onPress={handleModalClose}
              >
                <Text style={styles.okButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  crewScheduleBox: {
    alignItems: 'center',
    padding: 15,
    borderColor: '#EEEEEE',
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 20,
    marginBottom: 20,
  },
  crewScheduleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 15,
  },
  formContainer: {
    width: '100%',
    marginBottom: 15,
  },
  title: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#352555',
    marginBottom: 15,
  },
  activityTimeDropdownLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    color: 'black',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#9B9B9D',
    paddingLeft: 21,
    paddingVertical: 6,
  },
  datePicker: {
    width: '40%',
    color: 'black',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#9B9B9D',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
  registerCrewButton: {
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
    padding: 10,
    borderRadius: 10,
  },
  okButtonText: {
    color: '#73D393',
    fontSize: 15,
    fontWeight: 'bold',
  },
  noCoursesText: {
    fontSize: 16,
    color: 'grey',
    textAlign: 'center',
    marginTop: 20,
  },
  dateText: {
    fontSize: 16,
    color: 'black',
  },
  courseItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

CrewScheduleRegister.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      crewId: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default CrewScheduleRegister;
