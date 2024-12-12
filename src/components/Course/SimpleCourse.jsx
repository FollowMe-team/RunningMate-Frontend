
import React, { useState, useEffect } from 'react';
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
import { BookCourse, unBookCourse } from '../../utils/courseapi';

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
        height: 24, width: 'auto', paddingLeft: 10, paddingRight: 10, marginBottom: 5,
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
        handlebookToggle(data.id, data.bookmarked)
    }

    const handledetail = () => {
        const newDetail = !Isdetail;
        setIsdetail(newDetail);
    }
    const handlebookToggle = async (id, isBooked) => {
        let result;
        if (isBooked) {
            result = await unBookCourse(id);
        } else {
            result = await BookCourse(id);
        }
        data.bookmarked = !isBooked
        prevState =>
            prevState.map(data =>
                data.id === id ? { ...user, bookmarked: !bookmarked } : data,
            )
    };
    const ids = data.id;
    return (
        <TouchableOpacity onPress={handledetail}>

            {Isdetail === false ?
                <View style={styles.smallbox}>
                    <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                            <Text style={{ color: 'black', fontSize: 16, marginLeft: 22 }}>{data.name}</Text>
                            <TouchableOpacity onPress={handleFollow}>
                                <View>
                                    <Image
                                        style={{ width: 18, height: 18, marginLeft: 5 }}
                                        source={isFollowing === true ? subscribed : subscribe}
                                    /></View></TouchableOpacity>
                        </View>
                        <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                            <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginRight: 7, marginTop: 3 }}>
                                <Image
                                    style={{ width: 12, alignSelf: 'flex-end', height: 12, marginRight: 3 }}
                                    source={location}
                                />
                                <Text
                                    style={{ color: 'grey', fontSize: 8 }}
                                >{data.distance}KM</Text>
                            </View>
                            <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginRight: 12, marginTop: 3 }}>
                                <Image
                                    style={{ width: 12, alignSelf: 'flex-end', height: 12, marginRight: 3 }}
                                    source={time}
                                />
                                <Text
                                    style={{ color: 'grey', fontSize: 8 }}
                                >{data.duration}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }}>
                        <Text
                            style={{ color: 'grey', fontSize: 12, marginLeft: 22 }}
                        >{data.location}</Text>
                        <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginRight: 12 }}>

                            <Text
                                style={{ color: 'grey', fontSize: 10, marginRight: 15, textAlignVertical: 'center' }}
                            >{data.distance}KM</Text>
                            <Text
                                style={[data.difficulty === '쉬움' && styles.lowlevel,
                                data.difficulty === '보통' && styles.middlelevel,
                                data.difficulty === '어려움' && styles.highlevel,
                                data.status === '승인 완료' && styles.lowlevel,
                                data.status === '승인 대기중' && styles.middlelevel,
                                data.status === '승인 거부' && styles.highlevel,
                                ]}
                            >{data.difficulty}</Text>
                        </View>
                    </View>
                </View>
                :
                <View style={styles.smallbox_choosed}>
                    <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                            <Text style={{ color: 'black', fontSize: 16, marginLeft: 22 }}>{data.name}</Text>
                            <TouchableOpacity onPress={handleFollow}>
                                <View>
                                    <Image
                                        style={{ width: 18, height: 18, marginLeft: 5 }}
                                        source={isFollowing === true ? subscribed : subscribe}
                                    /></View></TouchableOpacity>
                        </View>
                        <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                            <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginRight: 7, marginTop: 3 }}>
                                <Image
                                    style={{ width: 12, alignSelf: 'flex-end', height: 12, marginRight: 3 }}
                                    source={location}
                                />
                                <Text
                                    style={{ color: 'grey', fontSize: 8 }}
                                >{data.distance}KM</Text>
                            </View>
                            <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginRight: 12, marginTop: 3 }}>
                                <Image
                                    style={{ width: 12, alignSelf: 'flex-end', height: 12, marginRight: 3 }}
                                    source={time}
                                />
                                <Text
                                    style={{ color: 'grey', fontSize: 8 }}
                                >{data.duration}KM</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between', marginBottom: -5 }}>
                        <Text
                            style={{ color: 'grey', fontSize: 12, marginLeft: 22 }}
                        >{data.location}</Text>
                        <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginRight: 12 }}>

                            <Text
                                style={{ color: 'grey', fontSize: 10, marginRight: 13, textAlignVertical: 'center' }}
                            >{data.distance}KM</Text>
                            <Text
                                style={[data.difficulty === '쉬움' && styles.lowlevel,
                                data.difficulty === '보통' && styles.middlelevel,
                                data.difficulty === '어려움' && styles.highlevel,
                                data.difficulty === '승인 완료' && styles.lowlevel,
                                data.difficulty === '승인 대기중' && styles.middlelevel,
                                data.difficulty === '승인 거부' && styles.highlevel,
                                ]}
                            >{data.difficulty}</Text>
                        </View>
                    </View>
                    <Text style={{ marginLeft: 22, marginRight: 22, color: 'black' }}>
                        {data.description}
                    </Text>
                    <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>

                        <View style={{ marginLeft: 22, marginRight: 15, flexWrap: 'wrap', flexDirection: 'row' }}>
                            <Image
                                style={{ width: 16, height: 16, marginRight: 7 }}
                                source={star}
                            />
                            <Text style={{ fontSize: 12 }}>
                                {data.rating}
                            </Text>
                        </View>
                        <View style={{ flexWrap: 'wrap', flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                                style={{ width: 14, height: 14, marginRight: 7 }}
                                source={runner}
                            />
                            <Text style={{ fontSize: 12 }}>
                                {data.runningCount}회
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginLeft: 22, marginBottom: -5 }}>
                        {optiondata && optiondata.map((text) => (
                            <Text style={styles.greensharptext}># {text}</Text>

                        ))}
                    </View>
                    <Image
                        style={{ width: 276, height: 160, marginRight: 7, alignSelf: 'center' }}
                        source={mapview}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Reviewed', {id : data.id})}>

                            <View style={styles.whitebutton_look}>
                                <Text style={styles.greentext_look}>
                                    상세 보기
                                </Text>
                                <Image
                                    style={{ width: 14, height: 14 }}
                                    source={greenQmark}
                                />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Runningtime', {data : data})}>

                            <View style={styles.greenbutton_run}>
                                <Text style={styles.whitetext_run}>
                                    달리기
                                </Text>
                                <Image
                                    style={{ width: 14, height: 14 }}
                                    source={runningman}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </TouchableOpacity>
    );
}

export default Course_basic;
