import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Calendar } from 'react-native-calendars';
import PropTypes from 'prop-types';

import LeftImg from '../assets/images/MyProfile/free-icon-left-chevron-9923677.png';
import RightImg from '../assets/images/MyProfile/free-icon-right-chevron-9923681.png';

const Calendars = ({ onDayPress, dataSource }) => {
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    const marks = {};
    dataSource.forEach(record => {
      marks[record.date] = {
        marked: true,
        dotColor: selectedDate === record.date ? 'white' : 'black',
      };
    });
    marks[today] = {
      selected: true,
      selectedColor: '#73D393',
      selectedTextColor: 'white',
      marked: marks[today]?.marked,
      dotColor: 'white',
    };
    setMarkedDates(marks);
    handleDayPress({ dateString: today });
  }, [dataSource]);

  const handleDayPress = day => {
    const newMarkedDates = { ...markedDates };
    if (selectedDate) {
      newMarkedDates[selectedDate] = {
        ...newMarkedDates[selectedDate],
        selected: false,
        selectedColor: undefined,
        selectedTextColor: undefined,
        dotColor: dataSource.some(record => record.date === selectedDate)
          ? 'black'
          : undefined,
      };
    }
    newMarkedDates[day.dateString] = {
      ...newMarkedDates[day.dateString],
      selected: true,
      selectedColor: '#73D393',
      selectedTextColor: 'white',
      dotColor: dataSource.some(record => record.date === day.dateString)
        ? 'white'
        : undefined,
    };
    setSelectedDate(day.dateString);
    setMarkedDates(newMarkedDates);
    onDayPress(day);
  };

  return (
    <View style={styles.container}>
      <Calendar
        style={styles.calendar}
        current={today}
        onDayPress={handleDayPress}
        renderArrow={direction => (
          <Image
            source={direction === 'left' ? LeftImg : RightImg}
            style={styles.arrowImg}
          />
        )}
        markedDates={markedDates}
        theme={{
          todayTextColor: '#73D393',
          arrowColor: '#000',
          textDayFontSize: 16,
          textMonthFontSize: 18,
          textDayHeaderFontSize: 14,
        }}
      />
    </View>
  );
};

Calendars.propTypes = {
  onDayPress: PropTypes.func.isRequired,
  dataSource: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '150%',
  },
  calendar: {
    width: 400,
    height: 300,
  },
  arrowImg: {
    width: 20,
    height: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  headerButtons: {
    flexDirection: 'row',
  },
});

export default Calendars;
