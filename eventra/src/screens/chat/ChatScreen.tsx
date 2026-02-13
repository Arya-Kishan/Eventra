import ChatHeader from '@components/chat/ChatHeader';
import ChatInput from '@components/chat/ChatInput';
import ChatMessages from '@components/chat/ChatMessages';
import CustomSafeScreen from '@components/CustomSafeScreen';
import CustomModal from '@components/global/CustomModal';
import CustomText from '@components/global/CustomText';
import {AppConstants} from '@constants/AppConstants';
import {useSocket} from '@context/SocketContext';
import useDevice from '@hooks/useDevice';
import {useNavigation, useRoute} from '@react-navigation/native';
import {getConversationApi} from '@services/ChatService';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {setSelectedOpponentUser} from '@store/reducers/chatSlice';
import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {s} from 'react-native-size-matters';
import {MessageType, NavigationProps, RouteProps} from 'types/AppTypes';

const ChatScreen = () => {
  const [messageLoading, setMessageLoading] = useState<boolean>(false);
  const [isInCognito, setIsInCognito] = useState<boolean>(false);
  const [messages, setMessages] = useState<any>([]);
  const {loggedInUser} = useAppSelector(store => store.user);
  const {opponentActiveChatId} = useAppSelector(store => store.chat);
  const [showInCognitoDetail, setShowInCognitoDetail] =
    useState<boolean>(false);
  const [incognitoMessages, setIncognitoMessages] = useState<any>([]);
  const {
    params: {user, conversationId},
  } = useRoute<RouteProps<'ChatScreen'>>();
  const navigation = useNavigation<NavigationProps<'ChatScreen'>>();
  let opponentUser = user;
  const dispatch = useAppDispatch();
  const {appState} = useDevice();
  console.log(appState);

  const {globalSocket} = useSocket();

  const fetchConversationMessages = async () => {
    setMessageLoading(true);
    const {data, success} = await getConversationApi({
      sender: loggedInUser?._id!,
      receiver: opponentUser._id,
    });
    setMessageLoading(false);
    success ? setMessages(data.data.messages) : '';
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      dispatch(setSelectedOpponentUser(null));
    });

    return unsubscribe;
  }, [navigation, dispatch]);

  useEffect(() => {
    fetchConversationMessages();

    // RECEIVING MESSAGE
    globalSocket.on('receive-message', (receivedMessage: any) => {
      const {sender} = receivedMessage;
      if (opponentUser?._id === sender._id) {
        setMessages((prev: any) => [...prev, receivedMessage]);
        globalSocket.emit('delivered', receivedMessage);
      }
    });
    globalSocket.on('incognito-receive-message', (receivedMessage: any) => {
      const {sender} = receivedMessage;
      if (opponentUser?._id === sender._id) {
        setIncognitoMessages((prev: any) => [...prev, receivedMessage]);
        globalSocket.emit('delivered', receivedMessage);
      }
    });
    globalSocket.on('chat-mode', (data: any) => {
      setIsInCognito(data.isInCognito);
    });
    globalSocket.on('message-status', (data: any) => {
      const {messageData} = data;
      setMessages((prev: any) => {
        const updatedMessageStatus = prev.map((item: MessageType) => {
          if (item.message.value === messageData.message.value) {
            return messageData;
          }
          return item;
        });
        return updatedMessageStatus;
      });
    });

    return () => {
      globalSocket?.off('receive-message');
      globalSocket?.off('incognito-receive-message');
      globalSocket?.off('chat-mode');
      globalSocket?.off('message-status');
    };
  }, []);

  useEffect(() => {
    if (!conversationId) return;

    if (appState === 'active') {
      globalSocket.emit('active_chat', {
        chatId: conversationId,
        currentUser: {_id: loggedInUser?._id, name: loggedInUser?.name},
        receiver: {_id: opponentUser._id, name: opponentUser.name},
        type: 'active',
      });
    } else {
      globalSocket.emit('active_chat', {
        chatId: conversationId,
        currentUser: {_id: loggedInUser?._id, name: loggedInUser?.name},
        receiver: {_id: opponentUser._id, name: opponentUser.name},
        type: 'unactive',
      });
    }

    return () => {
      globalSocket.emit('active_chat', {
        chatId: conversationId,
        currentUser: {_id: loggedInUser?._id, name: loggedInUser?.name},
        receiver: {_id: opponentUser._id, name: opponentUser.name},
        type: 'unactive',
      });
    };
  }, [conversationId, appState]);

  useEffect(() => {
    return () => {
      globalSocket.emit('chat-mode', {
        isInCognito: false,
        senderId: loggedInUser?._id,
        receiverId: opponentUser._id,
      });
    };
  }, [conversationId]);

  return (
    <CustomSafeScreen style={{flex: 1}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <View style={styles.contentContainer}>
          <ChatHeader
            conversationId={conversationId}
            isInCognito={isInCognito}
            opponentActiveChatId={opponentActiveChatId}
            opponentUser={opponentUser}
            setIsInCognito={setIsInCognito}
          />

          <ChatMessages
            incognitoMessages={incognitoMessages}
            isInCognito={isInCognito}
            messageLoading={messageLoading}
            messages={messages}
            setShowInCognitoDetail={setShowInCognitoDetail}
          />

          <ChatInput
            conversationId={conversationId}
            isInCognito={isInCognito}
            opponentUser={opponentUser}
            setIncognitoMessages={setIncognitoMessages}
            setMessages={setMessages}
          />
        </View>

        <CustomModal
          setShow={setShowInCognitoDetail}
          show={showInCognitoDetail}>
          <View style={styles.incognitoBox}>
            <CustomText numberOfLines={3} style={styles.incognitoTxtHeading}>
              Ghost Mode
            </CustomText>
            <CustomText style={styles.incognitoTxt} numberOfLines={3}>
              Messages sent in this chat are not saved on our servers or your
              device.
            </CustomText>
            <CustomText style={styles.incognitoTxt} numberOfLines={3}>
              Once you leave or go back, the entire chat is automatically
              deleted for both user.
            </CustomText>
            <CustomText style={styles.incognitoTxt} numberOfLines={3}>
              Messages cannot be recovered after closing the chat.
            </CustomText>
            <CustomText style={styles.incognitoTxt} numberOfLines={3}>
              No chat history will appear in your inbox or recent chats.
            </CustomText>
            <CustomText style={styles.incognitoTxt} numberOfLines={3}>
              This chat is designed for temporary and private conversations.
            </CustomText>
            <CustomText style={styles.incognitoTxt} numberOfLines={3}>
              Use this mode only if you understand that all messages will
              disappear.
            </CustomText>
          </View>
        </CustomModal>
      </KeyboardAvoidingView>
    </CustomSafeScreen>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingBottom: s(50),
  },
  dark: {backgroundColor: 'black', color: 'white'},
  light: {backgroundColor: 'white', color: 'black'},
  ghostBox: {
    flexDirection: 'row',
    gap: 5,
    position: 'absolute',
    top: '0%',
    left: '50%',
    transform: [{translateX: '-50%'}],
    zIndex: 10,
    backgroundColor: 'red',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  ghostTxt: {color: 'white', fontSize: 10, fontWeight: '800'},
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
  flatListContent: {
    gap: s(0),
  },
  incognitoBox: {flexDirection: 'column', gap: 10, padding: s(20)},
  incognitoTxtHeading: {
    textAlign: 'center',
    fontSize: 30,
    color: AppConstants.redColor,
  },
  incognitoTxt: {fontWeight: '700'},
});
