import React, { useState, useEffect } from 'react';
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
import Rank from '../../components/Rank';

import search from '../../assets/images/Crew/searching.png';
import locate from '../../assets/images/Crew/locate.png';
import back from '../../assets/images/Crew/back.png';

import PropTypes from 'prop-types';
import DropDownPicker from 'react-native-dropdown-picker';
import cityData from '../../components/Crew/city.json';

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
    ranking: PropTypes.string, // 문자열로 수정
    location: PropTypes.string,
    activityTimes: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  setSearchParams: PropTypes.func.isRequired,
  crewList: PropTypes.array.isRequired,
};

const CrewSearch = () => {
  const navigation = useNavigation(); // navigation 변수를 정의
  const [searchParams, setSearchParams] = useState({
    name: '',
    city: '',
    district: '',
    activityTimes: [],
    ranking: '',
    orderBy: 'RECENT',
  });
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedRanking, setSelectedRanking] = useState('');
  const [openCity, setOpenCity] = useState(false);
  const [openDistrict, setOpenDistrict] = useState(false);
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [districtOptions, setDistrictOptions] = useState([]);

  const cityOptions = cityData.cities.map(city =>
    typeof city === 'string'
      ? { label: city, value: city }
      : { label: city.name, value: city.name },
  );

  useEffect(() => {
    if (city) {
      const selectedCity = cityData.cities.find(c => c.name === city);
      if (selectedCity && selectedCity.districts) {
        setDistrictOptions(
          selectedCity.districts.map(district => ({
            label: district,
            value: district,
          })),
        );
      } else {
        setDistrictOptions([]);
      }
    } else {
      setDistrictOptions([]);
    }
  }, [city]);

  const crewList = []; // crewList를 정의하거나 props로 전달받도록 수정

  const handleDaySelect = activityTimes => {
    let updatedDays = [...selectedDays];
    if (updatedDays.includes(activityTimes)) {
      updatedDays = updatedDays.filter(d => d !== activityTimes);
    } else {
      updatedDays.push(activityTimes);
    }
    setSelectedDays(updatedDays);
    const dayMap = {
      월: 'MONDAY',
      화: 'TUESDAY',
      수: 'WEDNESDAY',
      목: 'THURSDAY',
      금: 'FRIDAY',
      토: 'SATURDAY',
      일: 'SUNDAY',
    };
    setSearchParams({
      ...searchParams,
      activityTimes: updatedDays.map(day => dayMap[day]),
    });
  };

  const isDaySelected = activityTimes => selectedDays.includes(activityTimes);

  const handleRankSelect = ranking => {
    if (selectedRanking === ranking) {
      setSelectedRanking('');
      setSearchParams({ ...searchParams, ranking: '' });
    } else {
      setSelectedRanking(ranking);
      setSearchParams({ ...searchParams, ranking });
    }
  };

  const isRankSelected = ranking => selectedRanking === ranking;

  const handleOrderByChange = orderBy => {
    setSearchParams({ ...searchParams, orderBy });
  };

  const handleCityChange = value => {
    setCity(value);
    setSearchParams(prevState => ({
      ...prevState,
      city: value,
      district: '',
    }));
  };

  const handleDistrictChange = value => {
    setDistrict(value);
    setSearchParams(prevState => ({
      ...prevState,
      district: value,
    }));
  };

  const handleSearch = () => {
    const filteredCrew = crewList.filter(crew =>
      crew.name.toLowerCase().includes(searchParams.name.toLowerCase()),
    );
    navigation.navigate('CrewSearchResult', {
      searchParams: { ...searchParams, city, district },
      type: 'search',
      filteredCrew,
    });
  };

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <CrewSearchHeader
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        crewList={crewList} // crewList를 전달
      />
      <ScrollView style={{ paddingHorizontal: 26 }}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>활동 지역</Text>
            <Text style={styles.subTitle}> · 미선택 시 전체 검색</Text>
          </View>
          <View style={styles.locationLayout}>
            <Image
              source={locate}
              style={{ width: 35, height: 50, marginRight: 20 }}
            />
            <View style={styles.dropdownWrapper}>
              <DropDownPicker
                open={openCity}
                value={city}
                items={cityOptions}
                setOpen={setOpenCity}
                setValue={handleCityChange}
                setItems={() => {}}
                placeholder="시/도 선택"
                style={styles.locationDropdown}
                dropDownContainerStyle={styles.dropDownContainer}
                placeholderStyle={{ color: '#101010' }}
                itemTextStyle={{ color: '#101010' }}
                selectedTextStyle={{ color: '#101010' }}
                nestedScrollEnabled={true}
                dropDownDirection="AUTO"
              />
            </View>
            <View style={styles.dropdownWrapper}>
              <DropDownPicker
                open={openDistrict}
                value={district}
                items={districtOptions}
                setOpen={setOpenDistrict}
                setValue={handleDistrictChange}
                setItems={() => {}}
                placeholder="구/군 선택"
                style={styles.locationDropdown}
                dropDownContainerStyle={styles.dropDownContainer}
                placeholderStyle={{ color: '#101010' }}
                itemTextStyle={{ color: '#101010' }}
                selectedTextStyle={{ color: '#101010' }}
                nestedScrollEnabled={true}
                dropDownDirection="AUTO"
              />
            </View>
          </View>
          <View>
            <Text style={styles.title}>크루 최소 조건</Text>
            <View style={styles.rankButtonLayout}>
              {[
                'JOGGER',
                'RUNNER',
                'RACER',
                'SPRINTER',
                'MARATHONER',
                'ULTRA_RUNNER',
                'IRON_LEGS',
                'SPEED_DEMON',
              ].map((ranking, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.rankSelectButton,
                    isRankSelected(ranking) && styles.rankSelectButtonActive,
                  ]}
                  onPress={() => handleRankSelect(ranking)}
                >
                  <Rank rank={ranking} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View>
            <Text style={styles.title}>주 활동 시간대</Text>
            <View style={styles.weekButtonLayout}>
              {['월', '화', '수', '목', '금', '토', '일'].map(activityTimes => (
                <TouchableOpacity
                  key={activityTimes}
                  style={[
                    styles.weekSelectButton,
                    isDaySelected(activityTimes) &&
                      styles.weekSelectButtonActive,
                  ]}
                  onPress={() => handleDaySelect(activityTimes)}
                >
                  <View>
                    <Text
                      style={[
                        styles.weekSelectButtonText,
                        isDaySelected(activityTimes) &&
                          styles.weekSelectButtonTextActive,
                      ]}
                    >
                      {activityTimes}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View>
            <Text style={styles.title}>정렬 기준</Text>
            <View style={styles.orderByButtonLayout}>
              {['RECENT', 'OLDEST'].map(orderBy => (
                <TouchableOpacity
                  key={orderBy}
                  style={[
                    styles.orderByButton,
                    searchParams.orderBy === orderBy &&
                      styles.orderByButtonActive,
                  ]}
                  onPress={() => handleOrderByChange(orderBy)}
                >
                  <Text
                    style={[
                      styles.orderByButtonText,
                      searchParams.orderBy === orderBy &&
                        styles.orderByButtonTextActive,
                    ]}
                  >
                    {orderBy === 'RECENT' ? '최신 순' : '오래된 순'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>검색</Text>
      </TouchableOpacity>
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
    marginBottom: 3,
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
  rankButtonLayout: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 8,
  },
  rankSelectButton: {
    height: 40,
    width: '48%',
    backgroundColor: 'white',
    borderColor: '#D6D6D6',
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  rankSelectButtonActive: {
    backgroundColor: '#73D393',
    borderWidth: 0,
  },
  orderByButtonLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 8,
  },
  orderByButton: {
    height: 40,
    width: 80,
    backgroundColor: 'white',
    borderColor: '#D6D6D6',
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderByButtonActive: {
    backgroundColor: '#73D393',
    borderWidth: 0,
  },
  orderByButtonText: {
    fontSize: 14,
    color: '#101010',
  },
  orderByButtonTextActive: {
    color: 'white',
  },
  locationLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownWrapper: {
    flex: 1,
    marginRight: 8,
    marginBottom: 15,
    justifyContent: 'flex-end',
  },
  locationDropdown: {
    width: '105%',
    borderColor: '#D6D6D6',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginTop: 15,
  },
  dropDownContainer: {
    borderColor: '#D6D6D6',
  },
  searchButton: {
    justifyContent: 'center',
    width: '75%',
    backgroundColor: '#73D393',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    margin: 20,
  },
  searchButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CrewSearch;
