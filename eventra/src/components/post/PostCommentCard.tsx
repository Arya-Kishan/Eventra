import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { CustomImage } from '@components/global/CustomImage'
import CustomText from '@components/global/CustomText'
import { s } from 'react-native-size-matters'
import { AppConstants } from '@constants/AppConstants'
import { formatDate, formatTime } from '@utils/Helper'
import { PostCommentType } from 'types/AppTypes'
import { deletePostCommentApi } from '@services/PostService'
import Icon from '@components/global/Icon'
import { useAppSelector } from '@store/hooks'

interface PostCommentCardProps {
    item: PostCommentType,
    comments: PostCommentType[],
    setComments: (val: PostCommentType[]) => void
}

const PostCommentCard: FC<PostCommentCardProps> = ({ item, comments, setComments }) => {

    const { loggedInUser } = useAppSelector(store => store.user);

    const deleteComment = async () => {
        console.log("DELETE COMMENTS")
        const { data, success } = await deletePostCommentApi(item._id!);
        if (success) {
            const filter = comments.filter((val) => (val._id !== item._id))
            setComments(filter);

        }
    }

    return (
        <View style={{ flexDirection: "row", gap: s(10), justifyContent: "space-between" }}>

            <View style={{ flexDirection: "row", gap: s(10) }}>

                <CustomImage width={s(35)} height={s(35)} source={typeof item.user !== "string" ? item.user.profilePic.url : AppConstants.fallbackProfilePic} />

                <View style={{ justifyContent: "space-between", gap: s(6) }}>
                    <CustomText variant='h5'>{typeof item.user !== "string" ? item.user.name : "User"}</CustomText>
                    <CustomText style={{ fontSize: s(11) }} numberOfLines={2}>{item.comment}</CustomText>
                </View>
            </View>

            <View style={{ gap: s(6),justifyContent:"space-between" }}>
                <CustomText variant='caption' style={{}}>{`${formatDate(item.createdAt!)}`}</CustomText>
                <Pressable onPress={deleteComment} style={{ alignItems: "flex-end", justifyContent: "flex-end" }}>
                    {
                        loggedInUser?._id == (typeof item.user !== "string" && item.user._id)
                            ?
                            <Icon icon='delete' iconType='MaterialCommunityIcons' color={AppConstants.redColor} size={s(14)} />
                            :
                            ""
                    }
                </Pressable>
            </View>

        </View>
    )
}

export default PostCommentCard

const styles = StyleSheet.create({})