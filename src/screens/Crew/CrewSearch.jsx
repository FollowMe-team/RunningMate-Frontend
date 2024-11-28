import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Footprint from '../../components/Footprint';
import TimePicker from '../../components/TimePicker';

import search from '../../assets/images/Crew/searching.png';
import locate from '../../assets/images/Crew/locate.png';
import wave from '../../assets/images/Crew/wave.png';
import back from '../../assets/images/Crew/back.png';

import PropTypes from 'prop-types';

const CrewSearchHeader = ({ searchParams, setSearchParams, crewList }) => {
  const navigation = useNavigation();
  const handleSearch = () => {
    const filteredCrew = crewList.filter(crew =>
      crew.name.toLowerCase().includes(searchParams.name.toLowerCase()),
    );
    navigation.navigate('CrewSearchResult', {
      searchParams,
      type: 'search',
      filteredCrew,
    });
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Image source={back} style={{ width: 9, height: 15 }} />
      </TouchableOpacity>
      <View style={styles.headerInputContainer}>
        <TouchableOpacity onPress={handleSearch}>
          <Image source={search} style={styles.searchIcon} />
        </TouchableOpacity>
        <TextInput
          value={searchParams.name}
          onChangeText={text =>
            setSearchParams({ ...searchParams, name: text })
          }
          placeholder="크루명"
          style={styles.headerInput}
          placeholderTextColor="#9B9B9D"
          onSubmitEditing={handleSearch}
        />
      </View>
    </View>
  );
};

CrewSearchHeader.propTypes = {
  searchParams: PropTypes.shape({
    name: PropTypes.string,
    footprint: PropTypes.arrayOf(PropTypes.number),
    location: PropTypes.string,
    week: PropTypes.arrayOf(PropTypes.string),
    startTime: PropTypes.string,
    endTime: PropTypes.string,
  }).isRequired,
  setSearchParams: PropTypes.func.isRequired,
  crewList: PropTypes.array.isRequired,
};

