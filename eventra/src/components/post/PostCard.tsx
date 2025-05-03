import { CustomImage } from '@components/global/CustomImage'
import CustomText from '@components/global/CustomText'
import Icon from '@components/global/Icon'
import { AppConstants } from '@constants/AppConstants'
import { updatePostApi } from '@services/PostService'
import { useAppSelector } from '@store/hooks'
import React, { FC, Suspense, useEffect, useState } from 'react'
import { Modal, Pressable, StyleSheet, View } from 'react-native'
import { s, vs } from 'react-native-size-matters'
import Video from 'react-native-video'
import { PostType } from 'types/AppTypes'
const PostComment = React.lazy(() => import('./PostComment'));

interface PostCardProps {
    post: PostType
}

const PostCard: FC<PostCardProps> = ({ post }) => {

    const [showCommentModal, setShowCommentModal] = useState(false);

    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [commentLength, setCommentLength] = useState<number>(post.comments.length);
    const [likesLength, setLikesLength] = useState<number>(post.likes!.length);
    const { loggedInUser } = useAppSelector(store => store.user);

    const handleLike = async () => {
        setIsLiked(isLiked ? false : true)
        setLikesLength(isLiked ? likesLength - 1 : likesLength + 1);
        const formdata = new FormData();
        formdata.append("likes", loggedInUser?._id);
        const { data, success } = await updatePostApi(formdata, post._id, `category=likes&type=${isLiked ? "delete" : "add"}`)
    }

    const checkIsLiked = () => {
        const bool = post.likes?.some((item) => (item._id == loggedInUser?._id));
        setIsLiked(bool!);
    }

    useEffect(() => {
        checkIsLiked();
    }, [])


    return (
        <View style={{ gap: vs(10) }}>

            {/* USER NAME, PIC THREE DOT */}
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>

                {
                    typeof post.user !== 'string'
                    &&
                    <View style={{ flexDirection: "row", justifyContent: "space-between", gap: s(10), alignItems: "center" }}>
                        <CustomImage source={"https://i.pinimg.com/474x/ef/9f/4c/ef9f4c5f75111da91ed81c859b34f4ac.jpg"} width={s(40)} height={s(40)} style={{ aspectRatio: 1 / 1, objectFit: "cover" }} />
                        <View>
                            <CustomText variant='h4'>{post.user.name}</CustomText>
                            <CustomText variant='subtitle1'>{post.user.bio}</CustomText>
                        </View>
                    </View>

                }
                <CustomText>:</CustomText>

            </View>

            <View>
                {
                    post.file.fileType == "image"
                        ?
                        <CustomImage source={post.file.url!} width={AppConstants.screenWidth - AppConstants.screenPadding * 2} height={AppConstants.screenWidth} style={{ aspectRatio: 1 / 1, objectFit: "cover" }} />
                        :
                        <Video
                            source={{ uri: post.file.url }} // replace with your video URL or local file
                            style={styles.video}
                            controls={true}
                            resizeMode="contain"
                        />
                }
            </View>

            {/* COMMENT,LIKES,SHARE */}
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>

                {/* COMMENT AND LIKES */}
                <View style={{ flexDirection: "row", justifyContent: "space-between", gap: s(10) }}>

                    {/* comment */}
                    <Pressable onPress={() => setShowCommentModal(true)} style={{ flexDirection: "row", justifyContent: "space-between", gap: s(10) }}>
                        <Icon icon='comment-o' iconType='FontAwesome' color={AppConstants.darkGrayColor} />
                        <CustomText>{`${commentLength}`}</CustomText>
                    </Pressable>

                    {/* likes */}
                    <Pressable onPress={handleLike} style={{ flexDirection: "row", justifyContent: "space-between", gap: s(10) }}>
                        <Icon icon='heart' iconType={`${isLiked ? "FontAwesome" : "Feather"}`} color={`${isLiked ? AppConstants.redColor : AppConstants.grayColor}`} />
                        <CustomText>{`${likesLength}`}</CustomText>
                    </Pressable>

                </View>

                {/* SHARE */}
                <Icon icon='share' iconType='FontAwesome' color={AppConstants.darkGrayColor} />

            </View>


            <Modal
                visible={showCommentModal}
                animationType='slide'
                transparent={true}
                onRequestClose={() => setShowCommentModal(false)}
            >

                {showCommentModal && (
                    <Suspense fallback={<CustomText>Loading...</CustomText>}>
                        <PostComment postId={post._id} setShow={setShowCommentModal} setCommentLength={setCommentLength} commentLength={commentLength} />
                    </Suspense>
                )}

            </Modal>


        </View>
    )
}

export default PostCard

const styles = StyleSheet.create({
    video: {
        width: '100%',
        height: 300,
    },
})