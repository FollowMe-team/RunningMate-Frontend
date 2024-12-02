import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

import ProfileBox from '../../components/MyProfile/ProfileBox';
import Tabs from '../../components/MyProfile/Tabs';
import RecordView from '../../components/MyProfile/RecordView';
import ActivityView from '../../components/MyProfile/ActivityView';
import record from '../../components/MyProfile/record.json';
import { getProfile } from '../../utils/api';
import Skeleton from '../../components/MyProfile/Skeleton';

const MyProfile = () => {
  const [activeTab, setActiveTab] = useState('record');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [profileData, setProfileData] = useState({ loading: true, data: null });

  useEffect(() => {
    const fetchProfile = async () => {
      const result = await getProfile();
      setProfileData(result);
    };
    fetchProfile();
  }, []);

  const handleDayPress = day => {
    const recordForDay = record.find(item => item.date === day.dateString);
    setSelectedRecord(
      recordForDay || { message: '해당 날짜는 러닝 기록이 없어요!' },
    );
  };

  return (
    <View style={styles.container}>
      {profileData.loading ? (
        <Skeleton />
      ) : (
        profileData.data && <ProfileBox data={profileData.data} />
      )}
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {activeTab === 'record' ? (
          <RecordView
            RecordView
            handleDayPress={handleDayPress}
            selectedRecord={selectedRecord}
          />
        ) : (
          <ActivityView />
        )}
      </ScrollView>
    </View>
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
});

export default MyProfile;
