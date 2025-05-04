import EventCard from '@components/event/EventCard';
import CustomLoader from '@components/global/CustomLoader';
import CustomText from '@components/global/CustomText';
import EmptyData from '@components/global/EmptyData';
import Icon from '@components/global/Icon';
import RoundedBox from '@components/global/RoundedBox';
import { AppConstants } from '@constants/AppConstants';
import { useNavigation } from '@react-navigation/native';
import { getAllEvent } from '@services/EventService';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { setAllEvents, setEventLoader } from '@store/reducers/eventSlice';
import React, { useEffect } from 'react';
import { FlatList, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { s, vs } from 'react-native-size-matters';
import { NavigationProps } from 'types/AppTypes';


const EventScreen = () => {
  const navigation = useNavigation<NavigationProps<'Main'>>();
  const dispatch = useAppDispatch();
  const { allEvents, upcomingEvents, eventLoader } = useAppSelector(store => store.event);

  const fetchAllEvents = async () => {
    dispatch(setEventLoader("loading"))
    const { data, success } = await getAllEvent();
    success ? dispatch(setAllEvents(data.data)) : navigation.replace("ErrorScreen");
    dispatch(setEventLoader("success"))
  }

  useEffect(() => {
    fetchAllEvents();
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <StatusBar backgroundColor={AppConstants.redColor} translucent={false} hidden={false} />

      <View style={{ gap: vs(30), backgroundColor: AppConstants.redColor, padding: AppConstants.screenPadding, borderBottomLeftRadius: s(30), borderBottomRightRadius: s(30) }}>

        <View style={{ flexDirection: "row", justifyContent: "space-between", gap: s(10), alignItems: "center" }}>
          <CustomText style={{ fontWeight: "800", fontSize: s(24), color: AppConstants.whiteColor, width: "80%" }} numberOfLines={2}>Explore the amazing Events near you</CustomText>

          <TouchableOpacity onPress={() => navigation.navigate("VenueScreen")}>
            <Icon icon='fireplace-off' iconType='MaterialCommunityIcons' size={s(30)} />
          </TouchableOpacity>

        </View>

        <View style={{ backgroundColor: "white", borderRadius: s(20), paddingHorizontal: s(10), paddingVertical: s(6), alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>

          <TextInput value='' onChangeText={() => { }} placeholder='Search Event' style={{ flex: 1 }} />

          <RoundedBox size={s(30)} viewStyle={{ backgroundColor: AppConstants.grayLightColor }}>
            <Icon iconType='Feather' icon='search' color={"black"} size={s(18)} />
          </RoundedBox>

        </View>

      </View>

      {
        eventLoader == "idle" || eventLoader == "loading"
          ?
          <CustomLoader />
          :
          allEvents && allEvents.length == 0
            ?
            <EmptyData title='NO EVENTS' handleAddClick={() => { }} />
            :
            <FlatList
              data={allEvents}
              renderItem={({ item, index }) => (<EventCard item={item} index={index} />)}
              contentContainerStyle={{ padding: AppConstants.screenPadding, gap: AppConstants.defaultGap }}
              ListHeaderComponent={() => (<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <CustomText variant='h4'>Events</CustomText>
                <RoundedBox size={s(25)} onPress={() => navigation.navigate("CreateEventScreen", { event: null, method: "create" })}>
                  <Icon icon='plus' iconType='Feather' />
                </RoundedBox>
              </View>)}
            />
      }

    </SafeAreaView>
  )
}

export default EventScreen

const styles = StyleSheet.create({})