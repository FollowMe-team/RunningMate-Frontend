/*
import { Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, Text, TextInput, Modal } from 'react-native';
import moment from 'moment';
import { useInterval } from 'react-use';

// Google Maps Directions API 키가 필요합니다
const GOOGLE_MAPS_API_KEY = 'AIzaSyCQdugA7ICLSYCnuAvsf_pfgtJYzM0sfTs';

import mapforrun from '../../assets/images/Course/mapforrun.png';
import stopbutton from '../../assets/images/Course/stopbutton.png';
import playbutton from '../../assets/images/Course/playbutton.png';
import endbutton from '../../assets/images/Course/endbutton.png';

let runpause = false

const styles = StyleSheet.create({
    space: { height: 15 },



});




const Runningtime = () => {
    const navigation = useNavigation();
    const [playImg, setplayImg] = useState(stopbutton);
    const [time, setTime] = useState(moment.duration(0, 'seconds'));
    const [focus, setFocus] = useState(true);
    const [isRunning, setIsRunning] = useState(true);

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

    return (
        <View style={{ flexDirection: 'column' }}>
            <ImageBackground
                style={{ width: "100%", height: "100%", justifyContent: 'flex-end' }}
                source={mapforrun}
            >
                <View style={{ borderTopLeftRadius: 32, borderTopRightRadius: 32, width: "100%", height: 260, backgroundColor: 'white', elevation: 7 }}>
                    <View style={{ borderRadius: 15, width: "20%", height: 5, backgroundColor: '#E5E5EB', alignSelf: 'center', marginTop: 7, marginBottom: 25 }}></View>
                    <View style={{ borderRadius: 15, width: "85%", height: 120, backgroundColor: 'white', elevation: 7, alignSelf: 'center' }}>
                        <Text style={{ fontSize: 30, color: 'black', alignSelf: 'center' }}>{formatTime(time)}</Text>
                        <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-around' }}>
                            <View>
                                <Text style={{ alignSelf: 'center' }}>거리</Text>
                                <Text style={{ color: 'black', fontSize: 16, alignSelf: 'center' }}>5.3KM</Text>
                            </View>
                            <View>
                                <Text style={{ alignSelf: 'center' }}>평균 페이스</Text>
                                <Text style={{ color: 'black', fontSize: 16, alignSelf: 'center' }}>5'33"</Text>
                            </View>
                            <View>
                                <Text style={{ alignSelf: 'center' }}>칼로리</Text>
                                <Text style={{ color: 'black', fontSize: 16, alignSelf: 'center' }}>245</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 30 }}>
                        <TouchableOpacity onPress={toggleTimer}>
                            <Image style={{ height: 55, width: 55 }} source={isRunning ? stopbutton : playbutton} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Runningend')}>
                            <Image style={{ height: 55, width: 55, marginLeft: 20 }} source={endbutton} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>

        </View>
    );
}

export default Runningtime;
*/

/*import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import moment from 'moment';
import { useInterval } from './useInterval'; // 별도의 custom hook 필요

const TimerComponent = ({ navigation }) => {
  const [time, setTime] = useState(moment.duration(0, 'seconds'));
  const [isRunning, setIsRunning] = useState(false);
  const [focus, setFocus] = useState(true);

  // 1초씩 시간 증가 함수
  const tick = () => {
    setTime(prevTime => moment.duration(prevTime.asMilliseconds() + 1000));
  };

  // 인터벌 타이머 설정
  const timer = useInterval(() => {
    if (isRunning && focus) {
      tick();
    }
  }, 1000);

  // 타이머 토글 함수
  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  // 타이머 초기화 함수
  const resetTimer = () => {
    setTime(moment.duration(0, 'seconds'));
    setIsRunning(false);
  };

  // 네비게이션 이벤트 리스너 설정
  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      setFocus(true);
      getLocationUpdates(); // 위치 업데이트 시작
    });

    const blurListener = navigation.addListener('blur', () => {
      setFocus(false);
      setIsRunning(false);
      removeLocationUpdates(); // 위치 업데이트 중지
    });

    // 클린업 함수
    return () => {
      focusListener();
      blurListener();
    };
  }, [navigation]);

  // 시간 포맷팅 함수
  const formatTime = (duration) => {
    const hours = duration.hours().toString().padStart(2, '0');
    const minutes = duration.minutes().toString().padStart(2, '0');
    const seconds = duration.seconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>
        {formatTime(time)}
      </Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={toggleTimer}
        >
          <Text style={styles.buttonText}>
            {isRunning ? '일시정지' : '시작'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={resetTimer}
        >
          <Text style={styles.buttonText}>
            초기화
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TimerComponent;

// useInterval.js (이전과 동일)
import { useEffect, useRef } from 'react';

export function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}*/


