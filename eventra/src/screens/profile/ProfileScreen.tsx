import CustomSafeScreen from '@components/CustomSafeScreen';
import {CustomImage} from '@components/global/CustomImage';
import CustomLoader from '@components/global/CustomLoader';
import CustomText from '@components/global/CustomText';
import EmptyData from '@components/global/EmptyData';
import Icon from '@components/global/Icon';
import ProfileHeader from '@components/profile/ProfileHeader';
import SettingModal from '@components/profile/SettingModal';
import {AppConstants} from '@constants/AppConstants';
import {useRoute} from '@react-navigation/native';
import {getUserPostsApi} from '@services/PostService';
import {getSingleuserApi} from '@services/UserService';
import {useAppSelector} from '@store/hooks';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {FlatList, Modal, StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import {s, vs} from 'react-native-size-matters';
import {PostType, RouteProps, userType} from 'types/AppTypes';

const ProfileScreen = () => {
  const {params} = useRoute<RouteProps<'ProfileScreen'>>();
  const [loader, setLoader] = useState(false);
  const [userDetail, setUserDetail] = useState<userType | null>(null);
  const [userPosts, setUserPosts] = useState<PostType[] | null>(null);
  const {loggedInUser} = useAppSelector(store => store.user);
  const [showSetting, setShowSetting] = useState(false);

  const fetchUserDetail = async (userId: string) => {
    setLoader(true);
    const {data: userData} = await getSingleuserApi(userId);
    const {data: postsData} = await getUserPostsApi(userId);
    setUserDetail(userData.data);
    setUserPosts(postsData.data);
    setLoader(false);
  };

  useEffect(() => {
    fetchUserDetail(params?.userId ?? loggedInUser?._id!);
  }, []);

  return (
    <CustomSafeScreen style={styles.container}>
      {loader ? (
        <CustomLoader />
      ) : userDetail == null ? (
        <EmptyData title="NO DATA" showBtn={false} />
      ) : (
        <ScrollView style={styles.scrollView}>
          <ProfileHeader
            userDetail={userDetail}
            setShowSetting={setShowSetting}
          />

          <View style={styles.contentContainer}>
            <View style={styles.profileImageWrapper}>
              <CustomImage
                source={
                  userDetail!.profilePic!.url !== ''
                    ? userDetail!.profilePic!.url
                    : AppConstants.fallbackProfilePic
                }
                width={s(80)}
                height={s(80)}
              />
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <CustomText variant="h4">{userPosts?.length}</CustomText>
                <CustomText variant="subtitle2">Posts</CustomText>
              </View>

              <View style={styles.statBox}>
                <CustomText variant="h4">
                  {loggedInUser?.joinedEvents!.length}
                </CustomText>
                <CustomText variant="subtitle2">Events</CustomText>
              </View>

              <View style={styles.statBox}>
                <CustomText variant="h4">120</CustomText>
                <CustomText variant="subtitle2">Apple</CustomText>
              </View>
            </View>

            <View style={styles.myPostHeader}>
              <CustomText variant="h5">My Post</CustomText>
              <Icon icon="edit" iconType="Feather" color="black" />
            </View>

            <FlatList
              data={userPosts}
              numColumns={2}
              scrollEnabled={false}
              keyExtractor={item => item._id}
              contentContainerStyle={styles.postListContainer}
              columnWrapperStyle={styles.postColumnWrapper}
              renderItem={({item}) => (
                <View style={styles.postItem}>
                  {item.file.fileType === 'image' && (
                    <CustomImage
                      width="100%"
                      height="100%"
                      source={item.file.url!}
                    />
                  )}
                </View>
              )}
            />
          </View>
        </ScrollView>
      )}

      <Modal
        visible={showSetting}
        transparent
        animationType="slide"
        onRequestClose={() => setShowSetting(false)}>
        <SettingModal setShowSettings={setShowSetting} user={userDetail!} />
      </Modal>
    </CustomSafeScreen>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    minHeight: AppConstants.screenHeight - vs(260),
    height: '100%',
    backgroundColor: AppConstants.whiteColor,
    transform: [{translateY: -vs(40)}],
    borderTopLeftRadius: s(30),
    borderTopRightRadius: s(30),
    padding: AppConstants.screenPadding,
    gap: AppConstants.screenPadding,
    paddingTop: vs(70),
  },

  profileImageWrapper: {
    position: 'absolute',
    top: -s(30),
    left: s(30),
    backgroundColor: AppConstants.whiteColor,
    borderRadius: s(10),
    padding: s(2),
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  statBox: {
    width: s(70),
    height: s(70),
    elevation: 10,
    backgroundColor: AppConstants.whiteColor,
    borderRadius: s(20),
    justifyContent: 'center',
    alignItems: 'center',
  },

  myPostHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  postListContainer: {
    gap: AppConstants.screenPadding,
  },

  postColumnWrapper: {
    gap: AppConstants.screenPadding,
  },

  postItem: {
    width: AppConstants.screenWidth / 2 - AppConstants.screenPadding * 1.5,
    height: AppConstants.screenWidth / 2 - AppConstants.screenPadding,
  },
});
