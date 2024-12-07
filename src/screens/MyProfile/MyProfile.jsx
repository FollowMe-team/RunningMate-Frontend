import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
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
  const [recordsLoading, setRecordsLoading] = useState(true);
  const [isFootprintFigureVisible, setFootprintFigureVisible] = useState(false);

  const fetchMonthlyRecords = async yearMonth => {
    setRecordsLoading(true);
    const result = await getMonthlyRecords(yearMonth);
    if (result.success) {
      setMonthlyRecords(result.data);
    }
    setRecordsLoading(false);
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

    const today = new Date();
    const yearMonth = `${today.getFullYear()}-${String(
      today.getMonth() + 1,
    ).padStart(2, '0')}`;

    fetchProfile();
    fetchBadges();
    fetchMonthlyRecords(yearMonth);
  }, []);

  const handleDayPress = day => {
    const recordForDay = monthlyRecords.find(
      record => record.startTime.split('T')[0] === day.dateString,
    );
    setSelectedRecord(
      recordForDay || { message: '해당 날짜는 러닝 기록이 없어요!' },
    );
  };

  return (
    <ScrollView style={styles.container}>
      {profileData.loading ? (
        <Skeleton />
      ) : (
        profileData.data && (
          <ProfileBox
            data={profileData.data}
            setFootprintFigureVisible={setFootprintFigureVisible}
          />
        )
      )}
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <View contentContainerStyle={styles.contentContainer}>
        {activeTab === 'record' ? (
          recordsLoading ? (
            <Skeleton />
          ) : (
            <RecordView
              handleDayPress={handleDayPress}
              selectedRecord={selectedRecord}
              records={monthlyRecords}
              fetchMonthlyRecords={fetchMonthlyRecords}
              Calendars={Calendars} // Calendars 컴포넌트를 RecordView에 전달
            />
          )
        ) : badgesLoading ? (
          <Skeleton />
        ) : (
          <ActivityView badges={badges} />
        )}

      </View>
      {isFootprintFigureVisible && (
        <FootprintFigure onClose={() => setFootprintFigureVisible(false)} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    paddingBottom: 100,
  },
  contentContainer: {
    flexGrow: 1,
    width: '100%',
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default MyProfile;
