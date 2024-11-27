import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import followingData from '../../components/MyProfile/following.json';

import defaultProfile from '../../assets/images/Settings/profile.png';

const FollowingList = () => {
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    setFollowing(followingData);
  }, []);

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
    </View>
  );

  return (
    <FlatList
      data={following}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
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
});

export default FollowingList;
