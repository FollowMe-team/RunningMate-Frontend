
import React from 'react';
import { TextInput, StyleSheet, View, Text, Alert, Pressable, Image, ImageBackground } from 'react-native';

import mapforrun from '../../assets/images/Course/mapforrun.png';
import blacklocation from '../../assets/images/Course/blacklocation.png';
import location from '../../assets/images/Course/location.png';
import time from '../../assets/images/Course/time.png';
import star from '../../assets/images/Course/star.png';
import runner from '../../assets/images/Course/runner.png';
import mapview from '../../assets/images/Course/mapforcourseview.png';
import Qmark from '../../assets/images/Course/Qmark.png';

const styles = StyleSheet.create({
    space: { height: 5 },

    inputbarsearch: { borderRadius: 10, width: "65%", height: 40, backgroundColor: 'white', elevation: 7, alignSelf: 'center', paddingLeft: 10, marginTop: 15, flexDirection: 'row' },

    greensharptext: {
        height: 24, marginRight: 10, width: 'auto', paddingLeft: 10, paddingRight: 10,
        borderColor: 'white',
        backgroundColor: '#73D393',
        borderWidth: 0,
        borderRadius: 20,
        color: 'white', fontSize: 10, fontWeight: 'bold', marginBottom: 5
        , marginRight: 15, marginleft: 15, textAlign: 'center', textAlignVertical: 'center'
    },

    whitesharptext: {
        height: 24, marginRight: 10, width: 'auto', paddingLeft: 10, paddingRight: 10,
        borderColor: 'white',
        backgroundColor: 'white',
        borderWidth: 0,
        borderRadius: 20, elevation: 7,
        color: 'black', fontSize: 10, fontWeight: 'bold', marginBottom: 5
        , marginRight: 15, marginleft: 15, textAlign: 'center', textAlignVertical: 'center'
    },

});



export default function Course() {
    return (
        <View style={{ flexDirection: 'column' }}>
            <ImageBackground
                style={{ width: "100%", height: "100%", justifyContent: 'flex-end' }}
                source={mapforrun}
            >
                <View style={styles.inputbarsearch}>
                    <Image style={{ width: 20, height: 20, alignSelf: 'center', marginRight: 5 }} source={Qmark} />
                    <Text style={{ textAlignVertical: 'center' }}>코스명 또는 지역명</Text>
                </View>
                <View style={{ flexWrap: 'wrap', flexDirection: 'row', position: 'absolute', top: 10, left: 10 }}>
                    <Text style={styles.whitesharptext}># 3KM 미만</Text>
                    <Text style={styles.whitesharptext}># 숲길</Text>
                </View>
                <View style={{ borderTopLeftRadius: 32, borderTopRightRadius: 32, width: "100%", height: 350, backgroundColor: 'white', elevation: 7 }}>
                    <View style={{ borderRadius: 15, width: "20%", height: 5, backgroundColor: '#E5E5EB', alignSelf: 'center', marginTop: 7, marginBottom: 15 }}></View>
                    <Text style={{ color: 'black', fontSize: 22, fontWeight: 'bold', alignSelf: 'center' }}>문학산 코스</Text>
                    <Text style={{ fontSize: 18, alignSelf: 'center' }}>인천 미추홀구</Text>
                    <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginRight: 7, marginTop: 3 }}>
                            <Image
                                style={{ width: 12, alignSelf: 'flex-end', height: 12, marginRight: 3 }}
                                source={location}
                            />
                            <Text
                                style={{ color: 'grey', fontSize: 8 }}
                            >3.8KM</Text>
                        </View>
                        <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginRight: 12, marginTop: 3 }}>
                            <Image
                                style={{ width: 12, alignSelf: 'flex-end', height: 12, marginRight: 3 }}
                                source={time}
                            />
                            <Text
                                style={{ color: 'grey', fontSize: 8 }}
                            >30~40분</Text>
                        </View>

                    </View>
                    <View style={styles.space}></View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ marginLeft: 22, marginRight: 22, color: 'black', width: 280 }}>산을 따라서 달리는 하드코어 러닝 코스입니다.
                            숙련자만 달리시길 권장드립니다.
                        </Text>
                        <View style={{ marginTop: 2, marginLeft: 10 }}>
                            <Text
                                style={{ textAlign: 'center', textAlignVertical: 'center', width: 32, height: 20, color: '#E06464', fontSize: 9, backgroundColor: '#F3CFCF', borderRadius: 20 }}
                            >어려움</Text>
                            <Text
                                style={{ marginTop: 2, color: 'grey', fontSize: 10, marginRight: 13, textAlignVertical: 'center' }}
                            >7.5KM</Text>

                        </View>
                    </View>
                    <View style={styles.space}></View>
                    <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                        <View style={{ marginLeft: 22, marginRight: 15, flexWrap: 'wrap', flexDirection: 'row' }}>
                            <Image
                                style={{ width: 16, height: 16, marginRight: 7 }}
                                source={star}
                            />
                            <Text style={{ fontSize: 12 }}>
                                4.5
                            </Text>
                        </View>
                        <View style={{ flexWrap: 'wrap', flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                                style={{ width: 14, height: 14, marginRight: 7 }}
                                source={runner}
                            />
                            <Text style={{ fontSize: 12 }}>
                                1000명
                            </Text>
                        </View>
                    </View>
                    <View style={styles.space}></View>
                    <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginLeft: 22 }}>
                        <Text style={styles.greensharptext}># 산</Text>
                        <Text style={styles.greensharptext}># 경사 높음</Text>
                        <Text style={styles.greensharptext}># 계단 있음</Text>
                    </View>
                    <View style={styles.space}></View>
                    <Image
                        style={{ width: "88%", height: 160, marginRight: 7, alignSelf: 'center' }}
                        source={mapview}
                    />


                </View>
            </ImageBackground>

        </View>
    );
}


