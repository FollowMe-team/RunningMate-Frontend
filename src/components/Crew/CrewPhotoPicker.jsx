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

const CrewPhotoPicker = ({ photo, setPhoto }) => {
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
      setPhoto();
      SheetManager.hide('photoPickerSheet');
    }
  };

  const showActionSheet = () => {
    SheetManager.show('photoPickerSheet');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={showActionSheet} style={styles.photoSet}>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.photo} />
        ) : (
          <Text style={styles.photoText}>대표 이미지 사진</Text>
        )}
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={showActionSheet} style={styles.photoSet}>
        {photos.length > 0 ? (
          <>
            <Image source={{ uri: photos[0] }} style={styles.photo} />
            {photos.length > 1 && (
              <View style={[styles.photoSet, styles.photoSetSecond]}>
                <Image source={{ uri: photos[1] }} style={styles.photo} />
              </View>
            )}
            {photos.length > 2 && (
              <View style={styles.photoCountBox}>
                <Text style={styles.photoCountText}>+{photos.length - 2}</Text>
              </View>
            )}
          </>
        ) : (
          <Text style={styles.photoText}>크루 활동 사진</Text>
        )}
      </TouchableOpacity> */}

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
    flexDirection: 'row',
  },
  photoSet: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E8E8E8',
    marginRight: 10,
    position: 'relative',
  },
  photoSetSecond: {
    position: 'relative',
    top: -110,
    right: -10,
    zIndex: -1,
  },
  // photoCountBox: {
  //   position: 'absolute',
  //   bottom: 5,
  //   right: 5,
  //   backgroundColor: 'rgba(0, 0, 0, 0.5)',
  //   borderRadius: 10,
  //   padding: 2,
  //   zIndex: 1,
  // },
  // photoCountText: {
  //   color: '#fff',
  //   fontSize: 12,
  // },
  photoContainer: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: '#E8E8E8',
    marginRight: 10,
  },
  photoText: {
    color: '#636363',
    textAlign: 'center',
    fontSize: 10,
    position: 'relative',
    top: '45%',
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
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

CrewPhotoPicker.propTypes = {
  photo: PropTypes.string,
  setPhoto: PropTypes.func.isRequired,
};

export default CrewPhotoPicker;
