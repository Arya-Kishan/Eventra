import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const useDevice = () => {

    const bottomTabBarHeight = useBottomTabBarHeight();
    const { top: statusBarHeight, bottom } = useSafeAreaInsets();
    
    return ({ statusBarHeight, bottomTabBarHeight })
}

export default useDevice