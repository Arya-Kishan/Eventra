import notifee, {EventType} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch} from '@store/hooks';
import {resolveDeepLink} from '@utils/DeepLinkService';
import {useEffect} from 'react';

const NotificationHandler = () => {
  const navigation = useNavigation();
  // const userData = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Handle FCM notification press from a quit state
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        resolveDeepLink({
          url: remoteMessage?.data?.link || '',
          navigation: navigation,
          dispatch: dispatch,
          openingFrom: 'cold',
        });
      });

    // Handle FCM background notification press
    const unsubscribeBackGroundMessaging = messaging().onNotificationOpenedApp(
      remoteMessage => {
        resolveDeepLink({
          url: remoteMessage?.data?.link || '',
          navigation: navigation,
          dispatch: dispatch,
          openingFrom: 'background',
        });
      },
    );

    const unsubscribeForeGroundMessaging = messaging().onMessage(
      async remoteMessage => {
        await notifee.displayNotification({
          title: remoteMessage.notification?.title,
          body: remoteMessage.notification?.body,
          data: remoteMessage.data, // 👈 REQUIRED for deep link
          android: {
            channelId: 'default',
            pressAction: {
              id: 'default', // 👈 REQUIRED
            },
          },
        });
      },
    );

    // Handle Notifee foreground notification press
    const unsubscribeNotifeeForegroundEvent = notifee.onForegroundEvent(
      ({type, detail}) => {
        if (type === EventType.PRESS) {
          resolveDeepLink({
            url: detail.notification?.data?.link || '',
            navigation: navigation,
            dispatch: dispatch,
            openingFrom: 'foreground',
          });
        }
      },
    );

    return () => {
      unsubscribeBackGroundMessaging();
      unsubscribeForeGroundMessaging();
      unsubscribeNotifeeForegroundEvent();
    };
  }, []);

  return null; // No UI needed
};

export default NotificationHandler;
