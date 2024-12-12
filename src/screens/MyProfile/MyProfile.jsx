import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Modal } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import ProfileBox from '../../components/MyProfile/ProfileBox';
import Tabs from '../../components/MyProfile/Tabs';
import RecordView from '../../components/MyProfile/RecordView';
import ActivityView from '../../components/MyProfile/ActivityView';
import { getProfile, getBadges } from '../../utils/api';
import Skeleton from '../../components/MyProfile/Skeleton';
import { getMonthlyRecords } from '../../utils/records_monthly_api';
import FootprintFigure from '../../components/MyProfile/FootprintFigure';
import Calendars from '../../components/Calendars';

const MyProfile = () => {
  const [activeTab, setActiveTab] = useState('record');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [profileData, setProfileData] = useState({ loading: true, data: null });
  const [badges, setBadges] = useState([]);
  const [badgesLoading, setBadgesLoading] = useState(true);
  const [monthlyRecords, setMonthlyRecords] = useState([]);
  const [isFootprintFigureVisible, setFootprintFigureVisible] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [isMinimized, setIsMinimized] = useState(false);
  const lastScrollY = useRef(0);
  const scrollDirection = useRef('');

  const fetchMonthlyRecords = async yearMonth => {
    try {
      const result = await getMonthlyRecords(yearMonth);
      if (result.success) {
        setMonthlyRecords(result.data);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Failed to fetch monthly records:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchProfile = async () => {
        const result = await getProfile();
        setProfileData(result);
      };

      fetchProfile();
    }, []),
  );

  useEffect(() => {
    const fetchProfile = async () => {
      const result = await getProfile();
      setProfileData(result);
    };

    const fetchBadges = async () => {
      setBadgesLoading(true);
      const result = await getBadges();
      if (result.success) {
        setBadges(result.data);
      }
      setBadgesLoading(false);
    };

    fetchProfile();
    fetchBadges();
  }, []);

  const handleDayPress = day => {
    const recordForDay = monthlyRecords.find(
      record => record.startTime.split('T')[0] === day.dateString,
    );
    setSelectedRecord(
      recordForDay || { message: '해당 날짜는 러닝 기록이 없어요!' },
    );
  };

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: true,
      listener: ({ nativeEvent }) => {
        const currentScrollY = nativeEvent.contentOffset.y;

        // 스크롤 방향 감지
        if (currentScrollY > lastScrollY.current) {
          scrollDirection.current = 'down';
        } else if (currentScrollY < lastScrollY.current) {
          scrollDirection.current = 'up';
        }

        // 스크롤 위치에 따른 상태 변경
        if (currentScrollY > 50 && scrollDirection.current === 'down') {
          setIsMinimized(true);
        } else if (currentScrollY <= 50 && scrollDirection.current === 'up') {
          setIsMinimized(false);
        }

        lastScrollY.current = currentScrollY;
      },
    },
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {profileData.loading ? (
          <Skeleton />
        ) : (
          profileData.data && (
            <ProfileBox
              data={profileData.data}
              setFootprintFigureVisible={setFootprintFigureVisible}
              isMinimized={isMinimized}
            />
          )
        )}
      </View>
      <Animated.ScrollView
        contentContainerStyle={[
          styles.contentContainer,
          { paddingTop: isMinimized ? 100 : 340 },
        ]}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View style={{ marginTop: isMinimized ? 80 : 320 }}>
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
          {activeTab === 'record' ? (
            <RecordView
              handleDayPress={handleDayPress}
              selectedRecord={selectedRecord}
              records={monthlyRecords}
              fetchMonthlyRecords={fetchMonthlyRecords}
              Calendars={Calendars}
            />
          ) : badgesLoading ? (
            <Skeleton />
          ) : (
            <ActivityView badges={badges} />
          )}
        </View>
      </Animated.ScrollView>
      {isFootprintFigureVisible && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={isFootprintFigureVisible}
          onRequestClose={() => setFootprintFigureVisible(false)}
        >
          <FootprintFigure onClose={() => setFootprintFigureVisible(false)} />
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    flexGrow: 1,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default MyProfile;
