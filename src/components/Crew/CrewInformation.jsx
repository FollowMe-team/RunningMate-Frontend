import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native';

import { useRoute, useNavigation } from '@react-navigation/native';
import Rank from '../Rank';
import {
  cancelCrewApplication,
  checkCrewAvailability,
} from '../../utils/crew/crew2';
import { getCrewDetail } from '../../utils/crew/crew';

const CrewInformation = () => {
  const route = useRoute();
  const { crew, onApply = async () => {} } = route.params; // 기본 함수 추가
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isApplied, setIsApplied] = useState(crew.isApplied);
  const [crewDetail, setCrewDetail] = useState(crew);
  const navigation = useNavigation();

  const daysOfWeek = {
    MONDAY: '월요일',
    TUESDAY: '화요일',
    WEDNESDAY: '수요일',
    THURSDAY: '목요일',
    FRIDAY: '금요일',
    SATURDAY: '토요일',
    SUNDAY: '일요일',
  };

  useEffect(() => {
    const fetchCrewDetail = async () => {
      try {
        const detail = await getCrewDetail(crew.id);
        setCrewDetail(detail);
        setIsApplied(detail.isApplied); // 크루 상세 정보에서 isApplied 상태 설정
      } catch (error) {
        console.error('Failed to fetch crew detail:', error);
      }
    };

    fetchCrewDetail();
  }, [crew.id]);

  const handleJoinCrew = async () => {
    try {
      const isAvailable = await checkCrewAvailability(crew.id);
      if (isAvailable) {
        await onApply(crew.id);
        setIsApplied(true); // 신청 완료 후 상태 업데이트
        setModalMessage('신청 완료!');
      } else {
        setModalMessage('해당 크루에 가입할 수 없습니다.');
      }
    } catch (error) {
      console.error('Failed to join crew:', error);
      setModalMessage('신청 실패!');
    }
    setModalVisible(true);
  };

  const handleCancelApplication = async () => {
    try {
      await cancelCrewApplication(crew.id);
      setIsApplied(false);
      setModalMessage('신청 취소 완료!');
    } catch {
      setModalMessage('신청 취소 실패!');
    }
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    if (modalMessage === '신청 완료!' || modalMessage === '신청 취소 완료!') {
      navigation.navigate('Crew');
    }
  };

  return (
    <ScrollView>
      <Image
        source={{ uri: crewDetail.profileImageUrl }}
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          justifyContent: 'center',
          alignSelf: 'center',
        }}
      />
      <View style={styles.container}>
        <View style={styles.profileForm}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={styles.crewName}>{crewDetail.name}</Text>
            <Rank rank={crewDetail.ranking} />
          </View>
        </View>
        <View style={styles.formBox}>
          <Text style={styles.title}>크루 소개</Text>
          <Text style={styles.detail}>{crewDetail.detailDescription}</Text>
        </View>
        <View style={styles.formBox}>
          <Text style={styles.title}>크루 조건</Text>
          <Text style={styles.detail}>{crewDetail.ranking}</Text>
        </View>
        <View style={styles.formBox}>
          <Text style={styles.title}>주 활동 시간대</Text>
          <Text style={styles.detail}>
            {crewDetail.crewActivityTimeList
              .map(
                time =>
                  `${daysOfWeek[time.activityTimes]} ${time.startTime} ~ ${
                    time.endTime
                  }`,
              )
              .join('\n')}
          </Text>
        </View>
        <View style={styles.formBox}>
          <Text style={styles.title}>크루 활동 지역</Text>
          <Text style={styles.detail}>
            {crewDetail.crewLocationInfos.city}{' '}
            {crewDetail.crewLocationInfos.district}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={isApplied ? handleCancelApplication : handleJoinCrew}
        >
          <Text style={styles.buttonText}>
            {isApplied ? '신청 취소하기' : '크루 신청하기'}
          </Text>
        </TouchableOpacity>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleModalClose}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalText}>{modalMessage}</Text>
              <TouchableOpacity onPress={handleModalClose}>
                <Text style={styles.modalButtonText}>Yes</Text>
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
    justifyContent: 'center',
  },
  profileForm: {
    marginVertical: 15,
  },
  crewName: {
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
    marginRight: 5,
  },
  formBox: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#EDEDED',
    borderRadius: 16,
    marginBottom: 15,
  },
  title: {
    color: '#101010',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  detail: {
    color: '#101010',
    fontSize: 14,
    lineHeight: 24,
  },
  courseContainer: {
    color: '#101010',
    fontSize: 14,
    lineHeight: 24,
  },
  button: {
    width: '85%',
    paddingVertical: 22,
    marginTop: 100,
    marginBottom: 100,
    backgroundColor: '#73D393',
    borderRadius: 15,
    justifyContent: 'center',
    alignSelf: 'center',
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
});

export default CrewInformation;
