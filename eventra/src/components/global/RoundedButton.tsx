import {AppConstants} from '@constants/AppConstants';
import React, {ReactNode} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  Image,
  View,
} from 'react-native';
import {s} from 'react-native-size-matters';

type RoundedButtonProps = {
  title: string;
  onPress: () => void;
  color?: string;
  textColor?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  loading?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  showIcon?: boolean;
  loaderColor?: string;
};

const RoundedButton: React.FC<RoundedButtonProps> = ({
  title,
  onPress,
  color = AppConstants.redColor,
  textColor = '#fff',
  style,
  textStyle,
  loading = false,
  disabled = false,
  icon,
  showIcon = false,
  loaderColor = AppConstants.whiteColor,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor: color}, style]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}>
      {loading ? (
        <ActivityIndicator size={s(20)} color={loaderColor} />
      ) : (
        <View style={styles.box}>
          {showIcon && icon}
          <Text style={[styles.buttonText, {color: textColor}, textStyle]}>
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  box: {
    flexDirection: 'row',
    gap: s(16),
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default RoundedButton;
