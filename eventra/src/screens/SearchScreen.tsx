import CustomSafeScreen from '@components/CustomSafeScreen';
import EventCard from '@components/event/EventCard';
import {CustomImage} from '@components/global/CustomImage';
import CustomLoader from '@components/global/CustomLoader';
import CustomText from '@components/global/CustomText';
import EmptyData from '@components/global/EmptyData';
import Icon from '@components/global/Icon';
import SearchHeader from '@components/search/SearchHeader';
import VenueCard from '@components/venue/VenueCard';
import {AppConstants} from '@constants/AppConstants';
import {useNavigation, useRoute} from '@react-navigation/native';
import {searchEventApi} from '@services/EventService';
import {searchUserApi} from '@services/UserService';
import {getRelativeTimeFromNow, showToast} from '@utils/Helper';
import React, {useState} from 'react';
import {FlatList, Pressable, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {s} from 'react-native-size-matters';
import {
  EventType,
  NavigationProps,
  RouteProps,
  SearchType,
  userType,
  VenueType,
} from 'types/AppTypes';

const SearchScreen = () => {
  const {
    params: {type},
  } = useRoute<RouteProps<'SearchScreen'>>();
  const navigation = useNavigation<NavigationProps<'SearchScreen'>>();

  const [userData, setUserData] = useState<null | userType[]>(null);
  const [venueData, setVenueData] = useState<null | VenueType[]>(null);
  const [eventData, setEventData] = useState<null | EventType[]>(null);
  const [searchType, setSearchType] = useState<SearchType>(type);
  const [loader, setLoader] = useState<boolean>(false);

  const handleSearch = async (searchText: string) => {
    setLoader(true);

    if (searchType === 'event') {
      const {data, success} = await searchEventApi(searchText);
      success
        ? setEventData(data.data)
        : showToast({title: 'Network Error Occured - Event'});
    }

    if (searchType === 'venue') {
      const {data, success} = await searchEventApi(searchText);
      success
        ? setVenueData(data.data)
        : showToast({title: 'Network Error Occured - Venue'});
    }

    if (searchType === 'user') {
      const {data, success} = await searchUserApi(searchText);
      success
        ? setUserData(data.data)
        : showToast({title: 'Network Error Occured - User'});
    }

    setLoader(false);
  };

  return (
    <CustomSafeScreen style={styles.flex}>
      <SearchHeader
        handleSearch={handleSearch}
        searchType={searchType}
        setSearchType={setSearchType}
      />

      {loader ? (
        <CustomLoader />
      ) : !eventData && !venueData && !userData ? (
        <EmptyData
          title={`Search ${type}`}
          showBtn={false}
          textStyle={styles.emptyTxt}
        />
      ) : searchType === 'event' ? (
        <FlatList
          data={eventData}
          renderItem={({item, index}: {item: EventType; index: number}) => (
            <EventCard item={item} index={index} />
          )}
          contentContainerStyle={{
            gap: s(10),
            padding: AppConstants.screenPadding,
          }}
          numColumns={2}
          columnWrapperStyle={{gap: AppConstants.defaultGap}}
          keyExtractor={item => `${item._id}`}
          ListEmptyComponent={() => <EmptyData title="SEARCH EVENTS" />}
        />
      ) : searchType === 'venue' ? (
        <FlatList
          data={venueData}
          renderItem={({item, index}: {item: VenueType; index: number}) => (
            <VenueCard item={item} index={index} />
          )}
          contentContainerStyle={{
            gap: s(10),
            padding: AppConstants.screenPadding,
          }}
        />
      ) : (
        <FlatList
          data={userData}
          renderItem={({item}: {item: userType}) => (
            <Pressable
              onPress={() =>
                navigation.navigate('ProfileScreen', {userId: item._id})
              }
              style={styles.profile}>
              <CustomImage
                source={item.profilePic!.url}
                width={s(80)}
                height={s(80)}
              />

              <View style={styles.user}>
                <View>
                  <CustomText variant="h3">{item.name}</CustomText>
                  <CustomText variant="body1">{item.bio}</CustomText>
                </View>

                <CustomText
                  variant="overline"
                  style={{color: AppConstants.darkGrayColor}}>
                  {getRelativeTimeFromNow(item.active!)}
                </CustomText>
              </View>

              <Icon
                icon="user"
                iconType="Feather"
                color={AppConstants.redColor}
              />
            </Pressable>
          )}
          keyExtractor={item => `${item._id}`}
          contentContainerStyle={{
            gap: s(10),
            padding: AppConstants.screenPadding,
          }}
        />
      )}
    </CustomSafeScreen>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  flex: {flex: 1},
  emptyTxt: {fontSize: s(15), fontWeight: '500'},
  profile: {flexDirection: 'row', gap: s(20)},
  user: {justifyContent: 'space-between', flex: 1},
  input: {
    backgroundColor: AppConstants.whiteColor,
  },
});
