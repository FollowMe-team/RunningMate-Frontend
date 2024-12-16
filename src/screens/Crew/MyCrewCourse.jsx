import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Image,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import { getRecommendedCourses } from '../../utils/course/my_course';
import {
  getFavoriteCourses,
  addFavoriteCourse,
  removeFavoriteCourse,
} from '../../utils/crew/crew_course';
import SimpleCourse from '../../components/Course/SimpleCourse';
import CrewCourseTab from '../../components/Crew/CrewCourseTab';

import search from '../../assets/images/Crew/searching.png';

const MyCrewCourse = ({ route, navigation }) => {
  const { crewId } = route.params;
  const [myCourses, setMyCourses] = useState([]);
  const [favoriteCourses, setFavoriteCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('add');
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [loadingSearch, setLoadingSearch] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoadingCourses(true);
        const myCoursesData = await getRecommendedCourses();
        setMyCourses(myCoursesData);
        const favoriteCoursesData = await getFavoriteCourses(crewId);
        setFavoriteCourses(favoriteCoursesData);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      } finally {
        setLoadingCourses(false);
      }
    };
    fetchCourses();
  }, [crewId]);

  const handleAddFavorite = courseId => {
    if (!selectedCourses.includes(courseId)) {
      setSelectedCourses([...selectedCourses, courseId]);
    }
  };

  const handleRemoveFavorite = courseId => {
    setSelectedCourses(selectedCourses.filter(id => id !== courseId));
  };

  const handleSaveChanges = async () => {
    try {
      if (activeTab === 'add') {
        for (const courseId of selectedCourses) {
          if (!favoriteCourses.some(course => course.id === courseId)) {
            await addFavoriteCourse(crewId, courseId);
          }
        }
      } else if (activeTab === 'remove') {
        for (const courseId of selectedCourses) {
          if (favoriteCourses.some(course => course.id === courseId)) {
            await removeFavoriteCourse(crewId, courseId);
          }
        }
      }
      setModalVisible(true);
    } catch (error) {
      console.error('Failed to save changes:', error);
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
    navigation.goBack();
  };

  const handleSearch = async () => {
    try {
      setLoadingSearch(true);
      const myCoursesData = await getRecommendedCourses(searchKeyword);
      setMyCourses(myCoursesData);
    } catch (error) {
      console.error('Failed to search courses:', error);
    } finally {
      setLoadingSearch(false);
    }
  };

  const filteredCourses =
    activeTab === 'add'
      ? myCourses.filter(
          course =>
            !favoriteCourses.some(favCourse => favCourse.id === course.id) &&
            course.name.toLowerCase().includes(searchKeyword.toLowerCase()),
        )
      : favoriteCourses.filter(course =>
          course.name.toLowerCase().includes(searchKeyword.toLowerCase()),
        );

  return (
    <ScrollView style={styles.container}>
      <CrewCourseTab activeTab={activeTab} setActiveTab={setActiveTab} />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="코스명 및 위치 검색"
          placeholderTextColor={'#CCCCCC'}
          value={searchKeyword}
          onChangeText={setSearchKeyword}
        />
        <TouchableOpacity onPress={handleSearch}>
          <Image source={search} style={styles.searchIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>크루 즐겨찾기 코스</Text>
        {loadingCourses ? (
          <SkeletonLoader />
        ) : favoriteCourses.length === 0 ? (
          <Text style={styles.emptyText}>
            코스 리스트에서 코스를 추가해 주세요!
          </Text>
        ) : (
          favoriteCourses.map(course => (
            <View key={course.id} style={styles.courseItem}>
              {activeTab === 'remove' && (
                <BouncyCheckbox
                  style={styles.checkbox}
                  isChecked={selectedCourses.includes(course.id)}
                  onPress={() => {
                    if (selectedCourses.includes(course.id)) {
                      handleRemoveFavorite(course.id);
                    } else {
                      handleAddFavorite(course.id);
                    }
                  }}
                  fillColor="#73D393"
                />
              )}
              <SimpleCourse data={course} />
            </View>
          ))
        )}
      </View>
      {activeTab === 'add' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>코스 리스트</Text>
          {loadingSearch ? (
            <SkeletonLoader />
          ) : filteredCourses.length === 0 ? (
            <Text style={styles.emptyText}>현재 코스가 없습니다.</Text>
          ) : (
            filteredCourses.map(course => (
              <View key={course.id} style={styles.courseItem}>
                <BouncyCheckbox
                  style={styles.checkbox}
                  isChecked={selectedCourses.includes(course.id)}
                  onPress={() => handleAddFavorite(course.id)}
                  fillColor="#73D393"
                />
                <SimpleCourse data={course} />
              </View>
            ))
          )}
        </View>
      )}
      <TouchableOpacity onPress={handleSaveChanges} style={styles.saveButton}>
        <Text style={styles.saveButtonTitle}>저장</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        animationType="fade"
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>변경이 완료되었습니다.</Text>
            <TouchableOpacity
              style={styles.okButton}
              onPress={handleModalClose}
            >
              <Text style={styles.okButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const SkeletonLoader = () => (
  <SkeletonPlaceholder>
    <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
      <SkeletonPlaceholder.Item width={60} height={60} borderRadius={50} />
      <SkeletonPlaceholder.Item marginLeft={20}>
        <SkeletonPlaceholder.Item width={120} height={20} borderRadius={4} />
        <SkeletonPlaceholder.Item
          marginTop={6}
          width={80}
          height={20}
          borderRadius={4}
        />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder.Item>
  </SkeletonPlaceholder>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  searchInput: {
    flex: 1,
    color: 'black',
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  searchIcon: {
    width: 24,
    height: 24,
    marginLeft: 8,
  },
  section: {
    marginBottom: 24,
    borderColor: '#EEEEEE',
    borderWidth: 1,
    borderRadius: 13,
  },
  sectionTitle: {
    color: 'black',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  courseItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  saveButton: {
    width: '85%',
    paddingVertical: 22,
    marginTop: 100,
    marginBottom: 100,
    backgroundColor: '#73D393',
    borderRadius: 15,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  saveButtonTitle: {
    color: '#fff',
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 50,
  },
  okButton: {
    padding: 10,
    borderRadius: 10,
  },
  okButtonText: {
    color: '#73D393',
    fontSize: 15,
    fontWeight: 'bold',
  },
  checkbox: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 13,
  },
  skeletonContainer: {
    // Skeleton UI 스타일
  },
  emptyText: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 16,
    color: '#CCCCCC',
  },
});

MyCrewCourse.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      crewId: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.object.isRequired,
};

export default MyCrewCourse;
