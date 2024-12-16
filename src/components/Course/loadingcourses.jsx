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

  smallbox2: {
    borderRadius: 15, width: 320, height: 50, backgroundColor: '#EBEBEB', alignSelf: 'center',
    justifyContent: 'space-around', marginBottom: 12
  },

  smallbox_text2: { color: '#AAA7A7', fontSize: 16, fontWeight: 'bold', textAlign: 'center', textAlignVertical: 'center'},

});



const SimpleNoCourse = () => {

  return (
        <View style={styles.smallbox2}>
          <Text style={styles.smallbox_text2}>
          추천중입니다.
          </Text>
        </View>
  );
}

export default SimpleNoCourse;