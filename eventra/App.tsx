import React from 'react';
import { StyleSheet } from 'react-native';
import Config from 'react-native-config';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { SocketProvider } from "./src/context/SocketContext";
import AppNavigation from './src/navigation/AppNavigation';
import { store } from './src/store/store';

const App = () => {
  console.log("Config.API_URL ENV : ", Config.API_URL);
  console.log("BASE_URL ENV : ", Config.BASE_URL);
  return (
    <Provider store={store}>
      <SocketProvider>
        <AppNavigation />
      </SocketProvider>
      <Toast />
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})