import CustomLoader from '@components/global/CustomLoader'
import CustomText from '@components/global/CustomText'
import EmptyData from '@components/global/EmptyData'
import Icon from '@components/global/Icon'
import PostCard from '@components/post/PostCard'
import { AppConstants } from '@constants/AppConstants'
import { useNavigation } from '@react-navigation/native'
import { getAllPostApi } from '@services/PostService'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { setAllPost } from '@store/reducers/postSlice'
import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { s, vs } from 'react-native-size-matters'
import { NavigationProps, PostType } from 'types/AppTypes'

const SocialScreen = () => {

  const [loader, setLoader] = useState<boolean>(false);

  const navigation = useNavigation<NavigationProps<'Main'>>();
  const { allPosts } = useAppSelector(store => store.post);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const fetchAllPosts = async () => {
    setLoader(true);
    const { data, success } = await getAllPostApi();
    success ? dispatch(setAllPost(data.data)) : navigation.navigate("ErrorScreen");
    setLoader(false);
  }

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    const { data, success } = await getAllPostApi();
    success ? dispatch(setAllPost(data.data)) : navigation.navigate("ErrorScreen");
    setRefreshing(false);
  }, []);

  useEffect(() => {
    fetchAllPosts();
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, gap: vs(10) }}>

      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: AppConstants.screenPadding, backgroundColor: AppConstants.redColor }}>

        <CustomText variant='h2' style={{ color: AppConstants.whiteColor }}>Social</CustomText>

        <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("ChatDashboardScreen")}>
          <Icon icon='chat' iconType='Entypo' size={s(25)} />
        </TouchableOpacity>

      </View>

      <View style={{ flex: 1 }}>

        {
          loader
            ?
            <CustomLoader />
            :
            allPosts && allPosts.length == 0
              ?
              <EmptyData title='NO POSTS' handleAddClick={() => { }} />
              :
              <FlatList
                data={allPosts}
                renderItem={({ item }: { item: PostType }) => (
                  <PostCard post={item} />
                )}
                contentContainerStyle={{ paddingHorizontal: AppConstants.screenPadding, gap: vs(20), paddingBottom: s(20) }}
                onRefresh={onRefresh}
                refreshing={refreshing}
              />
        }

      </View>

    </SafeAreaView>
  )
}

export default SocialScreen

const styles = StyleSheet.create({})