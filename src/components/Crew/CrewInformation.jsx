import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import CrewActivityPicture from '../Crew/CrewActivityPicture';

import { useRoute } from '@react-navigation/native';
import Footprint from '../Footprint';

const CrewInformation = () => {
  const route = useRoute();
  const { crew } = route.params;

  return (
    <ScrollView>
      <CrewActivityPicture profileUrls={crew.profile_url} />
      <View style={styles.container}>
        <View style={styles.profileForm}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={styles.crewName}>{crew.name}</Text>
            <Footprint experience={crew.footprint} />
          </View>
        </View>
        <View style={styles.formBox}>
          <Text style={styles.title}>크루 소개</Text>
          <Text style={styles.detail}>{crew.description}</Text>
        </View>
        <View style={styles.formBox}>
          <Text style={styles.title}>크루 조건</Text>
          <Text style={styles.detail}>대충 조건들 나열</Text>
        </View>
        <View style={styles.formBox}>
          <Text style={styles.title}>주 활동 시간대</Text>
          <Text style={styles.detail}>
            ({crew.week.join(', ')}) {crew.start_time} ~ {crew.end_time}
          </Text>
        </View>
        <View style={styles.formBox}>
          <Text style={styles.title}>크루 활동 지역</Text>
          <Text style={styles.detail}>
            {crew.city} {crew.district}
          </Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>크루 신청하기</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    justifyContent: 'center',
  },
  profileForm: {
    marginVertical: 15,
  },
  crewName: {
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
    marginRight: 5,
  },
  formBox: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#EDEDED',
    borderRadius: 16,
    marginBottom: 15,
  },
  title: {
    color: '#101010',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  detail: {
    color: '#101010',
    fontSize: 14,
    lineHeight: 24,
  },
  courseContainer: {
    color: '#101010',
    fontSize: 14,
    lineHeight: 24,
  },
  button: {
    width: '85%',
    paddingVertical: 22,
    marginTop: 100,
    marginBottom: 100,
    backgroundColor: '#73D393',
    borderRadius: 15,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CrewInformation;
