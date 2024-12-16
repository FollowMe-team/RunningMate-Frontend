import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

import CrewCard from './CrewCard';

const MyCrewList = ({ crewData, onCrewPress }) => {
  if (!crewData || crewData.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          존재하는 내 크루가 없습니다.{'\n'}
          &apos;내 크루 생성하기&apos; 버튼을 눌러 자신의 크루를 생성하거나 다른
          크루에 가입해보세요!
        </Text>
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

MyCrewList.propTypes = {
  crewData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      footprintAverage: PropTypes.number.isRequired,
      shortDescription: PropTypes.string,
      memberCount: PropTypes.number,
    }),
  ).isRequired,
  onCrewPress: PropTypes.func.isRequired,
};

export default MyCrewList;
