import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { getFollowings } from '../../utils/api';
import { followUser, unfollowUser } from '../../utils/follow';

import follow from '../../assets/images/MyProfile/free-icon-add-3683218.png';
import unfollow from '../../assets/images/MyProfile/free-icon-delete-friend-3683211.png';

import defaultProfile from '../../assets/images/Settings/profile.png';

const FollowingList = () => {
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFollowings = async () => {
      const result = await getFollowings();
      if (result.success) {
        setFollowing(result.data);
      } else {
        console.error(result.message);
      }
      setLoading(false);
    };
    fetchFollowings();
  }, []);

  const handleFollowToggle = async (id, isFollowing) => {
    let result;
    if (isFollowing) {
      result = await unfollowUser(id);
    } else {
      result = await followUser(id);
    }

    if (result.success) {
      setFollowing(prevState =>
        prevState.map(user =>
          user.id === id ? { ...user, isFollowing: !isFollowing } : user,
        ),
      );
    } else {
      console.error(result.message);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image
        source={{ uri: item.profile_url || defaultProfile }}
        style={styles.profileImage}
      />
      <View style={styles.infoLayout}>
        <Text style={styles.nickname}>{item.nickname}</Text>
        <Text style={styles.info}>{item.info}</Text>
      </View>
      <TouchableOpacity
        onPress={() => handleFollowToggle(item.id, item.isFollowing)}
      >
        <Image
          source={item.isFollowing ? unfollow : follow}
          style={styles.followButton}
        />
      </TouchableOpacity>
    </View>
  );

  const renderSkeleton = () => (
    <View style={styles.itemContainer}>
      <View style={styles.skeletonProfileImage} />
      <View style={styles.infoLayout}>
        <View style={styles.skeletonNickname} />
        <View style={styles.skeletonInfo} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <>
          {renderSkeleton()}
          {renderSkeleton()}
          {renderSkeleton()}
        </>
      ) : following.length === 0 ? (
        <Text style={styles.emptyMessage}>팔로잉한 러너가 없습니다...ㅠㅠ</Text>
      ) : (
        <FlatList
          data={following}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  infoLayout: {
    flexDirection: 'column',
  },
  nickname: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  info: {
    fontSize: 14,
    color: '#666',
  },
  emptyMessage: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
  skeletonProfileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: '#e0e0e0',
  },
  skeletonNickname: {
    width: 100,
    height: 16,
    backgroundColor: '#e0e0e0',
    marginBottom: 5,
  },
  skeletonInfo: {
    width: 150,
    height: 14,
    backgroundColor: '#e0e0e0',
  },
  followButton: {
    width: 24,
    height: 24,
  },
});

export default FollowingList;
