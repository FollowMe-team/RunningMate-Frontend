import React from 'react';
import { TextInput, TouchableOpacity, StyleSheet, View, Text, Alert, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Qmark from '../../assets/images/Course/Qmark.png';
import rightarrow from '../../assets/images/Course/rightarrow.png';
import whiteplus from '../../assets/images/Course/whiteplus.png';
import mapforcourseview from '../../assets/images/Course/mapforcourseview.png';

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



const Runningend = () => {
  const navigation = useNavigation();

  return (
    <View>

      <View style={{ height: 15 }}></View>
      <View style={{ borderRadius: 15, width: "90%", height: 'auto', backgroundColor: 'white', elevation: 7, alignSelf: 'center' }}>
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
        <Image
          style={{ width: '87%', height: 240, alignSelf: 'center', marginVertical: 10 }}
          source={mapforcourseview}
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
        <TouchableOpacity style={styles.greenbutton} onPress={() => navigation.navigate('Reviewing')}>
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