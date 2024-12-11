import React, { useState } from 'react';
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
import { useNavigation } from '@react-navigation/native';

import subscribe from '../../assets/images/Course/subscribe.png';
import location from '../../assets/images/Course/location.png';
import time from '../../assets/images/Course/time.png';
import subscribed from '../../assets/images/Course/subscribed.png';

const styles = StyleSheet.create({
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

  lowlevel: {
    textAlign: 'center',
    textAlignVertical: 'center',
    width: 'auto',
    paddingHorizontal: 5,
    height: 20,
    color: '#409E4B',
    fontSize: 9,
    backgroundColor: '#CFF3D0',
    borderRadius: 20,
  },
  middlelevel: {
    textAlign: 'center',
    textAlignVertical: 'center',
    width: 'auto',
    paddingHorizontal: 5,
    height: 20,
    color: '#A9AB35',
    fontSize: 9,
    backgroundColor: '#FBFF7F',
    borderRadius: 20,
  },
  highlevel: {
    textAlign: 'center',
    textAlignVertical: 'center',
    width: 'auto',
    paddingHorizontal: 5,
    height: 20,
    color: '#E06464',
    fontSize: 9,
    backgroundColor: '#F3CFCF',
    borderRadius: 20,
  },
});

const Course_basic = ({ data }) => {
  const navigation = useNavigation();
  const [isFollowing, setIsFollowing] = useState(data.isFollowing);

  const handleFollow = () => {
    const newFollow = !isFollowing;
    setIsFollowing(newFollow);
  };

  return (
    <View style={styles.smallbox}>
      <View
        style={{
          flexWrap: 'wrap',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
          <Text style={{ color: 'black', fontSize: 16, marginLeft: 22 }}>
            {data.name}
          </Text>
          <TouchableOpacity onPress={handleFollow}>
            <View>
              <Image
                style={{ width: 18, height: 18, marginLeft: 5, marginTop: 4 }}
                source={isFollowing === true ? subscribe : subscribed}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
          <View
            style={{
              flexWrap: 'wrap',
              flexDirection: 'row',
              marginRight: 7,
              marginTop: 3,
            }}
          >
            <Image
              style={{
                width: 12,
                alignSelf: 'flex-end',
                height: 12,
                marginRight: 3,
              }}
              source={location}
            />
            <Text style={{ color: 'grey', fontSize: 8 }}>{data.distance}</Text>
          </View>
          <View
            style={{
              flexWrap: 'wrap',
              flexDirection: 'row',
              marginRight: 12,
              marginTop: 3,
            }}
          >
            <Image
              style={{
                width: 12,
                alignSelf: 'flex-end',
                height: 12,
                marginRight: 3,
              }}
              source={time}
            />
            <Text style={{ color: 'grey', fontSize: 8 }}>{data.time}</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexWrap: 'wrap',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 3,
        }}
      >
        <Text style={{ color: 'grey', fontSize: 12, marginLeft: 22 }}>
          {data.location}
        </Text>
        <View
          style={{ flexWrap: 'wrap', flexDirection: 'row', marginRight: 12 }}
        >
          <Text
            style={{
              color: 'grey',
              fontSize: 10,
              marginRight: 15,
              textAlignVertical: 'center',
            }}
          >
            {data.distancetoCourse}
          </Text>
          <Text
            style={[
              data.level === '쉬움' && styles.lowlevel,
              data.level === '보통' && styles.middlelevel,
              data.level === '어려움' && styles.highlevel,
              data.level === '승인 완료' && styles.lowlevel,
              data.level === '승인 대기중' && styles.middlelevel,
              data.level === '승인 거부' && styles.highlevel,
            ]}
          >
            {data.level}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Course_basic;
