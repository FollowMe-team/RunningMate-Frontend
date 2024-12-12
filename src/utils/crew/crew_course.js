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

const getFavoriteCourses = async crewId => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('No access token found');
    }
    console.log('Fetching favorite courses with access token:', accessToken);
    const response = await api.get(`/crew/${crewId}/favorite`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log('Favorite courses response:', response.data);
    return response.data.data.courses;
  } catch (error) {
    console.error('Failed to fetch favorite courses:', error);
    throw error;
  }
};

const addFavoriteCourse = async (crewId, courseId) => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('No access token found');
    }
    const response = await api.post(
      `/crew/${crewId}/courses/${courseId}/favorite`,
      null,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    console.log('Add favorite course response:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('Failed to add favorite course:', error);
    throw error;
  }
};

const removeFavoriteCourse = async (crewId, courseId) => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('No access token found');
    }
    const response = await api.delete(
      `/crew/${crewId}/course/${courseId}/favorite`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    console.log('Remove favorite course response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to remove favorite course:', error);
    throw error;
  }
};

export {
  refreshAccessToken,
  getFavoriteCourses,
  addFavoriteCourse,
  removeFavoriteCourse,
};
