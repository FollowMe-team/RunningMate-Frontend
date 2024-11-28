import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

import correct from '../assets/images/Settings/checked.png';
import bad from '../assets/images/Settings/delete.png';
import eye from '../assets/images/Settings/show.png';
import eyeOff from '../assets/images/Settings/hide.png';

export const validatePassword = (password, setPasswordError) => {
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    setPasswordError(
      '8자리 이상, 영문과 숫자, 특수문자를 반드시 포함해야 합니다.',
    );
  } else {
    setPasswordError('');
  }
};

const PasswordInput = ({
  label,
  value,
  onChangeText,
  error,
  placeholder,
  titleStyle,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.bundle}>
      <Text style={[styles.title, titleStyle]}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          secureTextEntry={!showPassword}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          placeholderTextColor="#9B9B9D"
        />
        {isFocused && (
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Image
              source={showPassword ? eyeOff : eye}
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        )}
        {error ? (
          <View style={styles.errorContainer}>
            <Image
              source={error === '' ? correct : bad}
              style={styles.errorIcon}
            />
            <Text
              style={[styles.errorText, error === '' ? styles.successText : '']}
            >
              {error}
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bundle: {
    marginTop: 10,
    marginBottom: 30,
    // padding: 20,
    borderBottomColor: '#E5E5E5',
  },
  title: {
    fontSize: 20,
    color: '#000',
  },
  inputContainer: {},
  input: {
    width: '100%',
    color: 'black',
    height: 50,
    borderRadius: 8,
    borderColor: '#D6D6D6',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingRight: 40,
  },
  eyeButton: {
    position: 'absolute',
    right: 10,
    top: 15,
  },
  eyeIcon: {
    width: 20,
    height: 20,
  },
  errorContainer: {
    position: 'absolute',
    bottom: -20,
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorIcon: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
  },
  successText: {
    color: 'green',
  },
});

PasswordInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  error: PropTypes.string,
  placeholder: PropTypes.string,
  titleStyle: PropTypes.object,
};

export default PasswordInput;
