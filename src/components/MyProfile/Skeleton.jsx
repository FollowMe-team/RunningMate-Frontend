import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const Skeleton = () => {
  return (
    <SkeletonPlaceholder>
      <View style={styles.container}>
        <View style={styles.profileImage} />
        <View style={styles.text} />
        <View style={styles.text} />
        <View style={styles.text} />
        <View style={styles.text} />
      </View>
    </SkeletonPlaceholder>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 16,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#DDDDDD',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  text: {
    width: '100%',
    height: 20,
    borderRadius: 4,
    marginBottom: 10,
  },
});

export default Skeleton;
