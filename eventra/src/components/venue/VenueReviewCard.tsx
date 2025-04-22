import { Image, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { CustomImage } from '@components/global/CustomImage'
import { s, vs } from 'react-native-size-matters'
import CustomText from '@components/global/CustomText'
import StarRating from '@components/global/StarRating'
import ReadMore from '@components/global/ReadMore'

interface VenueReviewCardType {
    profilePic: string,
    name: string,
    star: number,
    review: string,
    createAt: string
}

const VenueReviewCard: FC<VenueReviewCardType> = ({ createAt = (new Date()).toISOString(), name = "John Doe", profilePic = "https://i.pinimg.com/736x/2d/7a/c4/2d7ac424de1f7ca83011beb9f8b25b59.jpg", review = "​Yes, Google Cloud offers a $300 free credit as part of its 90-day Free Trial for new users. This means you have 90 days from the time you sign up to use up to $300 worth of Google Cloud services. The trial ends when either the 90 days have elapsed or you've spent the entire $300 credit, whichever comes first ​Yes, Google Cloud offers a $300 free credit as part of its 90-day Free Trial for new users. This means you have 90 days from the time you sign up to use up to $300 worth of Google Cloud services. The trial ends when either the 90 days have elapsed or you've spent the entire $300 credit, whichever comes first", star = 4 }) => {
    return (
        <View style={{ gap: vs(10) }}>

            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>

                <View style={{ flexDirection: "row", gap: s(5) }}>

                    <CustomImage source={profilePic} width={s(40)} height={s(40)} style={{ borderRadius: s(40) }} />

                    <View style={{ justifyContent: "space-between" }}>
                        <CustomText fontWeight='600'>{name}</CustomText>
                        <StarRating rating={2.5} size={s(15)} />
                    </View>
                </View>

                <CustomText style={{ alignSelf: "flex-end" }}>1 Day Ago</CustomText>

            </View>

            <ReadMore text={review} numberOfLines={5} />

        </View>
    )
}

export default VenueReviewCard

const styles = StyleSheet.create({})