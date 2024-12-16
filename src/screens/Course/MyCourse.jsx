import React, { useState, useEffect } from 'react';
import { TextInput, TouchableOpacity, StyleSheet, View, Text, Alert, Pressable, Image } from 'react-native';
import { useNavigation,useIsFocused } from '@react-navigation/native';

import Qmark from '../../assets/images/Course/Qmark.png';
import rightarrow from '../../assets/images/Course/rightarrow.png';
import whiteplus from '../../assets/images/Course/whiteplus.png';
import subscribe from '../../assets/images/Course/subscribe.png';
import location from '../../assets/images/Course/location.png';
import time from '../../assets/images/Course/time.png';
import subscribed from '../../assets/images/Course/subscribed.png';
import runningman from '../../assets/images/Course/runningmanforchoosebutton.png';
import { getMyCourse } from '../../utils/courseapi';
import MySaveCourse from '../../components/Course/mySaveCourse';



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
    borderRadius: 15, width: 350, height: 'auto', paddingTop: 8, backgroundColor: 'white', alignSelf: 'center',
    elevation: 5, alignItems: 'center', justifyContent: "space-around"
  },

  blacktext: { color: 'black', fontSize: 18, fontWeight: 'bold', marginBottom: 8 },

  smallbox: {
    borderRadius: 15, width: 320, height: 50, backgroundColor: 'white', alignSelf: 'center',
    elevation: 7, justifyContent: 'space-around', marginBottom: 5
  },


});


const MyCourse = () => {
  const navigation = useNavigation();
  const [myCourse, setmyCourse] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchmyCourse = async () => {
      const result = await getMyCourse();
      setmyCourse(result.data);
    };

    fetchmyCourse();
  }, [isFocused]);
  return (
    <View>
      <View style={styles.space}></View>
      <View style={styles.space}></View>
      <View style={styles.bigbox}>
        <Text style={styles.blacktext}>내가 등록한 코스</Text>
        <MySaveCourse data={myCourse}/>
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