import EventScreen from '@screens/bottom_tabs_screen/EventScreen';
import HomeScreen from '@screens/bottom_tabs_screen/HomeScreen';
import SocialScreen from '@screens/bottom_tabs_screen/SocialScreen';
import StoreScreen from '@screens/bottom_tabs_screen/StoreScreen';
import React, { FC } from 'react';
import { StyleSheet } from 'react-native';

import CustomTabBar from '@components/global/CustomTabBar';
import { s } from 'react-native-size-matters';


import { AppConstants } from '@constants/AppConstants';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabProfileScreen from '@screens/bottom_tabs_screen/TabProfileScreen';
import { useAppSelector } from '@store/hooks';
import Feather from 'react-native-vector-icons/Feather';

const Tab = createBottomTabNavigator();

const BottomTabBar: FC = () => {

    const { unOpenedMessages } = useAppSelector(store => store.chat);

    const getMessageCount = (): string => {
        return unOpenedMessages && unOpenedMessages.length == 0 ? "" : unOpenedMessages.length.toString()
    }


    return (
        <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: AppConstants.redColor }} tabBar={(props) => <CustomTabBar {...props} />} >

            <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarBadge: "", tabBarIcon: ({ focused }) => <Feather size={s(20)} name='home' color={focused ? AppConstants.redColor : AppConstants.grayColor} /> }} />

            <Tab.Screen name="Social" component={SocialScreen} options={{ tabBarBadge: getMessageCount(), tabBarIcon: ({ focused }) => <Feather size={s(20)} name='command' color={focused ? AppConstants.redColor : AppConstants.grayColor} /> }} />

            <Tab.Screen name="Event" component={EventScreen} options={{ tabBarBadge: "", tabBarIcon: ({ focused }) => <Feather size={s(20)} name='aperture' color={focused ? AppConstants.redColor : AppConstants.grayColor} /> }} />

            <Tab.Screen name="Store" component={StoreScreen} options={{ tabBarBadge: "", tabBarIcon: ({ focused }) => <Feather size={s(20)} name='shopping-bag' color={focused ? AppConstants.redColor : AppConstants.grayColor} /> }} />

            <Tab.Screen name="Profile" component={TabProfileScreen} options={{ tabBarBadge: "", tabBarIcon: ({ focused }) => <Feather size={s(20)} name='user' color={focused ? AppConstants.redColor : AppConstants.grayColor} /> }} />

        </Tab.Navigator>
    )
}

export default BottomTabBar

const styles = StyleSheet.create({})