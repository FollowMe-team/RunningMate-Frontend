
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';

import BadgeGetIcon from '../../assets/images/MyProfile/free-icon-success-14658892.png';
import BadgeNotGetIcon from '../../assets/images/MyProfile/free-icon-nonsuccess-14658892.png';
import profileimage from '../../assets/images/Course/profileimage.png';
import smile from '../../assets/images/Othersprofile/smile.png';
import sad from '../../assets/images/Othersprofile/sad.png';

const ActivityView = () => {


  return (
    <View style={styles.container}>
      <View style={styles.smallboxlist2}>
        <View style={{ flexDirection: 'row' }}>
          <Image
            style={{ width: 36, height: 36, alignSelf: 'center', marginLeft: 10, marginRight: 5, marginTop: 7 }}
            source={profileimage}
          />
          <View style={{ justifyContent: 'center', width: "84%" }}>
            <View style={{ flexWrap: 'wrap', justifyContent: 'space-between', flexDirection:'row' }}>
              <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                  <Text style={{ color: 'black', fontSize: 16 }}>
                    최재혁</Text>
                  <Text style={{ color: '#A8A5AF', fontSize: 9, marginLeft: 5,marginTop:3, verticalAlign: 'middle' }}>
                    1시간 전</Text>
                </View>
              </View>
              <Image
                style={{ width: 20, height: 20, position:'absolute', right :0, bottom: 10 }}
                source={smile}
              />
            </View>
          </View>
        </View>
        <View>
          <Text style={{ color: 'black', fontSize: 13, marginBottom: 10, marginTop: 3, marginLeft: 10 }}>하 겁나 힘드네</Text>
        </View>
      </View>
      <View style={styles.smallboxlist2}>
        <View style={{ flexDirection: 'row' }}>
          <Image
            style={{ width: 36, height: 36, alignSelf: 'center', marginLeft: 10, marginRight: 5, marginTop: 7 }}
            source={profileimage}
          />
          <View style={{ justifyContent: 'center', width: "84%" }}>
            <View style={{ flexWrap: 'wrap', justifyContent: 'space-between', flexDirection:'row' }}>
              <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                  <Text style={{ color: 'black', fontSize: 16 }}>
                    최재혁</Text>
                  <Text style={{ color: '#A8A5AF', fontSize: 9, marginLeft: 5,marginTop:3, verticalAlign: 'middle' }}>
                    1시간 전</Text>
                </View>
              </View>
              <Image
                style={{ width: 20, height: 20, position:'absolute', right :0, bottom: 10 }}
                source={sad}
              />
            </View>
          </View>
        </View>
        <View>
          <Text style={{ color: 'black', fontSize: 13, marginBottom: 10, marginTop: 3, marginLeft: 10 }}>하 겁나 힘드네</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    width: '100%',
  },
  badgeTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  badgeTextTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  badgeCount: {
    fontSize: 70,
    fontWeight: 'bold',
    color: '#73D393',
    alignItems: 'flex-start',
  },
  badgeTotalContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  badgeTotalText: {
    fontSize: 32,
    color: 'black',
    alignItems: 'end',
  },
  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#DDDDDD',
  },
  badgeIconContainer: {
    marginBottom: 10,
  },
  badgeIcon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescription: {
    color: 'black',
    fontSize: 16,
    marginTop: 20,
    marginBottom: 50,
  },
  closeButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#73D393',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  smallboxlist2: {
    borderRadius: 15, width: 350, height: 'auto', backgroundColor: 'white', alignSelf: 'center',
    elevation: 2, marginBottom: 12, justifyContent: 'center'
  },
});

export default ActivityView;
