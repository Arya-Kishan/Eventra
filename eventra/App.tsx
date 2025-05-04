import React from 'react';
import { StyleSheet } from 'react-native';
import Config from 'react-native-config';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { SocketProvider } from "./src/context/SocketContext";
import AppNavigation from './src/navigation/AppNavigation';
import { store } from './src/store/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <SocketProvider>
          <AppNavigation />
        </SocketProvider>
        <Toast />
      </Provider>
    </SafeAreaProvider>
  )
}

export default App

const styles = StyleSheet.create({})