import { CustomImage } from '@components/global/CustomImage'
import CustomLoader from '@components/global/CustomLoader'
import CustomText from '@components/global/CustomText'
import EmptyData from '@components/global/EmptyData'
import Icon from '@components/global/Icon'
import RoundedBox from '@components/global/RoundedBox'
import RoundedButton from '@components/global/RoundedButton'
import { AppConstants } from '@constants/AppConstants'
import { createCommentPostApi, deletePostCommentApi, getCommentsOfSinglePostApi } from '@services/PostService'
import { useAppSelector } from '@store/hooks'
import React, { FC, useEffect, useState } from 'react'
import { FlatList, Modal, StyleSheet, TextInput, View } from 'react-native'
import { s, vs } from 'react-native-size-matters'
import { PostCommentType } from 'types/AppTypes'
import PostCommentCard from './PostCommentCard'

interface PostCommentProps {
    setShow: (val: boolean) => void,
    postId: string,
    commentLength: number,
    setCommentLength: (val: number) => void;
}

const PostComment: FC<PostCommentProps> = ({ setShow, postId, setCommentLength, commentLength }) => {

    const [loader, setLoader] = useState<boolean>(false);
    const [addCommentLoader, setAddCommentLoader] = useState<boolean>(false);
    const [commentText, setCommentText] = useState<string>("");
    const { loggedInUser } = useAppSelector(store => store.user);
    const [allComments, setAllComments] = useState<PostCommentType[] | null>(null);

    const fetchPostComments = async () => {
        setLoader(true);
        const { success, data } = await getCommentsOfSinglePostApi(postId);
        setLoader(false);
        setAllComments(data.data);
        console.log(data.data)
    }


    const createPostComment = async () => {
        console.log("ADDING COMMENT TO POST ID : ", postId)
        setAddCommentLoader(true);
        const newComment: PostCommentType = { comment: commentText, user: loggedInUser!._id, post: postId }
        const { success, data } = await createCommentPostApi(newComment);
        console.log("UPDATED DATA : ", data.data)
        if (success) {
            setCommentLength(commentLength + 1);
            setAllComments((prev) => ([...prev!, data.data]))
        }
        setAddCommentLoader(false);
        console.log(data.data)
    }

    useEffect(() => {
        fetchPostComments();
    }, [postId])

    useEffect(() => {
        setCommentLength(allComments?.length!)
    }, [allComments])


    console.log("POST ID :", postId)

    return (
        <View style={{ flex: 1, backgroundColor: "#000000D6", justifyContent: "flex-end", alignItems: "center", gap: vs(10) }}>

            <RoundedBox size={s(49)} viewStyle={{ backgroundColor: AppConstants.redColor }} onPress={() => { setShow(false) }}>
                    <Icon icon='x' iconType='Feather' size={s(30)} />
            </RoundedBox>

            <View style={{ width: "100%", backgroundColor: AppConstants.whiteColor, padding: s(15), borderRadius: s(20), gap: vs(10), height: vs(350) }}>

                {
                    loader
                        ?
                        <CustomLoader />
                        :
                        allComments && allComments.length == 0
                            ?
                            <EmptyData handleAddClick={() => { }} title='NO COMMENTS' />
                            :
                            <FlatList
                                data={allComments!}
                                renderItem={({ item }: { item: PostCommentType }) => (
                                    <PostCommentCard item={item} comments={allComments!} setComments={setAllComments} />
                                )}
                                contentContainerStyle={{ gap: vs(10) }}
                            />
                }

                {/* ADD COMMENT */}
                <View style={{ flexDirection: "row", gap: s(6), justifyContent: "space-between", marginTop: vs(20) }}>
                    <TextInput value={commentText} onChangeText={setCommentText} style={{ backgroundColor: AppConstants.whiteColor, padding: s(8), borderWidth: 2, borderRadius: s(10), fontSize: s(15), flex: 1 }} placeholderTextColor={AppConstants.grayColor} placeholder='Write Comment' />

                    <RoundedButton title='Add' onPress={createPostComment} loading={addCommentLoader} disabled={addCommentLoader} />
                </View>

            </View>

        </View>
    )
}

export default PostComment

const styles = StyleSheet.create({})