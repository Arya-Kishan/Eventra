import {AppConstants} from '@constants/AppConstants';
import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
  extraTop?: number;
  extraBottom?: number;
}

const CustomSafeScreen = ({
  children,
  style,
  extraTop = 0,
  extraBottom = 16, // Instagram-like breathing space
}: Props) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.main, style]}>
      <View
        style={{height: insets.top, backgroundColor: AppConstants.redColor}}
      />
      {children}
      <View
        style={{height: insets.bottom, backgroundColor: AppConstants.redColor}}
      />
    </View>
  );
};

export default CustomSafeScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: AppConstants.whiteColor,
  },
});
