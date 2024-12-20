
import React, { useState, useEffect } from 'react';
import { TouchableOpacity, TextInput, StyleSheet, View, Text, Alert, Pressable, Image, ImageBackground, ScrollView, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import Geocoder from 'react-native-geocoding';
import { SavesavS } from '../../utils/courseapi';

// Google Maps API 키를 여기에 입력하세요
Geocoder.init('AIzaSyCQdugA7ICLSYCnuAvsf_pfgtJYzM0sfTs');

import runningman from '../../assets/images/Course/runningmanforchoosebutton.png';
import whiteplus from '../../assets/images/Course/whiteplus.png';

import StartPhotoPicker from './startphotochange';
import EndPhotoPicker from './endphotochange';
import LeaderPhotoPicker from './leaderphotochange';
import { checkName } from '../../utils/courseapi';

const styles = StyleSheet.create({
  space: { height: 15 },
  inputContainer: {
    position: 'relative',
    borderRadius: 15,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'white',
    elevation: 7,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 250,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#959393',
    textAlign: 'center',
    marginBottom: 50,
  },
  modalButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#00C81B',
  },
  input: {
    color: 'black',
    borderRadius: 15,
    height: 50,
    borderColor: '#D6D6D6',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  greenbutton: {
    width: 350,
    height: 60,
    borderColor: 'white',
    backgroundColor: '#73D393',
    borderWidth: 0,
    borderRadius: 15,
    FlexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  nicknameCheckButton: {
    position: 'absolute',
    right: 10,
    top: 8,
    backgroundColor: '#352555',
    borderRadius: 32,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  nicknameCheckButtonText: {
    color: 'white',
    fontSize: 10,
  },
  whitetext: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginLeft: 60,
    marginRight: 60,
  },

  titletext: {
    color: 'black',
    fontSize: 15,
    marginLeft: 30,
    fontWeight: 'bold',
    marginVertical: 12,
  },

  imagebutton: {
    width: '28%',
    height: 110,
    borderColor: 'black',
    backgroundColor: '#EEEEEE',
    borderWidth: 1,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '3%',
  },

  imagebuttonright: {
    width: '28%',
    height: 110,
    borderColor: 'black',
    backgroundColor: '#EEEEEE',
    borderWidth: 1,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Savingcourse = ({ route }) => {
    const data = route.params;
    const times = data.time;
    const distance = data.totalDistance;
    const starttime = data.starttime;
    const endtime = data.endtime;
    const waypoints = data.waypoint;
    console.log("times : ", times, ", distance : ", distance, ", starttime : ", starttime, ", endtime :", endtime, ", waypoints : ", waypoints);
    const navigation = useNavigation();
    const [Coursedata, setCourse] = useState('');
    const [end, setEnd] = useState(null);
    const [nickname, setNickname] = useState('');
    const [content, setContent] = useState('');
    const [info, setInfo] = useState('');
    const [birthday, setBirthday] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [nicknameError, setNicknameError] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [isNicknameChecked, setIsNicknameChecked] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [checkoption, setcheckoption] = useState(false);
    const handleNicknameCheck = async () => {
        try {
            const response = await checkName(nickname);

  const [nickname, setNickname] = useState('');
  const [info, setInfo] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [nicknameError, setNicknameError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const handleNicknameCheck = async () => {
    try {
      const response = await checkName(nickname);

      if (!response.isDuplicated) {
        setIsNicknameChecked(true);
        setNicknameError('');
        setModalMessage('사용 가능한 코스 이름입니다.');
        setModalVisible(true);
      } else {
        setIsNicknameChecked(false);
        setNicknameError('이미 사용 중인 코스 이름입니다.');
        setModalMessage('이미 사용 중인 코스 이름입니다.');
        setModalVisible(true);
      }
    } catch {
      setIsNicknameChecked(false);
      setNicknameError('코스 이름 확인 중 오류가 발생했습니다.');
      setModalMessage('코스 이름 확인 중 오류가 발생했습니다.');
      setModalVisible(true);
    }
    const [option, setoption] = useState("");

    const settingoptions = () => {
        if (Coursedata) {
            if (Stairsdata) {
                if (Optiondata) {
                    setoption(CourseDatas + ", " + Stairsdata + ", " + Optiondata);
                }
                else {

                    setoption(CourseDatas + ", " + Stairsdata)
                }
            }
            else {
                if (Optiondata) {

                    setoption(CourseDatas + ", " + Optiondata);
                }
                else {
                    setoption(CourseDatas);

                }

            }
        }
        else {
            if (Stairsdata) {
                if (Optiondata) {
                    setoption(Stairsdata + ", " + Optiondata);

                }
                else {
                    setoption(Stairsdata);

                }
            }
            else {
                if (Optiondata) {

                    setoption(Optiondata);
                }
                else {

                    setoption();
                    setcheckoption(true);
                }

            }
        }
    }
    const savesave = async () => {
        settingoptions();
        console.log("option : ", option);
        if (checkoption) {
            const request = {
                name: nickname,
                description: content,
                city: address,
                district: "",
                distance: distance,
                options: [],
                coursePoints: waypoints
            };
        }
        else {

            const request = {
                name: nickname,
                description: content,
                city: address,
                district: "",
                distance: distance,
                options: [option],
                coursePoints: waypoints
            };
        }
        console.log("request", request);

        const result = await SavesavS(request, photo, startphoto, endphoto);
        navigation.navigate('MyCourse');
    }
    useEffect(() => {
        addressreturn(waypoints[0].latitude, waypoints[0].longitude);
    }, []);
    const addressreturn = async (latitude, longitude) => {
        try {
            // 좌표를 주소로 변환
            const json = await Geocoder.from(latitude, longitude);
            const addressComponent = json.results[0].formatted_address;
            setAddress(addressComponent);
        } catch (error) {
            console.warn('주소 변환 중 오류 발생:', error);
            setAddress('주소를 찾을 수 없습니다');
        }
    }
    const CourseDatas = [
        { label: "숲길", value: 'FOREST' },
        { label: "강변", value: 'RIVERSIDE' },
        { label: "호숫가", value: 'LAKESIDE' },
        { label: "산길", value: 'MOUNTAIN' },
        { label: "해변", value: 'SEASIDE' },
        { label: "도심", value: 'CITYSCAPE' },
        { label: "공원", value: 'PARK' },
        { label: "트랙", value: 'TRACK' },
        { label: "캠퍼스", value: 'CAMPUS' },
        { label: "트레일", value: 'TRAIL' }
    ]
    const [Stairsdata, setStairs] = useState('');
    const StairDatas = [
        { label: "경사가 심함", value: 'GRADIENT_HIGH' },
        { label: "경사가 중간", value: 'GRADIENT_MIDDLE' },
        { label: "경사가 약함", value: 'GRADIENT_LOW' }
    ]
    const [Optiondata, setOption] = useState('');
    const OptionDatas = [
        { label: "강아지 산책 가능", value: 'DOG_WALKABLE' },
        { label: "자전거 이용 가능", value: 'BICYCLE_WALKABLE' },
        { label: "유모차 산책 가능", value: 'BABY_WALKABLE' }
    ]

  const validateNickname = nickname => {
    setNickname(nickname);
    setIsNicknameChecked(false); // 닉네임이 변경되면 중복 확인 상태를 초기화
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  const handleEnd = () => {
    if (end !== null) {
      // 이미 정보가 표시된 상태라면, 정보 초기화 (토글 효과)
      setEnd(null);
    } else {
      setEnd(true);
    }
  };
  const CourseDatas = [
    { label: '숲길', value: 'FOREST' },
    { label: '강변', value: 'RIVERSIDE' },
    { label: '호숫가', value: 'LAKESIDE' },
    { label: '산길', value: 'MOUNTAIN' },
    { label: '해변', value: 'SEASIDE' },
    { label: '도심', value: 'CITYSCAPE' },
    { label: '공원', value: 'PARK' },
    { label: '트랙', value: 'TRACK' },
    { label: '캠퍼스', value: 'CAMPUS' },
    { label: '트레일', value: 'TRAIL' },
  ];
  const [Stairsdata, setStairs] = useState('');
  const StairDatas = [
    { label: '경사가 심함', value: 'GRADIENT_HIGH' },
    { label: '경사가 중간', value: 'GRADIENT_MIDDLE' },
    { label: '경사가 약함', value: 'GRADIENT_LOW' },
  ];
  const [Optiondata, setOption] = useState('');
  const OptionDatas = [
    { label: '강아지 산책 가능', value: 'DOG_WALKABLE' },
    { label: '자전거 이용 가능', value: 'BICYCLE_WALKABLE' },
    { label: '유모차 산책 가능', value: 'BABY_WALKABLE' },
  ];

    const [startphoto, setstartPhoto] = useState(null);
    const [endphoto, setendPhoto] = useState(null);
    const [photo, setPhoto] = useState(null);
    const formatTime = (duration) => {
        const hours = duration.hours().toString().padStart(2, '0');
        const minutes = duration.minutes().toString().padStart(2, '0');
        const seconds = duration.seconds().toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };

    return (
        <ScrollView>
            <View style={styles.space}></View>
            <View style={{ borderRadius: 15, width: "90%", height: 120, backgroundColor: 'white', elevation: 7, alignSelf: 'center' }}>
                <Text style={{ fontSize: 30, color: 'black', alignSelf: 'center' }}>{formatTime(times)}</Text>
                <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-around' }}>
                    <View>
                        <Text style={{ alignSelf: 'center' }}>거리</Text>
                        <Text style={{ color: 'black', fontSize: 16, alignSelf: 'center' }}>{distance}KM</Text>
                    </View>
                    <View>
                        <Text style={{ alignSelf: 'center' }}>평균 페이스</Text>
                        <Text style={{ color: 'black', fontSize: 16, alignSelf: 'center' }}>{distance > 0
                            ? ((distance / 1000) / (time.hours() * 3600 + time.minutes() * 60 + time.seconds())).toFixed(2)
                            : '0'} km/h</Text>
                    </View>
                    <View>
                        <Text style={{ alignSelf: 'center' }}>칼로리</Text>
                        <Text style={{ color: 'black', fontSize: 16, alignSelf: 'center' }}>{(0.0055 * distance).toFixed(1)}</Text>
                    </View>
                </View>
            </View>
            <Text style={styles.titletext}>코스명</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={nickname}
                    onChangeText={validateNickname}
                />
                <TouchableOpacity
                    style={styles.nicknameCheckButton}
                    onPress={handleNicknameCheck}
                >
                    <Text style={styles.nicknameCheckButtonText}>중복 체크</Text>
                </TouchableOpacity>
                {nicknameError ? (
                    <Text style={styles.errorText}>{nicknameError}</Text>
                ) : null}
            </View>
            <Text style={styles.titletext}>코스 설명</Text>
            <TextInput style={{ borderRadius: 15, width: "90%", height: 130, backgroundColor: 'white', elevation: 7, alignSelf: 'center' }}
                value={content}
                onChangeText={setContent}
            >
            </TextInput>
            <Text style={styles.titletext}>위치</Text>
            <Text style={{
                borderRadius: 15, width: "90%", height: 50, backgroundColor: 'white', elevation: 7, alignSelf: 'center', color: 'black', fontSize: 15, justifyContent: 'center', paddingLeft: 20
                , textAlignVertical: 'center'
            }}>
                {address}
            </Text>
          </View>
          <View>
            <Text style={{ alignSelf: 'center' }}>평균 페이스</Text>
            <Text style={{ color: 'black', fontSize: 16, alignSelf: 'center' }}>
              5'33"
            </Text>
          </View>
          <View>
            <Text style={{ alignSelf: 'center' }}>칼로리</Text>
            <Text style={{ color: 'black', fontSize: 16, alignSelf: 'center' }}>
              245
            </Text>
          </View>
        </View>
      </View>
      <Text style={styles.titletext}>코스명</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={nickname}
          onChangeText={validateNickname}
        />
        <TouchableOpacity
          style={styles.nicknameCheckButton}
          onPress={handleNicknameCheck}
        >
          <Text style={styles.nicknameCheckButtonText}>중복 체크</Text>
        </TouchableOpacity>
        {nicknameError ? (
          <Text style={styles.errorText}>{nicknameError}</Text>
        ) : null}
      </View>
      <Text style={styles.titletext}>코스 설명</Text>
      <TextInput
        style={{
          color: 'black',
          borderRadius: 15,
          width: '90%',
          height: 130,
          backgroundColor: 'white',
          elevation: 7,
          alignSelf: 'center',
        }}
      ></TextInput>
      <Text style={styles.titletext}>위치</Text>
      <Text
        style={{
          borderRadius: 15,
          width: '90%',
          height: 50,
          backgroundColor: 'white',
          elevation: 7,
          alignSelf: 'center',
          color: 'black',
          fontSize: 15,
          justifyContent: 'center',
          paddingLeft: 20,
          textAlignVertical: 'center',
        }}
      >
        인천광역시 어쩌구 저쩌구
      </Text>
      <Text style={styles.titletext}>코스 이미지(선택)</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <StartPhotoPicker photo={startphoto} setPhoto={setstartPhoto} />
        <EndPhotoPicker photo={endphoto} setPhoto={setendPhoto} />
        <LeaderPhotoPicker photo={photo} setPhoto={setPhoto} />
      </View>
      <Text style={styles.titletext}>태그(선택)</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <View
          style={{
            borderRadius: 15,
            width: '28%',
            height: 40,
            backgroundColor: 'white',
            elevation: 7,
            alignSelf: 'center',
            color: 'black',
            fontSize: 10,
            textAlignVertical: 'center',
            paddingLeft: 7,
            marginRight: '3%',
            marginBottom: 20,
            justifyContent: 'center',
          }}
        >
          <Dropdown
            data={CourseDatas}
            labelField="label"
            valueField="value"
            placeholder="주변 환경"
            value={Coursedata}
            dropdownPosition="top"
            onChange={item => {
              setCourse(item.value);
            }}
            placeholderStyle={{
              color: '#101010',
              fontSize: 10,
              marginLeft: 10,
            }} // 글자색 수정
            itemTextStyle={{ color: '#101010', fontSize: 12 }} // 드롭다운 리스트 글자색 수정
            selectedTextStyle={{
              color: '#101010',
              fontSize: 10,
              marginLeft: 10,
            }} // 선택된 항목 글자색 수정
          />
        </View>
        <View
          style={{
            borderRadius: 15,
            width: '28%',
            height: 40,
            backgroundColor: 'white',
            elevation: 7,
            alignSelf: 'center',
            color: 'black',
            fontSize: 10,
            textAlignVertical: 'center',
            paddingLeft: 7,
            marginRight: '3%',
            marginBottom: 20,
            justifyContent: 'center',
          }}
        >
          <Dropdown
            data={StairDatas}
            labelField="label"
            valueField="value"
            placeholder="계단 유무"
            value={Stairsdata}
            dropdownPosition="top"
            onChange={item => {
              setStairs(item.value);
            }}
            placeholderStyle={{
              color: '#101010',
              fontSize: 10,
              marginLeft: 10,
            }} // 글자색 수정
            itemTextStyle={{ color: '#101010', fontSize: 12 }} // 드롭다운 리스트 글자색 수정
            selectedTextStyle={{
              color: '#101010',
              fontSize: 10,
              marginLeft: 10,
            }} // 선택된 항목 글자색 수정
          />
        </View>
        <View
          style={{
            borderRadius: 15,
            width: '28%',
            height: 40,
            backgroundColor: 'white',
            elevation: 7,
            alignSelf: 'center',
            color: 'black',
            fontSize: 10,
            textAlignVertical: 'center',
            paddingLeft: 7,
            marginRight: '3%',
            marginBottom: 20,
            justifyContent: 'center',
          }}
        >
          <Dropdown
            data={OptionDatas}
            labelField="label"
            valueField="value"
            placeholder="추가 옵션"
            value={Optiondata}
            dropdownPosition="top"
            onChange={item => {
              setOption(item.value);
            }}
            placeholderStyle={{
              color: '#101010',
              fontSize: 10,
              marginLeft: 10,
            }} // 글자색 수정
            itemTextStyle={{ color: '#101010', fontSize: 12 }} // 드롭다운 리스트 글자색 수정
            selectedTextStyle={{
              color: '#101010',
              fontSize: 10,
              marginLeft: 10,
            }} // 선택된 항목 글자색 수정
          />
        </View>
      </View>
      <TouchableOpacity onPress={handleEnd} style={styles.greenbutton}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Image
            style={{ width: 40, height: 40, marginTop: 20 }}
            source={runningman}
          />
          <Text style={styles.whitetext}>코스 등록하기</Text>

          <Image
            style={{ width: 32, height: 32, alignSelf: 'center' }}
            source={whiteplus}
          />
        </View>
      </TouchableOpacity>
      {end !== null && modalMessage === '사용 가능한 코스 이름입니다.' && (
        <View
          style={{
            backgroundColor: ' rgba(0, 0, 0, 0.5)',
            height: '100%',
            width: '100%',
            position: 'absolute',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              backgroundColor: 'white',
              height: '18%',
              width: '60%',
              alignSelf: 'center',
              justifyContent: 'space-between',
              borderRadius: 15,
            }}
          >
            <Text
              style={{
                height: '50%',
                width: '70%',
                color: 'black',
                alignSelf: 'center',
                textAlign: 'center',
                textAlignVertical: 'center',
                color: 'grey',
                fontSize: 12,
                fontWeight: 'bold',
                marginTop: '9%',
              }}
            >
              종료 후에는 변경이 불가합니다. 해당 내용으로 등록하시겠습니까?
            </Text>
            <View
              style={{ flexDirection: 'row', height: '35%', width: '100%' }}
            >
              <TouchableOpacity
                onPress={handleEnd}
                style={{
                  width: '50%',
                  height: '100%',
                  justifyContent: 'center',
                }}
              >
                <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
                  <Text
                    style={{
                      color: 'black',
                      alignSelf: 'center',
                      fontWeight: 'bold',
                    }}
                  >
                    Cancel
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('MyCourse')}
                style={{
                  width: '50%',
                  height: '100%',
                  justifyContent: 'center',
                }}
              >
                <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
                  <Text
                    style={{
                      color: 'black',
                      alignSelf: 'center',
                      fontWeight: 'bold',
                      color: 'red',
                    }}
                  >
                    Finish
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={handleEnd}
                style={styles.greenbutton}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Image
                        style={{ width: 40, height: 40, marginTop: 20 }}
                        source={runningman}
                    />
                    <Text style={styles.whitetext}>
                        코스 등록하기</Text>

                    <Image
                        style={{ width: 32, height: 32, alignSelf: 'center' }}
                        source={whiteplus}
                    />
                </View>
            </TouchableOpacity>
            {end !== null && modalMessage === '사용 가능한 코스 이름입니다.' && (
                <View style={{ backgroundColor: ' rgba(0, 0, 0, 0.5)', height: '100%', width: '100%', position: 'absolute', justifyContent: 'center' }}>
                    <View style={{ backgroundColor: 'white', height: '18%', width: '60%', alignSelf: 'center', justifyContent: 'space-between', borderRadius: 15 }}>
                        <Text style={{ height: '50%', width: '70%', color: 'black', alignSelf: 'center', textAlign: 'center', textAlignVertical: 'center', color: 'grey', fontSize: 12, fontWeight: 'bold', marginTop: '9%' }}>종료 후에는 변경이 불가합니다. 해당 내용으로 등록하시겠습니까?</Text>
                        <View style={{ flexDirection: 'row', height: '35%', width: '100%' }}>
                            <TouchableOpacity onPress={handleEnd} style={{ width: '50%', height: '100%', justifyContent: 'center' }}>
                                <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: 'black', alignSelf: 'center', fontWeight: 'bold' }}>Cancel</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={savesave}
                                style={{ width: '50%', height: '100%', justifyContent: 'center' }}>
                                <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: 'black', alignSelf: 'center', fontWeight: 'bold', color: 'red' }}>Finish</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            )}
            {end !== null && modalMessage != '사용 가능한 코스 이름입니다.' && (
                <View style={{ backgroundColor: ' rgba(0, 0, 0, 0.5)', height: '100%', width: '100%', position: 'absolute', justifyContent: 'center' }}>
                    <View style={{ backgroundColor: 'white', height: '18%', width: '60%', alignSelf: 'center', justifyContent: 'space-between', borderRadius: 15 }}>
                        <Text style={{ height: '50%', width: '70%', color: 'black', alignSelf: 'center', textAlign: 'center', textAlignVertical: 'center', color: 'grey', fontSize: 12, fontWeight: 'bold', marginTop: '9%' }}>코스 네임 중복 인증을 마치세요.</Text>
                        <View style={{ flexDirection: 'row', height: '35%', width: '100%' }}>
                            <TouchableOpacity onPress={handleEnd} style={{ width: '100%', height: '100%', justifyContent: 'center' }}>
                                <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: 'black', alignSelf: 'center', fontWeight: 'bold' }}>Cancel</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            )}
            <Modal
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
                animationType="fade"
            >
              코스 네임 중복 인증을 마치세요.
            </Text>
            <View
              style={{ flexDirection: 'row', height: '35%', width: '100%' }}
            >
              <TouchableOpacity
                onPress={handleEnd}
                style={{
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                }}
              >
                <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
                  <Text
                    style={{
                      color: 'black',
                      alignSelf: 'center',
                      fontWeight: 'bold',
                    }}
                  >
                    Cancel
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
        animationType="fade"
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.modalButtonText}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Savingcourse;
