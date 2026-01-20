import CustomText from '@components/global/CustomText';
import EmptyData from '@components/global/EmptyData';
import Icon from '@components/global/Icon';
import NotificationCard from '@components/notification/NotificationCard';
import {AppConstants} from '@constants/AppConstants';
import {useNavigation} from '@react-navigation/native';
import {
  getAllNotificationApi,
  markAllNotificationReadApi,
} from '@services/notificationService';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {setAllNotifications} from '@store/reducers/userSlice';
import React, {useEffect, useState} from 'react';
import {FlatList, Pressable, StyleSheet, View} from 'react-native';
import {s} from 'react-native-size-matters';
import {NavigationProps, NotificationType} from 'types/AppTypes';

const NotificationScreen = () => {
  const {loggedInUser, allNotifications} = useAppSelector(store => store.user);
  const [notifications, setNotifications] = useState<NotificationType[] | null>(
    allNotifications,
  );
  const dispatch = useAppDispatch();
  const [refetchLoader, setRefetchLoader] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProps<'NotificationScreen'>>();

  const markAllNotificationAsSeen = async () => {
    await markAllNotificationReadApi(loggedInUser?._id!);
  };

  const refetchAllUserNotification = async () => {
    setRefetchLoader(true);
    const {data, success} = await getAllNotificationApi(loggedInUser?._id!);
    success ? dispatch(setAllNotifications(data.data)) : '';
    setRefetchLoader(false);
  };

  useEffect(() => {
    markAllNotificationAsSeen();
    setNotifications(allNotifications);
  }, [allNotifications]);

  return (
    <View style={styles.flex}>
      <View style={styles.main}>
        <Pressable onPress={() => navigation.goBack()} style={styles.heading}>
          <Icon icon="arrow-back-ios" iconType="MaterialIcons" />
          <CustomText variant="h3" style={{color: AppConstants.whiteColor}}>
            Notification
          </CustomText>
        </Pressable>

        <Icon icon="notifications" iconType="MaterialIcons" />
      </View>

      {notifications && notifications.length !== 0 ? (
        <FlatList
          data={notifications}
          renderItem={({item}: {item: NotificationType}) => (
            <NotificationCard item={item} />
          )}
          keyExtractor={item => `${item._id}`}
          contentContainerStyle={{
            gap: s(10),
            padding: AppConstants.screenPadding,
          }}
          refreshing={refetchLoader}
          onRefresh={refetchAllUserNotification}
        />
      ) : (
        <EmptyData title="NO NOTIFICATIONS" />
      )}
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  main: {
    backgroundColor: AppConstants.redColor,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: AppConstants.screenPadding,
    height: s(70),
  },
  flex: {flex: 1},
  heading: {flexDirection: 'row', alignItems: 'center'},
});
