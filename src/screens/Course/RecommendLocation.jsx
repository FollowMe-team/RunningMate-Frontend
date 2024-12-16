import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import { useNavigation } from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';

// Google Maps API 키를 여기에 입력하세요
Geocoder.init('AIzaSyCQdugA7ICLSYCnuAvsf_pfgtJYzM0sfTs', {language : "ko"});

const RunningTrackingScreen = () => {
    const navigation = useNavigation();
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [address, setAddress] = useState('');
    const [currentLocation, setCurrentLocation] = useState(null);
    const mapRef = useRef(null);

    // 지도에서 위치 선택 시 호출되는 함수
    const handleMapPress = async (event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;

        setSelectedLocation({
            latitude,
            longitude
        });

        try {
            // 좌표를 주소로 변환
            const json = await Geocoder.from(latitude, longitude);
            const addressComponent = json.results[0].formatted_address;
            setAddress(addressComponent);
        } catch (error) {
            console.warn('주소 변환 중 오류 발생:', error);
            setAddress('주소를 찾을 수 없습니다');
        }
    };

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
            },
            (error) => Alert.alert('위치 오류', error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    }, []);

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                ref={mapRef}
                region={currentLocation}
                onPress={handleMapPress}
                showsUserLocation={true}
            >
                {selectedLocation && (
                    <Marker
                        coordinate={selectedLocation}
                        title="선택된 위치"
                    />
                )}
            </MapView>

            {selectedLocation && (
                <View style={styles.addressContainer}>
                    <Text style={styles.addressText}>
                        {address}
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Courserecommend', {selectedLocation : {latitude : selectedLocation.latitude, longitude: selectedLocation.longitude, address: address}})}
                        style={styles.greenbutton}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.whitetext}>
                                위치 선택</Text>
                        </View>
                    </TouchableOpacity>
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
    addressContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        elevation: 5,
    },
    coordinatesText: {
        fontSize: 14,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    addressText: {
        fontSize: 16,
    },
    greenbutton: {
        width: '80%', height: 40,
        borderColor: 'white',
        backgroundColor: '#73D393',
        borderWidth: 0,
        borderRadius: 15, FlexDirection: 'row',
        alignItems: "center", justifyContent: "center", alignSelf: "center",
        marginTop: 10
    },

    whitetext: { color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center', textAlignVertical: 'center', marginLeft: 60, marginRight: 60 },

});

export default RunningTrackingScreen;