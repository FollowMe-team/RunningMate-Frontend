import React from 'react';
import { TextInput, StyleSheet, View, Text, Alert, Pressable, Image } from 'react-native';

import Qmark from '../../assets/images/Course/Qmark.png';
import rightarrow from '../../assets/images/Course/rightarrow.png';
import whiteplus from '../../assets/images/Course/whiteplus.png';
import subscribe from '../../assets/images/Course/subscribe.png';
import location from '../../assets/images/Course/location.png';
import time from '../../assets/images/Course/time.png';
import subscribed from '../../assets/images/Course/subscribed.png'
import star from '../../assets/images/Course/star.png';
import runner from '../../assets/images/Course/runner.png';
import mapview from '../../assets/images/Course/mapforcourseview.png';
import runningman from '../../assets/images/Course/runningman.png';
import greenQmark from '../../assets/images/Course/Qmark_green.png';

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
    borderRadius: 15, width: 320, height: 410, backgroundColor: 'white', alignSelf: 'center',
    elevation: 7, justifyContent: 'space-around', marginBottom: 12
  },


  greensharptext: {
    height: 24, marginRight: 10, width: 'auto', paddingLeft: 10, paddingRight: 10,
    borderColor: 'white',
    backgroundColor: '#73D393',
    borderWidth: 0,
    borderRadius: 20,
    color: 'white', fontSize: 10, fontWeight: 'bold'
    , marginRight: 15, marginleft: 15, textAlign: 'center', textAlignVertical: 'center'
  },

  whitebutton_look: {
    width: 130, height: 35,
    borderColor: '#73D393',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 20, marginLeft: 22,
    alignItems: "center", justifyContent: "center", flexDirection: 'row'
  },

  greentext_look: { color: '#73D393', fontSize: 16, fontWeight: 'bold', marginRight: 12, textAlign: 'center' },

  greenbutton_run: {
    width: 130, height: 35,
    borderColor: 'white',
    backgroundColor: '#73D393',
    borderWidth: 0, marginRight: 22,
    borderRadius: 20, FlexDirection: 'row-reverse',
    alignItems: "center", justifyContent: "center", flexDirection: 'row'
  },

  whitetext_run: { color: 'white', fontSize: 16, fontWeight: 'bold', marginRight: 12, textAlign: 'center' },

});



