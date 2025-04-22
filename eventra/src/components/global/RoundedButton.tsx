import { AppConstants } from '@constants/AppConstants';
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, ActivityIndicator } from 'react-native';
import { s } from 'react-native-size-matters';

type RoundedButtonProps = {
    title: string;
    onPress: () => void;
    color?: string;
    textColor?: string;
    style?: ViewStyle;
    textStyle?: TextStyle;
    loading?: boolean;
};

const RoundedButton: React.FC<RoundedButtonProps> = ({
    title,
    onPress,
    color = AppConstants.redColor,
    textColor = '#fff',
    style,
    textStyle,
    loading = false
}) => {
    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor: color }, style]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            {
                loading
                    ?
                    <ActivityIndicator size={s(20)} color={AppConstants.whiteColor} />
                    :
                    <Text style={[styles.buttonText, { color: textColor }, textStyle]}>
                        {title}
                    </Text>
            }
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
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
    },
});

export default RoundedButton;
