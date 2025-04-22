import CustomText from '@components/global/CustomText'
import RoundedButton from '@components/global/RoundedButton'
import { AppConstants } from '@constants/AppConstants'
import React, { FC } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { s } from 'react-native-size-matters'

interface DetailCard1Type {
    icon: any,
    title: string,
    subTitle: string,
    isPic?: boolean,
    picUrl?: string,
    showBtn?: boolean
}

const DetailCard1: FC<DetailCard1Type> = ({ icon, subTitle = "Tuesday 04:00 PM - 06:00 PM", title = "14 Decmber, 2024", isPic, picUrl = "https://i.pinimg.com/736x/2d/7a/c4/2d7ac424de1f7ca83011beb9f8b25b59.jpg", showBtn = false }) => {
    return (
        <View style={styles.main}>

            <View style={styles.iconBox}>
                {isPic ? <Image source={{ uri: picUrl }} style={styles.image} /> : icon}
            </View>

            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>

                <View style={styles.textBox}>
                    <CustomText style={styles.textBox}>{title}</CustomText>
                    <CustomText style={styles.subTitle}>{subTitle}</CustomText>
                </View>

                {
                    showBtn && <RoundedButton onPress={() => { }} title='Follow' style={{ paddingVertical: 2, paddingHorizontal: s(14), borderRadius: s(8) }} textStyle={{ fontSize: s(11) }} />
                }

            </View>



        </View>
    )
}

export default DetailCard1

const styles = StyleSheet.create({
    main: { flexDirection: "row", gap: s(5), width: "100%" },
    image: { width: "100%", height: "100%", objectFit: "contain" },
    iconBox: { width: s(40), height: s(40), justifyContent: "center", alignItems: "center", backgroundColor: AppConstants.lightRedColor, borderRadius: s(15), overflow: "hidden" },
    textBox: { flex: 1, justifyContent: "space-between" },
    title: { fontSize: s(14), fontWeight: "600" },
    subTitle: { fontSize: s(12), fontWeight: "600", color: AppConstants.darkGrayColor },
})