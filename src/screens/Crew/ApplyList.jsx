import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import applyMemberData from './applyMember.json';

// import Header from '../../components/Header';
import defaultProfile from '../../assets/images/Settings/profile.png';

const ApplyList = () => {
  //   const route = useRoute();
  const navigation = useNavigation();

  //   const crew = route.params?.crew;
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    setFollowers(applyMemberData);
  }, []);

  //   React.useLayoutEffect(() => {
  //     navigation.setOptions({
  //       header: ({ navigation }) => (
  //         <Header title={crew.name} navigation={navigation} />
  //       ),
  //       title: crew.name, // 크루 이름을 제목으로 설정
  //     });
  //   }, [navigation, crew]);

  const handlePress = item => {
    navigation.navigate('CrewApplicant', { applicant: item });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item)}>
      <View style={styles.itemContainer}>
        <Image
          source={
            item.profile_url && item.profile_url !== null
              ? { uri: item.profile_url }
              : defaultProfile
          }
          style={styles.profileImage}
        />
        <View style={styles.infoLayout}>
          <Text style={styles.nickname}>{item.nickname}</Text>
          <Text style={styles.info}>{item.info}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={followers}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
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
});

export default ApplyList;
