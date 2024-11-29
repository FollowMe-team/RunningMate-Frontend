import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Header from '../../components/Header';

import Calendars from '../../components/Calendars';
import schedule from '../../components/Crew/schedule.json';

import add from '../../assets/images/Crew/icons8-help.png';
import CrewActivityPicture from '../../components/Crew/CrewActivityPicture';

const MyCrew = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmationModalVisible, setConfirmationModalVisible] =
    useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [confirmationFadeAnim] = useState(new Animated.Value(0));

  const crew = route.params?.crew;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: ({ navigation }) => (
        <Header
          title={crew.name}
          navigation={navigation}
          openChatUrl={crew.open_chat}
        />
      ),
    });
  }, [navigation, crew]);

  if (!crew) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>크루 정보를 불러올 수 없습니다.</Text>
      </View>
    );
  }

  const handleDayPress = day => {
    const scheduleForDay = schedule.find(item => item.date === day.dateString);
    setSelectedSchedule(scheduleForDay || null);
  };

  const handleLeaveCrew = () => {
    setModalVisible(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  const confirmLeaveCrew = () => {
    closeModal();
    setConfirmationModalVisible(true);
    Animated.timing(confirmationFadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const closeConfirmationModal = () => {
    Animated.timing(confirmationFadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setConfirmationModalVisible(false);
      crew.is_my_crew = false;
      navigation.navigate('Crew');
    });
  };

  return (
    <ScrollView>
      <CrewActivityPicture profileUrls={crew.profile_url} />
      <View style={styles.container}>
        <View style={{ marginHorizontal: 20 }}>
          <View style={styles.crewScheduleLayout}>
            <Text style={styles.mainTitle}>크루 일정</Text>
            <View style={{ alignItems: 'center', width: '100%' }}>
              <Calendars dataSource={schedule} onDayPress={handleDayPress} />
            </View>
          </View>
          <View style={styles.boxLayout}>
            <View style={styles.crewScheduleBox}>
              <View style={styles.crewScheduleHeader}>
                <Text style={styles.crewScheduleText}>크루 일정</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('CrewScheduleRegister')}
                  style={styles.crewScheduleAddButton}
                >
                  <Image source={add} style={{ width: 20, height: 20 }} />
                </TouchableOpacity>
              </View>
              <View style={styles.crewScheduleDetail}>
                {selectedSchedule ? (
                  <Text style={styles.crewScheduleDetailText}>
                    일시:{' '}
                    {`${selectedSchedule.date} ${selectedSchedule.start_time}~${selectedSchedule.end_time}\n`}
                    참여 인원:{' '}
                    {`(${selectedSchedule.participants}/${selectedSchedule.max_participants})\n`}
                    장소: {selectedSchedule.location}
                  </Text>
                ) : (
                  <Text style={styles.crewScheduleText}>
                    해당 날짜에 일정이 존재하지 않습니다.
                  </Text>
                )}
              </View>
            </View>
            <View style={styles.crewScheduleBox}>
              <Text style={styles.crewScheduleText}>코스 즐겨찾기</Text>
              {}
            </View>
          </View>
          <TouchableOpacity onPress={handleLeaveCrew} style={styles.button}>
            <Text style={styles.buttonText}>크루 탈퇴</Text>
          </TouchableOpacity>

          <Modal
            transparent={true}
            visible={modalVisible}
            onRequestClose={closeModal}
          >
            <View style={styles.modalBackground}>
              <Animated.View
                style={[styles.modalContainer, { opacity: fadeAnim }]}
              >
                <Text style={styles.modalText}>
                  해당 크루를 탈퇴하시겠습니까?
                </Text>
                <View style={styles.modalButtonContainer}>
                  <TouchableOpacity onPress={closeModal}>
                    <Text style={styles.modalNoButtonText}>No</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={confirmLeaveCrew}>
                    <Text style={styles.modalYesButtonText}>Yes</Text>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            </View>
          </Modal>

          <Modal
            transparent={true}
            visible={confirmationModalVisible}
            onRequestClose={closeConfirmationModal}
          >
            <View style={styles.modalBackground}>
              <Animated.View
                style={[
                  styles.modalContainer,
                  { opacity: confirmationFadeAnim },
                ]}
              >
                <Text style={styles.modalText}>
                  해당 크루를 탈퇴하셨습니다.
                </Text>
                <TouchableOpacity onPress={closeConfirmationModal}>
                  <Text style={styles.modalYesButtonText}>OK</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </Modal>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 50,
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
  crewScheduleLayout: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 13,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#352555',
    marginBottom: 25,
  },
  boxLayout: {
    width: '100%',
    marginTop: 20,
  },
  crewScheduleBox: {
    alignItems: 'center',
    padding: 15,
    borderColor: '#EEEEEE',
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 20,
  },
  crewScheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  crewScheduleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  crewScheduleDetailText: {
    fontSize: 13,
    lineHeight: 20,
    color: 'black',
  },
  crewScheduleAddButton: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#73D393',
    justifyContent: 'center',
    alignItems: 'center',
  },
  crewScheduleDetail: {
    width: '100%',
    marginBottom: 20,
  },
  button: {
    width: '30%',
    height: 50,
    backgroundColor: '#FF0000',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
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
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  modalNoButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
  },
  modalYesButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#00C81B',
  },
});

export default MyCrew;
