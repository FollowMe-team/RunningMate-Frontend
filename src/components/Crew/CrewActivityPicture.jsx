import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  Text,
} from 'react-native';

import gallery from '../../assets/images/Crew/free-icon-image-gallery-3342137.png';

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
      {profileUrls.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Image source={gallery} style={styles.galleryIcon} />
          <Text style={styles.emptyText}>
            아직 크루 활동 사진이 없어요...{'\n'}
            아래의 갤러리 편집 버튼을 눌러 업로드해주세요!
          </Text>
        </View>
      ) : (
        <>
          <ScrollView
            horizontal
            pagingEnabled
            onScroll={handleScroll}
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
          >
            {profileUrls.map((url, index) => (
              <View key={index} style={styles.imageContainer}>
                <Image
                  source={{ uri: url }}
                  style={styles.crewActivityPicture}
                />
              </View>
            ))}
          </ScrollView>
          <View style={styles.pagination}>
            {profileUrls.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  { opacity: index === activeIndex ? 1 : 0.3 },
                ]}
              />
            ))}
          </View>
        </>
      )}
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
    marginBottom: 10,
  },
  galleryIcon: {
    width: 100,
    height: 100,
    marginBottom: 10,
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
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
    backgroundColor: '#595959',
    borderRadius: 10,
  },
  emptyText: {
    textAlign: 'center',
    color: 'white',
    marginTop: 10,
  },
});

CrewActivityPicture.propTypes = {
  profileUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CrewActivityPicture;
