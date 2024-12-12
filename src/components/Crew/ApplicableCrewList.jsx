import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

import CrewCard from './CrewCard';

const ApplicableCrewList = ({ crewData, onCrewPress }) => {
  if (!crewData || crewData.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>현재 추천 크루가 없습니다...{'\n'}</Text>
      </View>
    );
  }

  return (
    <View>
      {crewData.map(crew => (
        <CrewCard
          key={crew.id}
          crew={crew}
          onPress={() => onCrewPress(crew.id)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
  },
});

ApplicableCrewList.propTypes = {
  crewData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      rank: PropTypes.string.isRequired,
      brief: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onCrewPress: PropTypes.func.isRequired,
};

export default ApplicableCrewList;
