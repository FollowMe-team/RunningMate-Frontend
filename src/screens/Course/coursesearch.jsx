
import React, { useState } from 'react';
import { TextInput, ScrollView, TouchableOpacity, StyleSheet, View, Text, Alert, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';

import blacklocation from '../../assets/images/Course/blacklocation.png';
import location from '../../assets/images/Course/location.png';
import time from '../../assets/images/Course/time.png';
import star from '../../assets/images/Course/star.png';
import runner from '../../assets/images/Course/runner.png';
import mapview from '../../assets/images/Course/mapforcourseview.png';
import Qmark from '../../assets/images/Course/Qmark.png';


const styles = StyleSheet.create({
    space: { height: 15 },
    space2: { height: 10 },
    space3: { height: 5 },

    greensharptext: {
        height: 24, marginRight: 10, width: 'auto', paddingLeft: 10, paddingRight: 10,
        borderColor: 'white',
        backgroundColor: '#4A9B8C',
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
        alignItems: "center", justifyContent: "center", alignSelf: "center",
        marginVertical: 20
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
    inputbarsearch: { borderRadius: 10, width: "87%", height: 40, backgroundColor: 'white', elevation: 7, alignSelf: 'center', paddingLeft: 10, marginTop: 15, flexDirection: 'row' }

});



const Coursesearch = ({ route }) => {
    const navigation = useNavigation();
    const [selecteddistacneButton, setSelecteddistanceButton] = useState([]);
    const [selectedelevationButton, setSelectedelevationButton] = useState([]);
    const [selectedenvironmentButton, setSelectedenvironmentButton] = useState([]);
    const [selectedoptionmentButton, setSelectedoptionButton] = useState([]);
    const [word, setword] = useState('');

    const selectedLocation = route.params?.selectedLocation || {
        address: '주소를 검색해주세요',
        latitude: null,
        longitude: null
    };
    const distance = [
        { id: 0, label: '# 3KM 미만', value: 'UNDER_3KM' },
        { id: 1, label: '# 3~5KM', value: 'BETWEEN_3KM_AND_5KM' },
        { id: 2, label: '# 5~10KM', value: 'BETWEEN_5KM_AND_10KM' },
        { id: 3, label: '# 10KM 이상', value: 'UPPER_10KM' }
    ];

    const elevations = [
        { id: 0, label: '# 평지', value: 'GRADIENT_NONE' },
        { id: 1, label: '# 약함', value: 'GRADIENT_LOW' },
        { id: 2, label: '# 중간', value: 'GRADIENT_MIDDLE' },
        { id: 3, label: '# 강함', value: 'GRADIENT_HIGH' }
    ];
    const environment = [
        { id: 0, label: '# 숲길', value: 'FOREST' },
        { id: 1, label: '# 강변', value: 'RIVERSIDE' },
        { id: 2, label: '# 호숫가', value: 'LAKESIDE' },
        { id: 3, label: '# 산길', value: 'MOUNTAIN' },
        { id: 4, label: '# 해변', value: 'SEASIDE' },
        { id: 5, label: '# 도심', value: 'CITYSCAPE' },
        { id: 6, label: '# 공원', value: 'PARK' },
        { id: 7, label: '# 트랙', value: 'TRACK' },
        { id: 8, label: '# 캠퍼스', value: 'CAMPUS' },
        { id: 9, label: '# 트레일', value: 'TRAIL' }
    ];

    const option = [
        { id: 0, label: '# 강아지 산책 가능', value: 'DOG_WALKABLE' },
        { id: 1, label: '# 자전거 사용 가능', value: 'BICYCLE_WALKABLE' },
        { id: 2, label: '# 유모차 산책 가능', value: 'BABY_WALKABLE' },
    ];

    const [Leveldata, setLevel] = useState('');
    const Leveldatas = [
        { label: "쉬움", value: 'EASY' },
        { label: "보통", value: 'NORMAL' },
        { label: "어려움", value: 'HARD' }
    ]


    const handledistanceButtonPress = (button) => {
        setSelecteddistanceButton(prev => {
            // 이미 선택된 버튼이면 제거, 아니면 추가
            const isAlreadySelected = prev.some(item => item.id === button.id);

            if (isAlreadySelected) {
                return prev.filter(item => item.id !== button.id);
            } else {
                return [...prev, {
                    id: button.id,
                    label: button.label,
                    value: button.value
                }];
            }
        });
    };

    const handleelevationButtonPress = (button) => {
        setSelectedelevationButton(prev => {
            // 이미 선택된 버튼이면 제거, 아니면 추가
            const isAlreadySelected = prev.some(item => item.id === button.id);

            if (isAlreadySelected) {
                return prev.filter(item => item.id !== button.id);
            } else {
                return [...prev, {
                    id: button.id,
                    label: button.label,
                    value: button.value
                }];
            }
        });
    };
    const handleenvironmentButtonPress = (button) => {
        setSelectedenvironmentButton(prev => {
            // 이미 선택된 버튼이면 제거, 아니면 추가
            const isAlreadySelected = prev.some(item => item.id === button.id);

            if (isAlreadySelected) {
                return prev.filter(item => item.id !== button.id);
            } else {
                return [...prev, {
                    id: button.id,
                    label: button.label,
                    value: button.value
                }];
            }
        });
    };
    const handleoptionButtonPress = (button) => {
        setSelectedoptionButton(prev => {
            // 이미 선택된 버튼이면 제거, 아니면 추가
            const isAlreadySelected = prev.some(item => item.id === button.id);

            if (isAlreadySelected) {
                return prev.filter(item => item.id !== button.id);
            } else {
                return [...prev, {
                    id: button.id,
                    label: button.label,
                    value: button.value
                }];
            }
        });
    };
    return (
        <ScrollView>
            <View style={styles.inputbarsearch}>
                <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => navigation.navigate('Coursesearchmaplist')}>
                    <Image style={{ width: 20, height: 20, alignSelf: 'center', marginRight: 5 }} source={Qmark} />
                </TouchableOpacity>
                <TextInput onChangeText={text => setword(text)} style={{ textAlignVertical: 'center' } }>코스명 또는 지역명</TextInput>
            </View>

            <View style={styles.space}></View>
            <View style={{ flexDirection: 'row', marginLeft: 20 }}>
                <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold', marginRight: 8, textAlignVertical: 'center' }}>
                    상세 검색
                </Text>
                <Text style={{ fontSize: 10, textAlignVertical: 'center', marginTop: 2 }}>
                    ·  미선택 시 전체 검색
                </Text>
            </View>
            <View style={styles.space}></View>
            <TouchableOpacity onPress={() => navigation.navigate('SearchLocation')}>
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
                    }}

                    placeholderStyle={{ fontSize: 14, color: 'grey', marginLeft: 3 }} // 글자색 수정
                    itemTextStyle={{ fontSize: 14, color: 'grey' }} // 드롭다운 리스트 글자색 수정
                    selectedTextStyle={{ fontSize: 14, color: 'grey', marginLeft: 3 }} // 선택된 항목 글자색 수정
                />
            </View>
            <View style={styles.space}></View>
            <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold', marginLeft: 20, textAlignVertical: 'center' }}>
                거리
            </Text>
            <View style={styles.space3}></View>
            <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginLeft: 22 }}>
                {distance.map((button) => (
                    <TouchableOpacity
                        key={button.id}

                        onPress={() => handledistanceButtonPress(button)}
                    >
                        <Text
                            style={[
                                styles.whitesharptext,
                                // 선택된 버튼일 경우 텍스트 색상 변경
                                selecteddistacneButton.some(item => item.id === button.id) && styles.greensharptext
                            ]}
                        >
                            {button.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.space2}></View>
            <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold', marginLeft: 20, textAlignVertical: 'center' }}>
                경사
            </Text>
            <View style={styles.space3}></View>
            <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginLeft: 22 }}>
                {elevations.map((button) => (
                    <TouchableOpacity
                        key={button.id}

                        onPress={() => handleelevationButtonPress(button)}
                    >
                        <Text
                            style={[
                                styles.whitesharptext,
                                // 선택된 버튼일 경우 텍스트 색상 변경
                                selectedelevationButton.some(item => item.id === button.id) && styles.greensharptext
                            ]}
                        >
                            {button.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.space2}></View>
            <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold', marginLeft: 20, textAlignVertical: 'center' }}>
                주변 환경
            </Text>
            <View style={styles.space2}></View>
            <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginLeft: 22 }}>
                {environment.map((button) => (
                    <TouchableOpacity
                        key={button.id}

                        onPress={() => handleenvironmentButtonPress(button)}
                    >
                        <Text
                            style={[
                                styles.whitesharptext,
                                // 선택된 버튼일 경우 텍스트 색상 변경
                                selectedenvironmentButton.some(item => item.id === button.id) && styles.greensharptext
                            ]}
                        >
                            {button.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.space2}></View>
            <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold', marginLeft: 20, textAlignVertical: 'center' }}>
                옵션
            </Text>
            <View style={styles.space3}></View>
            <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginLeft: 22 }}>
                {option.map((button) => (
                    <TouchableOpacity
                        key={button.id}

                        onPress={() => handleoptionButtonPress(button)}
                    >
                        <Text
                            style={[
                                styles.whitesharptext,
                                // 선택된 버튼일 경우 텍스트 색상 변경
                                selectedoptionmentButton.some(item => item.id === button.id) && styles.greensharptext
                            ]}
                        >
                            {button.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Coursesearchmaplist', {
                selectedDistance: selecteddistacneButton,
                selectedElevation: selectedelevationButton,
                selectedEnvironment: selectedenvironmentButton,
                selectedOptions: selectedoptionmentButton,
                selectedLocation: selectedLocation,
                selectedLevel: Leveldata,
                word : word
            })}
                style={styles.greenbutton}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.whitetext}>
                        코스 검색</Text>
                </View>
            </TouchableOpacity>
        </ScrollView >
    );
}

export default Coursesearch
