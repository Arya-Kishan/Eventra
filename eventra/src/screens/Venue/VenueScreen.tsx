import CustomLoader from '@components/global/CustomLoader';
import EmptyData from '@components/global/EmptyData';
import VenueCard from '@components/venue/VenueCard';
import {AppConstants} from '@constants/AppConstants';
import {useNavigation} from '@react-navigation/native';
import {getAllVenueApi} from '@services/VenueServices';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {setAllVenues, setVenueLoader} from '@store/reducers/venueSlice';
import React, {useEffect} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {s} from 'react-native-size-matters';
import {NavigationProps, userType} from 'types/AppTypes';
import VenueHeader from './VenueHeader';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomSafeScreen from '@components/CustomSafeScreen';

const VenueScreen = () => {
  const navigation = useNavigation<NavigationProps<'Main'>>();

  const dispatch = useAppDispatch();
  const {allVenues, venueLoader} = useAppSelector(store => store.venue);
  const {loggedInUser} = useAppSelector(store => store.user);

  const fetchAllVenues = async ({
    searchQuery = '',
    type = 'all',
    location = loggedInUser?.location,
  }: {
    searchQuery?: string;
    type: 'all' | 'search' | 'nearBy';
    location?: userType['location'];
  }) => {
    dispatch(setVenueLoader('loading'));
    const {data, success} = await getAllVenueApi({
      searchQuery,
      type,
      location,
    });

    if (success) dispatch(setAllVenues(data.data));
    if (!success) console.error('Error in getting venues');

    dispatch(setVenueLoader('success'));
  };

  const handleChangeTab = (val: any) => {
    fetchAllVenues({type: val});
  };

  const handleSearch = (searchQuery: string) => {
    fetchAllVenues({type: 'search', searchQuery});
  };

  useEffect(() => {
    fetchAllVenues({type: 'all'});
  }, []);

  return (
    <CustomSafeScreen style={styles.flex}>
      <VenueHeader
        handleChangeTab={handleChangeTab}
        handleSearch={handleSearch}
      />

      {venueLoader === 'loading' ? (
        <CustomLoader />
      ) : allVenues && allVenues.length === 0 ? (
        <EmptyData
          title="NO VENUE AVAIALBLE"
          handleAddClick={() => {
            navigation.navigate('CreateVenueScreen', {
              venue: null,
              method: 'create',
            });
          }}
        />
      ) : (
        <FlatList
          data={allVenues}
          renderItem={({item, index}) => (
            <VenueCard item={item} index={index} />
          )}
          contentContainerStyle={styles.venueFlat}
          keyExtractor={item => `${item._id}`}
        />
      )}
    </CustomSafeScreen>
  );
};

export default VenueScreen;

const styles = StyleSheet.create({
  flex: {flex: 1},
  main: {
    backgroundColor: AppConstants.redColor,
    padding: s(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txt: {
    fontWeight: '800',
    fontSize: s(25),
    color: AppConstants.whiteColor,
  },
  venueFlat: {
    paddingHorizontal: AppConstants.screenPadding,
    paddingBottom: s(20),
    gap: AppConstants.defaultGap,
  },
});
