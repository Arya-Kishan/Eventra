import CustomText from '@components/global/CustomText';
import EmptyData from '@components/global/EmptyData';
import Icon from '@components/global/Icon';
import {AppConstants} from '@constants/AppConstants';
import React, {FC, useEffect, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {s} from 'react-native-size-matters';
import {MessageType} from 'types/AppTypes';
import FloatingItem from './FloatingItem';
import MessageBox from './MessageBox';
import {getRandomNumber} from '@utils/Helper';
import {useSocket} from '@context/SocketContext';
import {useAppSelector} from '@store/hooks';

interface ChatMessagesProps {
  isInCognito: boolean;
  setShowInCognitoDetail: any;
  incognitoMessages: any;
  messages: any;
  messageLoading: boolean;
}

const ChatMessages: FC<ChatMessagesProps> = ({
  isInCognito,
  setShowInCognitoDetail,
  messages,
  incognitoMessages,
  messageLoading,
}) => {
  const [items, setItems] = useState<
    {id: number; text: string; leftPos: number}[]
  >([]);
  const flatListRef = useRef<FlatList<any>>(null);
  const {globalSocket} = useSocket();
  const {loggedInUser} = useAppSelector(store => store.user);

  const messageClick = (item: any, from: 'socket' | 'self' = 'self') => {
    setItems(prev => [
      ...prev,
      {
        id: Date.now(),
        text: item.message.value,
        leftPos: getRandomNumber({
          min: 20,
          max: AppConstants.screenWidth * 0.8,
        }),
      },
    ]);
    if (from === 'socket') return;
    const isOwnMesssage = loggedInUser?._id === item.sender._id;
    globalSocket.emit('bubble-emit', {
      receiver: isOwnMesssage ? item.receiver : item.sender,
      sender: isOwnMesssage ? item.sender : item.receiver,
      message: item.message,
    });
  };

  useEffect(() => {
    globalSocket.on('bubble-listen', (data: any) => {
      messageClick(data, 'socket');
    });

    return () => {
      globalSocket?.off('bubble');
    };
  }, []);

  return (
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
            <TouchableOpacity
              onLongPress={() => {
                messageClick(item, 'self');
              }}>
              <MessageBox message={item} />
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.flatListContent}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({animated: true})
          }
          keyExtractor={item => `${item.timestamp}`}
          style={[isInCognito ? styles.dark : styles.light]}
        />
      )}

      {items.map(item => (
        <FloatingItem
          key={item.id}
          item={item}
          onFinish={() => {
            setItems(prev => prev.filter(i => i.id !== item.id));
          }}
        />
      ))}
    </View>
  );
};

export default ChatMessages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
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
  flatListContent: {
    gap: s(0),
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    height: '10%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    backgroundColor: '#eee',
  },
});
