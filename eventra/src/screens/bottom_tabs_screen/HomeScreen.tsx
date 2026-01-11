import HorizontalRow from '@components/global/HorizontalRow';
import CustomCarousel from '@components/home/CustomCarousel';
import DoubleHorizontalFlatList from '@components/home/DoubleHorizontalFlatList';
import HomeHeader from '@components/home/HomeHeader';
import SmallEventCard from '@components/home/SmallEventCard';
import SpotLight from '@components/home/SpotLight';
import {AppConstants} from '@constants/AppConstants';
import {useSocket} from '@context/SocketContext';
import {useNavigation} from '@react-navigation/native';
import {getAllEvent} from '@services/EventService';
import {requestUserPermission} from '@services/firebaseService';
import {getAllNotificationApi} from '@services/notificationService';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {setUpcomingEvents} from '@store/reducers/eventSlice';
import {setAllNotifications} from '@store/reducers/userSlice';
import React, {useEffect} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {s, vs} from 'react-native-size-matters';
import {NavigationProps} from 'types/AppTypes';

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigation<NavigationProps<'Main'>>();
  const {upcomingEvents} = useAppSelector(store => store.event);
  const {loggedInUser} = useAppSelector(store => store.user);

  const fetchData = async () => {
    // const {data, success} = await getUpcomingEventsApi();
    const {data, success} = await getAllEvent();
    success
      ? dispatch(setUpcomingEvents(data.data))
      : navigate.navigate('ErrorScreen');
  };

  const getAllUserNotification = async () => {
    const {data, success} = await getAllNotificationApi(loggedInUser?._id!);
    success
      ? dispatch(setAllNotifications(data.data))
      : navigate.navigate('ErrorScreen');
  };

  const getNotificationPermission = async () => {
    await requestUserPermission(loggedInUser!);
  };

  useEffect(() => {
    fetchData();
    getNotificationPermission();
    getAllUserNotification();
  }, []);

  return (
    <View style={{flex: 1}}>
      <Animated.ScrollView style={{backgroundColor: 'white', flex: 1}}>
        <StatusBar translucent={false} />

        {/* HEADER CONTAINER */}
        <HomeHeader />

        {/* <Button title='PRATICE SCREEN' onPress={() => { navigate.navigate("PracticeScreen") }} /> */}

        <View style={styles.main}>
          {/* CAROUSEL CONTAINER */}
          <HorizontalRow leftText="For You" rightText="See All" />

          <CustomCarousel />

          <HorizontalRow
            leftText="Upcoming Events"
            rightText="See All"
            rightClick={() => navigate.navigate('Main', {screen: 'Event'})}
          />
          <DoubleHorizontalFlatList
            data={upcomingEvents ? upcomingEvents : []}
            renderItem={(item, index) => (
              <View key={item._id}>
                <SmallEventCard
                  item={item}
                  index={index}
                  navigationScreen="Main"
                />
              </View>
            )}
            itemsPerColumn={2}
          />

          <HorizontalRow leftText="SpotLight" rightText="See All" />

          <SpotLight />
        </View>
      </Animated.ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    gap: vs(10),
    paddingVertical: AppConstants.screenPadding,
    paddingHorizontal: AppConstants.screenPadding,
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  avatarContainer: {gap: s(10), flexDirection: 'row'},
  box: {
    position: 'absolute',
    bottom: s(20),
    right: s(20),
    width: s(50),
    height: s(50),
    backgroundColor: 'red',
  },
});
