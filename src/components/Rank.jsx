import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, StyleSheet } from 'react-native';

import jogger from '../assets/images/rank/jogger-badge.png';
import runner from '../assets/images/rank/runner-badge.png';
import racer from '../assets/images/rank/racer-badge.png';
import sprinter from '../assets/images/rank/sprinter-badge.png';
import marathoner from '../assets/images/rank/marathoner-badge.png';
import ultra from '../assets/images/rank/ultra-runner-badge.png';
import iron from '../assets/images/rank/iron-legs-badge.png';
import demon from '../assets/images/rank/speed-demon-badge.png';

const rankImages = {
  jogger,
  runner,
  racer,
  sprinter,
  marathoner,
  ultra,
  iron,
  demon,
};

const Rank = ({ rank }) => {
  return (
    <View style={styles.container}>
      <Image source={rankImages[rank]} style={styles.badge} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    width: 50,
    height: 50,
  },
});

Rank.propTypes = {
  rank: PropTypes.string.isRequired,
};

export default Rank;
