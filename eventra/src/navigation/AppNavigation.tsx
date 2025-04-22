import Icon from '@components/global/Icon';
import { AppConstants } from '@constants/AppConstants';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EventScreen from '@screens/bottom_tabs_screen/EventScreen';
import HomeScreen from '@screens/bottom_tabs_screen/HomeScreen';
import SocialScreen from '@screens/bottom_tabs_screen/SocialScreen';
import StoreScreen from '@screens/bottom_tabs_screen/StoreScreen';
import VenueScreen from '@screens/bottom_tabs_screen/VenueScreen';
import ErrorScreen from '@screens/ErrorScreen';
import CreateEventScreen from '@screens/Event/CreateEventScreen';
import EventDetailScreen from '@screens/Event/EventDetailScreen';
import CreateVenueScreen from '@screens/Venue/CreateVenueScreen';
import VenueDetailScreen from '@screens/Venue/VenueDetailScreen';
import React from 'react';
import { RootStackParamList } from 'types/AppTypes';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const AppNavigation = () => {

  const BottomTabs = () => {
    return (
      <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: AppConstants.redColor }}>
        <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: ({ focused }) => <Icon iconType='Feather' icon='home' color={focused ? AppConstants.redColor : AppConstants.grayColor} /> }} />
        <Tab.Screen name="Social" component={SocialScreen} options={{ tabBarIcon: ({ focused }) => <Icon iconType='FontAwesome5' icon='shapes' color={focused ? AppConstants.redColor : AppConstants.grayColor} /> }} />
        <Tab.Screen name="Event" component={EventScreen} options={{ tabBarIcon: ({ focused }) => <Icon iconType='Feather' icon='aperture' color={focused ? AppConstants.redColor : AppConstants.grayColor} /> }} />
        <Tab.Screen name="Store" component={StoreScreen} options={{ tabBarIcon: ({ focused }) => <Icon iconType='Feather' icon='shopping-bag' color={focused ? AppConstants.redColor : AppConstants.grayColor} /> }} />
        <Tab.Screen name="Venue" component={VenueScreen} options={{ tabBarIcon: ({ focused }) => <Icon iconType='Entypo' icon='address' color={focused ? AppConstants.redColor : AppConstants.grayColor} /> }} />
      </Tab.Navigator>
    )
  }
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        <Stack.Screen name="Main" component={BottomTabs} />
        
        <Stack.Screen name="EventDetailScreen" component={EventDetailScreen} />
        <Stack.Screen name="CreateEventScreen" component={CreateEventScreen} />

        <Stack.Screen name="VenueDetailScreen" component={VenueDetailScreen} />
        <Stack.Screen name="CreateVenueScreen" component={CreateVenueScreen} />

        <Stack.Screen name="ErrorScreen" component={ErrorScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
