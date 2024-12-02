
import React from 'react';
import { TextInput, TouchableOpacity, StyleSheet, View, Text, Alert, Pressable, Image, ImageBackground, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import blacklocation from '../../assets/images/Course/blacklocation.png';
import location from '../../assets/images/Course/location.png';
import time from '../../assets/images/Course/time.png';
import star from '../../assets/images/Course/star.png';
import runner from '../../assets/images/Course/runner.png';
import mapview from '../../assets/images/Course/mapforcourseview.png';

const styles = StyleSheet.create({
    space: { height: 15 },

    greensharptext: {
        height: 24, marginRight: 10, width: 'auto', paddingLeft: 10, paddingRight: 10,
        borderColor: 'white',
        backgroundColor: '#4A9B8C',
        borderWidth: 0,
        borderRadius: 20,
        color: 'white', fontSize: 10, fontWeight: 'bold'
        , marginRight: 15, marginleft: 15, textAlign: 'center', textAlignVertical: 'center'
    },

    whitebutton_look: {
        width: 130, height: 35,
        borderColor: '#73D393',
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 20, marginLeft: 22,
        alignItems: "center", justifyContent: "center", flexDirection: 'row'
    },

    greenbutton: {
        width: 350, height: 60,
        borderColor: 'white',
        backgroundColor: '#73D393',
        borderWidth: 0,
        borderRadius: 15, FlexDirection: 'row',
        alignItems: "center", justifyContent: "center", alignSelf: "center"
    },

    whitetext: { color: 'white', fontSize: 22, fontWeight: 'bold', textAlign: 'center', textAlignVertical: 'center', marginLeft: 60, marginRight: 60 },

    titletext: { color: 'black', fontSize: 15, marginLeft: 30, fontWeight: 'bold', marginVertical: 12 },

    imagebutton: {
        width: "28%", height: 110,
        borderColor: 'black',
        backgroundColor: '#EEEEEE',
        borderWidth: 1,
        borderRadius: 15,
        alignItems: "center", justifyContent: "center",
        marginRight: "3%"
    },

    imagebuttonright: {
        width: "28%", height: 110,
        borderColor: 'black',
        backgroundColor: '#EEEEEE',
        borderWidth: 1,
        borderRadius: 15,
        alignItems: "center", justifyContent: "center",
    },
    starsize: { height: 30, width: 30, marginLeft: 20, marginRight: 10 },

    inputbar: { borderRadius: 10, width: "78%", height: 32, backgroundColor: 'white', elevation: 7, alignSelf: 'center', paddingLeft: 10, textAlignVertical: 'center' },
    inputbar2: { borderRadius: 10, width: "87%", height: 32, backgroundColor: 'white', elevation: 7, alignSelf: 'center', paddingLeft: 10, textAlignVertical: 'center', marginTop: 15 }

});



const Courserecommend = () => {
    const navigation = useNavigation();

    return (
        <ScrollView>
            <View style={styles.space}></View>
            <View style={{ flexDirection: 'row' }}>
                <Image style={styles.starsize} source={blacklocation} />
                <Text style={styles.inputbar}>위치 선택</Text>
            </View>
            <Text style={styles.inputbar2}>난이도 선택</Text>
            <Text style={styles.inputbar2}>러닝 목표 선택</Text>
            <View style={{ borderRadius: 15, width: "90%", height: 'auto', backgroundColor: 'white', elevation: 7, alignSelf: 'center', marginTop: 30, paddingBottom: 15 }}>
                <TouchableOpacity style={{ borderRadius: 15, width: "90%", height: 'auto', backgroundColor: 'white', elevation: 7, alignSelf: 'center', marginTop: 20 }} onPress={() => navigation.navigate('Reviewed')}>
                    <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                        <Image
                            style={{ width: 40, height: 40, marginLeft: 20, marginTop: 15 }}
                            source={mapview}
                        />
                        <View>
                            <View style={{ flexDirection: 'row', marginTop: 15, marginLeft: 5 }}>

                                <Text style={{ color: 'black', fontSize: 16 }}>문학산 등산로</Text>

                                <View style={{ flexWrap: 'wrap', flexDirection: 'row', alignSelf: 'center', marginLeft: 50 }}>
                                    <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginRight: 7, marginTop: 3 }}>
                                        <Image
                                            style={{ width: 12, alignSelf: 'flex-end', height: 12, marginRight: 3 }}
                                            source={location}
                                        />
                                        <Text
                                            style={{ color: 'grey', fontSize: 8 }}
                                        >7.5KM</Text>
                                    </View>
                                    <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginRight: 12, marginTop: 3 }}>
                                        <Image
                                            style={{ width: 12, alignSelf: 'flex-end', height: 12, marginRight: 3 }}
                                            source={time}
                                        />
                                        <Text
                                            style={{ color: 'grey', fontSize: 8 }}
                                        >1시간 이상</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }}>
                                <Text
                                    style={{ color: 'grey', fontSize: 12, marginLeft: 5 }}
                                >인천 미추홀구</Text>
                                <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginRight: 12 }}>


                                    <Text
                                        style={{ textAlign: 'center', textAlignVertical: 'center', width: 32, height: 20, color: '#E06464', fontSize: 9, backgroundColor: '#F3CFCF', borderRadius: 20 }}
                                    >어려움</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <Text style={{ marginLeft: 22, marginRight: 22, color: 'black', marginTop: 5 }}>산을 따라서 달리는 하드코어 러닝 코스입니다.
                        숙련자만 달리시길 권장드립니다.
                    </Text>
                    <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginTop: 5 }}>

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
                    <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginLeft: 22, marginTop: 10, marginBottom: 10 }}>
                        <Text style={styles.greensharptext}># 산</Text>
                        <Text style={styles.greensharptext}># 경사 높음</Text>
                        <Text style={styles.greensharptext}># 계단 있음</Text>
                    </View>


                </TouchableOpacity>
                <View style={{ borderRadius: 15, width: "90%", height: 'auto', backgroundColor: 'white', elevation: 7, alignSelf: 'center', marginTop: 20 }}>
                    <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                        <Image
                            style={{ width: 40, height: 40, marginLeft: 20, marginTop: 15 }}
                            source={mapview}
                        />
                        <View>
                            <View style={{ flexDirection: 'row', marginTop: 15, marginLeft: 5 }}>

                                <Text style={{ color: 'black', fontSize: 16 }}>문학산 등산로</Text>

                                <View style={{ flexWrap: 'wrap', flexDirection: 'row', alignSelf: 'center', marginLeft: 50 }}>
                                    <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginRight: 7, marginTop: 3 }}>
                                        <Image
                                            style={{ width: 12, alignSelf: 'flex-end', height: 12, marginRight: 3 }}
                                            source={location}
                                        />
                                        <Text
                                            style={{ color: 'grey', fontSize: 8 }}
                                        >7.5KM</Text>
                                    </View>
                                    <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginRight: 12, marginTop: 3 }}>
                                        <Image
                                            style={{ width: 12, alignSelf: 'flex-end', height: 12, marginRight: 3 }}
                                            source={time}
                                        />
                                        <Text
                                            style={{ color: 'grey', fontSize: 8 }}
                                        >1시간 이상</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }}>
                                <Text
                                    style={{ color: 'grey', fontSize: 12, marginLeft: 5 }}
                                >인천 미추홀구</Text>
                                <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginRight: 12 }}>


                                    <Text
                                        style={{ textAlign: 'center', textAlignVertical: 'center', width: 32, height: 20, color: '#E06464', fontSize: 9, backgroundColor: '#F3CFCF', borderRadius: 20 }}
                                    >어려움</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <Text style={{ marginLeft: 22, marginRight: 22, color: 'black', marginTop: 5 }}>산을 따라서 달리는 하드코어 러닝 코스입니다.
                        숙련자만 달리시길 권장드립니다.
                    </Text>
                    <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginTop: 5 }}>

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
                    <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginLeft: 22, marginTop: 10, marginBottom: 10 }}>
                        <Text style={styles.greensharptext}># 산</Text>
                        <Text style={styles.greensharptext}># 경사 높음</Text>
                        <Text style={styles.greensharptext}># 계단 있음</Text>
                    </View>


                </View>
                <View style={{ borderRadius: 15, width: "90%", height: 'auto', backgroundColor: 'white', elevation: 7, alignSelf: 'center', marginTop: 20 }}>
                    <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                        <Image
                            style={{ width: 40, height: 40, marginLeft: 20, marginTop: 15 }}
                            source={mapview}
                        />
                        <View>
                            <View style={{ flexDirection: 'row', marginTop: 15, marginLeft: 5 }}>

                                <Text style={{ color: 'black', fontSize: 16 }}>문학산 등산로</Text>

                                <View style={{ flexWrap: 'wrap', flexDirection: 'row', alignSelf: 'center', marginLeft: 50 }}>
                                    <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginRight: 7, marginTop: 3 }}>
                                        <Image
                                            style={{ width: 12, alignSelf: 'flex-end', height: 12, marginRight: 3 }}
                                            source={location}
                                        />
                                        <Text
                                            style={{ color: 'grey', fontSize: 8 }}
                                        >7.5KM</Text>
                                    </View>
                                    <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginRight: 12, marginTop: 3 }}>
                                        <Image
                                            style={{ width: 12, alignSelf: 'flex-end', height: 12, marginRight: 3 }}
                                            source={time}
                                        />
                                        <Text
                                            style={{ color: 'grey', fontSize: 8 }}
                                        >1시간 이상</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }}>
                                <Text
                                    style={{ color: 'grey', fontSize: 12, marginLeft: 5 }}
                                >인천 미추홀구</Text>
                                <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginRight: 12 }}>


                                    <Text
                                        style={{ textAlign: 'center', textAlignVertical: 'center', width: 32, height: 20, color: '#E06464', fontSize: 9, backgroundColor: '#F3CFCF', borderRadius: 20 }}
                                    >어려움</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <Text style={{ marginLeft: 22, marginRight: 22, color: 'black', marginTop: 5 }}>산을 따라서 달리는 하드코어 러닝 코스입니다.
                        숙련자만 달리시길 권장드립니다.
                    </Text>
                    <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginTop: 5 }}>

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
                    <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginLeft: 22, marginTop: 10, marginBottom: 10 }}>
                        <Text style={styles.greensharptext}># 산</Text>
                        <Text style={styles.greensharptext}># 경사 높음</Text>
                        <Text style={styles.greensharptext}># 계단 있음</Text>
                    </View>


                </View>
                <View style={{ borderRadius: 15, width: "90%", height: 'auto', backgroundColor: 'white', elevation: 7, alignSelf: 'center', marginTop: 20 }}>
                    <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                        <Image
                            style={{ width: 40, height: 40, marginLeft: 20, marginTop: 15 }}
                            source={mapview}
                        />
                        <View>
                            <View style={{ flexDirection: 'row', marginTop: 15, marginLeft: 5 }}>

                                <Text style={{ color: 'black', fontSize: 16 }}>문학산 등산로</Text>

                                <View style={{ flexWrap: 'wrap', flexDirection: 'row', alignSelf: 'center', marginLeft: 50 }}>
                                    <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginRight: 7, marginTop: 3 }}>
                                        <Image
                                            style={{ width: 12, alignSelf: 'flex-end', height: 12, marginRight: 3 }}
                                            source={location}
                                        />
                                        <Text
                                            style={{ color: 'grey', fontSize: 8 }}
                                        >7.5KM</Text>
                                    </View>
                                    <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginRight: 12, marginTop: 3 }}>
                                        <Image
                                            style={{ width: 12, alignSelf: 'flex-end', height: 12, marginRight: 3 }}
                                            source={time}
                                        />
                                        <Text
                                            style={{ color: 'grey', fontSize: 8 }}
                                        >1시간 이상</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }}>
                                <Text
                                    style={{ color: 'grey', fontSize: 12, marginLeft: 5 }}
                                >인천 미추홀구</Text>
                                <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginRight: 12 }}>


                                    <Text
                                        style={{ textAlign: 'center', textAlignVertical: 'center', width: 32, height: 20, color: '#E06464', fontSize: 9, backgroundColor: '#F3CFCF', borderRadius: 20 }}
                                    >어려움</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <Text style={{ marginLeft: 22, marginRight: 22, color: 'black', marginTop: 5 }}>산을 따라서 달리는 하드코어 러닝 코스입니다.
                        숙련자만 달리시길 권장드립니다.
                    </Text>
                    <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginTop: 5 }}>

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
                    <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginLeft: 22, marginTop: 10, marginBottom: 10 }}>
                        <Text style={styles.greensharptext}># 산</Text>
                        <Text style={styles.greensharptext}># 경사 높음</Text>
                        <Text style={styles.greensharptext}># 계단 있음</Text>
                    </View>


                </View>
            </View>

        </ScrollView>
    );
}

export default Courserecommend;
