import React from 'react';
import { TextInput, TouchableOpacity, StyleSheet, View, Text, Alert, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Qmark from '../../assets/images/Course/Qmark.png';
import rightarrow from '../../assets/images/Course/rightarrow.png';
import whiteplus from '../../assets/images/Course/whiteplus.png';
import subscribe from '../../assets/images/Course/subscribe.png';
import location from '../../assets/images/Course/location.png';
import time from '../../assets/images/Course/time.png';
import subscribed from '../../assets/images/Course/subscribed.png'

const styles = StyleSheet.create({
  container: {
  },

  searchbox: {
    borderRadius: 10, width: 350, height: 40, backgroundColor: 'white', alignSelf: 'center',
    elevation: 5, justifyContent: 'center'
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

  bigbox: {
    borderRadius: 15, width: 'auto', height: 'auto', backgroundColor: 'white', alignSelf: 'center',
    elevation: 5, alignItems: 'center', justifyContent: "space-around", paddingLeft: 15, paddingRight: 15
  },

  blacktext: { color: 'black', fontSize: 18, fontWeight: 'bold', paddingVertical: 7 },

  smallbox: {
    borderRadius: 15, width: 320, height: 50, backgroundColor: 'white', alignSelf: 'center',
    elevation: 7, justifyContent: 'space-around', marginBottom: 12
  },

  smallbox_choosed: {
    borderRadius: 15, width: 320, height: 210, backgroundColor: 'white', alignSelf: 'center',
    elevation: 7, justifyContent: 'space-around', marginBottom: 12
  },

  smallbox2: {
    borderRadius: 15, width: 320, height: 50, backgroundColor: '#EBEBEB', alignSelf: 'center',
    justifyContent: 'space-around', marginBottom: 12
  },

  smallbox_text2: { color: '#AAA7A7', fontSize: 16, fontWeight: 'bold', textAlign: 'center', textAlignVertical: 'center'},

});



const Course_basic = () => {
  const navigation = useNavigation();

  return (
    <View>

      <View style={{ height: 15 }}></View>
      <TouchableOpacity onPress={() => navigation.navigate('Coursesearch')}
        style={styles.searchbox}>
        <Image
          style={{
            width: 30, height: 30, marginLeft: 5,
            backgroundColor: 'white', justifyContent: 'center'
          }}
          source={Qmark}
        />
      </TouchableOpacity>
      <View style={styles.space}></View>
      <View style={{ flexDirection: 'row', justifyContent: "space-around" }}>
        <TouchableOpacity
          style={styles.whitebutton} onPress={() => navigation.navigate('Courserecommend')}>
          <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>

            <Text style={styles.greentext}>
              코스 추천</Text>

            <Image
              style={{ width: 11, height: 16, alignSelf: 'center' }}
              source={rightarrow}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.greenbutton} onPress={() => navigation.navigate('MyCourse')}>
          <View style={{ flexDirection: 'row', justifyContent: "space-around" }}>
            <Text style={styles.whitetext}>코스 등록</Text>

            <Image
              style={{ width: 30, height: 30 }}
              source={whiteplus}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.space}></View>
      <View style={styles.bigbox}>
        <Text style={styles.blacktext}>최근 코스</Text>
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
      <View style={{ height: 30 }}></View>
      <View style={styles.bigbox}>
        <Text
          style={styles.blacktext}
        >즐겨찾기</Text>
        <View style={styles.smallbox2}>
          <Text style={styles.smallbox_text2}>
            아직 등록된 코스가 없습니다.
          </Text>
        </View>
        </View>

    </View>
  );
}

export default Course_basic;