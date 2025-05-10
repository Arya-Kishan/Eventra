import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from '@components/global/Icon'
import { s, vs } from 'react-native-size-matters'
import { AppConstants } from '@constants/AppConstants'
import { CustomImage } from '@components/global/CustomImage'
import { useNavigation } from '@react-navigation/native'
import { NavigationProps } from 'types/AppTypes'
import RoundedBox from '@components/global/RoundedBox'
import { useAppSelector } from '@store/hooks'

const HomeHeader = () => {
    const navigation = useNavigation<NavigationProps<'Main'>>();
    const { loggedInUser } = useAppSelector(store => store.user);
    const { name, bio, profilePic } = loggedInUser!;

    return (
        <View style={styles.headerContainer}>

            {/* avatar */}
            <Pressable onPress={() => navigation.navigate("ProfileScreen", { userId: loggedInUser?._id! })} style={styles.avatarContainer}>

                <CustomImage width={s(38)} height={s(38)} source={`${profilePic.url !== "" ? profilePic.url : "https://i.pinimg.com/736x/2d/7a/c4/2d7ac424de1f7ca83011beb9f8b25b59.jpg"}`} />

                <View>
                    <Text style={{ fontWeight: "600", fontSize: s(16),color:AppConstants.whiteColor }}>Hello {name}</Text>
                    <Text style={{ color: AppConstants.grayLightColor }}>{`${bio !== "" ? bio : " Explore The Events"}`}</Text>
                </View>

            </Pressable>

            {/* ICON BOX */}
            <View style={{ gap: s(6), flexDirection: "row",alignItems:"center" }}>

                <RoundedBox size={s(28)} viewStyle={{backgroundColor:"white"}} onPress={() => navigation.navigate("SearchScreen", { type: "event" })} >
                    <Icon iconType='Feather' icon='search' color='black' size={s(16)} />
                </RoundedBox>

                <RoundedBox size={s(28)} viewStyle={{backgroundColor:"white"}} onPress={() => navigation.navigate("NotificationScreen")} >
                    <Icon iconType='Feather' icon='bell' color='black' size={s(16)} />
                </RoundedBox>

            </View>

        </View>
    )
}

export default HomeHeader

const styles = StyleSheet.create({
    headerContainer: { width: "100%", flexDirection: "row", justifyContent: "space-between",backgroundColor:AppConstants.redColor,padding:AppConstants.screenPadding },
    avatarContainer: { gap: s(10), flexDirection: "row" },
})