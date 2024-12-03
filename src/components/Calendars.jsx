import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Calendar } from 'react-native-calendars';
import PropTypes from 'prop-types';

import LeftImg from '../assets/images/MyProfile/free-icon-left-chevron-9923677.png';
import RightImg from '../assets/images/MyProfile/free-icon-right-chevron-9923681.png';

const Calendars = ({ onDayPress, dataSource, fetchMonthlyRecords }) => {
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [markedDates, setMarkedDates] = useState({});
  const [currentMonth, setCurrentMonth] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });

  useEffect(() => {
    const marks = {};
    dataSource.forEach(record => {
      const date = record.startTime.split('T')[0];
      marks[date] = {
        marked: true,
        dotColor: selectedDate === date ? 'white' : 'black',
      };
    });
    marks[selectedDate] = {
      selected: true,
      selectedColor: '#73D393',
      selectedTextColor: 'white',
      marked: marks[selectedDate]?.marked,
      dotColor: 'white',
    };
    console.log('Marked dates:', marks);
    setMarkedDates(marks);
  }, [dataSource, selectedDate]);

  const handleDayPress = day => {
    const newMarkedDates = { ...markedDates };
    if (selectedDate) {
      newMarkedDates[selectedDate] = {
        ...newMarkedDates[selectedDate],
        selected: false,
        selectedColor: undefined,
        selectedTextColor: undefined,
        dotColor: 'black',
      };
    }
    newMarkedDates[day.dateString] = {
      ...newMarkedDates[day.dateString],
      selected: true,
      selectedColor: '#73D393',
      selectedTextColor: 'white',
      dotColor: 'white',
    };
    setSelectedDate(day.dateString);
    setMarkedDates(newMarkedDates);
    onDayPress(day);
  };

  const handleMonthChange = month => {
    setCurrentMonth({ year: month.year, month: month.month });
    const yearMonth = `${month.year}-${String(month.month).padStart(2, '0')}`;
    console.log(`Fetching records for ${yearMonth}`);
    fetchMonthlyRecords(yearMonth);
  };

  return (
    <View style={styles.container}>
      <Calendar
        current={`${currentMonth.year}-${String(currentMonth.month).padStart(
          2,
          '0',
        )}-01`}
        style={styles.calendar}
        onDayPress={handleDayPress}
        onMonthChange={handleMonthChange}
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
  fetchMonthlyRecords: PropTypes.func.isRequired,
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
