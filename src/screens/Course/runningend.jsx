import React, { useEffect } from 'react';
import { TextInput, TouchableOpacity, StyleSheet, View, Text, Alert, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Qmark from '../../assets/images/Course/Qmark.png';
import rightarrow from '../../assets/images/Course/rightarrow.png';
import whiteplus from '../../assets/images/Course/whiteplus.png';
import mapforcourseview from '../../assets/images/Course/mapforcourseview.png';
import { RecordRunning } from '../../utils/courseapi';

const styles = StyleSheet.create({
  container: {
  },

  searchbox: {
    borderRadius: 10, width: 350, height: 40, backgroundColor: 'white', alignSelf: 'center',
    elevation: 5
  },

  space: { height: 15 },

  whitebutton: {
    width: 160, height: 60,
    borderColor: '#73D393',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 15,
    alignItems: "center", justifyContent: "center"
  },

  greentext: { color: '#73D393', fontSize: 20, fontWeight: 'bold', marginRight: 30, marginBottom: 4 },

  greenbutton: {
    width: 160, height: 60,
    borderColor: 'white',
    backgroundColor: '#73D393',
    borderWidth: 0,
    borderRadius: 15, FlexDirection: 'row-reverse',
    alignItems: "center", justifyContent: "center"
  },

  whitetext: { color: 'white', fontSize: 20, fontWeight: 'bold', marginRight: 12 },




});



const Runningend = ({ route }) => {
  const navigation = useNavigation();
  const data = route.params;
  const time = data.time;
  const totalDistance = data.totalDistance;
  const id = data.id;
  const starttime = data.starttime;
  const endtime = data.endtime;
  const startlatitude = data.startlatitude;
  const startlongitude = data.startlongitude;
  const endlatitude = data.endlatitude;
  const endlongitude = data.endlongitude;
  const thumbnailUrl = data.thumbnailUrl;
  const formatTime = (duration) => {
    const hours = duration.hours().toString().padStart(2, '0');
    const minutes = duration.minutes().toString().padStart(2, '0');
    const seconds = duration.seconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };
  const formatTime2 = (duration) => {
    const hours = duration.hours() + duration.minutes() / 60 + duration.seconds() / 3600;
    return hours;
  };
  const recordRUN = async () => {
    if (totalDistance != 0) {

      const request = {
        startTime: starttime,
        endTime: endtime,
        distance: totalDistance,
        averagePace: ((formatTime2(time)) / (totalDistance / 1000)),
        duration: formatTime2(time),
        caloriesBurned: (0.0055 * totalDistance),
        recordPoints: [
          {
            latitude: startlatitude,
            longitude: startlongitude,
            recordedTime: starttime
          },
          {
            latitude: endlatitude,
            longitude: endlongitude,
            recordedTime: endtime
          }
        ]
      };
      console.log("id : ", id, ", request : ", request);
      const result = await RecordRunning(id, request);
    }
    else {

      const request = {
        startTime: starttime,
        endTime: endtime,
        distance: totalDistance,
        averagePace: 0,
        duration: formatTime2(time),
        caloriesBurned: (0.0055 * totalDistance),
        recordPoints: [
          {
            latitude: startlatitude,
            longitude: startlongitude,
            recordedTime: starttime
          },
          {
            latitude: endlatitude,
            longitude: endlongitude,
            recordedTime: endtime
          }
        ]
      };
      console.log("id : ", id, ", request : ", request);
      const result = await RecordRunning(id, request);
    }
  }

  useEffect(() => {
    recordRUN();
  });

  return (
    <View>

      <View style={{ height: 15 }}></View>
      <View style={{ borderRadius: 15, width: "90%", height: 'auto', backgroundColor: 'white', elevation: 7, alignSelf: 'center' }}>
        <Text style={{ fontSize: 30, color: 'black', alignSelf: 'center' }}>{formatTime(time)}</Text>
        <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-around' }}>
          <View>
            <Text style={{ alignSelf: 'center' }}>거리</Text>
            <Text style={{ color: 'black', fontSize: 16, alignSelf: 'center' }}>{(totalDistance/1000).toFixed(2)}KM</Text>
          </View>
          <View>
            <Text style={{ alignSelf: 'center' }}>평균 페이스</Text>
            <Text style={{ color: 'black', fontSize: 16, alignSelf: 'center' }}>{totalDistance > 0
                                ? ((time.hours() * 3600 + time.minutes() * 60 + time.seconds()) / totalDistance / 60000).toFixed() + '\'' + (((time.hours() * 3600 + time.minutes() * 60 + time.seconds()) / (totalDistance / 1000)) % 60).toFixed().toString().padStart(2, '0') + '\"'
                                : '0'}</Text>
          </View>
          <View>
            <Text style={{ alignSelf: 'center' }}>칼로리</Text>
            <Text style={{ color: 'black', fontSize: 16, alignSelf: 'center' }}>{(0.0055 * totalDistance).toFixed(2)}</Text>
          </View>
        </View>
        <Image
          style={{ width: '87%', height: 240, alignSelf: 'center', marginVertical: 10 }}
          source={thumbnailUrl && thumbnailUrl !== null
            ? { uri: thumbnailUrl }
            : mapforcourseview}
        />
      </View>

      <View style={styles.space}></View>
      <View style={{ flexDirection: 'row', justifyContent: "space-around" }}>
        <TouchableOpacity
          style={styles.whitebutton} onPress={() => navigation.navigate('Main')}>
          <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>

            <Text style={styles.greentext}>
              러닝 종료</Text>

            <Image
              style={{ width: 11, height: 16, alignSelf: 'center' }}
              source={rightarrow}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.greenbutton} onPress={() => navigation.navigate('Reviewing', { id: id })}>
          <View style={{ flexDirection: 'row', justifyContent: "space-around" }}>
            <Text style={styles.whitetext}>리뷰 작성</Text>

            <Image
              style={{ width: 30, height: 30 }}
              source={whiteplus}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Runningend;