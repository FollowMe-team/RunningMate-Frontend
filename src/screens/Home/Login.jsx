import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../utils/api';

import logo from '../../assets/images/Home/logo.png';
import right from '../../assets/images/Home/right-arrow.png';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      });

      if (response.status === 200) {
        const { accessToken, refreshToken } = response.data.data;
        await AsyncStorage.setItem('isLoggedIn', 'true');
        await AsyncStorage.setItem('accessToken', accessToken);
        await AsyncStorage.setItem('refreshToken', refreshToken);
        navigation.replace('Navigation');
      }
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        if (data.code === 'MEMBER001') {
          alert('회원을 찾을 수 없습니다.');
        } else if (data.code === 'AUTH010') {
          alert('잘못된 비밀번호입니다.');
        } else {
          alert('로그인에 실패했습니다.');
        }
      } else {
        alert('로그인에 실패했습니다.');
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>로그인</Text>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inputPart}>
          <Text style={styles.loginText}>이메일</Text>
          <TextInput
            placeholder="회원가입시 사용한 이메일"
            style={styles.loginInput}
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#9B9B9D"
          />
        </View>
        <View style={styles.inputPart}>
          <Text style={styles.loginText}>비밀번호</Text>
          <TextInput
            placeholder="회원가입시 사용한 비밀번호"
            secureTextEntry={true}
            style={styles.loginInput}
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#9B9B9D"
          />
        </View>
        <View style={styles.forgetNSignupContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}
            style={styles.forgetNSignupButtonSet}
          >
            <Text style={styles.forgetNSignupText}>Forgot Password</Text>
            <Image source={right} style={{ width: 15, height: 15 }} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Signup')}
            style={styles.forgetNSignupButtonSet}
          >
            <Text style={styles.forgetNSignupText}>Sign Up </Text>
            <Image source={right} style={{ width: 15, height: 15 }} />
          </TouchableOpacity>
        </View>
        <View style={styles.changeButton}>
          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.button}>로그인</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 35,
  },
  headerText: {
    textAlign: 'center',
    color: '#352555',
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 8,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    width: '100%',
    height: 200,
    marginBottom: 14,
  },
  logo: {
    width: 140,
    height: 140,
  },
  formContainer: {
    width: '85%',
    alignSelf: 'center',
    marginBottom: 50,
  },
  inputPart: {
    marginBottom: 21,
  },
  loginText: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    color: '#101010',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  loginInput: {
    color: '#9B9B9D',
    fontSize: 14,
    fontWeight: 'medium',
    borderRadius: 8,
    borderColor: '#9B9B9D',
    borderWidth: 1,
  },
  forgetNSignupContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 72,
  },
  forgetNSignupButtonSet: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  forgetNSignupText: {
    color: '#9B9B9D',
    fontSize: 16,
    fontWeight: 'medium',
  },
  loginButton: {
    backgroundColor: '#73D393',
    borderRadius: 15,
    padding: 10,
    color: 'white',
    textAlign: 'center',
    fontSize: 23,
    fontWeight: 'bold',
  },
  changeButton: {
    width: '100%',
    margin: 20,
    padding: 20,
    backgroundColor: '#73D393',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  button: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

Login.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Login;
