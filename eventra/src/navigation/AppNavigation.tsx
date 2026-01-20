import BottomTabBar from '@components/navigation/BottomTabBar';
import {AppConstants} from '@constants/AppConstants';
import NetInfo from '@react-native-community/netinfo';
import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthScreen from '@screens/auth/AuthScreen';
import CompleteProfileScreen from '@screens/auth/CompleteProfileScreen';
import EmailVerificationScreen from '@screens/auth/EmailVerificationScreen';
import ForgotPasswordScreen from '@screens/auth/ForgotPasswordScreen';
import LoginScreen from '@screens/auth/LoginScreen';
import SignUpScreen from '@screens/auth/SignUpScreen';
import ChatDashboardScreen from '@screens/chat/ChatDashboardScreen';
import ChatScreen from '@screens/chat/ChatScreen';
import CustomSplashScreen from '@screens/CustomSplashScreen';
import ErrorScreen from '@screens/ErrorScreen';
import CreateEventScreen from '@screens/Event/CreateEventScreen';
import EventDetailScreen from '@screens/Event/EventDetailScreen';
import NotificationScreen from '@screens/NotificationScreen';
import CreatePostScreen from '@screens/post/CreatePostScreen';
import SinglePostScreen from '@screens/post/SinglePostScreen';
import ProfileScreen from '@screens/profile/ProfileScreen';
import SearchScreen from '@screens/SearchScreen';
import CreateVenueScreen from '@screens/Venue/CreateVenueScreen';
import VenueDetailScreen from '@screens/Venue/VenueDetailScreen';
import VenueScreen from '@screens/Venue/VenueScreen';
import {useAppDispatch} from '@store/hooks';
import {initDeepLinks} from '@utils/DeepLinkService';
import React, {useEffect, useState} from 'react';
import {Platform, StatusBar, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RootStackParamList} from 'types/AppTypes';
import PracticeScreen from '../screens/PracticeScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigation = () => {
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      state.isConnected && setIsConnected(state.isConnected);
    });
    const cleanup = initDeepLinks({dispatch, navigation});

    return () => {
      unsubscribe();
      cleanup?.();
    };
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar
        barStyle={Platform.OS === 'android' ? 'light-content' : 'dark-content'}
        backgroundColor={
          Platform.OS === 'android' ? AppConstants.redColor : undefined
        }
      />
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="CustomSplashScreen"
          component={CustomSplashScreen}
        />
        <Stack.Screen name="AuthScreen" component={AuthScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen
          name="CompleteProfileScreen"
          component={CompleteProfileScreen}
        />
        <Stack.Screen
          name="EmailVerificationScreen"
          component={EmailVerificationScreen}
        />
        <Stack.Screen name="Main" component={BottomTabBar} />

        <Stack.Screen name="EventDetailScreen" component={EventDetailScreen} />
        <Stack.Screen name="CreateEventScreen" component={CreateEventScreen} />

        <Stack.Screen name="VenueScreen" component={VenueScreen} />
        <Stack.Screen name="CreateVenueScreen" component={CreateVenueScreen} />
        <Stack.Screen name="VenueDetailScreen" component={VenueDetailScreen} />

        <Stack.Screen name="CreatePostScreen" component={CreatePostScreen} />
        <Stack.Screen name="SinglePostScreen" component={SinglePostScreen} />

        <Stack.Screen name="ErrorScreen" component={ErrorScreen} />

        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />

        <Stack.Screen
          name="ChatDashboardScreen"
          component={ChatDashboardScreen}
        />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />

        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
        />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />

        <Stack.Screen
          name="NotificationScreen"
          component={NotificationScreen}
        />

        <Stack.Screen name="PracticeScreen" component={PracticeScreen} />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default AppNavigation;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
});
