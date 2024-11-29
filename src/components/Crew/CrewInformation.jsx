import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import CrewActivityPicture from '../Crew/CrewActivityPicture';

import { useRoute, useNavigation } from '@react-navigation/native';
import Footprint from '../Footprint';
import myProfile from '../MyProfile/myprofileInfo.json';

const CrewInformation = () => {
  const route = useRoute();
  const { crew } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigation = useNavigation();

  const handleJoinCrew = () => {
    if (myProfile.footprint >= crew.footprint) {
      setModalMessage('신청 완료!');
    } else {
      setModalMessage('티어가 낮아 신청이 불가능합니다.');
    }
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    if (modalMessage === '신청 완료!') {
      navigation.navigate('Navigation', { screen: 'Crew' });
    }
  };

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
        <TouchableOpacity style={styles.button} onPress={handleJoinCrew}>
          <Text style={styles.buttonText}>크루 신청하기</Text>
        </TouchableOpacity>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleModalClose}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalText}>{modalMessage}</Text>
              <TouchableOpacity onPress={handleModalClose}>
                <Text style={styles.modalButtonText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 250,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#959393',
    textAlign: 'center',
    marginBottom: 50,
  },
  modalButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#00C81B',
  },
});

export default CrewInformation;
