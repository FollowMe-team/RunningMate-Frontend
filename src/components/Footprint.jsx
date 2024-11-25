import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import foot1 from '../assets/images/rank/footprint1.png';
import foot2 from '../assets/images/rank/footprint2.png';
import foot3 from '../assets/images/rank/footprint3.png';
import foot4 from '../assets/images/rank/footprint4.png';
import foot5 from '../assets/images/rank/footprint5.png';
import foot6 from '../assets/images/rank/footprint6.png';

const getFootprintImage = experience => {
  if (experience >= 85) return foot6;
  if (experience >= 70) return foot5;
  if (experience >= 55) return foot4;
  if (experience >= 40) return foot3;
  if (experience >= 25) return foot2;
  return foot1;
};

const Footprint = ({ experience }) => {
  return (
    <View style={styles.container}>
      <Image source={getFootprintImage(experience)} style={styles.badge} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    width: 15,
    height: 15,
  },
});

Footprint.propTypes = {
  experience: PropTypes.number.isRequired,
};

export default Footprint;
