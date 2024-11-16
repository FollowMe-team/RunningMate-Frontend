import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => setActiveTab('record')}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === 'record' && styles.activeTabText,
          ]}
        >
          기록
        </Text>
        {activeTab === 'record' && <View style={styles.activeTabIndicator} />}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => setActiveTab('activity')}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === 'activity' && styles.activeTabText,
          ]}
        >
          활동
        </Text>
        {activeTab === 'activity' && <View style={styles.activeTabIndicator} />}
      </TouchableOpacity>
    </View>
  );
};

Tabs.propTypes = {
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

export default Tabs;
