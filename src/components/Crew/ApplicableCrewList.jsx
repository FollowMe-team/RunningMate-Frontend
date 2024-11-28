import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import CrewCard from './CrewCard';

const ApplicableCrewList = ({ crewData, onCrewPress }) => {
  return (
    <View>
      {crewData.map(crew => (
        <CrewCard key={crew.id} crew={crew} onPress={() => onCrewPress(crew)} />
      ))}
    </View>
  );
};

ApplicableCrewList.propTypes = {
  crewData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      footprint: PropTypes.number.isRequired,
      brief: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onCrewPress: PropTypes.func.isRequired,
};

export default ApplicableCrewList;
