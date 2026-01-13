import {CustomImage} from '@components/global/CustomImage';
import CustomText from '@components/global/CustomText';
import RoundedBox from '@components/global/RoundedBox';
import {AppConstants} from '@constants/AppConstants';
import {useSocket} from '@context/SocketContext';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {
  setSelectedOpponentUser,
  setUnseenMessageCount,
  updateAllConversations,
} from '@store/reducers/chatSlice';
import React, {FC} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {s} from 'react-native-size-matters';
import {NavigationProps, userType} from 'types/AppTypes';

interface ConversationItemProps {
  conversation: any;
}

const ConversationItem: FC<ConversationItemProps> = ({conversation}) => {
  const {loggedInUser} = useAppSelector(store => store.user);

  const userDetail = conversation.participants.find(
    (user: any) => user._id != loggedInUser?._id,
  );
  const unSeenCount = conversation.unseenCount[loggedInUser?._id!];

  const navigation = useNavigation<NavigationProps<'ChatDashboardScreen'>>();
  const {onlineUsers} = useSocket();
  const dispatch = useAppDispatch();

  const isOpponentOnline = (user: userType): boolean => {
    return onlineUsers.includes(user._id);
  };

  const handleNavigate = (item: userType) => {
    navigation.navigate('ChatScreen', {
      user: item,
      conversationId: conversation._id,
    });
    dispatch(
      updateAllConversations({
        conversationId: conversation._id,
        userId: loggedInUser?._id,
        type: 'seen',
      }),
    );

    dispatch(setSelectedOpponentUser(item));
    dispatch(setUnseenMessageCount({count: unSeenCount, type: 'dec'}));
    // deleteUserUnSeenMessages(item);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => handleNavigate(userDetail)}
      style={styles.chatBlock}>
      <CustomImage
        source={
          userDetail?.profilePic?.url !== undefined
            ? userDetail?.profilePic?.url
            : AppConstants.fallbackProfilePic
        }
        width={s(50)}
        height={s(50)}
      />

      <View style={styles.chatContainer}>
        <View style={styles.name}>
          <CustomText variant="h4">{userDetail.name}</CustomText>
          {isOpponentOnline(userDetail) ? (
            <CustomText
              fontWeight="600"
              variant="overline"
              style={{color: AppConstants.greenColor}}>
              ONLINE
            </CustomText>
          ) : (
            <CustomText
              fontWeight="600"
              variant="overline"
              style={{color: AppConstants.redColor}}>
              OFFLINE
            </CustomText>
          )}
        </View>

        <View style={styles.unseen}>
          {unSeenCount == 0 ? (
            ''
          ) : (
            <RoundedBox
              size={s(20)}
              onPress={() => {}}
              viewStyle={{backgroundColor: AppConstants.redColor}}>
              <CustomText
                variant="overline"
                fontWeight="700"
                style={{color: AppConstants.whiteColor}}>
                {unSeenCount}
              </CustomText>
            </RoundedBox>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ConversationItem;

const styles = StyleSheet.create({
  main: {flex: 1},
  parent: {
    backgroundColor: AppConstants.redColor,
    padding: AppConstants.screenPadding,
    flexDirection: 'row',
    gap: s(10),
    alignItems: 'center',
  },
  chatContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: s(4),
    justifyContent: 'space-between',
  },
  chatBlock: {
    flexDirection: 'row',
    gap: s(8),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {justifyContent: 'space-between', gap: s(10)},
  unseen: {
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: s(10),
  },
});
