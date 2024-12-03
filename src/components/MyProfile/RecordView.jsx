import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import Calendars from '../Calendars';
import RecordDetails from './RecordDetails';

const RecordView = ({
  handleDayPress,
  selectedRecord,
  records,
  fetchMonthlyRecords,
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
};

const styles = StyleSheet.create({
  recordView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default RecordView;
