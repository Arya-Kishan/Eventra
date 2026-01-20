import Icon from '@components/global/Icon';
import {AppConstants} from '@constants/AppConstants';
import {useSocket} from '@context/SocketContext';
import {useAppSelector} from '@store/hooks';
import {showToast} from '@utils/Helper';
import React, {FC, memo, useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {s} from 'react-native-size-matters';
import {userType} from 'types/AppTypes';

interface ChatInputProps {
  isInCognito: boolean;
  setMessages: any;
  setIncognitoMessages: any;
  conversationId: string;
  opponentUser: userType;
}

const ChatInput: FC<ChatInputProps> = ({
  setIncognitoMessages,
  setMessages,
  isInCognito,
  conversationId,
  opponentUser,
}) => {
  const {loggedInUser} = useAppSelector(store => store.user);
  const {globalSocket, onlineUsers} = useSocket();
  const [text, setText] = useState<string>('');

  const isOpponentOnline = (): boolean => {
    return onlineUsers.includes(opponentUser._id);
  };

  const handleSend = async () => {
    if (text.length < 1) {
      return showToast({title: 'Write Message'});
    }

    if (!conversationId)
      return showToast({title: 'Converrsation not avaialble', description: ''});

    const newMessage = {
      sender: {
        _id: loggedInUser?._id!,
        name: loggedInUser?.name,
        FCMToken: loggedInUser?.FCMToken,
      },
      receiver: {
        _id: opponentUser._id,
        name: opponentUser.name,
        FCMToken: opponentUser.FCMToken,
      },
      message: {type: 'text', value: text},
      conversationId,
      timestamp: new Date().toISOString(),
    };

    if (isInCognito) {
      if (!isOpponentOnline())
        return showToast({
          title: 'User Not Online',
          description: '',
          type: 'info',
        });
      globalSocket.emit('incognito-send-message', newMessage);
      setIncognitoMessages((prev: any) => [...prev, newMessage]);
    } else {
      globalSocket.emit('send-message', newMessage);
      setMessages((prev: any) => [...prev, newMessage]);
    }

    // USED FOR CLEANING INPUT
    setText('');
  };

  return (
    <View
      style={[styles.inputContainer, isInCognito ? styles.dark : styles.light]}>
      <TextInput
        placeholder="Write a message...."
        placeholderTextColor={
          isInCognito ? AppConstants.whiteColor : AppConstants.black
        }
        value={text}
        onChangeText={setText}
        style={[styles.textInput, isInCognito ? styles.dark : styles.light]}
      />

      <TouchableOpacity activeOpacity={0.5} onPress={handleSend}>
        <Icon icon="send" iconType="Feather" color={AppConstants.redColor} />
      </TouchableOpacity>
    </View>
  );
};

export default memo(ChatInput);

const styles = StyleSheet.create({
  dark: {backgroundColor: 'black', color: 'white'},
  light: {backgroundColor: 'white', color: 'black'},
  inputContainer: {
    width: '100%',
    height: s(50),
    padding: s(4),
    paddingHorizontal: s(20),
    position: 'absolute',
    bottom: s(0),
    left: 0,
    flexDirection: 'row',
    backgroundColor: AppConstants.whiteColor,
    alignItems: 'center',
    gap: s(10),
  },
  textInput: {
    flex: 1,
    backgroundColor: AppConstants.whiteColor,
    fontSize: s(15),
    borderRadius: s(2),
    gap: s(2),
  },
});
