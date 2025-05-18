import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from '@components/global/Icon'
import { s, vs } from 'react-native-size-matters'
import { AppConstants } from '@constants/AppConstants'
import { CustomImage } from '@components/global/CustomImage'
import { useNavigation } from '@react-navigation/native'
import { NavigationProps, NotificationType } from 'types/AppTypes'
import RoundedBox from '@components/global/RoundedBox'
import { useAppSelector } from '@store/hooks'
import CustomText from '@components/global/CustomText'

const HomeHeader = () => {
    const navigation = useNavigation<NavigationProps<'Main'>>();
    const { loggedInUser, allNotifications } = useAppSelector(store => store.user);
    const { name, bio, profilePic } = loggedInUser!;

    const getNotificationCount = (): number => {
        return allNotifications ? allNotifications!.filter((obj: NotificationType) => obj.isRead === false).length : 0
    }

    return (
        <View style={styles.headerContainer}>

            {/* avatar */}
            <Pressable onPress={() => navigation.navigate("ProfileScreen", { userId: loggedInUser?._id! })} style={styles.avatarContainer}>

                <CustomImage width={s(38)} height={s(38)} source={`${profilePic.url !== "" ? profilePic.url : "https://i.pinimg.com/736x/2d/7a/c4/2d7ac424de1f7ca83011beb9f8b25b59.jpg"}`} />

                <View>
                    <Text style={{ fontWeight: "600", fontSize: s(16), color: AppConstants.whiteColor }}>Hello {name}</Text>
                    <Text style={{ color: AppConstants.grayLightColor }}>{`${bio !== "" ? bio : " Explore The Events"}`}</Text>
                </View>

            </Pressable>

            {/* ICON BOX */}
            <View style={{ gap: s(0), flexDirection: "row", alignItems: "center" }}>

                <RoundedBox size={s(35)} viewStyle={{ backgroundColor: "transparent" }} onPress={() => navigation.navigate("SearchScreen", { type: "event" })} >
                    <Icon iconType='Feather' icon='search' color='white' size={s(20)} />
                </RoundedBox>

                <RoundedBox size={s(35)} viewStyle={{ backgroundColor: "transparent", position: "relative" }} onPress={() => navigation.navigate("NotificationScreen")} >
                    <Icon iconType='Feather' icon='bell' color='white' size={s(20)} />
                    {
                        getNotificationCount() == 0
                            ?
                            ""
                            :
                            <View style={styles.circular}>
                                <CustomText variant='overline'>{`${getNotificationCount()}`}</CustomText>
                            </View>
                    }
                </RoundedBox>


            </View>

        </View>
    )
}

export default HomeHeader

const styles = StyleSheet.create({
    headerContainer: { width: "100%", flexDirection: "row", justifyContent: "space-between", backgroundColor: AppConstants.redColor, padding: AppConstants.screenPadding },
    avatarContainer: { gap: s(10), flexDirection: "row" },
    circular: { position: "absolute", top: -s(1), right: s(2), width: s(15), height: s(15), borderRadius: s(30), backgroundColor: AppConstants.greenColor, justifyContent: "center", alignItems: "center" }
})