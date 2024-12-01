import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet, { SheetManager } from 'react-native-actions-sheet';

import gallery from '../../assets/images/Settings/photo-gallery1.png';
import defaultProfileImage from '../../assets/images/Settings/profile.png';
import startphotos from '../../assets/images/Course/startphoto.png';

const ProfilePhotoPicker = ({ photo, setPhoto }) => {
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: '카메라 권한 요청',
            message: '카메라 권한을 허용해주세요.',
            buttonNeutral: '나중에',
            buttonNegative: '취소',
            buttonPositive: '확인',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const handleImageSelection = async index => {
    if (index === 0) {
      const hasPermission = await requestCameraPermission();

      if (!hasPermission) {
        alert('카메라 권한이 없습니다.');
        return;
      }

      ImagePicker.openCamera({
        width: 300,
        height: 300,
        cropping: true,
        cropperCircleOverlay: true,
        includeBase64: true,
      })
        .then(image => {
          setPhoto(image.path);
          SheetManager.hide('photoPickerSheet');
        })
        .catch(error => {
          console.log('ImagePicker Error: ', error);
        });
    } else if (index === 1) {
      ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        cropperCircleOverlay: true,
        includeBase64: true,
      })
        .then(image => {
          setPhoto(image.path);
          SheetManager.hide('photoPickerSheet');
        })
        .catch(error => {
          console.log('ImagePicker Error: ', error);
        });
    } else if (index === 2) {
      setPhoto(null);
      SheetManager.hide('photoPickerSheet');
    }
  };

  const showActionSheet = () => {
    SheetManager.show('photoPickerSheet');
  };

  return (
    <View >
      <TouchableOpacity onPress={showActionSheet} >
        {photo ? (
          <Image source={{ uri: photo }} style={styles.icon} />
        ) : (
          <View >
            <Image source={startphotos} style={styles.icon} />
          </View>
        )}
      </TouchableOpacity>

      <ActionSheet id="photoPickerSheet">
        <View style={styles.actionSheetContent}>
          <TouchableOpacity
            style={styles.actionSheetButton}
            onPress={() => handleImageSelection(0)}
          >
            <Text style={styles.actionSheetButtonText}>카메라로 사진 찍기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionSheetButton}
            onPress={() => handleImageSelection(1)}
          >
            <Text style={styles.actionSheetButtonText}>
              갤러리에서 사진 선택
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionSheetButton}
            onPress={() => handleImageSelection(2)}
          >
            <Text style={styles.actionSheetButtonText}>기본 프로필로 적용</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionSheetButton}
            onPress={() => SheetManager.hide('photoPickerSheet')}
          >
            <Text style={styles.actionSheetButtonText}>취소</Text>
          </TouchableOpacity>
        </View>
      </ActionSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
  },
  photoContainer: {
    width: "28%", height: 110
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: '-3%',
    left: '57%',
    backgroundColor: '#fff',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#f0f0f0',
  },
  icon: {
    width: 110, height: 110,
    borderColor: 'black',
    backgroundColor: '#EEEEEE',
    borderWidth: 1,
    borderRadius: 15,
    marginRight : '3%'
  },
  cameraIcon: {
    width: 20,
    height: 20,
  },
  actionSheetContent: {
    padding: 20,
  },
  actionSheetButton: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  actionSheetButtonText: {
    fontSize: 18,
    color: '#73D393',
  },
});

ProfilePhotoPicker.propTypes = {
  photo: PropTypes.string,
  setPhoto: PropTypes.func.isRequired,
};

export default ProfilePhotoPicker;
