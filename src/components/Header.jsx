import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import PropTypes from 'prop-types';

import back from '../assets/images/NaviIcon/left.png';
import settingsIcon from '../assets/images/NaviIcon/web-settings.png';
import apply from '../assets/images/Crew/online-registration.png';
import modification from '../assets/images/Crew/edit-file.png';
import kakao from '../assets/images/Crew/bubble-chat.png';
import { getCrewApplicants } from '../utils/crew/crew2';

const Header = ({
  title,
  navigation,
  hideBackButton,
  hideSettingButton,
  showApplyButton,
  openChatUrl,
  showModificationButton,
  applyCount,
  crew, // crew 객체를 props로 받음
}) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.timing(scaleValue, {
      toValue: 0.9,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handleApplyButtonPress = async () => {
    try {
      const applicants = await getCrewApplicants(crew.id);
      navigation.navigate('ApplyList', { applicants });
    } catch (error) {
      console.error('Failed to fetch crew applicants:', error);
      alert('크루 신청자 목록을 불러오는데 실패했습니다.');
    }
  };

  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={styles.leftContainer}>
        {!hideBackButton && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <Animated.View
              style={[
                styles.backButtonCircle,
                { transform: [{ scale: scaleValue }] },
              ]}
            >
              <Image source={back} style={styles.backIcon} />
            </Animated.View>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.rightContainer}>
        {showApplyButton && (
          <TouchableOpacity
            onPress={handleApplyButtonPress} // 수정된 부분
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={styles.rightButton}
            activeOpacity={0.7}
          >
            <Animated.View
              style={[
                styles.settingButtonCircle,
                { transform: [{ scale: scaleValue }] },
              ]}
            >
              <Image source={apply} style={styles.rightIcon} />
              {applyCount > 0 && (
                <View style={styles.applyCountBadge}>
                  <Text style={styles.applyCountText}>{applyCount}</Text>
                </View>
              )}
            </Animated.View>
          </TouchableOpacity>
        )}
        {showModificationButton && crew && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Modification', { crewId: crew.id })
            }
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={styles.rightButton}
            activeOpacity={0.7}
          >
            <Animated.View
              style={[
                styles.settingButtonCircle,
                { transform: [{ scale: scaleValue }] },
              ]}
            >
              <Image source={modification} style={styles.rightIcon} />
            </Animated.View>
          </TouchableOpacity>
        )}
        {openChatUrl ? (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('WebViewScreen', { url: openChatUrl })
            }
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={styles.settingButton}
            activeOpacity={0.7}
          >
            <Animated.View
              style={[
                styles.settingButtonCircle,
                { transform: [{ scale: scaleValue }] },
              ]}
            >
              <Image source={kakao} style={styles.rightIcon} />
            </Animated.View>
          </TouchableOpacity>
        ) : (
          !hideSettingButton && (
            <TouchableOpacity
              onPress={() => navigation.navigate('Setting')}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              style={styles.settingButton}
              activeOpacity={0.7}
            >
              <Animated.View
                style={[
                  styles.settingButtonCircle,
                  { transform: [{ scale: scaleValue }] },
                ]}
              >
                <Image source={settingsIcon} style={styles.rightIcon} />
              </Animated.View>
            </TouchableOpacity>
          )
        )}
      </View>
    </View>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  navigation: PropTypes.object.isRequired,
  openChatUrl: PropTypes.string,
  hideBackButton: PropTypes.bool,
  hideSettingButton: PropTypes.bool,
  showApplyButton: PropTypes.bool,
  showModificationButton: PropTypes.bool,
  applyCount: PropTypes.number,
  crew: PropTypes.object, // crew 객체의 PropTypes 정의
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    elevation: 0,
    shadowOpacity: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
    height: 56,
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  headerTitle: {
    color: '#352555',
    fontSize: 20,
    fontWeight: 'bold',
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
  },
  backButton: {
    marginLeft: 16,
  },
  backButtonCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#50C878',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  settingButton: {
    marginRight: 16,
  },
  rightButton: {
    marginRight: 5,
  },
  settingButtonCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#50C878',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightIcon: {
    width: 24,
    height: 24,
  },
  applyCountBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyCountText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Header;
