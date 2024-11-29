import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import CrewCard from './CrewCard';

const MyCrewList = ({ crewData }) => {
  const navigation = useNavigation();

  const handleCrewPress = crewName => {
    navigation.navigate('MyCrew', { crewName });
  };

  return (
    <View>
      {crewData.map(crew => (
        <CrewCard
          key={crew.id}
          crew={crew}
          onPress={() => handleCrewPress(crew.name)}
        />
      ))}
    </View>
  );
};

MyCrewList.propTypes = {
  crewData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      footprint: PropTypes.number.isRequired,
      brief: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default MyCrewList;
