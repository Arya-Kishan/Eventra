import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {FC} from 'react';
import {s} from 'react-native-size-matters';
import {AppConstants} from '@constants/AppConstants';

interface BadgeType {
  count: number;
  size: number;
  viewStyle?: ViewStyle;
}

const Badge: FC<BadgeType> = ({count, size, viewStyle}) => {
  return (
    <View
      style={[
        styles.main,
        {width: s(size), height: s(size), borderRadius: s(size)},
        viewStyle,
      ]}>
      <Text style={styles.txt}>{count}</Text>
    </View>
  );
};

export default Badge;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppConstants.redColor,
  },
  txt: {color: AppConstants.whiteColor},
});
