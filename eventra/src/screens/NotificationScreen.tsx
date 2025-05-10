import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import { RouteProps } from 'types/AppTypes';

const NotificationScreen = () => {
  const { params } = useRoute<RouteProps<"NotificationScreen">>();
  console.log("PARAMS : ", params)
  return (
    <View>
      <Text>NotificationScreen</Text>
    </View>
  )
}

export default NotificationScreen

const styles = StyleSheet.create({})