export default function Course() {
  return (
    <View>
      <TextInput
        style={styles.searchbox}>
        <Image
          style={{
            width: 40, height: 40,
            backgroundColor: 'white', justifyContent: 'center'
          }}
          source={Qmark}
        />
      </TextInput>
      <View style={styles.space}></View>
      <View style={{ flexDirection: 'row', justifyContent: "space-around" }}>
        <Pressable
          style={styles.whitebutton}>
          <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
            <Text style={styles.greentext}>
              코스 추천</Text>
            <Image
              style={{ width: 11, height: 16, alignSelf: 'center' }}
              source={rightarrow}
            />
          </View>
        </Pressable>
        <Pressable style={styles.greenbutton}>
          <View style={{ flexDirection: 'row', justifyContent: "space-around" }}>
            <Text style={styles.whitetext}>코스 등록</Text>
            <Image
              style={{ width: 30, height: 30 }}
              source={whiteplus}
            />
          </View>
        </Pressable>
      </View>
      <View style={styles.space}></View>
      <View style={styles.bigbox}>
        <Text style={styles.blacktext}>최근 코스</Text>
        <View style={styles.smallbox_choosed}>
          <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
              <Text style={{ color: 'black', fontSize: 16, marginLeft: 22 }}>문학산 등산로</Text>
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
                >7.5KM</Text>
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
            >인천 미추홀구</Text>
            <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginRight: 12 }}>

              <Text
                style={{ color: 'grey', fontSize: 10, marginRight: 13, textAlignVertical: 'center' }}
              >7.5KM</Text>
              <Text
                style={{ textAlign: 'center', textAlignVertical: 'center', width: 32, height: 20, color: '#E06464', fontSize: 9, backgroundColor: '#F3CFCF', borderRadius: 20 }}
              >어려움</Text>
            </View>
          </View>
          <Text style={{ marginLeft: 22, marginRight: 22, color: 'black' }}>산을 따라서 달리는 하드코어 러닝 코스입니다.
            숙련자만 달리시길 권장드립니다.
          </Text>
          <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>

            <View style={{ marginLeft: 22, marginRight: 15, flexWrap: 'wrap', flexDirection: 'row' }}>
              <Image
                style={{ width: 16, height: 16, marginRight: 7 }}
                source={star}
              />
              <Text style={{ fontSize: 12 }}>
                4.5
              </Text>
            </View>
            <View style={{ flexWrap: 'wrap', flexDirection: 'row', alignItems: 'center' }}>
              <Image
                style={{ width: 14, height: 14, marginRight: 7 }}
                source={runner}
              />
              <Text style={{ fontSize: 12 }}>
                1000명
              </Text>
            </View>
          </View>
          <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginLeft: 22 }}>
            <Text style={styles.greensharptext}># 산</Text>
            <Text style={styles.greensharptext}># 경사 높음</Text>
            <Text style={styles.greensharptext}># 계단 있음</Text>
          </View>
          <Image
            style={{ width: 276, height: 160, marginRight: 7, alignSelf: 'center' }}
            source={mapview}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={styles.whitebutton_look}>
              <Text style={styles.greentext_look}>
                상세 보기
              </Text>
              <Image
                style={{ width: 14, height: 14 }}
                source={greenQmark}
              />
            </View>
            <View style={styles.greenbutton_run}>
              <Text style={styles.whitetext_run}>
                달리기
              </Text>
              <Image
                style={{ width: 14, height: 14 }}
                source={runningman}
              />
            </View>
          </View>
        </View>
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
      </View>
      <View style={{ height: 30 }}></View>
      <View style={styles.bigbox}>
        <Text
          style={styles.blacktext}
        >즐겨찾기</Text><View style={styles.smallbox}>
          <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
              <Text style={{ color: 'black', fontSize: 16, marginLeft: 22 }}>청라 호수공원</Text>
              <Image
                style={{ width: 18, height: 18, alignSelf: 'flex-end', marginLeft: 5 }}
                source={subscribed}
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
                >4.2KM</Text>
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
            >인천 서구</Text>
            <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginRight: 12 }}>

              <Text
                style={{ color: 'grey', fontSize: 10, marginRight: 15, textAlignVertical: 'center' }}
              >4.2KM</Text>
              <Text
                style={{ textAlign: 'center', textAlignVertical: 'center', width: 30, height: 20, color: '#A9AB35', fontSize: 9, backgroundColor: '#FBFF7F', borderRadius: 20 }}
              >보통</Text>
            </View>

          </View>
        </View>
        <View style={styles.smallbox}>


          <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
              <Text style={{ color: 'black', fontSize: 16, marginLeft: 22 }}>인천대공원</Text>
              <Image
                style={{ width: 18, height: 18, alignSelf: 'flex-end', marginLeft: 5 }}
                source={subscribed}
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
                >6KM</Text>
              </View>
              <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginRight: 12, marginTop: 3 }}>
                <Image
                  style={{ width: 12, alignSelf: 'flex-end', height: 12, marginRight: 3 }}
                  source={time}
                />
                <Text
                  style={{ color: 'grey', fontSize: 8 }}
                >40~50분</Text>
              </View>
            </View>
          </View>
          <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }}>
            <Text
              style={{ color: 'grey', fontSize: 12, marginLeft: 22 }}
            >인천 남동구</Text>
            <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginRight: 12 }}>

              <Text
                style={{ color: 'grey', fontSize: 10, marginRight: 15, textAlignVertical: 'center' }}
              >6KM</Text>
              <Text
                style={{ textAlign: 'center', textAlignVertical: 'center', width: 30, height: 20, color: '#A9AB35', fontSize: 9, backgroundColor: '#FBFF7F', borderRadius: 20 }}
              >보통</Text>
            </View>
          </View>


        </View>
        <View style={styles.smallbox}>


          <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
              <Text style={{ color: 'black', fontSize: 16, marginLeft: 22 }}>문학산 등산로</Text>
              <Image
                style={{ width: 18, height: 18, alignSelf: 'flex-end', marginLeft: 5 }}
                source={subscribed}
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
                >7KM</Text>
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
            >인천 미추홀구</Text>
            <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginRight: 12 }}>

              <Text
                style={{ color: 'grey', fontSize: 10, marginRight: 13, textAlignVertical: 'center' }}
              >7KM</Text>
              <Text
                style={{ textAlign: 'center', textAlignVertical: 'center', width: 32, height: 20, color: '#E06464', fontSize: 9, backgroundColor: '#F3CFCF', borderRadius: 20 }}
              >어려움</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
