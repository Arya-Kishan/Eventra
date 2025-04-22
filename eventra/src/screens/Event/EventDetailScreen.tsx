import DetailCard1 from '@components/event/DetailCard1'
import { CustomImage } from '@components/global/CustomImage'
import CustomText from '@components/global/CustomText'
import Icon from '@components/global/Icon'
import RoundedButton from '@components/global/RoundedButton'
import { AppConstants } from '@constants/AppConstants'
import { RouteProp, useRoute } from '@react-navigation/native'
import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { s, vs } from 'react-native-size-matters'
import { RootStackParamList } from 'types/AppTypes'

type EventDetailsScreenRouteProp = RouteProp<RootStackParamList, 'EventDetailScreen'>;

const EventDetailScreen = () => {

    const route = useRoute<EventDetailsScreenRouteProp>();
    const { event } = route.params;

    const { address, dateAndTime, description, host, location, participants, pic, subTitle, title } = event;

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <ScrollView style={{ flex: 1, backgroundColor: AppConstants.screenBgColor }}>

                <View style={{ position: "relative", marginBottom: s(20) }}>

                    <CustomImage source={pic} width={AppConstants.screenWidth} height={vs(200)} borderRadius={0} />

                    <View style={{ position: "absolute", bottom: -s(20), left: "50%", transform: [{ translateX: "-50%" }], flexDirection: "row", gap: s(20), backgroundColor: "white", borderRadius: s(10), width: "70%", padding: s(6), height: s(40), justifyContent: "center", alignItems: "center", elevation: 3 }}>

                        <Text>20+ Participated</Text>

                        <RoundedButton title='Invite' onPress={() => { }} style={{ paddingVertical: s(2) }} />

                    </View>

                </View>

                <View style={{ paddingHorizontal: AppConstants.screenPadding, gap: AppConstants.defaultGap }}>

                    <CustomText style={{ fontSize: s(30), fontWeight: "800" }} numberOfLines={2}>{title}</CustomText>

                    {/* EVENT DETAILS DATE,TIME, HOST INFO */}
                    <View style={{ gap: AppConstants.defaultGap }}>

                        <DetailCard1 icon={<Icon iconType='MaterialIcons' icon='calendar-month' color={AppConstants.redColor} />} title='14 Decmber, 2024' subTitle='Tuesday 04:00 PM - 06:00 PM' />

                        <DetailCard1 icon={<Icon iconType='FontAwesome' icon='map-marker' color={AppConstants.redColor} />} title='Gala Convention Center' subTitle='34 GB Road, Near Kaushal Enterprise, Patna' />

                        <DetailCard1 icon={<Icon iconType='MaterialIcons' icon='calendar-month' color={AppConstants.redColor} />} title='14 Decmber, 2024' subTitle='Tuesday 04:00 PM - 06:00 PM' isPic={true} picUrl='https://i.pinimg.com/736x/2d/7a/c4/2d7ac424de1f7ca83011beb9f8b25b59.jpg' showBtn={true} />

                    </View>

                    {/* ABOUT */}
                    <View>
                        <CustomText style={{ fontWeight: "800", fontSize: s(18) }} >About Event</CustomText>
                        <Text style={{ fontWeight: "400", fontSize: s(14), marginTop: vs(4) }} >
                            Extraterrestrial: This is the most common association with the word alien It refers to a living being that does not originate from Earth, often used in the context of science fiction
                            Non-citizen: In legal terms, an alien is a person who is not a citizen of the country where they reside. They may be a legal resident, but they do not have the rights and obligations of a citizen.
                            Foreign/Strange: The word can also describe something that is not native to a particular place, environment, or way of life. It can also refer to ideas, beliefs, or behaviors that are not part of a culture or groupExtraterrestrial: This is the most common association with the word alien It refers to a living being that does not originate from Earth, often used in the context of science fiction
                            Non-citizen: In legal terms, an alien is a person who is not a citizen of the country where they reside. They may be a legal resident, but they do not have the rights and obligations of a citizen.
                            Foreign/Strange: The word can also describe something that is not native to a particular place, environment, or way of life. It can also refer to ideas, beliefs, or behaviors that are not part of a culture or groupExtraterrestrial: This is the most common association with the word alien It refers to a living being that does not originate from Earth, often used in the context of science fiction
                            Non-citizen: In legal terms, an alien is a person who is not a citizen of the country where they reside. They may be a legal resident, but they do not have the rights and obligations of a citizen.
                            Foreign/Strange: The word can also describe something that is not native to a particular place, environment, or way of life. It can also refer to ideas, beliefs, or behaviors that are not part of a culture or groupExtraterrestrial: This is the most common association with the word alien It refers to a living being that does not originate from Earth, often used in the context of science fiction
                            Non-citizen: In legal terms, an alien is a person who is not a citizen of the country where they reside. They may be a legal resident, but they do not have the rights and obligations of a citizen.
                            Foreign/Strange: The word can also describe something that is not native to a particular place, environment, or way of life. It can also refer to ideas, beliefs, or behaviors that are not part of a culture or groupExtraterrestrial: This is the most common association with the word alien It refers to a living being that does not originate from Earth, often used in the context of science fiction
                            Non-citizen: In legal terms, an alien is a person who is not a citizen of the country where they reside. They may be a legal resident, but they do not have the rights and obligations of a citizen.
                            Foreign/Strange: The word can also describe something that is not native to a particular place, environment, or way of life. It can also refer to ideas, beliefs, or behaviors that are not part of a culture or groupExtraterrestrial: This is the most common association with the word alien It refers to a living being that does not originate from Earth, often used in the context of science fiction
                            Non-citizen: In legal terms, an alien is a person who is not a citizen of the country where they reside. They may be a legal resident, but they do not have the rights and obligations of a citizen.
                            Foreign/Strange: The word can also describe something that is not native to a particular place, environment, or way of life. It can also refer to ideas, beliefs, or behaviors that are not part of a culture or group
                        </Text>
                    </View>

                </View>

            </ScrollView>

            <View style={{ width: "100%", position: "absolute", bottom: 0, left: 0, justifyContent: "space-between", flexDirection: "row", alignItems: "center", backgroundColor: AppConstants.whiteColor, elevation: 4, paddingHorizontal: AppConstants.screenPadding, paddingVertical: vs(6) }}>

                <Text style={{ fontWeight: "800", fontSize: s(18) }}>$120</Text>

                <RoundedButton onPress={() => { }} title='Book Now' style={{ paddingVertical: s(8) }} />

            </View>

        </SafeAreaView>
    )
}

export default EventDetailScreen

const styles = StyleSheet.create({})