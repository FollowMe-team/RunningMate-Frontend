import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  SafeAreaView,
} from 'react-native';

import profile from '../../components/MyProfile/myprofileInfo.json';

import down from '../../assets/images/Settings/free-icon-down-arrow-748063.png';
import up from '../../assets/images/Settings/free-icon-up-14984331.png';

const Withdrawal = ({ navigation }) => {
  const [selectedReason, setSelectedReason] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const [showReasonList, setShowReasonList] = useState(false);

  const reasons = [
    '신뢰하지 않아서',
    '나쁜 앱이 아쉬워서',
    '리뷰와 콘텐츠 많아서',
    '비매너 이용자를 만나서',
    '새 계정을 다시 만들고 싶어서',
    '기타',
  ];

  const renderWarningMessage = () => (
    <View style={styles.warningContainer}>
      <Text style={styles.warningTitle}>
        {profile.nickname} 님,{'\n'}
        이별인가요?{'\n'}
        너무 아쉬워요...
      </Text>
      <Text style={styles.warningText}>
        계정을 탈퇴하시면 발자국 지수, 게시글 등{'\n'}
        모든 활동 정보가 삭제됩니다. 계정 삭제 후 7일간 다시 가입할 수 없어요.
      </Text>
    </View>
  );

  const renderReasonSelector = () => (
    <View style={styles.reasonContainer}>
      <Text style={styles.reasonTitle}>
        {profile.nickname} 님이 계정을 삭제하려는{'\n'}
        이유를 선택해주세요.
      </Text>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setShowReasonList(!showReasonList)}
      >
        <Text style={styles.dropdownText}>
          {selectedReason || '선택해주세요'}
        </Text>
        <Image
          source={showReasonList ? up : down}
          style={{ width: 20, height: 20 }}
        />
      </TouchableOpacity>

      {showReasonList && (
        <View style={styles.reasonsList}>
          {reasons.map(reason => (
            <TouchableOpacity
              key={reason}
              style={styles.reasonItem}
              onPress={() => {
                setSelectedReason(reason);
                setShowReasonList(false);
              }}
            >
              <Text style={styles.reasonItemText}>{reason}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {selectedReason === '기타' && (
        <TextInput
          style={styles.otherReasonInput}
          placeholder="탈퇴 사유를 여기에 적어주세요."
          value={otherReason}
          onChangeText={setOtherReason}
          multiline
          placeholderTextColor="#636363"
        />
      )}
    </View>
  );

  const isConfirmEnabled =
    selectedReason &&
    (selectedReason !== '기타' ||
      (selectedReason === '기타' && otherReason.trim()));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {renderWarningMessage()}
        {renderReasonSelector()}
        <TouchableOpacity
          style={[
            styles.confirmButton,
            !isConfirmEnabled && styles.confirmButtonDisabled,
          ]}
          disabled={!isConfirmEnabled}
          onPress={() => navigation.navigate('WithdrawalComplete')}
        >
          <Text style={styles.confirmButtonText}>탈퇴하기</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  warningContainer: {
    padding: 20,
  },
  warningTitle: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  warningText: {
    fontSize: 15,
    color: 'black',
    lineHeight: 20,
  },
  reasonContainer: {
    padding: 20,
  },
  reasonTitle: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 8,
  },
  dropdownText: {
    fontSize: 12,
    color: 'black',
  },
  reasonsList: {
    position: 'absolute',
    top: 145,
    left: 20,
    right: 20,
    zIndex: 1,
    width: '75%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 10,
  },
  reasonItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  reasonItemText: {
    color: 'black',
    fontSize: 12,
  },
  otherReasonInput: {
    color: 'black',
    marginTop: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 14,
    height: 100,
    textAlignVertical: 'top',
  },
  confirmButton: {
    position: 'absolute',
    top: '100%',
    left: '30%',
    width: '30%',
    margin: 16,
    padding: 16,
    backgroundColor: '#FF0000',
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'center',
  },
  confirmButtonDisabled: {
    backgroundColor: '#E8E8E8',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

Withdrawal.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Withdrawal;
