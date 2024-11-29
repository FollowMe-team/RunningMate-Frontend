import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import followerData from '../../components/MyProfile/follower.json';

import defaultProfile from '../../assets/images/Settings/profile.png';

const FollowerList = () => {
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    setFollowers(followerData);
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
      data={followers}
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
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  info: {
    color: '#666',
    fontSize: 14,
  },
});

export default FollowerList;
