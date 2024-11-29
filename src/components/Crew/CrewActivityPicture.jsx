import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const CrewActivityPicture = ({ profileUrls }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = event => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setActiveIndex(index);
  };

  return (
    <View>
      <ScrollView
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
      >
        {profileUrls.map((url, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={{ uri: url }} style={styles.crewActivityPicture} />
          </View>
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        {profileUrls.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, { opacity: index === activeIndex ? 1 : 0.3 }]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  crewActivityPicture: {
    width: '100%',
    height: 300,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: '#595959',
    marginHorizontal: 4,
  },
});

CrewActivityPicture.propTypes = {
  profileUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CrewActivityPicture;
