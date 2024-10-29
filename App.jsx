import React from 'react';
import { StyleSheet, View } from 'react-native';

import Navigation from './src/components/Navigation/Navigation';

function App() {
  return (
    <View style={styles.sectionContainer}>
      <Navigation style={styles.navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    fontFamily: 'pretendard',
  },
  navigation: {
    flex: 1,
  },
});

export default App;
