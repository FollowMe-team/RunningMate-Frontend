import React, { useEffect, useRef, useState } from 'react';
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
import { getFootprints } from '../../utils/api';
import Rank from '../Rank';
import Footprint from '../Footprint';

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
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchFootprints = async () => {
      const result = await getFootprints();
      if (result.success) {
        setReviews(result.data);
      } else {
        console.error(result.message);
      }
    };
    fetchFootprints();
  }, []);

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

  const sortedReviews = reviews
    .slice(0, 5)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <View style={styles.modalBackground}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalText}>나의 발걸음 리뷰</Text>
        <ScrollView>
          {sortedReviews.length > 0 ? (
            sortedReviews.map(review => (
              <FootprintReview key={review.footprintId} review={review} />
            ))
          ) : (
            <View style={styles.noReviewsContainer}>
              <Text style={styles.noReviewsText}>
                리뷰한 사용자가 없습니다...
              </Text>
            </View>
          )}
        </ScrollView>
        <TouchableOpacity onPress={handleClose}>
          <Text style={styles.modalButtonText}>나가기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const FootprintReview = ({ review }) => {
  const profileImageSource = review.memberInfo?.profileImageUrl
    ? { uri: review.memberInfo.profileImageUrl }
    : profileImageDefault;

  return (
    <View style={styles.reviewContainer}>
      <View style={styles.reviewTitleSet}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={profileImageSource}
            style={{ width: 30, height: 30, borderRadius: 100 }}
          />
          <Text style={styles.reviewTitleText}>
            {review.memberInfo?.nickname || '익명'}
          </Text>
          {review.memberInfo && (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: 5,
                }}
              >
                <Rank rank={review.memberInfo.ranking} />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: 5,
                }}
              >
                <Footprint experience={review.memberInfo.footPrint} />
              </View>
            </>
          )}
          <Text style={styles.reviewDateText}>
            {formatDate(review.createdAt)}
          </Text>
        </View>
        <Image
          source={review.footprintType === 'GOOD' ? good : bad}
          style={{ width: 20, height: 20 }}
        />
      </View>
      <Text style={styles.reviewText}>{review.content}</Text>
    </View>
  );
};

FootprintReview.propTypes = {
  review: PropTypes.shape({
    footprintId: PropTypes.number.isRequired,
    memberInfo: PropTypes.shape({
      nickname: PropTypes.string,
      profileImageUrl: PropTypes.string,
      ranking: PropTypes.string,
      footPrint: PropTypes.number,
    }),
    footprintType: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

FootprintFigure.propTypes = {
  onClose: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
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
  noReviewsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  noReviewsText: {
    fontSize: 16,
    color: 'gray',
  },
});

export default FootprintFigure;
