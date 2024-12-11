// API Information
// applyToCrew: /api/crew/{crewId}/apply 크루 신청
// cancelCrewApplication: /api/crew/{crewId}/cancel 크루 신청 취소
// checkCrewAvailability: /api/crew/{crewId}/check 크루 가입 가능 여부 확인
// getCrewSelect: /api/crew/{crewId}/select 크루 선택 -> MyCrew 페이지에서 사용
// uploadCrewImages: /api/crew/{crewId}/image 크루 이미지 업로드
// leaveCrew: /api/crew/{crewId}/leave 크루 탈퇴
// modifyCrew: /api/crew/{crewId}/modify 크루 수정
// getCrewDetailForModification: /api/crew/{crewId}/detail 크루 수정을 위한 크루 상세 조회

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'https://api.running-mate.kro.kr/api',
});

export const applyToCrew = async crewId => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await api.post(`/crew/${crewId}/apply`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Apply to Crew Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to apply to crew:', error);
    throw error;
  }
};

export const cancelCrewApplication = async crewId => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await api.delete(`/crew/${crewId}/cancel`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Cancel Crew Application Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to cancel crew application:', error);
    throw error;
  }
};

export const checkCrewAvailability = async crewId => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await api.get(`/crew/${crewId}/check`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(
      'Check Crew Availability Response:',
      response.data.data.isAvailable,
    );
    return response.data.data.isAvailable;
  } catch (error) {
    console.error('Failed to check crew availability:', error);
    throw error;
  }
};

export const getCrewSelect = async crewId => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await api.get(`/crew/${crewId}/select`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = response.data.data;
    console.log('Get Crew Select Response:', data);
    return {
      id: data.id,
      name: data.name,
      open_chat: data.openChatUrl,
      profile_urls: data.images.map(image => image.openChatUrl),
      is_master: data.isCrewLeader,
    };
  } catch (error) {
    console.error('Failed to fetch crew detail:', error);
    throw error;
  }
};

export const uploadCrewImages = async (crewId, images) => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No token found');
    }

    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append('activityImages', {
        uri: image,
        type: 'image/jpeg',
        name: `image${index}.jpg`,
      });
    });

    const response = await api.post(`/crew/${crewId}/image`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Upload Crew Images Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to upload crew images:', error);
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

    console.log('Leave Crew Response:', response.status);
    if (response.status !== 204) {
      throw new Error('Failed to leave crew');
    }
  } catch (error) {
    console.error('Failed to leave crew:', error);
    throw error;
  }
};

export const modifyCrew = async (crewId, crewData, representativeImage) => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No token found');
    }

    const formData = new FormData();
    const requestPayload = {
      ...crewData,
      activityTimes: crewData.activityTimes.map(time => ({
        ...time,
        type: time.activityTimes, // 변경된 부분
      })),
    };
    formData.append('request', JSON.stringify(requestPayload));
    if (representativeImage) {
      formData.append('representativeImage', {
        uri: representativeImage,
        type: 'image/jpeg', // 이미지 타입 확인
        name: 'representativeImage.jpg',
      });
    }

    console.log('Request Payload:', requestPayload);

    const response = await api.patch(`/crew/${crewId}/modify`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Modify Crew Response:', response.data.data);
    return response.data.data; // 수정된 크루 정보 반환
  } catch (error) {
    console.error('Failed to modify crew:', error);
    throw error;
  }
};

export const getCrewDetailForModification = async crewId => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await api.get(`/crew/update`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        crewId,
      },
    });

    const data = response.data.data;
    console.log('Get Crew Detail for Modification Response:', data);
    console.log(data);
    return {
      id: data.id,
      name: data.name,
      shortDescription: data.shortDescription,
      detailDescription: data.detailDescription,
      ranking: data.ranking,
      profileImageUrl: data.profileImageUrl,
      crewActivityTimeList: data.crewActivityTimeList,
      city: data.crewLocationInfos.city,
      district: data.crewLocationInfos.district,
      courses: data.crewCourses ? data.crewCourses.courses : [],
      openChatUrl: data.openChatUrl,
    };
  } catch (error) {
    console.error('Failed to fetch crew detail:', error);
    throw error;
  }
};

export const getCrewApplicants = async crewId => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await api.get(`/crew/${crewId}/members`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        status: 'READY',
      },
    });

    console.log('Get Crew Applicants Response:', response.data.data);
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch crew applicants:', error);
    throw error;
  }
};