import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, Text, TextInput, Modal } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import { Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { useInterval } from 'react-use';

// Google Maps Directions API 키가 필요합니다
const GOOGLE_MAPS_API_KEY = 'AIzaSyCQdugA7ICLSYCnuAvsf_pfgtJYzM0sfTs';

import mapforrun from '../../assets/images/Course/mapforrun.png';
import stopbutton from '../../assets/images/Course/stopbutton.png';
import playbutton from '../../assets/images/Course/playbutton.png';
import endbutton from '../../assets/images/Course/endbutton.png';

let runpause = false




const RunningScreen = () => {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [waypoints, setWaypoints] = useState([]);
    const [newPoint, setNewPoint] = useState({ latitude: '', longitude: '' });
    const [isRouteModalVisible, setIsRouteModalVisible] = useState(false);
    const mapRef = useRef(null);
    const [slope, setSlope] = useState(null);
    const [distance, setDistance] = useState(null);
    const [elevation1, setElevation1] = useState(null);
    const [elevation2, setElevation2] = useState(null);
    const [lat1, setLat1] = useState(null);
    const [lon1, setLon1] = useState(null);
    const [lat2, setLat2] = useState(null);
    const [lon2, setLon2] = useState(null);
    const navigation = useNavigation();
    const [playImg, setplayImg] = useState(stopbutton);
    const [time, setTime] = useState(moment.duration(0, 'seconds'));
    const [focus, setFocus] = useState(true);
    const [isRunning, setIsRunning] = useState(true);


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
    // 사용자의 현재 위치 가져오기
    useEffect(() => {
        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const initialLocation = { latitude, longitude };
                setCurrentLocation({
                    ...initialLocation,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                });
                setWaypoints([initialLocation]); // 첫 경로 포인트를 현재 위치로 설정
            },
            (error) => Alert.alert('위치 오류', error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    }, []);

    const addWaypoint = () => {
        const lat = parseFloat(newPoint.latitude);
        const lng = parseFloat(newPoint.longitude);

        if (isValidCoordinate(newPoint.latitude) && isValidCoordinate(newPoint.longitude)) {
            setWaypoints((prevWaypoints) => [...prevWaypoints, { latitude: lat, longitude: lng }]);
            setNewPoint({ latitude: '', longitude: '' });
        } else {
            Alert.alert('오류', '유효한 좌표를 입력하세요.');
        }
    };

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

    const moveToCurrentLocation = () => {
        if (currentLocation) {
            mapRef.current?.animateToRegion(currentLocation, 1000);
        } else {
            Alert.alert('오류', '현재 위치를 가져오는 중입니다.');
        }
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
                {/* 경로 표시 */}
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
                        pinColor={'#73D393'}
                        key={index}
                        coordinate={point}
                        title={index === 0 ? '출발지' : `포인트 ${index}`}
                    />
                ))}
            </MapView>

            {/* 목적지 설정 모달 */}
            <Modal
                visible={isRouteModalVisible}
                animationType="slide"
                transparent={true}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>좌표를 추가하세요</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="위도 (latitude)"
                            keyboardType="default"
                            value={newPoint.latitude}
                            onChangeText={(lat) => setNewPoint({ ...newPoint, latitude: lat })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="경도 (longitude)"
                            keyboardType="default"
                            value={newPoint.longitude}
                            onChangeText={(lng) => setNewPoint({ ...newPoint, longitude: lng })}
                        />
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.button, { backgroundColor: '#4CAF50' }]}
                                onPress={addWaypoint}
                            >
                                <Text style={styles.buttonText}>추가</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, { backgroundColor: '#FF0000' }]}
                                onPress={() => setIsRouteModalVisible(false)}
                            >
                                <Text style={styles.buttonText}>취소</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* 버튼 */}
            <TouchableOpacity
                style={styles.routeButton}
                onPress={() => setIsRouteModalVisible(true)}
            >
                <Text style={styles.buttonText}>좌표 추가</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.routeButton, { top: 70 }]}
                onPress={focusOnRoute}
            >
                <Text style={styles.buttonText}>경로 보기</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.routeButton, { top: 120 }]}
                onPress={resetWaypoints}
            >
                <Text style={styles.buttonText}>경로 초기화</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.routeButton, { top: 170 }]}
                onPress={moveToCurrentLocation}
            >
                <Text style={styles.buttonText}>내 위치로 이동</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.routeButton, { top: 220 }]}
                onPress={handleCalculateSlope}
            >
                <Text style={styles.buttonText}>경사 가져오기</Text>
            </TouchableOpacity>
            <View style={{ borderTopLeftRadius: 32, borderTopRightRadius: 32, width: "100%", height: 260, backgroundColor: 'white', elevation: 7 }}>
                <View style={{ borderRadius: 15, width: "20%", height: 5, backgroundColor: '#E5E5EB', alignSelf: 'center', marginTop: 7, marginBottom: 25 }}></View>
                <View style={{ borderRadius: 15, width: "85%", height: 120, backgroundColor: 'white', elevation: 7, alignSelf: 'center' }}>
                    <Text style={{ fontSize: 30, color: 'black', alignSelf: 'center' }}>{formatTime(time)}</Text>
                    <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-around' }}>
                        <View>
                            <Text style={{ alignSelf: 'center' }}>거리</Text>
                            <Text style={{ color: 'black', fontSize: 16, alignSelf: 'center' }}>{(distance / 1000).toFixed(2)} km</Text>
                        </View>
                        <View>
                            <Text style={{ alignSelf: 'center' }}>평균 페이스</Text>
                            <Text style={{ color: 'black', fontSize: 16, alignSelf: 'center' }}>{distance > 0
                                ? ((distance / 1000) / (time / 3600)).toFixed(2)
                                : '0'} km/h</Text>
                        </View>
                        <View>
                            <Text style={{ alignSelf: 'center' }}>칼로리</Text>
                            <Text style={{ color: 'black', fontSize: 16, alignSelf: 'center' }}>{0.0055 * time}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 30 }}>
                    <TouchableOpacity onPress={toggleTimer}>
                        <Image style={{ height: 55, width: 55 }} source={isRunning ? stopbutton : playbutton} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Runningend')}>
                        <Image style={{ height: 55, width: 55, marginLeft: 20 }} source={endbutton} />
                    </TouchableOpacity>
                </View>
            </View>

            {slope !== null && (
                <View style={styles.resultContainer}>
                    <Text style={styles.slopeText}>경사: {slope.toFixed(4)} (고도 차이 / 수평 거리)</Text>
                    <Text style={styles.infoText}>첫 번째 지점 (위도, 경도): {lat1}, {lon1}</Text>
                    <Text style={styles.infoText}>첫 번째 지점 고도: {elevation1} 미터</Text>
                    <Text style={styles.infoText}>두 번째 지점 (위도, 경도): {lat2}, {lon2}</Text>
                    <Text style={styles.infoText}>두 번째 지점 고도: {elevation2} 미터</Text>
                    <Text style={styles.infoText}>두 지점 간의 거리: {distance} km</Text>
                    <Text style={styles.infoText}>두 지점 간의 고도 차이: {elevation2 - elevation1} m</Text>
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

