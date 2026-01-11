import EventCard from '@components/event/EventCard';
import EventHeader from '@components/event/EventHeader';
import CustomLoader from '@components/global/CustomLoader';
import CustomText from '@components/global/CustomText';
import EmptyData from '@components/global/EmptyData';
import Icon from '@components/global/Icon';
import RoundedBox from '@components/global/RoundedBox';
import {AppConstants} from '@constants/AppConstants';
import {useSocket} from '@context/SocketContext';
import {useNavigation} from '@react-navigation/native';
import {getAllEvent} from '@services/EventService';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {setAllEvents, setEventLoader} from '@store/reducers/eventSlice';
import React, {useEffect} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {s} from 'react-native-size-matters';
import {NavigationProps} from 'types/AppTypes';

const EventScreen = () => {
  const navigation = useNavigation<NavigationProps<'Main'>>();
  const dispatch = useAppDispatch();
  const {allEvents, eventLoader} = useAppSelector(store => store.event);

  const fetchAllEvents = async () => {
    dispatch(setEventLoader('loading'));
    const {data, success} = await getAllEvent();
    success
      ? dispatch(setAllEvents(data.data))
      : navigation.replace('ErrorScreen');
    dispatch(setEventLoader('success'));
  };

  useEffect(() => {
    fetchAllEvents();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={AppConstants.redColor}
        translucent={false}
        hidden={false}
      />

      <EventHeader />

      {eventLoader === 'idle' || eventLoader === 'loading' ? (
        <CustomLoader />
      ) : allEvents && allEvents.length === 0 ? (
        <EmptyData
          title="NO EVENTS"
          handleAddClick={() => {
            navigation.navigate('CreateEventScreen', {
              event: null,
              method: 'create',
            });
          }}
        />
      ) : (
        <Animated.FlatList
          data={allEvents}
          renderItem={({item, index}) => (
            <EventCard item={item} index={index} />
          )}
          ListHeaderComponent={() => (
            <View style={styles.headerRow}>
              <CustomText variant="h4">Events</CustomText>
              <RoundedBox
                size={s(25)}
                onPress={() =>
                  navigation.navigate('CreateEventScreen', {
                    event: null,
                    method: 'create',
                  })
                }>
                <Icon icon="plus" iconType="Feather" />
              </RoundedBox>
            </View>
          )}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContent}
          keyExtractor={item => `${item._id}`}
        />
      )}
    </View>
  );
};

export default EventScreen;

const styles = StyleSheet.create({
  container: {flex: 1},
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  columnWrapper: {
    gap: AppConstants.defaultGap,
  },
  listContent: {
    padding: AppConstants.screenPadding,
    gap: AppConstants.screenPadding,
  },
});
