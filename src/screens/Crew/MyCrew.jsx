import React, { useState, useEffect } from 'react';
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
import applyMembers from './applyMember.json';

import add from '../../assets/images/Crew/icons8-help.png';
import more from '../../assets/images/Crew/free-icon-more-options-17764.png';
import members from '../../assets/images/Crew/groups.png';
import picture from '../../assets/images/Settings/photo-gallery1.png';

import CrewActivityPicture from '../../components/Crew/CrewActivityPicture';
import EditCrewActivityPicture from '../../components/Crew/EditCrewActivityPicture';

const MyCrew = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const crew = route.params?.crew;

  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmationModalVisible, setConfirmationModalVisible] =
    useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [confirmationFadeAnim] = useState(new Animated.Value(0));
  const [applyCount, setApplyCount] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const count = applyMembers.length;
    setApplyCount(count);
  }, []);

  React.useLayoutEffect(() => {
    if (crew) {
      navigation.setOptions({
        header: ({ navigation }) => (
          <Header
            title={crew.name}
            navigation={navigation}
            showApplyButton={crew.is_master}
            openChatUrl={crew.open_chat}
            showModificationButton={crew.is_master}
            applyCount={applyCount}
          />
        ),
      });
    }
  }, [navigation, crew, applyCount]);

  if (!crew) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>���루 정보를 불러올 수 없습니다.</Text>
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

  const handleViewMembers = () => {
    navigation.navigate('CrewList', { members: crew.members });
  };

  const handleEditGallery = () => {
    setIsEditing(true);
  };

  const handleSaveGallery = () => {
    setIsEditing(false);
    // 편집된 이미지를 저장하는 로직 추가
  };

  return (
    <ScrollView>
      {isEditing ? (
        <EditCrewActivityPicture profileUrls={crew.profile_urls || []} />
      ) : (
        <CrewActivityPicture profileUrls={crew.profile_urls || []} />
      )}
      <View style={styles.container}>
        <View style={{ marginHorizontal: 20 }}>
          <View style={styles.crewScheduleLayout}>
            <View style={styles.crewScheduleTitleHeader}>
              <Text style={styles.mainTitle}>크루 일정</Text>
              <View style={{ flexDirection: 'row' }}>
                {crew.is_my_crew && (
                  <TouchableOpacity
                    onPress={handleViewMembers}
                    style={styles.membersButton}
                  >
                    <Image source={members} style={styles.icon} />
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                      멤버 조회
                    </Text>
                  </TouchableOpacity>
                )}
                {crew.is_master &&
                  (isEditing ? (
                    <TouchableOpacity
                      onPress={handleSaveGallery}
                      style={styles.galleryButton}
                    >
                      <Image source={picture} style={styles.icon} />
                      <Text style={styles.galleryButtonText}>저장하기</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={handleEditGallery}
                      style={styles.galleryButton}
                    >
                      <Image source={picture} style={styles.icon} />
                      <Text style={styles.galleryButtonText}>갤러리 편집</Text>
                    </TouchableOpacity>
                  ))}
              </View>
            </View>
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
              <View style={styles.crewScheduleHeader}>
                <Text style={styles.crewScheduleText}>코스 즐겨찾기</Text>
                {crew.is_master && (
                  <TouchableOpacity>
                    <Image source={more} style={{ width: 20, height: 20 }} />
                  </TouchableOpacity>
                )}
              </View>
              {}
            </View>
          </View>
          <TouchableOpacity onPress={handleLeaveCrew} style={styles.button}>
            <Text style={styles.buttonText}>크루 탈퇴</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalBackground}>
          <Animated.View style={[styles.modalContainer, { opacity: fadeAnim }]}>
            <Text style={styles.modalText}>해당 크루를 탈퇴하시겠습니까?</Text>
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
            style={[styles.modalContainer, { opacity: confirmationFadeAnim }]}
          >
            <Text style={styles.modalText}>해당 크루를 탈퇴하셨습니다.</Text>
            <TouchableOpacity onPress={closeConfirmationModal}>
              <Text style={styles.modalYesButtonText}>OK</Text>
            </TouchableOpacity>
          </Animated.View>
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
  crewScheduleTitleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    marginBottom: 25,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#352555',
  },
  membersButton: {
    padding: 7,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 13,
    backgroundColor: '#73D393',
  },
  membersButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  galleryButton: {
    padding: 7,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#73D393',
    marginLeft: 10,
  },
  galleryButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#73D393',
  },
  icon: {
    width: 20,
    height: 20,
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
    textAlign: 'center',
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
    width: 300,
    height: '80%',
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
