import {CustomImage} from '@components/global/CustomImage';
import CustomText from '@components/global/CustomText';
import Icon from '@components/global/Icon';
import RoundedBox from '@components/global/RoundedBox';
import {AppConstants} from '@constants/AppConstants';
import {useSocket} from '@context/SocketContext';
import {useNavigation} from '@react-navigation/native';
import {unseenMessageApi} from '@services/ChatService';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {
  addUnOpendedMessages,
  setSelectedOpponentUser,
  setUnOpendedMessages,
  setUnSeenMessages,
} from '@store/reducers/chatSlice';
import React, {useEffect} from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {s} from 'react-native-size-matters';
import {MessageType, NavigationProps, userType} from 'types/AppTypes';

const ChatDashboardScreen = () => {
  const navigation = useNavigation<NavigationProps<'ChatDashboardScreen'>>();
  const {loggedInUser} = useAppSelector(store => store.user);
  const {unOpenedMessages, unSeenMessages} = useAppSelector(
    store => store.chat,
  );
  const {onlineUsers} = useSocket();

  const {chats} = loggedInUser!;
  const dispatch = useAppDispatch();
  console.log('unOpenedMessages : ', unOpenedMessages);
  console.log('chats : ', chats);
  console.log('loggedInUser : ', loggedInUser);

  const handleNavigate = (item: userType) => {
    navigation.navigate('ChatScreen', {user: item});
    dispatch(setSelectedOpponentUser(item));
    dispatch(
      setUnOpendedMessages(
        unOpenedMessages.filter(
          (val: MessageType) => val.sender._id !== item._id,
        ),
      ),
    );
    deleteUserUnSeenMessages(item);
  };

  const fetchUnOpnedMessageCount = (user: userType): string => {
    const count = unOpenedMessages.filter(
      (item: MessageType) => item.sender._id == user._id,
    ).length;
    return count == 0 ? '' : count.toString();
  };

  const fetchAllUnSeenMessages = async () => {
    const {data, success} = await unseenMessageApi({
      body: {receiver: loggedInUser?._id},
      type: 'get',
    });
    console.log('ALL UNSEEN MESSAGES : ', data.data);
    dispatch(setUnSeenMessages(data.data));

    data.data.forEach((item: MessageType) => {
      dispatch(addUnOpendedMessages(item));
    });
  };

  const isOpponentOnline = (user: userType): boolean => {
    return onlineUsers.includes(user._id);
  };

  const deleteUserUnSeenMessages = async (user: userType) => {
    const {data, success} = await unseenMessageApi({
      body: {receiver: loggedInUser?._id},
      type: 'delete',
    });
  };

  useEffect(() => {
    unSeenMessages == null && fetchAllUnSeenMessages();
  }, []);

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <View
          style={{
            backgroundColor: AppConstants.redColor,
            padding: AppConstants.screenPadding,
            flexDirection: 'row',
            gap: s(10),
            alignItems: 'center',
          }}>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon icon="arrow-left" iconType="FontAwesome5" size={s(20)} />
          </Pressable>
          <CustomText variant="h2" style={{color: AppConstants.whiteColor}}>
            Messages
          </CustomText>
        </View>

        <FlatList
          data={chats}
          renderItem={({item}: {item: userType}) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleNavigate(item)}
              style={{
                flexDirection: 'row',
                gap: s(8),
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <CustomImage
                source={
                  item?.profilePic?.url !== undefined
                    ? item?.profilePic?.url
                    : AppConstants.fallbackProfilePic
                }
                width={s(50)}
                height={s(50)}
              />

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  gap: s(4),
                  justifyContent: 'space-between',
                }}>
                <View style={{justifyContent: 'space-between', gap: s(10)}}>
                  <CustomText variant="h4">{item.name}</CustomText>
                  <CustomText fontWeight="800" variant="overline">
                    {isOpponentOnline(item) ? 'ONLINE' : 'OFFLINE'}
                  </CustomText>
                </View>

                <View
                  style={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: s(10),
                  }}>
                  {fetchUnOpnedMessageCount(item) == '' ? (
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
                        {fetchUnOpnedMessageCount(item)}
                      </CustomText>
                    </RoundedBox>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={{
            gap: s(10),
            padding: AppConstants.screenPadding,
          }}
          keyExtractor={item => `${item._id}`}
        />
      </View>
    </View>
  );
};

export default ChatDashboardScreen;

const styles = StyleSheet.create({});
