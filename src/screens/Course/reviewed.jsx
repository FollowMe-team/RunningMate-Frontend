
import React, { useCallback, useMemo, useRef, useEffect, useState  } from 'react';
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
        borderRadius: 15, FlexDirection: 'row',
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



const Reviewed = () => {
    const navigation = useNavigation();
 // ref
 const bottomSheetRef = useRef(null);

 // variables
 const snapPoints = ['70%'];

    return (
        <ScrollView>
            <View>
                <Text style={styles.mapname}>인천 미추홀구</Text>
                <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
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
                <View style={styles.space}></View>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                    <Text style={{ width: 280, marginLeft: 20, fontWeight: 'bold' }}>산을 따라서 달리는 하드코어 러닝 코스입니다.
                        숙련자만 시도하시길 권장드립니다.</Text>
                    <Text
                        style={{ marginLeft: 35, textAlign: 'center', textAlignVertical: 'center', width: 32, height: 20, color: '#E06464', fontSize: 9, backgroundColor: '#F3CFCF', borderRadius: 20 }}
                    >어려움</Text></View>
                <View style={{ flexDirection: 'row', marginLeft: 22, marginBottom: 8, marginTop: 10 }}>
                    <Image style={styles.starsize} source={yellowstar} />
                    <Text style={{ marginLeft: 8, fontSize: 12, marginRight: 16 }}>4.5</Text>
                    <Image style={styles.starsize} source={runner} />
                    <Text style={{ marginLeft: 8, fontSize: 12, marginRight: 16 }}>1000명</Text>
                </View>
                <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginLeft: 22, marginBottom: 10 }}>
                    <Text style={styles.greensharptext}># 산</Text>
                    <Text style={styles.greensharptext}># 경사 높음</Text>
                    <Text style={styles.greensharptext}># 계단 있음</Text>
                </View>
                <Image
                    style={{ width: '90%', height: 210, alignSelf: 'center', marginBottom: 10 }}
                    source={mapview}
                />
                <View style={{ flexDirection: 'row', marginLeft: 22 }}>
                    <View
                        style={styles.imagebutton}>
                        <Text>출발지</Text>
                        <Text>사진</Text>
                    </View>
                    <View
                        style={styles.imagebutton}>
                        <Text>도착지</Text>
                        <Text>사진</Text>
                    </View>
                    <View
                        style={styles.imagebutton}>
                        <Text>대표 이미지</Text>
                        <Text>사진</Text>
                    </View>
                </View>
                <View style={styles.space}></View>
                <Text style={{ marginLeft: 22, marginBottom: 10 }}>
                    참여 크루(1)</Text>
                <View style={styles.smallboxlist}>
                    <Image
                        style={{ width: 42, height: 42, alignSelf: 'center', marginLeft: 10, marginRight: 5 }}
                        source={profileimage}
                    />
                    <View style={{ justifyContent: 'center', width: "84%" }}>
                        <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                                <Text style={{ color: 'black', fontSize: 16 }}>
                                    FOLLOW ME</Text>
                                <Image
                                    style={{ width: 45, height: 18, alignSelf: 'center', marginLeft: 5 }}
                                    source={sprinter}
                                />
                                <Image
                                    style={{ width: 16, height: 16, alignSelf: 'center', marginLeft: 5 }}
                                    source={yellowstar}
                                />
                            </View>
                            <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                                <Image
                                    style={{ width: 20, height: 20, alignSelf: 'flex-end', marginRight: 15 }}
                                    source={qmark}
                                />
                            </View>
                        </View>
                        <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }}>
                            <Text
                                style={{ color: 'grey', fontSize: 10, textAlignVertical: 'center' }}
                            >인하대학교 컴퓨터공학과 러닝 크루입니다.</Text>
                            <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginRight: 12 }}>

                                <Text
                                    style={{ textAlign: 'center', textAlignVertical: 'center', width: 30, height: 20, color: 'grey', fontSize: 9 }}
                                >쉬움</Text>
                            </View>

                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ marginLeft: 22, marginBottom: 10 }}>
                        리뷰(999+)</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Reviewing')}>
                        <Image
                            style={{ width: 20, height: 20, marginRight: 25 }}
                            source={reviewbutton}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.smallboxlist2}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Othersprofile')}>

                            <Image
                                style={{ width: 42, height: 42, alignSelf: 'center', marginLeft: 10, marginRight: 5, marginTop: 7 }}
                                source={profileimage}
                            />
                        </TouchableOpacity>
                        <View style={{ justifyContent: 'center', width: "84%" }}>
                            <View style={{ flexWrap: 'wrap', justifyContent: 'space-between' }}>
                                <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                                        <Text style={{ color: 'black', fontSize: 16 }}>
                                            최재혁</Text>
                                        <Image
                                            style={{ width: 45, height: 18, alignSelf: 'center', marginLeft: 5 }}
                                            source={sprinter}
                                        />
                                        <Image
                                            style={{ width: 16, height: 16, alignSelf: 'center', marginLeft: 5 }}
                                            source={yellowstar}
                                        />
                                        <Text style={{ color: '#A8A5AF', fontSize: 9, marginLeft: 5, verticalAlign: 'middle' }}>
                                            1시간 전</Text>
                                    </View>
                                    <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                                        <Image
                                            style={{ width: 10, height: 2.5, alignSelf: 'flex-end', marginRight: 15, marginTop: 5 }}
                                            source={more}
                                        />
                                    </View>
                                </View>
                                <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 3, marginTop: 3 }}>
                                    <Image style={styles.starsize} source={yellowstar} />
                                    <Image style={styles.starsize} source={yellowstar} />
                                    <Image style={styles.starsize} source={yellowstar} />
                                    <Image style={styles.starsize} source={yellowstar} />
                                    <Image style={styles.starsize} source={yellowstar} />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }}>
                        <Text
                            style={{ color: 'grey', fontSize: 10, textAlignVertical: 'center', marginLeft: 10, marginBottom: 5 }}
                        >인하대학교 컴퓨터공학과 러닝 크루입니다.</Text>


                    </View>
                </View>
                <View style={styles.smallboxlist2}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image
                            style={{ width: 42, height: 42, alignSelf: 'center', marginLeft: 10, marginRight: 5, marginTop: 7 }}
                            source={profileimage}
                        />
                        <View style={{ justifyContent: 'center', width: "84%" }}>
                            <View style={{ flexWrap: 'wrap', justifyContent: 'space-between' }}>
                                <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                                        <Text style={{ color: 'black', fontSize: 16 }}>
                                            최재혁</Text>
                                        <Image
                                            style={{ width: 45, height: 18, alignSelf: 'center', marginLeft: 5 }}
                                            source={sprinter}
                                        />
                                        <Image
                                            style={{ width: 16, height: 16, alignSelf: 'center', marginLeft: 5 }}
                                            source={yellowstar}
                                        />
                                        <Text style={{ color: '#A8A5AF', fontSize: 9, marginLeft: 5, verticalAlign: 'middle' }}>
                                            1시간 전</Text>
                                    </View>
                                    <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                                        <Image
                                            style={{ width: 10, height: 2.5, alignSelf: 'flex-end', marginRight: 15, marginTop: 5 }}
                                            source={more}
                                        />
                                    </View>
                                </View>
                                <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 3, marginTop: 3 }}>
                                    <Image style={styles.starsize} source={yellowstar} />
                                    <Image style={styles.starsize} source={yellowstar} />
                                    <Image style={styles.starsize} source={yellowstar} />
                                    <Image style={styles.starsize} source={yellowstar} />
                                    <Image style={styles.starsize} source={yellowstar} />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexWrap: 'wrap', marginBottom: 3 }}>
                        <Text
                            style={{ color: 'grey', fontSize: 10, textAlignVertical: 'center', marginLeft: 10, marginBottom: 5 }}
                        >인하대학교 컴퓨터공학과 러닝 크루입니다.</Text>
                        <Image style={{ width: 200, height: 200, marginLeft: 10, marginBottom: 13, marginTop: 7 }} source={examplepic} />

                    </View>
                </View>
                <View style={styles.smallboxlist2}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image
                            style={{ width: 42, height: 42, alignSelf: 'center', marginLeft: 10, marginRight: 5, marginTop: 7 }}
                            source={profileimage}
                        />
                        <View style={{ justifyContent: 'center', width: "84%" }}>
                            <View style={{ flexWrap: 'wrap', justifyContent: 'space-between' }}>
                                <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                                        <Text style={{ color: 'black', fontSize: 16 }}>
                                            최재혁</Text>
                                        <Image
                                            style={{ width: 45, height: 18, alignSelf: 'center', marginLeft: 5 }}
                                            source={sprinter}
                                        />
                                        <Image
                                            style={{ width: 16, height: 16, alignSelf: 'center', marginLeft: 5 }}
                                            source={yellowstar}
                                        />
                                        <Text style={{ color: '#A8A5AF', fontSize: 9, marginLeft: 5, verticalAlign: 'middle' }}>
                                            1시간 전</Text>
                                    </View>
                                    <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                                        <Image
                                            style={{ width: 10, height: 2.5, alignSelf: 'flex-end', marginRight: 15, marginTop: 5 }}
                                            source={more}
                                        />
                                    </View>
                                </View>
                                <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 3, marginTop: 3 }}>
                                    <Image style={styles.starsize} source={yellowstar} />
                                    <Image style={styles.starsize} source={yellowstar} />
                                    <Image style={styles.starsize} source={yellowstar} />
                                    <Image style={styles.starsize} source={yellowstar} />
                                    <Image style={styles.starsize} source={yellowstar} />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }}>
                        <Text
                            style={{ color: 'grey', fontSize: 10, textAlignVertical: 'center', marginLeft: 10, marginBottom: 5 }}
                        >인하대학교 컴퓨터공학과 러닝 크루입니다.</Text>


                    </View>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Reviewlist')}>
                    <Text style={{
                        height: 'auto', width: 65, fontSize: 10,
                        borderRadius: 15, color: 'black', backgroundColor: '#DADADA', textAlign: 'center', textAlignVertical: 'center', paddingVertical: 4, alignSelf: 'center', marginBottom: 15
                    }}>리뷰 더보기</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Runningtime')}
                    style={styles.greenbutton}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Image
                            style={{ width: 40, height: 40, marginTop: 20 }}
                            source={runningman}
                        />
                        <Text style={styles.whitetext}>
                            코스 달리기</Text>

                        <Image
                            style={{ width: 32, height: 32, alignSelf: 'center' }}
                            source={whiteplus}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

export default Reviewed;