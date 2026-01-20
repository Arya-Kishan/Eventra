import EventCard from '@components/event/EventCard';
import EventHeader from '@components/event/EventHeader';
import CustomLoader from '@components/global/CustomLoader';
import EmptyData from '@components/global/EmptyData';
import {AppConstants} from '@constants/AppConstants';
import {useNavigation} from '@react-navigation/native';
import {getAllEvent} from '@services/EventService';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {setAllEvents, setEventLoader} from '@store/reducers/eventSlice';
import React, {useEffect} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {NavigationProps, userType} from 'types/AppTypes';

const EventScreen = () => {
  const navigation = useNavigation<NavigationProps<'Main'>>();
  const dispatch = useAppDispatch();
  const {allEvents, eventLoader} = useAppSelector(store => store.event);
  const {loggedInUser} = useAppSelector(store => store.user);

  const fetchAllEvents = async ({
    searchQuery = '',
    type = 'all',
    location = loggedInUser?.location,
  }: {
    searchQuery?: string;
    type: 'all' | 'search' | 'nearBy';
    location?: userType['location'];
  }) => {
    dispatch(setEventLoader('loading'));
    const {data, success} = await getAllEvent({
      searchQuery,
      type,
      location,
    });
    success
      ? dispatch(setAllEvents(data.data))
      : navigation.replace('ErrorScreen');
    dispatch(setEventLoader('success'));
  };

  const handleChangeTab = (val: any) => {
    fetchAllEvents({type: val});
  };

  const handleSearch = (searchQuery: string) => {
    fetchAllEvents({type: 'search', searchQuery});
  };

  useEffect(() => {
    fetchAllEvents({type: 'all'});
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={AppConstants.redColor}
        translucent={false}
        hidden={false}
      />

      <EventHeader
        handleChangeTab={handleChangeTab}
        handleSearch={handleSearch}
      />

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
  columnWrapper: {
    gap: AppConstants.defaultGap,
  },
  listContent: {
    padding: AppConstants.screenPadding,
    gap: AppConstants.screenPadding,
  },
});
