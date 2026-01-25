import CustomSafeScreen from '@components/CustomSafeScreen';
import HorizontalRow from '@components/global/HorizontalRow';
import CustomCarousel from '@components/home/CustomCarousel';
import DoubleHorizontalFlatList from '@components/home/DoubleHorizontalFlatList';
import HomeHeader from '@components/home/HomeHeader';
import HomeVenueCard from '@components/home/HomeVenueCard';
import SpotLight from '@components/home/SpotLight';
import {AppConstants} from '@constants/AppConstants';
import {useNavigation} from '@react-navigation/native';
import {getUnseenMessageCountApi} from '@services/ChatService';
import {requestUserPermission} from '@services/firebaseService';
import {getAllNotificationApi} from '@services/notificationService';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {setUnseenMessageCount} from '@store/reducers/chatSlice';
import {setAllNotifications} from '@store/reducers/userSlice';
import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {s, vs} from 'react-native-size-matters';
import {NavigationProps} from 'types/AppTypes';

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigation<NavigationProps<'Main'>>();
  const {loggedInUser} = useAppSelector(store => store.user);

  const getAllUserNotification = async () => {
    const {data, success} = await getAllNotificationApi(loggedInUser?._id!);
    if (success) dispatch(setAllNotifications(data.data));
    if (!success) console.error('Error in getting notifications');
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
    getNotificationPermission();
    getAllUserNotification();
    fetchUnseenMessagesCount();
  }, []);

  return (
    <CustomSafeScreen>
      <ScrollView style={styles.parent}>
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
            data={[]}
            renderItem={(item, index) => (
              <View key={index}>
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
        </View>
      </ScrollView>
    </CustomSafeScreen>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  flex: {flex: 1},
  parent: {backgroundColor: 'white', flex: 1},
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
