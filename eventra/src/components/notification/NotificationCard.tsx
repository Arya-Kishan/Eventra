import {CustomImage} from '@components/global/CustomImage';
import CustomText from '@components/global/CustomText';
import EmptyData from '@components/global/EmptyData';
import {AppConstants} from '@constants/AppConstants';
import {markAllNotificationReadApi} from '@services/notificationService';
import {useAppSelector} from '@store/hooks';
import React, {FC, useEffect, useState} from 'react';
import {
  FlatList,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {s} from 'react-native-size-matters';
import {NotificationType} from 'types/AppTypes';

interface NotificationCardProps {
  item: NotificationType;
}

const NotificationCard: FC<NotificationCardProps> = ({item}) => {
  const handleClickNotification = (link: string) => {
    const deepLink = link.replace(
      'https://eventra-website.vercel.app',
      'myapp://',
    );
    Linking.openURL(deepLink);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => {
        handleClickNotification(item.link!);
      }}
      style={{flexDirection: 'row', gap: s(10)}}>
      <CustomImage
        source={
          typeof item.user !== 'string'
            ? item.user?.profilePic.url!
            : AppConstants.fallbackProfilePic
        }
        width={s(40)}
        height={s(40)}
      />

      <View>
        <CustomText variant="h4">{`${item.title}`}</CustomText>
        <CustomText variant="body2">{`${item.body}`}</CustomText>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({});
