import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'https://api.running-mate.kro.kr/api',
});

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

const updateProfile = async (profileData, profileImage) => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (!accessToken) {
      console.error('No access token found');
      return { success: false, message: '인증되지 않은 사용자입니다.' };
    }

    const formData = new FormData();
    formData.append('request', JSON.stringify(profileData));
    if (profileImage) {
      formData.append('profileImage', {
        uri: profileImage,
        type: 'image/jpeg',
        name: 'profile.jpg',
      });
    }

    const response = await api.patch('/members', formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status === 200) {
      console.log('Profile update successful:', response.data);
      return { success: true };
    }
  } catch (error) {
    console.error('Profile update failed:', error);
    if (error.response) {
      const { data } = error.response;
      if (data.code === 'AUTH001') {
        return { success: false, message: '인증되지 않은 사용자입니다.' };
      } else if (data.code === 'MEMBER002') {
        return { success: false, message: '변경할 프로필 정보가 없습니다.' };
      } else if (data.code === 'MEMBER001') {
        return { success: false, message: '회원을 찾을 수 없습니다.' };
      }
    }
    return { success: false, message: '프로필 업데이트에 실패했습니다.' };
  }
};

const checkNickname = async nickname => {
  try {
    const response = await api.get(
      `/members/check/nickname=?nickname=${nickname}`,
      {
        headers: { accept: 'application/json' },
      },
    );
    console.log('Nickname check successful:', response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Nickname check failed:', error.response.data);
    } else {
      console.error('Nickname check failed:', error.message);
    }
    return { success: false, message: '닉네임 확인 중 오류가 발생했습니다.' };
  }
};

const checkEmail = async email => {
  try {
    const response = await api.get(`/members/check/email=?email=${email}`, {
      headers: { accept: 'application/json' },
    });
    console.log('Email check successful:', response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Email check failed:', error.response.data);
    } else {
      console.error('Email check failed:', error.message);
    }
    return { success: false, message: '이메일 확인 중 오류가 발생했습니다.' };
  }
};

const getBadges = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (!accessToken) {
      console.error('No access token found');
      return { success: false, message: '인증되지 않은 사용자입니다.' };
    }
    const response = await api.get('/members/badges', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (response.status === 200) {
      console.log('Badges fetch successful:', response.data);
      return { success: true, data: response.data.data.badges };
    }
  } catch (error) {
    console.error('Badges fetch failed:', error);
    if (error.response) {
      const { data } = error.response;
      if (data.code === 'AUTH001') {
        return { success: false, message: '인증되지 않은 사용자입니다.' };
      } else if (data.code === 'MEMBER001') {
        return { success: false, message: '회원을 찾을 수 없습니다.' };
      }
    }
    return { success: false, message: '배지 정보를 가져오는데 실패했습니다.' };
  }
};

const getFollowings = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (!accessToken) {
      console.error('No access token found');
      return { success: false, message: '인증되지 않은 사용자입니다.' };
    }
    const response = await api.get('/members/follow', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (response.status === 200) {
      console.log('Followings fetch successful:', response.data);
      return { success: true, data: response.data.data.followings };
    }
  } catch (error) {
    console.error('Followings fetch failed:', error);
    if (error.response) {
      const { data } = error.response;
      if (data.code === 'AUTH001') {
        return { success: false, message: '인증되지 않은 사용자입니다.' };
      } else if (data.code === 'MEMBER001') {
        return { success: false, message: '회원을 찾을 수 없습니다.' };
      }
    }
    return {
      success: false,
      message: '팔로잉 목록을 가져오는데 실패했습니다.',
    };
  }
};

const getFollowers = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (!accessToken) {
      console.error('No access token found');
      return { success: false, message: '인증되지 않은 사용자입니다.' };
    }
    const response = await api.get('/members/follower', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (response.status === 200) {
      console.log('Followers fetch successful:', response.data);
      return { success: true, data: response.data.data.followers };
    }
  } catch (error) {
    console.error('Followers fetch failed:', error);
    if (error.response) {
      const { data } = error.response;
      if (data.code === 'AUTH001') {
        return { success: false, message: '인증되지 않은 사용자입니다.' };
      } else if (data.code === 'MEMBER001') {
        return { success: false, message: '회원을 찾을 수 없습니다.' };
      }
    }
    return {
      success: false,
      message: '팔로워 목록을 가져오는데 실패했습니다.',
    };
  }
};

const getProfileSummary = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (!accessToken) {
      console.error('No access token found');
      return { loading: false, data: null };
    }
    const response = await api.get('/members/summary', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (response.status === 200) {
      console.log('Profile summary fetch successful:', response.data);
      return {
        loading: false,
        data: response.data.data,
      };
    }
  } catch (error) {
    if (error.response) {
      console.error('Profile summary fetch failed', error.response.data);
    } else {
      console.error('Profile summary fetch failed', error.message);
    }
    return { loading: false, data: null };
  }
};

const changePassword = async (currentPassword, newPassword) => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (!accessToken) {
      console.error('No access token found');
      return { success: false, message: '인증되지 않은 사용자입니다.' };
    }

    const response = await api.patch(
      '/members/password',
      { currentPassword, newPassword },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (response.status === 200) {
      console.log('Password change successful:', response.data);
      return { success: true };
    }
  } catch (error) {
    console.error('Password change failed:', error);
    if (error.response) {
      const { data } = error.response;
      if (data.code === 'AUTH001') {
        return { success: false, message: '인증되지 않은 사용자입니다.' };
      } else if (data.code === 'MEMBER003') {
        return {
          success: false,
          message: '현재 비밀번호가 일치하지 않습니다.',
        };
      } else if (data.code === 'MEMBER004') {
        return {
          success: false,
          message: '새 비밀번호가 현재 비밀번호와 동일합니다.',
        };
      } else if (data.code === 'MEMBER001') {
        return { success: false, message: '회원을 찾을 수 없습니다.' };
      }
    }
    return { success: false, message: '비밀번호 변경에 실패했습니다.' };
  }
};

export {
  getProfile,
  updateProfile,
  checkNickname,
  getBadges,
  checkEmail,
  getFollowings,
  getFollowers,
  getProfileSummary,
  changePassword,
};

export default api;
