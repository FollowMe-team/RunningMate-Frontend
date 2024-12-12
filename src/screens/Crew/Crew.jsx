import React, { useRef, useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from '@react-navigation/native';

import CreateCrewButton from '../../components/Crew/CreateCrewButton';
import MyCrewList from '../../components/Crew/MyCrewList';
import ApplicableCrewList from '../../components/Crew/ApplicableCrewList';
import crewData from '../../components/Crew/crew.json';
import search from '../../assets/images/Crew/searching.png';
import { getMyCrews } from '../../utils/crew/crew';
import { getCrewSelect } from '../../utils/crew/crew2';
import { searchCrews } from '../../utils/crew/crew3';
import { getCrewDetail } from '../../utils/crew/crew';

const Crew = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const bottomSheetRef = useRef(null);
  const snapPoints = ['70%'];
  const [filteredApplicableCrew, setFilteredApplicableCrew] = useState([]);
  const [myCrews, setMyCrews] = useState([]);

  useEffect(() => {
    if (route.params?.type === 'search' && route.params?.searchParams) {
      const { name, location, week, startTime, endTime, footprint } =
        route.params.searchParams;
      const filtered = crewData.crew.filter(crew => {
        const matchesName = name ? crew.name.includes(name) : true;
        const matchesLocation = location
          ? crew.city.includes(location) || crew.district.includes(location)
          : true;
        const matchesWeek =
          week.length > 0 ? week.some(day => crew.week.includes(day)) : true;
        const matchesTime =
          startTime && endTime
            ? crew.start_time === startTime && crew.end_time === endTime
            : true;
        const matchesFootprint =
          footprint.length > 0
            ? footprint.some(f => {
                if (f === 6) return crew.footprint >= 85;
                if (f === 5) return crew.footprint >= 70 && crew.footprint < 85;
                if (f === 4) return crew.footprint >= 55 && crew.footprint < 70;
                if (f === 3) return crew.footprint >= 40 && crew.footprint < 55;
                if (f === 2) return crew.footprint >= 25 && crew.footprint < 40;
                return crew.footprint < 25;
              })
            : true;
        return (
          matchesName &&
          matchesLocation &&
          matchesWeek &&
          matchesTime &&
          matchesFootprint &&
          !crew.is_my_crew
        );
      });
      setFilteredApplicableCrew(filtered);
    }
  }, [route.params?.searchParams]);

  useFocusEffect(
    useCallback(() => {
      setFilteredApplicableCrew(crewData.crew.filter(crew => !crew.is_my_crew));
    }, [crewData]),
  );

  useFocusEffect(
    useCallback(() => {
      const fetchCrews = async () => {
        try {
          const crews = await getMyCrews();
          setMyCrews(crews);
        } catch (error) {
          console.error('Failed to fetch my crews:', error);
          if (
            error.message === 'No token found' ||
            (error.response && error.response.status === 401)
          ) {
            alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
            navigation.navigate('Login');
          } else if (error.response && error.response.status === 500) {
            alert('서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
          }
        }
      };

      fetchCrews();
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      const fetchCrews = async () => {
        try {
          const crews = await getMyCrews();
          setMyCrews(crews);
        } catch (error) {
          console.error('Failed to fetch my crews:', error);
          if (
            error.message === 'No token found' ||
            (error.response && error.response.status === 401)
          ) {
            alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
            navigation.navigate('Login');
          } else if (error.response && error.response.status === 500) {
            alert('서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
          }
        }
      };

      fetchCrews();
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      const fetchCrews = async () => {
        try {
          const crews = await searchCrews();
          setFilteredApplicableCrew(crews);
        } catch (error) {
          console.error('Failed to fetch applicable crews:', error);
        }
      };

      fetchCrews();
    }, []),
  );

  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );

  const handleMyCrewPress = async crewId => {
    try {
      const crewDetail = await getCrewSelect(crewId);
      navigation.navigate('MyCrew', {
        crew: crewDetail,
      });
    } catch (error) {
      console.error('Failed to fetch crew detail:', error);
      alert('크루 정보를 불러오는데 실패했습니다.');
    }
  };

  const handleApplicableCrewPress = async crewId => {
    try {
      const crewDetail = await getCrewDetail(crewId);
      navigation.navigate('CrewInformation', { crew: crewDetail });
    } catch (error) {
      console.error('Failed to fetch crew detail:', error);
      alert('크루 정보를 불러오는데 실패했습니다.');
    }
  };

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <CreateCrewButton />
          <View style={styles.crewListSet}>
            <View style={styles.titleSet}>
              <Text style={styles.title}>내 크루 목록</Text>
              <TouchableOpacity style={styles.sortingButton}></TouchableOpacity>
            </View>
            <MyCrewList crewData={myCrews} onCrewPress={handleMyCrewPress} />
          </View>
          <View style={styles.dividingLine} />
          <View style={styles.crewListSet}>
            <View style={styles.titleSet}>
              <Text style={styles.title}>추천 크루</Text>
              <TouchableOpacity style={styles.sortingButton}></TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('CrewSearch')}
              >
                <Image source={search} style={styles.searchIcon} />
              </TouchableOpacity>
            </View>
            <ApplicableCrewList
              crewData={filteredApplicableCrew}
              onCrewPress={handleApplicableCrewPress}
            />
          </View>
        </ScrollView>

        <BottomSheetModal
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          backdropComponent={renderBackdrop}
          enablePanDownToClose
        >
          <View style={styles.bottomSheetContent}>
            <View style={styles.profileSection}>
              <View style={styles.profileImage} />
              <Text style={styles.crewName}>크루 이름</Text>
            </View>

            <View style={styles.infoSection}>
              <Text style={styles.infoTitle}>크루 소개</Text>
              <Text style={styles.infoText}>
                저희 크루는 다들 사이좋게 잘하며 대운동장에서 뛰고 있습니다!
                초보자들도 환영!{'\n'}
                대운동장 앞과 다른곳도 돌아요!
              </Text>

              <Text style={styles.infoTitle}>크루 조건</Text>
              <Text style={styles.infoText}>
                1. 주에 한 번 이상은 출석하기{'\n'}2. 어머세팅동 시 발종
              </Text>

              <Text style={styles.infoTitle}>주 활동 시간대</Text>
              <Text style={styles.infoText}>(월, 화, 수) 오후 8 ~ 9시</Text>

              <Text style={styles.infoTitle}>크루 활동 지역</Text>
              <Text style={styles.infoText}>고양시 산서구</Text>
            </View>

            <TouchableOpacity style={styles.joinButton}>
              <Text style={styles.joinButtonText}>크루 신청하기</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetModal>
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    paddingBottom: 80,
  },
  scrollView: {
    flex: 1,
  },
  crewListSet: {
    flexGrow: 1,
    width: '100%',
  },
  titleSet: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  title: {
    alignSelf: 'flex-start',
    color: '#101010',
    fontSize: 16,
    fontWeight: 'semibold',
  },
  sortingButton: {
    backgroundColor: '#E4E4E4',
    borderColor: '#EEEEEE',
  },
  listBundle: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  dividingLine: {
    height: 4,
    backgroundColor: '#EDEDED',
    marginVertical: 10,
  },
  searchIcon: {
    width: 18,
    height: 18,
    alignSelf: 'flex-end',
  },
  bottomSheetContent: {
    flex: 1,
    padding: 16,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E0E0E0',
    marginBottom: 12,
  },
  crewName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  infoSection: {
    marginBottom: 24,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 16,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  joinButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 'auto',
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Crew;
