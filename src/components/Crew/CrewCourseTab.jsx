import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const CrewCourseTab = ({ activeTab, setActiveTab }) => {
  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity style={styles.tab} onPress={() => setActiveTab('add')}>
        <Text
          style={[styles.tabText, activeTab === 'add' && styles.activeTabText]}
        >
          크루 코스 추가
        </Text>
        {activeTab === 'add' && <View style={styles.activeTabIndicator} />}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => setActiveTab('remove')}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === 'remove' && styles.activeTabText,
          ]}
        >
          크루 코스 삭제
        </Text>
        {activeTab === 'remove' && <View style={styles.activeTabIndicator} />}
      </TouchableOpacity>
    </View>
  );
};

CrewCourseTab.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 0,
  },
  tabText: {
    fontSize: 16,
    color: '#636363',
  },
  activeTabText: {
    fontWeight: 'bold',
    color: '#000',
  },
  activeTabIndicator: {
    marginTop: 5,
    height: 3,
    width: '100%',
    backgroundColor: '#000',
  },
});

export default CrewCourseTab;
