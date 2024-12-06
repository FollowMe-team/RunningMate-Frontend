import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import reviewerData from './reviewer.json';
import profileImageDefault from '../../assets/images/Settings/profile.png';
import good from '../../assets/images/MyProfile/good.png';
import bad from '../../assets/images/MyProfile/bad.png';

const formatDate = dateString => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now - date;
  const diffMinutes = Math.floor(diff / (1000 * 60));
  const diffHours = Math.floor(diff / (1000 * 60 * 60));

  if (diffMinutes < 60) {
    return `${diffMinutes}분 전`;
  } else if (diffHours < 24) {
    return `${diffHours}시간 전`;
  } else {
    return dateString;
  }
};

const FootprintFigure = ({ onClose }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleClose = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => onClose());
  };

  const sortedReviews = reviewerData
    .slice(0, 5)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <Animated.View style={[styles.modalBackground, { opacity: fadeAnim }]}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalText}>나의 발걸음 리뷰</Text>
        <ScrollView>
          {sortedReviews.map(review => (
            <FootprintReview key={review.id} review={review} />
          ))}
        </ScrollView>
        <TouchableOpacity onPress={handleClose}>
          <Text style={styles.modalButtonText}>나가기</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const FootprintReview = ({ review }) => {
  return (
    <View style={styles.reviewContainer}>
      <View style={styles.reviewTitleSet}>
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={profileImageDefault}
            style={{ width: 30, height: 30, borderRadius: 100 }}
          />
          <Text style={styles.reviewTitleText}>{review.nickname}</Text>
          <Text style={styles.reviewDateText}>{formatDate(review.date)}</Text>
        </View>
        <Image
          source={review.isGood ? good : bad}
          style={{ width: 20, height: 20 }}
        />
      </View>
      <Text style={styles.reviewText}>{review.review}</Text>
    </View>
  );
};

FootprintReview.propTypes = {
  review: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nickname: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    isGood: PropTypes.bool.isRequired,
    review: PropTypes.string.isRequired,
  }).isRequired,
};

FootprintFigure.propTypes = {
  onClose: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  modalBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 350,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#352555',
    textAlign: 'center',
    marginBottom: 15,
  },
  modalButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#00C81B',
    marginTop: 15,
  },
  reviewContainer: {
    width: 300,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 10,
  },
  reviewTitleSet: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  reviewTitleText: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'regular',
    lineHeight: 20,
    marginHorizontal: 5,
  },
  reviewDateText: {
    color: '#A8A5Af',
    fontSize: 10,
    fontWeight: 'regular',
    lineHeight: 20,
  },
  reviewText: {
    color: 'black',
    fontSize: 12,
    fontWeight: 'regular',
    lineHeight: 20,
  },
});

export default FootprintFigure;
