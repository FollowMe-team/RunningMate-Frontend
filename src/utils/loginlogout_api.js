import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'https://api.running-mate.kro.kr/api',
});

export const login = async (email, password) => {
  try {
    console.log('Attempting to log in with email:', email);
    const response = await api.post('/auth/login', { email, password });
    if (response.status === 200) {
      console.log('Login successful:', response.data);
      const { accessToken, refreshToken } = response.data.data;
      await AsyncStorage.setItem('isLoggedIn', 'true');
      await AsyncStorage.setItem('accessToken', accessToken);
      await AsyncStorage.setItem('refreshToken', refreshToken);
      return { success: true };
    }
  } catch (error) {
    console.log('Login failed:', error);
    if (error.response) {
      const { data } = error.response;
      if (data.code === 'MEMBER001') {
        return { success: false, message: '회원을 찾을 수 없습니다.' };
      } else if (data.code === 'AUTH010') {
        return { success: false, message: '잘못된 비밀번호입니다.' };
      }
    }
    return { success: false, message: '로그인에 실패했습니다.' };
  }
};

export const logout = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (!accessToken) {
      console.error('No access token found');
      return false;
    }
    const response = await api.post('/auth/logout', null, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (response.status === 200) {
      console.log('Logout successful:', response.data);
      await AsyncStorage.removeItem('isLoggedIn');
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('refreshToken');
      return true;
    }
  } catch (error) {
    if (error.response) {
      console.error('Logout failed', error.response.data);
    } else {
      console.error('Logout failed', error.message);
    }
    return false;
  }
};

export const signup = async (signupData, profileImage) => {
  const formData = new FormData();
  formData.append('request', JSON.stringify(signupData));
  if (profileImage) {
    formData.append('profileImage', {
      uri: profileImage,
      type: 'image/jpeg',
      name: 'profile.jpg',
    });
  }

  try {
    const response = await api.post('/auth/signup', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status === 200) {
      console.log('Signup API response:', response.data);
      return { success: true };
    }
  } catch (error) {
    console.log(
      'Signup API error:',
      error.response ? error.response.data : error.message,
    );
    if (error.response && error.response.data.code === 'VALID001') {
      return { success: false, message: '잘못된 입력값입니다.' };
    } else {
      return { success: false, message: '회원가입에 실패했습니다.' };
    }
  }
};

export const withdraw = async (type, reason) => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (!accessToken) {
      console.error('No access token found');
      return { success: false, message: '인증되지 않은 사용자입니다.' };
    }
    const response = await api.delete('/auth/withdraw', {
      headers: { Authorization: `Bearer ${accessToken}` },
      data: { type, reason },
    });
    if (response.status === 200) {
      console.log('Withdrawal successful:', response.data);
      await AsyncStorage.removeItem('isLoggedIn');
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('refreshToken');
      return { success: true };
    }
  } catch (error) {
    if (error.response) {
      console.error('Withdrawal failed', error.response.data);
      if (error.response.data.code === 'AUTH001') {
        return { success: false, message: '인증되지 않은 사용자입니다.' };
      }
    } else {
      console.error('Withdrawal failed', error.message);
    }
    return { success: false, message: '회원 탈퇴에 실패했습니다.' };
  }
};

export default api;
