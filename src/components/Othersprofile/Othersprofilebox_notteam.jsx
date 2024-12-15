import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Bar } from 'react-native-progress';

import Footprint from '../Footprint';
import Rank from '../Rank';

import defaultProfileImage from '../../assets/images/Settings/profile.png';
import nameImg from '../../assets/images/MyProfile/free-icon-business-12930954.png';
import birthdayImg from '../../assets/images/MyProfile/free-icon-firecracker-3119764.png';
import genderImg from '../../assets/images/MyProfile/free-icon-gender-fluid-2556165.png';
import addressImg from '../../assets/images/MyProfile/free-icon-placeholder-149226.png';
import detail from '../../assets/images/MyProfile/free-icon-magnifier-2319177.png';
const formatNumber = num => {
  if (num === undefined || num === null) {
    return '0';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'm';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
};
const ProfileBox = ({ data }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={
              data.profileImageUrl && data.profileImageUrl !== null
                ? { uri: data.profileImageUrl }
                : defaultProfileImage
            }
            style={styles.profileImage}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 5,
              marginLeft: 50

            }}
          >
            <Text style={styles.nickname}>{data.nickname}</Text>
            <Rank rank={data.ranking} />
          </View>
          <Text style={styles.info}>{data.introduce}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginBottom: 7,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate('FollowerList')}
            style={styles.detailsContainer}
          >
            <Text style={styles.detailLabel}>팔로워</Text>
            <Text style={styles.detailValue}>
              {formatNumber(data.followerCount)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('FollowingList')}
            style={styles.detailsContainer}
          >
            <Text style={styles.detailLabel}>팔로잉</Text>
            <Text style={styles.detailValue}>
              {formatNumber(data.followingCount)}
            </Text>
          </TouchableOpacity>
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
              {data.runningDistance}
            </Text>
            <Text style={styles.runningLabel}>km</Text>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.runningLabel}>달린 횟수</Text>
            <Text style={styles.runningValue}>
              {data.runningCount}
            </Text>
            <Text style={styles.runningLabel}>회</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 1,
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={styles.detailValue}>나의 발걸음 지수</Text>
            <TouchableOpacity onPress={() => setFootprintFigureVisible(true)}>
              <Image source={detail} style={styles.icon} />
            </TouchableOpacity>
          </View>
          <Footprint experience={data.footPrint} />
        </View>
        <View style={styles.barContainer}>
          <Bar
            progress={data.footPrint / 1500}
            width={null}
            height={20}
            color="#4A9B8C"
            unfilledColor="#BCBCBC"
            borderWidth={0}
            borderRadius={15}
          />
          <Text style={styles.barText}>{`${data.footPrint} / 1500`}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 13,
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
    marginRight: 5,
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
  barContainer: {
    position: 'relative',
    height: 20,
    marginTop: 5,
  },
  barText: {
    position: 'absolute',
    top: 3,
    left: '60%',
    transform: [{ translateX: -50 }],
    color: 'white',
    fontWeight: 'bold',
    fontSize: 10,
  },
  whitebutton: {
    width: 160, height: 45,
    borderColor: '#73D393',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 15,
    alignItems: "center", justifyContent: "center",
    marginTop: 12, alignSelf: 'center'
  },

  greentext: { color: '#73D393', fontSize: 20, fontWeight: 'bold', marginBottom: 4 },

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
    footprint: PropTypes.number,
    ranking: PropTypes.string,
  }).isRequired,
};

export default ProfileBox;
