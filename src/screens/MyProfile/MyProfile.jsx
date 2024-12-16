import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Modal } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import ProfileBox from '../../components/MyProfile/ProfileBox';
import Tabs from '../../components/MyProfile/Tabs';
import RecordView from '../../components/MyProfile/RecordView';
import ActivityView from '../../components/MyProfile/ActivityView';
import { getProfile, getBadges } from '../../utils/api';
import Skeleton from '../../components/MyProfile/Skeleton';
import { getMonthlyRecords } from '../../utils/records_monthly_api';
import FootprintFigure from '../../components/MyProfile/FootprintFigure';
import Calendars from '../../components/Calendars';

const MyProfile = () => {
  const [activeTab, setActiveTab] = useState('record');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [profileData, setProfileData] = useState({ loading: true, data: null });
  const [badges, setBadges] = useState([]);
  const [badgesLoading, setBadgesLoading] = useState(true);
  const [monthlyRecords, setMonthlyRecords] = useState([]);
  const [isFootprintFigureVisible, setFootprintFigureVisible] = useState(false);

  const [isMinimized, setIsMinimized] = useState(false);

  const fetchMonthlyRecords = async yearMonth => {
    try {
      const result = await getMonthlyRecords(yearMonth);
      if (result.success) {
        setMonthlyRecords(result.data);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Failed to fetch monthly records:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchProfile = async () => {
        const result = await getProfile();
        setProfileData(result);
      };

      fetchProfile();
    }, []),
  );

  useEffect(() => {
    const fetchProfile = async () => {
      const result = await getProfile();
      setProfileData(result);
    };

    const fetchBadges = async () => {
      setBadgesLoading(true);
      const result = await getBadges();
      if (result.success) {
        setBadges(result.data);
      }
      setBadgesLoading(false);
    };

    fetchProfile();
    fetchBadges();
  }, []);

  const handleDayPress = day => {
    const recordForDay = monthlyRecords.find(
      record => record.startTime.split('T')[0] === day.dateString,
    );
    setSelectedRecord(
      recordForDay || { message: '해당 날짜는 러닝 기록이 없어요!' },
    );
    setIsMinimized(true); // 날짜 선택 시 ProfileBox 간소화
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {profileData.loading ? (
          <Skeleton />
        ) : (
          profileData.data && (
            <ProfileBox
              data={profileData.data}
              setFootprintFigureVisible={setFootprintFigureVisible}
              isMinimized={isMinimized}
              setIsMinimized={setIsMinimized} // 상태 변경 함수 전달
            />
          )
        )}
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </View>
      <ScrollView
        contentContainerStyle={[
          styles.contentContainer,
          { paddingTop: isMinimized ? 100 : 200 },
        ]}
        scrollEventThrottle={16}
      >
        <View style={{ marginTop: isMinimized ? 50 : 200 }}>
          {activeTab === 'record' ? (
            <RecordView
              handleDayPress={handleDayPress}
              selectedRecord={selectedRecord}
              records={monthlyRecords}
              fetchMonthlyRecords={fetchMonthlyRecords}
              Calendars={Calendars}
            />
          ) : badgesLoading ? (
            <Skeleton />
          ) : (
            <ActivityView badges={badges} />
          )}
        </View>
      </ScrollView>
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
});

export default MyProfile;
