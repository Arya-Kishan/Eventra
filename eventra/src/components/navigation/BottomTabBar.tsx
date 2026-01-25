import EventScreen from '@screens/bottom_tabs_screen/EventScreen';
import HomeScreen from '@screens/bottom_tabs_screen/HomeScreen';
import SocialScreen from '@screens/bottom_tabs_screen/SocialScreen';
import React, {FC} from 'react';
import {StyleSheet} from 'react-native';

import CustomTabBar from '@components/global/CustomTabBar';
import {s, vs} from 'react-native-size-matters';

import Icon from '@components/global/Icon';
import {AppConstants} from '@constants/AppConstants';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TabProfileScreen from '@screens/bottom_tabs_screen/TabProfileScreen';
import ChatDashboardScreen from '@screens/chat/ChatDashboardScreen';
import {useAppSelector} from '@store/hooks';
import Feather from 'react-native-vector-icons/Feather';
import {SafeAreaView} from 'react-native-safe-area-context';
import useDevice from '@hooks/useDevice';
import {View} from 'react-native';
import CustomSafeScreen from '@components/CustomSafeScreen';

const Tab = createBottomTabNavigator();

const BottomTabBar: FC = () => {
  const {unseenMessageCount} = useAppSelector(store => store.chat);
  const {insets} = useDevice();
  console.log(insets);

  const getMessageCount = (): string => {
    return unseenMessageCount === 0 ? '' : unseenMessageCount.toString();
  };

  return (
    <View
      style={{
        flex: 1,
        paddingBottom: vs(10),
        backgroundColor: AppConstants.whiteColor,
      }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: AppConstants.redColor,
        }}
        tabBar={props => <CustomTabBar {...props} />}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarBadge: '',
            tabBarIcon: ({focused}) => (
              <Feather
                size={s(20)}
                name="home"
                color={focused ? AppConstants.redColor : AppConstants.grayColor}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Social"
          component={SocialScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <Feather
                size={s(20)}
                name="command"
                color={focused ? AppConstants.redColor : AppConstants.grayColor}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Event"
          component={EventScreen}
          options={{
            tabBarBadge: '',
            tabBarIcon: ({focused}) => (
              <Feather
                size={s(20)}
                name="aperture"
                color={focused ? AppConstants.redColor : AppConstants.grayColor}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Chat"
          component={ChatDashboardScreen}
          options={{
            tabBarBadge: getMessageCount(),
            tabBarIcon: ({focused}) => (
              <Icon
                size={s(20)}
                icon="chat"
                iconType="Entypo"
                color={focused ? AppConstants.redColor : AppConstants.grayColor}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Profile"
          component={TabProfileScreen}
          options={{
            tabBarBadge: '',
            tabBarIcon: ({focused}) => (
              <Feather
                size={s(20)}
                name="user"
                color={focused ? AppConstants.redColor : AppConstants.grayColor}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default BottomTabBar;

const styles = StyleSheet.create({});
