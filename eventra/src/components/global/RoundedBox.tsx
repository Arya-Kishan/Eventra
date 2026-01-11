import {Pressable, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {Children, FC, ReactNode} from 'react';
import {AppConstants} from '@constants/AppConstants';

interface RoundedBoxType {
  size: number;
  viewStyle?: ViewStyle;
  children: ReactNode;
  rounded?: number | null;
  onPress?: () => void;
}

const RoundedBox: FC<RoundedBoxType> = ({
  size,
  viewStyle,
  children,
  rounded = null,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.main,
        {width: size, height: size, borderRadius: rounded ? rounded : size},
        viewStyle,
      ]}>
      {children}
    </Pressable>
  );
};

export default RoundedBox;

const styles = StyleSheet.create({
  main: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppConstants.grayColor,
  },
});
