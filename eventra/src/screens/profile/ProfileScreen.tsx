import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { s, vs } from 'react-native-size-matters'
import LinearGradient from 'react-native-linear-gradient'
import Icon from '@components/global/Icon'
import CustomText from '@components/global/CustomText'
import { AppConstants } from '@constants/AppConstants'
import { CustomImage } from '@components/global/CustomImage'
import RoundedButton from '@components/global/RoundedButton'
import { useDispatch } from 'react-redux'
import { useAppDispatch } from '@store/hooks'
import { setLoggedInUser } from '@store/reducers/userSlice'
import { AsyncDeleteData } from '@utils/AsyncStorage'

const ProfileScreen = () => {

    const allTempPosts = ["https://i.pinimg.com/736x/d9/a0/20/d9a02032e33fe70ef4075cc9d1b77815.jpg", "https://i.pinimg.com/736x/ed/ed/4d/eded4d69e8116d7c28b8e3fdcfcdef05.jpg", "https://i.pinimg.com/736x/25/67/8a/25678aaaa9fa12b11a6fc4e42cb59a61.jpg", "https://i.pinimg.com/736x/40/0e/11/400e11f327a32eb765fd7782c747f556.jpg"]
    const dispatch = useAppDispatch();

    const handleLogout = async () => {
        dispatch(setLoggedInUser(null));
        await AsyncDeleteData();
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "red" }}>

            <ScrollView style={{ flex: 1, backgroundColor: "orange" }}>

                <LinearGradient
                    colors={['#FF0000FF', '#B60000FF', '#8E0000FF']}
                    style={{ height: vs(300), backgroundColor: "blue", padding: AppConstants.screenPadding, gap: vs(50) }}>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Icon icon='person' iconType='MaterialIcons' size={s(25)} />
                        <CustomText variant='h3' style={{ color: AppConstants.whiteColor }}>My Profile</CustomText>
                        <Icon icon='edit' iconType='Feather' />
                    </View>

                    <View style={{ gap: vs(10) }}>
                        <CustomText variant='h1' style={{ fontSize: s(40), color: AppConstants.whiteColor }} >Arya Kishan</CustomText>
                        <CustomText variant='body1' style={{ color: AppConstants.whiteColor }} >Hii Myself handsome Buddy no one meets</CustomText>
                    </View>


                </LinearGradient>

                <View
                    style={{ minHeight: AppConstants.screenHeight - vs(260), height: "100%", backgroundColor: AppConstants.whiteColor, transform: [{ translateY: -vs(40) }], borderTopLeftRadius: s(30), borderTopRightRadius: s(30), padding: AppConstants.screenPadding, gap: AppConstants.screenPadding, paddingTop: vs(70) }}>

                    <View style={{ position: "absolute", top: -s(30), left: s(30), backgroundColor: AppConstants.whiteColor, borderRadius: s(10), padding: s(2) }}>
                        <CustomImage source={AppConstants.fallbackProfilePic} width={s(80)} height={s(80)} style={{}} />
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>

                        <View style={{ width: s(70), height: s(70), elevation: 10, backgroundColor: AppConstants.whiteColor, borderRadius: s(20), justifyContent: "center", alignItems: "center" }}>
                            <CustomText variant='h4'>120</CustomText>
                            <CustomText variant='subtitle2'>Apple</CustomText>
                        </View>
                        <View style={{ width: s(70), height: s(70), elevation: 10, backgroundColor: AppConstants.whiteColor, borderRadius: s(20), justifyContent: "center", alignItems: "center" }}>
                            <CustomText variant='h4'>120</CustomText>
                            <CustomText variant='subtitle2'>Apple</CustomText>
                        </View>
                        <View style={{ width: s(70), height: s(70), elevation: 10, backgroundColor: AppConstants.whiteColor, borderRadius: s(20), justifyContent: "center", alignItems: "center" }}>
                            <CustomText variant='h4'>120</CustomText>
                            <CustomText variant='subtitle2'>Apple</CustomText>
                        </View>

                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <CustomText variant='h5'>My Post</CustomText>
                        <Icon icon='edit' iconType='Feather' color='black' />
                    </View>

                    <FlatList
                        data={allTempPosts}
                        renderItem={({ item }) => (
                            <View style={{ width: AppConstants.screenWidth / 2 - AppConstants.screenPadding * 1.5, height: AppConstants.screenWidth / 2 - AppConstants.screenPadding }}>
                                <CustomImage width={"100%"} height={"100%"} source={item} />
                            </View>
                        )}
                        numColumns={2}
                        keyExtractor={(item) => item.toString()}
                        scrollEnabled={false}
                        contentContainerStyle={{ gap: AppConstants.screenPadding }}
                        columnWrapperStyle={{ gap: AppConstants.screenPadding }}
                    />


                </View>

            </ScrollView>

            <RoundedButton title='LOGOUT' onPress={handleLogout} />

        </SafeAreaView>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    full: { flex: 1 }
})