
import React, { useCallback, useMemo, useRef, useEffect, useState } from 'react';
import { TextInput, StyleSheet, TouchableOpacity, View, Text, Alert, Pressable, Image, ScrollView, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import subscribe from '../../assets/images/Course/subscribe.png';
import subscribed from '../../assets/images/Course/subscribed.png'
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
import MapDetails from '../../components/Course/MapDetails';
import { BookCourse, unBookCourse } from '../../utils/courseapi';

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



const Reviewed = ({ route, navigated }) => {
    const ids = route.params;
    const navigation = useNavigation();
    const [Coursedetails, setCoursedetails] = useState();
    const [Coursesuccess, setCoursesuccess] = useState(false);
    const [subs, setsubs] = useState(false);

    useEffect(() => {
        const fetchCoursedetails = async idss => {
            const result = await getCourseDetail(idss);
            setCoursedetails(result.data);
            setCoursesuccess(result.success);
            setsubs(result.data.bookmarked);
        };
        fetchCoursedetails(ids.id);
    }, [subs]);


    const handlebookToggle = async () => {
        let result;
        if (subs) {
            result = await unBookCourse(route.params.id);
        } else {
            result = await BookCourse(route.params.id);
        }
        const newsub = !subs;
        console.log("subs", subs);
        setsubs(newsub);
    };
    return (
        < ScrollView >
            {Coursesuccess === true ? 
                <View>
                    <TouchableOpacity onPress={handlebookToggle}
                    >
                        <Image
                            style={{ width: 25, height: 25, right: 33, top: 0, position: 'absolute' }}
                            source={Coursedetails.bookmarked === true ? subscribed : subscribe}
                        /></TouchableOpacity>
                    <MapDetails data={Coursedetails} />
                    <TouchableOpacity onPress={() => navigation.navigate('Reviewlist', { data: Coursedetails })}>

                        {Coursedetails.reviewCount > 2 &&
                            <Text style={{
                                height: 'auto', width: 65, fontSize: 10,
                                borderRadius: 15, color: 'black', backgroundColor: '#DADADA', textAlign: 'center', textAlignVertical: 'center', paddingVertical: 4, alignSelf: 'center', marginBottom: 15
                            }}>리뷰 더보기</Text>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Runningtime', {data : Coursedetails})}

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
                </View> : <Text>{ids.id}</Text>
            }
        </ScrollView >

    );
}

export default Reviewed;