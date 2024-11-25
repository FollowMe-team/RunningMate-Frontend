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

const Header = ({ title, navigation }) => {
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

  const hideSettingButton = [
    'Setting',
    'MyProfileChange',
    'PasswordChange',
    'Withdrawal',
    'WithdrawalComplete',
  ].includes(title);

  return (
    <View style={styles.header}>
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
      <Text style={styles.headerTitle}>{title}</Text>
      {hideSettingButton && (
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
            <Image source={settingsIcon} style={styles.settingIcon} />
          </Animated.View>
        </TouchableOpacity>
      )}
    </View>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  navigation: PropTypes.object.isRequired,
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
  settingButtonCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#50C878',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingIcon: {
    width: 24,
    height: 24,
  },
});

export default Header;
