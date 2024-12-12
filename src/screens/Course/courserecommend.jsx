
import React, { useState, useEffect } from 'react';
import { TextInput, TouchableOpacity, StyleSheet, View, Text, Alert, Pressable, Image, ImageBackground, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';

import blacklocation from '../../assets/images/Course/blacklocation.png';
import location from '../../assets/images/Course/location.png';
import time from '../../assets/images/Course/time.png';
import star from '../../assets/images/Course/star.png';
import runner from '../../assets/images/Course/runner.png';
import mapview from '../../assets/images/Course/mapforcourseview.png';

import Courses from '../../components/Course/Courses';
import { getCourseRecommend, getbasicCourseRecommend } from '../../utils/courseapi';
import Recommendcourses from '../../components/Course/recommentcourses';


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
        width: 350, height: 45,
        borderColor: 'white',
        backgroundColor: '#73D393',
        borderWidth: 0, marginTop: 15,
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
    starsize: { height: 30, width: 30, marginLeft: 20, marginRight: 10, marginTop: 5 },

    inputbar: { borderRadius: 10, width: "78%", height: 40, backgroundColor: 'white', elevation: 7, alignSelf: 'center', paddingLeft: 10, textAlignVertical: 'center', fontSize: 14, color: 'grey' },
    inputbar2: { borderRadius: 10, width: "87%", height: 32, backgroundColor: 'white', elevation: 7, alignSelf: 'center', paddingLeft: 10, textAlignVertical: 'center', marginTop: 15, justifyContent: 'center' },

});

const Courserecommend = ({ route }) => {
    const navigation = useNavigation();
    const [Leveldata, setLevel] = useState();
    const [Goaldata, setGoal] = useState();
    const [Latitude, setLatitude] = useState();
    const [Longitude, setLongitude] = useState();
    const [recommendedCourse, setrecommendedCourse] = useState([]);

    const Goaldatas = [
        { label: "체중 감량", value: 'WEIGHT_LOSS' },
        { label: "속도 증가", value: 'ENDURANCE' },
        { label: "지구력 상승", value: 'SPEED' }
    ]
    const Leveldatas = [
        { label: "쉬움", value: 'EASY' },
        { label: "보통", value: 'NORMAL' },
        { label: "어려움", value: 'HARD' }
    ]
    const selectedLocation = route.params?.selectedLocation || {
        address: '주소를 검색해주세요',
        latitude: null,
        longitude: null
    };

    const fetchrecommenedCourse = async (params = {}) => {
        const result = await getCourseRecommend(params);
        setrecommendedCourse(result.data);
    };
    useEffect(() => {
        if (selectedLocation.latitude === null) {
            fetchrecommenedCourse();

        }
        else {
            fetchrecommenedCourse({ latitude: selectedLocation.latitude, longitude: selectedLocation.longitude })
        }
    }, [selectedLocation.latitude]);

    return (
        <ScrollView>
            <View style={styles.space}></View>
            <TouchableOpacity onPress={() => navigation.navigate('RecommendLocation')}>
                <View style={{ flexDirection: 'row' }}>
                    <Image style={styles.starsize} source={blacklocation} />
                    <Text style={styles.inputbar}>{selectedLocation.address}</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.inputbar2}>
                <Dropdown
                    data={Leveldatas}
                    labelField="label"
                    valueField="value"
                    placeholder="난이도 선택"
                    value={Leveldata}
                    onChange={item => {
                        setLevel(item.value);
                        if (Goaldata) {
                            if (selectedLocation.latitude === null) {
                                fetchrecommenedCourse({ difficulty: item.value, runningGoal: Goaldata });

                            }
                            else {
                                fetchrecommenedCourse({ latitude: selectedLocation.latitude, longitude: selectedLocation.longitude, runningGoal: Goaldata, difficulty: item.value });
                            }
                        }
                        else {
                            if (selectedLocation.latitude === null) {
                                fetchrecommenedCourse({ difficulty: item.value });

                            }
                            else {
                                fetchrecommenedCourse({ latitude: selectedLocation.latitude, longitude: selectedLocation.longitude, difficulty: item.value });

                            }
                        }
                    }}

                    placeholderStyle={{ fontSize: 14, color: 'grey', marginLeft: 3 }} // 글자색 수정
                    itemTextStyle={{ fontSize: 14, color: 'grey' }} // 드롭다운 리스트 글자색 수정
                    selectedTextStyle={{ fontSize: 14, color: 'grey', marginLeft: 3 }} // 선택된 항목 글자색 수정
                />
            </View>
            <View style={styles.inputbar2}>
                <Dropdown
                    data={Goaldatas}
                    labelField="label"
                    valueField="value"
                    placeholder="러닝 목표 선택"
                    value={Goaldata}
                    onChange={item => {
                        setGoal(item.value);
                        if (Leveldata) {
                            if (selectedLocation.latitude === null) {
                                fetchrecommenedCourse({ runningGoal: item.value, difficulty: Leveldata });

                            }
                            else {
                                fetchrecommenedCourse({ latitude: selectedLocation.latitude, longitude: selectedLocation.longitude, runningGoal: item.value, difficulty: Leveldata });

                            }
                        }
                        else {
                            if (selectedLocation.latitude === null) {
                                fetchrecommenedCourse({ runningGoal: item.value });
                            }
                            else {
                                fetchrecommenedCourse({ latitude: selectedLocation.latitude, longitude: selectedLocation.longitude, runningGoal: item.value });

                            }
                        }
                    }}

                    placeholderStyle={{ fontSize: 14, color: 'grey', marginLeft: 3 }} // 글자색 수정
                    itemTextStyle={{ fontSize: 14, color: 'grey' }} // 드롭다운 리스트 글자색 수정
                    selectedTextStyle={{ fontSize: 14, color: 'grey', marginLeft: 3 }} // 선택된 항목 글자색 수정
                />
            </View>

            <View style={{ borderRadius: 15, width: "90%", height: 'auto', backgroundColor: 'white', elevation: 7, alignSelf: 'center', marginTop: 15, paddingBottom: 15, marginBottom: 30, paddingTop: 15 }}>
                <Recommendcourses data={recommendedCourse} />
            </View>

        </ScrollView>
    );
}

export default Courserecommend;
