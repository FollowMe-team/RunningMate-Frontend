import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet, { SheetManager } from 'react-native-actions-sheet';

import add from '../../assets/images/Crew/free-icon-add-button-2740600.png';

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

export const handleImageSelection = async (index, setPhoto) => {
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

const CrewActivityPhotoPicker = ({ setPhoto }) => {
  const showActionSheet = () => {
    SheetManager.show('photoPickerSheet');
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.addPhotoContainer}
        onPress={showActionSheet}
      >
        <Image source={add} style={styles.addPhotoIcon} />
        <Text style={styles.addPhotoText}>크루 활동 사진 추가</Text>
      </TouchableOpacity>

      <ActionSheet id="photoPickerSheet">
        <View style={styles.actionSheetContent}>
          <TouchableOpacity
            style={styles.actionSheetButton}
            onPress={() => handleImageSelection(0, setPhoto)}
          >
            <Text style={styles.actionSheetButtonText}>카메라로 사진 찍기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionSheetButton}
            onPress={() => handleImageSelection(1, setPhoto)}
          >
            <Text style={styles.actionSheetButtonText}>
              갤러리에서 사진 선택
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionSheetButton}
            onPress={() => handleImageSelection(2, setPhoto)}
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
  addPhotoContainer: {
    width: '100%',
    height: 300,
    backgroundColor: '#E8E8E8',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPhotoIcon: {
    width: 50,
    height: 50,
  },
  addPhotoText: {
    marginTop: 10,
    fontSize: 16,
    color: '#595959',
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

CrewActivityPhotoPicker.propTypes = {
  setPhoto: PropTypes.func.isRequired,
};

export default CrewActivityPhotoPicker;
