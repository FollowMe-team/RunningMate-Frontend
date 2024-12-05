import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import Calendars from '../Calendars';
import RecordDetails from './OthersRecordDetails';
import records from '../MyProfile/record.json';


const RecordView = ({ handleDayPress, selectedRecord }) => {
  return (
    <View style={styles.recordView}>
      <Calendars onDayPress={handleDayPress}  dataSource={records}/>
      <RecordDetails selectedRecord={selectedRecord} />
    </View>
  );
};

RecordView.propTypes = {
  handleDayPress: PropTypes.func.isRequired,
  selectedRecord: PropTypes.object,
};

const styles = StyleSheet.create({
  recordView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default RecordView;
