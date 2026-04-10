import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {FC, ReactNode} from 'react';
import {s} from 'react-native-size-matters';
import {AppConstants} from '@constants/AppConstants';
import Icon from './Icon';

interface HorizontalRowType {
  leftText: string;
  rightText: string;
  rightClick?: () => void;
  isRightIcon?: boolean;
  icon?: ReactNode;
}

const HorizontalRow: FC<HorizontalRowType> = ({
  leftText,
  rightText,
  rightClick,
  isRightIcon = false,
  icon = 'undefined',
}) => {
  return (
    <View style={styles.main}>
      <Text style={styles.leftText}>{leftText}</Text>

      <Pressable onPress={rightClick}>
        {isRightIcon ? icon : <Text style={styles.rightText}>{rightText}</Text>}
      </Pressable>
    </View>
  );
};

export default HorizontalRow;

const styles = StyleSheet.create({
  main: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftText: {
    fontSize: s(20),
    fontWeight: '600',
  },
  rightText: {
    fontSize: s(14),
    color: AppConstants.redColor,
  },
});
