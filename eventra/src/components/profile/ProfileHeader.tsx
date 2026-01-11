import CustomText from '@components/global/CustomText';
import Icon from '@components/global/Icon';
import {AppConstants} from '@constants/AppConstants';
import {useNavigation} from '@react-navigation/native';
import {updateUserApi} from '@services/UserService';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {resetLogout, setLoggedInUser} from '@store/reducers/userSlice';
import {AsyncDeleteData} from '@utils/AsyncStorage';
import React, {FC} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {s, vs} from 'react-native-size-matters';
import {NavigationProps, userType} from 'types/AppTypes';

interface ProfileHeaderProps {
  userDetail: userType;
  setShowSetting: (val: boolean) => void;
}

const ProfileHeader: FC<ProfileHeaderProps> = ({
  userDetail,
  setShowSetting,
}) => {
  const dispatch = useAppDispatch();
  const {navigate} = useNavigation<NavigationProps<'ProfileScreen'>>();
  const {loggedInUser} = useAppSelector(store => store.user);

  const handleLogout = async () => {
    dispatch(setLoggedInUser(null));
    await AsyncDeleteData();
    dispatch(resetLogout());
  };

  const handleChatClick = async () => {
    navigate('ChatScreen', {user: userDetail!});

    const chatUserIds = loggedInUser?.chats.map(item => item._id);

    if (!chatUserIds?.includes(userDetail!._id)) {
      const formdata = new FormData();
      formdata.append('chats', userDetail!._id);
      const {success} = await updateUserApi(formdata, loggedInUser?._id!);
      success &&
        dispatch(
          setLoggedInUser({
            ...loggedInUser!,
            chats: [...loggedInUser?.chats!, userDetail!],
          }),
        );
    }

    const opponentUserIds = userDetail?.chats.map(item => item._id);

    if (!opponentUserIds?.includes(loggedInUser?._id!)) {
      const formdata = new FormData();
      formdata.append('chats', loggedInUser?._id!);
      const {success} = await updateUserApi(formdata, userDetail?._id!);
    }
  };

  return (
    <LinearGradient
      colors={['#FF0000FF', '#7C0000FF']}
      style={{
        height: vs(300),
        backgroundColor: 'blue',
        padding: AppConstants.screenPadding,
        gap: vs(50),
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => setShowSetting(true)}>
          <Icon icon="settings" iconType="MaterialIcons" size={s(25)} />
        </TouchableOpacity>
        <CustomText variant="h3" style={{color: AppConstants.whiteColor}}>
          Eventra
        </CustomText>
        {loggedInUser?._id == userDetail._id ? (
          <TouchableOpacity activeOpacity={0.6} onPress={() => handleLogout()}>
            <Icon icon="logout" iconType="MaterialIcons" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => handleChatClick()}>
            <Icon icon="chat" iconType="MaterialCommunityIcons" />
          </TouchableOpacity>
        )}
      </View>

      <View style={{gap: vs(10)}}>
        <CustomText
          variant="h1"
          style={{fontSize: s(40), color: AppConstants.whiteColor}}>
          {userDetail.name}
        </CustomText>
        <CustomText variant="body1" style={{color: AppConstants.whiteColor}}>
          {userDetail.bio}
        </CustomText>
      </View>
    </LinearGradient>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({});
