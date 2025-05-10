import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { NavigationProps, PostType, RouteProps } from 'types/AppTypes';
import { getSinglePostApi } from '@services/PostService';
import PostCard from '@components/post/PostCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomLoader from '@components/global/CustomLoader';
import EmptyData from '@components/global/EmptyData';
import { AppConstants } from '@constants/AppConstants';

const SinglePostScreen = () => {
    const [loader, setLoader] = useState<boolean>(false);
    const { params } = useRoute<RouteProps<"SinglePostScreen">>();
    const navigation = useNavigation<NavigationProps<"SinglePostScreen">>();
    const [postDetail, setPostDetail] = useState<PostType | null>(null);

    const fetchSinglePost = async () => {
        setLoader(true);
        const { data, success } = await getSinglePostApi(params.postId);
        console.log("SINGLE POST DATA : ", data.data)
        success ? setPostDetail(data.data) : navigation.navigate("ErrorScreen");
        setLoader(false);
    }

    useEffect(() => {
        fetchSinglePost();
    }, [])

    return (
        <SafeAreaView style={{ flex: 1,padding:AppConstants.screenPadding }}>

            {
                loader
                    ?
                    <CustomLoader />
                    :
                    postDetail
                        ?
                        <PostCard post={postDetail} />
                        :
                        <EmptyData title='NO DATA' />
            }


        </SafeAreaView>
    )
}

export default SinglePostScreen

const styles = StyleSheet.create({})