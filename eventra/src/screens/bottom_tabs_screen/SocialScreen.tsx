import CustomSafeScreen from '@components/CustomSafeScreen';
import CustomLoader from '@components/global/CustomLoader';
import CustomText from '@components/global/CustomText';
import EmptyData from '@components/global/EmptyData';
import Icon from '@components/global/Icon';
import PostCard from '@components/post/PostCard';
import {AppConstants} from '@constants/AppConstants';
import {useNavigation} from '@react-navigation/native';
import {getAllPostApi} from '@services/PostService';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {setAllPost} from '@store/reducers/postSlice';
import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {s, vs} from 'react-native-size-matters';
import {NavigationProps, PostType} from 'types/AppTypes';

const SocialScreen = () => {
  const [loader, setLoader] = useState<boolean>(false);

  const navigation = useNavigation<NavigationProps<'Main'>>();
  const {allPosts} = useAppSelector(store => store.post);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const fetchAllPosts = async () => {
    setLoader(true);
    const {data, success} = await getAllPostApi();
    if (success) dispatch(setAllPost(data.data));
    if (!success) console.error('Error in getting posts');
    setLoader(false);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    const {data, success} = await getAllPostApi();

    if (success) dispatch(setAllPost(data.data));
    if (!success) console.error('Error in getting posts in social screen');
    setRefreshing(false);
  }, []);

  useEffect(() => {
    fetchAllPosts();
  }, []);

  return (
    <CustomSafeScreen>
      <View style={styles.main}>
        <View style={styles.container}>
          <CustomText variant="h2" style={{color: AppConstants.whiteColor}}>
            Social
          </CustomText>

          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() =>
              navigation.navigate('CreatePostScreen', {
                method: 'create',
                post: null,
              })
            }>
            <Icon icon="plus" iconType="Feather" size={s(25)} />
          </TouchableOpacity>
        </View>

        <View style={styles.full}>
          {loader ? (
            <CustomLoader />
          ) : allPosts && allPosts.length === 0 ? (
            <EmptyData title="NO POSTS" handleAddClick={() => {}} />
          ) : (
            <Animated.FlatList
              data={allPosts}
              renderItem={({item}: {item: PostType}) => (
                <PostCard post={item} />
              )}
              contentContainerStyle={{
                paddingHorizontal: AppConstants.screenPadding,
                gap: vs(20),
                paddingBottom: s(20),
              }}
              onRefresh={onRefresh}
              refreshing={refreshing}
            />
          )}
        </View>
      </View>
    </CustomSafeScreen>
  );
};

export default SocialScreen;

const styles = StyleSheet.create({
  main: {flex: 1, gap: vs(10)},
  full: {flex: 1},
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: AppConstants.screenPadding,
    backgroundColor: AppConstants.redColor,
  },
});
