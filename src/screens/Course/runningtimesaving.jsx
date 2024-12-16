
import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, Text, TextInput, Modal } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import { Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { useInterval } from 'react-use';
import { getCourseMap } from '../../utils/courseapi';

// Google Maps Directions API 키가 필요합니다
const GOOGLE_MAPS_API_KEY = 'AIzaSyCQdugA7ICLSYCnuAvsf_pfgtJYzM0sfTs';

import mapforrun from '../../assets/images/Course/mapforrun.png';
import stopbutton from '../../assets/images/Course/stopbutton.png';
import playbutton from '../../assets/images/Course/playbutton.png';
import endbutton from '../../assets/images/Course/endbutton.png';
import { combineTransition } from 'react-native-reanimated';

let runpause = false




const RunningScreen = () => {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [waypoints, setWaypoints] = useState([]);
    const [newPoint, setNewPoint] = useState({ latitude: '', longitude: '', elevation: '' });
    const [isRouteModalVisible, setIsRouteModalVisible] = useState(false);
    const mapRef = useRef(null);
    const [slope, setSlope] = useState(null);
    const [end, setEnd] = useState(null);
    const [distance, setDistance] = useState(null);
    const [elevation1, setElevation1] = useState(null);
    const [elevation2, setElevation2] = useState(null);
    const [lat1, setLat1] = useState(null);
    const [lon1, setLon1] = useState(null);
    const [lat2, setLat2] = useState(null);
    const [lon2, setLon2] = useState(null);
    const navigation = useNavigation();
    const [time, setTime] = useState(moment.duration(0, 'seconds'));
    const [focus, setFocus] = useState(true);
    const [isRunning, setIsRunning] = useState(true);
    const [Coursedetails, setCoursedetails] = useState();
    const [Coursesuccess, setCoursesuccess] = useState(false);
    const [previousLocation, setPreviousLocation] = useState(null); // 이전 위치 저장
    const [totalDistance, setTotalDistance] = useState(0); // 총 이동 거리
    const curr = new Date();
    const [starttime, setStarttime] = useState();
    const [endtime, setEndtime] = useState();

    const [completedWaypoints, setCompletedWaypoints] = useState([]);
    const [remainingWaypoints, setRemainingWaypoints] = useState([]);
    const [remainingWaypointsformap, setRemainingWaypointsformap] = useState([]);
    useEffect(() => {
        setStarttime(curr.toISOString());
    }, []);
    /*
        // 현재 위치 업데이트 및 경로 진행 확인
        useEffect(() => {
            const interval = setInterval(() => {
                Geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
    
                        if (currentLocation) {
                            // 이전 위치와 현재 위치 간의 거리 계산
                            const distance = calculateDistance(
                                currentLocation.latitude,
                                currentLocation.longitude,
                                latitude,
                                longitude
                            );
    
                            // 총 이동 거리 업데이트
                            setTotalDistance((prevTotal) => prevTotal + distance);
                        }
    
                        if (distance > 50) {
                            setNewPoint({ ...newPoint, latitude: latitude });
                            setNewPoint({ ...newPoint, longitude: longitude });
    
                            
                            //const elevation = getElevation(latitude, longitude);
                            const elevation = 0;
                            setNewPoint({ ...newPoint, elevation: elevation });
                            addWaypoint();
                        }
    
                        setCurrentLocation({
                            latitude,
                            longitude,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        });
    
                    },
                    (error) => console.error(error),
                    { timeout: 20000 }
                );
            }, 1000);
    
            return () => clearInterval(interval); // 클린업
        }, [waypoints]);
    */
    // 거리 계산 함수
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371e3; // 지구 반경 (미터)
        const φ1 = (lat1 * Math.PI) / 180;
        const φ2 = (lat2 * Math.PI) / 180;
        const Δφ = ((lat2 - lat1) * Math.PI) / 180;
        const Δλ = ((lon2 - lon1) * Math.PI) / 180;

        const a =
            Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const distance = R * c; // 거리 (미터)
        return distance;
    };

    const tick = () => {
        setTime(prevTime => prevTime.clone().add(1, 'seconds'));
    };

    const timer = useInterval(() => {
        if (isRunning && focus) {
            tick();
        }
    }, 1000);


    const toggleTimer = () => {
        setIsRunning(!isRunning);
    };

    if (!focus) {
        clearInterval(timer);
    }

    useEffect(() => {
        const focusListener = navigation.addListener('focus', () => {
            setFocus(true);
            //getLocationUpdates(); // 위치 업데이트 시작
        });

        const blurListener = navigation.addListener('blur', () => {
            setFocus(false);
            setIsRunning(false);
            //removeLocationUpdates(); // 위치 업데이트 중지
        });

        // 클린업 함수
        return () => {
            //focusListener();
            //blurListener();
        };
    }, [navigation]);

    const formatTime = (duration) => {
        const hours = duration.hours().toString().padStart(2, '0');
        const minutes = duration.minutes().toString().padStart(2, '0');
        const seconds = duration.seconds().toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };

    // 경사 계산 함수
    const calculateSlope = async (lat1, lon1, lat2, lon2) => {
        // 고도 얻기
        const elevation1 = await getElevation(lat1, lon1);
        const elevation2 = await getElevation(lat2, lon2);

        if (elevation1 !== null && elevation2 !== null) {
            // 거리 계산
            const distance = await getDistance(lat1, lon1, lat2, lon2);
            if (distance === null) {
                return;
            }

            setDistance(distance);

            // 경사 계산 (고도 차이 / 수평 거리)
            const slopeValue = ((elevation2 - elevation1) / (distance / 1000)); // 킬로미터로 계산
            setSlope(slopeValue);
            setElevation1(elevation1);
            setElevation2(elevation2);
            setLat1(lat1);
            setLon1(lon1);
            setLat2(lat2);
            setLon2(lon2);
        } else {
            Alert.alert('고도 정보', '고도를 가져오는 데 실패했습니다.');
        }
    };
    // 경사 계산 버튼 클릭 시 동작
    const handleCalculateSlope = () => {
        if (slope !== null) {
            // 이미 정보가 표시된 상태라면, 정보 초기화 (토글 효과)
            setSlope(null);
            setDistance(null);
            setElevation1(null);
            setElevation2(null);
            setLat1(null);
            setLon1(null);
            setLat2(null);
            setLon2(null);
        } else {
            // 새로운 경사 계산
            const lat1 = 37.7749;  // 샌프란시스코 예시 위도
            const lon1 = -122.4194; // 샌프란시스코 예시 경도
            const lat2 = 37.8044;  // 오클랜드 예시 위도
            const lon2 = -122.2711; // 오클랜드 예시 경도
            calculateSlope(lat1, lon1, lat2, lon2);
        }
    };

    const handleEnd = () => {
        setEndtime(curr.toISOString());
        if (end !== null) {
            // 이미 정보가 표시된 상태라면, 정보 초기화 (토글 효과)
            setEnd(null);
            toggleTimer();
        } else {
            setEnd(true)
            toggleTimer();
            const elevation = 0;
            const lastpoint = { latitude: currentLocation.latitude, longitude: currentLocation.longitude, elevation: elevation };
            console.log("latitude", lastpoint.latitude, "longitude", lastpoint.longitude, "elevation", lastpoint.elevation);

            const lat = parseFloat(lastpoint.latitude);
            const lng = parseFloat(lastpoint.longitude);
            const elv = parseFloat(lastpoint.elevation);

            if (isValidCoordinate(lastpoint.latitude) && isValidCoordinate(lastpoint.longitude)) {
                setWaypoints((prevWaypoints) => [...prevWaypoints, { latitude: lat, longitude: lng, elevation: elv }]);
                setNewPoint({ latitude: '', longitude: '', elevation: '' });
            } else {
                Alert.alert('오류', '유효한 좌표를 입력하세요.');
            }
        }
    }


    // 거리 계산 함수
    const getDistance = async (lat1, lon1, lat2, lon2) => {
        const origin = `${lat1},${lon1}`;
        const destination = `${lat2},${lon2}`;

        try {
            const response = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${GOOGLE_MAPS_API_KEY}`);
            const data = await response.json();

            if (data.status === 'OK') {
                const distance = data.routes[0].legs[0].distance.value; // 거리 (미터 단위)
                return distance; // 미터로 반환
            } else {
                Alert.alert('경로 오류', '경로를 찾을 수 없습니다.');
                return null;
            }
        } catch (error) {
            console.error('API 호출 오류:', error);
            Alert.alert('네트워크 오류', 'API 호출에 실패했습니다.');
            return null;
        }
    };
    const haversineDistance = (lat1, lon1, lat2, lon2) => {
        const toRad = (value) => (value * Math.PI) / 180; // 도를 라디안으로 변환

        const R = 6371; // 지구 반지름 (km)
        const dLat = toRad(lat2 - lat1); // 위도의 차이 (라디안)
        const dLon = toRad(lon2 - lon1); // 경도의 차이 (라디안)

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // 거리 (km)

        return distance * 1000; // 거리 (m)로 변환
    };

    // 고도 계산 함수
    const getElevation = async (latitude, longitude) => {
        const url = `https://maps.googleapis.com/maps/api/elevation/json?locations=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.status === 'OK') {
                return data.results[0].elevation; // 고도 반환
            } else {
                Alert.alert('고도 오류', '고도를 가져올 수 없습니다.');
                return null;
            }
        } catch (error) {
            Alert.alert('네트워크 오류', '네트워크 오류가 발생했습니다.');
            return null;
        }
    };


    const isValidCoordinate = (value) => {
        const num = parseFloat(value);
        return !isNaN(num) && isFinite(num);
    };
    const [walking, setwalking] = useState([]);

    const interval = useRef(null);
    const [trackinterval, settrackinterval] = useState(true);
    useEffect(() => {

        const interval = setInterval(() => {
            Geolocation.getCurrentPosition(
                (position) => {
                    console.log("walking");
                    const { latitude, longitude } = position.coords;
                    const initialLocation = { latitude, longitude };
                    setCurrentLocation({
                        ...initialLocation,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    });
                    // 첫 경로 포인트를 현재 위치로 설정
                    setWaypoints((prevWaypoints) => [...prevWaypoints, initialLocation]);
                    console.log("waypoints", waypoints.length);
                    if (waypoints.length > 2) {
                        setTotalDistance((prevTotal) => prevTotal + haversineDistance(waypoints[waypoints.length - 1].latitude, waypoints[waypoints.length - 1].longitude, waypoints[waypoints.length - 2].latitude, waypoints[waypoints.length - 2].longitude,));
                    }

                },
                (error) => Alert.alert('위치 오류', error.message),
                { timeout: 20000, enableHighAccuracy: false, }

            );
        }, 1000)
        return () => clearInterval(interval); // 클린업
    }, [waypoints]);

    const addWaypoint = () => {
        const lat = parseFloat(newPoint.latitude);
        const lng = parseFloat(newPoint.longitude);
        const elv = parseFloat(newPoint.elevation);

        if (isValidCoordinate(newPoint.latitude) && isValidCoordinate(newPoint.longitude)) {
            setWaypoints((prevWaypoints) => [...prevWaypoints, { latitude: lat, longitude: lng, elevation: elv }]);
            setNewPoint({ latitude: '', longitude: '', elevation: '' });
        } else {
            Alert.alert('오류', '유효한 좌표를 입력하세요.');
        }
    }

    const resetWaypoints = () => {
        setWaypoints((prev) => (prev.length > 0 ? [prev[0]] : []));
    };
    const focusOnRoute = () => {
        if (waypoints.length === 0) return;

        const latitudes = waypoints.map((point) => point.latitude);
        const longitudes = waypoints.map((point) => point.longitude);

        const minLatitude = Math.min(...latitudes);
        const maxLatitude = Math.max(...latitudes);
        const minLongitude = Math.min(...longitudes);
        const maxLongitude = Math.max(...longitudes);

        const region = {
            latitude: (minLatitude + maxLatitude) / 2,
            longitude: (minLongitude + maxLongitude) / 2,
            latitudeDelta: (maxLatitude - minLatitude) * 1.5,
            longitudeDelta: (maxLongitude - minLongitude) * 1.5,
        };

        mapRef.current?.animateToRegion(region, 1000);
    };
    return (

        <View style={styles.container}>
            <MapView
                ref={mapRef}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={currentLocation}
                showsUserLocation={true}
            >
                {/* 지나온 경로 */}
                {waypoints.length > 1 && (
                    <Polyline
                        coordinates={waypoints}
                        strokeColor="#73D393"
                        strokeWidth={4}
                    />
                )}

                {/* 각 포인트에 마커 추가 */}
                {waypoints.map((point, index) => (
                    <Marker
                        pinColor={index === 0 ? '#73D393' : 'red'}
                        key={index}
                        coordinate={point}
                        opacity={index === 0 ? 1 : 0}
                        title={index === 0 ? '출발지' : ``}
                    />
                ))}
            </MapView>

            {/* 버튼 */}

            <View style={{ borderTopLeftRadius: 32, borderTopRightRadius: 32, width: "100%", height: 260, backgroundColor: 'white', elevation: 7 }}>
                <View style={{ borderRadius: 15, width: "20%", height: 5, backgroundColor: '#E5E5EB', alignSelf: 'center', marginTop: 7, marginBottom: 25 }}></View>
                <View style={{ borderRadius: 15, width: "85%", height: 120, backgroundColor: 'white', elevation: 7, alignSelf: 'center' }}>
                    <Text style={{ fontSize: 30, color: 'black', alignSelf: 'center' }}>{formatTime(time)}</Text>
                    <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-around' }}>
                        <View>
                            <Text style={{ alignSelf: 'center' }}>거리</Text>
                            <Text style={{ color: 'black', fontSize: 16, alignSelf: 'center' }}>{(totalDistance / 1000).toFixed(2)} km</Text>
                        </View>
                        <View>
                            <Text style={{ alignSelf: 'center' }}>평균 페이스</Text>
                            <Text style={{ color: 'black', fontSize: 16, alignSelf: 'center' }}>{totalDistance > 0
                                ? (((time.hours() * 3600 + time.minutes() * 60 + time.seconds()) / totalDistance) / 60000).toFixed() + '\'' + (((time.hours() * 3600 + time.minutes() * 60 + time.seconds()) / (totalDistance / 1000)) % 60).toFixed().toString().padStart(2, '0') + '\"'
                                : '0'}</Text>
                        </View>
                        <View>
                            <Text style={{ alignSelf: 'center' }}>칼로리</Text>
                            <Text style={{ color: 'black', fontSize: 16, alignSelf: 'center' }}>{(0.0055 * totalDistance).toFixed(1)}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 30 }}>
                    <TouchableOpacity onPress={toggleTimer}>
                        <Image style={{ height: 55, width: 55 }} source={isRunning ? stopbutton : playbutton} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleEnd}>
                        <Image style={{ height: 55, width: 55, marginLeft: 20 }} source={endbutton} />
                    </TouchableOpacity>
                </View>
            </View>

            {end !== null && (
                <View style={{ backgroundColor: ' rgba(0, 0, 0, 0.5)', height: '100%', width: '100%', position: 'absolute', justifyContent: 'center' }}>
                    <View style={{ backgroundColor: 'white', height: '18%', width: '60%', alignSelf: 'center', justifyContent: 'space-between', borderRadius: 15 }}>
                        <Text style={{ height: '50%', width: '75%', color: 'black', alignSelf: 'center', textAlign: 'center', textAlignVertical: 'center', color: 'grey', fontSize: 12, fontWeight: 'bold', marginTop: '9%' }}>종료 후 이어하기가 불가능합니다. 러닝을 그만두시겠습니까?</Text>
                        <View style={{ flexDirection: 'row', height: '35%', width: '100%' }}>
                            <TouchableOpacity onPress={handleEnd} style={{ width: '50%', height: '100%', justifyContent: 'center' }}>
                                <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: 'black', alignSelf: 'center', fontWeight: 'bold' }}>Cancel</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('Savingcourse', { time: time, totalDistance: totalDistance, starttime: starttime, endtime: endtime, waypoint: waypoints })}
                                style={{ width: '50%', height: '100%', justifyContent: 'center' }}>
                                <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: 'black', alignSelf: 'center', fontWeight: 'bold', color: 'red' }}>Finish</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            )}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    routeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: '#4285F4',
        padding: 10,
        borderRadius: 5,
    },
    button: {
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    resultContainer: {
        position: 'absolute',
        marginTop: 20,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    slopeText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    infoText: {
        fontSize: 14,
        marginBottom: 5,
    },
    space: { height: 15 },

});

export default RunningScreen;