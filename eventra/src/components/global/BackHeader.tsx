import { AppConstants } from '@constants/AppConstants'
import { useNavigation } from '@react-navigation/native'
import React, { FC } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { s } from 'react-native-size-matters'
import CustomText from './CustomText'
import Icon from './Icon'

interface BackHeaderProps {
    title: string
}

const BackHeader: FC<BackHeaderProps> = ({ title = "Create Event" }) => {

    const navigation = useNavigation();

    return (
        <View style={{ backgroundColor: AppConstants.redColor, padding: AppConstants.screenPadding, flexDirection: "row", gap: s(10), alignItems: "center" }}>
            <Pressable onPress={() => navigation.goBack()}><Icon icon='arrow-left' iconType='FontAwesome5' size={s(20)} /></Pressable>
            <CustomText variant='h2' style={{ color: AppConstants.whiteColor }}>{title}</CustomText>
        </View>
    )
}

export default BackHeader

const styles = StyleSheet.create({})