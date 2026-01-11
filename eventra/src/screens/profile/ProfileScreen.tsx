import {CustomImage} from '@components/global/CustomImage';
import CustomLoader from '@components/global/CustomLoader';
import CustomText from '@components/global/CustomText';
import EmptyData from '@components/global/EmptyData';
import Icon from '@components/global/Icon';
import ProfileHeader from '@components/profile/ProfileHeader';
import SettingModal from '@components/profile/SettingModal';
import {AppConstants} from '@constants/AppConstants';
import {useSocket} from '@context/SocketContext';
import {useNavigation, useRoute} from '@react-navigation/native';
import {getUserPostsApi} from '@services/PostService';
import {getSingleuserApi} from '@services/UserService';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import React, {useEffect, useState} from 'react';
import {FlatList, Modal, StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {s, vs} from 'react-native-size-matters';
import {NavigationProps, PostType, RouteProps, userType} from 'types/AppTypes';

const ProfileScreen = () => {
  const allTempPosts = [
    'https://i.pinimg.com/736x/d9/a0/20/d9a02032e33fe70ef4075cc9d1b77815.jpg',
    'https://i.pinimg.com/736x/ed/ed/4d/eded4d69e8116d7c28b8e3fdcfcdef05.jpg',
    'https://i.pinimg.com/736x/25/67/8a/25678aaaa9fa12b11a6fc4e42cb59a61.jpg',
    'https://i.pinimg.com/736x/40/0e/11/400e11f327a32eb765fd7782c747f556.jpg',
  ];

  const dispatch = useAppDispatch();
  const {navigate} = useNavigation<NavigationProps<'ProfileScreen'>>();
  const {params} = useRoute<RouteProps<'ProfileScreen'>>();
  const [loader, setLoader] = useState<boolean>(false);
  const [userDetail, setUserDetail] = useState<userType | null>(null);
  const [userPosts, setUserPosts] = useState<PostType[] | null>(null);
  const {loggedInUser} = useAppSelector(store => store.user);
  const [showSetting, setShowSetting] = useState<boolean>(false);

  const fetchUserDetail = async (userId: string) => {
    setLoader(true);
    const {success: userSuccess, data: userData} =
      await getSingleuserApi(userId);
    const {success: postsSuccess, data: postsData} =
      await getUserPostsApi(userId);
    setUserDetail(userData.data);
    setUserPosts(postsData.data);
    setLoader(false);
  };

  useEffect(() => {
    fetchUserDetail(params?.userId ?? loggedInUser?._id!);
  }, []);

  return (
    <View style={{flex: 1}}>
      {loader ? (
        <CustomLoader />
      ) : userDetail == null ? (
        <EmptyData title="NO DATA" showBtn={false} />
      ) : (
        <Animated.ScrollView style={{flex: 1, backgroundColor: 'orange'}}>
          <ProfileHeader
            userDetail={userDetail}
            setShowSetting={setShowSetting}
          />

          <View
            style={{
              minHeight: AppConstants.screenHeight - vs(260),
              height: '100%',
              backgroundColor: AppConstants.whiteColor,
              transform: [{translateY: -vs(40)}],
              borderTopLeftRadius: s(30),
              borderTopRightRadius: s(30),
              padding: AppConstants.screenPadding,
              gap: AppConstants.screenPadding,
              paddingTop: vs(70),
            }}>
            <View
              style={{
                position: 'absolute',
                top: -s(30),
                left: s(30),
                backgroundColor: AppConstants.whiteColor,
                borderRadius: s(10),
                padding: s(2),
              }}>
              <CustomImage
                source={
                  userDetail.profilePic.url !== ''
                    ? userDetail.profilePic.url
                    : AppConstants.fallbackProfilePic
                }
                width={s(80)}
                height={s(80)}
                style={{}}
              />
            </View>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <View
                style={{
                  width: s(70),
                  height: s(70),
                  elevation: 10,
                  backgroundColor: AppConstants.whiteColor,
                  borderRadius: s(20),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <CustomText variant="h4">{`${userPosts?.length}`}</CustomText>
                <CustomText variant="subtitle2">Posts</CustomText>
              </View>
              <View
                style={{
                  width: s(70),
                  height: s(70),
                  elevation: 10,
                  backgroundColor: AppConstants.whiteColor,
                  borderRadius: s(20),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <CustomText variant="h4">{`${loggedInUser?.joinedEvents.length}`}</CustomText>
                <CustomText variant="subtitle2">Events</CustomText>
              </View>
              <View
                style={{
                  width: s(70),
                  height: s(70),
                  elevation: 10,
                  backgroundColor: AppConstants.whiteColor,
                  borderRadius: s(20),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <CustomText variant="h4">120</CustomText>
                <CustomText variant="subtitle2">Apple</CustomText>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <CustomText variant="h5">My Post</CustomText>
              <Icon icon="edit" iconType="Feather" color="black" />
            </View>

            <FlatList
              data={userPosts}
              renderItem={({item}: {item: PostType}) => (
                <View
                  style={{
                    width:
                      AppConstants.screenWidth / 2 -
                      AppConstants.screenPadding * 1.5,
                    height:
                      AppConstants.screenWidth / 2 - AppConstants.screenPadding,
                  }}>
                  {item.file.fileType == 'image' && (
                    <CustomImage
                      width={'100%'}
                      height={'100%'}
                      source={item.file.url!}
                    />
                  )}
                </View>
              )}
              numColumns={2}
              keyExtractor={item => item.toString()}
              scrollEnabled={false}
              contentContainerStyle={{gap: AppConstants.screenPadding}}
              columnWrapperStyle={{gap: AppConstants.screenPadding}}
            />
          </View>
        </Animated.ScrollView>
      )}

      <Modal
        visible={showSetting}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowSetting(false)}>
        <SettingModal setShowSettings={setShowSetting} />
      </Modal>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  full: {flex: 1},
});
