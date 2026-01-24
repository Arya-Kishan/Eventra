import HorizontalRow from '@components/global/HorizontalRow';
import CustomCarousel from '@components/home/CustomCarousel';
import DoubleHorizontalFlatList from '@components/home/DoubleHorizontalFlatList';
import HomeHeader from '@components/home/HomeHeader';
import HomeVenueCard from '@components/home/HomeVenueCard';
import Notice from '@components/home/Notice';
import SpotLight from '@components/home/SpotLight';
import {AppConstants} from '@constants/AppConstants';
import {useNavigation} from '@react-navigation/native';
import {getUnseenMessageCountApi} from '@services/ChatService';
import {requestUserPermission} from '@services/firebaseService';
import {getAllNotificationApi} from '@services/notificationService';
import {getAllVenueApi} from '@services/VenueServices';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {setUnseenMessageCount} from '@store/reducers/chatSlice';
import {setAllNotifications} from '@store/reducers/userSlice';
import React, {useEffect, useState} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {s, vs} from 'react-native-size-matters';
import {NavigationProps, VenueType} from 'types/AppTypes';

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigation<NavigationProps<'Main'>>();
  const {loggedInUser} = useAppSelector(store => store.user);
  const [allVenues, setAllVenues] = useState<null | VenueType[]>(null);

  const fetchData = async () => {
    const {data, success} = await getAllVenueApi({type: 'all'});
    success ? setAllVenues(data.data) : navigate.navigate('ErrorScreen');
  };

  console.log('allVenues', allVenues);

  const getAllUserNotification = async () => {
    console.log('NOTIFICATION CALL BEFIRE', loggedInUser?._id);
    const {data, success} = await getAllNotificationApi(loggedInUser?._id!);
    console.log('notification data', {data, success});
    success
      ? dispatch(setAllNotifications(data.data))
      : navigate.navigate('ErrorScreen');
  };

  const getNotificationPermission = async () => {
    await requestUserPermission(loggedInUser!);
  };

  const fetchUnseenMessagesCount = async () => {
    const {data, success} = await getUnseenMessageCountApi({
      userId: loggedInUser?._id!,
    });
    success &&
      dispatch(setUnseenMessageCount({count: data.totalUnseen, type: 'set'}));
  };

  useEffect(() => {
    fetchData();
    getNotificationPermission();
    getAllUserNotification();
    fetchUnseenMessagesCount();
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
            leftText="Pupular Venue"
            rightText="See All"
            rightClick={() => navigate.navigate('VenueScreen')}
          />
          <DoubleHorizontalFlatList
            data={allVenues ? allVenues : []}
            renderItem={(item, index) => (
              <View key={item._id}>
                <HomeVenueCard
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

          <Notice />
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
