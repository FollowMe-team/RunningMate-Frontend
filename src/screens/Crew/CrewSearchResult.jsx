import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import ApplicableCrewList from '../../components/Crew/ApplicableCrewList';

import { searchCrews } from '../../utils/crew/crew3';
import { getCrewDetail } from '../../utils/crew/crew';

const CrewSearchResult = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [filteredApplicableCrew, setFilteredApplicableCrew] = useState([]);

  useEffect(() => {
    const fetchCrews = async () => {
      if (route.params?.type === 'search' && route.params?.searchParams) {
        const { name, city, district, activityTimes, ranking, orderBy } =
          route.params.searchParams;
        const params = {
          keyword: name,
          city: city,
          district: district,
          activityTimes: activityTimes.join(','),
          ranking: ranking,
          orderBy,
        };
        try {
          const crews = await searchCrews(params);
          setFilteredApplicableCrew(crews);
        } catch (error) {
          console.error('Failed to fetch crews:', error);
        }
      }
    };

    fetchCrews();
  }, [route.params?.searchParams]);

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
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.crewListSet}>
          <View style={styles.titleSet}>
            <Text style={styles.title}>검색 결과</Text>
          </View>
          {filteredApplicableCrew.length > 0 ? (
            <ApplicableCrewList
              crewData={filteredApplicableCrew}
              onCrewPress={handleApplicableCrewPress}
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
