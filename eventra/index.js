// index.ts
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import App from './App';
import {
    getMessaging,
    setBackgroundMessageHandler,
    FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import { getApp } from '@react-native-firebase/app';

const messaging = getMessaging(getApp());

setBackgroundMessageHandler(messaging, async (remoteMessage) => {
    console.log('Message handled in background/killed state:', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
