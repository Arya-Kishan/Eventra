import CustomLoader from '@components/global/CustomLoader';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from '@screens/auth/AuthScreen';
import ForgotPasswordScreen from '@screens/auth/ForgotPasswordScreen';
import LoginScreen from '@screens/auth/LoginScreen';
import SignUpScreen from '@screens/auth/SignUpScreen';
import ChatDashboardScreen from '@screens/chat/ChatDashboardScreen';
import ChatScreen from '@screens/chat/ChatScreen';
import ErrorScreen from '@screens/ErrorScreen';
import CreateEventScreen from '@screens/Event/CreateEventScreen';
import EventDetailScreen from '@screens/Event/EventDetailScreen';
import CreatePostScreen from '@screens/post/CreatePostScreen';
import ProfileScreen from '@screens/profile/ProfileScreen';
import CartScreen from '@screens/store/CartScreen';
import ProductDetailScreen from '@screens/store/ProductDetailScreen';
import CreateVenueScreen from '@screens/Venue/CreateVenueScreen';
import VenueDetailScreen from '@screens/Venue/VenueDetailScreen';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { setLoggedInUser } from '@store/reducers/userSlice';
import { AsyncGetData } from '@utils/AsyncStorage';
import React, { useEffect, useState } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { RootStackParamList } from 'types/AppTypes';
import { getApp } from '@react-native-firebase/app';
import { FirebaseMessagingTypes, getInitialNotification, getMessaging, onMessage, onNotificationOpenedApp, onTokenRefresh } from '@react-native-firebase/messaging';
import { showLocalAlert } from '@services/firebaseService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLoggedInUserApi, getSingleuserApi, updateUserApi } from '@services/UserService';
import NetInfo from '@react-native-community/netinfo';
import BottomTabBar from '@components/navigation/BottomTabBar';
import VenueScreen from '@screens/Venue/VenueScreen';
import SearchScreen from '@screens/SearchScreen';
import NotificationScreen from '@screens/NotificationScreen';


const TOKEN_KEY = 'fcmToken';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigation = () => {

  const linking = {
    prefixes: ['myapp://', 'https://myapp.com','https://eventra-website.vercel.app'],
    config: {
      screens: {
        Main: 'Main',
        NotificationScreen: 'NotificationScreen/:name', // dynamic parameter example
        ProfileScreen: 'ProfileScreen',
      },
    },
  };

  const dispatch = useAppDispatch();
  const [loader, setLoader] = useState(true);
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const { loggedInUser } = useAppSelector(store => store.user);

  const checkAuth = async () => {
    const user = await AsyncGetData();

    if (user) {
      // dispatch(setLoggedInUser(JSON.parse(user)));
      const { data } = await getLoggedInUserApi(JSON.parse(user)._id);
      dispatch(setLoggedInUser(data.data));
    } else {
      dispatch(setLoggedInUser(null));
    }
    setLoader(false);
    SplashScreen.hide();

  };

  useEffect(() => {
    checkAuth();
  }, [])

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      state.isConnected && setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, []);


  // BELOW USEEFFECT FOR FCM NOTIFICATIONS
  useEffect(() => {

    if (loggedInUser == null) return;

    const messaging = getMessaging(getApp());

    const setupFCM = async () => {

      const unsubscribe = onMessage(messaging, async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        console.log('Foreground message received:', remoteMessage);
        showLocalAlert(remoteMessage.notification?.title || 'Notification', remoteMessage.notification?.body);
      });

      onNotificationOpenedApp(messaging, (remoteMessage) => {
        console.log('Opened from background state:', remoteMessage?.notification);
      });

      const initialNotification = await getInitialNotification(messaging);
      if (initialNotification) {
        console.log('Opened from quit state:', initialNotification.notification);
      }

      return unsubscribe;
    };

    const unsubscribeToken = onTokenRefresh(messaging, async (newToken) => {
      const storedToken = await AsyncStorage.getItem(TOKEN_KEY);
      if (newToken !== storedToken) {
        console.log('FCM Token refreshed:', newToken);
        await AsyncStorage.setItem(TOKEN_KEY, newToken);
        const formdata = new FormData();
        formdata.append("FCMToken", storedToken);
        await updateUserApi(formdata, loggedInUser._id);
      }
    });

    setupFCM();

    return () => unsubscribeToken();
  }, [loggedInUser]);


  if (loader) {
    return <CustomLoader />
  }

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        {
          loggedInUser == null
            ?
            <>
              <Stack.Screen name="AuthScreen" component={AuthScreen} />
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            </>
            :
            <>
              <Stack.Screen name="Main" component={BottomTabBar} />

              <Stack.Screen name="EventDetailScreen" component={EventDetailScreen} />
              <Stack.Screen name="VenueDetailScreen" component={VenueDetailScreen} />
              <Stack.Screen name="VenueScreen" component={VenueScreen} />
              <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} />

              <Stack.Screen name="CreateEventScreen" component={CreateEventScreen} />
              <Stack.Screen name="CreateVenueScreen" component={CreateVenueScreen} />
              <Stack.Screen name="CreatePostScreen" component={CreatePostScreen} />

              <Stack.Screen name="ErrorScreen" component={ErrorScreen} />

              <Stack.Screen name="CartScreen" component={CartScreen} />
              <Stack.Screen name="ChatDashboardScreen" component={ChatDashboardScreen} />
              <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
              <Stack.Screen name="ChatScreen" component={ChatScreen} />
              <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
              <Stack.Screen name="SearchScreen" component={SearchScreen} />
              <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
            </>
        }


      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
