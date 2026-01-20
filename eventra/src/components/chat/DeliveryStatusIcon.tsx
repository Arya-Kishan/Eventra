import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import Icon from '@components/global/Icon';
import {AppConstants} from '@constants/AppConstants';
import {s} from 'react-native-size-matters';

interface DeliveryStatusIconProps {
  status: 'sent' | 'seen' | 'delivered' | 'sending';
}

const DeliveryStatusIcon: FC<DeliveryStatusIconProps> = ({status}) => {
  const icon =
    status === 'seen'
      ? 'aircraft'
      : status === 'delivered'
        ? 'aircraft'
        : status === 'sent'
          ? 'aircraft-take-off'
          : 'hour-glass';
  const color =
    status === 'seen'
      ? AppConstants.greenColor
      : status === 'delivered'
        ? AppConstants.whiteColor
        : status === 'sent'
          ? AppConstants.whiteColor
          : AppConstants.black;
  return (
    <View>
      <Icon icon={icon} iconType="Entypo" color={color} size={s(10)} />
    </View>
  );
};

export default DeliveryStatusIcon;

const styles = StyleSheet.create({});
