import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
    baseURL: 'https://api.running-mate.kro.kr/api',
});

const getCourseDetail = async courseids => {

    try {
        if (!courseids) {
            return { message: '유효하지 않은 ID입니다.' };
        }
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (!accessToken) {
            console.error('No access token found');
            return { success: false, data: null };
        }
        const response = await api.get(`/courses/${courseids}/detail`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (response.status === 200) {
            console.log('Course fetch successful:', response.data);
            return { success: true, data: response.data.data };
        }
    } catch (error) {
        console.error('Course fetch failed:', error);
        if (error.response) {
            const { data } = error.response;
            if (data.code === 'AUTH001') {
                return { success: false, data: null };
            } else if (data.code === 'MEMBER001') {
                return {success: false,  data: null };
            }
        }
        return { success: false, data: null };
    }
};
const getReview = async (courseids, value) => {

    try {
        if (!courseids || !value) {
            return { message: '유효하지 않은 ID입니다.' };
        }
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (!accessToken) {
            console.error('No access token found');
            return { success: false, data: null };
        }
        const response = await api.get(`/courses/${courseids}/reviews`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (response.status === 200) {
            console.log('Course fetch successful:', response.data);
            return { success: true, data: response.data.data };
        }
    } catch (error) {
        console.error('Course fetch failed:', error);
        if (error.response) {
            const { data } = error.response;
            if (data.code === 'AUTH001') {
                return { success: false, data: null };
            } else if (data.code === 'MEMBER001') {
                return {success: false,  data: null };
            }
        }
        return { success: false, data: null };
    }
};


const getCourseRecommend = async (latitude, longitude, difficulty, runningGoal) => {

    try {
        if (!latitude || !longitude || !difficulty || !runningGoal) {
            return { success: false, message: '모든 입력값이 필요합니다.' };
        }
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (!accessToken) {
            console.error('No access token found');
            return { success: false, message: '인증되지 않은 사용자입니다.' };
        }
        const response = await api.get(`/courses?latitude=${latitude}&longitude=${longitude}&difficulty=${difficulty}&runningGoal=${runningGoal}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (response.status === 200) {
            console.log('Course fetch successful:', response.data);
            return { success: true, data: response.data.data.courses };
        }
    } catch (error) {
        console.error('Course fetch failed:', error);
        if (error.response) {
            const { data } = error.response;
            if (data.code === 'AUTH001') {
                return { success: false, message: '인증되지 않은 사용자입니다.' };
            } else if (data.code === 'MEMBER001') {
                return { success: false, message: '회원을 찾을 수 없습니다.' };
            }
        }
        return { success: false, message: '코스 정보를 가져오는데 실패했습니다.' };
    }
};

const getbasicCourseRecommend = async () => {

    try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (!accessToken) {
            console.error('No access token found');
            return { success: false, message: '인증되지 않은 사용자입니다.' };
        }
        const response = await api.get(`/courses`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (response.status === 200) {
            console.log('Course fetch successful:', response.data);
            return { success: true, data: response.data.data.courses };
        }
    } catch (error) {
        console.error('Course fetch failed:', error);
        if (error.response) {
            const { data } = error.response;
            if (data.code === 'AUTH001') {
                return { success: false, message: '인증되지 않은 사용자입니다.' };
            } else if (data.code === 'MEMBER001') {
                return { success: false, message: '회원을 찾을 수 없습니다.' };
            }
        }
        return { success: false, message: '코스 정보를 가져오는데 실패했습니다.' };
    }
};

const getBookedCourse = async () => {
    try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (!accessToken) {
            console.error('No access token found');
            return { success: false, message: '인증되지 않은 사용자입니다.' };
        }
        const response = await api.get('/courses/bookmark', {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (response.status === 200) {
            console.log('Course fetch successful:', response.data);
            return { success: true, data: response.data.data.courses };
        }
    } catch (error) {
        console.error('Course fetch failed:', error);
        if (error.response) {
            const { data } = error.response;
            if (data.code === 'AUTH001') {
                return { success: false, message: '인증되지 않은 사용자입니다.' };
            } else if (data.code === 'MEMBER001') {
                return { success: false, message: '회원을 찾을 수 없습니다.' };
            }
        }
        return { success: false, message: '코스 정보를 가져오는데 실패했습니다.' };
    }
};


const getMyCourse = async () => {
    try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (!accessToken) {
            console.error('No access token found');
            return { success: false, message: '인증되지 않은 사용자입니다.' };
        }
        const response = await api.get('/courses/my', {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (response.status === 200) {
            console.log('Course fetch successful:', response.data);
            return { success: true, data: response.data.data.courses };
        }
    } catch (error) {
        console.error('Course fetch failed:', error);
        if (error.response) {
            const { data } = error.response;
            if (data.code === 'AUTH001') {
                return { success: false, message: '인증되지 않은 사용자입니다.' };
            } else if (data.code === 'MEMBER001') {
                return { success: false, message: '회원을 찾을 수 없습니다.' };
            }
        }
        return { success: false, message: '코스 정보를 가져오는데 실패했습니다.' };
    }
};



const getRecentCourse = async () => {
    try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (!accessToken) {
            console.error('No access token found');
            return { success: false, message: '인증되지 않은 사용자입니다.' };
        }
        const response = await api.get('/courses/recent', {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (response.status === 200) {
            console.log('Course fetch successful:', response.data);
            return { success: true, data: response.data.data.courses };
        }
    } catch (error) {
        console.error('Course fetch failed:', error);
        if (error.response) {
            const { data } = error.response;
            if (data.code === 'AUTH001') {
                return { success: false, message: '인증되지 않은 사용자입니다.' };
            } else if (data.code === 'MEMBER001') {
                return { success: false, message: '회원을 찾을 수 없습니다.' };
            }
        }
        return { success: false, message: '코스 정보를 가져오는데 실패했습니다.' };
    }
};

export const BookCourse = async courseID => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const response = await api.post(
            `/courses/${courseID}/bookmark`,
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


export const unBookCourse = async courseID => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const response = await api.delete(
            `/courses/${courseID}/bookmark`, {
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


export {
    getCourseRecommend,
    getRecentCourse,
    getBookedCourse,
    getMyCourse, getbasicCourseRecommend,
    getCourseDetail,
    getReview,
};

export default api;
