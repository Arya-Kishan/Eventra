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
                    <Text style={{ fontWeight: "600", fontSize: s(16) }}>Hello {name}</Text>
                    <Text style={{ color: "#5D5D5DFF" }}>{`${bio !== "" ? bio : " Explore The Events"}`}</Text>
                </View>

            </Pressable>

            {/* ICON BOX */}
            <View style={{ gap: AppConstants.defaultGap, flexDirection: "row" }}>

                <RoundedBox size={s(35)} >
                    <Icon iconType='Feather' icon='search' color='black' />
                </RoundedBox>

                <RoundedBox size={s(35)} onPress={() => navigation.navigate("ErrorScreen")} >
                    <Icon iconType='Feather' icon='bell' color='black' />
                </RoundedBox>
            </View>

        </View>
    )
}

export default HomeHeader

const styles = StyleSheet.create({
    headerContainer: { width: "100%", flexDirection: "row", justifyContent: "space-between" },
    avatarContainer: { gap: s(10), flexDirection: "row" },
})