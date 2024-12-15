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
import PropTypes from 'prop-types';
import Rank from '../../components/Rank';
import Footprint from '../../components/Footprint';

// import Header from '../../components/Header';
import defaultProfile from '../../assets/images/Settings/profile.png';

const ApplyList = ({ route }) => {
  const navigation = useNavigation();
  const { applicants } = route.params;

  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    setFollowers(applicants);
  }, [applicants]);

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
      <View style={styles.infoLayout}>
        <Image
          source={item.profile_url ? { uri: item.profile_url } : defaultProfile}
          style={styles.profileImage}
        />
        <View style={styles.itemContainer}>
          <Text style={styles.nickname}>{item.nickname}</Text>
          <Rank rank={item.ranking} />
          <View style={{ marginLeft: 5 }} />
          <Footprint experience={item.footPrint} />
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
});

ApplyList.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      applicants: PropTypes.array.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ApplyList;
