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

export const searchCrews = async (params = {}) => {
  try {
    let accessToken = await AsyncStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('No token found');
    }
    try {
      const response = await api.get('/crew/search', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params,
      });
      console.log('Search Crews Response:', response.data);
      return response.data.data.recommendedCrews;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        accessToken = await refreshAccessToken();
        const response = await api.get('/crew/search', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params,
        });
        return response.data.data.recommendedCrews;
      } else {
        throw error;
      }
    }
  } catch (error) {
    console.error('Failed to search crews:', error);
    throw error;
  }
};

export const searchCrewMembers = async crewId => {
  try {
    let accessToken = await AsyncStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('No token found');
    }
    try {
      const response = await api.get(`/crew/${crewId}/members/complete`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log('Search Crew Members Response:', response.data);
      return response.data.data.crewMembers;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        accessToken = await refreshAccessToken();
        const response = await api.get(`/crew/${crewId}/members/complete`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        return response.data.data.crewMembers;
      } else {
        throw error;
      }
    }
  } catch (error) {
    console.error('Failed to search crew members:', error);
    throw error;
  }
};
