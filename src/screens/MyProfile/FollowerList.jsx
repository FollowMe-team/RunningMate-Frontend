import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { getFollowers } from '../../utils/api';
import { followUser, unfollowUser } from '../../utils/follow';
import defaultProfile from '../../assets/images/Settings/profile.png';
import follow from '../../assets/images/MyProfile/free-icon-add-3683218.png';
import unfollow from '../../assets/images/MyProfile/free-icon-delete-friend-3683211.png';

import Rank from '../../components/Rank';
import Footprint from '../../components/Footprint';

const FollowerList = () => {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFollowers = async () => {
      const result = await getFollowers();
      if (result.success) {
        setFollowers(result.data.followers || []);
      } else {
        console.error(result.message);
      }
      setLoading(false);
    };
    fetchFollowers();
  }, []);

  const handleFollowToggle = async (id, isFollowing) => {
    let result;
    if (isFollowing) {
      result = await unfollowUser(id);
    } else {
      result = await followUser(id);
    }

    if (result.success) {
      setFollowers(prevState =>
        prevState.map(user =>
          user.id === id ? { ...user, isFollowing: !isFollowing } : user,
        ),
      );
    } else {
      console.error(result.message);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer} key={item.memberId}>
      <View style={styles.infoLayout}>
        <Image
          source={
            item.profileImageUrl
              ? { uri: item.profileImageUrl }
              : defaultProfile
          }
          style={styles.profileImage}
        />
        <Text style={styles.nickname}>{item.nickname}</Text>
        <Rank rank={item.ranking} />
        <View style={{ marginLeft: 5 }} />
        <Footprint experience={item.footPrint} />
      </View>
      <TouchableOpacity
        onPress={() => handleFollowToggle(item.memberId, item.isFollowing)}
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
      ) : followers.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyMessage}>
            팔로워한 러너가 없습니다...ㅠㅠ
          </Text>
        </View>
      ) : (
        <FlatList
          data={followers}
          renderItem={renderItem}
          keyExtractor={item => item.memberId.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  infoLayout: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
  },
  itemContainer: {
    flexDirection: 'row',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  nickname: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FollowerList;
