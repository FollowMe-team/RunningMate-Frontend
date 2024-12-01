
import React, { useState } from 'react';
import { TextInput, ScrollView, TouchableOpacity, StyleSheet, View, Text, Alert, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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
    inputbar2: { borderRadius: 10, width: "87%", height: 32, backgroundColor: 'white', elevation: 7, alignSelf: 'center', paddingLeft: 10, textAlignVertical: 'center', marginTop: 15 },
    inputbarsearch: { borderRadius: 10, width: "87%", height: 40, backgroundColor: 'white', elevation: 7, alignSelf: 'center', paddingLeft: 10, marginTop: 15, flexDirection: 'row' }

});



const Coursesearch = () => {
    const navigation = useNavigation();
    const [selecteddistacneButton, setSelecteddistanceButton] = useState(null);
    const [selectedelevationButton, setSelectedelevationButton] = useState(null);
    const [selectedenvironmentButton, setSelectedenvironmentButton] = useState(null);
    const [DogisToggled, setDogIsToggled] = useState(false);
    const [BikeisToggled, setBikeIsToggled] = useState(false);
    const [KidisToggled, setKidIsToggled] = useState(false);
    const handleDogToggle = () => {
        setDogIsToggled(!DogisToggled);
    };
    const handleBikeToggle = () => {
        setBikeIsToggled(!BikeisToggled);
    };
    const handleKidToggle = () => {
        setKidIsToggled(!KidisToggled);
    };

    const distance = [
        { id: 0, label: '# 3KM 미만' },
        { id: 1, label: '# 3~5KM' },
        { id: 2, label: '# 5~10KM' },
        { id: 3, label: '# 10KM 이상' }
    ];

    const elevations = [
        { id: 0, label: '# 평지' },
        { id: 1, label: '# 약함' },
        { id: 2, label: '# 중간' },
        { id: 3, label: '# 강함' }
    ];
    const environment = [
        { id: 0, label: '# 숲길' },
        { id: 1, label: '# 강변' },
        { id: 2, label: '# 호숫가' },
        { id: 3, label: '# 산길' },
        { id: 4, label: '# 해변' },
        { id: 5, label: '# 도심' },
        { id: 6, label: '# 공원' },
        { id: 7, label: '# 트랙' },
        { id: 8, label: '# 캠퍼스' },
        { id: 9, label: '# 트레일' }
    ];

    const handledistanceButtonPress = (buttonId) => {
        setSelecteddistanceButton(buttonId);
    };
    const handleelevationButtonPress = (buttonId) => {
        setSelectedelevationButton(buttonId);
    };
    const handleenvironmentButtonPress = (buttonId) => {
        setSelectedenvironmentButton(buttonId);
    };
    return (
        <ScrollView>
            <View style={styles.inputbarsearch}>
                <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => navigation.navigate('Coursesearchmaplist')}>
                    <Image style={{ width: 20, height: 20, alignSelf: 'center', marginRight: 5 }} source={Qmark} />
                </TouchableOpacity>
                <TextInput style={{ textAlignVertical: 'center' }}>코스명 또는 지역명</TextInput>
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
            <View style={{ flexDirection: 'row' }}>
                <Image style={styles.starsize} source={blacklocation} />
                <Text style={styles.inputbar}>위치 선택</Text>
            </View>
            <Text style={styles.inputbar2}>난이도 선택</Text>
            <View style={styles.space}></View>
            <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold', marginLeft: 20, textAlignVertical: 'center' }}>
                거리
            </Text>
            <View style={styles.space3}></View>
            <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginLeft: 22 }}>
                {distance.map((button) => (
                    <TouchableOpacity
                        key={button.id}

                        onPress={() => handledistanceButtonPress(button.id)}
                    >
                        <Text
                            style={[
                                styles.whitesharptext,
                                // 선택된 버튼일 경우 텍스트 색상 변경
                                selecteddistacneButton === button.id && styles.greensharptext
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

                        onPress={() => handleelevationButtonPress(button.id)}
                    >
                        <Text
                            style={[
                                styles.whitesharptext,
                                // 선택된 버튼일 경우 텍스트 색상 변경
                                selectedelevationButton === button.id && styles.greensharptext
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

                        onPress={() => handleenvironmentButtonPress(button.id)}
                    >
                        <Text
                            style={[
                                styles.whitesharptext,
                                // 선택된 버튼일 경우 텍스트 색상 변경
                                selectedenvironmentButton === button.id && styles.greensharptext
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
                <TouchableOpacity onPress={handleDogToggle}>
                    <Text style={[DogisToggled ? styles.greensharptext : styles.whitesharptext
                    ]}># 강아지 산책 가능</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleBikeToggle}>
            <Text style={[BikeisToggled ? styles.greensharptext : styles.whitesharptext
                    ]}># 자전거 사용 가능</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleKidToggle}>
            <Text style={[KidisToggled ? styles.greensharptext : styles.whitesharptext
                    ]}># 유모차 산책 가능</Text>
            </TouchableOpacity>
        </View>
        </ScrollView >
    );
}

export default Coursesearch
