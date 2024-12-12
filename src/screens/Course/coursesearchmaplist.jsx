import React, { useEffect, useState } from 'react';
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
import { getCourseSearch } from '../../utils/courseapi';

import Courses from '../../components/Course/Courses';
import SimpleNoCourse from '../../components/Course/SimpleNoCourse';

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


const Coursesearchmaplist = ({ route }) => {
    const {
        selectedDistance,
        selectedElevation,
        selectedEnvironment,
        selectedOptions,
        selectedLocation,
        selectedLevel,
        word
    } = route.params || {};
    console.log(selectedLocation);
    const [queryOptions, setqueryOptions] = useState('');
    const [queryParams, setqueryParams] = useState('');

    const elevations = selectedElevation.map(item => item.value).join('%2C');
    const environments = selectedEnvironment.map(item => item.value).join('%2C');
    const options = selectedOptions.map(item => item.value).join('%2C');

    const handleSearchCourses = () => {
        // 쿼리 파라미터 조합
        if (elevations) {
            if (environments) {
                if (options) {
                    setqueryOptions(elevations + '%2C' + environments + '%2C' + options);
                }
                else {
                    setqueryOptions(elevations + '%2C' + environments);
                }
            }
            else {
                if (options) {
                    setqueryOptions(elevations + '%2C' + options);
                }
                else {
                    setqueryOptions(elevations);
                }
            }
        }
        else {
            if (environments) {
                if (options) {
                    setqueryOptions(environments + '%2C' + options);
                }
                else {
                    setqueryOptions(environments);
                }
            }
            else {
                if (options) {
                    setqueryOptions(options);
                }
                else {
                    setqueryOptions();
                }
            }
        }
        if (word) {
            if (selectedLocation.latitude) {
                if (selectedLevel) {
                    if (queryOptions) {
                        setqueryParams('keyword=' + word + '&' + 'latitude=' + selectedLocation.latitude + '&' + 'longitude=' + selectedLocation.longitude + '&' +
                            'difficulties=' + selectedLevel + '&' + 'options=' + queryOptions
                        );
                    }
                    else {
                        setqueryParams('keyword=' + word + '&' + 'latitude=' + selectedLocation.latitude + '&' + 'longitude=' + selectedLocation.longitude + '&' +
                            'difficulties=' + selectedLevel
                        );
                    }
                }
                else {
                    if (queryOptions) {
                        setqueryParams('keyword=' + word + '&' + 'latitude=' + selectedLocation.latitude + '&' + 'longitude=' + selectedLocation.longitude + '&' +
                            '&' + 'options=' + queryOptions
                        );
                    }
                    else {
                        setqueryParams('keyword=' + word + '&' + 'latitude=' + selectedLocation.latitude + '&' + 'longitude=' + selectedLocation.longitude + '&'
                        );
                    }
                }
            }
            else {
                if (selectedLevel) {
                    if (queryOptions) {
                        setqueryParams('keyword=' + word + '&' +
                            'difficulties=' + selectedLevel + '&' + 'options=' + queryOptions
                        );
                    }
                    else {
                        setqueryParams('keyword=' + word + '&' +
                            'difficulties=' + selectedLevel
                        );
                    }
                }
                else {
                    if (queryOptions) {
                        setqueryParams('keyword=' + word +
                            '&' + 'options=' + queryOptions
                        );
                    }
                    else {
                        setqueryParams('keyword=' + word
                        );
                    }
                }
            }
        }
        else {
            if (selectedLocation.latitude) {
                if (selectedLevel) {
                    if (queryOptions) {
                        setqueryParams('latitude=' + selectedLocation.latitude + '&' + 'longitude=' + selectedLocation.longitude + '&' +
                            'difficulties=' + selectedLevel + '&' + 'options=' + queryOptions
                        );
                    }
                    else {
                        setqueryParams('latitude=' + selectedLocation.latitude + '&' + 'longitude=' + selectedLocation.longitude + '&' +
                            'difficulties=' + selectedLevel
                        );
                    }
                }
                else {
                    if (queryOptions) {
                        setqueryParams('latitude=' + selectedLocation.latitude + '&' + 'longitude=' + selectedLocation.longitude + '&' +
                            '&' + 'options=' + queryOptions
                        );
                    }
                    else {
                        setqueryParams('latitude=' + selectedLocation.latitude + '&' + 'longitude=' + selectedLocation.longitude + '&'
                        );
                    }
                }
            }
            else {
                if (selectedLevel) {
                    if (queryOptions) {
                        setqueryParams(
                            'difficulties=' + selectedLevel + '&' + 'options=' + queryOptions
                        );
                    }
                    else {
                        setqueryParams(
                            'difficulties=' + selectedLevel
                        );
                    }
                }
                else {
                    if (queryOptions) {
                        setqueryParams(
                            'options=' + queryOptions
                        );
                    }
                    else {
                        setqueryParams(
                        );

                    }
                }
            }
        }

    };

    const navigation = useNavigation();
    const [searchCourse, setsearchCourse] = useState([]);
    const [searchsuccess, setsearchsuccess] = useState(false);

    const fetchsearchCourse = async (query) => {
        result = await getCourseSearch(query);
        setsearchCourse(result.data);
        setsearchsuccess(result.success);
    };
    useEffect(() => {
        handleSearchCourses();
        { searchCourse != null &&
            console.log("가나다라",{queryParams});
            fetchsearchCourse(queryParams);
        console.log(
            {selectedDistance},{
            selectedElevation},{
            selectedEnvironment},{
            selectedOptions},{
            selectedLocation},{
            selectedLevel},{
            word}, "이건", {queryParams}, "zmam", {elevations}, {environments}, {options})
    }
    }, []);

    
    return (

        <ScrollView>
            {
                searchsuccess === true ?
                    <View>
                        <TouchableOpacity style={{ alignSelf: 'center', flexDirection: 'row' }} onPress={() => navigation.navigate('Coursesearch')}>
                            <View style={styles.inputbarsearch}>
                                <Image style={{ width: 20, height: 20, alignSelf: 'center', marginRight: 5 }} source={Qmark} />

                                <Text style={{ textAlignVertical: 'center' }}>{word}</Text>

                            </View>
                        </TouchableOpacity>
                        <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginLeft: 30 }}>
                            {selectedDistance.map((button) => (
                                <Text
                                    style={[
                                        styles.whitesharptext,
                                    ]}
                                >
                                    {button.label}
                                </Text>
                            ))}
                            {selectedElevation.map((button) => (
                                <Text
                                    style={[
                                        styles.whitesharptext,
                                    ]}
                                >
                                    {button.label}
                                </Text>
                            ))}
                            {selectedEnvironment.map((button) => (
                                <Text
                                    style={[
                                        styles.whitesharptext,
                                    ]}
                                >
                                    {button.label}
                                </Text>
                            ))}
                            {selectedOptions.map((button) => (
                                <Text
                                    style={[
                                        styles.whitesharptext,
                                    ]}
                                >
                                    {button.label}
                                </Text>
                            ))}
                        </View>
                        <View style={{ borderRadius: 15, width: "90%", height: 'auto', backgroundColor: 'white', elevation: 7, alignSelf: 'center', marginTop: 10, paddingBottom: 15, paddingTop: 15 }}>
                            {searchCourse.map((course) => (

                                <Courses data={course} />
                            ))}
                            {
                                searchCourse.length === 0 ?
                                    <SimpleNoCourse /> : <View></View>
                            }
                        </View>
                        
                    </View> : <View></View>}
        </ScrollView>
    );
}

export default Coursesearchmaplist;
