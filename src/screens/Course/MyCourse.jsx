import React from 'react';
import { TextInput,TouchableOpacity, StyleSheet, View, Text, Alert, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Qmark from '../../assets/images/Course/Qmark.png';
import rightarrow from '../../assets/images/Course/rightarrow.png';
import whiteplus from '../../assets/images/Course/whiteplus.png';
import subscribe from '../../assets/images/Course/subscribe.png';
import location from '../../assets/images/Course/location.png';
import time from '../../assets/images/Course/time.png';
import subscribed from '../../assets/images/Course/subscribed.png';
import runningman from '../../assets/images/Course/runningmanforchoosebutton.png';

import SimpleNoCourse from '../../components/Course/SimpleNoCourse';
import SimpleCourse from '../../components/Course/SimpleCourseSave';


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

  whitetext: { color: 'white', fontSize: 22, fontWeight: 'bold', textAlign: 'center', textAlignVertical: 'center', marginLeft: 50, marginRight: 50 },

  bigbox: {
    borderRadius: 15, width: 350, height: 240, backgroundColor: 'white', alignSelf: 'center',
    elevation: 5, alignItems: 'center', justifyContent: "space-around"
  },

  blacktext: { color: 'black', fontSize: 18, fontWeight: 'bold' },

  smallbox: {
    borderRadius: 15, width: 320, height: 50, backgroundColor: 'white', alignSelf: 'center',
    elevation: 7, justifyContent: 'space-around', marginBottom: 5
  },


});

const datas = {
  name: '월미도 해안길',
  distance: '3.8KM',
  time: '30~40분',
  location: '인천 중구',
  distancetoCourse: '5.3KM',
  level: '승인 완료'
}
const datass = {
  name: '송도 센트럴파크',
  distance: '3.8KM',
  time: '30~40분',
  location: '인천 연수구',
  distancetoCourse: '3.8KM',
  level: '승인 대기중'
}
const datasss = {
  name: '계양산 둘레길',
  distance: '8.5KM',
  time: '1시간 이상',
  location: '인천 계양구',
  distancetoCourse: '8.5KM',
  level: '승인 거부'
}

const MyCourse = () => {
  const navigation = useNavigation();

  return (
    <View>
      <View style={styles.space}></View>
      <View style={styles.space}></View>
      <View style={styles.bigbox}>
        <Text style={styles.blacktext}>내가 등록한 코스</Text>
        <SimpleCourse data={datas}/>
        <SimpleCourse data={datass}/>
        <SimpleCourse data={datasss}/>
        </View>
      <View style={styles.space}></View>
      <TouchableOpacity onPress={() => navigation.navigate('Runningtimesaving')}
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
    </View>
  );
}

export default MyCourse;