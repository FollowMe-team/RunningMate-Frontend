import React, { useState } from 'react';
import { TextInput, TouchableOpacity, StyleSheet, View, Text, Alert, Pressable, Image, ImageBackground, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Qmark from '../../assets/images/Course/Qmark.png';
import rightarrow from '../../assets/images/Course/rightarrow.png';
import whiteplus from '../../assets/images/Course/whiteplus.png';
import yellowstar from '../../assets/images/Course/star.png';
import greystar from '../../assets/images/Course/greystar.png';
import blackplus from '../../assets/images/Course/pictureplus.png';

import ReviewPhotoPicker from './reviewphotochange';

let stars = false
let stars2 = false
let stars3 = false
let stars4 = false
let stars5 = false



const styles = StyleSheet.create({
    container: {
    },

    reviewbox: {
        borderRadius: 10, width: 350, height: 110, backgroundColor: 'white', alignSelf: 'center',
        elevation: 5
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



const Reviewing = () => {
    const navigation = useNavigation();
    const [starImg, setStar] = useState(yellowstar);
    const [starImg2, setStar2] = useState(yellowstar);
    const [starImg3, setStar3] = useState(yellowstar);
    const [starImg4, setStar4] = useState(yellowstar);
    const [starImg5, setStar5] = useState(yellowstar);

    const [photo, setPhoto] = useState(null);
    return (
        <View>
            <Text style={styles.blacktext}>별점</Text>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => { stars = !stars; stars ? setStar(yellowstar) : setStar(greystar) }}>
                    <Image style={styles.leftstarsize} source={starImg} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { stars2 = !stars2; stars2 ? setStar2(yellowstar) : setStar2(greystar) }}>
                    <Image style={styles.starsize} source={starImg2} />
                </TouchableOpacity><TouchableOpacity onPress={() => { stars3 = !stars3; stars3 ? setStar3(yellowstar) : setStar3(greystar) }}>
                    <Image style={styles.starsize} source={starImg3} />
                </TouchableOpacity><TouchableOpacity onPress={() => { stars4 = !stars4; stars4 ? setStar4(yellowstar) : setStar4(greystar) }}>
                    <Image style={styles.starsize} source={starImg4} />
                </TouchableOpacity><TouchableOpacity onPress={() => { stars5 = !stars5; stars5 ? setStar5(yellowstar) : setStar5(greystar) }}>
                    <Image style={styles.starsize} source={starImg5} />
                </TouchableOpacity>
            </View>
            <View style={styles.space}></View>
            <Text style={styles.blacktext}>리뷰 내용</Text>
            <TextInput
                style={styles.reviewbox}>
            </TextInput>
            <View style={styles.smallspace}></View>
            <View style={styles.smallspace}></View>
            <Text style={styles.blacktext}>리뷰 이미지(선택)</Text>
            <View style={{marginLeft:22}}>
            <ReviewPhotoPicker photo={photo} setPhoto={setPhoto}/>
            </View>
            <View style={styles.space}></View>
            <View style={styles.smallspace}></View>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity style={styles.greenbutton} onPress={() => navigation.navigate('Course_basic')}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.whitetext}>작성하기</Text>
                        <Image
                            style={{ width: 30, height: 30, position: 'absolute', left: 150 }}
                            source={whiteplus}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Reviewing;