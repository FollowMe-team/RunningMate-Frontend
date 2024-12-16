import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
    baseURL: 'https://api.running-mate.kro.kr/api',
});


const getOthersProfile = async (ids) => {
    try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (!accessToken) {
            console.error('No access token found');
            return { success: false, message: '인증되지 않은 사용자입니다.' };
        }
        const response = await api.get(`/members/${ids}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (response.status === 200) {
            console.log('Course fetch successful:', response.data);
            return { success: true, data: response.data };
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

export const SavesavS = async (Request, representativeImage, startImage, finishImage) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        if (!token) {
            console.error('No access token found');
            return { success: false, message: '인증되지 않은 사용자입니다.' };
        }
        const l = {
            name: "nicknames",
            description: "content",
            city: "address",
            district: "",
            distance: 0,
            options: [
            ],
            coursePoints: [{
                "latitude": 0,
                "longitude": 0,
                "elevation": 0
            }, {
                "latitude": 0,
                "longitude": 0,
                "elevation": 0
            }]
        };
        console.log("l",l);
        console.log("request", Request);
        console.log("jsonl", JSON.stringify(l));
        console.log("jsonrequeset", JSON.stringify(Request));
        const formData = new FormData();
        formData.append('request', JSON.stringify(Request));
        if (representativeImage) {
            formData.append('representativeImage', {
                uri: representativeImage,
                type: 'image/jpeg',
                name: 'representativeImage.jpg',
            });
        }
        if (startImage) {
            formData.append('startImage', {
                uri: startImage,
                type: 'image/jpeg',
                name: 'startImage.jpg',
            });
        }
        if (finishImage) {
            formData.append('finishImage', {
                uri: finishImage,
                type: 'image/jpeg',
                name: 'finishImage.jpg',
            });
        }
        console.log(formData);
        const response = await api.post(
            `/courses`,
            formData,
            {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',

                },
            },
        );

        return response.data;
    } catch (error) {
        console.error(error);
        return { success: false, message: error.message };
    }
};

export const RecordRunning = async (courseID, Request) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        if (!token) {
            console.error('No access token found');
            return { success: false, message: '인증되지 않은 사용자입니다.' };
        }
        const response = await api.post(
            `/courses/${courseID}/record`,
            Request,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',

                },
            },
        );
        return response.data;
    } catch (error) {
        console.error(error);
        return { success: false, message: error.message };
    }
};


const getCourseMap = async courseids => {

    try {
        if (!courseids) {
            return { message: '유효하지 않은 ID입니다.' };
        }
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (!accessToken) {
            console.error('No access token found');
            return { success: false, data: null };
        }
        const response = await api.get(`/courses/${courseids}/path`, {
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
                return { success: false, data: null };
            }
        }
        return { success: false, data: null };
    }
};

export const RReviewing = async (courseID, Request, image) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        if (!token) {
            console.error('No access token found');
            return { success: false, message: '인증되지 않은 사용자입니다.' };
        }

        const formData = new FormData();
        formData.append('request', JSON.stringify(Request));
        if (image) {
            formData.append('images', {
                uri: image,
                type: 'image/jpeg',
                name: 'profile.jpg',
            });
        }
        console.log(formData);
        const response = await api.post(
            `/courses/${courseID}/reviews`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',

                },
            },
        );
        return response.data;
    } catch (error) {
        console.error(error);
        return { success: false, message: error.message };
    }
};



const getCourseSearch = async word => {
    const baseURL = '/courses/search';
    const url = word ? `${baseURL}?${word}` : baseURL;
    console.log("url:", url);
    try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (!accessToken) {
            console.error('No access token found');
            return { success: false, message: '인증되지 않은 사용자입니다.' };
        }
        const response = await api.get(url, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (response.status === 200) {
            console.log('Course fetch successful:', response.data, 'word', word, 'url', url);
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


const checkName = async name => {
    try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (!accessToken) {
            console.error('No access token found');
            return { success: false, data: null };
        }
        const response = await api.get(
            `/courses/check?name=${name}`,
            {
                headers: { Authorization: `Bearer ${accessToken}` },
            },
        );
        console.log('Name check successful:', response.data);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Name check failed:', error.response.data);
        } else {
            console.error('Name check failed:', error.message);
        }
        return { success: false, message: '코스 이름 확인 중 오류가 발생했습니다.' };
    }
};

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
                return { success: false, data: null };
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
        const response = await api.get(`/courses/${courseids}/reviews?sortType=${value}`, {
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
                return { success: false, data: null };
            }
        }
        return { success: false, data: null };
    }
};


const getCourseRecommend = async (params = {}) => {
    const baseURL = '/courses';
    const queryParams = new URLSearchParams(params).toString();
    const url = queryParams ? `${baseURL}?${queryParams}` : baseURL;

    try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (!accessToken) {
            console.error('No access token found');
            return { success: false, message: '인증되지 않은 사용자입니다.' };
        }
        const response = await api.get(url, {
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
    getMyCourse,
    getCourseDetail,
    getReview,
    checkName,
    getCourseSearch,
    getCourseMap,
    getOthersProfile,
};

export default api;
