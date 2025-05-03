import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import BackHeader from '@components/global/BackHeader'
import { s } from 'react-native-size-matters'
import { CustomImage } from '@components/global/CustomImage'
import { AppConstants } from '@constants/AppConstants'
import CustomText from '@components/global/CustomText'
import { formatDate } from '@utils/Helper'
import RoundedBox from '@components/global/RoundedBox'
import { useNavigation } from '@react-navigation/native'
import { NavigationProps, userType } from 'types/AppTypes'
import { useAppSelector } from '@store/hooks'

const ChatDashboardScreen = () => {

    const navigation = useNavigation<NavigationProps<"ChatDashboardScreen">>();
    const { loggedInUser } = useAppSelector(store => store.user);
    const { unOpenedMessages } = useAppSelector(store => store.chat);

    console.log("LOGGED IN USER : ", loggedInUser)
    const { chats } = loggedInUser!;
    console.log("unOpenedMessages : ", unOpenedMessages)


    return (
        <SafeAreaView>

            <BackHeader title='Messages' />

            <FlatList
                data={chats}
                renderItem={({ item }: { item: userType }) => (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate("ChatScreen", { user: item })}
                        style={{ flexDirection: "row", gap: s(4), justifyContent: "space-between", alignItems: "center" }}>

                        <CustomImage source={item?.profilePic?.url !== undefined ? item?.profilePic?.url : AppConstants.fallbackProfilePic} width={s(50)} height={s(50)} />

                        <View style={{ flex: 1, flexDirection: "row", gap: s(4), justifyContent: "space-between" }}>

                            <View style={{ justifyContent: "space-between", gap: s(10) }}>
                                <CustomText variant='h4'>{item.name}</CustomText>
                                <CustomText>Arya is op I know</CustomText>
                            </View>

                            <View style={{ justifyContent: "space-between", alignItems: "flex-end", gap: s(10) }}>
                                <CustomText>{formatDate(new Date().toISOString())}</CustomText>
                                <RoundedBox size={s(20)} onPress={() => { }}>
                                    <CustomText variant='overline' fontWeight='700'>12</CustomText>
                                </RoundedBox>
                            </View>

                        </View>


                    </TouchableOpacity>
                )}
                contentContainerStyle={{ gap: s(10), padding: AppConstants.screenPadding }}
            />


        </SafeAreaView>
    )
}

export default ChatDashboardScreen

const styles = StyleSheet.create({})