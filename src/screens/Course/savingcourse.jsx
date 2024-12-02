
import React, { useState } from 'react';
import { TouchableOpacity, TextInput, StyleSheet, View, Text, Alert, Pressable, Image, ImageBackground, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';

import mapforrun from '../../assets/images/Course/mapforrun.png';
import stopbutton from '../../assets/images/Course/stopbutton.png';
import playbutton from '../../assets/images/Course/playbutton.png';
import endbutton from '../../assets/images/Course/endbutton.png';
import runningman from '../../assets/images/Course/runningmanforchoosebutton.png';
import whiteplus from '../../assets/images/Course/whiteplus.png';

import StartPhotoPicker from './startphotochange';
import EndPhotoPicker from './endphotochange';
import LeaderPhotoPicker from './leaderphotochange';

const styles = StyleSheet.create({
    space: { height: 15 },

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

});



const Savingcourse = () => {
    const navigation = useNavigation();
    const [Coursedata, setCourse] = useState('');
    const CourseDatas = [
        { label: "숲길", value: '숲길' },
        { label: "강변", value: '강변' },
        { label: "호숫가", value: '호숫가' },
        { label: "산길", value: '산길' },
        { label: "해변", value: '해변' },
        { label: "도심", value: '도심' },
        { label: "공원", value: '공원' },
        { label: "트랙", value: '트랙' },
        { label: "캠퍼스", value: '캠퍼스' },
        { label: "트레일", value: '트레일' }
    ]
    const [Stairsdata, setStairs] = useState('');
    const StairDatas = [
        { label: "계단 있음", value: '계단있음' },
        { label: "계단 없음", value: '계단없음' }
    ]
    const [Optiondata, setOption] = useState('');
    const OptionDatas = [
        { label: "강아지 산책 가능", value: '강아지' },
        { label: "자전거 이용 가능", value: '자전거' },
        { label: "유모차 산책 가능", value: '유모차' }
    ]


    const [startphoto, setstartPhoto] = useState(null);
    const [endphoto, setendPhoto] = useState(null);
    const [photo, setPhoto] = useState(null);

    return (
        <ScrollView>
            <View style={styles.space}></View>
            <View style={{ borderRadius: 15, width: "90%", height: 120, backgroundColor: 'white', elevation: 7, alignSelf: 'center' }}>
                <Text style={{ fontSize: 30, color: 'black', alignSelf: 'center' }}>00:00:00</Text>
                <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-around' }}>
                    <View>
                        <Text style={{ alignSelf: 'center' }}>거리</Text>
                        <Text style={{ color: 'black', fontSize: 16, alignSelf: 'center' }}>5.3KM</Text>
                    </View>
                    <View>
                        <Text style={{ alignSelf: 'center' }}>평균 페이스</Text>
                        <Text style={{ color: 'black', fontSize: 16, alignSelf: 'center' }}>5'33"</Text>
                    </View>
                    <View>
                        <Text style={{ alignSelf: 'center' }}>칼로리</Text>
                        <Text style={{ color: 'black', fontSize: 16, alignSelf: 'center' }}>245</Text>
                    </View>
                </View>
            </View>
            <Text style={styles.titletext}>코스명</Text>
            <View style={{ borderRadius: 15, width: "90%", height: 60, backgroundColor: 'white', elevation: 7, alignSelf: 'center', justifyContent: 'center' }}>
                <Text style={{ borderRadius: 50, width: "22%", height: "75%", backgroundColor: '#352555', elevation: 7, alignSelf: 'flex-end', color: 'white', textAlign: 'center', textAlignVertical: 'center', fontSize: 13, marginRight: 8 }}>
                    중복 체크</Text>
            </View>
            <Text style={styles.titletext}>코스 설명</Text>
            <TextInput style={{ borderRadius: 15, width: "90%", height: 130, backgroundColor: 'white', elevation: 7, alignSelf: 'center' }}>
            </TextInput><Text style={styles.titletext}>위치</Text>
            <Text style={{
                borderRadius: 15, width: "90%", height: 50, backgroundColor: 'white', elevation: 7, alignSelf: 'center', color: 'black', fontSize: 15, justifyContent: 'center', paddingLeft: 20
                , textAlignVertical: 'center'
            }}>
                인천광역시 어쩌구 저쩌구
            </Text>
            <Text style={styles.titletext}>코스 이미지(선택)</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

                <StartPhotoPicker photo={startphoto} setPhoto={setstartPhoto} />
                <EndPhotoPicker photo={endphoto} setPhoto={setendPhoto} />
                <LeaderPhotoPicker photo={photo} setPhoto={setPhoto} />




            </View>
            <Text style={styles.titletext}>태그(선택)</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <View
                    style={{ borderRadius: 15, width: "28%", height: 40, backgroundColor: 'white', elevation: 7, alignSelf: 'center', color: 'black', fontSize: 10, textAlignVertical: 'center', paddingLeft: 7, marginRight: "3%", marginBottom: 20, justifyContent: 'center' }}>
                    <Dropdown
                        data={CourseDatas}
                        labelField="label"
                        valueField="value"
                        placeholder="주변 환경"
                        value={Coursedata}
                        onChange={item => {
                            setCourse(item.value);
                        }}

                        placeholderStyle={{ color: '#101010', fontSize: 10, marginLeft: 10 }} // 글자색 수정
                        itemTextStyle={{ color: '#101010', fontSize: 15 }} // 드롭다운 리스트 글자색 수정
                        selectedTextStyle={{ color: '#101010', fontSize: 10, marginLeft: 10 }} // 선택된 항목 글자색 수정
                    />
                </View>
                <View
                    style={{ borderRadius: 15, width: "28%", height: 40, backgroundColor: 'white', elevation: 7, alignSelf: 'center', color: 'black', fontSize: 10, textAlignVertical: 'center', paddingLeft: 7, marginRight: "3%", marginBottom: 20, justifyContent: 'center' }}>
                    <Dropdown
                        data={StairDatas}
                        labelField="label"
                        valueField="value"
                        placeholder="계단 유무"
                        value={Stairsdata}
                        onChange={item => {
                            setStairs(item.value);
                        }}

                        placeholderStyle={{ color: '#101010', fontSize: 10, marginLeft: 10 }} // 글자색 수정
                        itemTextStyle={{ color: '#101010', fontSize: 15 }} // 드롭다운 리스트 글자색 수정
                        selectedTextStyle={{ color: '#101010', fontSize: 10, marginLeft: 10 }} // 선택된 항목 글자색 수정
                    />
                </View>
                <View
                    style={{ borderRadius: 15, width: "28%", height: 40, backgroundColor: 'white', elevation: 7, alignSelf: 'center', color: 'black', fontSize: 10, textAlignVertical: 'center', paddingLeft: 7, marginRight: "3%", marginBottom: 20, justifyContent: 'center' }}>
                    <Dropdown
                        data={OptionDatas}
                        labelField="label"
                        valueField="value"
                        placeholder="추가 옵션"
                        value={Optiondata}
                        onChange={item => {
                            setOption(item.value);
                        }}

                        placeholderStyle={{ color: '#101010', fontSize: 10, marginLeft: 10 }} // 글자색 수정
                        itemTextStyle={{ color: '#101010', fontSize: 15 }} // 드롭다운 리스트 글자색 수정
                        selectedTextStyle={{ color: '#101010', fontSize: 10, marginLeft: 10 }} // 선택된 항목 글자색 수정
                    />
                </View>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('MyCourse')}
                style={styles.greenbutton}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Image
                        style={{ width: 40, height: 40, marginTop: 20 }}
                        source={runningman}
                    />
                    <Text style={styles.whitetext}>
                        코스 등록하기</Text>

                    <Image
                        style={{ width: 32, height: 32, alignSelf: 'center' }}
                        source={whiteplus}
                    />
                </View>
            </TouchableOpacity>
        </ScrollView>
    );
}

export default Savingcourse
