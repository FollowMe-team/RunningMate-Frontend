import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { getMyCourses } from '../../utils/course/my_course';
import {
  getFavoriteCourses,
  addFavoriteCourse,
  removeFavoriteCourse,
} from '../../utils/crew/crew_course';
import SimpleCourse from '../../components/Course/SimpleCourse';

const MyCrewCourse = ({ route }) => {
  const { crewId } = route.params;
  const [myCourses, setMyCourses] = useState([]);
  const [favoriteCourses, setFavoriteCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const myCoursesData = await getMyCourses();
        console.log('My courses data:', myCoursesData); // 추가된 부분
        setMyCourses(myCoursesData);
        const favoriteCoursesData = await getFavoriteCourses(crewId);
        console.log('Favorite courses data:', favoriteCoursesData); // 추가된 부분
        setFavoriteCourses(favoriteCoursesData);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      }
    };
    fetchCourses();
  }, [crewId]);

  const handleAddFavorite = async courseId => {
    try {
      await addFavoriteCourse(crewId, courseId);
      const updatedFavoriteCourses = await getFavoriteCourses(crewId);
      setFavoriteCourses(updatedFavoriteCourses);
    } catch (error) {
      console.error('Failed to add favorite course:', error);
    }
  };

  const handleRemoveFavorite = async courseId => {
    try {
      await removeFavoriteCourse(crewId, courseId);
      const updatedFavoriteCourses = await getFavoriteCourses(crewId);
      setFavoriteCourses(updatedFavoriteCourses);
    } catch (error) {
      console.error('Failed to remove favorite course:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>내 코스</Text>
        {myCourses.map(course => (
          <TouchableOpacity
            key={course.id}
            onPress={() => handleAddFavorite(course.id)}
          >
            <SimpleCourse data={course} />
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>크루 즐겨찾기 코스</Text>
        {favoriteCourses.map(course => (
          <TouchableOpacity
            key={course.id}
            onPress={() => handleRemoveFavorite(course.id)}
          >
            <SimpleCourse data={course} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
});

MyCrewCourse.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      crewId: PropTypes.number.isRequired, // 수정된 부분
    }).isRequired,
  }).isRequired,
};

export default MyCrewCourse;
