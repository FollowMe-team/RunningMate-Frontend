import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Text,
  TextInput,
  Modal,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { Dropdown } from 'react-native-element-dropdown';
import { Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Google Maps Directions API 키가 필요합니다
const GOOGLE_MAPS_API_KEY = 'AIzaSyCQdugA7ICLSYCnuAvsf_pfgtJYzM0sfTs';

import mapforrun from '../../assets/images/Course/mapforrun.png';
import blacklocation from '../../assets/images/Course/blacklocation.png';
import location from '../../assets/images/Course/location.png';
import time from '../../assets/images/Course/time.png';
import star from '../../assets/images/Course/star.png';
import runner from '../../assets/images/Course/runner.png';
import runningman from '../../assets/images/Course/runningmanforchoosebutton.png';
import mapview from '../../assets/images/Course/mapforcourseview.png';
import whiteplus from '../../assets/images/Course/whiteplus.png';
import Qmark from '../../assets/images/Course/Qmark.png';
import back from '../../assets/images/NaviIcon/left.png';

const RunningScreen = ({ route }) => {
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
  const [Leveldata, setLevel] = useState('');
  const [Goaldata, setGoal] = useState('');
  const data = route.params || {};
  const Goaldatas = [
    { label: '체중 감량', value: 'WEIGHT_LOSS' },
    { label: '속도 증가', value: 'ENDURANCE' },
    { label: '지구력 상승', value: 'SPEED' },
  ];
  const Leveldatas = [
    { label: '쉬움', value: 'EASY' },
    { label: '보통', value: 'NORMAL' },
    { label: '어려움', value: 'HARD' },
  ];

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
      const slopeValue = (elevation2 - elevation1) / (distance / 1000); // 킬로미터로 계산
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
      const lat1 = 37.7749; // 샌프란시스코 예시 위도
      const lon1 = -122.4194; // 샌프란시스코 예시 경도
      const lat2 = 37.8044; // 오클랜드 예시 위도
      const lon2 = -122.2711; // 오클랜드 예시 경도
      calculateSlope(lat1, lon1, lat2, lon2);
    }
  };

  // 거리 계산 함수
  const getDistance = async (lat1, lon1, lat2, lon2) => {
    const origin = `${lat1},${lon1}`;
    const destination = `${lat2},${lon2}`;

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${GOOGLE_MAPS_API_KEY}`,
      );
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

  const isValidCoordinate = value => {
    const num = parseFloat(value);
    return !isNaN(num) && isFinite(num);
  };
  // 사용자의 현재 위치 가져오기
  useEffect(() => {
    if (waypoints.length === 0) {
      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          const initialLocation = { latitude, longitude };
          setCurrentLocation({
            ...initialLocation,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
          //setWaypoints([initialLocation]); // 첫 경로 포인트를 현재 위치로 설정
        },
        error => Alert.alert('위치 오류', error.message),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      );
    }
    if (waypoints.length === 0) {
      addWaypoint2();
    }
    focusOnRoute();
  }, [waypoints]);
  const handlePressIn = () => {
    Animated.timing(scaleValue, {
      toValue: 0.9,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const addWaypoint2 = () => {
    for (let i = 0; i < data.data.coursePointInfos.length; i++) {
      const a = data.data.coursePointInfos[i].latitude;
      const b = data.data.coursePointInfos[i].longitude;
      const lat = parseFloat(a);
      const lng = parseFloat(b);

      if (isValidCoordinate(a) && isValidCoordinate(b)) {
        setWaypoints(prevWaypoints => [
          ...prevWaypoints,
          { latitude: lat, longitude: lng },
        ]);
      } else {
        Alert.alert('오류', '유효한 좌표를 입력하세요.');
      }
    }
  };

  const addWaypoint = () => {
    const lat = parseFloat(newPoint.latitude);
    const lng = parseFloat(newPoint.longitude);

    if (
      isValidCoordinate(newPoint.latitude) &&
      isValidCoordinate(newPoint.longitude)
    ) {
      setWaypoints(prevWaypoints => [
        ...prevWaypoints,
        { latitude: lat, longitude: lng },
      ]);
      setNewPoint({ latitude: '', longitude: '' });
    } else {
      Alert.alert('오류', '유효한 좌표를 입력하세요.');
    }
  };

  const resetWaypoints = () => {
    setWaypoints(prev => (prev.length > 0 ? [prev[0]] : []));
  };
  const focusOnRoute = () => {
    if (waypoints.length === 0) return;

    const latitudes = waypoints.map(point => point.latitude);
    const longitudes = waypoints.map(point => point.longitude);

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
  const scaleValue = useRef(new Animated.Value(1)).current;

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        //region={currentLocation}
        showsUserLocation={false}
      >
        {/* 경로 표시 */}

        <Polyline
          coordinates={waypoints}
          strokeColor="#73D393"
          strokeWidth={4}
        />
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
            opacity={index === 0 ? 1 : index === waypoints.length - 1 ? 1 : 0}
            title={
              index === 0
                ? '출발지'
                : index === waypoints.length - 1
                ? '도착지'
                : ``
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
        if (waypoints.length === 0) {
            Geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const initialLocation = { latitude, longitude };
                    setCurrentLocation({
                        ...initialLocation,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    });
                    //setWaypoints([initialLocation]); // 첫 경로 포인트를 현재 위치로 설정
                },
                (error) => Alert.alert('위치 오류', error.message),
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }

            );
        }
        if (waypoints.length === 0) {
            addWaypoint2();
        }
        focusOnRoute();
    }, [waypoints]);
    const handlePressIn = () => {
        Animated.timing(scaleValue, {
            toValue: 0.9,
            duration: 100,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.timing(scaleValue, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
        }).start();
    };

    const addWaypoint2 = () => {
        for (let i = 0; i < data.data.coursePointInfos.length; i++) {

            const a = data.data.coursePointInfos[i].latitude;
            const b = data.data.coursePointInfos[i].longitude;
            const lat = parseFloat(a);
            const lng = parseFloat(b);

            if (isValidCoordinate(a) && isValidCoordinate(b)) {
                setWaypoints((prevWaypoints) => [...prevWaypoints, { latitude: lat, longitude: lng }]);
            } else {
                Alert.alert('오류', '유효한 좌표를 입력하세요.');
            }
        }
    };

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
    const scaleValue = useRef(new Animated.Value(1)).current;

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                //region={currentLocation}
                showsUserLocation={false}
            >
                {/* 경로 표시 */}

                <Polyline
                    coordinates={waypoints}
                    strokeColor="#73D393"
                    strokeWidth={4}
                />
                {waypoints.length > 1 && (
                    <Polyline
                        coordinates={waypoints}
                        strokeColor="#73D393"
                        strokeWidth={4}
                    />
                )}

                {/* 각 포인트에 마커 추가 */}
                {waypoints.map((point, index) => (
                    < Marker
                        pinColor={index === 0 ? '#73D393' : 'red'}
                        key={index}
                        coordinate={point}
                        opacity={index === 0 ? 1 : index === (waypoints.length - 1) ? 1 : 0}
                        title={index === 0 ? '출발지' : index === (waypoints.length - 1) ? '도착지' : ``}
                    />
                ))}
            </MapView>
            <View style={{ flexWrap: 'wrap', flexDirection: 'row', position: 'absolute', top: 75, left: 10 }}>
            </View>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        style={styles.inputbarsearch}
        onPress={() => navigation.navigate('Coursesearch')}
      >
        <View
          style={{
            borderRadius: 10,
            width: '100%',
            height: 40,
            alignSelf: 'center',
            flexDirection: 'row',
          }}
        >
          <Image
            style={{
              width: 20,
              height: 20,
              alignSelf: 'center',
              marginRight: 5,
            }}
            source={Qmark}
          />
          <Text style={{ textAlignVertical: 'center' }}>{data.data.name}</Text>
        </View>
      </TouchableOpacity>

      {/* 버튼 */}
      {false && (
        <View>
          <TouchableOpacity
            style={styles.routeButton}
            onPress={() => setIsRouteModalVisible(true)}
          >
            <Text style={styles.buttonText}>좌표 추가</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.routeButton, { top: 100 }]}
            onPress={focusOnRoute}
          >
            <Text style={styles.buttonText}>경로 보기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.routeButton, { top: 150 }]}
            onPress={resetWaypoints}
          >
            <Text style={styles.buttonText}>경로 초기화</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.routeButton, { top: 200 }]}
            onPress={moveToCurrentLocation}
          >
            <Text style={styles.buttonText}>내 위치로 이동</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.routeButton, { top: 250 }]}
            onPress={handleCalculateSlope}
          >
            <Text style={styles.buttonText}>경사 가져오기</Text>
          </TouchableOpacity>
        </View>
      )}
      <View
        style={{
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          width: '100%',
          height: 'auto',
          backgroundColor: 'white',
          elevation: 7,
          paddingVertical: 15,
        }}
      >
        <Text
          style={{
            color: 'black',
            fontSize: 22,
            fontWeight: 'bold',
            alignSelf: 'center',
          }}
        >
          {data.data.name}{' '}
        </Text>

        <Text style={{ fontSize: 18, alignSelf: 'center' }}>
          {data.data.location}
        </Text>
        <View
          style={{
            flexWrap: 'wrap',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              flexWrap: 'wrap',
              flexDirection: 'row',
              marginRight: 7,
              marginTop: 3,
            }}
          >
            <Image
              style={{
                width: 12,
                alignSelf: 'flex-end',
                height: 12,
                marginRight: 3,
              }}
              source={location}
            />
            <Text style={{ color: 'grey', fontSize: 8 }}>
              {data.data.distance}KM
            </Text>
          </View>
          <View
            style={{
              flexWrap: 'wrap',
              flexDirection: 'row',
              marginRight: 12,
              marginTop: 3,
            }}
          >
            <Image
              style={{
                width: 12,
                alignSelf: 'flex-end',
                height: 12,
                marginRight: 3,
              }}
              source={time}
            />
            <Text style={{ color: 'grey', fontSize: 8 }}>
              {data.data.duration}
            </Text>
          </View>
        </View>
        <View style={styles.space}></View>
        <View style={{ flexDirection: 'row' }}>
          <Text
            style={{
              marginLeft: 22,
              marginRight: 22,
              color: 'black',
              width: 280,
            }}
          >
            {data.data.description}
          </Text>
          <View style={{ marginTop: 2, marginLeft: 10 }}>
            <Text
              style={[
                data.data.difficulty === 'EASY' && styles.lowlevel,
                data.data.difficulty === 'NORMAL' && styles.middlelevel,
                data.data.difficulty === 'HARD' && styles.highlevel,
              ]}
            >
              {data.data.difficulty}
            </Text>
            <Text
              style={{
                marginTop: 2,
                color: 'grey',
                fontSize: 10,
                marginRight: 13,
                textAlignVertical: 'center',
              }}
            >
              {data.data.distance}KM
            </Text>
          </View>
        </View>
        <View style={styles.space}></View>
        <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
          <View
            style={{
              marginLeft: 22,
              marginRight: 15,
              flexWrap: 'wrap',
              flexDirection: 'row',
            }}
          >
            <Image
              style={{ width: 16, height: 16, marginRight: 7 }}
              source={star}
            />
            <Text style={{ fontSize: 12 }}>{data.data.rating}</Text>
          </View>
          <View
            style={{
              flexWrap: 'wrap',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Image
              style={{ width: 14, height: 14, marginRight: 7 }}
              source={runner}
            />
            <Text style={{ fontSize: 12 }}>{data.data.runningCount}회</Text>
          </View>
        </View>
        <View style={styles.space}></View>
        <View
          style={{ flexWrap: 'wrap', flexDirection: 'row', marginLeft: 22 }}
        >
          {data.data.courseOptionTypes.map(button => (
            <Text style={[styles.greensharptext]}># {button}</Text>
          ))}
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('Reviewed', { id: data.data.id })}
          style={styles.greenbutton}
        >
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Image
              style={{ width: 40, height: 40, marginTop: 20 }}
              source={runningman}
            />
            <Text style={styles.whitetext}>상세보기</Text>

            <Image
              style={{ width: 32, height: 32, alignSelf: 'center' }}
              source={whiteplus}
            />
          </View>
        </TouchableOpacity>
      </View>
      {slope !== null && (
        <View style={styles.resultContainer}>
          <Text style={styles.slopeText}>
            경사: {slope.toFixed(4)} (고도 차이 / 수평 거리)
          </Text>
          <Text style={styles.infoText}>
            첫 번째 지점 (위도, 경도): {lat1}, {lon1}
          </Text>
          <Text style={styles.infoText}>
            첫 번째 지점 고도: {elevation1} 미터
          </Text>
          <Text style={styles.infoText}>
            두 번째 지점 (위도, 경도): {lat2}, {lon2}
          </Text>
          <Text style={styles.infoText}>
            두 번째 지점 고도: {elevation2} 미터
          </Text>
          <Text style={styles.infoText}>두 지점 간의 거리: {distance} km</Text>
          <Text style={styles.infoText}>
            두 지점 간의 고도 차이: {elevation2 - elevation1} m
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  lowlevel: {
    textAlign: 'center',
    textAlignVertical: 'center',
    width: 'auto',
    paddingHorizontal: 5,
    height: 20,
    color: '#409E4B',
    fontSize: 9,
    backgroundColor: '#CFF3D0',
    borderRadius: 20,
  },
  middlelevel: {
    textAlign: 'center',
    textAlignVertical: 'center',
    width: 'auto',
    paddingHorizontal: 5,
    height: 20,
    color: '#A9AB35',
    fontSize: 9,
    backgroundColor: '#FBFF7F',
    borderRadius: 20,
  },
  highlevel: {
    textAlign: 'center',
    textAlignVertical: 'center',
    width: 'auto',
    paddingHorizontal: 5,
    height: 20,
    color: '#E06464',
    fontSize: 9,
    backgroundColor: '#F3CFCF',
    borderRadius: 20,
  },

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
    top: 50,
    right: 20,
    backgroundColor: '#4285F4',
    padding: 10,
    borderRadius: 5,
    marginTop: 30,
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
  space: { height: 5 },

  greensharptext: {
    height: 24,
    marginRight: 10,
    width: 'auto',
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: 'white',
    backgroundColor: '#4A9B8C',
    borderWidth: 0,
    borderRadius: 20,
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
    marginRight: 15,
    marginleft: 15,
    textAlign: 'center',
    textAlignVertical: 'center',
  },

  greenbutton: {
    width: 350,
    height: 60,
    borderColor: 'white',
    backgroundColor: '#73D393',
    borderWidth: 0,
    borderRadius: 15,
    FlexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },

  whitetext: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginLeft: 60,
    marginRight: 60,
  },
  backButton: {
    position: 'absolute',
    left: 12,
    top: 30,
  },
  backButtonCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#50C878',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  inputbarsearch: {
    borderRadius: 10,
    width: '80%',
    height: 40,
    backgroundColor: 'white',
    elevation: 7,
    alignSelf: 'center',
    paddingLeft: 10,
    flexDirection: 'row',
    position: 'absolute',
    top: 28.5,
    left: 60,
  },
  whitesharptext: {
    height: 24,
    marginRight: 10,
    width: 'auto',
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: 'white',
    backgroundColor: 'white',
    borderWidth: 0,
    borderRadius: 20,
    elevation: 7,
    color: 'black',
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 5,
    marginRight: 15,
    marginleft: 15,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default RunningScreen;
