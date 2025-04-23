import { CustomImage } from '@components/global/CustomImage'
import CustomText from '@components/global/CustomText'
import Icon from '@components/global/Icon'
import RoundedBox from '@components/global/RoundedBox'
import RoundedButton from '@components/global/RoundedButton'
import ToggleBox from '@components/global/ToggleBox'
import TimeSlot from '@components/venue/TimeSlot'
import VenueReviewCard from '@components/venue/VenueReviewCard'
import { AppConstants } from '@constants/AppConstants'
import { RouteProp, useRoute } from '@react-navigation/native'
import { openLocationInMaps } from '@utils/DeviceHelper'
import { formatISODate, formatTime } from '@utils/Helper'
import React, { FC } from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { s, vs } from 'react-native-size-matters'
import { RootStackParamList } from 'types/AppTypes'

type VenueDetailScreenRouteProp = RouteProp<RootStackParamList, 'VenueDetailScreen'>;

interface VenueDetailScreenType {
  isCreatingEvent?: boolean
}


const VenueDetailScreen: FC<VenueDetailScreenType> = ({ isCreatingEvent = false }) => {

  const { params } = useRoute<VenueDetailScreenRouteProp>();
  const { address, description, location, pic, title, slots, bookedEvents } = params.venue;
  console.log("params.venue : ", params.venue)

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <ScrollView style={{ flex: 1, backgroundColor: AppConstants.screenBgColor }}>

        {/* TITLE,LOCATION,ORICE */}
        <View style={{ padding: AppConstants.screenPadding, gap: vs(6), paddingBottom: vs(60) }}>

          <CustomImage source={typeof pic !== 'string' ? pic.url : ""} width={"100%"} height={vs(250)} />

          <View style={styles.shadowContainer}>

            <View style={{ justifyContent: "space-between", width: "70%", gap: vs(6) }}>
              <CustomText numberOfLines={2} variant='h3' fontWeight='700' >{title}</CustomText>

              <View style={styles.address}>
                <Icon icon='map-marker' iconType='MaterialCommunityIcons' color={AppConstants.grayColor} size={s(16)} />
                <CustomText numberOfLines={2} style={{ fontWeight: "500", fontSize: s(16), color: AppConstants.darkGrayColor }} >{`${address.state}, ${address.city}`}</CustomText>
                <CustomText variant='h4'>|</CustomText>
                <RoundedBox onPress={() => { openLocationInMaps(Number(location.latitude), Number(location.longitude)); }} size={s(20)}>
                  <Icon icon='location-arrow' iconType='FontAwesome5' color={AppConstants.redColor} size={s(12)} />
                </RoundedBox>
              </View>

            </View>

            <RoundedBox size={s(60)} rounded={s(10)} viewStyle={{ backgroundColor: AppConstants.grayLightColor }}  >
              <Icon icon='fireplace-off' iconType='MaterialCommunityIcons' color={AppConstants.redColor} size={s(30)} />
            </RoundedBox>

          </View>


          {/* ABOUT VENUE,LOCATION IN MAP, SLOTS,REVIEW */}
          <View style={[styles.commomShade, { gap: vs(10) }]}>

            {/* ABOUT */}
            <View>
              <CustomText variant='h5'>About Venue</CustomText>
              <CustomText variant='body1' numberOfLines={8}>{description}</CustomText>
            </View>

            {/* SLOTS */}
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <CustomText variant='h5'>Slots</CustomText>
            </View>

            <View style={{ flexDirection: "row", gap: s(10), flexWrap: "wrap", justifyContent: "flex-start", marginTop: vs(8) }}>
              {
                slots.map((item, index) => (
                  <TimeSlot key={index} end={formatISODate(item.time.end).hours.toString()} start={formatISODate(item.time.start).hours.toString()} isBooked={item.isBooked} />
                ))
              }
            </View>

            {/* REVIEWS */}
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <CustomText variant='h5'>Reviews</CustomText>
              <RoundedBox size={s(25)} viewStyle={{ backgroundColor: AppConstants.redColor }}>
                <Icon icon='add' iconType='MaterialIcons' />
              </RoundedBox>
            </View>
            <VenueReviewCard createAt={(new Date()).toISOString()} name={"John Doe"} profilePic="https://i.pinimg.com/736x/2d/7a/c4/2d7ac424de1f7ca83011beb9f8b25b59.jpg" review="​Yes, Google Cloud offers a $300 free credit as part of its 90-day Free Trial for new users. This means you have 90 days from the time you sign up to use up to $300 worth of Google Cloud services. The trial ends when either the 90 days have elapsed or you've spent the entire $300 credit, whichever comes first ​Yes, Google Cloud offers a $300 free credit as part of its 90-day Free Trial for new users. This means you have 90 days from the time you sign up to use up to $300 worth of Google Cloud services. The trial ends when either the 90 days have elapsed or you've spent the entire $300 credit, whichever comes first" star={4} />
            <VenueReviewCard createAt={(new Date()).toISOString()} name={"John Doe"} profilePic="https://i.pinimg.com/736x/2d/7a/c4/2d7ac424de1f7ca83011beb9f8b25b59.jpg" review="​Yes, Google Cloud offers a $300 free credit as part of its 90-day Free Trial for new users. This means you have 90 days from the time you sign up to use up to $300 worth of Google Cloud services. The trial ends when either the 90 days have elapsed or you've spent the entire $300 credit, whichever comes first ​Yes, Google Cloud offers a $300 free credit as part of its 90-day Free Trial for new users. This means you have 90 days from the time you sign up to use up to $300 worth of Google Cloud services. The trial ends when either the 90 days have elapsed or you've spent the entire $300 credit, whichever comes first" star={4} />

          </View>

        </View>

      </ScrollView>

      {
        isCreatingEvent
        &&
        <View style={{ width: "100%", position: "absolute", bottom: 0, left: 0, justifyContent: "space-between", flexDirection: "row", alignItems: "center", backgroundColor: AppConstants.whiteColor, elevation: 4, paddingHorizontal: AppConstants.screenPadding, paddingVertical: vs(6) }}>

          <Text style={{ fontWeight: "800", fontSize: s(18) }}>$120</Text>

          <RoundedButton onPress={() => { }} title='Select' style={{ paddingVertical: s(8) }} />

        </View>
      }

    </SafeAreaView>
  )
}

export default VenueDetailScreen

const styles = StyleSheet.create({
  commomShade: { width: "100%", padding: s(10), backgroundColor: AppConstants.whiteColor, elevation: 2, borderRadius: s(10) },
  shadowContainer: { width: "100%", flexDirection: "row", justifyContent: "space-between", gap: s(10), padding: s(10), backgroundColor: AppConstants.whiteColor, elevation: 2, borderRadius: s(10) },
  address: { flexDirection: "row", gap: s(2), alignItems: "center" },

})