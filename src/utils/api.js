import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'https://api.running-mate.kro.kr/api',
});

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const response = await axios.post('/auth/refresh', null, {
            headers: { RefreshToken: refreshToken },
          });
          if (response.status === 200) {
            const { accessToken } = response.data.data;
            await AsyncStorage.setItem('accessToken', accessToken);
            originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
            return api(originalRequest);
          }
        } catch (refreshError) {
          if (refreshError.response.data.code === 'AUTH34') {
            alert('리프레시 토큰을 찾을 수 없습니다.');
          } else if (refreshError.response.data.code === 'AUTH35') {
            alert('리프레시 토큰이 일치하지 않습니다.');
          } else {
            alert('토큰 갱신에 실패했습니다.');
          }
        }
      }
    }
    return Promise.reject(error);
  },
);

export default api;
