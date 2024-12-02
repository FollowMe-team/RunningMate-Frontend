import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'https://api.running-mate.kro.kr/api',
});

const login = async (email, password) => {
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

const getProfile = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (!accessToken) {
      console.error('No access token found');
      return { loading: false, data: null };
    }
    const response = await api.get('/members', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (response.status === 200) {
      console.log('Profile fetch successful:', response.data);
      const genderMap = {
        MALE: '남',
        FEMALE: '여',
      };
      return {
        loading: false,
        data: {
          profile_url: response.data.data.profileImageUrl,
          nickname: response.data.data.nickname,
          ranking: response.data.data.ranking,
          info: response.data.data.introduce,
          follower: parseInt(response.data.data.followerCount, 10),
          following: parseInt(response.data.data.followingCount, 10),
          name: response.data.data.name,
          birthday: response.data.data.birth,
          gender:
            genderMap[response.data.data.gender] || response.data.data.gender,
          address: response.data.data.address,
          running_distance: response.data.data.runningDistance,
          running_count: response.data.data.runningCount,
          footprint: response.data.data.footPrint,
        },
      };
    }
  } catch (error) {
    if (error.response) {
      console.error('Profile fetch failed', error.response.data);
    } else {
      console.error('Profile fetch failed', error.message);
    }
    return { loading: false, data: null };
  }
};

export { login, getProfile };

export default api;
