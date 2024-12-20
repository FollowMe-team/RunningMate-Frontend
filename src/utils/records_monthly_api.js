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

export const getMonthlyRecords = async yearMonth => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (!accessToken) {
      console.error('No access token found');
      return { success: false, message: '인증되지 않은 사용자입니다.' };
    }
    console.log(`Fetching records for ${yearMonth}`);
    const response = await api.get(
      `/members/records/monthly?yearMonth=${yearMonth}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
    if (response.status === 200) {
      console.log(
        'Monthly records fetch successful:',
        response.data.data.records,
      );
      return { success: true, data: response.data.data.records };
    }
  } catch (error) {
    console.error('Monthly records fetch failed:', error);
    return { success: false, message: '월별 기록을 가져오는데 실패했습니다.' };
  }
};
