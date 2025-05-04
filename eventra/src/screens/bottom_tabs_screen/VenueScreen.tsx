import CustomLoader from '@components/global/CustomLoader'
import CustomText from '@components/global/CustomText'
import EmptyData from '@components/global/EmptyData'
import Icon from '@components/global/Icon'
import RoundedBox from '@components/global/RoundedBox'
import VenueCard from '@components/venue/VenueCard'
import { AppConstants } from '@constants/AppConstants'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native'
import { getAllVenueApi } from '@services/VenueServices'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { setAllVenues, setVenueLoader } from '@store/reducers/venueSlice'
import React, { useEffect } from 'react'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { s } from 'react-native-size-matters'
import { NavigationProps } from 'types/AppTypes'

const VenueScreen = () => {

    const tabBarHeight = useBottomTabBarHeight();
    const navigation = useNavigation<NavigationProps<'Main'>>();

    const dispatch = useAppDispatch();
    const { allVenues, venueLoader } = useAppSelector(store => store.venue);

    const fetchAllEvents = async () => {
        dispatch(setVenueLoader("loading"))
        const { data, success } = await getAllVenueApi();
        success ? dispatch(setAllVenues(data.data)) : navigation.replace("ErrorScreen");
        dispatch(setVenueLoader("success"))
    }

    useEffect(() => {
        fetchAllEvents();
    }, [])

    console.log("allVenues : ", allVenues)

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <View style={{ backgroundColor: AppConstants.redColor, padding: s(15), flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <CustomText style={{ fontWeight: "800", fontSize: s(25), color: AppConstants.whiteColor }}>Venue</CustomText>
                <TouchableOpacity onPress={() => { navigation.navigate('CreateVenueScreen', { venue: null, method: "create" }) }}>
                    <Icon icon='plus' iconType='Feather' size={s(25)} />
                </TouchableOpacity>
            </View>

            {
                venueLoader == "loading"
                    ?
                    <CustomLoader />
                    :
                    allVenues && allVenues.length == 0
                        ?
                        <EmptyData title='NO POSTS' handleAddClick={() => { navigation.navigate("CreateVenueScreen", { venue: null, method: "create" }) }} />
                        :
                        <FlatList
                            data={allVenues}
                            renderItem={({ item, index }) => (<VenueCard item={item} index={index} />)}
                            contentContainerStyle={{ flex: 1, padding: AppConstants.screenPadding, gap: AppConstants.defaultGap }}
                        />
            }

        </SafeAreaView>
    )
}

export default VenueScreen

const styles = StyleSheet.create({})