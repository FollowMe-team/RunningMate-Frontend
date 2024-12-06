import React from 'react';
import { TextInput, ScrollView, TouchableOpacity, StyleSheet, View, Text, Alert, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import blacklocation from '../../assets/images/Course/blacklocation.png';
import location from '../../assets/images/Course/location.png';
import time from '../../assets/images/Course/time.png';
import star from '../../assets/images/Course/star.png';
import runner from '../../assets/images/Course/runner.png';
import mapview from '../../assets/images/Course/mapforcourseview.png';
import Qmark from '../../assets/images/Course/Qmark.png';
import subscribe from '../../assets/images/Course/subscribe.png';
import subscribed from '../../assets/images/Course/subscribed.png';

import Courses from '../../components/Course/Courses';

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
        width: '87%', height: 40,
        borderColor: 'white',
        backgroundColor: '#73D393',
        borderWidth: 0,
        borderRadius: 15, FlexDirection: 'row',
        alignItems: "center", justifyContent: "center", alignSelf: "center"
    },

    whitetext: { color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center', textAlignVertical: 'center', marginLeft: 60, marginRight: 60 },

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
    inputbarsearch: { borderRadius: 10, width: "87%", height: 40, backgroundColor: 'white', elevation: 7, alignSelf: 'center', paddingLeft: 10, marginTop: 15, flexDirection: 'row', marginBottom: 10 }

});

const datas = {
    name: '문학산 등산로',
    distance: '7.5KM',
    time: '1시간 이상',
    location: '인천 미추홀구',
    level: '어려움',
    discription: '산을 따라서 달리는 하드코어 러닝 코스입니다. 숙련자만 하길 권장드립니다.',
    star: '4.5',
    runners: '1000명',
    options : ['#산', '#숲', '계단 있음']
}

const Coursesearchmaplist = () => {
    const navigation = useNavigation();
    return (
        <ScrollView>
            <TouchableOpacity style={{ alignSelf: 'center', flexDirection: 'row' }} onPress={() => navigation.navigate('Coursesearch')}>
                <View style={styles.inputbarsearch}>
                    <Image style={{ width: 20, height: 20, alignSelf: 'center', marginRight: 5 }} source={Qmark} />

                    <Text style={{ textAlignVertical: 'center' }}>코스명 또는 지역명</Text>

                </View>
            </TouchableOpacity>
            <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginLeft: 30 }}>
                <Text style={styles.whitesharptext}># 3KM 미만</Text>
                <Text style={styles.whitesharptext}># 숲길</Text>
            </View>
            <View style={{ borderRadius: 15, width: "90%", height: 'auto', backgroundColor: 'white', elevation: 7, alignSelf: 'center', marginTop: 10, paddingBottom: 15 }}>
                <Courses data={datas}/>
                <Courses data={datas}/>
                <Courses data={datas}/>
                <Courses data={datas}/>
            </View>

        </ScrollView>
    );
}

export default Coursesearchmaplist;
