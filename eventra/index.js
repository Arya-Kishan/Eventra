// index.ts
import { getApp } from '@react-native-firebase/app';
import {
    getMessaging,
    setBackgroundMessageHandler
} from '@react-native-firebase/messaging';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import 'react-native-url-polyfill/auto'; // ensures linking works on all platforms

const messaging = getMessaging(getApp());

setBackgroundMessageHandler(messaging, async (remoteMessage) => {
    console.log('Message handled in background/killed state:', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
