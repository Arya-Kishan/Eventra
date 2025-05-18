import { Image, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { s, vs } from 'react-native-size-matters'
import CustomText from '@components/global/CustomText'
import { SpotLightType } from 'types/AppTypes'
import { AppConstants } from '@constants/AppConstants'

interface SpotlightCardType {
    item: SpotLightType,
    index: number
}

const SpotLightCard: FC<SpotlightCardType> = ({ item, index }) => {
    return (
        <View style={styles.main}>
            <Image source={{ uri: item.pic.url }} style={styles.image} />
            <CustomText numberOfLines={1}>{item.title}</CustomText>
            <CustomText numberOfLines={1}>{item.description}</CustomText>
        </View>
    )
}

export default SpotLightCard

const styles = StyleSheet.create({
    main: { width: s(120), height: vs(200), borderRadius: AppConstants.borderRadius, overflow: "hidden" },
    image: { flex: 1, objectFit: "cover", borderRadius: AppConstants.borderRadius },
    title: { fontSize: s(16), fontWeight: "600" },
    subTitle: { fontSize: s(12), fontWeight: "400" },
})