import React, { useState } from 'react';
import { TextInput, TouchableOpacity, StyleSheet, View, Text, Alert, Pressable, Image, ImageBackground, ScrollView, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Qmark from '../../assets/images/Course/Qmark.png';
import rightarrow from '../../assets/images/Course/rightarrow.png';
import whiteplus from '../../assets/images/Course/whiteplus.png';
import yellowstar from '../../assets/images/Course/star.png';
import greystar from '../../assets/images/Course/greystar.png';
import blackplus from '../../assets/images/Course/pictureplus.png';

import ReviewPhotoPicker from './reviewphotochange';

import { RReviewing } from '../../utils/courseapi';




const styles = StyleSheet.create({
    container: {
    },

    reviewbox: {
        borderRadius: 10, width: 350, height: 110, backgroundColor: 'white', alignSelf: 'center',
        elevation: 5, color :'black'
    },

    space: { height: 15 },

    smallspace: { height: 5 },

    imagebutton: {
        width: 95, height: 95,
        borderColor: 'black',
        backgroundColor: '#EEEEEE',
        borderWidth: 1,
        borderRadius: 15,
        alignItems: "center", justifyContent: "center",
        marginLeft: 22
    },

    greentext: { color: '#73D393', fontSize: 20, fontWeight: 'bold', marginRight: 30, marginBottom: 4 },

    blacktext: { color: 'black', fontSize: 14, fontWeight: 'bold', marginRight: 30, marginBottom: 6, marginLeft: 22 },

    greenbutton: {
        width: 350, height: 60,
        borderColor: 'white',
        backgroundColor: '#73D393',
        borderWidth: 0,
        borderRadius: 15, FlexDirection: 'row',
        alignItems: "center", justifyContent: "center", alignSelf: "center"
    },

    whitetext: { color: 'white', fontSize: 21, fontWeight: 'bold' },

    leftstarsize: { height: 30, width: 30, marginLeft: 22 },

    starsize: { height: 30, width: 30 },


});



const Reviewing = ({ route }) => {
    const [Stars, setstars] = useState(5);
    const id = route.params.id;
    const navigation = useNavigation();
    const [end, setEnd] = useState(null);
    const [writings, setwritings] = useState('');
    // API 호출 함수
    const submitReview = async () => {
        if (!writings.trim()) {
            Alert.alert('오류', '리뷰 내용을 입력해주세요.');
            return;
        }

        setLoading(true);
        if (photo != null) {
            const request = {
                rating: Stars,
                content: writings,
                photo, // 선택된 사진
            };
        }
        else {
            const request = {
                rating: Stars,
                content: writings,
            };
        }

        const result = await RReviewing(id, request);

    };
    const handleEnd = () => {
        if (end !== null) {
            // 이미 정보가 표시된 상태라면, 정보 초기화 (토글 효과)
            setEnd(null);
        } else {
            setEnd(true)
        }
    }
    const [photo, setPhoto] = useState(null);
    return (
        <View style={{ height: '100%' }}>
            <Text style={styles.blacktext}>별점</Text>
            <View style={{ flexDirection: 'row', marginLeft: 22 }}>
                <TouchableOpacity onPress={() => setstars(1)}>
                    <Image style={styles.starsize} source={Stars > 0 ? yellowstar : greystar} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setstars(2)}>
                    <Image style={styles.starsize} source={Stars > 1 ? yellowstar : greystar} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setstars(3)}>
                    <Image style={styles.starsize} source={Stars > 2 ? yellowstar : greystar} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setstars(4)}>
                    <Image style={styles.starsize} source={Stars > 3 ? yellowstar : greystar} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setstars(5)}>
                    <Image style={styles.starsize} source={Stars > 4 ? yellowstar : greystar} />
                </TouchableOpacity>
            </View>
            <View style={styles.space}></View>
            <Text style={styles.blacktext}>리뷰 내용</Text>
            <TextInput onChangeText={text => setwritings(text)}
                style={styles.reviewbox}>
            </TextInput>
            <View style={styles.smallspace}></View>
            <View style={styles.smallspace}></View>
            <Text style={styles.blacktext}>리뷰 이미지(선택)</Text>
            <View style={{ marginLeft: 22 }}>
                <ReviewPhotoPicker photo={photo} setPhoto={setPhoto} />
            </View>
            <View style={styles.space}></View>
            <View style={styles.smallspace}></View>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity style={styles.greenbutton} onPress={handleEnd}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.whitetext}>작성하기</Text>
                        <Image
                            style={{ width: 30, height: 30, position: 'absolute', left: 150 }}
                            source={whiteplus}
                        />
                    </View>
                </TouchableOpacity>
            </View>
            {end !== null && (
                <View style={{ backgroundColor: ' rgba(0, 0, 0, 0.5)', height: '100%', width: '100%', position: 'absolute', justifyContent: 'center' }}>
                    <View style={{ backgroundColor: 'white', height: 140, width: '60%', alignSelf: 'center', justifyContent: 'space-between', borderRadius: 15 }}>
                        <Text style={{ height: '50%', width: '70%', color: 'black', alignSelf: 'center', textAlign: 'center', textAlignVertical: 'center', color: 'grey', fontSize: 12, fontWeight: 'bold', marginTop: '9%' }}>종료 후에는 변경이 불가합니다. 해당 내용으로 등록하시겠습니까?</Text>
                        <View style={{ flexDirection: 'row', height: '35%', width: '100%' }}>
                            <TouchableOpacity onPress={handleEnd} style={{ width: '50%', height: '100%', justifyContent: 'center' }}>
                                <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: 'black', alignSelf: 'center', fontWeight: 'bold' }}>Cancel</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('MyProfile') && submitReview}
                                style={{ width: '50%', height: '100%', justifyContent: 'center' }}>
                                <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: 'black', alignSelf: 'center', fontWeight: 'bold', color: 'red' }}>Finish</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )
            }
        </View >

    );
}

export default Reviewing;