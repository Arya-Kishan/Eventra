import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import CustomText from '@components/global/CustomText'
import { AppConstants } from '@constants/AppConstants'
import { s } from 'react-native-size-matters'

interface TimeSlotType {
    start: string,
    end: string,
    isBooked?: boolean
}

const TimeSlot: FC<TimeSlotType> = ({ start, end, isBooked = false }) => {
    return (
        <View style={[styles.main, isBooked && { backgroundColor: AppConstants.greenColor }]}>
            <CustomText variant='body2' fontWeight='500'>{start}</CustomText>
            <CustomText>-</CustomText>
            <CustomText variant='body2' fontWeight='500'>{end}</CustomText>
        </View>
    )
}

export default TimeSlot

const styles = StyleSheet.create({
    main: { alignSelf: "flex-start", flexDirection: "row", backgroundColor: AppConstants.grayLightColor, padding: s(8), borderRadius: s(10), gap: s(4) },
})