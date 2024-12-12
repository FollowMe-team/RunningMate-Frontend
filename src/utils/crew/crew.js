// API Information
// getMyCrews: /api/crew 러닝 크루 조회
// createCrew: /api/crew 크루 생성
// deleteCrew: /api/crew/{crewId} 크루 삭제
// leaveCrew: /api/crew/{crewId}/leave 크루 탈퇴

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

export const getMyCrews = async () => {
  try {
    let token = await AsyncStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No token found');
    }
    let response = await api.get('/crew', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('API Response:', response.data);
    return response.data.data.myCrews;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Try to refresh the token
      try {
        const newToken = await refreshAccessToken();
        const response = await api.get('/crew', {
          headers: {
            Authorization: `Bearer ${newToken}`,
          },
        });
        console.log('API Response after token refresh:', response.data);
        return response.data.data.myCrews;
      } catch (refreshError) {
        console.error(
          'Failed to refresh token and fetch my crews:',
          refreshError,
        );
        throw refreshError;
      }
    } else if (error.response && error.response.status === 500) {
      console.error('Server error:', error.response.data);
      alert('서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } else if (error.response && error.response.data.code === 'COMMON010') {
      console.error('Server internal error:', error.response.data);
      alert('서버 내부 오류가 발생했습니다. 서버 관리자에게 문의하세요.');
    } else {
      console.error('Failed to fetch my crews:', error);
      throw error;
    }
  }
};

export const createCrew = async (crewData, representativeImage) => {
  const formData = new FormData();
  formData.append('request', JSON.stringify(crewData));
  if (representativeImage) {
    formData.append('representativeImage', {
      uri: representativeImage,
      type: 'image/jpeg',
      name: 'representativeImage.jpg',
    });
  }

  try {
    const token = await AsyncStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await api.post('/crew', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Create Crew Response:', response.data); // 결과 로그 추가
    return response.data.data.crewId; // crewId 반환
  } catch (error) {
    console.error('Failed to create crew:', error);
    throw error;
  }
};

export const deleteCrew = async crewId => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await api.delete(`/crew/${crewId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Failed to delete crew:', error);
    throw error;
  }
};

export const leaveCrew = async crewId => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await api.delete(`/crew/${crewId}/leave`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Failed to leave crew:', error);
    throw error;
  }
};

export const checkCrewName = async name => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No token found');
    }
    const response = await api.get(
      `/crew/check/name?name=${encodeURIComponent(name)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log('Check Crew Name Response:', response.data); // 결과 로그 추가
    return response.data.data.isDuplicated;
  } catch (error) {
    console.error('Failed to check crew name:', error);
    throw error;
  }
};

export const getCrewDetail = async crewId => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No token found');
    }
    const response = await api.get(`/crew/${crewId}/detail`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch crew detail:', error);
    throw error;
  }
};
