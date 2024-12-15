import React, { useRef } from 'react';
import { Animated, StyleSheet, ScrollView, View, Text } from 'react-native';

const DynamicHeightView = () => {
  const heightAnim = useRef(new Animated.Value(100)).current; // 초기 높이 100

  const onScroll = event => {
    const scrollY = event.nativeEvent.contentOffset.y;
    const newHeight = Math.max(100, 300 - scrollY); // 최소 높이 100, 최대 높이 300

    // Animated.spring 사용 (더 빠른 반응)
    Animated.spring(heightAnim, {
      toValue: newHeight,
      friction: 8, // 마찰력 설정 (값이 작을수록 빠름)
      tension: 100, // 긴장도 설정 (값이 클수록 빠름)
      useNativeDriver: false, // height에 애니메이션 적용
    }).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.dynamicView, { height: heightAnim }]}>
        <Text style={styles.text}>동적으로 높이가 변하는 뷰</Text>
      </Animated.View>
      <ScrollView
        style={styles.scrollView}
        onScroll={onScroll}
        scrollEventThrottle={16} // 스크롤 이벤트의 감지 빈도
      >
        <View style={styles.content}>
          <Text style={styles.text}>스크롤 해보세요!</Text>
          {Array(50)
            .fill(null)
            .map((_, index) => (
              <Text key={index} style={styles.listItem}>
                항목 {index + 1}
              </Text>
            ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dynamicView: {
    backgroundColor: '#4CAF50',
    width: '80%',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  listItem: {
    marginVertical: 8,
    fontSize: 14,
    color: '#333',
  },
});

export default DynamicHeightView;
