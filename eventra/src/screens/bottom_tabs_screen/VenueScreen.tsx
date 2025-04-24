import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomText from '@components/global/CustomText'
import { s, vs } from 'react-native-size-matters'
import { AppConstants } from '@constants/AppConstants'
import VenueCard from '@components/venue/VenueCard'
import { AppTemporaryContants } from '@constants/AppTemporaryConstants'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import RoundedBox from '@components/global/RoundedBox'
import Icon from '@components/global/Icon'
import { useNavigation } from '@react-navigation/native'
import { NavigationProps } from 'types/AppTypes'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import CustomLoader from '@components/global/CustomLoader'
import { getAllVenueApi } from '@services/VenueServices'
import { setAllVenues, setVenueLoader } from '@store/reducers/venueSlice'

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
                <RoundedBox size={s(30)} viewStyle={{ backgroundColor: "transparent" }} onPress={() => { navigation.navigate('CreateVenueScreen', { venue: null, method: "create" }) }}>
                    <Icon icon='plus' iconType='Feather' size={s(25)} />
                </RoundedBox>
            </View>

            {
                venueLoader == "loading"
                    ?
                    <CustomLoader />
                    :
                    <FlatList
                        data={allVenues}
                        renderItem={({ item, index }) => (<VenueCard item={item} index={index} />)}
                        contentContainerStyle={{ flex: 1, padding: AppConstants.screenPadding, gap: AppConstants.defaultGap }}
                        ListEmptyComponent={() => (
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: vs(20) }}>
                                <Text>NO VENUES</Text>
                                <RoundedBox size={s(25)} onPress={() => navigation.navigate("CreateVenueScreen", { venue: null, method: "create" })}>
                                    <Icon icon='plus' iconType='Feather' />
                                </RoundedBox>
                            </View>
                        )}
                    />
            }

        </SafeAreaView>
    )
}

export default VenueScreen

const styles = StyleSheet.create({})