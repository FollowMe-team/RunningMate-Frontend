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



const MyCourse = () => {
  const navigation = useNavigation();

  return (
    <View>
      <View style={styles.space}></View>
      <View style={styles.space}></View>
      <View style={styles.bigbox}>
        <Text style={styles.blacktext}>내가 등록한 코스</Text>
        <View style={styles.smallbox}>
          <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
              <Text style={{ color: 'black', fontSize: 16, marginLeft: 22 }}>월미도 해안길</Text>
              <Image
                style={{ width: 18, height: 18, alignSelf: 'flex-end', marginLeft: 5 }}
                source={subscribe}
              />
            </View>
            <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
              <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginRight: 7, marginTop: 3 }}>
                <Image
                  style={{ width: 12, alignSelf: 'flex-end', height: 12, marginRight: 3 }}
                  source={location}
                />
                <Text
                  style={{ color: 'grey', fontSize: 8 }}
                >3.8KM</Text>
              </View>
              <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginRight: 12, marginTop: 3 }}>
                <Image
                  style={{ width: 12, alignSelf: 'flex-end', height: 12, marginRight: 3 }}
                  source={time}
                />
                <Text
                  style={{ color: 'grey', fontSize: 8 }}
                >30~40분</Text>
              </View>
            </View>
          </View>
          <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }}>
            <Text
              style={{ color: 'grey', fontSize: 12, marginLeft: 22 }}
            >인천 중구</Text>
            <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginRight: 12 }}>

              <Text
                style={{ color: 'grey', fontSize: 10, marginRight: 15, textAlignVertical: 'center' }}
              >5.3KM</Text>
              <Text
                style={{ textAlign: 'center', textAlignVertical: 'center', width: 30, height: 20, color: '#409E4B', fontSize: 9, backgroundColor: '#CFF3D0', borderRadius: 20 }}
              >쉬움</Text>
            </View>

          </View>
        </View>
        <View style={styles.smallbox}>


          <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
              <Text style={{ color: 'black', fontSize: 16, marginLeft: 22 }}>송도 센트럴파크</Text>
              <Image
                style={{ width: 18, height: 18, alignSelf: 'flex-end', marginLeft: 5 }}
                source={subscribe}
              />
            </View>
            <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
              <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginRight: 7, marginTop: 3 }}>
                <Image
                  style={{ width: 12, alignSelf: 'flex-end', height: 12, marginRight: 3 }}
                  source={location}
                />
                <Text
                  style={{ color: 'grey', fontSize: 8 }}
                >3.8KM</Text>
              </View>
              <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginRight: 12, marginTop: 3 }}>
                <Image
                  style={{ width: 12, alignSelf: 'flex-end', height: 12, marginRight: 3 }}
                  source={time}
                />
                <Text
                  style={{ color: 'grey', fontSize: 8 }}
                >30~40분</Text>
              </View>
            </View>
          </View>
          <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }}>
            <Text
              style={{ color: 'grey', fontSize: 12, marginLeft: 22 }}
            >인천 연수구</Text>
            <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginRight: 12 }}>

              <Text
                style={{ color: 'grey', fontSize: 10, marginRight: 15, textAlignVertical: 'center' }}
              >3.8KM</Text>
              <Text
                style={{ textAlign: 'center', textAlignVertical: 'center', width: 30, height: 20, color: '#409E4B', fontSize: 9, backgroundColor: '#CFF3D0', borderRadius: 20 }}
              >쉬움</Text>
            </View>
          </View>


        </View>
        <View style={styles.smallbox}>


          <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
              <Text style={{ color: 'black', fontSize: 16, marginLeft: 22 }}>계양산 둘레길</Text>
              <Image
                style={{ width: 18, height: 18, alignSelf: 'flex-end', marginLeft: 5 }}
                source={subscribe}
              />
            </View>
            <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
              <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginRight: 7, marginTop: 3 }}>
                <Image
                  style={{ width: 12, alignSelf: 'flex-end', height: 12, marginRight: 3 }}
                  source={location}
                />
                <Text
                  style={{ color: 'grey', fontSize: 8 }}
                >8.5KM</Text>
              </View>
              <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginRight: 12, marginTop: 3 }}>
                <Image
                  style={{ width: 12, alignSelf: 'flex-end', height: 12, marginRight: 3 }}
                  source={time}
                />
                <Text
                  style={{ color: 'grey', fontSize: 8 }}
                >1시간 이상</Text>
              </View>
            </View>
          </View>
          <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }}>
            <Text
              style={{ color: 'grey', fontSize: 12, marginLeft: 22 }}
            >인천 계양구</Text>
            <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginRight: 12 }}>

              <Text
                style={{ color: 'grey', fontSize: 10, marginRight: 13, textAlignVertical: 'center' }}
              >8.5KM</Text>
              <Text
                style={{ textAlign: 'center', textAlignVertical: 'center', width: 32, height: 20, color: '#E06464', fontSize: 9, backgroundColor: '#F3CFCF', borderRadius: 20 }}
              >어려움</Text>
            </View>
          </View>
        </View>
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