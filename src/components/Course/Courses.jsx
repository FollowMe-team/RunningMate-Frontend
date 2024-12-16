
import React, { useState } from 'react';
import { TextInput, TouchableOpacity, StyleSheet, View, Text, Alert, Pressable, Image, ImageBackground, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';

import blacklocation from '../../assets/images/Course/blacklocation.png';
import location from '../../assets/images/Course/location.png';
import time from '../../assets/images/Course/time.png';
import star from '../../assets/images/Course/star.png';
import runner from '../../assets/images/Course/runner.png';
import mapview from '../../assets/images/Course/mapforcourseview.png';
import subscribe from '../../assets/images/Course/subscribe.png';
import subscribed from '../../assets/images/Course/subscribed.png';
import { BookCourse, unBookCourse } from '../../utils/courseapi';

const styles = StyleSheet.create({
    space: { height: 15 },

    greensharptext: {
        height: 24, marginRight: 10, width: 'auto', paddingLeft: 10, paddingRight: 10,
        borderColor: 'white',
        backgroundColor: '#4A9B8C',
        borderWidth: 0,
        borderRadius: 20, marginBottom: 5,
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

    greenbutton: {
        width: 350, height: 60,
        borderColor: 'white',
        backgroundColor: '#73D393',
        borderWidth: 0,
        borderRadius: 15, FlexDirection: 'row',
        alignItems: "center", justifyContent: "center", alignSelf: "center"
    },

    whitetext: { color: 'white', fontSize: 22, fontWeight: 'bold', textAlign: 'center', textAlignVertical: 'center', marginLeft: 60, marginRight: 60 },

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
    starsize: { height: 30, width: 30, marginLeft: 20, marginRight: 10, marginTop: 5 },

    inputbar: { borderRadius: 10, width: "78%", height: 40, backgroundColor: 'white', elevation: 7, alignSelf: 'center', paddingLeft: 10, textAlignVertical: 'center', fontSize: 14, color: 'grey' },
    inputbar2: { borderRadius: 10, width: "87%", height: 32, backgroundColor: 'white', elevation: 7, alignSelf: 'center', paddingLeft: 10, textAlignVertical: 'center', marginTop: 15, justifyContent: 'center' },

    lowlevel: { textAlign: 'center', textAlignVertical: 'center', width: 'auto', paddingHorizontal: 5, height: 20, color: '#409E4B', fontSize: 9, backgroundColor: '#CFF3D0', borderRadius: 20 },
    middlelevel: { textAlign: 'center', textAlignVertical: 'center', width: 'auto', paddingHorizontal: 5, height: 20, color: '#A9AB35', fontSize: 9, backgroundColor: '#FBFF7F', borderRadius: 20 },
    highlevel: { textAlign: 'center', textAlignVertical: 'center', width: 'auto', paddingHorizontal: 5, height: 20, color: '#E06464', fontSize: 9, backgroundColor: '#F3CFCF', borderRadius: 20 }

});


const Courserecommend = ({ data }) => {
    const navigation = useNavigation();
    const [isFollowing, setIsFollowing] = useState(data.bookmarked);

    const optiondata = data.courseOptionTypes;

    const handleFollow = () => {
        const newFollow = !isFollowing;
        setIsFollowing(newFollow);
        handlebookToggle(data.id, data.bookmarked)
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
    return (
        <TouchableOpacity style={{ borderRadius: 15, width: "90%", height: 'auto', backgroundColor: 'white', elevation: 7, alignSelf: 'center', marginBottom: 20 }}
            onPress={() => navigation.navigate('Coursesearchmapview', {data : data})}>
            <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                
                <View>
                    <View style={{ flexDirection: 'row', marginTop: 15, marginLeft:22, justifyContent: 'space-between', width: 250 }}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{ color: 'black', fontSize: 16 }}>{data.name}</Text>
                            <TouchableOpacity onPress={handleFollow}>
                                <View>
                                    <Image
                                        style={{ width: 18, height: 18, marginLeft: 5 }}
                                        source={isFollowing === true ? subscribed : subscribe}
                                    /></View></TouchableOpacity></View>
                        <View style={{ flexWrap: 'wrap', flexDirection: 'row', alignSelf: 'center', marginRight: -36 }}>
                            <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginRight: 7, marginTop: 3 }}>
                                <Image
                                    style={{ width: 12, alignSelf: 'flex-end', height: 12, marginRight: 3 }}
                                    source={location}
                                />
                                <Text
                                    style={{ color: 'grey', fontSize: 8 }}
                                >{data.distance}</Text>
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
                        <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginRight: -24 }}>


                            <Text
                                style={[data.difficulty === '쉬움' && styles.lowlevel,
                                data.difficulty === '보통' && styles.middlelevel,
                                data.difficulty === '어려움' && styles.highlevel,
                                ]}
                            >{data.difficulty}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <Text style={{ marginLeft: 22, marginRight: 22, color: 'black', marginTop: 5 }}>{data.description}
            </Text>
            <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginTop: 5 }}>

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
                        {data.runningCount}
                    </Text>
                </View>
            </View>
            <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginLeft: 22, marginTop: 10, marginBottom: 10 }}>
                {optiondata.map((text) => (
                    <Text style={styles.greensharptext}># {text}</Text>

                ))}
            </View>


        </TouchableOpacity>
    );
}

export default Courserecommend;
