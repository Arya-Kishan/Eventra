import EventCard from '@components/event/EventCard';
import EventHeader from '@components/event/EventHeader';
import CustomLoader from '@components/global/CustomLoader';
import CustomText from '@components/global/CustomText';
import EmptyData from '@components/global/EmptyData';
import Icon from '@components/global/Icon';
import RoundedBox from '@components/global/RoundedBox';
import { AppConstants } from '@constants/AppConstants';
import { useSocket } from '@context/SocketContext';
import { useNavigation } from '@react-navigation/native';
import { getAllEvent } from '@services/EventService';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { setAllEvents, setEventLoader } from '@store/reducers/eventSlice';
import React, { useEffect } from 'react';
import { FlatList, StatusBar, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { s } from 'react-native-size-matters';
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

  // BOTTOM TAB BAR HIDE ANIMATED ----------------

  const { scrollDirection } = useSocket();

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

  // BOTTOM TAB BAR HIDE ANIMATED ----------------

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <StatusBar backgroundColor={AppConstants.redColor} translucent={false} hidden={false} />

      <EventHeader offset={offsetY} />

      {
        eventLoader == "idle" || eventLoader == "loading"
          ?
          <CustomLoader />
          :
          allEvents && allEvents.length == 0
            ?
            <EmptyData title='NO EVENTS' handleAddClick={() => { }} />
            :
            <Animated.FlatList
              data={allEvents}
              renderItem={({ item, index }) => (<EventCard item={item} index={index} />)}
              ListHeaderComponent={() => (<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <CustomText variant='h4'>Events</CustomText>
                <RoundedBox size={s(25)} onPress={() => navigation.navigate("CreateEventScreen", { event: null, method: "create" })}>
                  <Icon icon='plus' iconType='Feather' />
                </RoundedBox>
              </View>)}
              numColumns={2}
              columnWrapperStyle={{ gap: AppConstants.defaultGap }}
              contentContainerStyle={{ padding: AppConstants.screenPadding, gap: AppConstants.screenPadding }}
              keyExtractor={(item) => `${item._id}`}
              onScroll={scrollHandler}
              scrollEventThrottle={100}
            />
      }

    </SafeAreaView>
  )
}

export default EventScreen

const styles = StyleSheet.create({})