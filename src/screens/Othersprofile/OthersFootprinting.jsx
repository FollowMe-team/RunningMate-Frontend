import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import like from '../../assets/images/Othersprofile/like.png';
import hate from '../../assets/images/Othersprofile/hate.png';
import like_chose from '../../assets/images/Othersprofile/like_chose.png';
import hate_chose from '../../assets/images/Othersprofile/hate_chose.png';
import footprinting from '../../assets/images/Othersprofile/footprinting.png';
import check from '../../assets/images/Othersprofile/check.png';
import uncheck from '../../assets/images/Othersprofile/uncheck.png';
import { TextInput } from 'react-native-gesture-handler';

let checked = false
let liked = false
let hated =false

const OthersFootprinting = () => {
    const navigation = useNavigation();
    const [likeImg, setlike] = useState(like);
    const [hateImg, sethate] = useState(hate);
    const [checkImg, setcheck] = useState(uncheck);

    return (
        <View>
            <Image style={{ height: 100, width: 100, alignSelf: 'center', marginTop: 30, marginLeft: 14 }}
                source={footprinting}
            />
            <Text style={{ color: 'black', fontSize: 24, alignSelf: 'center' }}>
                발자국 남기기
            </Text>
            <Text style={{ alignSelf: 'center', color: 'black', marginTop: 16, marginBottom: 12 }}>
                당신의 평가가 발자국이 되어 남습니다.
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => { liked = !liked; liked ? setlike(like_chose) & sethate(hate) : setlike(like) }}>

                    <Image style={{ height: 120, width: 120 }}
                        source={likeImg}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { hated = !hated; hated ? sethate(hate_chose) & setlike(like) : sethate(hate) }}>
                    <Image style={{ height: 120, width: 120, marginLeft: 50 }}
                        source={hateImg}
                    />
                </TouchableOpacity>
            </View>
            <Text style={{ fontWeight: 'bold', color: 'black', marginTop: 12, marginBottom: 12, marginLeft: 32 }}>
                평가 사유
            </Text>
            <TextInput style={{ borderColor: '#D6D6D6', borderWidth: 1, width: '85%', height: '30%', alignSelf: 'center', borderRadius: 10 }}>
            </TextInput>
            <TouchableOpacity onPress={() => { checked = !checked; checked ? setcheck(check) : setcheck(uncheck) }}>

                <View style={{ flexDirection: 'row' }}>
                    <Image style={{ height: 15, width: 15, marginLeft: 32, marginRight: 8, marginTop: 8 }}
                        source={checkImg}
                    />
                    <Text style={{ marginTop: 4, color: 'black' }}>
                        익명으로 평가하시겠습니까?
                    </Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.greenbutton} onPress={() => navigation.navigate('Othersprofile')}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.whitetext}>평가하기</Text>

                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        paddingBottom: 80,
    },
    contentContainer: {
        flexGrow: 1,
        width: '100%',
    },
    greenbutton: {
        width: 350, height: 54,
        borderColor: 'white',
        backgroundColor: '#73D393',
        borderWidth: 0,
        borderRadius: 15, FlexDirection: 'row', marginTop: 15,
        alignItems: "center", justifyContent: "center", alignSelf: "center"
    },

    whitetext: { color: 'white', fontSize: 21, fontWeight: 'bold' },

});

export default OthersFootprinting;
