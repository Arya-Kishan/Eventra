import ConversationItem from '@components/chat/ConversationItem';
import CustomSafeScreen from '@components/CustomSafeScreen';
import CustomLoader from '@components/global/CustomLoader';
import CustomText from '@components/global/CustomText';
import {AppConstants} from '@constants/AppConstants';
import {useNavigation} from '@react-navigation/native';
import {getUserConversationsApi} from '@services/ChatService';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {setAllConversations} from '@store/reducers/chatSlice';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {s} from 'react-native-size-matters';
import {NavigationProps, userType} from 'types/AppTypes';

const ChatDashboardScreen = () => {
  const navigation = useNavigation<NavigationProps<'ChatDashboardScreen'>>();
  const [loader, setLoader] = useState(true);
  const {loggedInUser} = useAppSelector(store => store.user);
  const {allConversations} = useAppSelector(store => store.chat);

  const dispatch = useAppDispatch();

  const fetchAllConversations = async () => {
    try {
      setLoader(true);
      const {data: allConversationData, success} =
        await getUserConversationsApi({
          userId: loggedInUser?._id!,
        });

      success && dispatch(setAllConversations(allConversationData.data));
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllConversations();
  }, []);

  if (loader) {
    return <CustomLoader />;
  }
  return (
    <CustomSafeScreen style={styles.main}>
      <View style={styles.parent}>
        <CustomText variant="h2" style={{color: AppConstants.whiteColor}}>
          Messages
        </CustomText>
      </View>

      {allConversations && (
        <FlatList
          data={allConversations}
          renderItem={({item}: {item: userType}) => (
            <ConversationItem conversation={item} />
          )}
          contentContainerStyle={{
            gap: s(10),
            padding: AppConstants.screenPadding,
          }}
          keyExtractor={item => `${item._id}`}
          refreshing={loader}
          onRefresh={fetchAllConversations}
        />
      )}
    </CustomSafeScreen>
  );
};

export default ChatDashboardScreen;

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
