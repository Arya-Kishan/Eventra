import MessageBox from '@components/chat/MessageBox';
import {CustomImage} from '@components/global/CustomImage';
import CustomModal from '@components/global/CustomModal';
import CustomText from '@components/global/CustomText';
import EmptyData from '@components/global/EmptyData';
import Icon from '@components/global/Icon';
import {AppConstants} from '@constants/AppConstants';
import {useSocket} from '@context/SocketContext';
import useDevice from '@hooks/useDevice';
import {useNavigation, useRoute} from '@react-navigation/native';
import {getConversationApi} from '@services/ChatService';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {setSelectedOpponentUser} from '@store/reducers/chatSlice';
import {getRelativeTimeFromNow, showToast} from '@utils/Helper';
import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {s} from 'react-native-size-matters';
import {MessageType, NavigationProps, RouteProps} from 'types/AppTypes';

const ChatScreen = () => {
  const [text, setText] = useState<string>('');
  const [messageLoading, setMessageLoading] = useState<boolean>(false);
  const [isInCognito, setIsInCognito] = useState<boolean>(false);
  const [messages, setMessages] = useState<any>([]);
  const {loggedInUser} = useAppSelector(store => store.user);
  const {opponentActiveChatId} = useAppSelector(store => store.chat);
  const [showInCognitoDetail, setShowInCognitoDetail] =
    useState<boolean>(false);
  const [incognitoMessages, setIncognitoMessages] = useState<any>([]);
  const flatListRef = useRef<FlatList<any>>(null);
  const {
    params: {user, conversationId},
  } = useRoute<RouteProps<'ChatScreen'>>();
  const navigation = useNavigation<NavigationProps<'ChatScreen'>>();
  let opponentUser = user;
  const dispatch = useAppDispatch();
  const {isKeyboardVisible, insets} = useDevice();
  const bottomInsets = insets.bottom > 0 ? insets.bottom : insets.top;

  const {globalSocket, onlineUsers} = useSocket();

  const isOpponentOnline = (): boolean => {
    return onlineUsers.includes(opponentUser._id);
  };

  const fetchConversationMessages = async () => {
    setMessageLoading(true);
    const {data, success} = await getConversationApi({
      sender: loggedInUser?._id!,
      receiver: opponentUser._id,
    });
    setMessageLoading(false);
    success ? setMessages(data.data.messages) : '';
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
      createdAt: new Date().toISOString(),
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

  const handleInCognitoMode = () => {
    setIsInCognito(!isInCognito);
    globalSocket.emit('chat-mode', {
      isInCognito: !isInCognito,
      senderId: loggedInUser?._id,
      receiverId: opponentUser._id,
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      dispatch(setSelectedOpponentUser(null));
    });

    return unsubscribe;
  }, [navigation]);

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

    return () => {
      globalSocket?.off('receive-message');
      globalSocket?.off('incognito-receive-message');
      globalSocket?.off('chat-mode');
    };
  }, []);

  useEffect(() => {
    if (!conversationId) return;

    globalSocket.emit('active_chat', {
      chatId: conversationId,
      currentUser: {_id: loggedInUser?._id, name: loggedInUser?.name},
      receiver: {_id: opponentUser._id, name: opponentUser.name},
      type: 'active',
    });

    return () => {
      globalSocket.emit('active_chat', {
        chatId: conversationId,
        currentUser: {_id: loggedInUser?._id, name: loggedInUser?.name},
        receiver: {_id: opponentUser._id, name: opponentUser.name},
        type: 'unactive',
      });
      globalSocket.emit('chat-mode', {
        isInCognito: false,
        senderId: loggedInUser?._id,
        receiverId: opponentUser._id,
      });
    };
  }, [conversationId]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={isKeyboardVisible ? bottomInsets : 0}>
      <View style={styles.contentContainer}>
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
                style={
                  isOpponentOnline() ? styles.onlineText : styles.offlineText
                }>
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
                  color={
                    isInCognito ? AppConstants.black : AppConstants.whiteColor
                  }
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

        <View style={styles.container}>
          {isInCognito && (
            <TouchableOpacity
              onPress={() => setShowInCognitoDetail(true)}
              style={styles.ghostBox}>
              <CustomText style={styles.ghostTxt}>GHOST MODE</CustomText>
              <Icon
                icon="info-circle"
                iconType="FontAwesome5"
                color={AppConstants.whiteColor}
                size={12}
              />
            </TouchableOpacity>
          )}
          {messageLoading ? (
            <EmptyData title="Loading Messages ..." showBtn={false} />
          ) : messages.length === 0 ? (
            <EmptyData title="NO MESSAGES" showBtn={false} />
          ) : (
            <FlatList
              data={isInCognito ? incognitoMessages : messages}
              ref={flatListRef}
              renderItem={({item}: {item: MessageType}) => (
                <MessageBox message={item} />
              )}
              contentContainerStyle={styles.flatListContent}
              onContentSizeChange={() =>
                flatListRef.current?.scrollToEnd({animated: true})
              }
              keyExtractor={item => `${item.timestamp}`}
              style={[isInCognito ? styles.dark : styles.light]}
            />
          )}
        </View>

        <View
          style={[
            styles.inputContainer,
            isInCognito ? styles.dark : styles.light,
          ]}>
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
            <Icon
              icon="send"
              iconType="Feather"
              color={AppConstants.redColor}
            />
          </TouchableOpacity>
        </View>
      </View>

      <CustomModal setShow={setShowInCognitoDetail} show={showInCognitoDetail}>
        <View style={styles.incognitoBox}>
          <CustomText numberOfLines={3} style={styles.incognitoTxtHeading}>
            Ghost Mode
          </CustomText>
          <CustomText style={styles.incognitoTxt} numberOfLines={3}>
            Messages sent in this chat are not saved on our servers or your
            device.
          </CustomText>
          <CustomText style={styles.incognitoTxt} numberOfLines={3}>
            Once you leave or go back, the entire chat is automatically deleted
            for both user.
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
  incognitoBox: {flexDirection: 'column', gap: 10, padding: s(20)},
  incognitoTxtHeading: {
    textAlign: 'center',
    fontSize: 30,
    color: AppConstants.redColor,
  },
  incognitoTxt: {fontWeight: '700'},
});
