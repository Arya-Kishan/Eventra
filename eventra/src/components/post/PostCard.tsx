import {CustomImage} from '@components/global/CustomImage';
import CustomText from '@components/global/CustomText';
import Icon from '@components/global/Icon';
import {AppConstants} from '@constants/AppConstants';
import {useNavigation} from '@react-navigation/native';
import {updatePostApi} from '@services/PostService';
import {useAppSelector} from '@store/hooks';
import {createLinkAndShare} from '@utils/DeepLinkService';
import React, {FC, Suspense, useEffect, useState} from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {s, vs} from 'react-native-size-matters';
import Video from 'react-native-video';
import {NavigationProps, NotificationType, PostType} from 'types/AppTypes';
import PostLike from './PostLike';
const PostComment = React.lazy(() => import('./PostComment'));

interface PostCardProps {
  post: PostType;
}

const PostCard: FC<PostCardProps> = ({post}) => {
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showLikeModal, setShowLikeModal] = useState(false);

  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [commentLength, setCommentLength] = useState<number>(
    post.comments.length,
  );
  const [likesLength, setLikesLength] = useState<number>(post.likes!.length);
  const {loggedInUser} = useAppSelector(store => store.user);
  const {navigate} = useNavigation<NavigationProps<'Main'>>();

  const handleLike = async () => {
    setIsLiked(isLiked ? false : true);
    setLikesLength(isLiked ? likesLength - 1 : likesLength + 1);
    const formdata = new FormData();
    formdata.append('likes', loggedInUser?._id);

    const {data, success} = await updatePostApi(
      formdata,
      post._id,
      `category=likes&type=${isLiked ? 'delete' : 'add'}`,
    );

    const newNotification: NotificationType = {
      body: '',
      notification_type: 'like',
      title: `${loggedInUser?.name} liked your post`,
      isRead: false,
      link: `/SinglePostScreen/${post._id}`,
      user: typeof post.user !== 'string' ? post.user._id : '',
    };
  };

  const checkIsLiked = () => {
    const bool = post.likes?.some(item => item._id == loggedInUser?._id);
    setIsLiked(bool!);
  };

  const handleNameClicked = () => {
    typeof post.user !== 'string' &&
      navigate('ProfileScreen', {userId: post.user._id});
  };

  useEffect(() => {
    checkIsLiked();
  }, []);

  return (
    <View style={styles.main}>
      {/* USER NAME, PIC THREE DOT */}
      <View style={styles.parent}>
        {typeof post.user !== 'string' && (
          <Pressable onPress={handleNameClicked} style={styles.postCard}>
            <CustomImage
              source={
                'https://i.pinimg.com/474x/ef/9f/4c/ef9f4c5f75111da91ed81c859b34f4ac.jpg'
              }
              width={s(40)}
              height={s(40)}
              style={styles.image}
            />
            <View>
              <CustomText variant="h4">{post.user.name}</CustomText>
              <CustomText variant="subtitle1">{post.user.bio}</CustomText>
            </View>
          </Pressable>
        )}
        <CustomText>:</CustomText>
      </View>

      <View>
        {post.file.fileType === 'image' ? (
          <CustomImage
            source={post.file.url!}
            width={AppConstants.screenWidth - AppConstants.screenPadding * 2}
            height={AppConstants.screenWidth}
            style={styles.image}
          />
        ) : (
          <Video
            source={{uri: post.file.url}} // replace with your video URL or local file
            style={styles.video}
            controls={true}
            resizeMode="contain"
          />
        )}
      </View>

      <Text style={{gap: s(6)}}>
        <CustomText variant="h6">{`${post.title}`}</CustomText>
        <CustomText
          numberOfLines={3}
          style={{fontSize: s(13)}}>{` ${post.description}`}</CustomText>
      </Text>

      {/* COMMENT,LIKES,SHARE */}
      <View style={styles.iconBox}>
        {/* COMMENT AND LIKES */}
        <View style={styles.commentBox}>
          {/* comment */}
          <Pressable
            onPress={() => setShowCommentModal(true)}
            style={styles.comment}>
            <Icon
              icon="comment-o"
              iconType="FontAwesome"
              color={AppConstants.darkGrayColor}
            />
            <CustomText>{`${commentLength}`}</CustomText>
          </Pressable>

          {/* likes */}
          <Pressable onPress={handleLike} style={styles.likedIcon}>
            <Icon
              icon="heart"
              iconType={`${isLiked ? 'FontAwesome' : 'Feather'}`}
              color={`${isLiked ? AppConstants.redColor : AppConstants.grayColor}`}
            />
          </Pressable>
          <Pressable onPress={handleLike} style={styles.likedIcon}>
            <CustomText>{`${likesLength}`}</CustomText>
          </Pressable>
        </View>

        {/* SHARE */}
        <Pressable
          onPress={() => {
            createLinkAndShare({
              action: 'share',
              docId: post._id,
              feature: 'post',
            });
          }}>
          <Icon
            icon="share"
            iconType="FontAwesome"
            color={AppConstants.darkGrayColor}
          />
        </Pressable>
      </View>

      <Modal
        visible={showCommentModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCommentModal(false)}>
        {showCommentModal && (
          <Suspense fallback={<CustomText>Loading...</CustomText>}>
            <PostComment
              postId={post._id}
              setShow={setShowCommentModal}
              setCommentLength={setCommentLength}
              commentLength={commentLength}
            />
          </Suspense>
        )}
      </Modal>

      <Modal
        visible={showLikeModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowLikeModal(false)}>
        {showLikeModal && (
          <Suspense fallback={<CustomText>Loading...</CustomText>}>
            <PostLike
              postId={post._id}
              setShow={setShowCommentModal}
              setCommentLength={setCommentLength}
              commentLength={commentLength}
            />
          </Suspense>
        )}
      </Modal>
    </View>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  main: {gap: vs(10)},
  flex: {flex: 1},
  parent: {flexDirection: 'row', justifyContent: 'space-between'},
  postCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: s(10),
    alignItems: 'center',
  },
  image: {aspectRatio: 1 / 1, objectFit: 'cover'},
  iconBox: {flexDirection: 'row', justifyContent: 'space-between'},
  commentBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: s(10),
  },
  comment: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: s(10),
  },
  video: {
    width: '100%',
    height: 300,
  },
  likedIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: s(10),
  },
});
