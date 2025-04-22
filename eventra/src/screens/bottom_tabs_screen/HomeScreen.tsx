import CustomHeader from '@components/global/CustomHeader'
import Icon from '@components/global/Icon'
import CustomCarousel from '@components/home/CustomCarousel'
import DoubleHorizontalFlatList from '@components/home/DoubleHorizontalFlatList'
import EventCard from '@components/home/EventCard'
import HomeHeader from '@components/home/HomeHeader'
import SpotlightCard from '@components/home/SpotlightCard'
import { AppConstants } from '@constants/AppConstants'
import { AppTemporaryContants } from '@constants/AppTemporaryConstants'
import React from 'react'
import { FlatList, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { s, vs } from 'react-native-size-matters'

const HomeScreen = () => {
  const { top } = useSafeAreaInsets();
  return (
    <ScrollView style={{ backgroundColor: "white" }}>

      <StatusBar translucent={false} />

      <View style={styles.main}>

        {/* HEADER CONTAINER */}
        <HomeHeader />


        {/* CAROUSEL CONTAINER */}
        <CustomHeader leftText='For You' rightText='See All' />
        <CustomCarousel />

        <CustomHeader leftText='Upcoming Events' rightText='See All' />
        <DoubleHorizontalFlatList data={AppTemporaryContants.eventsArr} renderItem={(item, index) => <EventCard item={item} index={index} />} itemsPerColumn={2} />

        <CustomHeader leftText='SpotLight' rightText='See All' />
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
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  main: { gap: vs(10), paddingVertical: AppConstants.screenPadding, paddingHorizontal: AppConstants.screenPadding },
  headerContainer: { width: "100%", flexDirection: "row", justifyContent: "space-between" },
  avatarContainer: { gap: s(10), flexDirection: "row" },
})