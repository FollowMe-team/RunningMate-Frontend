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
  if (experience > 900) return foot6;
  if (experience > 700) return foot5;
  if (experience > 500) return foot4;
  if (experience > 300) return foot3;
  if (experience > 100) return foot2;
  return foot1;
};

const Footprint = ({ experience }) => {
  if (experience === undefined) {
    return null;
  }
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
  experience: PropTypes.number,
};

export default Footprint;
