import CustomText from '@components/global/CustomText';
import Icon from '@components/global/Icon';
import {AppConstants} from '@constants/AppConstants';
import useAuth from '@hooks/useAuth';
import {useNavigation} from '@react-navigation/native';
import {createConversationApi} from '@services/ChatService';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {setAllConversations} from '@store/reducers/chatSlice';
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
  const navigation = useNavigation<NavigationProps<'ProfileScreen'>>();
  const {loggedInUser} = useAppSelector(store => store.user);
  const {handleLogout} = useAuth();
  const {allConversations} = useAppSelector(store => store.chat);

  const handleChatClick = async () => {
    const createConversationData = await createConversationApi({
      sender: loggedInUser?._id!,
      receiver: userDetail._id!,
    });
    const {data: conversationData, success} = createConversationData;
    const {_id: conversationId} = conversationData.data;

    if (success) {
      allConversations && allConversations.length > 0
        ? dispatch(
            setAllConversations([...allConversations, conversationData.data]),
          )
        : dispatch(setAllConversations([conversationData.data]));
    }

    navigation.navigate('ChatScreen', {user: userDetail!, conversationId});
  };

  return (
    <LinearGradient colors={['#FF0000FF', '#7C0000FF']} style={styles.gradient}>
      <View style={styles.setting}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => setShowSetting(true)}>
          <Icon icon="settings" iconType="MaterialIcons" size={s(25)} />
        </TouchableOpacity>
        <CustomText variant="h3" style={{color: AppConstants.whiteColor}}>
          Eventra
        </CustomText>
        {loggedInUser?._id == userDetail._id ? (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => handleLogout(navigation)}>
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

const styles = StyleSheet.create({
  gradient: {
    height: vs(300),
    backgroundColor: 'blue',
    padding: AppConstants.screenPadding,
    gap: vs(50),
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
