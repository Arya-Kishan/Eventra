import HorizontalRow from '@components/global/HorizontalRow'
import CustomCarousel from '@components/home/CustomCarousel'
import DoubleHorizontalFlatList from '@components/home/DoubleHorizontalFlatList'
import HomeHeader from '@components/home/HomeHeader'
import SmallEventCard from '@components/home/SmallEventCard'
import SpotLight from '@components/home/SpotLight'
import { AppConstants } from '@constants/AppConstants'
import { useSocket } from '@context/SocketContext'
import { useNavigation } from '@react-navigation/native'
import { getUpcomingEventsApi } from '@services/EventService'
import { requestUserPermission } from '@services/firebaseService'
import { getAllNotificationApi } from '@services/notificationService'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { setUpcomingEvents } from '@store/reducers/eventSlice'
import { setAllNotifications } from '@store/reducers/userSlice'
import React, { useEffect } from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
import { s, vs } from 'react-native-size-matters'
import { NavigationProps } from 'types/AppTypes'

const HomeScreen = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigation<NavigationProps<'Main'>>();
  const { upcomingEvents } = useAppSelector(store => store.event);
  const { loggedInUser } = useAppSelector(store => store.user);
  const { scrollDirection } = useSocket();

  const fetchData = async () => {
    const { data, success } = await getUpcomingEventsApi();
    success ? dispatch(setUpcomingEvents(data.data)) : navigate.navigate("ErrorScreen");
  }

  const getAllUserNotification = async () => {
    const { data, success } = await getAllNotificationApi(loggedInUser?._id!);
    success ? dispatch(setAllNotifications(data.data)) : navigate.navigate("ErrorScreen");
  }

  const getNotificationPermission = async () => {
    await requestUserPermission(loggedInUser!);
  }

  useEffect(() => {
    fetchData();
    getNotificationPermission();
    getAllUserNotification();
  }, [])


  // ----------------------
  const offsetY = useSharedValue(0);
  const direction = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const currentOffset = event.contentOffset.y;

      if (currentOffset > offsetY.value + 10) {
        direction.value = 1; // scrolling down
        scrollDirection.value = 1;
      } else if (currentOffset < offsetY.value - 10) {
        direction.value = -1; // scrolling up
        scrollDirection.value = -1;
      }

      offsetY.value = currentOffset;
    },
  });

  // ----------------------

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <StatusBar backgroundColor={AppConstants.redColor} translucent={false} hidden={false} />

      <Animated.ScrollView
        style={{ backgroundColor: "white", flex: 1 }}
        onScroll={scrollHandler}
        scrollEventThrottle={100}
      >

        <StatusBar translucent={false} />

        {/* HEADER CONTAINER */}
        <HomeHeader />

        {/* <Button title='PRATICE SCREEN' onPress={() => { navigate.navigate("PracticeScreen") }} /> */}

        <View style={styles.main}>

          {/* CAROUSEL CONTAINER */}
          <HorizontalRow leftText='For You' rightText='See All' />

          <CustomCarousel />

          <HorizontalRow leftText='Upcoming Events' rightText='See All' rightClick={() => navigate.navigate("Main", { screen: "Event" })} />
          <DoubleHorizontalFlatList data={upcomingEvents ? upcomingEvents : []} renderItem={(item, index) => <View key={item._id}><SmallEventCard item={item} index={index} navigationScreen='Main' /></View>} itemsPerColumn={2} />

          <HorizontalRow leftText='SpotLight' rightText='See All' />

          <SpotLight />

        </View>

      </Animated.ScrollView>

    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  main: { flex: 1, gap: vs(10), paddingVertical: AppConstants.screenPadding, paddingHorizontal: AppConstants.screenPadding },
  headerContainer: { width: "100%", flexDirection: "row", justifyContent: "space-between" },
  avatarContainer: { gap: s(10), flexDirection: "row" },
  box: { position: "absolute", bottom: s(20), right: s(20), width: s(50), height: s(50), backgroundColor: "red" }
})