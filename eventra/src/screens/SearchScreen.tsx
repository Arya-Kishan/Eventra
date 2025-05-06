import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { EventType, NavigationProps, RouteProps, SearchType, userType, VenueType } from 'types/AppTypes';
import { AppConstants } from '@constants/AppConstants';
import Icon from '@components/global/Icon';
import { searchUserApi } from '@services/UserService';
import { searchEventApi } from '@services/EventService';
import { searchVenueApi } from '@services/VenueServices';
import { getRelativeTimeFromNow, showToast } from '@utils/Helper';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchHeader from '@components/search/SearchHeader';
import EventCard from '@components/event/EventCard';
import CustomText from '@components/global/CustomText';
import { CustomImage } from '@components/global/CustomImage';
import { s } from 'react-native-size-matters';
import VenueCard from '@components/venue/VenueCard';

const SearchScreen = () => {

    const { params: { type } } = useRoute<RouteProps<"SearchScreen">>();
    const { navigate } = useNavigation<NavigationProps<"SearchScreen">>();

    const [userData, setUserData] = useState<null | userType[]>(null);
    const [venueData, setVenueData] = useState<null | VenueType[]>(null);
    const [eventData, setEventData] = useState<null | EventType[]>(null);
    const [searchType, setSearchType] = useState<SearchType>(type);
    const [loader, setLoader] = useState<boolean>(false);

    const handleSearch = async (searchText: string) => {

        setLoader(true);

        if (searchType == "event") {
            const { data, success } = await searchEventApi(searchText);
            console.log(data.data)
            success ? setEventData(data.data) : showToast({ title: "Network Error Occured - Event" });
        }

        if (searchType == "venue") {
            const { data, success } = await searchEventApi(searchText);
            console.log(data.data)
            success ? setVenueData(data.data) : showToast({ title: "Network Error Occured - Venue" });
        }

        if (searchType == "user") {
            const { data, success } = await searchUserApi(searchText);
            console.log(data.data)
            success ? setUserData(data.data) : showToast({ title: "Network Error Occured - User" });
        }

        setLoader(false);

    }

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <SearchHeader handleSearch={handleSearch} searchType={searchType} setSearchType={setSearchType} />

            {
                searchType == "event"
                    ?
                    <FlatList
                        data={eventData}
                        renderItem={({ item, index }: { item: EventType, index: number }) => <EventCard item={item} index={index} />}
                        contentContainerStyle={{ gap: s(10), padding: AppConstants.screenPadding }}
                        numColumns={2}
                        columnWrapperStyle={{ gap: AppConstants.defaultGap }}
                        keyExtractor={(item) => `${item._id}`}
                    />
                    :
                    searchType == "venue"
                        ?
                        <FlatList
                            data={venueData}
                            renderItem={({ item, index }: { item: VenueType, index: number }) => (<VenueCard item={item} index={index} />)}
                            contentContainerStyle={{ gap: s(10), padding: AppConstants.screenPadding }}
                        />
                        :
                        <FlatList
                            data={userData}
                            renderItem={({ item }: { item: userType }) => (
                                <View style={{ flexDirection: "row", gap: s(20) }}>

                                    <CustomImage source={item.profilePic.url} width={s(80)} height={s(80)} />

                                    <View style={{ justifyContent: "space-between", flex: 1 }}>

                                        <View>
                                            <CustomText variant='h3'>{item.name}</CustomText>
                                            <CustomText variant='body1'>{item.bio}</CustomText>
                                        </View>

                                        <CustomText variant='overline' style={{ color: AppConstants.darkGrayColor }}>{getRelativeTimeFromNow(item.active)}</CustomText>

                                    </View>

                                    <Icon icon='user' iconType='Feather' color={AppConstants.redColor} />

                                </View>
                            )}
                            keyExtractor={(item) => `${item._id}`}
                            contentContainerStyle={{ gap: s(10), padding: AppConstants.screenPadding }}
                        />
            }

        </SafeAreaView>
    )
}

export default SearchScreen

const styles = StyleSheet.create({
    input: {
        backgroundColor: AppConstants.whiteColor
    }
})