import React from 'react';
import { TextInput, TouchableOpacity, StyleSheet, View, Text, Alert, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const styles = StyleSheet.create({

  smallbox2: {
    borderRadius: 15, width: 320, height: 50, backgroundColor: '#EBEBEB', alignSelf: 'center',
    justifyContent: 'space-around', marginBottom: 12
  },

  smallbox_text2: { color: '#AAA7A7', fontSize: 16, fontWeight: 'bold', textAlign: 'center', textAlignVertical: 'center' },

});



const SimpleNoCourse = () => {

  return (
    <SkeletonPlaceholder>
      <View style={styles.smallbox2}>
        <Text style={styles.smallbox_text2}>
          추천중입니다.
        </Text>
      </View>
    </SkeletonPlaceholder>
  );
}

export default SimpleNoCourse;