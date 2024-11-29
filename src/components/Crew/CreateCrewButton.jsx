import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import running from '../../assets/images/Crew/running.png';
import plus from '../../assets/images/Crew/icons8-help.png';

const CreateCrewButton = () => {
  const navigation = useNavigation();

  const handleCreateCrew = () => {
    navigation.navigate('CreateCrew');
  };

  return (
    <TouchableOpacity onPress={handleCreateCrew} style={styles.container}>
      <View style={styles.layout}>
        <Image source={running} style={styles.runningIcon} />
        <Text style={styles.buttonText}>내 크루 생성하기</Text>
        <Image source={plus} style={styles.plusIcon} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#73D393',
    width: '100%',
    height: 60,
    marginBottom: 20,
  },
  layout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  runningIcon: {
    width: 40,
    height: 40,
    position: 'absolute',
    left: 20,
    top: -7,
  },
  buttonText: {
    position: 'absolute',
    left: 110,
    color: 'white',
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  plusIcon: {
    position: 'absolute',
    right: 20,
    width: 30,
    height: 30,
  },
});

export default CreateCrewButton;
