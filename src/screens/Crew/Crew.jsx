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
import { useNavigation, useRoute } from '@react-navigation/native'; // 추가

import CreateCrewButton from '../../components/Crew/CreateCrewButton';
import CrewCard from '../../components/Crew/CrewCard';
import crewData from '../../components/Crew/crew.json';
import search from '../../assets/images/Crew/searching.png';

const Crew = () => {
  const navigation = useNavigation(); // 추가
  const route = useRoute(); // 추가
  const bottomSheetRef = useRef(null);
  const snapPoints = ['70%'];
  const [filteredCrew, setFilteredCrew] = useState(crewData.crew); // 추가

  useEffect(() => {
    if (route.params?.searchParams) {
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
          matchesFootprint
        );
      });
      setFilteredCrew(filtered);
    }
  }, [route.params?.searchParams]);

  const handleCrewPress = useCallback(
    crewName => {
      // 수정
      navigation.navigate('MyCrew', { crewName }); // 수정
    },
    [navigation],
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

  const renderCrewList = isMyCrew => {
    return filteredCrew
      .filter(crew => crew.is_my_crew === isMyCrew)
      .map(crew => (
        <CrewCard
          key={crew.id}
          crew={crew}
          onPress={() => handleCrewPress(crew.name)}
        /> // 수정
      ));
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
            <View style={styles.listBundle}>{renderCrewList(true)}</View>
          </View>
          <View style={styles.dividingLine} />
          <View style={styles.crewListSet}>
            <View style={styles.titleSet}>
              <Text style={styles.title}>신청 가능한 크루</Text>
              <TouchableOpacity style={styles.sortingButton}></TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('CrewSearch')}
              >
                <Image source={search} style={styles.searchIcon} />
              </TouchableOpacity>
            </View>
            <View style={styles.listBundle}>{renderCrewList(false)}</View>
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
