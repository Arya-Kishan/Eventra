import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, memo} from 'react';
import {CustomImage} from '@components/global/CustomImage';
import CustomText from '@components/global/CustomText';
import {AppConstants} from '@constants/AppConstants';
import {s} from 'react-native-size-matters';
import {useSocket} from '@context/SocketContext';
import {useAppSelector} from '@store/hooks';
import {getRelativeTimeFromNow} from '@utils/Helper';
import Icon from '@components/global/Icon';
import {userType} from 'types/AppTypes';

interface ChatHeaderProps {
  isInCognito: boolean;
  setIsInCognito: any;
  conversationId: string;
  opponentUser: userType;
  opponentActiveChatId: any;
}

const ChatHeader: FC<ChatHeaderProps> = ({
  opponentUser,
  isInCognito,
  setIsInCognito,
  conversationId,
  opponentActiveChatId,
}) => {
  const {loggedInUser} = useAppSelector(store => store.user);

  const {globalSocket, onlineUsers} = useSocket();

  const isOpponentOnline = (): boolean => {
    return onlineUsers.includes(opponentUser._id);
  };

  const handleInCognitoMode = () => {
    setIsInCognito(!isInCognito);
    globalSocket.emit('chat-mode', {
      isInCognito: !isInCognito,
      senderId: loggedInUser?._id,
      receiverId: opponentUser._id,
    });
  };

  return (
    <View style={styles.header}>
      <CustomImage
        source={
          opponentUser?.profilePic.url !== ''
            ? opponentUser?.profilePic.url!
            : AppConstants.fallbackProfilePic
        }
        width={s(40)}
        height={s(40)}
      />

      <View style={styles.headerContent}>
        <View style={styles.userInfo}>
          <CustomText variant="h4">{opponentUser.name}</CustomText>
          <CustomText
            variant="overline"
            fontWeight="800"
            style={isOpponentOnline() ? styles.onlineText : styles.offlineText}>
            {isOpponentOnline()
              ? 'Online'
              : getRelativeTimeFromNow(opponentUser?.active!)}
          </CustomText>
        </View>

        <View style={styles.iconBox}>
          <TouchableOpacity onPress={handleInCognitoMode}>
            <Icon
              icon="user-secret"
              iconType="FontAwesome"
              color={isInCognito ? AppConstants.black : AppConstants.whiteColor}
            />
          </TouchableOpacity>
          <Icon icon="dots-vertical" iconType="MaterialCommunityIcons" />
        </View>
      </View>

      {opponentActiveChatId &&
        opponentActiveChatId.type === 'active' &&
        opponentActiveChatId.chatId === conversationId && (
          <Image
            source={require('@assets/images/panda.png')}
            style={styles.hiddenPanda}
          />
        )}
    </View>
  );
};

export default memo(ChatHeader);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    gap: s(4),
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: AppConstants.redColor,
    padding: AppConstants.screenPadding,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    gap: s(4),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hiddenPanda: {
    width: 50,
    height: 50,
    objectFit: 'cover',
    position: 'absolute',
    bottom: -16,
    left: '50%',
    transform: [{translateX: '-50%'}],
  },
  iconBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  dark: {backgroundColor: 'black', color: 'white'},
  light: {backgroundColor: 'white', color: 'black'},
  userInfo: {
    justifyContent: 'space-between',
    gap: s(0),
  },
  onlineText: {
    color: AppConstants.greenColor,
  },
  offlineText: {
    color: AppConstants.whiteColor,
  },
});
