import React from 'react';
import { TextInput, TouchableOpacity, StyleSheet, View, Text, Alert, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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
          적합한 추천 코스가 없습니다.
          </Text>
        </View>
  );
}

export default SimpleNoCourse;