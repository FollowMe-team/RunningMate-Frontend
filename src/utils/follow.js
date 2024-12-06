import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'https://api.running-mate.kro.kr/api',
});

export const followUser = async memberId => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await api.post(
      `/members/follow/${memberId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return { success: false, message: error.message };
  }
};

export const unfollowUser = async memberId => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await api.delete(`/members/follow/${memberId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return { success: false, message: error.message };
  }
};
