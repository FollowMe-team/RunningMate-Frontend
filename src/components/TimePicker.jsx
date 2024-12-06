import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-date-picker';
import PropTypes from 'prop-types';

const TimePicker = ({ time, setTime, placeholder }) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = selectedTime => {
    setTime(selectedTime);
    setShowPicker(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setShowPicker(true)}
        style={styles.input}
      >
        <Text style={styles.inputText}>
          {time instanceof Date
            ? time.toLocaleTimeString('ko-KR', {
                hour: '2-digit',
                minute: '2-digit',
              })
            : placeholder}
        </Text>
      </TouchableOpacity>
      {showPicker && (
        <DatePicker
          modal
          open={showPicker}
          mode="time"
          locale="ko"
          minuteInterval={5}
          date={time instanceof Date ? time : new Date()}
          onConfirm={handleDateChange}
          onCancel={() => {
            setShowPicker(false);
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '45%',
    borderColor: '#D6D6D6',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginTop: 8,
  },
  input: {
    textAlign: 'center',
    color: '#101010',
  },
  inputText: {
    textAlign: 'center',
    color: '#101010',
  },
});

TimePicker.propTypes = {
  time: PropTypes.instanceOf(Date),
  setTime: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default TimePicker;
