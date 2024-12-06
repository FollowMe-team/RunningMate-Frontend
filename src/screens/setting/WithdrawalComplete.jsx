import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';

import record from '../../components/MyProfile/myprofileInfo.json';

import plane from '../../assets/images/Settings/free-icon-paper-plane-439379.png';

const WithdrawalComplete = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          {record.nickname} 님,{'\n'}
          언젠가 다시 만나기를 기원할게요!
        </Text>

        <View style={styles.imageContainer}>
          <Image source={plane} style={styles.icon} />
        </View>

        <Text style={styles.message}>
          계정 탈퇴가 완료되었어요.{'\n'}
          {record.nickname} 님이 남은 모든 정보가 완전 삭제됩니다.{'\n'}
          다시 돌아오실 때까지 기다릴게요!
        </Text>

        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.confirmButtonText}>확인</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 40,
    lineHeight: 28,
  },
  imageContainer: {
    alignSelf: 'center',
    marginVertical: 40,
    transform: [{ rotate: '45deg' }],
  },
  icon: {
    width: 100,
    height: 100,
  },
  message: {
    fontSize: 15,
    color: 'black',
    lineHeight: 20,
    marginBottom: 40,
  },
  confirmButton: {
    width: '30%',
    margin: 50,
    padding: 16,
    backgroundColor: '#FF0000',
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

WithdrawalComplete.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default WithdrawalComplete;
