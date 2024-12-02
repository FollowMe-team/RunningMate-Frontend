import React, { useState } from 'react';
import PropTypes from 'prop-types';
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

const CrewApplicant = ({ route }) => {
  const { applicant } = route.params;
  const [activeTab, setActiveTab] = useState('record');
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleDayPress = day => {
    if (!day || !day.dateString) {
      setSelectedRecord({ message: '유효하지 않은 날짜입니다.' });
      return;
    }
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginVertical: 25,
          }}
        >
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
});

CrewApplicant.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      applicant: PropTypes.object.isRequired,
    }).isRequired,
  }).isRequired,
};

export default CrewApplicant;
