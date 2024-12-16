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

const fetchMonthlyCrewSchedule = async (crewId, yearMonth) => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const response = await api.get(`/crew/${crewId}/schedule`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        yearMonth,
      },
    });
    console.log('Monthly crew schedule:', response.data.data.crewSchedule);

    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch monthly crew schedule:', error);
    throw error;
  }
};

const registerCrewSchedule = async (crewId, scheduleData) => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const response = await api.post(`/crew/${crewId}/schedule`, scheduleData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log('Registered crew schedule:', response.data.data);
    return response.data.data;
  } catch (error) {
    console.log('Schedule data:', scheduleData);
    console.error('Failed to register crew schedule:', error);
    throw error;
  }
};

export { refreshAccessToken, fetchMonthlyCrewSchedule, registerCrewSchedule };
