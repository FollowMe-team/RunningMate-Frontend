import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
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

const ProfileBox = ({
  data,
  setFootprintFigureVisible,
  isMinimized,
  setIsMinimized, // 상태 변경 함수 추가
  hideDetails,
}) => {
  const navigation = useNavigation();
  const animation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isMinimized ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isMinimized]);

  const containerStyle = {
    transform: [
      {
        scaleY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0.25, 1], // 0.25는 80/320의 비율
        }),
      },
    ],
    opacity: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
  };

  return (
    <TouchableOpacity
      onPress={() => setIsMinimized(!isMinimized)} // 클릭 시 간소화 상태 전환
      style={styles.container}
    >
      <Animated.View
        style={[styles.contentWrapper, !isMinimized && containerStyle]}
      >
        {isMinimized ? (
          <View style={styles.minimizedContent}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={
                  data.profile_url
                    ? { uri: data.profile_url }
                    : defaultProfileImage
                }
                style={styles.minimizedProfileImage}
              />
              <Text style={styles.minimizedNickname}>{data.nickname}</Text>
              <Rank rank={data.ranking} />
            </View>
            <Footprint experience={data.footprint} />
          </View>
        ) : (
          <View style={styles.infoContainer}>
            <View style={{ alignItems: 'center' }}>
              <Image
                source={
                  data.profile_url && data.profile_url !== null
                    ? { uri: data.profile_url }
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
                  marginLeft: 50,
                }}
              >
                <Text style={styles.nickname}>{data.nickname}</Text>
                <Rank rank={data.ranking} />
              </View>
              <Text style={styles.info}>{data.info}</Text>
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
                  {formatNumber(data.follower)}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('FollowingList')}
                style={styles.detailsContainer}
              >
                <Text style={styles.detailLabel}>팔로잉</Text>
                <Text style={styles.detailValue}>
                  {formatNumber(data.following)}
                </Text>
              </TouchableOpacity>
            </View>
            {!hideDetails && (
              <>
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
              </>
            )}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View style={styles.detailsContainer}>
                <Text style={styles.runningLabel}>달린 거리</Text>
                <Text style={styles.runningValue}>{data.running_distance}</Text>
                <Text style={styles.runningLabel}>km</Text>
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.runningLabel}>달린 횟수</Text>
                <Text style={styles.runningValue}>{data.running_count}</Text>
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
                <TouchableOpacity
                  onPress={() => setFootprintFigureVisible(true)}
                >
                  <Image source={detail} style={styles.icon} />
                </TouchableOpacity>
              </View>
              <Footprint experience={data.footprint} />
            </View>
            <View style={styles.barContainer}>
              <Bar
                progress={data.footprint / 1500}
                width={null}
                height={20}
                color="#4A9B8C"
                unfilledColor="#BCBCBC"
                borderWidth={0}
                borderRadius={15}
              />
              <Text style={styles.barText}>{`${data.footprint} / 1500`}</Text>
            </View>
          </View>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#DDDDDD',
    overflow: 'hidden',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  contentWrapper: {
    flex: 1,
  },
  minimizedContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    height: 80,
  },
  minimizedProfileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  minimizedNickname: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginRight: 10,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginTop: 5,
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
  popupContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#000',
    fontWeight: 'bold',
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
    footprint: PropTypes.number,
    ranking: PropTypes.string,
  }).isRequired,
  setFootprintFigureVisible: PropTypes.func.isRequired,
  isMinimized: PropTypes.bool.isRequired,
  setIsMinimized: PropTypes.func.isRequired, // 상태 변경 함수 propTypes에 추가
  hideDetails: PropTypes.bool,
};

ProfileBox.defaultProps = {
  hideDetails: false,
};

export default ProfileBox;
