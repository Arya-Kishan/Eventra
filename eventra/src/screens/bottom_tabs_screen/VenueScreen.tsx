import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
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

const VenueScreen = () => {

    const tabBarHeight = useBottomTabBarHeight();
    const navigation = useNavigation<NavigationProps<'Main'>>();

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <View style={{ backgroundColor: AppConstants.redColor, padding: s(15), flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <CustomText style={{ fontWeight: "800", fontSize: s(25), color: AppConstants.whiteColor }}>Venue</CustomText>
                <RoundedBox size={s(30)} viewStyle={{ backgroundColor: "transparent" }} onPress={() => { navigation.navigate('CreateVenueScreen', { venueId: "12" }) }}>
                    <Icon icon='plus' iconType='Feather' size={s(25)} />
                </RoundedBox>
            </View>

            <FlatList
                data={AppTemporaryContants.temporaryVenueArr}
                renderItem={({ item, index }) => (<VenueCard item={item} index={index} />)}
                contentContainerStyle={{ padding: AppConstants.screenPadding, gap: AppConstants.defaultGap }}
            />

        </SafeAreaView>
    )
}

export default VenueScreen

const styles = StyleSheet.create({})