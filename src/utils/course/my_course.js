import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'https://api.running-mate.kro.kr/api',
});

const refreshAccessToken = async () => {
  try {
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token found');
    }
    const response = await api.post('/auth/refresh', null, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    const { accessToken } = response.data.data;
    await AsyncStorage.setItem('accessToken', accessToken);
    return accessToken;
  } catch (error) {
    console.error('Failed to refresh access token:', error);
    throw error;
  }
};

const getMyCourses = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('No access token found');
    }
    console.log('Fetching my courses with access token:', accessToken);
    const response = await api.get('/courses/my', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log('My courses response:', response.data);
    return response.data.data.courses;
  } catch (error) {
    console.error('Failed to fetch my courses:', error);
    throw error;
  }
};

export { refreshAccessToken, getMyCourses };
