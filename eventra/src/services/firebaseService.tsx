// firebaseService.ts
import {
    getMessaging,
    getToken,
    requestPermission,
    isDeviceRegisteredForRemoteMessages,
    registerDeviceForRemoteMessages,
    AuthorizationStatus,
    FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import { getApp } from '@react-native-firebase/app';
import { Alert } from 'react-native';
import { AsyncGetFCMToken, AsyncSetFCMToken } from '@utils/AsyncStorage';
import { updateUserApi } from './UserService';
import { userType } from 'types/AppTypes';

const messaging = getMessaging(getApp());

export const requestUserPermission = async (user: userType): Promise<void> => {
    try {
        const authStatus = await requestPermission(messaging);
        const enabled =
            authStatus === AuthorizationStatus.AUTHORIZED ||
            authStatus === AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            console.log('Authorization status:', authStatus);
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
        console.log('ALREADY EXISTING TOKEN :', token);
        console.log('LOGGED IN USER fcm TOKEN :', user.FCMToken);

        if (token && (token !== storedToken || user.FCMToken == "")) {
            console.log('New FCM Token:', token);
            await AsyncSetFCMToken(token);
            const formdata = new FormData();
            formdata.append("FCMToken", storedToken);
            await updateUserApi(formdata, user._id);

            // 🔁 Send token to your backend here
            // await sendTokenToBackend(token);
        } else {
            console.log('FCM token unchanged or already stored');
        }

    } catch (err) {
        console.error('Failed to get FCM token:', err);
    }
};

export const showLocalAlert = (title: string, body?: string): void => {
    Alert.alert(title, body || '');
};
