import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import RecordDetails from './RecordDetails';

const RecordView = ({
  handleDayPress,
  selectedRecord,
  records,
  fetchMonthlyRecords,
  Calendars, // Calendars 컴포넌트를 props로 받음
}) => {
  return (
    <View style={styles.recordView}>
      <Calendars
        onDayPress={handleDayPress}
        dataSource={records}
        fetchMonthlyRecords={fetchMonthlyRecords}
      />
      <RecordDetails selectedRecord={selectedRecord} />
    </View>
  );
};

RecordView.propTypes = {
  handleDayPress: PropTypes.func.isRequired,
  selectedRecord: PropTypes.object,
  records: PropTypes.array.isRequired,
  fetchMonthlyRecords: PropTypes.func.isRequired,
  Calendars: PropTypes.elementType.isRequired,
};

const styles = StyleSheet.create({
  recordView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default RecordView;