const CrewSearch = () => {
  const [searchParams, setSearchParams] = useState({
    name: '',
    location: '',
    week: [],
    startTime: '',
    endTime: '',
    footprint: [],
  });
  const [selectedDays, setSelectedDays] = useState([]);
  const [activityTime, setActivityTime] = useState({
    startTime: null,
    endTime: null,
  });

  const crewList = []; // crewList를 정의하거나 props로 전달받도록 수정

  const handleDaySelect = day => {
    let updatedDays = [...selectedDays];
    if (updatedDays.includes(day)) {
      updatedDays = updatedDays.filter(d => d !== day);
    } else {
      updatedDays.push(day);
    }
    setSelectedDays(updatedDays);
    setSearchParams({ ...searchParams, week: updatedDays });
  };

  const isDaySelected = day => selectedDays.includes(day);

  const handleFootprintSelect = footprint => {
    let updatedFootprints = [...searchParams.footprint];
    if (updatedFootprints.includes(footprint)) {
      updatedFootprints = updatedFootprints.filter(f => f !== footprint);
    } else {
      updatedFootprints.push(footprint);
    }
    setSearchParams({ ...searchParams, footprint: updatedFootprints });
  };

  const isFootprintSelected = footprint =>
    searchParams.footprint.includes(footprint);

  const handleTimeChange = (type, value) => {
    const newTime = { ...activityTime, [type]: value };
    setActivityTime(newTime);
    setSearchParams({
      ...searchParams,
      startTime: newTime.startTime
        ? newTime.startTime.toTimeString().slice(0, 5)
        : '',
      endTime: newTime.endTime
        ? newTime.endTime.toTimeString().slice(0, 5)
        : '',
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <CrewSearchHeader
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        crewList={crewList} // crewList를 전달
      />
      <ScrollView style={{ paddingHorizontal: 26 }}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>상세 검색</Text>
            <Text style={styles.subTitle}> · 미선택 시 전체 검색</Text>
          </View>
          <View style={{ flexDirection: 'row', marginBottom: 15 }}>
            <Image source={locate} style={{ width: 50, height: 50 }} />
            <TextInput
              value={searchParams.location}
              onChangeText={text =>
                setSearchParams({ ...searchParams, location: text })
              }
              placeholder="지역명"
              style={styles.input}
              placeholderTextColor="#9B9B9D"
            />
          </View>
          <View>
            <Text style={styles.title}>크루 최소 조건</Text>
            <View style={styles.footprintButtonLayout}>
              {[1, 2, 3, 4, 5, 6].map((footprint, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.footprintSelectButton,
                    isFootprintSelected(footprint) &&
                      styles.footprintSelectButtonActive,
                  ]}
                  onPress={() => handleFootprintSelect(footprint)}
                >
                  <Footprint experience={footprint * 15} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View>
            <Text style={styles.title}>주 활동 시간대</Text>
            <View style={styles.weekButtonLayout}>
              {['월', '화', '수', '목', '금', '토', '일'].map(day => (
                <TouchableOpacity
                  key={day}
                  style={[
                    styles.weekSelectButton,
                    isDaySelected(day) && styles.weekSelectButtonActive,
                  ]}
                  onPress={() => handleDaySelect(day)}
                >
                  <View>
                    <Text
                      style={[
                        styles.weekSelectButtonText,
                        isDaySelected(day) && styles.weekSelectButtonTextActive,
                      ]}
                    >
                      {day}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.activityTimeDropdownLayout}>
              <TimePicker
                time={activityTime.startTime}
                setTime={value => handleTimeChange('startTime', value)}
                placeholder="시작 시간"
              />
              <Image source={wave} style={{ width: 25, height: 11 }} />
              <TimePicker
                time={activityTime.endTime}
                setTime={value => handleTimeChange('endTime', value)}
                placeholder="끝 시간"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    zIndex: 1,
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 36,
    height: 36,
    borderRadius: 50,
    backgroundColor: '#73D393',
    marginRight: 10,
  },
  headerInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#909090',
    paddingLeft: 10,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  headerInput: {
    flex: 1,
    color: 'black',
  },
  container: {
    flex: 1,
    width: '100%',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    color: '#352555',
    fontSize: 15,
    fontWeight: 'bold',
  },
  subTitle: {
    color: '#9B9B9D',
    fontSize: 10,
    fontWeight: 'regular',
    marginLeft: 5,
  },
  input: {
    width: '85%',
    color: 'black',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#9B9B9D',
    paddingLeft: 11,
    paddingVertical: 6,
    marginLeft: 8,
  },
  weekButtonLayout: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
    marginTop: 8,
  },
  weekSelectButton: {
    width: 35,
    height: 21,
    backgroundColor: 'white',
    borderColor: '#D6D6D6',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  weekSelectButtonActive: {
    backgroundColor: '#73D393',
    borderWidth: 0,
  },
  weekSelectButtonText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#101010',
    textAlign: 'center',
  },
  weekSelectButtonTextActive: {
    color: 'white',
  },
  plusButton: {
    justifyContent: 'center',
    paddingVertical: 2,
    paddingHorizontal: 16,
    borderColor: '#D6D6D6',
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 8,
  },
  minusButton: {
    justifyContent: 'center',
    paddingVertical: 2,
    paddingHorizontal: 16,
    borderColor: '#D6D6D6',
    borderWidth: 1,
    borderRadius: 8,
  },
  activityTimeDropdownLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  footprintButtonLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 8,
  },
  footprintSelectButton: {
    height: 40,
    width: 40,
    backgroundColor: 'white',
    borderColor: '#D6D6D6',
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footprintSelectButtonActive: {
    backgroundColor: '#73D393',
    borderWidth: 0,
  },
  footprintImage: {
    width: 20,
    height: 20,
  },
});

export default CrewSearch;
