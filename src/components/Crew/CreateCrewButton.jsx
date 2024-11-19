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
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: '#73D393',
    width: '100%',
    height: 60,
    marginBottom: 20,
  },
  layout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  runningIcon: {
    width: 40,
    height: 40,
    alignSelf: 'flex-end',
  },
  buttonText: {
    color: 'white',
    fontSize: 23,
    fontWeight: 'bold',
  },
  plusIcon: {
    width: 30,
    height: 30,
  },
});

export default CreateCrewButton;
