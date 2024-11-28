import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Calendars from '../../components/Calendars';
import schedule from '../../components/Crew/schedule.json';

import add from '../../assets/images/Crew/icons8-help.png';
import profile from '../../assets/images/Settings/profile.png';

const MyCrew = () => {
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const navigation = useNavigation();

  const handleDayPress = day => {
    const scheduleForDay = schedule.find(item => item.date === day.dateString);
    setSelectedSchedule(scheduleForDay || null);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={profile} style={styles.profileImg} />
        <View style={{ marginHorizontal: 20 }}>
          <View style={styles.crewScheduleLayout}>
            <Text style={styles.mainTitle}>크루 일정</Text>
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
              <Text style={styles.crewScheduleText}>코스 즐겨찾기</Text>
              {}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileImg: {
    width: '100%',
    height: 140,
    marginBottom: 24,
  },
  crewScheduleLayout: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 13,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#352555',
    marginBottom: 25,
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
});

export default MyCrew;