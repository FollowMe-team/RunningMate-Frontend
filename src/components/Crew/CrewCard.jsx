import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import defaultProfileImage from '../../assets/images/Settings/profile.png';
import groups from '../../assets/images/Crew/groups.png';
import Footprint from '../Footprint';
import Rank from '../Rank';

const CrewCard = ({ crew, onPress }) => {
  const profileImageUrl = crew.profileImageUrl
    ? { uri: crew.profileImageUrl }
    : defaultProfileImage;

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => onPress(crew.id)}
    >
      <Image
        source={profileImageUrl}
        style={{ width: 50, height: 50, borderRadius: 25 }}
      />
      <View style={styles.cardInfoSet}>
        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          <Text style={styles.cardTitle}>{crew.name}</Text>
          {crew.footprintAverage !== undefined && (
            <Footprint experience={crew.footprintAverage} />
          )}
          {crew.ranking && <Rank rank={crew.ranking} />}
        </View>
        <Text
          style={styles.cardBriefInfo}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {crew.shortDescription || 'No description available'}
        </Text>
      </View>
      <View style={styles.groupSet}>
        <Image source={groups} style={{ width: 10, height: 10 }} />
        <Text style={styles.count}>{crew.memberCount || 0}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderColor: '#E4E4E4',
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 10,
    width: '100%',
  },
  cardInfoSet: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginLeft: 10,
  },
  cardTitle: {
    color: '#101010',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 6,
  },
  cardBriefInfo: {
    color: '#878787',
    fontSize: 12,
    fontWeight: 'medium',
  },
  groupSet: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginLeft: 'auto',
  },
  count: {
    color: '#A8A5AF',
    fontSize: 8,
    marginLeft: 5,
  },
});

CrewCard.propTypes = {
  crew: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    footprintAverage: PropTypes.number,
    ranking: PropTypes.string,
    profileImageUrl: PropTypes.string,
    shortDescription: PropTypes.string,
    memberCount: PropTypes.number,
  }).isRequired,
  onPress: PropTypes.func.isRequired,
};

export default CrewCard;
