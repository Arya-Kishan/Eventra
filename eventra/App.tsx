import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { SocketProvider } from "./src/context/SocketContext";
import AppNavigation from './src/navigation/AppNavigation';
import { store } from './src/store/store';

const App = () => {

  console.log("I AM GOOD")

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