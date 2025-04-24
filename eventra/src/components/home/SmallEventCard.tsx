import { Image, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { s } from 'react-native-size-matters'
import Icon from '@components/global/Icon'
import RoundedButton from '@components/global/RoundedButton'
import { AppConstants } from '@constants/AppConstants'
import { EventType } from 'types/AppTypes'
import CustomText from '@components/global/CustomText'

interface SmallEventCardProps {
    item: EventType,
    index: number
}

const SmallEventCard: FC<SmallEventCardProps> = ({ item, index }) => {
    return (
        <View key={item._id} style={styles.main}>

            <Image source={{ uri: item.pic.url }} style={styles.image} />

            <View style={styles.rightContainer}>

                <CustomText style={styles.subTitle}>{item.title}</CustomText>

                <View style={styles.addressContainer}>

                    <View style={styles.address}>
                        <Icon icon='map-marker' iconType='MaterialCommunityIcons' color={AppConstants.grayColor} size={s(16)} />
                        <CustomText style={styles.city}>{`${typeof item.venue !== 'string' && item.venue.address.city},${typeof item.venue !== 'string' && item.venue.address.state}`}</CustomText>
                    </View>

                    <RoundedButton onPress={() => { }} title='Check' style={styles.btn} textStyle={{ fontSize: s(11) }} />
                </View>
            </View>
        </View>
    )
}

export default SmallEventCard

const styles = StyleSheet.create({
    main: { width: s(210), flexDirection: "row", gap: s(10) },
    image: { objectFit: "cover", width: s(50), height: s(50), borderRadius: s(14) },
    rightContainer: { justifyContent: "space-between", flex: 1 },
    subTitle: { fontSize: s(15), flexWrap: "wrap", fontWeight: "500" },
    addressContainer: { flexDirection: "row", justifyContent: "space-between" },
    address: { flexDirection: "row", gap: s(2), alignItems: "center" },
    city: { fontSize: s(11), flexWrap: "wrap", fontWeight: "400" },
    btn: { paddingVertical: 2, paddingHorizontal: 8, borderRadius: s(8) }

})