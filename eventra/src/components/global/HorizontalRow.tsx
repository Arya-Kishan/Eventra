import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { s } from 'react-native-size-matters'
import { AppConstants } from '@constants/AppConstants'

interface HorizontalRowType {
    leftText: string,
    rightText: string,
}

const HorizontalRow: FC<HorizontalRowType> = ({ leftText, rightText }) => {
    return (
        <View style={styles.main}>
            <Text style={styles.leftText}>{leftText}</Text>
            <Text style={styles.rightText}>{rightText}</Text>
        </View>
    )
}

export default HorizontalRow

const styles = StyleSheet.create({
    main: {
        width: "100%",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center"
    },
    leftText: {
        fontSize: s(20),
        fontWeight: "600"
    },
    rightText: {
        fontSize: s(14),
        color: AppConstants.redColor
    }

})