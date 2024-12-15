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

const getProfile = async memberId => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('No access token found');
    }
    const response = await api.get(`/members/${memberId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.status === 200) {
      console.log('Profile fetch successful:', response.data);
      return {
        loading: false,
        data: {
          profile_url: response.data.data.profileImageUrl,
          nickname: response.data.data.nickname,
          ranking: response.data.data.ranking,
          info: response.data.data.introduce,
          follower: parseInt(response.data.data.followerCount, 10),
          following: parseInt(response.data.data.followingCount, 10),
          running_distance: response.data.data.runningDistance,
          running_count: response.data.data.runningCount,
          footprint: response.data.data.footPrint,
        },
      };
    }
  } catch (error) {
    console.error('Failed to fetch profile:', error);
    throw error;
  }
};

const getMonthlyRecords = async (memberId, yearMonth) => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('No access token found');
    }
    const response = await api.get(`/members/${memberId}/records/monthly`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        yearMonth,
      },
    });
    return response.data.data.records;
  } catch (error) {
    console.error('Failed to fetch monthly records:', error);
    throw error;
  }
};

const updateCrewMemberStatus = async (crewId, memberId, status) => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('No access token found');
    }
    const response = await api.patch(
      `/crew/${crewId}/members/${memberId}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          status,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Failed to update crew member status:', error);
    throw error;
  }
};

export {
  refreshAccessToken,
  getProfile,
  getMonthlyRecords,
  updateCrewMemberStatus,
};
