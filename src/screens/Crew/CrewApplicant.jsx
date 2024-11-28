import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';

import ProfileBox from '../../components/MyProfile/ProfileBox';
import Tabs from '../../components/MyProfile/Tabs';
import RecordView from '../../components/MyProfile/RecordView';
import ActivityView from '../../components/MyProfile/ActivityView';
import applicant from './applicant.json';

const CrewApplicant = () => {
  const [activeTab, setActiveTab] = useState('record');
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleDayPress = day => {
    const recordForDay = applicant.records.find(
      item => item.date === day.dateString,
    );
    setSelectedRecord(
      recordForDay || { message: '해당 날짜는 러닝 기록이 없어요!' },
    );
  };

  return (
    <View style={styles.container}>
      <ProfileBox data={applicant} />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {activeTab === 'record' ? (
          <RecordView
            handleDayPress={handleDayPress}
            selectedRecord={selectedRecord}
          />
        ) : (
          <ActivityView />
        )}
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={styles.rejectButton}>
            <Text style={styles.rejectButtonText}>거절</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.applyButton}>
            <Text style={styles.applyButtonText}>수락</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    paddingBottom: 80,
  },
  contentContainer: {
    flexGrow: 1,
    width: '100%',
  },
  rejectButton: {
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
});

export default CrewApplicant;
