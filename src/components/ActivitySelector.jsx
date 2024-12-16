import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import TimePicker from './TimePicker';
import wave from '../assets/images/Crew/wave.png';

const ActivitySelector = ({ day, activityTime, updateActivityTime }) => {
  return (
    <View style={styles.activityTimeDropdownLayout}>
      <View style={styles.activityTimeDropdownCircle}>
        <Text style={styles.dayLabel}>{day}</Text>
      </View>
      <TimePicker
        time={activityTime.startTime}
        setTime={time => updateActivityTime(day, time, activityTime.endTime)}
        placeholder="시작 시간 선택"
      />
      <Image source={wave} style={{ width: 25, height: 11 }} />
      <TimePicker
        time={activityTime.endTime}
        setTime={time => updateActivityTime(day, activityTime.startTime, time)}
        placeholder="끝 시간 선택"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  activityTimeDropdownLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activityTimeDropdownCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#73D393',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayLabel: {
    fontSize: 12,
    textAlign: 'center',
    color: 'white',
  },
});

ActivitySelector.propTypes = {
  day: PropTypes.string.isRequired,
  activityTime: PropTypes.shape({
    startTime: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]),
    endTime: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]),
  }).isRequired,
  updateActivityTime: PropTypes.func.isRequired,
};

export default ActivitySelector;

