import React, { useState } from 'react';
import { TextInput, TouchableOpacity, StyleSheet, View, Text, Alert, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import subscribe from '../../assets/images/Course/subscribe.png';
import location from '../../assets/images/Course/location.png';
import time from '../../assets/images/Course/time.png';
import subscribed from '../../assets/images/Course/subscribed.png'
import star from '../../assets/images/Course/star.png';
import runner from '../../assets/images/Course/runner.png';
import mapview from '../../assets/images/Course/mapforcourseview.png';
import runningman from '../../assets/images/Course/runningman.png';
import greenQmark from '../../assets/images/Course/Qmark_green.png';

import SimpleNoCourse from '../../components/Course/SimpleNoCourse';
import SimpleCourse from '../../components/Course/SimpleCourse';

const styles = StyleSheet.create({

    bigbox: {
        borderRadius: 15, width: 'auto', height: 'auto', backgroundColor: 'white', alignSelf: 'center',
        elevation: 5, alignItems: 'center', justifyContent: "space-around", paddingLeft: 15, paddingRight: 15
    },

    blacktext: { color: 'black', fontSize: 18, fontWeight: 'bold', paddingVertical: 7 },

    smallbox: {
        borderRadius: 15, width: 320, height: 50, backgroundColor: 'white', alignSelf: 'center',
        elevation: 7, justifyContent: 'space-around', marginBottom: 12
    },

    smallbox_choosed: {
        borderRadius: 15, width: 320, height: 410, backgroundColor: 'white', alignSelf: 'center',
        elevation: 7, justifyContent: 'space-around', marginBottom: 12
    },

    smallbox2: {
        borderRadius: 15, width: 320, height: 50, backgroundColor: '#EBEBEB', alignSelf: 'center',
        justifyContent: 'space-around', marginBottom: 12
    },

    smallbox_text2: { color: '#AAA7A7', fontSize: 16, fontWeight: 'bold', textAlign: 'center', textAlignVertical: 'center' },

    lowlevel: { textAlign: 'center', textAlignVertical: 'center', width: 'auto', paddingHorizontal: 5, height: 20, color: '#409E4B', fontSize: 9, backgroundColor: '#CFF3D0', borderRadius: 20 },
    middlelevel: { textAlign: 'center', textAlignVertical: 'center', width: 'auto', paddingHorizontal: 5, height: 20, color: '#A9AB35', fontSize: 9, backgroundColor: '#FBFF7F', borderRadius: 20 },
    highlevel: { textAlign: 'center', textAlignVertical: 'center', width: 'auto', paddingHorizontal: 5, height: 20, color: '#E06464', fontSize: 9, backgroundColor: '#F3CFCF', borderRadius: 20 },

    searchbox: {
        borderRadius: 10, width: 350, height: 40, backgroundColor: 'white', alignSelf: 'center',
        elevation: 5
    },

    space: { height: 15 },

    whitebutton: {
        width: 160, height: 60,
        borderColor: '#73D393',
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 15,
        alignItems: "center", justifyContent: "center"
    },

    greentext: { color: '#73D393', fontSize: 20, fontWeight: 'bold', marginRight: 30, marginBottom: 4 },

    greenbutton: {
        width: 160, height: 60,
        borderColor: 'white',
        backgroundColor: '#73D393',
        borderWidth: 0,
        borderRadius: 15, FlexDirection: 'row-reverse',
        alignItems: "center", justifyContent: "center"
    },

    whitetext: { color: 'white', fontSize: 20, fontWeight: 'bold', marginRight: 12 },

    bigbox: {
        borderRadius: 15, width: 'auto', height: 'auto', backgroundColor: 'white', alignSelf: 'center',
        elevation: 5, alignItems: 'center', justifyContent: "space-around", paddingLeft: 15, paddingRight: 15
    },

    blacktext: { color: 'black', fontSize: 18, fontWeight: 'bold', paddingVertical: 7 },


    greensharptext: {
        height: 24, marginRight: 10, width: 'auto', paddingLeft: 10, paddingRight: 10,
        borderColor: 'white',
        backgroundColor: '#73D393',
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

    greentext_look: { color: '#73D393', fontSize: 16, fontWeight: 'bold', marginRight: 12, textAlign: 'center' },

    greenbutton_run: {
        width: 130, height: 35,
        borderColor: 'white',
        backgroundColor: '#73D393',
        borderWidth: 0, marginRight: 22,
        borderRadius: 20, FlexDirection: 'row-reverse',
        alignItems: "center", justifyContent: "center", flexDirection: 'row'
    },

    whitetext_run: { color: 'white', fontSize: 16, fontWeight: 'bold', marginRight: 12, textAlign: 'center' },

});



const Course_basic = ({ data }) => {
    const navigation = useNavigation();
    const [isFollowing, setIsFollowing] = useState(data.bookmarked);
    const [Isdetail, setIsdetail] = useState(false);
    const optiondata = data.courseOptionTypes;

    const handleFollow = () => {
        const newFollow = !isFollowing;
        setIsFollowing(newFollow);
    }

    const handledetail = () => {
        const newDetail = !Isdetail;
        setIsdetail(newDetail);
    }

    return (
        <View>
            {data.length === 0 && <SimpleNoCourse />}
            {data.length > 0 &&
                data.map((course) => (
                    <SimpleCourse data={course} />
                ))
            }
        </View>
    );
}

export default Course_basic;