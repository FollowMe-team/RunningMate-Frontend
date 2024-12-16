import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const RecordDetails = ({ selectedRecord }) => {
  return (
    <View style={styles.recordContainer}>
      {selectedRecord ? (
        selectedRecord.message ? (
          <Text style={styles.noRecordText}>{selectedRecord.message}</Text>
        ) : (
          <View style={{ flexDirection: 'column', marginBottom: 120 }}>
            <View>
              <Text style={styles.recordDetailTitle}>일자</Text>
              <Text style={styles.recordDetailValue}>
                {selectedRecord.startTime.split('T')[0]}
              </Text>
            </View>
            <View>
              <Text style={styles.recordDetailTitle}>러닝 코스</Text>
              <Text style={styles.recordDetailValue}>
                {selectedRecord.course.courseName}
              </Text>
            </View>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <View style={{ flexDirection: 'column' }}>
                <View>
                  <Text style={styles.recordDetailTitle}>러닝 뛴 거리</Text>
                  <Text style={styles.recordDetailValue}>
                    {selectedRecord.distance} km
                  </Text>
                </View>
                <View>
                  <Text style={styles.recordDetailTitle}>칼로리 소모량</Text>
                  <Text style={styles.recordDetailValue}>
                    {selectedRecord.caloriesBurned} kcal
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: 'column' }}>
                <View>
                  <Text style={styles.recordDetailTitle}>시간</Text>
                  <Text style={styles.recordDetailValue}>
                    {selectedRecord.duration}
                  </Text>
                </View>
                <View>
                  <Text style={styles.recordDetailTitle}>평균 속도</Text>
                  <Text style={styles.recordDetailValue}>
                    {selectedRecord.averagePace.toFixed(2)} km/h
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )
      ) : (
        <Text
          style={{
            color: 'black',
            textAlign: 'center',
            fontSize: 24,
            marginBottom: 320,
          }}
        >
          날짜를 선택하세요.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  recordContainer: {
    flex: 1,
    width: '95%',
    fontFamily: 'Pretendard',
    paddingTop: 20,
  },
  noRecordText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 20,
  },
  recordDetailTitle: {
    fontSize: 14,
    fontWeight: 'medium',
    color: '#666666',
  },
  recordDetailValue: {
    fontSize: 22,
    fontWeight: 'medium',
    color: '#333',
    paddingBottom: 10,
  },
});

RecordDetails.propTypes = {
  selectedRecord: PropTypes.object,
};

export default RecordDetails;
