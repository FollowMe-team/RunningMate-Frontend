import React, { useState, useEffect } from 'react';
import {
  View, ScrollView, Text,
  TouchableOpacity, StyleSheet
} from 'react-native';

import ProfileBox from '../../components/Othersprofile/Othersprofilebox_notteam';
import Tabs from '../../components/Othersprofile/OthersTabs';
import record from '../../components/MyProfile/record.json';
import { getProfile } from '../../utils/api';
import Skeleton from '../../components/MyProfile/Skeleton';
import RecordView from '../../components/Othersprofile/OthersRecordView';
import ActivityView from '../../components/Othersprofile/OthersFootprint';

const MyProfile = () => {
  const [activeTab, setActiveTab] = useState('record');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [profileData, setProfileData] = useState({ loading: true, data: null });
  const [selectedfollowButton, setSelectedfollowButton] = useState(false);


  useEffect(() => {
    const fetchProfile = async () => {
      const result = await getProfile();
      setProfileData(result);
    };
    fetchProfile();
  }, []);

  const handlefollowButtonPress = () => {
    setSelectedfollowButton(!selectedfollowButton);
  };

  const handleDayPress = day => {
    const recordForDay = record.find(item => item.date === day.dateString);
    setSelectedRecord(
      recordForDay || { message: '해당 날짜는 러닝 기록이 없어요!' },
    );
  };

  return (
    <ScrollView style={styles.container}>
      
      {profileData.loading ? (
        <Skeleton />
      ) : (
        profileData.data && <ProfileBox data={profileData.data} />
      )}
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <View contentContainerStyle={styles.contentContainer}>
        {activeTab === 'record' ? (
          <RecordView
            RecordView
            handleDayPress={handleDayPress}
            selectedRecord={selectedRecord}
          />
        ) : (
          <ActivityView />
        )}
      </View>
      <View style={{ height: 30 }}></View>
      <TouchableOpacity
        style={[
          styles.button,
          // 선택된 버튼일 경우 다른 스타일 적용
          selectedfollowButton === true && styles.selectedButton
        ]}
        onPress={handlefollowButtonPress}
      >
        <Text
          style={[
            styles.buttonText,
            // 선택된 버튼일 경우 텍스트 색상 변경
            selectedfollowButton === true && styles.selectedButtonText
          ]}
        >
          {selectedfollowButton ? '팔로잉' : '팔로우'}
        </Text>
      </TouchableOpacity>
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
  button: {
    paddingVertical: 5,
    paddingHorizontal: 10, position:'absolute', right:10, top:10,
    backgroundColor: '#f0f0f0', // 기본 배경색
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedButton: {
    backgroundColor: '#73D393', // 선택된 버튼의 배경색
    borderColor: '#73D393',
  },
  buttonText: {
    color: '#000', // 기본 텍스트 색상
    fontWeight: '500',
    fontSize:12
  },
  selectedButtonText: {
    color: 'white', // 선택된 버튼의 텍스트 색상
    fontWeight: 'bold'
  },
});

export default MyProfile;

