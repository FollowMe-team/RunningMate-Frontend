
import React, { useCallback, useMemo, useRef, useEffect, useState } from 'react';
import { TextInput, StyleSheet, TouchableOpacity, View, Text, Alert, Pressable, Image, ScrollView, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import mapview from '../../assets/images/Course/mapforcourseview.png';
import whiteplus from '../../assets/images/Course/whiteplus.png';
import location from '../../assets/images/Course/location.png';
import time from '../../assets/images/Course/time.png';
import runningman from '../../assets/images/Course/runningmanforchoosebutton.png';
import yellowstar from '../../assets/images/Course/star.png';
import greystar from '../../assets/images/Course/greystar.png';
import runner from '../../assets/images/Course/runner.png';
import sprinter from '../../assets/images/Course/sprinter.png';
import profileimage from '../../assets/images/Course/profileimage.png';
import qmark from '../../assets/images/Course/Qmark.png';
import more from '../../assets/images/Course/more.png';
import examplepic from '../../assets/images/Course/marathonpic.png';
import reviewbutton from '../../assets/images/Course/reviewbutton.png';
import footprint1 from '../../assets/images/rank/footprint1.png';
import footprint2 from '../../assets/images/rank/footprint2.png';
import footprint3 from '../../assets/images/rank/footprint3.png';
import footprint4 from '../../assets/images/rank/footprint4.png';
import footprint5 from '../../assets/images/rank/footprint5.png';
import footprint6 from '../../assets/images/rank/footprint6.png';
import ironlegsbadge from '../../assets/images/rank/iron-legs-badge.png';
import joggerbadge from '../../assets/images/rank/jogger-badge.png';
import marathonerbadge from '../../assets/images/rank/marathoner-badge.png';
import racerbadge from '../../assets/images/rank/racer-badge.png';
import runnerbadge from '../../assets/images/rank/runner-badge.png';
import speeddemonbadge from '../../assets/images/rank/speed-demon-badge.png';
import sprinterbadge from '../../assets/images/rank/sprinter-badge.png';
import ultrarunnerbadge from '../../assets/images/rank/ultra-runner-badge.png';


const styles = StyleSheet.create({
    space: { height: 15 },

    mapname: { fontSize: 18, color: '#A8A5AF', alignSelf: 'center' },


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
});



const Course_basic = ({ data }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.smallboxlist2}>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => navigation.navigate('Othersprofile_notteam', {id:data.writer.id})}>

                    <Image
                        style={{ borderRadius: 21, borderWidth: 1, borderColor: 'grey', width: 42, height: 42, alignSelf: 'center', marginLeft: 10, marginRight: 5, marginTop: 7 }}
                        source={data.writer.profileImageUrl && data.writer.profileImageUrl !== null
                            ? { uri: data.writer.profileImageUrl }
                            : profileimage} />
                </TouchableOpacity>
                <View style={{ justifyContent: 'center', width: "84%" }}>
                    <View style={{ flexWrap: 'wrap', justifyContent: 'space-between' }}>
                        <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                                <Text style={{ color: 'black', fontSize: 16 }}>
                                    {data.writer.nickname}</Text>
                                {data.writer.ranking === 'IRON_LEGS' &&
                                    <Image
                                        style={{ width: 50, height: 18, alignSelf: 'center', marginLeft: 5 }}
                                        source={ironlegsbadge}
                                    />
                                }
                                {data.writer.ranking === 'JOGGER' &&
                                    <Image
                                        style={{ width: 50, height: 18, alignSelf: 'center', marginLeft: 5 }}
                                        source={joggerbadge}
                                    />
                                }
                                {data.writer.ranking === 'MARATHONER' &&
                                    <Image
                                        style={{ width: 50, height: 18, alignSelf: 'center', marginLeft: 5 }}
                                        source={marathonerbadge}
                                    />
                                }
                                {data.writer.ranking === 'RACER' &&
                                    <Image
                                        style={{ width: 50, height: 18, alignSelf: 'center', marginLeft: 5 }}
                                        source={racerbadge}
                                    />
                                }
                                {data.writer.ranking === 'RUNNER' &&
                                    <Image
                                        style={{ width: 50, height: 18, alignSelf: 'center', marginLeft: 5 }}
                                        source={runnerbadge}
                                    />
                                }
                                {data.writer.ranking === 'SPEED_DEMON' &&
                                    <Image
                                        style={{ width: 55, height: 18, alignSelf: 'center', marginLeft: 5 }}
                                        source={speeddemonbadge}
                                    />
                                }
                                {data.writer.ranking === 'SPRINTER' &&
                                    <Image
                                        style={{ width: 50, height: 18, alignSelf: 'center', marginLeft: 5 }}
                                        source={sprinterbadge}
                                    />
                                }
                                {data.writer.ranking === 'ULTRA_RUNNER' &&
                                    <Image
                                        style={{ width: 55, height: 18, alignSelf: 'center', marginLeft: 5 }}
                                        source={ultrarunnerbadge}
                                    />
                                }
                                {
                                    data.writer.footPrint >= 900 ?
                                        <Image
                                            style={{ width: 16, height: 16, alignSelf: 'center', marginLeft: 5 }}
                                            source={footprint6}
                                        />
                                        : data.writer.footPrint >= 700 ?
                                            <Image
                                                style={{ width: 16, height: 16, alignSelf: 'center', marginLeft: 5 }}
                                                source={footprint5} />
                                            : data.writer.footPrint >= 500 ?
                                                <Image
                                                    style={{ width: 16, height: 16, alignSelf: 'center', marginLeft: 5 }}
                                                    source={footprint4}
                                                />
                                                : data.writer.footPrint >= 300 ?
                                                    <Image
                                                        style={{ width: 16, height: 16, alignSelf: 'center', marginLeft: 5 }}
                                                        source={footprint3}
                                                    />
                                                    : data.writer.footPrint >= 100 ?
                                                        <Image
                                                            style={{ width: 16, height: 16, alignSelf: 'center', marginLeft: 5 }}
                                                            source={footprint2}
                                                        />
                                                        : <Image
                                                            style={{ width: 16, height: 16, alignSelf: 'center', marginLeft: 5 }}
                                                            source={footprint1}
                                                        />
                                }
                                <Text style={{ color: '#A8A5AF', fontSize: 9, marginLeft: 5, verticalAlign: 'middle' }}>
                                    {data.createdAt}</Text>
                            </View>
                            <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                                <Image
                                    style={{ width: 10, height: 2.5, alignSelf: 'flex-end', marginRight: 15, marginTop: 5 }}
                                    source={more}
                                />
                            </View>
                        </View>
                        <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 3, marginTop: 3 }}>
                            <Image style={styles.starsize} source={data.rating > 0 ? yellowstar : greystar} />
                            <Image style={styles.starsize} source={data.rating > 1 ? yellowstar : greystar} />
                            <Image style={styles.starsize} source={data.rating > 2 ? yellowstar : greystar} />
                            <Image style={styles.starsize} source={data.rating > 3 ? yellowstar : greystar} />
                            <Image style={styles.starsize} source={data.rating > 4 ? yellowstar : greystar} />
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }}>
                <Text
                    style={{ color: 'grey', fontSize: 10, textAlignVertical: 'center', marginLeft: 10, marginBottom: 5, marginTop: 3, width: '80%' }}
                >{data.content}</Text>
                {
                    data.images.map((review) => (
                        <Image style={{ width: 200, height: 200, marginLeft: 10, marginBottom: 13, marginTop: 7 }} source={review.imageUrl && review.imageUrl !== null
                            ? { uri: review.imageUrl }
                            : examplepic} />

                    ))
                }


            </View>
        </View>

    );
}

export default Course_basic;