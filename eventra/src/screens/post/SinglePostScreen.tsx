import CustomSafeScreen from '@components/CustomSafeScreen';
import CustomLoader from '@components/global/CustomLoader';
import EmptyData from '@components/global/EmptyData';
import PostCard from '@components/post/PostCard';
import {AppConstants} from '@constants/AppConstants';
import {useNavigation, useRoute} from '@react-navigation/native';
import {getSinglePostApi} from '@services/PostService';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {NavigationProps, PostType, RouteProps} from 'types/AppTypes';

const SinglePostScreen = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const {params} = useRoute<RouteProps<'SinglePostScreen'>>();
  const navigation = useNavigation<NavigationProps<'SinglePostScreen'>>();
  const [postDetail, setPostDetail] = useState<PostType | null>(null);

  const fetchSinglePost = async () => {
    setLoader(true);
    const {data, success} = await getSinglePostApi(params.postId);

    if (success) setPostDetail(data.data);
    if (!success) console.error('Error in getting single post');

    setLoader(false);
  };

  useEffect(() => {
    fetchSinglePost();
  }, []);

  return (
    <CustomSafeScreen style={styles.main}>
      {loader ? (
        <CustomLoader />
      ) : postDetail ? (
        <PostCard post={postDetail} />
      ) : (
        <EmptyData title="NO DATA" />
      )}
    </CustomSafeScreen>
  );
};

export default SinglePostScreen;

const styles = StyleSheet.create({
  main: {flex: 1, padding: AppConstants.screenPadding},
});
