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
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { getRecommendedCourses } from '../../utils/course/my_course';
import {
  getFavoriteCourses,
  addFavoriteCourse,
  removeFavoriteCourse,
} from '../../utils/crew/crew_course';
import SimpleCourse from '../../components/Course/SimpleCourse';
import CrewCourseTab from '../../components/Crew/CrewCourseTab';

const MyCrewCourse = ({ route, navigation }) => {
  const { crewId } = route.params;
  const [myCourses, setMyCourses] = useState([]);
  const [favoriteCourses, setFavoriteCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('add');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const myCoursesData = await getRecommendedCourses();
        setMyCourses(myCoursesData);
        const favoriteCoursesData = await getFavoriteCourses(crewId);
        setFavoriteCourses(favoriteCoursesData);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
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

  const filteredCourses =
    activeTab === 'add'
      ? myCourses.filter(course =>
          course.name.toLowerCase().includes(searchKeyword.toLowerCase()),
        )
      : favoriteCourses.filter(course =>
          course.name.toLowerCase().includes(searchKeyword.toLowerCase()),
        );

  return (
    <ScrollView style={styles.container}>
      <CrewCourseTab activeTab={activeTab} setActiveTab={setActiveTab} />
      <TextInput
        style={styles.searchInput}
        placeholder="코스 이름 검색"
        placeholderTextColor={'#CCCCCC'}
        value={searchKeyword}
        onChangeText={setSearchKeyword}
      />
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>크루 즐겨찾기 코스</Text>
        {favoriteCourses.map(course => (
          <View key={course.id} style={styles.courseItem}>
            {activeTab === 'remove' && (
              <BouncyCheckbox
                style={{
                  width: 20,
                  height: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 13,
                }}
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
        ))}
      </View>
      {activeTab === 'add' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>내 코스</Text>
          {filteredCourses.map(course => (
            <View key={course.id} style={styles.courseItem}>
              <BouncyCheckbox
                style={{
                  width: 20,
                  height: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 13,
                }}
                isChecked={selectedCourses.includes(course.id)}
                onPress={() => handleAddFavorite(course.id)}
                fillColor="#73D393"
              />
              <SimpleCourse data={course} />
            </View>
          ))}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    color: 'black',
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginVertical: 16,
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
