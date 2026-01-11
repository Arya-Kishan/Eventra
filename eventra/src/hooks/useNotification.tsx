import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {addNotification} from '@store/reducers/userSlice';
import {NotificationType} from 'types/AppTypes';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {getApp} from '@react-native-firebase/app';
import {
  getInitialNotification,
  onNotificationOpenedApp,
  onMessage,
  getMessaging,
  onTokenRefresh,
} from '@react-native-firebase/messaging';
import {showLocalAlert} from '@services/firebaseService';
import {updateUserApi} from '@services/UserService';
import {useEffect} from 'react';

const TOKEN_KEY = 'fcmToken';

const useNotification = () => {
  const {loggedInUser} = useAppSelector(store => store.user);
  const dispatch = useAppDispatch();

  const addNotificationToStore = (
    remoteMessage: FirebaseMessagingTypes.RemoteMessage,
  ) => {
    const newNotification: NotificationType = {
      title: remoteMessage.notification?.title!,
      body: remoteMessage.notification?.body!,
      notification_type: remoteMessage.data?.notification_type as
        | 'like'
        | 'comment'
        | 'booking',
      link: remoteMessage.data?.link as string,
      isRead: false,
      user: loggedInUser?._id,
    };
    dispatch(addNotification(newNotification));
  };

  // BELOW USEEFFECT FOR FCM NOTIFICATIONS
  useEffect(() => {
    if (loggedInUser == null) return;

    const messaging = getMessaging(getApp());

    const setupFCM = async () => {
      // FOREGROUND NOTIFICATION
      const unsubscribe = onMessage(
        messaging,
        async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
          console.log('Foreground message received:', remoteMessage);
          showLocalAlert(
            remoteMessage.notification?.title || 'Notification',
            remoteMessage.notification?.body,
          );
          addNotificationToStore(remoteMessage);
        },
      );

      // BACKGROUND NOTIFICATION
      onNotificationOpenedApp(messaging, remoteMessage => {
        addNotificationToStore(remoteMessage);
        console.log(
          'Opened from background state:',
          remoteMessage?.notification,
        );
      });

      // APP OPENED FROM KILLED STATE FROM NOTIFICATION
      const initialNotification = await getInitialNotification(messaging);
      if (initialNotification) {
        console.log(
          'Opened from quit state:',
          initialNotification.notification,
        );
      }

      return unsubscribe;
    };

    const unsubscribeToken = onTokenRefresh(messaging, async newToken => {
      const storedToken = await AsyncStorage.getItem(TOKEN_KEY);
      if (newToken !== storedToken) {
        console.log('FCM Token refreshed:', newToken);
        await AsyncStorage.setItem(TOKEN_KEY, newToken);
        const formdata = new FormData();
        formdata.append('FCMToken', storedToken);
        await updateUserApi(formdata, loggedInUser._id);
      }
    });

    setupFCM();

    return () => unsubscribeToken();
  }, [loggedInUser]);

  return {addNotificationToStore};
};

export default useNotification;
