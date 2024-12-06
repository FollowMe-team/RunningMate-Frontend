import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import CrewActivityPhotoPicker from './CrewActivityPhotoPicker';

import deleteIcon from '../../assets/images/Crew/free-icon-delete-button-3138336.png';

const { width } = Dimensions.get('window');

const EditCrewActivityPicture = ({ profileUrls }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [photos, setPhotos] = useState(profileUrls);

  const handleScroll = event => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setActiveIndex(index);
  };

  const handlePhotoAdded = newPhoto => {
    if (newPhoto) {
      setPhotos([...photos, newPhoto]);
      setActiveIndex(photos.length); // 새 사진이 추가된 페이지로 이동
    }
  };

  const handlePhotoDelete = index => {
    const updatedPhotos = photos.filter((_, i) => i !== index);
    setPhotos(updatedPhotos);
    setActiveIndex(Math.max(0, activeIndex - 1)); // 삭제 후 인덱스 조정
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
        {photos.map((url, index) => (
          <View key={index} style={styles.imageContainer}>
            <TouchableOpacity
              style={styles.deleteOverlay}
              onPress={() => handlePhotoDelete(index)}
            >
              <Image source={deleteIcon} style={styles.deleteIcon} />
            </TouchableOpacity>
            <Image source={{ uri: url }} style={styles.crewActivityPicture} />
          </View>
        ))}
        <CrewActivityPhotoPicker setPhoto={handlePhotoAdded} />
      </ScrollView>
      <View style={styles.pagination}>
        {photos.map((_, index) => (
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
    position: 'relative',
  },
  crewActivityPicture: {
    width: '100%',
    height: 300,
  },
  deleteOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  deleteIcon: {
    width: 50,
    height: 50,
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

EditCrewActivityPicture.propTypes = {
  profileUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default EditCrewActivityPicture;
