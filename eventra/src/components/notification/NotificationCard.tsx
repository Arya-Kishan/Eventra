import {CustomImage} from '@components/global/CustomImage';
import CustomText from '@components/global/CustomText';
import {AppConstants} from '@constants/AppConstants';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch} from '@store/hooks';
import {resolveDeepLink} from '@utils/DeepLinkService';
import React, {FC} from 'react';
import {Linking, StyleSheet, TouchableOpacity, View} from 'react-native';
import {s} from 'react-native-size-matters';
import {NavigationProps, NotificationType} from 'types/AppTypes';

interface NotificationCardProps {
  item: NotificationType;
}

const NotificationCard: FC<NotificationCardProps> = ({item}) => {
  const navigation = useNavigation<NavigationProps<'NotificationScreen'>>();
  const dispatch = useAppDispatch();

  const handleClickNotification = (link: string) => {
    resolveDeepLink({
      dispatch,
      navigation,
      openingFrom: 'foreground',
      url: link,
    });
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

      <View style={{width: '85%'}}>
        <CustomText variant="h4">{`${item.title}`}</CustomText>
        <CustomText
          variant="body2"
          ellipsizeMode="tail"
          numberOfLines={1}>{`${item.body}`}</CustomText>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({});
