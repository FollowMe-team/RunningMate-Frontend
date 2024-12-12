import React, { useState, useEffect, useRef } from 'react';
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
import applyMembers from './applyMember.json';

import add from '../../assets/images/Crew/icons8-help.png';
import more from '../../assets/images/Crew/free-icon-more-options-17764.png';
import members from '../../assets/images/Crew/groups.png';
import picture from '../../assets/images/Settings/photo-gallery1.png';

import CrewActivityPicture from '../../components/Crew/CrewActivityPicture';
import EditCrewActivityPicture from '../../components/Crew/EditCrewActivityPicture';
import { deleteCrew, leaveCrew } from '../../utils/crew/crew';
import { getCrewSelect, uploadCrewImages } from '../../utils/crew/crew2';
import { getFavoriteCourses } from '../../utils/crew/crew_course';
import SimpleCourse from '../../components/Course/SimpleCourse';
import { fetchMonthlyCrewSchedule } from '../../utils/crew/crew_schedule';

const MyCrew = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const initialCrew = route.params?.crew;
  const [crew, setCrew] = useState(initialCrew);

  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmationModalVisible, setConfirmationModalVisible] =
    useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [confirmationFadeAnim] = useState(new Animated.Value(0));
  const [applyCount, setApplyCount] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteFadeAnim] = useState(new Animated.Value(0));
  const [showActivityPictures, setShowActivityPictures] = useState(true);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [scaleAnim] = useState(new Animated.Value(1));
  const [favoriteCourses, setFavoriteCourses] = useState([]);
  const [monthlySchedule, setMonthlySchedule] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const count = applyMembers.length;
    setApplyCount(count);
  }, []);

  const fetchCrewDetail = async () => {
    try {
      const crewDetail = await getCrewSelect(initialCrew.id);
      setCrew(crewDetail);
    } catch (error) {
      console.error('Failed to fetch crew detail:', error);
      alert('크루 정보를 불러오는데 실패했습니다.');
    }
  };

  useEffect(() => {
    fetchCrewDetail();
  }, []);

  useEffect(() => {
    if (route.params?.crew) {
      setCrew(route.params.crew);
    } else {
      fetchCrewDetail();
    }
  }, [route.params?.crew]);

  useEffect(() => {
    const fetchFavoriteCourses = async () => {
      try {
        const courses = await getFavoriteCourses(initialCrew.id);
        setFavoriteCourses(courses);
      } catch (error) {
        console.error('Failed to fetch favorite courses:', error);
      }
    };

    fetchFavoriteCourses();
  }, [initialCrew.id]);

  const fetchMonthlyRecords = async yearMonth => {
    try {
      const data = await fetchMonthlyCrewSchedule(initialCrew.id, yearMonth);
      setMonthlySchedule(data.crewSchedule);
    } catch (error) {
      console.error('Failed to fetch monthly records:', error);
    }
  };

  const handleAddSchedule = () => {
    navigation.navigate('CrewScheduleRegister', {
      selectedDate: selectedSchedule?.date,
      crewId: initialCrew.id,
    });
  };

  React.useLayoutEffect(() => {
    if (crew) {
      navigation.setOptions({
        header: ({ navigation }) => (
          <Header
            title={route.params?.crew?.name || crew.name} // route.params.crew.name 사용
            navigation={navigation}
            showApplyButton={crew.is_master}
            openChatUrl={crew.open_chat}
            showModificationButton={crew.is_master}
            applyCount={applyCount}
            crew={crew} // crew 객체를 전달
          />
        ),
      });
    }
  }, [navigation, crew, applyCount, route.params?.crew]);

  if (!crew) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>크루 정보를 불러올 수 없습니다.</Text>
      </View>
    );
  }

  const handleDayPress = day => {
    const scheduleForDay = monthlySchedule.find(
      item => item.startTime.split('T')[0] === day.dateString,
    );
    setSelectedSchedule(scheduleForDay || null);
    setSelectedCourse(scheduleForDay ? scheduleForDay.crewCourse : null);
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

  const confirmLeaveCrew = async () => {
    try {
      await leaveCrew(crew.id);
      alert('크루에서 성공적으로 탈퇴하였습니다.');
      navigation.navigate('Crew');
    } catch (error) {
      console.error('Failed to leave crew:', error);
      alert('크루 탈퇴에 실패했습니다. 다시 시도해주세요.');
    } finally {
      closeModal();
    }
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

  const handleSaveGallery = async () => {
    try {
      await uploadCrewImages(crew.id, crew.profile_urls);
      alert('사진이 성공적으로 업로드되었습니다.');
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to upload images:', error);
      alert('사진 업로드에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleDeleteCrew = async () => {
    setDeleteModalVisible(true);
    Animated.timing(deleteFadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const closeDeleteModal = () => {
    Animated.timing(deleteFadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setDeleteModalVisible(false));
  };

  const confirmDeleteCrew = async () => {
    try {
      await deleteCrew(crew.id);
      alert('크루가 성공적으로 삭제되었습니다.');
      navigation.navigate('Crew');
    } catch (error) {
      console.error('Failed to delete crew:', error);
      alert('크루 삭제에 실패했습니다. 다시 시도해주세요.');
    } finally {
      closeDeleteModal();
    }
  };

  const handleScroll = event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY > 50) {
      Animated.timing(scaleAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setShowActivityPictures(false));
    } else if (offsetY < 20) {
      setShowActivityPictures(true);
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  useEffect(() => {
    const listener = scrollY.addListener(({ value }) => {
      if (value > 50) {
        setShowActivityPictures(false);
      } else {
        setShowActivityPictures(true);
      }
    });
    return () => {
      scrollY.removeListener(listener);
    };
  }, [scrollY]);

  const formatDateTime = (dateTime, includeDate = true) => {
    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? '오후' : '오전';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes === 0 ? '' : ` (${minutes}분)`;
    return includeDate
      ? `${year}년 ${month}월 ${day}일 ${period} ${formattedHours}시${formattedMinutes}`
      : `${period} ${formattedHours}시${formattedMinutes}`;
  };

  return (
    <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
      {showActivityPictures && (
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          {isEditing ? (
            <EditCrewActivityPicture profileUrls={crew.profile_urls || []} />
          ) : (
            <CrewActivityPicture profileUrls={crew.profile_urls || []} />
          )}
        </Animated.View>
      )}
      <View style={styles.container}>
        <View style={{ marginHorizontal: 20 }}>
          <View style={styles.crewScheduleLayout}>
            <View style={styles.crewScheduleTitleHeader}>
              <Text style={styles.mainTitle}>크루 일정</Text>
              <View style={{ flexDirection: 'row' }}>
                {
                  <TouchableOpacity
                    onPress={handleViewMembers}
                    style={styles.membersButton}
                  >
                    <Image source={members} style={styles.icon} />
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                      멤버 조회
                    </Text>
                  </TouchableOpacity>
                }
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
              <Calendars
                dataSource={monthlySchedule}
                onDayPress={handleDayPress}
                fetchMonthlyRecords={fetchMonthlyRecords}
              />
            </View>
          </View>
          <View style={styles.boxLayout}>
            <View style={styles.crewScheduleBox}>
              <View style={styles.crewScheduleHeader}>
                <Text style={styles.crewScheduleText}>크루 일정</Text>
                <TouchableOpacity
                  onPress={handleAddSchedule}
                  style={styles.crewScheduleAddButton}
                >
                  <Image source={add} style={{ width: 20, height: 20 }} />
                </TouchableOpacity>
              </View>
              <View style={styles.crewScheduleDetail}>
                {selectedSchedule ? (
                  <>
                    <Text style={styles.crewScheduleDetailText}>
                      일시:{' '}
                      {`${formatDateTime(
                        selectedSchedule.startTime,
                      )} ~ ${formatDateTime(
                        selectedSchedule.endTime,
                        false,
                      )}\n`}
                      참여 인원:{' '}
                      {`(${selectedSchedule.memberCount}/${selectedSchedule.memberMax})\n`}
                    </Text>
                    {selectedCourse && <SimpleCourse data={selectedCourse} />}
                  </>
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
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('MyCrewCourse', {
                        crewId: initialCrew.id,
                      })
                    }
                  >
                    <Image source={more} style={{ width: 20, height: 20 }} />
                  </TouchableOpacity>
                )}
              </View>
              {favoriteCourses.length > 0 ? (
                favoriteCourses.map(course => (
                  <SimpleCourse key={course.id} data={course} />
                ))
              ) : (
                <Text style={styles.crewScheduleText}>
                  즐겨찾기 코스가 없습니다.
                </Text>
              )}
            </View>
          </View>
          <TouchableOpacity
            onPress={crew.is_master ? handleDeleteCrew : handleLeaveCrew}
            style={styles.button}
          >
            <Text style={styles.buttonText}>
              {crew.is_master ? '크루 삭제' : '크루 탈퇴'}
            </Text>
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
      <Modal
        transparent={true}
        visible={deleteModalVisible}
        onRequestClose={closeDeleteModal}
      >
        <View style={styles.modalBackground}>
          <Animated.View
            style={[styles.modalContainer, { opacity: deleteFadeAnim }]}
          >
            <Text style={styles.modalText}>해당 크루를 삭제하시겠습니까?</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity onPress={closeDeleteModal}>
                <Text style={styles.modalNoButtonText}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={confirmDeleteCrew}>
                <Text style={styles.modalYesButtonText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
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
    marginBottom: 16,
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
    marginTop: 10,
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
    marginBottom: 90,
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
