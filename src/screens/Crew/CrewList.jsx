import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useRoute } from '@react-navigation/native';

import defaultProfile from '../../assets/images/Settings/profile.png';
import follow from '../../assets/images/MyProfile/free-icon-add-3683218.png';
import unfollow from '../../assets/images/MyProfile/free-icon-delete-friend-3683211.png';

const CrewList = () => {
  const route = useRoute();
  const { members } = route.params;
  const [memberList, setMemberList] = useState(members);

  const toggleFollow = id => {
    setMemberList(prevState =>
      prevState.map(member =>
        member.id === id ? { ...member, is_follow: !member.is_follow } : member,
      ),
    );
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
        style={{ marginTop: 5, marginLeft: '50%' }}
        onPress={() => toggleFollow(item.id)}
      >
        <Image
          source={item.is_follow ? unfollow : follow}
          style={styles.followButton}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {memberList.length === 0 ? (
        <Text style={styles.emptyMessage}>크루 멤버가 없습니다.</Text>
      ) : (
        <FlatList
          data={memberList}
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
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  info: {
    color: '#666',
    fontSize: 14,
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

export default CrewList;
