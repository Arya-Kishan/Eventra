import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Config from 'react-native-config';
import AppNavigation from './src/navigation/AppNavigation';
import { store } from './src/store/store'
import { Provider } from 'react-redux'
import Toast from 'react-native-toast-message';
import SplashScreen from "react-native-splash-screen"

const App = () => {
  console.log("Config.API_URL ENV : ", Config.API_URL);
  console.log("BASE_URL ENV : ", Config.BASE_URL);

  useEffect(() => {
    SplashScreen.hide()
  })
  return (
    <Provider store={store}>
      <AppNavigation />
      <Toast />
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})