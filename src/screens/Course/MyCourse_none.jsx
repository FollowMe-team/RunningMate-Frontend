import React from 'react';
import { TextInput, StyleSheet, View, Text, Alert, Pressable, Image } from 'react-native';

import Qmark from '../../assets/images/Course/Qmark.png';
import rightarrow from '../../assets/images/Course/rightarrow.png';
import whiteplus from '../../assets/images/Course/whiteplus.png';
import subscribe from '../../assets/images/Course/subscribe.png';
import location from '../../assets/images/Course/location.png';
import time from '../../assets/images/Course/time.png';
import subscribed from '../../assets/images/Course/subscribed.png';
import runningman from '../../assets/images/Course/runningmanforchoosebutton.png';


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
    borderRadius: 15, width: 350, height: 110, backgroundColor: 'white', alignSelf: 'center',
    elevation: 5, alignItems: 'center', justifyContent: "space-around"
  },

  blacktext: { color: 'black', fontSize: 18, fontWeight: 'bold' },

  smallbox: {
    borderRadius: 15, width: 320, height: 50, backgroundColor: '#EBEBEB', alignSelf: 'center',
    justifyContent: 'space-around', marginBottom: 5
  },

  smallbox_text: { color: '#AAA7A7', fontSize: 16, fontWeight: 'bold', textAlign: 'center', textAlignVertical: 'center'},

});



export default function Course() {
  return (
    <View>
      <View style={styles.space}></View>
      <View style={styles.space}></View>
      <View style={styles.bigbox}>
        <Text style={styles.blacktext}>내가 등록한 코스</Text>
        <View style={styles.smallbox}>
          <Text style={styles.smallbox_text}>
            아직 등록된 코스가 없습니다.
          </Text>
        </View>
      </View>
      <View style={styles.space}></View>
      <View style={styles.space}></View>
      <Pressable
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
      </Pressable>
    </View>
  );
}
