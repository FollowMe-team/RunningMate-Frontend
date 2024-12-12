
import React, { useCallback, useMemo, useRef, useEffect, useState } from 'react';
import { TextInput, StyleSheet, TouchableOpacity, View, Text, Alert, Pressable, Image, ScrollView, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import mapview from '../../assets/images/Course/mapforcourseview.png';
import whiteplus from '../../assets/images/Course/whiteplus.png';
import location from '../../assets/images/Course/location.png';
import time from '../../assets/images/Course/time.png';
import runningman from '../../assets/images/Course/runningmanforchoosebutton.png';
import yellowstar from '../../assets/images/Course/star.png';
import runner from '../../assets/images/Course/runner.png';
import sprinter from '../../assets/images/Course/sprinter.png';
import profileimage from '../../assets/images/Course/profileimage.png';
import qmark from '../../assets/images/Course/Qmark.png';
import more from '../../assets/images/Course/more.png';
import examplepic from '../../assets/images/Course/marathonpic.png';
import reviewbutton from '../../assets/images/Course/reviewbutton.png';
import Reviews from '../../components/Course/reviews';
import Crews from '../../components/Course/Crews';
import { getCourseDetail } from '../../utils/courseapi';

const styles = StyleSheet.create({
    space: { height: 15 },

    mapname: { fontSize: 18, color: '#A8A5AF', alignSelf: 'center' },
    middlelevel: { marginLeft: 35, textAlign: 'center', textAlignVertical: 'center', width: 'auto', paddingHorizontal: 5, height: 20, fontSize: 9, borderRadius: 20, backgroundColor: '#FBFF7F', color: '#A9AB35' },
    lowlevel: { marginLeft: 35, textAlign: 'center', textAlignVertical: 'center', width: 'auto', paddingHorizontal: 5, height: 20, fontSize: 9, borderRadius: 20, backgroundColor: '#CFF3D0', color: '#409E4B' },
    highlevel: {
        marginLeft: 35, textAlign: 'center', textAlignVertical: 'center', width: 'auto', paddingHorizontal: 5, height: 20, color: '#E06464', fontSize: 9, backgroundColor: '#F3CFCF', borderRadius: 20
    },

    greensharptext: {
        height: 24, marginRight: 10, width: 'auto', paddingLeft: 10, paddingRight: 10,
        borderColor: 'white',
        backgroundColor: '#4A9B8C',
        borderWidth: 0,
        borderRadius: 20,
        color: 'white', fontSize: 10, fontWeight: 'bold'
        , marginRight: 15, marginleft: 15, textAlign: 'center', textAlignVertical: 'center'
    },

    greenbutton: {
        width: 350, height: 60,
        borderColor: 'white',
        backgroundColor: '#73D393',
        borderWidth: 0,
        borderRadius: 15, FlexDirection: 'row', marginBottom: 20,
        alignItems: "center", justifyContent: "center", alignSelf: "center"
    },

    whitetext: { color: 'white', fontSize: 22, fontWeight: 'bold', textAlign: 'center', textAlignVertical: 'center', marginLeft: 60, marginRight: 60 },

    bigbox: {
        borderRadius: 15, width: 350, height: 110, backgroundColor: 'white', alignSelf: 'center',
        elevation: 5, alignItems: 'center', justifyContent: "space-around"
    },

    blacktext: { color: 'black', fontSize: 18, fontWeight: 'bold' },

    smallboxlist: {
        borderRadius: 15, width: 350, height: 55, backgroundColor: 'white', alignSelf: 'center',
        elevation: 7, marginBottom: 12, flexDirection: 'row'
    },

    smallboxlist2: {
        borderRadius: 15, width: 350, height: 'auto', backgroundColor: 'white', alignSelf: 'center',
        elevation: 7, marginBottom: 12, justifyContent: 'center'
    },

    smallbox: {
        borderRadius: 15, width: 320, height: 50, backgroundColor: '#EBEBEB', alignSelf: 'center',
        justifyContent: 'space-around', marginBottom: 5
    },

    smallbox_text: { color: '#AAA7A7', fontSize: 16, fontWeight: 'bold', textAlign: 'center', textAlignVertical: 'center' },

    starsize: { height: 13, width: 13 },

    imagebutton: {
        width: 110, height: 110,
        borderColor: 'black',
        backgroundColor: '#EEEEEE',
        borderWidth: 1,
        borderRadius: 15,
        alignItems: "center", justifyContent: "center",
        marginRight: 10
    },
    image: {
        width: 110, height: 110,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: 'black',
        backgroundColor: '#EEEEEE',
        marginRight:10,
        alignItems: "center", justifyContent: "center"
    },
});

const Reviewed = ({ data }) => {
    const navigation = useNavigation();

    return (

        <View>
            <Text style={styles.mapname}>{data.name}</Text>
            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
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
            <View style={styles.space}></View>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                <Text style={{ width: 280, marginLeft: 20, fontWeight: 'bold' }}>{data.description}</Text>

                <Text
                    style={[data.difficulty === '쉬움' && styles.lowlevel,
                    data.difficulty === '보통' && styles.middlelevel,
                    data.difficulty === '어려움' && styles.highlevel,
                    data.status === '승인 완료' && styles.lowlevel,
                    data.status === '승인 대기중' && styles.middlelevel,
                    data.status === '승인 거부' && styles.highlevel,
                    ]}
                >{data.difficulty}</Text></View>
            <View style={{ flexDirection: 'row', marginLeft: 22, marginBottom: 8, marginTop: 10 }}>
                <Image style={styles.starsize} source={yellowstar} />
                <Text style={{ marginLeft: 8, fontSize: 12, marginRight: 16 }}>{data.rating}</Text>
                <Image style={styles.starsize} source={runner} />
                <Text style={{ marginLeft: 8, fontSize: 12, marginRight: 16 }}>{data.runningCount}회</Text>
            </View>
            <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginLeft: 22, marginBottom: 10 }}>
                {data.courseOptionTypes && data.courseOptionTypes.map((text) => (
                    <Text style={styles.greensharptext}># {text}</Text>

                ))}
            </View>
            <Image
                style={{ width: '90%', height: 210, alignSelf: 'center', marginBottom: 10 }}
                source={mapview}
            />
            <View style={{ flexDirection: 'row', marginLeft: 22 }}>
                {

                    data.images.map((image) => (
                        <Image style={styles.image} source={image.imageUrl && image.imageUrl !== null
                            ? { uri: image.imageUrl }
                            : examplepic} />
                    ))
                }

            </View>
            <View style={styles.space}></View>
            <Text style={{ marginLeft: 22, marginBottom: 10 }}>
                참여 크루({data.crewCount})</Text>


            {
                data.crews.map((crew) => (
                    <Crews data={crew} />
                ))
            }
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ marginLeft: 22, marginBottom: 10 }}>
                    리뷰({data.reviewCount})</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Reviewing', { id: data.id })}>
                    <Image
                        style={{ width: 25, height: 25, alignSelf: 'center', marginBottom: 10, marginRight: 20 }}
                        source={reviewbutton}
                    />
                </TouchableOpacity>
            </View>
            {
                data.reviews.map((review) => (
                    <Reviews data={review} />

                ))
            }
        </View>
    );
}

export default Reviewed;
