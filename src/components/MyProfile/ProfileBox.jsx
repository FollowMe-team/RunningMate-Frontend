import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text, StyleSheet } from 'react-native';

import defaultProfileImage from '../../assets/images/Settings/profile.png';
import nameImg from '../../assets/images/MyProfile/free-icon-business-12930954.png';
import birthdayImg from '../../assets/images/MyProfile/free-icon-firecracker-3119764.png';
import genderImg from '../../assets/images/MyProfile/free-icon-gender-fluid-2556165.png';
import addressImg from '../../assets/images/MyProfile/free-icon-placeholder-149226.png';
// import detail from "../../assets/images/MyProfile/free-icon-magnifier-2319177.png";

const formatNumber = num => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'm';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
};

const ProfileBox = ({ data }) => {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={{ alignItems: 'center', marginBottom: 7 }}>
          <Image
            source={
              data.profile_url ? { uri: data.profile_url } : defaultProfileImage
            }
            style={styles.profileImage}
          />
          <Text style={styles.nickname}>{data.nickname}</Text>
          <Text style={styles.info}>{data.info}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginBottom: 7,
          }}
        >
          <View style={styles.detailsContainer}>
            <Text style={styles.detailLabel}>팔로워</Text>
            <Text style={styles.detailValue}>
              {formatNumber(data.follower)}
            </Text>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.detailLabel}>팔로잉</Text>
            <Text style={styles.detailValue}>
              {formatNumber(data.following)}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <View style={styles.detailsContainer}>
            <Image source={nameImg} style={styles.icon} />
            <Text style={styles.detailValue}>{data.name}</Text>
          </View>
          <View style={styles.detailsContainer}>
            <Image source={birthdayImg} style={styles.icon} />
            <Text style={styles.detailValue}>{data.birthday}</Text>
          </View>
          <View style={styles.detailsContainer}>
            <Image source={genderImg} style={styles.icon} />
            <Text style={styles.detailValue}>{data.gender}</Text>
          </View>
        </View>
        <View style={styles.detailsContainer}>
          <Image source={addressImg} style={styles.icon} />
          <Text style={styles.detailValue}>{data.address}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <View style={styles.detailsContainer}>
            <Text style={styles.runningLabel}>달린 거리</Text>
            <Text style={styles.runningValue}>
              {data.running_distance.toLocaleString()}
            </Text>
            <Text style={styles.runningLabel}>km</Text>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.runningLabel}>달린 횟수</Text>
            <Text style={styles.runningValue}>
              {data.running_count.toLocaleString()}
            </Text>
            <Text style={styles.runningLabel}>회</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#DDDDDD',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  infoContainer: {
    flex: 1,
  },
  nickname: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  info: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    marginBottom: 5,
  },
  detailLabel: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
    marginRight: 8,
  },
  runningLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: 'bold',
    marginRight: 8,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  detailValue: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
    marginRight: 8,
  },
  runningValue: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    marginRight: 8,
  },
});

ProfileBox.propTypes = {
  data: PropTypes.shape({
    profile_url: PropTypes.string,
    nickname: PropTypes.string,
    info: PropTypes.string,
    follower: PropTypes.number,
    following: PropTypes.number,
    name: PropTypes.string,
    birthday: PropTypes.string,
    gender: PropTypes.string,
    address: PropTypes.string,
    running_distance: PropTypes.number,
    running_count: PropTypes.number,
  }).isRequired,
};

export default ProfileBox;
