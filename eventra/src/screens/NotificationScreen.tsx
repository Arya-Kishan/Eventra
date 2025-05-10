import EmptyData from '@components/global/EmptyData';
import NotificationCard from '@components/notification/NotificationCard';
import { AppConstants } from '@constants/AppConstants';
import { getAllNotificationApi, markAllNotificationReadApi } from '@services/notificationService';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { setAllNotifications } from '@store/reducers/userSlice';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { s } from 'react-native-size-matters';
import { NotificationType } from 'types/AppTypes';

const NotificationScreen = () => {


  const { loggedInUser, allNotifications } = useAppSelector(store => store.user);
  const [notifications, setNotifications] = useState<NotificationType[] | null>(allNotifications);
  const dispatch = useAppDispatch();
  const [refetchLoader, setRefetchLoader] = useState<boolean>(false);

  const markAllNotificationAsSeen = async () => {
    await markAllNotificationReadApi(loggedInUser?._id!);
  }

  const refetchAllUserNotification = async () => {
    setRefetchLoader(true);
    const { data, success } = await getAllNotificationApi(loggedInUser?._id!);
    console.log("REFETCH ALL NOTIFICAITON : ", data);
    success ? dispatch(setAllNotifications(data.data)) : "";
    setRefetchLoader(false);
  }

  console.log("allNotifications : ", allNotifications)

  useEffect(() => {
    markAllNotificationAsSeen();
    setNotifications(allNotifications);
  }, [allNotifications])

  return (
    <SafeAreaView style={{ flex: 1, padding: AppConstants.screenPadding }}>

      {
        notifications && notifications.length !== 0
          ?
          <FlatList
            data={notifications}
            renderItem={({ item }: { item: NotificationType }) => (
              <NotificationCard item={item} />
            )}
            keyExtractor={(item) => `${item._id}`}
            contentContainerStyle={{ gap: s(10) }}
            refreshing={refetchLoader}
            onRefresh={refetchAllUserNotification}
          />
          :
          <EmptyData title='NO NOTIFICATIONS' />
      }



    </SafeAreaView>
  )
}

export default NotificationScreen

const styles = StyleSheet.create({})