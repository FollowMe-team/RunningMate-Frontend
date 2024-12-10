import React, { useState } from 'react';
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
import greystar from '../../assets/images/Course/greystar.png';
import { getReview } from '../../utils/courseapi';

import examplepic from '../../assets/images/Course/marathonpic.png';
import Reviews from '../../components/Course/reviews';

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



const Reviewed = ({ route, navigated }) => {
    const data = route.params;
    const [Aligndata, setAlign] = useState('');
    const five = data.data.reviews.filter(rating => rating.rating === 5).length;
    const four = data.data.reviews.filter(rating => rating.rating === 4).length;
    const three = data.data.reviews.filter(rating => rating.rating === 3).length;
    const two = data.data.reviews.filter(rating => rating.rating === 2).length;
    const one = data.data.reviews.filter(rating => rating.rating === 1).length;
    const all = five + four + three + two + one;
    const point = ((5 * five + 4* four + 3*three+2*two+one)/all).toFixed(1);
    const fiverating = five / all * 140;
    const fourrating = four / all * 140;
    const threerating = three / all * 140;
    const tworating = two / all * 140;
    const onerating = one / all * 140;
    const Aligndatas = [
        { label: "최신 순", value: 'LATEST' },
        { label: "오래된 순", value: 'OLDEST' },
        { label: "별점 높은 순", value: 'HIGHEST_RATING' },
        { label: "별점 낮은 순", value: 'LOWEST_RATING' }
    ]


    const [Coursedetails, setCoursedetails] = useState();
    const [Coursesuccess, setCoursesuccess] = useState(false);
    const fetchReviews = async (idss, value) => {
        const result = await getReview(idss, value);
        setCoursedetails(result.data);
        setCoursesuccess(result.success);
    };
    return (
        <ScrollView>
            <View>
                <Text style={styles.mapname}>{data.data.name}</Text>
                <View style={styles.space}></View>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ marginLeft: 60, marginTop: 5 }}>
                        <Text style={{ fontSize: 40, color: 'black', alignSelf: 'center' }}>{point}</Text>
                        <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 3, marginTop: 3, alignSelf: 'center' }}>
                            <Image style={styles.starsize} source={point > 0 ? yellowstar : greystar} />
                            <Image style={styles.starsize} source={point > 1 ? yellowstar : greystar} />
                            <Image style={styles.starsize} source={point > 2 ? yellowstar : greystar} />
                            <Image style={styles.starsize} source={point > 3 ? yellowstar : greystar} />
                            <Image style={styles.starsize} source={point > 4 ? yellowstar : greystar} />
                        </View>
                    </View>
                    <View>
                        <View style={{ flexDirection: 'row', marginLeft: 30 }}>
                            <Text style={{ fontSize: 12 }}>
                                5점
                            </Text>
                            <View style={{ height: 5, width: 140, position: 'absolute', right: -150, top: 7, backgroundColor: '#A8A5AF' }}></View>
                            <View style={{ height: 5, width: fiverating, position: 'absolute', right: -10-fiverating, top: 7, backgroundColor: '#FFAD20' }}></View>
                            <Text style={{ position: 'absolute', right: -180, fontSize: 12 }}>
                                {data.data.reviews.filter(rating => rating.rating === 5).length}

                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginLeft: 30 }}>
                            <Text style={{ fontSize: 12 }}>
                                4점
                            </Text>
                            <View style={{ height: 5, width: 140, position: 'absolute', right: -150, top: 7, backgroundColor: '#A8A5AF' }}></View>
                            <View style={{ height: 5, width: fourrating, position: 'absolute', right: -10-fourrating, top: 7, backgroundColor: '#FFAD20' }}></View>
                        <Text style={{ position: 'absolute', right: -180, fontSize: 12 }}>
                            {data.data.reviews.filter(rating => rating.rating === 4).length}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginLeft: 30 }}>
                        <Text style={{ fontSize: 12 }}>
                            3점
                        </Text>
                        <View style={{ height: 5, width: 140, position: 'absolute', right: -150, top: 7, backgroundColor: '#A8A5AF' }}></View>
                        <View style={{ height: 5, width: threerating, position: 'absolute', right: -10-threerating, top: 7, backgroundColor: '#FFAD20' }}></View>
                        <Text style={{ position: 'absolute', right: -180, fontSize: 12 }}>
                            {data.data.reviews.filter(rating => rating.rating === 3).length}

                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginLeft: 30 }}>
                        <Text style={{ fontSize: 12 }}>
                            2점
                        </Text>
                        <View style={{ height: 5, width: 140, position: 'absolute', right: -150, top: 7, backgroundColor: '#A8A5AF' }}></View>
                        <View style={{ height: 5, width: tworating, position: 'absolute', right: -10-tworating, top: 7, backgroundColor: '#FFAD20' }}></View>
                        <Text style={{ position: 'absolute', right: -180, fontSize: 12 }}>
                            {data.data.reviews.filter(rating => rating.rating === 2).length}

                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginLeft: 30 }}>
                        <Text style={{ fontSize: 12 }}>
                            1점
                        </Text>
                        <View style={{ height: 5, width: 140, position: 'absolute', right: -150, top: 7, backgroundColor: '#A8A5AF' }}></View>
                        <View style={{ height: 5, width: onerating, position: 'absolute', right: -10-onerating, top: 7, backgroundColor: '#FFAD20' }}></View>
                        <Text style={{ position: 'absolute', right: -180, fontSize: 12 }}>
                            {data.data.reviews.filter(rating => rating.rating === 1).length}

                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.space}></View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ marginLeft: 22, marginBottom: 10 }}>
                    리뷰({data.data.reviewCount})</Text>
                <View style={{ marginLeft: 5, fontSize: 12, backgroundColor: '#E4E4E4', color: 'black', width: 90, height: 25, textAlign: 'center', textAlignVertical: 'center', borderRadius: 20 }}>
                    <Dropdown
                        data={Aligndatas}
                        labelField="label"
                        valueField="value"
                        placeholder="최신 순"
                        value={Aligndata}
                        onChange={item => {
                            setAlign(item.value);
                            fetchReviews(data.data.id, Aligndata);
                        }}

                        placeholderStyle={{ fontSize: 10, color: 'black', marginLeft: 10, marginTop: 3 }} // 글자색 수정
                        itemTextStyle={{ fontSize: 10, color: 'black' }} // 드롭다운 리스트 글자색 수정
                        selectedTextStyle={{ fontSize: 10, color: 'black', marginLeft: 10, marginTop: 3 }} // 선택된 항목 글자색 수정
                    />
                </View>
            </View>
            <View style={styles.space}></View>

            {   !Coursesuccess &&
                data.data.reviews.map((reviewer) => (
                    <Reviews data={reviewer} />
                ))
            }
            {   Coursesuccess &&
                Coursedetails.reviews.map((reviewer) => (
                    <Reviews data={reviewer} />
                ))
            }

        </View>
        </ScrollView >
    );
}

export default Reviewed;
