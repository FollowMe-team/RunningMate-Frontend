import React, { useState, useEffect } from 'react';
import {
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Alert,
  Pressable,
  Image,
} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Qmark from '../../assets/images/Course/Qmark.png';
import rightarrow from '../../assets/images/Course/rightarrow.png';
import whiteplus from '../../assets/images/Course/whiteplus.png';
import subscribe from '../../assets/images/Course/subscribe.png';
import location from '../../assets/images/Course/location.png';
import time from '../../assets/images/Course/time.png';
import subscribed from '../../assets/images/Course/subscribed.png';
import { getRecentCourse, getBookedCourse } from '../../utils/courseapi';

import Recentcourse from '../../components/Course/recentcourse';

import { ScrollView } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  container: {},

  searchbox: {
    borderRadius: 10,
    width: 350,
    height: 40,
    backgroundColor: 'white',
    alignSelf: 'center',
    elevation: 5,
    justifyContent: 'center',
  },

  space: { height: 15 },

  whitebutton: {
    width: 160,
    height: 60,
    borderColor: '#73D393',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },

  greentext: {
    color: '#73D393',
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 30,
    marginBottom: 4,
  },

  greenbutton: {
    width: 160,
    height: 60,
    borderColor: 'white',
    backgroundColor: '#73D393',
    borderWidth: 0,
    borderRadius: 15,
    FlexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
  },

  whitetext: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 12,
  },

  bigbox: {
    borderRadius: 15,
    width: 'auto',
    height: 'auto',
    backgroundColor: 'white',
    alignSelf: 'center',
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingLeft: 15,
    paddingRight: 15,
  },

  blacktext: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 7,
  },

  smallbox: {
    borderRadius: 15,
    width: 320,
    height: 50,
    backgroundColor: 'white',
    alignSelf: 'center',
    elevation: 7,
    justifyContent: 'space-around',
    marginBottom: 12,
  },

  smallbox_choosed: {
    borderRadius: 15,
    width: 320,
    height: 210,
    backgroundColor: 'white',
    alignSelf: 'center',
    elevation: 7,
    justifyContent: 'space-around',
    marginBottom: 12,
  },

  smallbox2: {
    borderRadius: 15,
    width: 320,
    height: 50,
    backgroundColor: '#EBEBEB',
    alignSelf: 'center',
    justifyContent: 'space-around',
    marginBottom: 12,
  },

  smallbox_text2: {
    color: '#AAA7A7',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

const Course_basic = () => {
  const navigation = useNavigation();
  const [recentCourse, setrecentCourse] = useState([]);
  const [bookedCourse, setbookedCourse] = useState([]);
  
  const isFocused = useIsFocused();
  useEffect(() => {
    if ( isFocused){
    const fetchrecentCourse = async () => {
      result = await getRecentCourse();
      setrecentCourse(result.data);
    };
    fetchrecentCourse();
    const fetchbookedCourse = async () => {
      const result = await getBookedCourse();
      setbookedCourse(result.data);
    };
    fetchbookedCourse();
  }
  }, [isFocused/*, bookedCourse*/]);

  return (
    <ScrollView>
      <View style={{ height: 15 }}></View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Coursesearch')}
        style={styles.searchbox}
      >
        <Image
          style={{
            width: 30,
            height: 30,
            marginLeft: 5,
            backgroundColor: 'white',
            justifyContent: 'center',
          }}
          source={Qmark}
        />
      </TouchableOpacity>
      <View style={styles.space}></View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <TouchableOpacity
          style={styles.whitebutton}
          onPress={() => navigation.navigate('Courserecommend')}
        >
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={styles.greentext}>코스 추천</Text>
            <Image
              style={{ width: 11, height: 16, alignSelf: 'center' }}
              source={rightarrow}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.greenbutton}
          onPress={() => navigation.navigate('MyCourse')}
        >
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-around' }}
          >
            <Text style={styles.whitetext}>코스 등록</Text>
            <Image style={{ width: 30, height: 30 }} source={whiteplus} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.space}></View>
      <View style={styles.bigbox}>
        <Text style={styles.blacktext}>최근 코스</Text>
        <Recentcourse data={recentCourse} />
      </View>
      <View style={{ height: 30 }}></View>
      <View style={styles.bigbox}>
        <Text style={styles.blacktext}>즐겨찾기</Text>
        <Recentcourse data={bookedCourse} />
      </View>
      <View style={{ height: 100 }}></View>
    </ScrollView>
  );
};

export default Course_basic;
