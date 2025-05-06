import CustomText from '@components/global/CustomText'
import Icon from '@components/global/Icon'
import { AppConstants } from '@constants/AppConstants'
import { useNavigation } from '@react-navigation/native'
import React, { FC } from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import Animated, { FadeIn } from 'react-native-reanimated'
import { s } from 'react-native-size-matters'
import { NavigationProps, VenueType } from 'types/AppTypes'

interface VenueCardProps {
    item: VenueType,
    index: number
}



const VenueCard: FC<VenueCardProps> = ({ item, index }) => {
    const navigation = useNavigation<NavigationProps<'Main'>>();

    return (
        <Animated.View entering={FadeIn}>
            <Pressable onPress={() => { navigation.navigate("VenueDetailScreen", { venueId: item._id }) }} key={index} style={styles.main}>

                <Image source={{ uri: item.pic.url }} style={styles.image} />

                <View style={{ width: "100%", gap: s(5), padding: s(8), position: "absolute", bottom: 0, left: 0, backgroundColor: "#FFFFFFB9" }}>
                    <CustomText style={styles.title}>{item.title}</CustomText>

                    <View style={styles.address}>
                        <Icon icon='map-marker' iconType='MaterialCommunityIcons' color={AppConstants.redColor} size={s(16)} />
                        <CustomText style={styles.city}>{`${item.address.city},${item.address.state}`}</CustomText>
                    </View>
                </View>

            </Pressable>
        </Animated.View>
    )
}

export default VenueCard

const styles = StyleSheet.create({
    main: { width: "auto", backgroundColor: AppConstants.whiteColor, elevation: 2, borderRadius: s(10), overflow: "hidden" },
    image: { width: "100%", height: s(200), objectFit: "cover" },
    title: { fontSize: s(17), flexWrap: "wrap", fontWeight: "500" },
    addressContainer: { flexDirection: "row", justifyContent: "space-between" },
    address: { flexDirection: "row", gap: s(2), alignItems: "center" },
    time: { fontSize: s(13), flexWrap: "wrap", fontWeight: "500", color: AppConstants.redColor },
    city: { fontSize: s(12), flexWrap: "wrap", fontWeight: "400" },
    btn: { paddingVertical: 2, paddingHorizontal: 8, borderRadius: s(8) }

})