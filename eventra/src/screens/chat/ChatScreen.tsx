import MessageBox from '@components/chat/MessageBox';
import {CustomImage} from '@components/global/CustomImage';
import CustomText from '@components/global/CustomText';
import EmptyData from '@components/global/EmptyData';
import Icon from '@components/global/Icon';
import {AppConstants} from '@constants/AppConstants';
import {useSocket} from '@context/SocketContext';
import {useNavigation, useRoute} from '@react-navigation/native';
import {createMessageApi, getConversationApi} from '@services/ChatService';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {setSelectedOpponentUser} from '@store/reducers/chatSlice';
import {getRelativeTimeFromNow, showToast} from '@utils/Helper';
import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
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
  const [messageLoading, setMessageLoading] = useState(false);
  const {loggedInUser} = useAppSelector(store => store.user);
  const [messages, setMessages] = useState<any>([]);
  const [conversationId, setConversationId] = useState<any>('');
  const flatListRef = useRef<FlatList<any>>(null);
  const {
    params: {user},
  } = useRoute<RouteProps<'ChatScreen'>>();
  const navigation = useNavigation<NavigationProps<'ChatScreen'>>();
  let opponentUser = user;
  const dispatch = useAppDispatch();

  const {globalSocket, onlineUsers} = useSocket();

  const fetchConversationMessages = async () => {
    setMessageLoading(true);
    const {data, success} = await getConversationApi({
      sender: loggedInUser?._id!,
      receiver: opponentUser._id,
    });
    console.log('LOADED MESSAFES', {data, success});
    data.data && setConversationId(data.data._id);
    setMessageLoading(false);
    success ? setMessages(data.data.messages) : '';
  };

  const handleSend = async () => {
    if (text.length < 1) {
      return showToast({title: 'Write Message'});
    }

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
      timestamp: Date.now().toString(),
      status: 'sent',
      read: false,
    };

    console.log('NEW MESSAGE BEFRE SAVING', newMessage);

    setMessages((prev: any) => [...prev, newMessage]);
    globalSocket.emit('send-message', newMessage);

    const {data, success} = await createMessageApi({
      sender: loggedInUser?._id!,
      receiver: opponentUser._id,
      message: {
        type: 'text',
        value: text,
      },
    });

    console.log('SEND MESSAGE', data.data);

    // USED FOR CLEANING INPUT
    setText('');
  };

  const isOpponentOnline = (): boolean => {
    return onlineUsers.includes(opponentUser._id);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      dispatch(setSelectedOpponentUser(null));
      console.log('USER GOES BACK ----------');
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    fetchConversationMessages();

    // RECEIVING MESSAGE
    globalSocket.on('receive-message', (receivedMessage: any) => {
      console.log('RECEIVED MESSAGE : ', receivedMessage);
      const {sender, receiver} = receivedMessage;

      // ONLY SHOW MESSAGES WHEN OPPONENT USER IS SAME AS RECEIVER USER
      if (opponentUser?._id == sender._id) {
        setMessages((prev: any) => [...prev, receivedMessage]);
        globalSocket.emit('delivered', receivedMessage);
      }
    });

    return () => globalSocket?.off('receive-message');
  }, []);

  useEffect(() => {
    if (!conversationId) return;

    globalSocket.emit('active_chat', {
      chatId: conversationId,
      receiver: {_id: opponentUser._id, name: opponentUser.name},
      type: 'active',
    });

    return () => {
      globalSocket.emit('active_chat', {
        chatId: conversationId,
        receiver: {_id: opponentUser._id, name: opponentUser.name},
        type: 'unactive',
      });
    };
  }, [conversationId]);

  const isOnline = isOpponentOnline();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
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
                style={isOnline ? styles.onlineText : styles.offlineText}>
                {isOnline
                  ? 'Online'
                  : getRelativeTimeFromNow(opponentUser?.active!)}
              </CustomText>
            </View>

            <Icon icon="dots-vertical" iconType="MaterialCommunityIcons" />
          </View>
        </View>

        {messageLoading ? (
          <EmptyData title="Loading Messages ..." showBtn={false} />
        ) : messages.length == 0 ? (
          <EmptyData title="NO MESSAGES" showBtn={false} />
        ) : (
          <FlatList
            data={messages}
            ref={flatListRef}
            renderItem={({item}: {item: MessageType}) => (
              <MessageBox message={item} />
            )}
            contentContainerStyle={styles.flatListContent}
            onContentSizeChange={() =>
              flatListRef.current?.scrollToEnd({animated: true})
            }
            keyExtractor={(item, index) => `${item.timestamp}`}
          />
        )}

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Write a message...."
            value={text}
            onChangeText={setText}
            style={styles.textInput}
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
    borderRadius: s(10),
    gap: s(2),
  },
});
