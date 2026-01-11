import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {MessageType} from 'types/AppTypes';
import {useAppSelector} from '@store/hooks';
import {s} from 'react-native-size-matters';
import {AppConstants} from '@constants/AppConstants';
import CustomText from '@components/global/CustomText';
import {formatTime} from '@utils/Helper';

interface MessageBoxProps {
  message: MessageType;
}

const MessageBox: FC<MessageBoxProps> = ({message}) => {
  const {loggedInUser} = useAppSelector(store => store.user);

  const isMySelf = (): boolean => {
    return loggedInUser?._id == message.sender._id;
  };

  const isMyMessage = isMySelf();

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
        <CustomText variant="overline" style={styles.timestamp}>
          {formatTime(message.timestamp)}
        </CustomText>
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
    width: '50%',
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
});
