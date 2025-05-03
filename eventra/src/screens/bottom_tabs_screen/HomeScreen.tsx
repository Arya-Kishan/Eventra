import CustomHeader from '@components/global/CustomHeader'
import HorizontalRow from '@components/global/HorizontalRow'
import CustomCarousel from '@components/home/CustomCarousel'
import DoubleHorizontalFlatList from '@components/home/DoubleHorizontalFlatList'
import HomeHeader from '@components/home/HomeHeader'
import SmallEventCard from '@components/home/SmallEventCard'
import SpotlightCard from '@components/home/SpotlightCard'
import { AppConstants } from '@constants/AppConstants'
import { AppTemporaryContants } from '@constants/AppTemporaryConstants'
import { useNavigation } from '@react-navigation/native'
import { getUpcomingEventsApi } from '@services/EventService'
import { requestUserPermission } from '@services/firebaseService'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { setUpcomingEvents } from '@store/reducers/eventSlice'
import React, { useEffect } from 'react'
import { FlatList, ScrollView, StatusBar, StyleSheet, View } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { s, vs } from 'react-native-size-matters'
import { NavigationProps } from 'types/AppTypes'

const HomeScreen = () => {
  const { top } = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const navigate = useNavigation<NavigationProps<'Main'>>();
  const { upcomingEvents } = useAppSelector(store => store.event);
  const { loggedInUser } = useAppSelector(store => store.user);

  const fetchData = async () => {
    const { data, success } = await getUpcomingEventsApi();
    console.log("UPCOMING DATA : ", data.data)
    success ? dispatch(setUpcomingEvents(data.data)) : navigate.navigate("ErrorScreen");
  }

  const getNotificationPermission = async () => {
    console.log("ASKING FOR PUSH NOTIFICATION")
    await requestUserPermission(loggedInUser!);
  }

  useEffect(() => {
    fetchData();
    getNotificationPermission();
  }, [])

  return (
    <SafeAreaView>

      <StatusBar backgroundColor={AppConstants.redColor} translucent={false} hidden={false} />

      <ScrollView style={{ backgroundColor: "white" }}>

        <StatusBar translucent={false} />

        <View style={styles.main}>

          {/* HEADER CONTAINER */}
          <HomeHeader />


          {/* CAROUSEL CONTAINER */}
          <HorizontalRow leftText='For You' rightText='See All' />
          <CustomCarousel />

          <HorizontalRow leftText='Upcoming Events' rightText='See All' />
          <DoubleHorizontalFlatList data={upcomingEvents ? upcomingEvents : []} renderItem={(item, index) => <View key={item._id}><SmallEventCard item={item} index={index} navigationScreen='Main' /></View>} itemsPerColumn={2} />

          <HorizontalRow leftText='SpotLight' rightText='See All' />
          <FlatList
            data={AppTemporaryContants.spotLightsArr}
            horizontal
            keyExtractor={(_, index) => `column-${index}`}
            renderItem={({ item, index }) => (
              <SpotlightCard item={item} index={index} />
            )}
            contentContainerStyle={{ gap: AppConstants.defaultGap }}
            showsHorizontalScrollIndicator={false}
          />

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  main: { gap: vs(10), paddingVertical: AppConstants.screenPadding, paddingHorizontal: AppConstants.screenPadding },
  headerContainer: { width: "100%", flexDirection: "row", justifyContent: "space-between" },
  avatarContainer: { gap: s(10), flexDirection: "row" },
})