import React, { useState, useEffect } from 'react';
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
import { searchCrewMembers } from '../../utils/crew/crew3';
import Rank from '../../components/Rank';
import Footprint from '../../components/Footprint';

const CrewList = () => {
  const route = useRoute();
  const { crewId } = route.params;
  const [memberList, setMemberList] = useState([]);

  useEffect(() => {
    const fetchCrewMembers = async () => {
      try {
        const members = await searchCrewMembers(crewId);
        const formattedMembers = members.map(member => ({
          id: member.memberId,
          profile_url: member.profileImageUrl,
          nickname: member.nickname,
          ranking: member.ranking,
          footPrint: member.footPrint,
          // is_follow: false, // Assuming default follow state
        }));
        setMemberList(formattedMembers);
      } catch (error) {
        console.error('Failed to fetch crew members:', error);
      }
    };

    fetchCrewMembers();
  }, [crewId]);

  const toggleFollow = id => {
    setMemberList(prevState =>
      prevState.map(member =>
        member.id === id ? { ...member, is_follow: !member.is_follow } : member,
      ),
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.infoLayout}>
        <Image
          source={item.profile_url ? { uri: item.profile_url } : defaultProfile}
          style={styles.profileImage}
        />
        <Text style={styles.nickname}>{item.nickname}</Text>
        <Rank rank={item.ranking} />
        <View style={{ marginLeft: 5 }} />
        <Footprint experience={item.footPrint} />
      </View>
      <TouchableOpacity
        style={{ marginTop: 5 }}
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
    paddingHorizontal: 20,
  },
  itemContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    flexDirection: 'row',
    alignItems: 'center',
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
});

export default CrewList;
