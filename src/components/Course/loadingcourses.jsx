import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';

const SimpleNoCourse = () => {
  // 애니메이션 값 초기화
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 애니메이션 반복
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1, // 완전히 보이도록
          duration: 1000, // 1초 동안
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0, // 사라지도록
          duration: 1000, // 1초 동안
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [fadeAnim]);

  return (
    <View style={styles.smallbox2}>
      <Animated.Text style={[styles.smallbox_text2, { opacity: fadeAnim }]}>
        추천중입니다.
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  smallbox2: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  smallbox_text2: {
    fontSize: 18,
    color: '#333',
  },
});

export default SimpleNoCourse;
