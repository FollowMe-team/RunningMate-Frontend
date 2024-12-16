import React, { useRef, useEffect } from 'react';
import { View, Image, StyleSheet, ScrollView, Animated } from 'react-native';

import expectation1 from '../../assets/images/Expectations_effects_1.png';
import expectation2 from '../../assets/images/Expectations_effects_2.png';
import expectation3 from '../../assets/images/Expectations_effects_3.png';
import expectation4 from '../../assets/images/Expectations_effects_4.png';

export default function Community() {
  const fadeAnim1 = useRef(new Animated.Value(0)).current;
  const fadeAnim2 = useRef(new Animated.Value(0)).current;
  const fadeAnim3 = useRef(new Animated.Value(0)).current;
  const fadeAnim4 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.stagger(500, [
      Animated.timing(fadeAnim1, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim2, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim3, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim4, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim1, fadeAnim2, fadeAnim3, fadeAnim4]);

  return (
    <ScrollView style={styles.container}>
      <Animated.Image
        source={expectation1}
        style={[styles.img, styles.left, { opacity: fadeAnim1 }]}
      />
      <Animated.Image
        source={expectation2}
        style={[styles.img, styles.right, { opacity: fadeAnim2 }]}
      />
      <Animated.Image
        source={expectation3}
        style={[styles.img, styles.left, { opacity: fadeAnim3 }]}
      />
      <Animated.Image
        source={expectation4}
        style={[
          styles.img,
          styles.right,
          { opacity: fadeAnim4, marginBottom: 100 },
        ]}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  img: {
    width: 215,
    height: 300,
  },
  left: {
    alignSelf: 'flex-start',
  },
  right: {
    alignSelf: 'flex-end',
  },
});
