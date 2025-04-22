import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { s } from 'react-native-size-matters'
import { AppConstants } from '@constants/AppConstants'

const CustomLoader = () => {
    return (
        <View style={styles.main}>
            <ActivityIndicator size={s(30)} color={AppConstants.redColor} />
        </View>
    )
}

export default CustomLoader

const styles = StyleSheet.create({
    main: { flex: 1, justifyContent: "center", alignItems: "center" }
})