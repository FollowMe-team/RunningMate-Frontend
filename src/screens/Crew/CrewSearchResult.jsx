import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import ApplicableCrewList from '../../components/Crew/ApplicableCrewList';
import search from '../../assets/images/Crew/searching.png';
import crewData from '../../components/Crew/crew.json';

const CrewSearchResult = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [filteredApplicableCrew, setFilteredApplicableCrew] = useState([]);

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
            ? crew.start_time >= startTime && crew.end_time <= endTime
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

  const handleCrewPress = crew => {
    navigation.navigate('CrewInformation', { crew });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.crewListSet}>
          <View style={styles.titleSet}>
            <Text style={styles.title}>검색 결과</Text>
            <TouchableOpacity onPress={() => navigation.navigate('CrewSearch')}>
              <Image source={search} style={styles.searchIcon} />
            </TouchableOpacity>
          </View>
          {filteredApplicableCrew.length > 0 ? (
            <ApplicableCrewList
              crewData={filteredApplicableCrew}
              onCrewPress={handleCrewPress}
            />
          ) : (
            <Text style={styles.noCrewText}>
              찾으시는 크루는 존재하지 않습니다.
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
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
  searchIcon: {
    width: 18,
    height: 18,
    alignSelf: 'flex-end',
  },
  noCrewText: {
    justifyContent: 'center',
    textAlign: 'center',
    color: '#101010',
    fontSize: 16,
    marginVertical: 20,
  },
});

export default CrewSearchResult;
