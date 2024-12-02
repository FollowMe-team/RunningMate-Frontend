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
  JOGGER: jogger,
  RUNNER: runner,
  RACER: racer,
  SPRINTER: sprinter,
  MARATHONER: marathoner,
  ULTRA_RUNNER: ultra,
  IRON_LEGS: iron,
  SPEED_DEMON: demon,
};

// const rankDescriptions = {
//   JOGGER: "달리기를 시작한 초보 러너",
//   RUNNER: "꾸준히 달리기를 즐기는 러너",
//   RACER: "속도와 거리를 높여가는 중급 러너",
//   SPRINTER: "빠른 속도로 달리는 전문가",
//   MARATHONER: "장거리 달리기의 마스터",
//   ULTRA_RUNNER: "극한의 장거리를 정복하는 러너",
//   IRON_LEGS: "어떤 코스도 견디는 강철 다리의 소유자",
//   SPEED_DEMON: "번개같은 속도의 전설적인 러너",
// };

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
    height: 25,
  },
  description: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
});

Rank.propTypes = {
  rank: PropTypes.string.isRequired,
};

export default Rank;
