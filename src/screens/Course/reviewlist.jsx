import React, {useState} from 'react';
import { TextInput, StyleSheet, View, Text, Alert, Pressable, Image, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';


import mapview from '../../assets/images/Course/mapforcourseview.png';
import rightarrow from '../../assets/images/Course/rightarrow.png';
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



export default function Course() {
    const [Aligndata, setAlign] = useState('');
    const Aligndatas = [
        { label: "최신 순", value: 'LATEST' },
        { label: "오래된 순", value: 'OLDEST' },
        { label: "별점 높은 순", value: 'HIGHEST_RATING' },
        { label: "별점 낮은 순", value: 'LOWEST_RATING' }
    ]
    return (
        <ScrollView>
            <View>
                <Text style={styles.mapname}>인천 미추홀구</Text>
                <View style={styles.space}></View>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ marginLeft: 60, marginTop: 5 }}>
                        <Text style={{ fontSize: 40, color: 'black', alignSelf: 'center' }}>4.0</Text>
                        <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 3, marginTop: 3, alignSelf: 'center' }}>
                            <Image style={styles.starsize} source={yellowstar} />
                            <Image style={styles.starsize} source={yellowstar} />
                            <Image style={styles.starsize} source={yellowstar} />
                            <Image style={styles.starsize} source={yellowstar} />
                            <Image style={styles.starsize} source={yellowstar} />
                        </View>
                    </View>
                    <View>
                        <View style={{ flexDirection: 'row', marginLeft: 30 }}>
                            <Text style={{ fontSize: 12 }}>
                                5점
                            </Text>
                            <View style={{ height: 5, width: 140, position: 'absolute', right: -150, top: 7, backgroundColor: '#A8A5AF' }}></View>
                            <View style={{ height: 5, width: 50, position: 'absolute', right: -60, top: 7, backgroundColor: '#FFAD20' }}></View>
                            <Text style={{ position: 'absolute', right: -180, fontSize: 12 }}>
                                222
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginLeft: 30 }}>
                            <Text style={{ fontSize: 12 }}>
                                4점
                            </Text>
                            <View style={{ height: 5, width: 140, position: 'absolute', right: -150, top: 7, backgroundColor: '#A8A5AF' }}></View>
                            <View style={{ height: 5, width: 50, position: 'absolute', right: -60, top: 7, backgroundColor: '#FFAD20' }}></View>
                            <Text style={{ position: 'absolute', right: -180, fontSize: 12 }}>
                                222
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginLeft: 30 }}>
                            <Text style={{ fontSize: 12 }}>
                                3점
                            </Text>
                            <View style={{ height: 5, width: 140, position: 'absolute', right: -150, top: 7, backgroundColor: '#A8A5AF' }}></View>
                            <View style={{ height: 5, width: 50, position: 'absolute', right: -60, top: 7, backgroundColor: '#FFAD20' }}></View>
                            <Text style={{ position: 'absolute', right: -180, fontSize: 12 }}>
                                222
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginLeft: 30 }}>
                            <Text style={{ fontSize: 12 }}>
                                2점
                            </Text>
                            <View style={{ height: 5, width: 140, position: 'absolute', right: -150, top: 7, backgroundColor: '#A8A5AF' }}></View>
                            <View style={{ height: 5, width: 50, position: 'absolute', right: -60, top: 7, backgroundColor: '#FFAD20' }}></View>
                            <Text style={{ position: 'absolute', right: -180, fontSize: 12 }}>
                                222
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginLeft: 30 }}>
                            <Text style={{ fontSize: 12 }}>
                                1점
                            </Text>
                            <View style={{ height: 5, width: 140, position: 'absolute', right: -150, top: 7, backgroundColor: '#A8A5AF' }}></View>
                            <View style={{ height: 5, width: 50, position: 'absolute', right: -60, top: 7, backgroundColor: '#FFAD20' }}></View>
                            <Text style={{ position: 'absolute', right: -180, fontSize: 12 }}>
                                222
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.space}></View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ marginLeft: 22, marginBottom: 10 }}>
                        리뷰(999+)</Text>
                    <View style={{ marginLeft: 5, fontSize: 12, backgroundColor: '#E4E4E4', color: 'black', width: 90, height: 25, textAlign: 'center', textAlignVertical: 'center', borderRadius: 20 }}>
                        <Dropdown
                            data={Aligndatas}
                            labelField="label"
                            valueField="value"
                            placeholder="최신 순"
                            value={Aligndata}
                            onChange={item => {
                                setAlign(item.value);
                            }}

                            placeholderStyle={{ fontSize: 10, color: 'black', marginLeft: 10, marginTop:3 }} // 글자색 수정
                            itemTextStyle={{ fontSize: 10, color: 'black' }} // 드롭다운 리스트 글자색 수정
                            selectedTextStyle={{ fontSize: 10, color: 'black', marginLeft: 10, marginTop:3 }} // 선택된 항목 글자색 수정
                        />
                        </View>
                </View>
                <View style={styles.space}></View>
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

            </View>
        </ScrollView>
    );
}
