import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {MessageType} from 'types/AppTypes';
import {useAppSelector} from '@store/hooks';
import {s} from 'react-native-size-matters';
import {AppConstants} from '@constants/AppConstants';
import CustomText from '@components/global/CustomText';
import {formatTime} from '@utils/Helper';
import Icon from '@components/global/Icon';
import DeliveryStatusIcon from './DeliveryStatusIcon';

interface MessageBoxProps {
  message: MessageType;
}

const MessageBox: FC<MessageBoxProps> = ({message}) => {
  const {loggedInUser} = useAppSelector(store => store.user);

  const isMySelf = (): boolean => {
    return loggedInUser?._id == message.sender._id;
  };

  const isMyMessage = isMySelf();
  const messageStatus = message.seenAt
    ? 'seen'
    : message.deliveredAt
      ? 'delivered'
      : message.createdAt
        ? 'sent'
        : 'sending';

  return (
    <View
      style={[
        styles.container,
        isMyMessage ? styles.containerRight : styles.containerLeft,
      ]}>
      <View
        style={[
          styles.messageBox,
          isMyMessage ? styles.messageBoxMine : styles.messageBoxOther,
        ]}>
        <Text style={styles.messageText}>{message.message.value}</Text>
        <View style={styles.seenBox}>
          <CustomText variant="overline" style={styles.timestamp}>
            {formatTime(message.timestamp)}
          </CustomText>
          {loggedInUser?._id === message.sender._id && (
            <DeliveryStatusIcon status={messageStatus} />
          )}
        </View>
      </View>
    </View>
  );
};

export default MessageBox;

const styles = StyleSheet.create({
  container: {
    padding: s(8),
  },
  containerRight: {
    alignItems: 'flex-end',
  },
  containerLeft: {
    alignItems: 'flex-start',
  },
  messageBox: {
    minWidth: '30%',
    maxWidth: '80%',
    padding: s(10),
    borderRadius: s(10),
  },
  messageBoxMine: {
    backgroundColor: AppConstants.redColor,
  },
  messageBoxOther: {
    backgroundColor: AppConstants.grayColor,
  },
  messageText: {
    textAlign: 'left',
  },
  timestamp: {
    textAlign: 'right',
    fontSize: s(8),
  },
  seenBox: {
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
