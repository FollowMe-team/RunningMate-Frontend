import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';

import BadgeGetIcon from '../../assets/images/MyProfile/free-icon-success-14658892.png';
import BadgeNotGetIcon from '../../assets/images/MyProfile/free-icon-nonsuccess-14658892.png';

const ActivityView = ({ badges }) => {
  const [selectedBadge, setSelectedBadge] = useState(null);

  const handleBadgePress = badge => {
    setSelectedBadge(badge);
  };

  const handleCloseModal = () => {
    setSelectedBadge(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.badgeTextContainer}>
        <Text style={styles.badgeTextTitle}>획득한 배지 수</Text>
        <Text style={styles.badgeCount}>
          {badges.filter(badge => badge.isAcquired).length}
        </Text>
        <View style={styles.badgeTotalContainer}>
          <Text style={styles.badgeTotalText}>/</Text>
          <Text style={styles.badgeTotalText}>{badges.length}</Text>
        </View>
      </View>
      <View style={styles.badgeContainer}>
        {badges.map((badge, index) => (
          <TouchableOpacity
            key={index}
            style={styles.badgeIconContainer}
            onPress={() => handleBadgePress(badge)}
          >
            <Image
              source={badge.isAcquired ? BadgeGetIcon : BadgeNotGetIcon}
              style={styles.badgeIcon}
            />
          </TouchableOpacity>
        ))}
      </View>
      {selectedBadge && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={!!selectedBadge}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={
                    selectedBadge.isAcquired ? BadgeGetIcon : BadgeNotGetIcon
                  }
                  style={styles.badgeIcon}
                />
                <Text style={styles.modalTitle}>{selectedBadge.name}</Text>
              </View>
              <Text style={styles.modalDescription}>
                {selectedBadge.description}
              </Text>
              <TouchableOpacity
                onPress={handleCloseModal}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    width: '100%',
    marginBottom: 375,
  },
  badgeTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  badgeTextTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  badgeCount: {
    fontSize: 70,
    fontWeight: 'bold',
    color: '#73D393',
    alignItems: 'flex-start',
  },
  badgeTotalContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  badgeTotalText: {
    fontSize: 32,
    color: 'black',
    alignItems: 'end',
  },
  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#DDDDDD',
  },
  badgeIconContainer: {
    marginBottom: 10,
  },
  badgeIcon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescription: {
    color: 'black',
    fontSize: 16,
    marginTop: 20,
    marginBottom: 50,
  },
  closeButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#73D393',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

ActivityView.propTypes = {
  badges: PropTypes.arrayOf(
    PropTypes.shape({
      isAcquired: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default ActivityView;
