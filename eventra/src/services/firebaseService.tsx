// firebaseService.ts
import {getApp} from '@react-native-firebase/app';
import {
  AuthorizationStatus,
  getMessaging,
  getToken,
  isDeviceRegisteredForRemoteMessages,
  registerDeviceForRemoteMessages,
  requestPermission,
} from '@react-native-firebase/messaging';
import notifee, {AndroidImportance} from '@notifee/react-native';
import {AsyncGetFCMToken, AsyncSetFCMToken} from '@utils/AsyncStorage';
import {Alert, Platform} from 'react-native';
import {userType} from 'types/AppTypes';
import {updateUserApi} from './UserService';

const messaging = getMessaging(getApp());

async function createNotificationChannel() {
  await notifee.createChannel({
    id: 'default',
    name: 'App Notification',
    importance: AndroidImportance.HIGH, // 🔥 REQUIRED
    sound: 'notification_sound', // 🔥 REQUIRED
  });
}

export const requestUserPermission = async (user: userType): Promise<void> => {
  try {
    console.log('ASKING FOR NOTIFICATION PERMISSION');

    if (Platform.OS === 'android') {
      // 🔥 REQUIRED for Android 13+
      await notifee.requestPermission();
      await createNotificationChannel();
      await getFcmToken(user);
      return;
    }

    // iOS
    const authStatus = await requestPermission(messaging);
    const enabled =
      authStatus === AuthorizationStatus.AUTHORIZED ||
      authStatus === AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      await getFcmToken(user);
    }
  } catch (err) {
    console.error('Permission request failed', err);
  }
};

export const getFcmToken = async (user: userType): Promise<void> => {
  try {
    const registered = await isDeviceRegisteredForRemoteMessages(messaging);
    if (!registered) {
      await registerDeviceForRemoteMessages(messaging);
    }

    const token = await getToken(messaging);
    const storedToken = await AsyncGetFCMToken();

    if (
      token &&
      (token !== storedToken || user.FCMToken == '' || user.FCMToken == 'null')
    ) {
      await AsyncSetFCMToken(token);
      const formdata = new FormData();
      formdata.append('FCMToken', token);
      await updateUserApi(formdata, user._id);

      // 🔁 Send token to your backend here
      // await sendTokenToBackend(token);
    } else {
      // console.log('FCM token unchanged or already stored');
    }
  } catch (err) {
    console.error('Failed to get FCM token:', err);
  }
};

export const showLocalAlert = (title: string, body?: string): void => {
  Alert.alert(title, body || '');
};
