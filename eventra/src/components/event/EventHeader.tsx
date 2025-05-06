import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { s, vs } from 'react-native-size-matters';
import CustomText from '@components/global/CustomText';
import Icon from '@components/global/Icon';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from 'types/AppTypes';
import { AppConstants } from '@constants/AppConstants';

const EventHeader = () => {

      const navigation = useNavigation<NavigationProps<'Main'>>();
      const dispatch = useAppDispatch();
      const { allEvents, upcomingEvents, eventLoader } = useAppSelector(store => store.event);

    return (
        <View style={{ gap: vs(30), backgroundColor: AppConstants.redColor, padding: AppConstants.screenPadding, borderBottomLeftRadius: s(30), borderBottomRightRadius: s(30) }}>

            <View style={{ flexDirection: "row", justifyContent: "space-between", gap: s(10), alignItems: "center" }}>
                <CustomText style={{ fontWeight: "800", fontSize: s(24), color: AppConstants.whiteColor, width: "80%" }} numberOfLines={2}>Explore the amazing Events near you</CustomText>

                <TouchableOpacity onPress={() => navigation.navigate("VenueScreen")}>
                    <Icon icon='fireplace-off' iconType='MaterialCommunityIcons' size={s(30)} />
                </TouchableOpacity>

            </View>

            <View style={{ flexDirection: "row", gap: s(10), alignItems: "center" }}>

                <View style={{ backgroundColor: "white", borderRadius: s(20), paddingHorizontal: s(10), paddingVertical: s(10), alignItems: "center", flexDirection: "row", justifyContent: "space-between", gap: s(5), flex: 1 }}>

                    <TextInput value='' onChangeText={() => { }} placeholder='Filter Event' style={{ flex: 1 }} />

                    <TouchableOpacity activeOpacity={0.5}>
                        <Icon iconType='Feather' icon='layers' color={"black"} size={s(18)} />
                    </TouchableOpacity>

                </View>

                <TouchableOpacity activeOpacity={0.5}>
                    <Icon iconType='Feather' icon='search' color={"white"} size={s(20)} />
                </TouchableOpacity>


            </View>

        </View>
    )
}

export default EventHeader

const styles = StyleSheet.create({})