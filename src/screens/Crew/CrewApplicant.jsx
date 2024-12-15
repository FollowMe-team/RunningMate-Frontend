import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView, // ScrollView로 변경
  Modal,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import Skeleton from '../../components/MyProfile/Skeleton';
import ProfileBox from '../../components/MyProfile/ProfileBox';
import Calendars from '../../components/Calendars';
import FootprintFigure from '../../components/MyProfile/FootprintFigure';

import RecordView from '../../components/MyProfile/RecordView';
import {
  getProfile,
  getMonthlyRecords,
  updateCrewMemberStatus,
} from '../../utils/other_profile';

const CrewApplicant = ({ route, navigation }) => {
  const { applicant } = route.params;
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [profileData, setProfileData] = useState({ loading: true, data: null });
  const [monthlyRecords, setMonthlyRecords] = useState([]);
  const [isFootprintFigureVisible, setFootprintFigureVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const [isMinimized, setIsMinimized] = useState(false);

  const fetchMonthlyRecords = async yearMonth => {
    try {
      const result = await getMonthlyRecords(applicant.id, yearMonth);
      setMonthlyRecords(result);
    } catch (error) {
      console.error('Failed to fetch monthly records:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchProfile = async () => {
        try {
          const result = await getProfile(applicant.id);
          setProfileData({ loading: false, data: result.data });
        } catch (error) {
          console.error('Failed to fetch profile:', error);
        }
      };

      fetchProfile();
    }, [applicant.id]),
  );

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const result = await getProfile(applicant.id);
        setProfileData({ loading: false, data: result.data });
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };

    fetchProfile();
  }, [applicant.id]);

  const handleDayPress = day => {
    const recordForDay = monthlyRecords.find(
      record => record.startTime.split('T')[0] === day.dateString,
    );
    setSelectedRecord(
      recordForDay || { message: '해당 날짜는 러닝 기록이 없어요!' },
    );
    setIsMinimized(true); // 날짜 선택 시 ProfileBox 간소화
  };

  const handleStatusUpdate = async status => {
    try {
      await updateCrewMemberStatus(applicant.crewId, applicant.id, status);
      setModalMessage(
        `신청 ${status === 'COMPLETE' ? '수락' : '거절'}하였습니다!`,
      );
      setModalVisible(true);
    } catch (error) {
      console.error(`Failed to update status to ${status}:`, error);
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
    navigation.goBack();
  };

  const profileDataWithDefaults = {
    ...profileData.data,
    footprint: profileData.data?.footprint || 0,
    running_distance: profileData.data?.running_distance || 0,
    running_count: profileData.data?.running_count || 0,
    name: profileData.data?.name || '',
    birthday: profileData.data?.birthday || '',
    gender: profileData.data?.gender || '',
    address: profileData.data?.address || '',
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {profileData.loading ? (
          <Skeleton />
        ) : (
          profileData.data && (
            <ProfileBox
              data={profileDataWithDefaults}
              setFootprintFigureVisible={setFootprintFigureVisible}
              isMinimized={isMinimized}
              setIsMinimized={setIsMinimized} // 상태 변경 함수 전달
              hideDetails={true} // CrewApplicant 페이지에서는 특정 필드를 숨깁니다.
            />
          )
        )}
      </View>
      <ScrollView
        contentContainerStyle={[
          styles.contentContainer,
          { paddingTop: isMinimized ? 70 : 100 },
        ]}
        scrollEventThrottle={16}
      >
        <View style={{ marginTop: isMinimized ? 50 : 200 }}>
          <RecordView
            handleDayPress={handleDayPress}
            selectedRecord={selectedRecord}
            records={monthlyRecords}
            fetchMonthlyRecords={fetchMonthlyRecords}
            Calendars={Calendars}
          />
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginVertical: 25,
        }}
      >
        <TouchableOpacity
          style={styles.rejectButton}
          onPress={() => handleStatusUpdate('REJECT')}
        >
          <Text style={styles.rejectButtonText}>거절</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.applyButton}
          onPress={() => handleStatusUpdate('COMPLETE')}
        >
          <Text style={styles.applyButtonText}>수락</Text>
        </TouchableOpacity>
      </View>

      {isFootprintFigureVisible && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={isFootprintFigureVisible}
          onRequestClose={() => setFootprintFigureVisible(false)}
        >
          <FootprintFigure onClose={() => setFootprintFigureVisible(false)} />
        </Modal>
      )}

      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={handleModalClose}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    flexGrow: 1,
  },
  rejectButton: {
    width: '30%',
    borderWidth: 1,
    borderColor: '#73D393',
    borderRadius: 15,
    padding: 10,
    margin: 10,
  },
  rejectButtonText: {
    color: '#73D393',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  applyButton: {
    width: '30%',
    backgroundColor: '#73D393',
    borderRadius: 15,
    padding: 10,
    margin: 10,
  },
  applyButtonText: {
    textAlign: 'center',
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
    width: 350,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#352555',
    textAlign: 'center',
    marginBottom: 15,
  },
  modalButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#00C81B',
    marginTop: 15,
  },
});

CrewApplicant.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      applicant: PropTypes.object.isRequired,
    }).isRequired,
  }).isRequired,
};

export default CrewApplicant;
